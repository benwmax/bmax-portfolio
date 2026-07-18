import { useContext } from 'react';
import { ChatContext } from './chatContextInstance';
import { useChatSession } from '../hooks/useChatSession';
import type { UseChatSession, UseChatSessionOptions } from '../hooks/useChatSession';

// Falls back to a standalone session when rendered outside a ChatProvider
// (Storybook stories, which pass onSubmit/initialMessages directly and don't
// wrap pages in the app's router/provider tree).
export function useChat(fallback?: UseChatSessionOptions): UseChatSession {
  const shared = useContext(ChatContext);
  const standalone = useChatSession(fallback);
  return shared ?? standalone;
}
