import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import styles from './ContactCard.module.css';

export type ContactFormStatus = 'idle' | 'sending' | 'sent' | 'error';

// website is the honeypot value — always empty for a real visitor, since the
// field is hidden from sighted users, screen readers, and keyboard tab order
// alike. elapsedMs is measured from when the card mounted to when Send was
// pressed, a second anti-bot signal alongside the honeypot. Both travel with
// the submission because the card is where they're actually observed — the
// hook that owns the request just forwards them to /api/contact.
export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  website: string;
  elapsedMs: number;
}

export interface ContactCardProps {
  status: ContactFormStatus;
  /** Server-side error message (rate limit, upstream failure) — shown above the form. */
  errorText?: string;
  onSubmit: (fields: ContactSubmission) => void;
  onDismiss: () => void;
  className?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

export function ContactCard({ status, errorText, onSubmit, onDismiss, className = '' }: ContactCardProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; message?: string }>({});
  // Captured in an effect, not read directly during render — Date.now() is
  // an impure call the React Compiler-era purity rule flags if it runs in
  // the render body. An effect always commits before a user could possibly
  // submit, so this is set well before handleFormSubmit ever reads it.
  const mountedAtRef = useRef(0);
  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const sending = status === 'sending';

  // The Send button uses native `disabled` while sending (see Button below),
  // which drops it out of the tab order and silently returns focus to <body>
  // if it had focus when clicked — a keyboard user loses their place with no
  // announcement. Move focus to this status line instead, which also
  // announces "Sending…" via role="status" (WCAG 2.4.3, 4.1.3).
  const sendingStatusRef = useRef<HTMLParagraphElement | null>(null);
  const wasSending = useRef(false);
  useEffect(() => {
    if (!wasSending.current && sending) sendingStatusRef.current?.focus();
    wasSending.current = sending;
  }, [sending]);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const errors: { email?: string; message?: string } = {};
    if (!EMAIL_PATTERN.test(trimmedEmail)) errors.email = 'Enter a valid email address.';
    if (trimmedMessage.length < MIN_MESSAGE_LENGTH) errors.message = 'Say a little more — at least 10 characters.';
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onSubmit({
      name: name.trim(),
      email: trimmedEmail,
      message: trimmedMessage,
      website,
      elapsedMs: Date.now() - mountedAtRef.current,
    });
  }

  if (status === 'sent') {
    return (
      <div className={[styles.card, className].filter(Boolean).join(' ')} role="status">
        <p className={styles.confirmation}>
          <span className={styles.confirmIcon} aria-hidden>
            ✓
          </span>
          Sent — Ben typically replies within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>SEND BEN A MESSAGE</span>
        <Button variant="ghost" size="sm" onClick={onDismiss} disabled={sending}>
          NOT NOW
        </Button>
      </div>

      {/* noValidate: validation and its error display are handled entirely by
          our own state (styled via Input's error prop) — without this, the
          browser's native constraint-validation popup for type="email"/required
          fires first and preempts our styled error state, which differs by
          browser and doesn't match the terminal aesthetic. */}
      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
        aria-label="Send Ben a message"
        noValidate
      >
        {errorText && (
          <p className={styles.formError} role="alert">
            {errorText}
          </p>
        )}

        {/* tabIndex=-1: focusable programmatically (see the sending useEffect
            above) but not part of the normal Tab order. */}
        <p ref={sendingStatusRef} tabIndex={-1} role="status" aria-live="polite" className="sr-only">
          {sending ? 'Sending your message…' : ''}
        </p>

        <Input
          label="NAME (OPTIONAL)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={sending}
          maxLength={100}
        />
        <Input
          label="EMAIL"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          disabled={sending}
          maxLength={254}
        />
        <Input
          label="MESSAGE"
          multiline
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={fieldErrors.message}
          disabled={sending}
          maxLength={2000}
        />

        {/* Honeypot: hidden from sighted users, screen readers, and tab order.
            Real visitors never see or fill it; anything non-empty here means
            an automated submission. See api/contact.ts. */}
        <input
          type="text"
          name="website"
          className={styles.honeypot}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <div className={styles.actions}>
          <Button type="submit" variant="primary" size="sm" disabled={sending}>
            {sending ? 'SENDING…' : 'SEND'}
          </Button>
        </div>
      </form>
    </div>
  );
}
