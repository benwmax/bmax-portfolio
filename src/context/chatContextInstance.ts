import { createContext } from 'react';
import type { UseChatSession } from '../hooks/useChatSession';

// Split into its own file (rather than living in ChatContext.tsx) because
// react-refresh/only-export-components requires component files to export
// only components — this and ChatProvider/useChat all need the same
// Context instance, so it can't live in either of theirs.
export const ChatContext = createContext<UseChatSession | null>(null);
