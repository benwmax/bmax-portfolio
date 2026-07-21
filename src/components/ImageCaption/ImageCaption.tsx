import styles from './ImageCaption.module.css';

interface ImageCaptionBase {
  /** Text shown in the title bar tab — e.g. "usaa · A/B test pipeline" */
  tabLabel: string;
  /** Fig caption below the chrome frame */
  caption: string;
}

// alt is required whenever src is provided — a default of alt="" would
// silently ship a real screenshot as decorative, hiding it from screen
// reader users with no compiler warning (WCAG 1.1.1). Omit both together to
// show the dot-grid placeholder instead.
export type ImageCaptionProps = ImageCaptionBase &
  ({ src: string; alt: string } | { src?: undefined; alt?: undefined });

export function ImageCaption({ tabLabel, caption, src, alt = '' }: ImageCaptionProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.chrome}>
        <div className={styles.titleBar} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
          <span className={styles.tabLabel}>{tabLabel}</span>
        </div>
        <div className={styles.body}>
          {src ? (
            <img src={src} alt={alt} className={styles.image} />
          ) : (
            <span className={styles.placeholder} aria-hidden="true">
              <span className={styles.placeholderPrompt}>› </span>
              {tabLabel}
            </span>
          )}
        </div>
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
