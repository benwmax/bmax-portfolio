// Projects Ben has built on his own, outside client and employer work.
//
// Empty on purpose: Ben is supplying these (2026-10-29). The chat's "What does
// Ben build on his own?" topic and the `side-projects` widget stay hidden until
// this array has at least one entry — see visibleTopics() in src/chat/topics.ts —
// so the site never shows an empty "coming soon" shelf.
//
// Every field is shown verbatim, so keep the copy at the case study length
// standard: one or two sentences, specific over complete.

export interface SideProject {
  title: string;
  /** "2025" or "2024–25" */
  year: string;
  /** One or two sentences: what it is and why he built it. */
  summary: string;
  /** What it shows about how he works — a skill, a method, a tool. Short tags. */
  tags: string[];
  /** Optional outbound link (live site, repo, case write-up). */
  href?: string;
  /** Optional screenshot; alt is required with src (WCAG 1.1.1). */
  image?: { src: string; alt: string };
}

export const SIDE_PROJECTS: SideProject[] = [];
