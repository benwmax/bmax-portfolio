export type StatusState = 'online' | 'offline' | 'warning' | 'error';

export interface StatusIndicatorProps {
  label: string;
  status: StatusState;
  /** Defaults to true when status is 'online'. */
  blink?: boolean;
  className?: string;
}

const DOT_COLORS: Record<StatusState, string> = {
  online: 'bg-status-online',
  offline: 'bg-text-disabled',
  warning: 'bg-status-warning',
  error: 'bg-status-error',
};

export function StatusIndicator({ label, status, blink, className = '' }: StatusIndicatorProps) {
  const shouldBlink = blink ?? status === 'online';

  const containerCls = [
    'inline-flex items-center gap-2',
    'font-mono-ui text-xs tracking-wide uppercase text-text-tertiary',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const dotCls = [
    'w-[7px] h-[7px] rounded-full flex-none',
    DOT_COLORS[status],
    shouldBlink ? 'cursor-blink' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerCls} data-status={status} role="status">
      <span className={dotCls} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
