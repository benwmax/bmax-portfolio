import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatWidgetStatus } from '../components/ChatInput';

export interface Message {
  role: 'user' | 'assistant';
  text: string;
}

// Assistant replies stream in as one blob; split on blank lines (and fall back
// to single line breaks) so long answers render as multiple paragraphs instead
// of one dense block.
export function splitParagraphs(text: string): string[] {
  const blocks = text.split(/\n\s*\n/).filter((p) => p.trim() !== '');
  if (blocks.length > 1) return blocks;
  return text.split(/\n/).filter((p) => p.trim() !== '');
}

// Returns errorText on API-level failures (rate limit, session cap, upstream error).
// Throws only on network failures.
async function streamChat(
  messages: Message[],
  sessionMessageCount: number,
  onChunk: (text: string) => void,
): Promise<{ errorText?: string }> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, content: m.text })),
      sessionMessageCount,
    }),
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
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }

  return {};
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
}

export function useChatSession({
  onSubmit,
  initialMessages = [],
}: UseChatSessionOptions = {}): UseChatSession {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [chatStatus, setChatStatus] = useState<ChatWidgetStatus>('online');

  // Refs so callbacks always see latest values without stale closures
  const messagesRef = useRef(messages);
  const sessionCountRef = useRef(0);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const handleSubmit = useCallback(
    async (text: string) => {
      if (onSubmit) {
        onSubmit(text);
        return;
      }

      const withUser: Message[] = [...messagesRef.current, { role: 'user', text }];
      setMessages(withUser);
      setChatStatus('loading');
      sessionCountRef.current += 1;

      // Append empty assistant slot immediately so the cursor appears
      setMessages((prev) => [...prev, { role: 'assistant', text: '' }]);

      const replaceLastAssistant = (t: string) =>
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', text: t };
          return next;
        });

      try {
        const { errorText } = await streamChat(withUser, sessionCountRef.current, (chunk) => {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: 'assistant',
              text: next[next.length - 1].text + chunk,
            };
            return next;
          });
        });

        if (errorText) replaceLastAssistant(errorText);
      } catch {
        replaceLastAssistant("The assistant isn't available right now — try again in a moment.");
      } finally {
        setChatStatus('online');
      }
    },
    [onSubmit],
  );

  return { messages, chatStatus, handleSubmit };
}
