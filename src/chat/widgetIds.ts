// The closed set of widgets the chat can show. Pure data, no React, so the chat
// hook can validate model output against it without pulling in components.
//
// Widgets reach the transcript two ways:
//   1. Topic tours (src/chat/topics.ts) list them directly — no model call.
//   2. The model ends a reply with [[show:<id>]]. parseWidgetTags() keeps only
//      ids in this list, so a hallucinated or injected id renders nothing.
//
// COUPLED BY CONVENTION: the WIDGETS section of api/lib/system-prompt.ts lists
// the ids the model may use. It is a subset of this list (tour-only widgets such
// as `topics` are left out). Adding an id the model should use means adding it
// in both places.

export const STUDY_IDS = ['upfluent', 'sagent', 'usaa', 'sabre', 'portfolio'] as const;
export type StudyId = (typeof STUDY_IDS)[number];

/** Per-study widgets, as `<study>.<part>`. */
export const STUDY_PARTS = ['cover', 'walkthrough', 'outcomes', 'role', 'decision', 'hard', 'gallery'] as const;
export type StudyPart = (typeof STUDY_PARTS)[number];

/** Studies with a bespoke diagram of their key decision. */
export const DIAGRAM_STUDIES = ['upfluent', 'usaa', 'sabre'] as const;

export const GLOBAL_WIDGETS = [
  'highlights',
  'why-ben',
  'career',
  'looking-for',
  'research',
  'ai-split',
  'ai-limits',
  'side-projects',
  'sim-reel',
  'links-design-system',
  'links-resume',
  'links-contact',
  'topics',
] as const;

export type WidgetId =
  | `${StudyId}.${StudyPart}`
  | `${(typeof DIAGRAM_STUDIES)[number]}.diagram`
  | (typeof GLOBAL_WIDGETS)[number];

const ALL_IDS: ReadonlySet<string> = new Set<string>([
  ...STUDY_IDS.flatMap((s) => STUDY_PARTS.map((p) => `${s}.${p}`)),
  ...DIAGRAM_STUDIES.map((s) => `${s}.diagram`),
  ...GLOBAL_WIDGETS,
]);

export function isWidgetId(id: string): id is WidgetId {
  return ALL_IDS.has(id);
}

// `[[show:sabre.outcomes]]`. Lowercase ids only; anything else is left as text
// and stripped by the partial-tag rule below if it's still streaming.
const WIDGET_TAG = /\[\[show:([a-z0-9.-]+)\]\]/g;
// A tag that has started streaming but not closed yet — hidden until it either
// completes (and becomes a widget) or the reply ends.
const PARTIAL_TAG_AT_END = /\[\[[^\]\n]*\]?$/;

/** At most this many widgets per model reply — a reply is still mostly words. */
const MAX_MODEL_WIDGETS = 2;

/**
 * Split a raw model reply into display text and the widgets it asked for.
 * Runs on every streamed chunk, so it must be cheap and idempotent.
 */
export function parseWidgetTags(raw: string): { text: string; widgets: WidgetId[] } {
  const widgets: WidgetId[] = [];
  for (const match of raw.matchAll(WIDGET_TAG)) {
    const id = match[1];
    if (isWidgetId(id) && !widgets.includes(id) && widgets.length < MAX_MODEL_WIDGETS) {
      widgets.push(id);
    }
  }
  const text = raw.replace(WIDGET_TAG, '').replace(PARTIAL_TAG_AT_END, '').trimEnd();
  return { text, widgets };
}
