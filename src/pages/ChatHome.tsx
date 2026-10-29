import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { PageHead } from '../seo/PageHead';
import { HOME_META, ROUTE_META } from '../seo/pageMeta';
import { NavBar } from '../components/NavBar';
import { ChatInput } from '../components/ChatInput';
import { ContactCard } from '../components/ContactCard';
import { ChatTranscript } from '../components/ChatTranscript';
import { useChat } from '../context/useChat';
import type { Message } from '../hooks/useChatSession';
import { WidgetActionsContext } from '../chat/widgets';
import { DEEP_LINK_TOPICS, STARTER_TOPICS, TOPICS, suggestNextTopics } from '../chat/topics';
import type { FollowUp } from '../chat/topics';
import { usePrefersReducedMotion } from './explorations/hooks';
import styles from './ChatHome.module.css';

export interface ChatHomeProps {
  /**
   * The `/work/<slug>` segment, when the visitor arrived on an old case study
   * URL. Those links are shared on LinkedIn and in résumés, so they keep
   * working: each opens the chat and plays that project's walkthrough.
   */
  topicSlug?: string;
  /** Storybook only — intercepts submit instead of calling /api/chat. */
  onChatSubmit?: (text: string) => void;
  initialMessages?: Message[];
}

const DOCK_MOVE_MS = 480;

/**
 * Animates the dock from wherever it was to wherever it is now (FLIP), so the
 * input visibly travels from the middle of the screen to the bottom when the
 * conversation starts, instead of jumping. Measured on every layout so a resize
 * before the first message doesn't animate from a stale position.
 */
function useDockMove(ref: { current: HTMLElement | null }, started: boolean, reduced: boolean) {
  const lastTop = useRef<number | null>(null);
  const lastStarted = useRef(started);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    const changed = lastStarted.current !== started;
    if (changed && lastTop.current !== null && !reduced) {
      el.animate(
        [{ transform: `translateY(${lastTop.current - top}px)` }, { transform: 'translateY(0)' }],
        { duration: DOCK_MOVE_MS, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
      );
    }
    lastTop.current = top;
    lastStarted.current = started;
  });

  // Layout can shift after the last render without a re-render (web fonts
  // landing, a resize), which would start the move from a stale spot. So
  // re-measure at the moment of engagement too: pointerdown and keydown fire
  // (in capture) before the click or Enter that changes state.
  useEffect(() => {
    const measure = () => {
      if (ref.current) lastTop.current = ref.current.getBoundingClientRect().top;
    };
    const opts = { capture: true, passive: true } as const;
    window.addEventListener('resize', measure);
    window.addEventListener('pointerdown', measure, opts);
    window.addEventListener('keydown', measure, opts);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointerdown', measure, opts);
      window.removeEventListener('keydown', measure, opts);
    };
  }, [ref]);
}

/**
 * The chat-first homepage (experiment, 2026-10-29).
 *
 * First load is deliberately sparse (Ben, 2026-10-29): the headline, a
 * vertically centered input, and four starter chips — the way an AI chat
 * opens a new session. Once the visitor sends a message or picks a chip, the
 * input travels to the bottom and the conversation takes the screen.
 *
 * Starter chips play pre-built tours (src/chat/topics.ts) with widgets;
 * typing goes to the model, which can attach the same widgets. The full topic
 * list lives behind the "All topics" chip once a conversation has started.
 */
export function ChatHome({ topicSlug, onChatSubmit, initialMessages = [] }: ChatHomeProps) {
  const {
    messages,
    chatStatus,
    handleSubmit,
    setPageContext,
    playTopic,
    followUps,
    playedTopics,
    showContactCard,
    contactCardAfter,
    contactFormStatus,
    contactErrorText,
    submitContactForm,
    dismissContactCard,
  } = useChat({ onSubmit: onChatSubmit, initialMessages });

  const reduced = usePrefersReducedMotion();
  const dockRef = useRef<HTMLDivElement | null>(null);
  const deepLinkTopic = topicSlug ? DEEP_LINK_TOPICS[topicSlug] : undefined;
  const meta = (topicSlug && ROUTE_META[`/work/${topicSlug}`]) || HOME_META;

  const started = messages.length > 0;
  const busy = chatStatus === 'loading';
  useDockMove(dockRef, started, reduced);

  // Clear case study context left from another surface — this page sets its own per tour.
  useEffect(() => {
    if (!deepLinkTopic) setPageContext(null);
  }, [deepLinkTopic, setPageContext]);

  // A shared /work/<slug> link plays that walkthrough once. playTopic ignores a
  // second call while one is running, which also absorbs Strict Mode's double effect.
  useEffect(() => {
    if (deepLinkTopic && !playedTopics.has(deepLinkTopic)) void playTopic(deepLinkTopic);
    // Only on arrival at this slug — replaying on every played-topic change would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepLinkTopic]);

  // Before the first message: the four starters. After: the tour's own
  // follow-ups (or what hasn't been played yet), then "All topics". Hidden
  // mid-tour, when follow-ups are cleared and the fallback would flash.
  const chips: FollowUp[] = useMemo(() => {
    if (!started) return STARTER_TOPICS.map((id) => ({ label: TOPICS[id].prompt, topic: id }));
    if (busy) return [];
    const base = followUps.length > 0 ? followUps : suggestNextTopics(playedTopics, 2);
    return [...base, { label: 'All topics', topic: 'menu' }];
  }, [started, busy, followUps, playedTopics]);

  const onChip = (chip: FollowUp) => {
    if (chip.topic) void playTopic(chip.topic);
    else void handleSubmit(chip.label);
  };

  const actions = useMemo(
    () => ({ playTopic: (id: Parameters<typeof playTopic>[0]) => void playTopic(id) }),
    [playTopic],
  );

  const chipRow = chips.length > 0 && (
    <div
      className={[styles.chips, started ? '' : styles.chipsStart].filter(Boolean).join(' ')}
      role="group"
      aria-label={started ? 'Suggested next questions' : 'Suggested questions'}
    >
      {chips.map((c) => (
        <button
          key={c.label}
          type="button"
          className={[styles.chip, c.topic === 'menu' ? styles.chipQuiet : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => onChip(c)}
          disabled={busy}
        >
          {c.label}
        </button>
      ))}
    </div>
  );

  return (
    <WidgetActionsContext.Provider value={actions}>
      <div className={[styles.page, started ? styles.started : styles.idle].join(' ')}>
        <PageHead meta={meta} />
        <div className={styles.dotGrid} aria-hidden="true" />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NavBar activePath="/" />

        <main id="main-content" className={styles.main}>
          {started ? (
            <ChatTranscript
              variant="stage"
              className={styles.log}
              messages={messages}
              streaming={busy}
              contactCardAfter={contactCardAfter}
              contactCard={
                showContactCard && (
                  <ContactCard
                    status={contactFormStatus}
                    errorText={contactErrorText}
                    onSubmit={submitContactForm}
                    onDismiss={dismissContactCard}
                  />
                )
              }
            />
          ) : (
            <div className={styles.hero}>
              <h1 className={styles.h1}>
                I make expert tools <span className={styles.amber}>learnable</span>
              </h1>
              {/* Who's speaking (Ben, 2026-10-29): with the work grid gone, nothing
                  on the first screen said he's a designer. */}
              <p className={styles.identity}>Ben Maxwell · UX Design Leader</p>
            </div>
          )}
        </main>

        {/* One dock in both states, so the input keeps its text and focus while
            it moves. Idle: centered, starters below. Started: pinned to the
            bottom, follow-ups above. */}
        <div className={styles.dock}>
          <div className={styles.dockInner} ref={dockRef}>
            {started && chipRow}
            <ChatInput
              onSubmit={handleSubmit}
              status={chatStatus}
              placeholder="ask about Ben's work…"
              multiline
              showStatus={false}
              className={styles.input}
            />
            {!started && chipRow}
            {started && (
              <p className={styles.fineprint}>
                Walkthroughs are written by Ben. Typed questions are answered by an AI model and can
                be wrong.
              </p>
            )}
          </div>
        </div>
      </div>
    </WidgetActionsContext.Provider>
  );
}
