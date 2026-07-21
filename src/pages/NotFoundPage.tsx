import { Helmet } from 'react-helmet-async';
import { NavBar } from '../components/NavBar';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>Page not found — Ben Maxwell | viewbens.work</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar />

      <main className={styles.main} id="main-content">
        {/* No visible heading fits the terminal aesthetic without duplicating the
            "Error 404: Not found" line below — sr-only so heading-navigation
            users still land on a real page title. */}
        <h1 className="sr-only">Page not found</h1>
        <div className={styles.terminal} aria-label="404 error terminal">
          <div className={styles.terminalBar} aria-hidden="true">
            <span className={styles.termDot} />
            <span className={styles.termDot} />
            <span className={styles.termDot} />
            <span className={styles.termLabel}>shell — 80×24</span>
          </div>
          <div className={styles.terminalBody}>
            <p className={styles.termLine}>
              <span className={styles.prompt} aria-hidden="true">
                $&nbsp;
              </span>
              fetch /page
            </p>
            <p className={styles.termError}>
              Error 404: Not found. The page you requested does not exist.
            </p>
            <p className={styles.termBlank} aria-hidden="true">
              &nbsp;
            </p>
            <p className={styles.termLine}>
              <span className={styles.prompt} aria-hidden="true">
                $&nbsp;
              </span>
              cd /home
              <span className={`${styles.termCursor} cursor-blink`} aria-hidden="true">
                _
              </span>
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaNote}>Page not found.</p>
          <a href="/" className={styles.ctaLink}>
            ← Back to work
          </a>
        </div>
      </main>
    </div>
  );
}
