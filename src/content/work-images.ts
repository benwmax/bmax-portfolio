// Screenshots of Ben's design work, per project, for the chat's gallery widget
// and the "Work samples" step of each case study walkthrough.
//
// Ben is supplying the images (2026-10-29). Until an entry has `src`, it is
// skipped entirely — no dot-grid placeholders in the chat. Adding a screenshot
// is: drop the file in public/case/<project>/, add an entry here with `src` +
// `alt`. The gallery and walkthrough pick it up with no other edits, and the
// topic tour adds a "here's the work" beat automatically (see src/chat/topics.ts).

import type { StudyId } from '../chat/widgetIds';

export interface WorkImage {
  /** Path under public/, e.g. "/case/sabre/hotel-search.png" */
  src: string;
  /** Describes what the screen shows, not that it's a screenshot (WCAG 1.1.1). */
  alt: string;
  /** Chrome tab label — "sabre · hotel search" */
  tabLabel: string;
  /** One sentence: what the reader should notice. */
  caption: string;
}

export const WORK_IMAGES: Record<StudyId, WorkImage[]> = {
  upfluent: [],
  sagent: [],
  usaa: [],
  sabre: [],
  portfolio: [],
};

export function imagesFor(study: StudyId): WorkImage[] {
  return WORK_IMAGES[study].filter((img) => img.src);
}
