import { useState, useRef, useCallback, useEffect, useId } from 'react';
import type { FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import styles from './ChatInput.module.css';

export type ChatWidgetStatus = 'online' | 'offline' | 'loading';

const MAX_CHARS = 2000;
const MAX_ROWS = 6;

export interface ChatInputProps {
  onSubmit: (text: string) => void;
  status?: ChatWidgetStatus;
  placeholder?: string;
  multiline?: boolean;
  /** Pre-populate the field — used in Storybook to show filled/loading states. */
  initialValue?: string;
  /** Force the focused visual state (green border, block caret) — Storybook only. */
  forceFocused?: boolean;
  /**
   * Show the ONLINE/OFFLINE status bar below the input. Default: true.
   * Set false when the surrounding panel already carries a status indicator
   * (e.g. the homepage chat panels).
   */
  showStatus?: boolean;
  className?: string;
}

export function ChatInput({
  onSubmit,
  status = 'online',
  placeholder = 'ask about my work…',
  multiline = false,
  initialValue = '',
  forceFocused = false,
  showStatus = true,
  className = '',
}: ChatInputProps) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isMultiRow, setIsMultiRow] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const keyHintId = useId();

  const isLoading = status === 'loading';
  const isOffline = status === 'offline';
  const isFilled = value.length > 0;

  // Green active state: whenever the field is engaged — focused, has text, or loading
  const isActive = isFocused || forceFocused || isFilled || isLoading;
  // Custom block caret covers the empty-focused state; native caret takes over when typing
  const showCaret = (isFocused || forceFocused) && !isFilled;

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const cs = getComputedStyle(el);
    const lineHeight = parseFloat(cs.lineHeight);
    const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const singleRowHeight = lineHeight + paddingY;
    const maxHeight = lineHeight * MAX_ROWS + paddingY;
    const newHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = newHeight + 'px';
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
    setIsMultiRow(el.scrollHeight > singleRowHeight);
  }, []);

  useEffect(() => {
    if (multiline) autoResize();
  }, [value, multiline, autoResize]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading || isOffline) return;
    onSubmit(trimmed);
    setValue('');
  }

  // Enter submits; Shift+Enter inserts a newline. This is the chat convention
  // visitors already have muscle memory for — the field reads as a chat prompt,
  // so making the common action (send) the unmodified key and the rare one
  // (multi-line question) the modified one matches what they expect. Cmd/Ctrl+Enter
  // still submits too, since it falls through the same path.
  // Single-line mode needs no handling — a bare <input> submits its form on Enter natively.
  function handleKeyDown(e: KeyboardEvent) {
    if (!multiline || e.key !== 'Enter') return;
    // Mid-IME-composition Enter commits the candidate word — it is not a send.
    // Without this, anyone using a Japanese/Chinese/Korean input method fires off
    // a half-typed message every time they accept a suggestion.
    if (e.nativeEvent.isComposing) return;
    if (e.shiftKey) return;
    e.preventDefault();
    handleSubmit(e as unknown as FormEvent);
  }

  const fieldCls = [styles.field, isActive ? styles.active : '', multiline ? styles.multiline : '']
    .filter(Boolean)
    .join(' ');

  const inputCls = [
    styles.input,
    showCaret ? styles.inputHideCaret : '',
    isLoading && !multiline ? styles.inputLoading : '',
    isLoading && multiline ? styles.inputMultiLoading : '',
    !isLoading && multiline && isMultiRow && isFilled ? styles.inputMultiCounter : '',
  ]
    .filter(Boolean)
    .join(' ');

  const btnCls = [styles.btn, multiline ? styles.btnMulti : ''].filter(Boolean).join(' ');

  const statusCls = [styles.status, isOffline ? styles.statusOffline : '']
    .filter(Boolean)
    .join(' ');

  const dotCls = [styles.statusDot, isOffline ? styles.statusDotOffline : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* label wrapper makes the entire field area (including › prompt) clickable to focus */}
        <label className={fieldCls}>
          <span className={styles.prompt} aria-hidden>
            ›
          </span>

          {showCaret && (
            <span
              className={[styles.caret, multiline ? styles.caretMulti : '']
                .filter(Boolean)
                .join(' ')}
              aria-hidden
            />
          )}

          {multiline ? (
            <textarea
              ref={textareaRef}
              rows={1}
              className={inputCls}
              value={value}
              placeholder={showCaret ? '' : placeholder}
              readOnly={isLoading}
              aria-label="Ask a question"
              aria-describedby={keyHintId}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                if (isLoading) return;
                setValue(e.target.value.slice(0, MAX_CHARS));
                autoResize();
              }}
            />
          ) : (
            <input
              type="text"
              className={inputCls}
              value={value}
              placeholder={showCaret ? '' : placeholder}
              readOnly={isLoading}
              aria-label="Ask a question"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (isLoading) return;
                setValue(e.target.value.slice(0, MAX_CHARS));
              }}
            />
          )}

          {isLoading && (
            <>
              <span
                className={[styles.loadText, multiline ? styles.loadTextMulti : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className={styles.pulse} aria-hidden />
                thinking
              </span>
              <span className={styles.sweep} aria-hidden />
            </>
          )}

          {/* Counter inside .field so it resolves to .field's position:relative anchor.
              Gated on isFilled, not just isMultiRow — an empty field can measure as
              multi-row on first paint (autoResize runs once on mount, before webfont
              metrics settle, and never reruns for unchanged content), which showed the
              counter over the placeholder with no real content to count. */}
          {/* No aria-live here on purpose — with a live region this fired on
              every keystroke, interrupting a screen reader user mid-typing
              for a count they can't overflow anyway (value is truncated to
              MAX_CHARS). Purely visual; the field can't silently hit a limit
              AT users aren't told about. */}
          {multiline && !isLoading && isMultiRow && isFilled && (
            <span className={styles.counter}>
              {value.length} / {MAX_CHARS}
            </span>
          )}

          {/* Screen-reader-only: the Enter-submits/Shift+Enter-newline
              convention (see handleKeyDown above) reverses the native
              textarea default of plain Enter inserting a newline — without
              this, a screen reader or dictation user composing a multi-line
              question by muscle memory could fire an incomplete message
              (WCAG 3.3.2). */}
          {multiline && (
            <span id={keyHintId} className={styles.srOnly}>
              Press Enter to send. Press Shift+Enter for a new line.
            </span>
          )}
        </label>

        <button
          type="submit"
          className={btnCls}
          disabled={isLoading || isOffline || !value.trim()}
          aria-label="Submit question"
        >
          Ask
        </button>
      </form>

      {/* Screen-reader-only live region — announces loading state without visual noise */}
      <p role="status" aria-live="polite" aria-atomic="true" className={styles.srOnly}>
        {isLoading ? 'Sending your question. Please wait.' : ''}
      </p>

      {showStatus && (
        <div className={statusCls} role="status">
          <span className={dotCls} aria-hidden />
          {isOffline ? 'OFFLINE · responses unavailable' : 'ONLINE · assistant ready'}
        </div>
      )}
    </div>
  );
}
