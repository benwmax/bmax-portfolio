import styles from './NavBar.module.css';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
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
      <a href="/" className={styles.wordmark}>
        BM
        <span className={styles.underscore} aria-hidden="true">
          _
        </span>
      </a>
      <nav aria-label="Site navigation">
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={[styles.link, isActive ? styles.linkActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
