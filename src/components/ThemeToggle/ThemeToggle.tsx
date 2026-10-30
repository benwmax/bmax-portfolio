import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useTheme } from '../../hooks/useTheme';
import type { ThemeName } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const OPTIONS: { value: ThemeName; label: string }[] = [
  { value: 'retro', label: 'Retro' },
  { value: 'futuristic', label: 'Futuristic' },
];

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Retro / Futuristic theme switch — lives at the top right of every page
 * (right edge of the NavBar). A segmented control rather than an unlabeled
 * icon switch: the theme names ARE the feature, and both options being
 * visible invites the flip. Below 560px it's replaced by a single compact
 * switch so the NavBar keeps four links on one row (2026-10-30).
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

  const futuristic = theme === 'futuristic';

  return (
    <>
      {/* Phones (≤560px): a single switch instead of the two-part control, so
          the NavBar fits four links on one row — Design system joined the nav
          on 2026-10-30. Only one of the two controls is ever displayed; the
          other is display:none, which also removes it from the AT tree. */}
      <button
        type="button"
        role="switch"
        aria-checked={futuristic}
        aria-label="Futuristic theme"
        className={[styles.compact, className].filter(Boolean).join(' ')}
        onClick={() => setTheme(futuristic ? 'retro' : 'futuristic')}
      >
        <span aria-hidden="true">◐</span>
      </button>
      <div
        className={[styles.group, className].filter(Boolean).join(' ')}
        role="radiogroup"
        aria-label="Interface theme"
      >
        {OPTIONS.map(({ value, label }, index) => {
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
              className={[styles.option, active ? styles.optionActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setTheme(value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span aria-hidden="true">{label}</span>
              <span className="sr-only">{label} theme</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
