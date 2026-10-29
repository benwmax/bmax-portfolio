import { Fragment, useCallback, useLayoutEffect, useRef } from 'react';
import type { ReactNode, Ref } from 'react';
import { splitParagraphs } from '../../hooks/useChatSession';
import type { Message } from '../../hooks/useChatSession';
import styles from './ChatTranscript.module.css';

export interface ChatTranscriptProps {
  messages: Message[];
  /** True while a reply is streaming — shows the cursor and quiets the live region. */
  streaming?: boolean;
  /**
   * The inline ContactCard, or null when it isn't showing. Passed in rather than
   * built here so the transcript stays free of contact-form state.
   */
  contactCard?: ReactNode;
  /**
   * How many messages render before the contact card (useChatSession's
   * `contactCardAfter`). Null/undefined pins it to the end of the log.
   */
  contactCardAfter?: number | null;
  /** Shown only while the log is empty — the homepage's "Howdy" opener. */
  greeting?: string;
  /** Rendered after everything else in the log — e.g. suggestion chips. */
  children?: ReactNode;
  /** The scrolling container's class — each surface sizes its own log. */
  className?: string;
  /** The scrolling container, for pages that need to read it. Scrolling is handled here. */
  ref?: Ref<HTMLDivElement>;
  /**
   * Reserve trailing space so a short reply still lets the newest prompt reach the
   * top of the log. Turn off for a log that sizes to its content (the homepage hero
   * panel) — there the reserved space would just grow the panel.
   */
  pinToTop?: boolean;
}

const PIN_INSET_PX = 8;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll behavior, shared by every chat surface: when the visitor sends a message,
 * that prompt slides up and pins to the top of the log and the reply streams in
 * below it. After that nothing scrolls on its own — a long reply is read from its
 * first line, not chased to its last. (Replaces scroll-to-bottom, 2026-10-26.)
 *
 * To let the prompt reach the top when the reply is still short, a trailing spacer
 * fills whatever room is left under the prompt and shrinks as the reply grows.
 */
function usePinLatestPrompt(
  logRef: { current: HTMLDivElement | null },
  spacerRef: { current: HTMLDivElement | null },
  userCount: number,
  enabled: boolean,
) {
  const prevUserCount = useRef(0);
  const lastHeight = useRef(0);

  const getPrompt = () =>
    logRef.current?.querySelector<HTMLElement>('[data-latest-prompt]') ?? null;

  const fitSpacer = useCallback(() => {
    const log = logRef.current;
    const spacer = spacerRef.current;
    if (!log || !spacer) return;
    const prompt = getPrompt();
    if (!enabled || !prompt || !log.clientHeight) {
      spacer.style.height = '0px';
      return;
    }
    const cs = getComputedStyle(log);
    const room = log.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    // Everything from the prompt's top down to where the spacer begins.
    const used = spacer.getBoundingClientRect().top - prompt.getBoundingClientRect().top;
    spacer.style.height = `${Math.max(0, room - used)}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const pin = useCallback((smooth: boolean) => {
    const log = logRef.current;
    const prompt = getPrompt();
    if (!log || !prompt || !log.clientHeight) return;
    // Sit just under the top edge, tighter than the log's padding so the tail of the
    // previous message (one flex gap above) is scrolled fully out of view.
    const top =
      log.scrollTop +
      prompt.getBoundingClientRect().top -
      log.getBoundingClientRect().top -
      PIN_INSET_PX;
    log.scrollTo({ top, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Streaming re-renders this on every chunk, so the spacer tracks the reply as it grows.
  useLayoutEffect(() => {
    fitSpacer();
    if (userCount > prevUserCount.current) {
      // Instant on first sight of existing history (navigating between pages),
      // sliding for a prompt sent just now.
      pin(prevUserCount.current > 0);
    }
    prevUserCount.current = userCount;
  });

  // A log that was display:none (the mobile overlay, the docked rail before it
  // opens) has no height to pin against — pin once it gets one, and refit on resize.
  useLayoutEffect(() => {
    const log = logRef.current;
    if (!log) return;
    const ro = new ResizeObserver(() => {
      const wasHidden = lastHeight.current === 0;
      lastHeight.current = log.clientHeight;
      fitSpacer();
      if (wasHidden && log.clientHeight > 0) pin(false);
    });
    ro.observe(log);
    return () => ro.disconnect();
  }, [fitSpacer, pin, logRef]);
}

/**
 * The chat message log shared by every chat surface: the homepage hero panel,
 * the docked rails on Home and case study pages, and the mobile overlay.
 *
 * Before this existed, Home and CaseStudyPage each carried their own copy, and
 * two shipped bugs came from the copies drifting: Home never adopted
 * splitParagraphs (2026-07-19), and the ContactCard ordering fix had to be made
 * twice (2026-08-01). One component means one place for both rules.
 */
export function ChatTranscript({
  messages,
  streaming = false,
  contactCard,
  contactCardAfter,
  greeting,
  children,
  className,
  ref,
  pinToTop = true,
}: ChatTranscriptProps) {
  const logRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      logRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
    },
    [ref],
  );
  const lastUserIndex = messages.reduce((acc, m, i) => (m.role === 'user' ? i : acc), -1);
  const userCount = messages.filter((m) => m.role === 'user').length;
  usePinLatestPrompt(logRef, spacerRef, userCount, pinToTop);

  // The contact form is a transcript entry, not a footer: it renders after the
  // turn that surfaced it, so a follow-up question and its reply appear below
  // it rather than above it. The clamp covers Storybook's forced card (no anchor
  // at all) and pins it to the end of the log in that case. See decisions.md
  // 2026-08-01.
  const contactCardAt = contactCard
    ? Math.min(contactCardAfter ?? messages.length, messages.length)
    : null;

  const cursor = (
    <span className={`${styles.cursor} cursor-blink`} aria-hidden="true">
      _
    </span>
  );
  // The opening greeting keeps the "_" glyph in every theme; only the streaming
  // cursor above becomes a dot in Futuristic. It is static (2026-10-29): the
  // ONLINE dot is the one blinking signal in the chat header, and the streaming
  // cursor still blinks while a reply is being written.
  const greetingCursor = (
    <span className={`${styles.cursor} ${styles.cursorUnderscore}`} aria-hidden="true">
      _
    </span>
  );

  return (
    <div
      className={className}
      ref={setRefs}
      // 'off' while streaming: chunks append to the same message dozens of
      // times per reply, and an always-on live region reads each partial
      // fragment. Flips to 'polite' once the reply finishes so the whole
      // thing gets announced once, not word-by-word.
      aria-live={streaming ? 'off' : 'polite'}
      aria-label="Chat messages"
    >
      {messages.length === 0 && greeting && (
        <p className={styles.assistant}>
          {greeting} {greetingCursor}
        </p>
      )}
      {messages.map((m, i) => (
        <Fragment key={i}>
          {m.role === 'user' ? (
            <p className={styles.user} data-latest-prompt={i === lastUserIndex ? '' : undefined}>
              <span className={styles.userPrompt} aria-hidden="true">
                {'› '}
              </span>
              {m.text}
            </p>
          ) : (
            // Assistant replies are split into short paragraphs — the system
            // prompt enforces frequent breaks, and rendering them as one block
            // was the 2026-07-19 readability bug.
            <div className={styles.assistant}>
              {(() => {
                const paras = splitParagraphs(m.text);
                const displayParas = paras.length > 0 ? paras : [''];
                return displayParas.map((para, pi) => (
                  <p key={pi} className={styles.assistantPara}>
                    {para}
                    {streaming &&
                      i === messages.length - 1 &&
                      pi === displayParas.length - 1 &&
                      cursor}
                  </p>
                ));
              })()}
            </div>
          )}
          {contactCardAt === i + 1 && contactCard}
        </Fragment>
      ))}
      {/* Only reachable with an empty log (Storybook's forced card) — every
          other position is rendered inside the map above. */}
      {contactCardAt === 0 && contactCard}
      {children}
      <div ref={spacerRef} className={styles.spacer} aria-hidden="true" />
    </div>
  );
}
