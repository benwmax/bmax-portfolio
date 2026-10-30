import { createContext, useContext } from 'react';
import type { TopicId } from '../topics';

// Lets a widget start another tour ("Walk through Sabre →") without every
// widget taking a callback prop. Provided by the chat page; widgets rendered
// without it (Storybook) get a no-op, so their buttons are inert but visible.
export interface WidgetActions {
  playTopic: (id: TopicId) => void;
}

export const WidgetActionsContext = createContext<WidgetActions>({ playTopic: () => {} });

export function useWidgetActions(): WidgetActions {
  return useContext(WidgetActionsContext);
}
