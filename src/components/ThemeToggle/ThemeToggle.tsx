import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
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
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // ARIA APG radiogroup pattern: only the checked radio is a tab stop
  // (roving tabindex below), and Arrow keys both move focus AND change the
  // selection — role="radio"/"radiogroup" implies this keyboard model, so
  // without it the roles claim a behavior the component doesn't have
  // (WCAG 4.1.2). With only two options, "next" and "previous" are the
  // same button either way.
  function selectByOffset(fromIndex: number, offset: number) {
    const nextIndex = (fromIndex + offset + OPTIONS.length) % OPTIONS.length;
    setTheme(OPTIONS[nextIndex].value);
    buttonRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        selectByOffset(index, 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        selectByOffset(index, -1);
        break;
    }
  }

  return (
    <div
      className={[styles.group, className].filter(Boolean).join(' ')}
      role="radiogroup"
      aria-label="Interface theme"
    >
      {OPTIONS.map(({ value, label, abbr }, index) => {
        const active = theme === value;
        return (
          <button
            key={value}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            className={[styles.option, active ? styles.optionActive : ''].filter(Boolean).join(' ')}
            onClick={() => setTheme(value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
