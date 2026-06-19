import { useState, useRef, useCallback, useEffect } from 'react';
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

  function handleKeyDown(e: KeyboardEvent) {
    if (multiline && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  }

  const fieldCls = [
    styles.field,
    isActive ? styles.active : '',
    multiline ? styles.multiline : '',
  ].filter(Boolean).join(' ');

  const inputCls = [
    styles.input,
    isLoading && !multiline ? styles.inputLoading : '',
    isLoading && multiline ? styles.inputMultiLoading : '',
    !isLoading && multiline && isMultiRow ? styles.inputMultiCounter : '',
  ].filter(Boolean).join(' ');

  const btnCls = [
    styles.btn,
    multiline ? styles.btnMulti : '',
  ].filter(Boolean).join(' ');

  const statusCls = [
    styles.status,
    isOffline ? styles.statusOffline : '',
  ].filter(Boolean).join(' ');

  const dotCls = [
    styles.statusDot,
    isOffline ? styles.statusDotOffline : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* label wrapper makes the entire field area (including › prompt) clickable to focus */}
        <label className={fieldCls}>
          <span className={styles.prompt} aria-hidden>›</span>

          {showCaret && (
            <span
              className={[styles.caret, multiline ? styles.caretMulti : ''].filter(Boolean).join(' ')}
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
                className={[
                  styles.loadText,
                  multiline ? styles.loadTextMulti : '',
                ].filter(Boolean).join(' ')}
              >
                <span className={styles.pulse} aria-hidden />
                thinking
              </span>
              <span className={styles.sweep} aria-hidden />
            </>
          )}

          {multiline && !isLoading && isMultiRow && (
            <span className={styles.counter} aria-live="polite">
              {value.length} / {MAX_CHARS}
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

      {showStatus && (
        <div className={statusCls} role="status">
          <span className={dotCls} aria-hidden />
          {isOffline
            ? 'OFFLINE · responses unavailable'
            : 'ONLINE · assistant ready'}
        </div>
      )}
    </div>
  );
}
