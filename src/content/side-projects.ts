// Projects Ben has built on his own, outside client and employer work.
//
// The chat's "What does Ben build on his own?" topic and the `side-projects`
// widget stay hidden while this array is empty — see visibleTopics() in
// src/chat/topics.ts — so the site never shows an empty "coming soon" shelf.
// Entries added 2026-10-30 from Ben's own account of why he built each one.
//
// Every field is shown verbatim, so keep the copy at the case study length
// standard: one or two sentences, specific over complete.
//
// The facts here are mirrored in SIDE PROJECTS in api/lib/system-prompt.ts so
// typed questions get the same answers. Change one, change the other.

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

export const SIDE_PROJECTS: SideProject[] = [
  {
    title: 'Joint bills planner',
    year: '2026',
    summary:
      'He and his wife ran their shared finances on spreadsheets for a while. He built a tool that answers the one question they kept asking: exactly how much each of them moves to the joint account every pay period.',
    tags: ['Scoping to one question', 'Personal finance', 'Built with AI'],
    // No href: it runs privately at home on their own data. A demo household
    // with made-up data exists for screenshots.
  },
  {
    title: 'Sailing Sim',
    year: '2026',
    summary:
      'He took his 3D points-of-sail trainer and pushed it to see how far AI tools could go. It became an Unreal Engine sailing simulator with eight real boats, and Lake Ray Hubbard and Galveston Bay built from public survey and NOAA chart data.',
    tags: ['3D simulation', 'Physics from real data', 'AI at scale'],
    href: 'https://github.com/benwmax/sailing-sim',
  },
  {
    title: 'Sailing Study',
    year: '2026',
    summary:
      'He built it while taking an ASA 101 sailing course, to pass the test and keep learning after it. Study kits with a timed mock exam, plus simulators for points of sail, the helm, and the parts of a boat.',
    tags: ['Learning design', 'Interactive simulators', 'Built with AI'],
    href: 'https://benwmax.github.io/sailing-study/',
  },
];
