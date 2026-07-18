import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  fullWidth?: boolean;
  className?: string;
}

const BASE = [
  'inline-flex items-center justify-center gap-[0.5em]',
  'border rounded-md cursor-pointer no-underline whitespace-nowrap',
  'uppercase tracking-widest font-mono-display',
  'transition-colors duration-base ease-default',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent',
  'disabled:cursor-not-allowed disabled:opacity-45',
].join(' ');

const SIZES: Record<ButtonSize, string> = {
  sm: 'text-xs py-[0.45rem] px-[0.8rem]',
  md: 'text-sm py-[0.6rem] px-[1.1rem] min-h-[44px]',
  lg: 'text-base py-3 px-[1.4rem] min-h-[44px]',
};

const VARIANTS: Record<ButtonVariant, string> = {
  // Reads its colors from the --btn-primary-* tokens (not --color-interactive-*)
  // so the futuristic theme's solid-fill treatment — needed for contrast on a
  // light background — swaps in without touching this component. See
  // tokens.css "Button — primary" component tokens.
  primary:
    'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--btn-primary-border)] hover:bg-[var(--btn-primary-hover-bg)] hover:text-[var(--btn-primary-hover-text)] hover:border-[var(--btn-primary-hover-border)]',
  secondary:
    'bg-transparent text-text-secondary border-border-default hover:text-text-primary hover:border-border-strong',
  ghost: 'bg-transparent text-green-accent border-transparent px-2 hover:text-green-bright',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  href,
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const cls = [
    BASE,
    variant === 'ghost' ? `text-sm py-[0.6rem]` : SIZES[size],
    VARIANTS[variant],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // data-variant is a stable hook (the visible classes are Tailwind utilities,
  // which aren't targetable per-variant). The futuristic theme uses it to add
  // per-variant HUD refinements — see index.css. Focus rings stay on the utility
  // layer so theme CSS never clips them.
  if (href && !disabled) {
    const isExternal = href.startsWith('http');
    return (
      <a
        className={cls}
        data-variant={variant}
        href={href}
        onClick={onClick}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      data-variant={variant}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={cls}
    >
      <span>{children}</span>
    </button>
  );
}
