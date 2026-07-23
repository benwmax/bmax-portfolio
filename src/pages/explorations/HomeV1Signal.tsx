import { useRef, useEffect } from 'react';
import { NavBar } from '../../components/NavBar';
import { CaseStudyCard } from '../../components/CaseStudyCard';
import { ChatInput } from '../../components/ChatInput';
import { useChatSession } from '../../hooks/useChatSession';
import type { Message } from '../../hooks/useChatSession';
import { CASE_STUDIES, SUGGESTIONS, HERO_STATS, SOCIAL_LINKS } from './data';
import { useTypewriter, useInView, useCountUp, usePrefersReducedMotion } from './hooks';
import styles from './HomeV1Signal.module.css';

export type { Message };

export interface HomeV1SignalProps {
  /** Storybook only — intercepts submit instead of calling /api/chat. */
  onChatSubmit?: (text: string) => void;
  initialMessages?: Message[];
}

/**
 * Renders a single hero stat. If the figure starts with a count-able number
 * ("15+ yrs", "$1B…") the number animates up once the row is on screen; the
 * surrounding characters are preserved. Otherwise the figure renders as-is.
 */
function HeroStat({ figure, label, start }: { figure: string; label: string; start: boolean }) {
  // Match an optional prefix (e.g. "$"), an integer, then the remainder.
  const m = figure.match(/^(\D*)(\d+)(.*)$/);
  const target = m ? parseInt(m[2], 10) : 0;
  const n = useCountUp(target, start && !!m);
  const rendered = m ? `${m[1]}${n}${m[3]}` : figure;
  return (
    <div className={styles.statCell}>
      <div className={styles.statFigure}>{rendered}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export function HomeV1Signal({ onChatSubmit, initialMessages = [] }: HomeV1SignalProps) {
  const { messages, chatStatus, handleSubmit } = useChatSession({
    onSubmit: onChatSubmit,
    initialMessages,
  });
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  const { out: headline, done } = useTypewriter('I make expert tools learnable.');
  const [statsRef, statsIn] = useInView<HTMLDivElement>();
  const [gridRef, gridIn] = useInView<HTMLDivElement>();

  // Keep the chat log pinned to the latest message
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  // Cursor-tracked spotlight — write pointer position into CSS vars on the hero
  useEffect(() => {
    if (reduced) return;
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, [reduced]);

  // Split the typewritten headline so "learnable" lands in amber once revealed
  const headlineParts = headline.split('learnable');

  return (
    <div className={styles.wrapper}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar activePath="/work" />

      <div className={styles.pageContent}>
        {/* ——— HERO ——— */}
        <header className={styles.hero} ref={heroRef}>
          <div className={styles.heroSpotlight} aria-hidden />
          {!reduced && <div className={styles.heroScan} aria-hidden />}

          <div className={styles.heroInner}>
            <div>
              <div className={styles.statusBadge}>
                <span className={`${styles.statusDot} cursor-blink`} aria-hidden />
                Available for Design Leader roles
              </div>

              <h1 className={styles.heroH1} aria-label="I make expert tools learnable.">
                <span aria-hidden>
                  {headlineParts[0]}
                  {headline.includes('learnable') && (
                    <span className={styles.heroAmber}>learnable</span>
                  )}
                  {headlineParts[1] ?? ''}
                  {!done && <span className={styles.typeCursor} />}
                </span>
              </h1>

              <p className={styles.heroLede}>
                Design Leader across travel, insurance, fintech, and mortgage — building tools
                experts actually adopt. Ask the assistant anything, or scroll to read the work.
              </p>

              <div className={styles.statRow} ref={statsRef}>
                {HERO_STATS.map((s) => (
                  <HeroStat key={s.label} figure={s.figure} label={s.label} start={statsIn} />
                ))}
              </div>
            </div>

            {/* Chat panel */}
            <aside className={styles.chatPanel} aria-label="Ask about Ben — assistant">
              <div className={styles.chatBar}>
                <span className={styles.chatBarLabel}>Ask about Ben</span>
                <span className={styles.chatOnlineBadge}>
                  <span className={`${styles.chatOnlineDot} cursor-blink`} aria-hidden />
                  ONLINE
                </span>
              </div>

              <div className={styles.chatLog} ref={logRef}>
                {messages.length === 0 ? (
                  <>
                    <p className={styles.msgAssistant}>
                      Howdy. Ask about any case study, what I'm looking for, or how I work with AI.{' '}
                      <span className={`${styles.msgCursor} cursor-blink`} aria-hidden>
                        _
                      </span>
                    </p>
                    <div className={styles.chatSuggestions}>
                      <span className={styles.chatSuggestLabel}>Try asking</span>
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={styles.chatSuggestBtn}
                          onClick={() => handleSubmit(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  messages.map((m, i) =>
                    m.role === 'user' ? (
                      <p key={i} className={styles.msgUser}>
                        <span className={styles.msgUserPrompt} aria-hidden>
                          {'› '}
                        </span>
                        {m.text}
                      </p>
                    ) : (
                      <p key={i} className={styles.msgAssistant}>
                        {m.text}
                        {i === messages.length - 1 && m.text === '' && (
                          <span className={`${styles.msgCursor} cursor-blink`} aria-hidden>
                            _
                          </span>
                        )}
                      </p>
                    ),
                  )
                )}
              </div>

              <div className={styles.chatInputWrap}>
                <ChatInput
                  onSubmit={handleSubmit}
                  status={chatStatus}
                  placeholder="ask about my work…"
                  multiline
                  showStatus={false}
                />
              </div>
            </aside>
          </div>
        </header>

        {/* ——— WORK ——— */}
        <main id="main-content">
          <section className={styles.workSection} aria-label="Selected work">
            <div className={styles.workHead}>
              <div>
                <div className={styles.workKicker}>Selected work · 2014–2026</div>
                <h2 className={styles.workTitle}>Four tools, four regulated industries</h2>
              </div>
            </div>

            <div className={styles.workGrid} ref={gridRef}>
              {CASE_STUDIES.map((cs, i) => (
                <div
                  key={cs.index}
                  className={[styles.reveal, gridIn ? styles.revealIn : ''].join(' ')}
                  style={{ ['--i' as string]: i }}
                >
                  <div className={styles.cardWrap}>
                    <CaseStudyCard {...cs} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ——— FOOTER ——— */}
          <footer className={styles.footer}>
            <div className={styles.footerTop}>
              <p className={styles.footerHeading}>
                Building something experts can't get wrong
                <span className={styles.footerQuestion}>?</span>
              </p>
              <div className={styles.footerLinks}>
                {SOCIAL_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className={styles.footerLink}
                    {...(l.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className={styles.footerFine}>
              <span>© 2026 Ben Maxwell · viewbens.work</span>
              <span>
                Built with Claude — directed, not autopiloted. The process is the case study.
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
