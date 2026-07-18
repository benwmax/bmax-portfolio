import { useState, useCallback } from 'react';
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

// The server holds conversation history and the session message count
// (keyed by an HttpOnly cookie) — it never trusts client-supplied history or
// counts, so only the newest message is sent. See api/lib/session.ts.
//
// Returns errorText on API-level failures (rate limit, session cap, upstream error).
// Throws only on network failures.
async function streamChat(message: string, onChunk: (text: string) => void): Promise<{ errorText?: string }> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
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

  const handleSubmit = useCallback(
    async (text: string) => {
      if (onSubmit) {
        onSubmit(text);
        return;
      }

      setChatStatus('loading');
      // Append the user turn and an empty assistant slot immediately so the
      // cursor appears right away.
      setMessages((prev) => [...prev, { role: 'user', text }, { role: 'assistant', text: '' }]);

      const replaceLastAssistant = (t: string) =>
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', text: t };
          return next;
        });

      try {
        const { errorText } = await streamChat(text, (chunk) => {
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
