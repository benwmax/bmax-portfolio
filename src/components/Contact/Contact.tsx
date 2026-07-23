import { useState } from 'react';
import { NavBar } from '../NavBar';
import { Button } from '../Button';
import styles from './Contact.module.css';

async function copyText(text: string, setter: (v: boolean) => void) {
  try {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 1800);
  } catch {
    /* graceful degradation */
  }
}

export function Contact() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  // The buttons already swap their own visible label to "COPIED ✓", but that
  // change is silent to screen readers with no live region watching it — this
  // announces the same event out loud (WCAG 4.1.3).
  const copyAnnouncement = emailCopied
    ? 'Email address copied.'
    : urlCopied
      ? 'LinkedIn URL copied.'
      : '';

  return (
    <div className={styles.wrapper}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar activePath="/contact" />

      <main id="main-content" className={styles.main}>
        <p className={styles.kicker}>DIRECT LINE · RESPONSE ≤ 48H</p>

        <h1 className={styles.heading}>
          Say <span className={styles.headingAmber}>hello</span>.
        </h1>

        <p role="status" aria-live="polite" className="sr-only">
          {copyAnnouncement}
        </p>

        <div className={styles.cards}>
          {/* ── Email ── */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <span className={styles.cardNum}>01</span>
                <span className={styles.cardLabel}>EMAIL · THE LONG VERSION</span>
              </div>
              <span className={styles.cardType}>DIRECT</span>
            </div>

            <a href="mailto:ben@viewbens.work" className={styles.cardAddress}>
              ben<span className={styles.addressAt}>@</span>viewbens.work
            </a>

            <p className={styles.cardDesc}>
              Briefs, role conversations, attachments. Land in my inbox and I'll reply within two
              business days — usually the same one.
            </p>

            <div className={styles.cardActions}>
              <Button variant="primary" href="mailto:ben@viewbens.work">
                COMPOSE EMAIL +
              </Button>
              <Button
                variant="secondary"
                onClick={() => copyText('ben@viewbens.work', setEmailCopied)}
              >
                {emailCopied ? 'COPIED ✓' : 'COPY ADDRESS'}
              </Button>
            </div>
          </div>

          {/* ── LinkedIn ── */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <span className={styles.cardNum}>02</span>
                <span className={styles.cardLabel}>LINKEDIN · THE SHORT VERSION</span>
              </div>
              <span className={styles.cardType}>PUBLIC</span>
            </div>

            <a
              href="https://www.linkedin.com/in/benjaminwmaxwell/"
              className={styles.cardAddress}
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com<span className={styles.addressSlash}>/</span>in
              <span className={styles.addressSlash}>/</span>benjaminwmaxwell
              <span className="sr-only"> (opens in new tab)</span>
            </a>

            <p className={styles.cardDesc}>
              For "hello, are you free for a call," recruiter intros, and the chronological version
              of the work shown on this site.
            </p>

            <div className={styles.cardActions}>
              <Button variant="primary" href="https://www.linkedin.com/in/benjaminwmaxwell/">
                OPEN PROFILE +<span className="sr-only"> (opens in new tab)</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => copyText('https://www.linkedin.com/in/benjaminwmaxwell/', setUrlCopied)}
              >
                {urlCopied ? 'COPIED ✓' : 'COPY URL'}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Receipt ── */}
        <div className={styles.receipt}>
          <div className={styles.receiptCell}>
            <div className={styles.receiptLabel}>REPLY WITHIN</div>
            <div className={styles.receiptValue}>≤ 48 hrs</div>
          </div>
          <div className={styles.receiptCell}>
            <div className={styles.receiptLabel}>TIMEZONE</div>
            <div className={styles.receiptValue}>Dallas · UTC-5</div>
          </div>
          <div className={styles.receiptCell}>
            <div className={styles.receiptLabel}>STATUS</div>
            <div className={`${styles.receiptValue} ${styles.receiptStatus}`}>
              <span className={`${styles.statusDot} cursor-blink`} aria-hidden />
              Available
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerFine}>
          <span>© 2026 Ben Maxwell · viewbens.work</span>
          <span>ben@viewbens.work · linkedin/in/benjaminwmaxwell · ≤ 48h</span>
        </div>
      </footer>
    </div>
  );
}
