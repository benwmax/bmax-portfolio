import styles from './StatBlock.module.css';

export interface StatBlockProps {
  /** Headline figure — "+4–6%", "$1B", "< 3 mo.", "Scaled" */
  value: string;
  /** Short descriptor — ALL CAPS rendered automatically */
  label: string;
  /** Optional one-line context sentence */
  body?: string;
}

export function StatBlock({ value, label, body }: StatBlockProps) {
  return (
    <div className={styles.cell}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
      {body && <span className={styles.body}>{body}</span>}
    </div>
  );
}

export interface StatGridProps {
  children: React.ReactNode;
  /** 3-column variant for cases with more outcome stats */
  cols?: 2 | 3;
}

/** Wraps StatBlock cells in the bordered hairline grid. */
export function StatGrid({ children, cols = 2 }: StatGridProps) {
  return (
    <div className={[styles.grid, cols === 3 ? styles.grid3 : ''].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
