import { useTheme } from '../../hooks/useTheme';
import type { ThemeName } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const OPTIONS: { value: ThemeName; label: string; abbr: string }[] = [
  { value: 'retro', label: 'Retro', abbr: 'RET' },
  { value: 'futuristic', label: 'Futuristic', abbr: 'FUT' },
];

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Retro / Futuristic theme switch — lives at the top right of every page
 * (right edge of the NavBar). A segmented control rather than an unlabeled
 * icon switch: the theme names ARE the feature, and both options being
 * visible invites the flip. Labels abbreviate to RET/FUT below 560px so
 * the NavBar still fits at 390px.
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={[styles.group, className].filter(Boolean).join(' ')}
      role="radiogroup"
      aria-label="Interface theme"
    >
      {OPTIONS.map(({ value, label, abbr }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            className={[styles.option, active ? styles.optionActive : ''].filter(Boolean).join(' ')}
            onClick={() => setTheme(value)}
          >
            <span className={styles.labelFull} aria-hidden="true">
              {label}
            </span>
            <span className={styles.labelAbbr} aria-hidden="true">
              {abbr}
            </span>
            <span className="sr-only">{label} theme</span>
          </button>
        );
      })}
    </div>
  );
}
