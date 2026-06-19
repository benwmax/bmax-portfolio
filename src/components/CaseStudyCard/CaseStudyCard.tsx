import type { HTMLAttributes, ReactNode } from 'react';
import { Tag } from '../Tag';
import styles from './CaseStudyCard.module.css';

export interface CaseStudyCardProps extends HTMLAttributes<HTMLElement> {
  /** Index shown in the thumbnail chip — e.g. "01". */
  index?: string | number;
  /** Project / case-study name. */
  title?: ReactNode;
  /** One-line description (the hook). */
  desc?: ReactNode;
  /** @deprecated use desc */
  outcome?: ReactNode;
  /** Cover image URL — falls back to the dot-grid placeholder. */
  image?: string;
  /** Destination — makes the card a link. */
  href?: string;
  /** Amber sector tag shown on the thumbnail. */
  tag?: string;
  /** Back-compat: first item used as sector tag. */
  tags?: string[];
  /** Meta — your role on the project. */
  role?: ReactNode;
  /** Meta — year or range, e.g. "2014–17". */
  year?: ReactNode;
  /** Meta — headline outcome figure rendered in green, e.g. "$1B". */
  stat?: ReactNode;
  /** Meta — label above the stat. Defaults to "Outcome". */
  statLabel?: ReactNode;
  /** Meta — sector / domain. */
  sector?: ReactNode;
  /** Force the hover state — for Storybook only. */
  forceHover?: boolean;
}

export function CaseStudyCard({
  index,
  title,
  desc,
  outcome,
  image,
  href,
  tag,
  tags,
  role,
  year,
  stat,
  statLabel,
  sector,
  forceHover = false,
  className,
  ...rest
}: CaseStudyCardProps) {
  const Comp = (href ? 'a' : 'div') as React.ElementType;
  const text = desc ?? outcome;
  const sectorTag = tag ?? (Array.isArray(tags) ? tags[0] : undefined);
  const showMeta = role || year || stat || sector;

  const cardCls = [
    styles.card,
    forceHover ? styles.hover : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Comp className={cardCls} href={href} {...rest}>
      <div className={styles.media}>
        {image && <img src={image} alt="" />}
        {index != null && <span className={styles.chip}>{index}</span>}
{sectorTag && (
          <span className={styles.chipTag}>
            <Tag label={sectorTag} />
          </span>
        )}
      </div>

      <div className={styles.body}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {text && <p className={styles.desc}>{text}</p>}

        {showMeta && (
          <div className={styles.meta}>
            {role && (
              <div className={styles.cell}>
                <span className={styles.metaKey}>Role</span>
                <span className={styles.metaVal}>{role}</span>
              </div>
            )}
            {year && (
              <div className={styles.cell}>
                <span className={styles.metaKey}>Year</span>
                <span className={styles.metaVal}>{year}</span>
              </div>
            )}
            {stat && (
              <div className={styles.cell}>
                <span className={styles.metaKey}>{statLabel ?? 'Outcome'}</span>
                <span className={`${styles.metaVal} ${styles.metaValGreen}`}>{stat}</span>
              </div>
            )}
            {sector && (
              <div className={styles.cell}>
                <span className={styles.metaKey}>Sector</span>
                <span className={styles.metaVal}>{sector}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Comp>
  );
}
