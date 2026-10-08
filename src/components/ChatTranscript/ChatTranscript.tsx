import { Fragment } from 'react';
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
  /** The page scrolls this element to the bottom when messages change. */
  ref?: Ref<HTMLDivElement>;
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
}: ChatTranscriptProps) {
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

  return (
    <div
      className={className}
      ref={ref}
      // 'off' while streaming: chunks append to the same message dozens of
      // times per reply, and an always-on live region reads each partial
      // fragment. Flips to 'polite' once the reply finishes so the whole
      // thing gets announced once, not word-by-word.
      aria-live={streaming ? 'off' : 'polite'}
      aria-label="Chat messages"
    >
      {messages.length === 0 && greeting && (
        <p className={styles.assistant}>
          {greeting} {cursor}
        </p>
      )}
      {messages.map((m, i) => (
        <Fragment key={i}>
          {m.role === 'user' ? (
            <p className={styles.user}>
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
    </div>
  );
}
