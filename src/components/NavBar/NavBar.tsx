import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import styles from './NavBar.module.css';

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
  /**
   * Show who this is beside the wordmark — "Ben Maxwell · UX Designer". On by
   * default only on the chat homepage (Ben, 2026-10-29): with the work grid
   * gone, nothing on that first screen said he's a designer. Other pages carry
   * it in their own headings. Collapses to the role alone on phones.
   */
  showIdentity?: boolean;
}

export function NavBar({ activePath, className = '', showIdentity = false }: NavBarProps) {
  const pathname =
    activePath !== undefined
      ? activePath
      : typeof window !== 'undefined'
        ? window.location.pathname
        : '';

  return (
    <header className={[styles.header, className].filter(Boolean).join(' ')}>
      <div className={styles.brand}>
        <Link to="/" className={styles.wordmark} aria-label="BM_ — Ben Maxwell, Home">
          BM
          <span className={styles.underscore} aria-hidden="true">
            _
          </span>
        </Link>
        {showIdentity && (
          <span className={styles.identity}>
            <span className={styles.identityName}>Ben Maxwell</span>
            <span className={styles.identitySep} aria-hidden="true">
              ·
            </span>
            <span className={styles.identityRole}>UX Designer</span>
          </span>
        )}
      </div>
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
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
