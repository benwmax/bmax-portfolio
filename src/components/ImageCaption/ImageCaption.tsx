import styles from './ImageCaption.module.css';

interface ImageCaptionBase {
  /** Text shown in the title bar tab — e.g. "usaa · A/B test pipeline" */
  tabLabel: string;
  /** Fig caption below the chrome frame */
  caption: string;
  /**
   * How the media sits in the 16:9 frame. `cover` (default) fills it and crops
   * from the top, which suits screenshots. `contain` shows the whole thing on
   * the frame's background — for a wide IA map or a tall phone screen, where
   * cropping to 16:9 would show a meaningless sliver.
   */
  fit?: 'cover' | 'contain';
}

// alt is required whenever src is provided — a default of alt="" would
// silently ship a real screenshot as decorative, hiding it from screen
// reader users with no compiler warning (WCAG 1.1.1). Omit both together to
// show the dot-grid placeholder instead.
export type ImageCaptionProps = ImageCaptionBase &
  (
    | {
        src: string;
        alt: string;
        poster?: undefined;
        /**
         * Makes the image a button that opens it larger. The caller owns the
         * enlarged view (the chat gallery's lightbox) — this component only
         * says "this can open."
         */
        onExpand?: () => void;
      }
    | {
        /** An .mp4. Plays only when the visitor presses play — never autoplays. */
        src: string;
        alt: string;
        /** First-frame image, shown until play. Required so a video never sits as a black box. */
        poster: string;
        onExpand?: undefined;
      }
    | { src?: undefined; alt?: undefined; poster?: undefined; onExpand?: undefined }
  );

export function ImageCaption({
  tabLabel,
  caption,
  src,
  alt = '',
  poster,
  onExpand,
  fit = 'cover',
}: ImageCaptionProps) {
  const mediaClass = [styles.image, fit === 'contain' ? styles.contain : '']
    .filter(Boolean)
    .join(' ');

  let media;
  if (!src) {
    media = (
      <span className={styles.placeholder} aria-hidden="true">
        <span className={styles.placeholderPrompt}>› </span>
        {tabLabel}
      </span>
    );
  } else if (poster) {
    // preload="none": two walkthrough videos are a few MB each, and most
    // visitors scroll past. Nothing downloads until play is pressed.
    media = (
      <video
        className={`${styles.image} ${styles.contain}`}
        src={src}
        poster={poster}
        aria-label={alt}
        controls
        muted
        playsInline
        preload="none"
      />
    );
  } else if (onExpand) {
    media = (
      <button type="button" className={styles.expand} onClick={onExpand} aria-haspopup="dialog">
        <img src={src} alt={alt} className={mediaClass} decoding="async" />
        <span className="sr-only">(enlarge)</span>
        <span className={styles.expandHint} aria-hidden="true">
          ⤢
        </span>
      </button>
    );
  } else {
    media = <img src={src} alt={alt} className={mediaClass} decoding="async" />;
  }

  return (
    <figure className={poster ? `${styles.figure} ${styles.tall}` : styles.figure}>
      <div className={styles.chrome}>
        <div className={styles.titleBar} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
          <span className={styles.tabLabel}>{tabLabel}</span>
        </div>
        <div className={styles.body}>{media}</div>
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
