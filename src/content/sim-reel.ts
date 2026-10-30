// Short silent loops from Sailing Sim, for the chat's `sim-reel` widget.
//
// Ben is capturing these in the sim (2026-10-30). Until a clip has both `mp4`
// and `poster`, it is skipped entirely, like work-images.ts: no empty frames.
// The widget and the side-projects tour's "in motion" beat appear on their own
// once one clip is ready. The shot list and encode settings are in
// docs/side-projects/sim-reel.md.
//
// Files live in public/sim/. Keep each loop small (6–10 s, no audio track,
// about 2–5 MB), because every visitor who opens the topic downloads them.

export interface SimClip {
  /** Stable key and file stem: public/sim/<id>.mp4, <id>.webm, <id>.jpg */
  id: string;
  /** Short title over the caption — "Wireframe to lit". */
  title: string;
  /** One sentence: what the viewer should notice. */
  caption: string;
  /** Path under public/, H.264 MP4. Required: every browser plays it. */
  mp4: string;
  /** Optional VP9/AV1 WebM, listed first so browsers that can use the smaller file do. */
  webm?: string;
  /** First frame as a still. Shown before playback and instead of it under reduced motion. */
  poster: string;
  /** What the clip shows, for screen readers (WCAG 1.1.1). The clips are silent. */
  alt: string;
  /**
   * How the frames were made. Sailors and game developers will ask, so the
   * card says it plainly: played live, or rendered offline in Movie Render Queue.
   */
  render: 'real-time' | 'offline';
}

export const SIM_CLIPS: SimClip[] = [
  {
    id: 'wireframe',
    title: 'Wireframe to lit',
    caption: '',
    mp4: '',
    poster: '',
    alt: '',
    render: 'offline',
  },
  {
    id: 'fleet',
    title: 'The fleet',
    caption: '',
    mp4: '',
    poster: '',
    alt: '',
    render: 'offline',
  },
  {
    id: 'physics',
    title: 'Physics, live',
    caption: '',
    mp4: '',
    poster: '',
    alt: '',
    render: 'real-time',
  },
  {
    id: 'storm',
    title: 'The thunderstorm',
    caption: '',
    mp4: '',
    poster: '',
    alt: '',
    render: 'offline',
  },
  {
    id: 'night',
    title: 'Night on the ship channel',
    caption: '',
    mp4: '',
    poster: '',
    alt: '',
    render: 'offline',
  },
];

export function readyClips(): SimClip[] {
  return SIM_CLIPS.filter((c) => c.mp4 && c.poster && c.alt);
}
