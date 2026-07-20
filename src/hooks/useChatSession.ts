import { useState, useCallback, useRef } from 'react';
import type { ChatWidgetStatus } from '../components/ChatInput';
import type { ContactFormStatus, ContactSubmission } from '../components/ContactCard';

export interface Message {
  role: 'user' | 'assistant';
  text: string;
}

// Set by a page when the visitor lands on a case study, so the assistant can
// be told what they're looking at without the client re-sending history.
// `company` must match one of api/chat.ts's ALLOWED_PAGE_CONTEXTS or the
// server silently ignores it.
export interface PageContext {
  company: string;
  /** Shown once per company per session as a client-only transcript note — never sent to the model. */
  note: string;
  suggestions?: string[];
}

// Assistant replies stream in as one blob; split on blank lines (and fall back
// to single line breaks) so long answers render as multiple paragraphs instead
// of one dense block.
export function splitParagraphs(text: string): string[] {
  const blocks = text.split(/\n\s*\n/).filter((p) => p.trim() !== '');
  if (blocks.length > 1) return blocks;
  return text.split(/\n/).filter((p) => p.trim() !== '');
}

// Client-side, deterministic trigger for the inline contact form — runs
// against the visitor's own submitted text rather than depending on the
// model to decide when to offer it (the Anthropic call in api/chat.ts
// doesn't use tool-use at all). A false positive just surfaces a dismissible
// card, so a broad-but-plausible phrase list is an acceptable trade for not
// needing a second model round-trip.
const CONTACT_INTENT_PATTERN =
  /\b(get in touch|reach out|reach (you|ben|him)|contact (you|ben|him)|email (you|ben|him)|hire (you|ben|him)|work with (you|ben|him)|talk to (you|ben|him)|speak (with|to) (you|ben|him)|send (you|ben|him) a message|message (you|ben|him))\b/i;

export function detectContactIntent(text: string): boolean {
  return CONTACT_INTENT_PATTERN.test(text);
}

// Mirrors streamChat's error-handling shape below, but for the single-shot
// (non-streaming) /api/contact endpoint.
async function postContact(fields: ContactSubmission): Promise<{ ok: boolean; errorText?: string }> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });

    if (res.ok) return { ok: true };

    try {
      const json = (await res.json()) as { error?: string };
      return { ok: false, errorText: json.error ?? `Something went wrong (${res.status}).` };
    } catch {
      return { ok: false, errorText: `Something went wrong (${res.status}).` };
    }
  } catch {
    return { ok: false, errorText: "Couldn't send your message — check your connection and try again." };
  }
}

// How long to wait for the stream to make progress before giving up. Guards
// against a hung Edge Function leaving the widget stuck in "thinking"
// forever (readOnly input, no way to retry) — see ChatInput.tsx's isLoading
// gating.
const STREAM_TIMEOUT_MS = 30_000;

// The server holds conversation history and the session message count
// (keyed by an HttpOnly cookie) — it never trusts client-supplied history or
// counts, so only the newest message (plus the current page context, if any)
// is sent. See api/lib/session.ts.
//
// Returns errorText on API-level failures (rate limit, session cap, upstream error).
// Throws only on network failures or the timeout above.
async function streamChat(
  message: string,
  pageContext: string | null,
  onChunk: (text: string) => void,
): Promise<{ errorText?: string }> {
  const controller = new AbortController();
  // Browser setTimeout returns a number (no Node-style .refresh()), so
  // progress resets are done by clearing and re-arming a fresh timer.
  // Assigned synchronously by armTimeout() below before any await runs.
  let timeoutId!: ReturnType<typeof setTimeout>;
  const armTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => controller.abort(), STREAM_TIMEOUT_MS);
  };
  armTimeout();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, pageContext }),
      signal: controller.signal,
    });

    if (!res.ok) {
      try {
        const json = (await res.json()) as { error?: string };
        return { errorText: json.error ?? `Something went wrong (${res.status}).` };
      } catch {
        return { errorText: `Something went wrong (${res.status}).` };
      }
    }

    if (!res.body) return { errorText: 'No response received.' };

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      // Re-armed on every chunk so a stream that starts fine but then
      // stalls mid-reply still gets cut off, not just a slow initial
      // connection.
      const { done, value } = await reader.read();
      if (done) break;
      armTimeout();
      onChunk(decoder.decode(value));
    }

    return {};
  } finally {
    clearTimeout(timeoutId);
  }
}

export interface UseChatSessionOptions {
  /** Storybook / test — intercepts submit instead of calling /api/chat. */
  onSubmit?: (text: string) => void;
  initialMessages?: Message[];
}

export interface UseChatSession {
  messages: Message[];
  chatStatus: ChatWidgetStatus;
  handleSubmit: (text: string) => Promise<void>;
  /** Suggestion chips for the case study just landed on — cleared once the visitor sends a message or the context changes. */
  activeSuggestions: string[];
  /** Call on mount to tell the assistant what page the visitor is on; pass `null` from pages with no case-study context of their own (e.g. Home) so it doesn't linger from whatever was viewed previously. */
  setPageContext: (context: PageContext | null) => void;
  /**
   * Whether the mobile "Ask Ben" FAB entry point has been unlocked this
   * session. Starts false so the FAB is hidden until the visitor either starts
   * a chat or lands on a case study page. Once true it stays true — the shared
   * session lives above the router (ChatProvider), so it persists across
   * navigation (e.g. case study → back to Home without chatting). Session-only,
   * in memory: a reload resets it, matching the conversation itself. Consumed
   * by MobileChatSurface.
   */
  fabRevealed: boolean;
  /**
   * Unlock the mobile FAB. Called on case study mount so those pages always
   * offer a chat entry point on mobile (they have no inline/docked chat below
   * 1100px). Idempotent.
   */
  revealFab: () => void;
  /** Whether the inline ContactCard should render at the end of the message log. */
  showContactCard: boolean;
  contactFormStatus: ContactFormStatus;
  /** Server-side error message from the last failed /api/contact attempt, if any. */
  contactErrorText?: string;
  /** Submit the contact form fields to /api/contact. */
  submitContactForm: (fields: ContactSubmission) => Promise<void>;
  /** Hide the ContactCard without submitting — the visitor declined. */
  dismissContactCard: () => void;
}

export function useChatSession({
  onSubmit,
  initialMessages = [],
}: UseChatSessionOptions = {}): UseChatSession {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [chatStatus, setChatStatus] = useState<ChatWidgetStatus>('online');
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const [fabRevealed, setFabRevealed] = useState(false);
  const revealFab = useCallback(() => setFabRevealed(true), []);
  const [showContactCard, setShowContactCard] = useState(false);
  const [contactFormStatus, setContactFormStatus] = useState<ContactFormStatus>('idle');
  const [contactErrorText, setContactErrorText] = useState<string | undefined>(undefined);

  const dismissContactCard = useCallback(() => setShowContactCard(false), []);

  const submitContactForm = useCallback(async (fields: ContactSubmission) => {
    setContactFormStatus('sending');
    setContactErrorText(undefined);
    const { ok, errorText } = await postContact(fields);
    if (ok) {
      setContactFormStatus('sent');
    } else {
      setContactFormStatus('error');
      setContactErrorText(errorText);
    }
  }, []);

  // Refs, not state — read at submit time, shouldn't themselves trigger renders.
  const pageContextRef = useRef<string | null>(null);
  const announcedRef = useRef<Set<string>>(new Set());
  // Synchronous submit lock: `chatStatus` is React state and updates on the
  // next render, so a fast double-trigger (e.g. Enter then a stray click)
  // before that render could otherwise pass the isLoading check twice and
  // fire two requests for one interaction.
  const submittingRef = useRef(false);

  const setPageContext = useCallback((context: PageContext | null) => {
    pageContextRef.current = context?.company ?? null;

    if (!context) {
      setActiveSuggestions([]);
      return;
    }

    // First visit to this company this session: drop a context note into the
    // transcript (scrolls with everything else) and surface its suggestions.
    // Revisits stay silent — the note already exists, higher up in the log —
    // but still update pageContextRef so the model stays informed.
    //
    // Deliberately NOT clearing activeSuggestions in the "already announced"
    // branch: React Strict Mode double-invokes this effect call in
    // development, so a genuine first visit can call setPageContext(sabre)
    // twice back-to-back with no real navigation in between — clearing here
    // would wipe out what the first call just set. Revisits stay correct
    // regardless, because getting to a second case study always passes
    // through a page that calls setPageContext(null) first (see
    // src/pages/explorations/HomeV4Blend.tsx), which already clears
    // activeSuggestions before the revisit's "already announced" branch is
    // ever reached.
    if (!announcedRef.current.has(context.company)) {
      announcedRef.current.add(context.company);
      setMessages((prev) => [...prev, { role: 'assistant', text: context.note }]);
      setActiveSuggestions(context.suggestions ?? []);
    }
  }, []);

  const handleSubmit = useCallback(
    async (text: string) => {
      if (onSubmit) {
        onSubmit(text);
        return;
      }

      if (submittingRef.current) return;
      submittingRef.current = true;

      // Surface the contact card immediately, alongside the streaming reply
      // rather than waiting on it — the trigger is independent of what the
      // assistant ends up saying. Skipped once a message has already been
      // sent successfully this session, so a later unrelated "thanks, I'll
      // reach out" doesn't reopen a form that already did its job.
      if (contactFormStatus !== 'sent' && detectContactIntent(text)) {
        setShowContactCard(true);
      }

      setChatStatus('loading');
      setActiveSuggestions([]);
      // Append the user turn and an empty assistant slot immediately so the
      // cursor appears right away.
      setMessages((prev) => [...prev, { role: 'user', text }, { role: 'assistant', text: '' }]);

      const replaceLastAssistant = (t: string) =>
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', text: t };
          return next;
        });

      // Tracked alongside the streamed state updates so intent detection
      // below can run against the assistant's finished reply without
      // re-reading React state (which wouldn't be current inside this same
      // async function). Covers the case where the visitor's own message
      // didn't read as a contact request but the assistant's reply pointed
      // them to get in touch anyway (e.g. an out-of-scope question redirected
      // per the SCOPE section of the system prompt) — see system-prompt.ts.
      let assistantText = '';

      try {
        const { errorText } = await streamChat(text, pageContextRef.current, (chunk) => {
          assistantText += chunk;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: 'assistant',
              text: next[next.length - 1].text + chunk,
            };
            return next;
          });
        });

        if (errorText) {
          replaceLastAssistant(errorText);
        } else if (contactFormStatus !== 'sent' && detectContactIntent(assistantText)) {
          setShowContactCard(true);
        }
      } catch {
        replaceLastAssistant("The assistant isn't available right now — try again in a moment.");
      } finally {
        setChatStatus('online');
        submittingRef.current = false;
      }
    },
    [onSubmit, contactFormStatus],
  );

  return {
    messages,
    chatStatus,
    handleSubmit,
    activeSuggestions,
    setPageContext,
    fabRevealed,
    revealFab,
    showContactCard,
    contactFormStatus,
    contactErrorText,
    submitContactForm,
    dismissContactCard,
  };
}
