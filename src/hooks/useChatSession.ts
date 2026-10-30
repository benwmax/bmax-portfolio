import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatWidgetStatus } from '../components/ChatInput';
import type { ContactFormStatus, ContactSubmission } from '../components/ContactCard';
import { parseWidgetTags } from '../chat/widgetIds';
import type { WidgetId } from '../chat/widgetIds';
import { getTopic, topicForPrompt } from '../chat/topics';
import type { FollowUp, TopicId } from '../chat/topics';

export interface Message {
  role: 'user' | 'assistant';
  text: string;
  /**
   * Set on the client-only "Reading about X" note a case study drops into the
   * log (the company name). Lets the next case study replace an untouched note
   * instead of stacking under it — see setPageContext.
   */
  contextNote?: string;
  /**
   * Widgets rendered under the text (src/chat/widgets). Set by topic tours, or
   * parsed out of the model's [[show:<id>]] tags — always validated ids.
   */
  widgets?: WidgetId[];
}

// Set by a page when the visitor lands on a case study, so the assistant can
// be told what they're looking at without the client re-sending history.
// Chat-first experiment (2026-10-29): only CaseStudyPage calls this, and it is
// no longer routed. The server now keys context by topic id (api/chat.ts's
// TOPIC_CONTEXT), so a `company` value here is silently ignored. playTopic sets
// the context for the chat homepage.
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

// Shown when an API error arrives without a visitor-facing message from the
// server. Deliberately no status code — "(502)" means nothing to a visitor and
// reads as broken. The server's own `error` text, when present, still wins.
const CHAT_FALLBACK_ERROR = 'Something went wrong on my end. Try again in a moment.';
const CONTACT_FALLBACK_ERROR =
  "Couldn't send your message. Try again, or email ben@viewbens.work directly.";

// Mirrors streamChat's error-handling shape below, but for the single-shot
// (non-streaming) /api/contact endpoint.
async function postContact(
  fields: ContactSubmission,
): Promise<{ ok: boolean; errorText?: string }> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });

    if (res.ok) return { ok: true };

    try {
      const json = (await res.json()) as { error?: string };
      return { ok: false, errorText: json.error ?? CONTACT_FALLBACK_ERROR };
    } catch {
      return { ok: false, errorText: CONTACT_FALLBACK_ERROR };
    }
  } catch {
    return {
      ok: false,
      errorText: "Couldn't send your message — check your connection and try again.",
    };
  }
}

// How long to wait for the stream to make progress before giving up. Guards
// against a hung Edge Function leaving the widget stuck in "thinking"
// forever (readOnly input, no way to retry) — see ChatInput.tsx's isLoading
// gating.
const STREAM_TIMEOUT_MS = 30_000;

// Pause between a tour's beats, so a tour reads as a reply arriving rather than
// a page appearing all at once. Zero under prefers-reduced-motion.
const BEAT_DELAY_MS = 450;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        return { errorText: json.error ?? CHAT_FALLBACK_ERROR };
      } catch {
        return { errorText: CHAT_FALLBACK_ERROR };
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
      // stream: true holds back a multi-byte character split across two
      // chunks (an em dash is 3 bytes) instead of rendering it as ��.
      onChunk(decoder.decode(value, { stream: true }));
    }
    const tail = decoder.decode();
    if (tail) onChunk(tail);

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
   * Whether the mobile "Ask about Ben" FAB entry point has been unlocked this
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
  /** Whether the inline ContactCard should render in the message log at all. */
  showContactCard: boolean;
  /**
   * Where the card sits in the log, as the number of messages that render
   * before it — the card belongs to the turn that surfaced it, not to the
   * bottom of the transcript. Pages must render it at this position rather
   * than after the whole list, or a follow-up question and its reply appear
   * *above* the form instead of below it. null whenever no card is showing.
   */
  contactCardAfter: number | null;
  contactFormStatus: ContactFormStatus;
  /** Server-side error message from the last failed /api/contact attempt, if any. */
  contactErrorText?: string;
  /** Submit the contact form fields to /api/contact. */
  submitContactForm: (fields: ContactSubmission) => Promise<void>;
  /** Hide the ContactCard without submitting — the visitor declined. */
  dismissContactCard: () => void;
  /**
   * Play a pre-built topic tour (src/chat/topics.ts): the prompt as the
   * visitor's message, then each beat as an assistant message with its
   * widgets. No model call. Ignored while a reply or another tour is running.
   */
  playTopic: (id: TopicId) => Promise<void>;
  /** Chips to offer under the input after the latest tour or reply. */
  followUps: FollowUp[];
  /** Topic ids already played this session — menus use it to suggest what's left. */
  playedTopics: ReadonlySet<string>;
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
  // The contact card's position in the transcript, stored as the number of
  // messages that precede it rather than as a plain boolean: it's an entry in
  // the message log, not a footer stuck to the bottom of it. Anchoring it means
  // later turns render below the form instead of jumping above it.
  const [contactCardAfter, setContactCardAfter] = useState<number | null>(null);
  const showContactCard = contactCardAfter !== null;
  const [contactFormStatus, setContactFormStatus] = useState<ContactFormStatus>('idle');
  const [contactErrorText, setContactErrorText] = useState<string | undefined>(undefined);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [playedTopics, setPlayedTopics] = useState<ReadonlySet<string>>(() => new Set());

  const dismissContactCard = useCallback(() => setContactCardAfter(null), []);

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
  // Mirrors `messages` so handleSubmit can work out where the contact card
  // should land without closing over the array — depending on it would rebuild
  // the callback on every streamed chunk. Synced after commit, which is
  // current at submit time: a submit can't begin while one is in flight
  // (submittingRef below), and nothing else appends between the click and this
  // read.
  const messagesRef = useRef<Message[]>(initialMessages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  // Synchronous submit lock: `chatStatus` is React state and updates on the
  // next render, so a fast double-trigger (e.g. Enter then a stray click)
  // before that render could otherwise pass the isLoading check twice and
  // fire two requests for one interaction.
  const submittingRef = useRef(false);

  // Pin the card on first surface only. Re-triggering later must not relocate a
  // card the visitor may already be typing into: moving it in the log would
  // remount it and silently drop the draft. Skipped once a message has been
  // sent successfully this session, so a later unrelated "thanks, I'll reach
  // out" doesn't reopen a form that already did its job.
  const surfaceContactCardAt = useCallback(
    (after: number) => {
      if (contactFormStatus === 'sent') return;
      setContactCardAfter((prev) => (prev === null ? after : prev));
    },
    [contactFormStatus],
  );

  const playTopic = useCallback(
    async (id: TopicId) => {
      const topic = getTopic(id);
      if (!topic || submittingRef.current) return;
      submittingRef.current = true;

      // The model can't see a tour (it never ran through /api/chat), so tell it
      // which one was just shown — a follow-up like "why did he do that?" then
      // resolves to this topic. api/chat.ts maps the id to a sentence.
      pageContextRef.current = topic.id;
      setActiveSuggestions([]);
      setFollowUps([]);
      setPlayedTopics((prev) => new Set(prev).add(topic.id));
      setChatStatus('loading');

      const startLength = messagesRef.current.length;
      setMessages((prev) => [...prev, { role: 'user', text: topic.prompt }]);

      const delay = reducedMotion() ? 0 : BEAT_DELAY_MS;
      for (const beat of topic.beats) {
        await wait(delay);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: beat.text ?? '', widgets: beat.widgets },
        ]);
      }

      if (topic.contact) surfaceContactCardAt(startLength + 1 + topic.beats.length);
      setFollowUps(topic.followUps);
      setChatStatus('online');
      submittingRef.current = false;
    },
    [surfaceContactCardAt],
  );

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
    //
    // If the previous case study's note is still the last thing in the log —
    // the visitor read it but never asked anything — it's replaced rather than
    // stacked: a pile of "Reading about…" lines for pages already left says
    // nothing. Once a conversation follows a note, it stays as the header for
    // that stretch of the transcript. The replaced company is un-announced so
    // going back to it shows its note again.
    if (!announcedRef.current.has(context.company)) {
      announcedRef.current.add(context.company);
      const staleNote = messagesRef.current[messagesRef.current.length - 1]?.contextNote;
      if (staleNote) announcedRef.current.delete(staleNote);
      const note: Message = { role: 'assistant', text: context.note, contextNote: context.company };
      setMessages((prev) =>
        prev[prev.length - 1]?.contextNote ? [...prev.slice(0, -1), note] : [...prev, note],
      );
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

      // Typing a starter prompt word for word plays its tour — same answer the
      // chip gives, no model call.
      const matched = topicForPrompt(text);
      if (matched) {
        await playTopic(matched.id);
        return;
      }

      submittingRef.current = true;

      // Anchor the card after this turn's user message and assistant reply —
      // both appended just below — so it renders under the answer that
      // prompted it and holds that spot as the conversation continues.
      const anchorAfterThisTurn = messagesRef.current.length + 2;

      const surfaceContactCard = () => surfaceContactCardAt(anchorAfterThisTurn);

      // Surface immediately, alongside the streaming reply rather than waiting
      // on it — the trigger is independent of what the assistant ends up
      // saying.
      if (detectContactIntent(text)) surfaceContactCard();

      setChatStatus('loading');
      setActiveSuggestions([]);
      setFollowUps([]);
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
      // Raw text includes any [[show:<id>]] widget tags; what's displayed has
      // them stripped (parseWidgetTags), and a half-streamed tag stays hidden
      // until it closes.
      let assistantText = '';

      try {
        const { errorText } = await streamChat(text, pageContextRef.current, (chunk) => {
          assistantText += chunk;
          const { text: shown, widgets } = parseWidgetTags(assistantText);
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: 'assistant',
              text: shown,
              widgets: widgets.length > 0 ? widgets : undefined,
            };
            return next;
          });
        });

        // A 200 with nothing displayable: the server ends the stream empty when
        // the model fails mid-reply (api/chat.ts, empty-reply), and a reply made
        // only of unknown widget tags strips to nothing. Either way, show the
        // fallback instead of leaving a blank bubble.
        const finished = parseWidgetTags(assistantText);
        const nothingShown = finished.text.trim() === '' && finished.widgets.length === 0;

        if (errorText) {
          replaceLastAssistant(errorText);
        } else if (nothingShown) {
          replaceLastAssistant(CHAT_FALLBACK_ERROR);
        } else if (detectContactIntent(finished.text)) {
          surfaceContactCard();
        }
      } catch {
        replaceLastAssistant("The assistant isn't available right now — try again in a moment.");
      } finally {
        setChatStatus('online');
        submittingRef.current = false;
      }
    },
    [onSubmit, surfaceContactCardAt, playTopic],
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
    contactCardAfter,
    contactFormStatus,
    contactErrorText,
    submitContactForm,
    dismissContactCard,
    playTopic,
    followUps,
    playedTopics,
  };
}
