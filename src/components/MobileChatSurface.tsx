import { useEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { ChatInput } from './ChatInput';
import type { ChatWidgetStatus } from './ChatInput';
import styles from './MobileChatSurface.module.css';

export interface MobileChatSurfaceProps {
  /**
   * Whether the FAB entry point should exist. Gated to mobile by CSS regardless,
   * so this only controls whether the button renders at all. Drive it from
   * `fabRevealed || messages.length > 0` (Home) or `true` (case study pages).
   */
  visible: boolean;
  /** Controlled open state of the full-screen overlay. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Drives the FAB badge count and its aria-label. */
  messageCount: number;
  chatStatus: ChatWidgetStatus;
  onSubmit: (text: string) => void;
  /**
   * Renders the message log into the overlay. The parent owns the log's content
   * (greeting, suggestion chips, messages) and its per-page message styling; it
   * receives the ref (this component autoscrolls it) and the overlay log's
   * container className. Kept as a render prop rather than duplicating each
   * page's log markup here.
   */
  renderLog: (ref: RefObject<HTMLDivElement | null>, className: string) => ReactNode;
}

/**
 * The mobile-only "Ask Ben" entry point: a floating action button that opens a
 * full-screen chat overlay. Shared by the homepage and case study pages so the
 * mobile chat behaves identically on both. Desktop keeps its inline/docked
 * panels — everything here is suppressed above 760px by the stylesheet.
 *
 * Why this exists: on mobile the homepage's inline chat panel collapses the
 * moment a conversation starts (it's built to slide into the desktop docked
 * rail), leaving the reply streaming into a hidden, non-interactive surface.
 * Handing off to this overlay on first submit fixes that. See decisions.md
 * 2026-07-19.
 */
export function MobileChatSurface({
  visible,
  open,
  onOpenChange,
  messageCount,
  chatStatus,
  onSubmit,
  renderLog,
}: MobileChatSurfaceProps) {
  const fabRef = useRef<HTMLButtonElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  // Keep the overlay log pinned to the newest message as the reply streams in.
  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messageCount, open]);

  // Return focus to the FAB when the overlay closes (WCAG 2.4.3 focus order).
  // Tracks the previous open state so focus only moves on an actual close, not
  // on every render while closed.
  const wasOpen = useRef(open);
  useEffect(() => {
    if (wasOpen.current && !open) fabRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      {/* FAB — mobile-only via CSS. Hidden while the overlay is open so it no
          longer overlaps the active chat. */}
      {visible && !open && (
        <button
          ref={fabRef}
          type="button"
          className={styles.fab}
          onClick={() => onOpenChange(true)}
          aria-label={`Open chat${
            messageCount > 0 ? ` — ${messageCount} message${messageCount !== 1 ? 's' : ''}` : ''
          }`}
        >
          <span className={styles.fabPrompt} aria-hidden>
            ›
          </span>
          Ask Ben
          {messageCount > 0 && (
            <span className={styles.fabBadge} aria-hidden>
              {messageCount}
            </span>
          )}
        </button>
      )}

      {/* Full-screen overlay sheet. Always mounted so the log/aria-live region
          is stable; hidden + inert while closed. */}
      <div
        className={[styles.mobileOverlay, open ? styles.mobileOverlayOpen : '']
          .filter(Boolean)
          .join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Ask Ben — assistant"
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className={styles.mobileOverlayBar}>
          <span className={styles.chatBarLabel}>Ask Ben</span>
          <div className={styles.mobileOverlayBarRight}>
            <span className={styles.chatOnlineBadge}>
              <span className={`${styles.chatOnlineDot} cursor-blink`} aria-hidden />
              ONLINE
            </span>
            <button
              type="button"
              className={styles.mobileOverlayClose}
              onClick={() => onOpenChange(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
        </div>
        {renderLog(logRef, styles.mobileOverlayLog)}
        <div className={styles.chatInputWrap}>
          <ChatInput
            onSubmit={onSubmit}
            status={chatStatus}
            placeholder="ask about my work…"
            multiline
            showStatus={false}
          />
        </div>
      </div>
    </>
  );
}
