import styles from './RoleCallout.module.css';

export interface RoleCalloutProps {
  /** Short descriptor of ownership — "Owned", "In the room", "Why Hotel" */
  label: string;
  /** One to two sentence statement of what was owned or done */
  content: string;
}

export function RoleCallout({ label, content }: RoleCalloutProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.content}>{content}</span>
    </div>
  );
}

/** Wraps a list of RoleCallout rows. */
export function RoleCallouts({ children }: { children: React.ReactNode }) {
  return <div className={styles.list}>{children}</div>;
}
