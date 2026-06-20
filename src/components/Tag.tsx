import type { ReactNode } from 'react';

export type TagVariant = 'default' | 'green' | 'solid';
export type TagSize = 'sm' | 'lg';

export interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  dot?: boolean;
  className?: string;
}

const VARIANTS: Record<TagVariant, string> = {
  default: 'text-amber-accent border-amber-deep bg-transparent',
  green: 'text-green-light border-green-border bg-green-deepest',
  solid: 'text-bg-page bg-amber-accent border-amber-accent',
};

const SIZES: Record<TagSize, string> = {
  sm: 'text-sm tracking-ultra py-[0.28em] px-[0.65em]',
  lg: 'text-md tracking-[0.18em] py-[7px] px-[14px]',
};

export function Tag({
  label,
  variant = 'default',
  size = 'sm',
  dot = false,
  className = '',
}: TagProps) {
  const cls = [
    'inline-flex items-center gap-[0.45em]',
    'font-mono-display uppercase leading-none whitespace-nowrap',
    'rounded-sm border',
    VARIANTS[variant],
    SIZES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={cls}>
      {dot && (
        <span className="h-[0.45em] w-[0.45em] flex-none rounded-full bg-current" aria-hidden />
      )}
      {label}
    </span>
  );
}
