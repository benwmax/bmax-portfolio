import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase label above the field. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message — overrides hint and turns the border red. */
  error?: string;
  /** Render a multi-line <textarea> instead of <input>. */
  multiline?: boolean;
  /** Show the green › terminal prompt indicator inside the field. */
  prompt?: boolean;
}

export function Input({
  label,
  hint,
  error,
  multiline = false,
  prompt = false,
  id,
  className,
  ...rest
}: InputProps) {
  const genId = useId();
  const fieldId = id ?? genId;
  const hintId = `${fieldId}-hint`;

  const inputCls = [
    styles.input,
    prompt ? styles.withPrompt : '',
    error ? styles.hasError : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    id: fieldId,
    className: inputCls,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': hint || error ? hintId : undefined,
  };

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className={styles.wrap}>
        {prompt && (
          <span className={styles.prompt} aria-hidden>
            ›
          </span>
        )}
        {multiline ? (
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          <textarea {...sharedProps} {...(rest as any)} />
        ) : (
          <input {...sharedProps} {...rest} />
        )}
      </div>
      {(hint || error) && (
        <span id={hintId} className={error ? styles.hintError : styles.hint}>
          {error ?? hint}
        </span>
      )}
    </div>
  );
}
