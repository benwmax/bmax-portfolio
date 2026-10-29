import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useWidgetActions } from './WidgetActions';
import type { TopicId } from '../topics';
import styles from './Widgets.module.css';

/**
 * The shell every chat widget sits in: a hairline-bordered surface with a mono
 * title bar, echoing the chat panel and ImageCaption chrome so a widget reads
 * as part of the terminal, not a pasted-in web card.
 */
export function Frame({
  label,
  meta,
  title,
  children,
  wide = false,
}: {
  /** Mono caps label in the bar — "Sabre · Outcomes". */
  label: string;
  /** Right side of the bar — dates, a count, a tag. */
  meta?: ReactNode;
  /** Optional heading inside the body. */
  title?: string;
  children: ReactNode;
  /** Let the widget run the full stage width instead of the reading column. */
  wide?: boolean;
}) {
  return (
    <section
      className={[styles.frame, wide ? styles.frameWide : ''].filter(Boolean).join(' ')}
      aria-label={label}
    >
      <div className={styles.bar}>
        <span className={styles.barLabel}>{label}</span>
        {meta && <span className={styles.barMeta}>{meta}</span>}
      </div>
      <div className={styles.body}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </section>
  );
}

/** A large-figure outcome tile — bigger than StatBlock, which is sized for the old case study column. */
export function Stat({ value, label, body }: { value: string; label: string; body?: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      {body && <span className={styles.statBody}>{body}</span>}
    </div>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return <div className={styles.statRow}>{children}</div>;
}

/** Button that plays another topic tour inside the chat. */
export function TopicButton({ topic, children }: { topic: TopicId; children: ReactNode }) {
  const { playTopic } = useWidgetActions();
  return (
    <button type="button" className={styles.topicBtn} onClick={() => playTopic(topic)}>
      {children} <span aria-hidden="true">→</span>
    </button>
  );
}

/**
 * Outbound or in-app link styled as a row. External links open in a new tab and
 * say so to screen readers, matching the rest of the site.
 */
export function LinkRow({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail?: string;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const inner = (
    <>
      <span className={styles.linkLabel}>{label}</span>
      {detail && <span className={styles.linkDetail}>{detail}</span>}
      <span className={styles.linkArrow} aria-hidden="true">
        {href.startsWith('http') ? '↗' : '→'}
      </span>
    </>
  );
  if (external) {
    const newTab = href.startsWith('http');
    return (
      <a
        href={href}
        className={styles.linkRow}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
        {newTab && <span className="sr-only"> (opens in new tab)</span>}
      </a>
    );
  }
  return (
    <Link to={href} className={styles.linkRow}>
      {inner}
    </Link>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={styles.prose}>
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}
