import styles from './CaseStudyHero.module.css';

export interface CaseStudyHeroMeta {
  label: string;
  value: string;
  /** Render value in green accent — for headline stats like $1B, +23%, etc. */
  accent?: boolean;
}

export interface CaseStudyHeroProps {
  /** e.g. "04" */
  number: string;
  /** e.g. "2018–2020" */
  dateRange: string;
  /** The H1 — written as a problem statement, not a project description */
  title: string;
  /** One-paragraph context for the problem */
  subtitle: string;
  /** Role, method, and up to two headline outcome stats */
  meta: CaseStudyHeroMeta[];
}

export function CaseStudyHero({ number, dateRange, title, subtitle, meta }: CaseStudyHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.crumb}>Case study {number} · {dateRange}</div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.metaGrid} aria-label="Project metadata">
        {meta.map(m => (
          <span key={m.label} className={styles.metaCell}>
            <span className={styles.metaLabel}>{m.label}</span>
            <span className={[styles.metaValue, m.accent ? styles.metaValueAccent : ''].filter(Boolean).join(' ')}>
              {m.value}
            </span>
          </span>
        ))}
      </div>
    </header>
  );
}
