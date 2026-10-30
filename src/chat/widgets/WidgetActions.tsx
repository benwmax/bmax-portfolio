import { createContext, useContext } from 'react';
import type { TopicId } from '../topics';

// Lets a widget start another tour ("Walk through Sabre →") without every
// widget taking a callback prop. Provided by the chat page; widgets rendered
// without it (Storybook) get a no-op, so their buttons are inert but visible.
export interface WidgetActions {
  playTopic: (id: TopicId) => void;
  /**
   * True while a reply streams or a tour plays. playTopic ignores clicks then, so
   * widget buttons that start a tour are disabled rather than silently doing
   * nothing (2026-10-30 audit).
   */
  busy: boolean;
}

export const WidgetActionsContext = createContext<WidgetActions>({
  playTopic: () => {},
  busy: false,
});

export function useWidgetActions(): WidgetActions {
  return useContext(WidgetActionsContext);
}
