import { useEffect, useRef, useState } from 'react';
import { ImageCaption } from '../../components/ImageCaption';
import type { WorkImage } from '../../content/work-images';
import styles from './Widgets.module.css';

/** How many show before "Show all". Six fill two rows on desktop without burying the conversation. */
const FIRST_SCREEN = 6;

/**
 * A grid of work samples with click-to-enlarge. Shared by the project
 * galleries, the theme galleries, and the walkthrough's "The work" step.
 *
 * The thumbnails are 16:9 crops at roughly 280px wide — enough to recognize a
 * screen, not enough to read an IA map or a service blueprint. The lightbox is
 * what makes the diagrams worth including. It's a native <dialog>, so focus
 * trapping, Escape, and the backdrop come from the browser rather than from us.
 */
export function MediaGallery({ items }: { items: WorkImage[] }) {
  const [showAll, setShowAll] = useState(items.length <= FIRST_SCREEN + 1);
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Only stills open in the lightbox; videos play in place with their own controls.
  const stills = items.filter((m) => !m.poster);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const visible = showAll ? items : items.slice(0, FIRST_SCREEN);
  const current = open !== null ? stills[open] : undefined;
  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + stills.length) % stills.length));

  return (
    <>
      <div className={styles.gallery}>
        {visible.map((m) =>
          m.poster ? (
            <ImageCaption
              key={m.src}
              src={m.src}
              alt={m.alt}
              poster={m.poster}
              tabLabel={m.tabLabel}
              caption={m.caption}
            />
          ) : (
            <ImageCaption
              key={m.src}
              src={m.src}
              alt={m.alt}
              tabLabel={m.tabLabel}
              caption={m.caption}
              fit={m.fit}
              onExpand={() => setOpen(stills.indexOf(m))}
            />
          ),
        )}
      </div>
      {!showAll && (
        <button type="button" className={styles.topicBtn} onClick={() => setShowAll(true)}>
          Show all {items.length} <span aria-hidden="true">↓</span>
        </button>
      )}

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label={current ? current.tabLabel : 'Enlarged image'}
        // Escape and the close button both land here, so state never drifts
        // from what the browser shows.
        onClose={() => setOpen(null)}
        onClick={(e) => {
          // A click on the backdrop targets the dialog itself, not its content.
          if (e.target === e.currentTarget) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (stills.length < 2) return;
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
      >
        {current && (
          <div className={styles.lightboxInner}>
            <div className={styles.lightboxBar}>
              <span className={styles.barLabel}>{current.tabLabel}</span>
              {stills.length > 1 && (
                <span className={styles.barMeta}>
                  {(open ?? 0) + 1} / {stills.length}
                </span>
              )}
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={() => setOpen(null)}
                aria-label="Close"
                autoFocus
              >
                ×
              </button>
            </div>
            <img src={current.src} alt={current.alt} className={styles.lightboxImage} />
            <div className={styles.lightboxFoot}>
              <p className={styles.lightboxCaption}>{current.caption}</p>
              {stills.length > 1 && (
                <div className={styles.lightboxNav}>
                  <button
                    type="button"
                    className={styles.stepArrow}
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className={styles.stepArrow}
                    onClick={() => step(1)}
                    aria-label="Next image"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
