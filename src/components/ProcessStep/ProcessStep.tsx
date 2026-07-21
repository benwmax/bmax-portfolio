import styles from './ProcessStep.module.css';

export interface ProcessStepProps {
  /** 1-based display number */
  num: number;
  /** Short phase label — "Align", "Discover", "Build" */
  phase: string;
  /** One-line step title */
  title: string;
  /** Body explanation — 1–3 sentences */
  body: string;
  /** Method or artifact tag — rendered in amber */
  artifact: string;
}

export function ProcessStep({ num, phase, title, body, artifact }: ProcessStepProps) {
  return (
    <li className={styles.step}>
      <span className={styles.num} aria-hidden="true">
        {num}
      </span>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.phase}>{phase}</span>
          <span className={styles.title}>{title}</span>
        </div>
        <p className={styles.body}>{body}</p>
        <span className={styles.artifact}>{artifact}</span>
      </div>
    </li>
  );
}

/** Wraps a list of ProcessStep cards with the correct 2px seam gap.
 *  <ol>: the visual number is aria-hidden, so list semantics are how AT
 *  users get "item 2 of 4" sequence context (WCAG 1.3.1). */
export function ProcessSteps({ children }: { children: React.ReactNode }) {
  return <ol className={styles.list}>{children}</ol>;
}
