import styles from './ImageCaption.module.css';

export interface ImageCaptionProps {
  /** Text shown in the title bar tab — e.g. "usaa · A/B test pipeline" */
  tabLabel: string;
  /** Fig caption below the chrome frame */
  caption: string;
  /**
   * URL of an actual screenshot. When omitted a dot-grid placeholder is shown
   * with a terminal prompt indicating where the image will go.
   */
  src?: string;
  alt?: string;
}

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
