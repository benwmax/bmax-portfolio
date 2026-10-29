import { useEffect, useMemo } from 'react';
import { PageHead } from '../seo/PageHead';
import { HOME_META, ROUTE_META } from '../seo/pageMeta';
import { NavBar } from '../components/NavBar';
import { ChatInput } from '../components/ChatInput';
import { ContactCard } from '../components/ContactCard';
import { ChatTranscript } from '../components/ChatTranscript';
import { useChat } from '../context/useChat';
import type { Message } from '../hooks/useChatSession';
import { TopicMenu, WidgetActionsContext } from '../chat/widgets';
import { DEEP_LINK_TOPICS, suggestNextTopics } from '../chat/topics';
import type { FollowUp } from '../chat/topics';
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

/**
 * The chat-first homepage (experiment, 2026-10-29). The whole viewport is the
 * conversation: a scrolling log in the middle, the input docked at the bottom.
 *
 * Before the first message, the log holds the intro and the full topic menu —
 * so a visitor who never types still sees every project and every question on
 * arrival. Clicking one plays a pre-built tour (src/chat/topics.ts) with
 * widgets; typing goes to the model, which can attach the same widgets.
 *
 * Replaces HomeV4Blend + CaseStudyPage + MobileChatSurface for this
 * experiment: there is no separate mobile surface, because the stage already
 * is full-screen at every width.
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

  const deepLinkTopic = topicSlug ? DEEP_LINK_TOPICS[topicSlug] : undefined;
  const meta = (topicSlug && ROUTE_META[`/work/${topicSlug}`]) || HOME_META;

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

  const started = messages.length > 0;
  const busy = chatStatus === 'loading';

  // Never a dead end: a tour's own follow-ups, or after a typed question,
  // whatever hasn't been played yet. "All topics" is always last.
  const chips: FollowUp[] = useMemo(() => {
    // Hidden mid-tour/mid-reply: follow-ups are cleared then, so the fallback
    // would flash generic suggestions before the real ones arrive.
    if (!started || busy) return [];
    const base = followUps.length > 0 ? followUps : suggestNextTopics(playedTopics, 2);
    return [...base, { label: 'All topics', topic: 'menu' }];
  }, [started, busy, followUps, playedTopics]);

  const onChip = (chip: FollowUp) => {
    if (chip.topic) void playTopic(chip.topic);
    else void handleSubmit(chip.label);
  };

  const actions = useMemo(() => ({ playTopic: (id: Parameters<typeof playTopic>[0]) => void playTopic(id) }), [playTopic]);

  return (
    <WidgetActionsContext.Provider value={actions}>
      <div className={styles.page}>
        <PageHead meta={meta} />
        <div className={styles.dotGrid} aria-hidden="true" />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NavBar activePath="/" />

        <main id="main-content" className={styles.main}>
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
          >
            {!started && (
              <div className={styles.intro}>
                <div className={styles.status}>
                  <span className={`${styles.statusDot} cursor-blink`} aria-hidden="true" />
                  Available for Design Leader roles
                </div>
                <h1 className={styles.h1}>
                  I make expert tools <span className={styles.amber}>learnable</span>
                </h1>
                <p className={styles.lede}>
                  Howdy. I'm Ben Maxwell, a design leader with fifteen-plus years across travel,
                  insurance, fintech, and mortgage. Pick a question and my assistant will walk
                  you through the work — or ask it your own.
                </p>
                <TopicMenu />
              </div>
            )}
          </ChatTranscript>
        </main>

        <div className={styles.dock}>
          <div className={styles.dockInner}>
            {chips.length > 0 && (
              <div className={styles.chips} role="group" aria-label="Suggested next questions">
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
            )}
            <ChatInput
              onSubmit={handleSubmit}
              status={chatStatus}
              placeholder="ask about Ben's work…"
              multiline
              showStatus={false}
              className={styles.input}
            />
            <p className={styles.fineprint}>
              Walkthroughs are written by Ben. Typed questions are answered by an AI model and can
              be wrong.
            </p>
          </div>
        </div>
      </div>
    </WidgetActionsContext.Provider>
  );
}
