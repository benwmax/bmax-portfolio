import type { ReactNode } from 'react';
import { useChatSession } from '../hooks/useChatSession';
import { ChatContext } from './chatContextInstance';

// One chat session shared above the router, so the conversation survives
// navigating between Home and case study pages instead of resetting per page.
// Consumed via useChat() in useChat.ts.
export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChatSession();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}
