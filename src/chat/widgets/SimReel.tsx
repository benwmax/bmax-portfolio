import { useEffect, useRef, useState } from 'react';
import { readyClips, type SimClip } from '../../content/sim-reel';
import { Frame } from './Frame';
import styles from './Widgets.module.css';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const RENDER_NOTE: Record<SimClip['render'], string> = {
  'real-time': 'Real-time, in engine',
  offline: 'Rendered offline in Unreal',
};

/**
 * Short silent loops from Sailing Sim (src/content/sim-reel.ts). Renders
 * nothing until a clip is ready, so the chat never shows an empty reel.
 *
 * Why the clips behave the way they do:
 * - They play only while on screen. A transcript can hold several reels, and
 *   off-screen video still costs battery and bandwidth.
 * - Every clip has its own pause button. Looping motion longer than five
 *   seconds needs one (WCAG 2.2.2), and it's visible, not hover-only, so it
 *   works on touch.
 * - Under reduced motion nothing starts on its own. The poster shows, and the
 *   same button plays the clip if the visitor asks.
 * - preload="none": the poster is all a visitor downloads until a clip plays.
 */
export function SimReel({ clips = readyClips() }: { clips?: SimClip[] }) {
  if (clips.length === 0) return null;
  return (
    <Frame wide label="Sailing Sim · In motion" meta={`${clips.length} ${clips.length === 1 ? 'clip' : 'clips'}`}>
      <ul className={styles.reelGrid} role="list">
        {clips.map((clip) => (
          <li key={clip.id}>
            <ReelClip clip={clip} />
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function ReelClip({ clip }: { clip: SimClip }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // The visitor's intent. Starts paused under reduced motion; never flips on its own after that.
  const [paused, setPaused] = useState(prefersReducedMotion);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !paused) {
      // A blocked or failed play leaves the poster up, which is the right fallback.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, paused]);

  return (
    <figure className={styles.reelClip}>
      <div className={styles.reelMedia}>
        <video
          ref={videoRef}
          className={styles.reelVideo}
          poster={clip.poster}
          aria-label={clip.alt}
          muted
          loop
          playsInline
          preload="none"
        >
          {clip.webm && <source src={clip.webm} type="video/webm" />}
          <source src={clip.mp4} type="video/mp4" />
        </video>
        <button
          type="button"
          className={styles.reelToggle}
          onClick={() => setPaused((p) => !p)}
          aria-label={`${paused ? 'Play' : 'Pause'} ${clip.title}`}
        >
          <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span>
        </button>
      </div>
      <figcaption className={styles.reelCaption}>
        <h4 className={styles.subhead}>{clip.title}</h4>
        <p className={styles.reasonBody}>{clip.caption}</p>
        <span className={styles.projectTags}>{RENDER_NOTE[clip.render]}</span>
      </figcaption>
    </figure>
  );
}
