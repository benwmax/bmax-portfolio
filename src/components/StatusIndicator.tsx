export type StatusState = 'online' | 'offline';

export interface StatusIndicatorProps {
  label: string;
  status: StatusState;
}

export function StatusIndicator({ label, status }: StatusIndicatorProps) {
  return (
    <div data-component="status-indicator" data-status={status} role="status">
      <span data-status-dot aria-label={`Status: ${status}`} />
      <span data-status-label>{label}</span>
    </div>
  );
}
