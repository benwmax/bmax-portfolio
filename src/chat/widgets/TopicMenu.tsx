import { useId } from 'react';
import { TOPIC_GROUPS, visibleTopics } from '../topics';
import { useWidgetActions } from './WidgetActions';
import styles from './Widgets.module.css';

/**
 * Every starter prompt, grouped. It is the homepage's empty state and, as the
 * `topics` widget, the "show me everything" answer mid-conversation — so the
 * menu a visitor saw on arrival is always one click away, never scrolled off.
 *
 * The groups are ordered for the people reading this site: a recruiter's
 * questions ("who is he", "what's he looking for") sit at the two ends, and the
 * work itself sits in the middle in portfolio order.
 */
export function TopicMenu({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const { playTopic } = useWidgetActions();
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  // The menu can render twice (empty state, then as a widget) — ids must stay unique.
  const idPrefix = useId();
  return (
    <div className={styles.menu}>
      {TOPIC_GROUPS.map((g) => {
        const topics = visibleTopics(g.id);
        if (topics.length === 0) return null;
        return (
          <section key={g.id} className={styles.menuGroup} aria-labelledby={`${idPrefix}-${g.id}`}>
            <Heading id={`${idPrefix}-${g.id}`} className={styles.menuLabel}>
              {g.label}
            </Heading>
            <ul className={styles.menuList} role="list">
              {topics.map((t) => (
                <li key={t.id}>
                  <button type="button" className={styles.menuItem} onClick={() => playTopic(t.id)}>
                    <span className={styles.menuKicker}>{t.kicker}</span>
                    <span className={styles.menuPrompt}>{t.prompt}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
