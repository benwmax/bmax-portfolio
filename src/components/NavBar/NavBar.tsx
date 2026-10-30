import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import styles from './NavBar.module.css';

/**
 * The public Storybook — the design system behind this site. In the main nav
 * (Ben, 2026-10-30) because the system is part of the portfolio, not a dev
 * tool. External, so it opens in a new tab and says so to screen readers.
 * Label shortens to "System" on phones to keep the row on one line.
 */
const DESIGN_SYSTEM_URL = 'https://system.viewbens.work';

const NAV_LINKS = [
  // Chat-first experiment (2026-10-29): Home is the work, reached by the
  // wordmark, so the nav carries the pages the chat links out to.
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const;

export interface NavBarProps {
  /**
   * Override the active route check — pass the current pathname directly.
   * In production, wire this to your router's pathname (React Router, etc.).
   * In Storybook, pass the href string you want to mark active.
   * When omitted, falls back to window.location.pathname.
   */
  activePath?: string;
  className?: string;
}

export function NavBar({ activePath, className = '' }: NavBarProps) {
  const pathname =
    activePath !== undefined
      ? activePath
      : typeof window !== 'undefined'
        ? window.location.pathname
        : '';

  return (
    <header className={[styles.header, className].filter(Boolean).join(' ')}>
      <Link to="/" className={styles.wordmark} aria-label="BM_ — Ben Maxwell, Home">
        BM
        <span className={styles.underscore} aria-hidden="true">
          _
        </span>
      </Link>
      <div className={styles.right}>
        <nav aria-label="Site navigation">
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    to={href}
                    className={[styles.link, isActive ? styles.linkActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={DESIGN_SYSTEM_URL}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                // One accessible name at every width; the visible label swaps
                // with the viewport and is hidden from AT (WCAG 2.5.3: the
                // visible "System" is contained in the name).
                aria-label="Design system (opens in new tab)"
              >
                <span className={styles.labelFull} aria-hidden="true">
                  Design system
                </span>
                <span className={styles.labelShort} aria-hidden="true">
                  System
                </span>
                <span className={styles.external} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
