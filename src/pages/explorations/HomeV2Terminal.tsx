import { useState, useEffect, useRef } from 'react';
import { NavBar } from '../../components/NavBar';
import { ChatInput } from '../../components/ChatInput';
import { useChatSession } from '../../hooks/useChatSession';
import type { Message } from '../../hooks/useChatSession';
import { CASE_STUDIES, SUGGESTIONS, TELEMETRY, SOCIAL_LINKS } from './data';
import { useTypewriter, useScramble, useInView, usePrefersReducedMotion } from './hooks';
import styles from './HomeV2Terminal.module.css';

export type { Message };

export interface HomeV2TerminalProps {
  onChatSubmit?: (text: string) => void;
  initialMessages?: Message[];
  /** Storybook only — skip the boot animation and render the assembled page. */
  skipBoot?: boolean;
}

const BOOT_LINES = [
  '> initializing viewbens.work',
  '> loading design_system :: phosphor-terminal',
  '> mounting case_studies [04]',
  '> calibrating assistant :: claude-haiku',
  '> ready.',
] as const;

/** A line of text that decodes from glyph-scramble once `start` is true. */
function Scramble({ text, start, className }: { text: string; start: boolean; className?: string }) {
  const out = useScramble(text, start);
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/** The boot overlay: types its log lines, fills a progress bar, then signals done. */
function BootSequence({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    let line = 0;
    const lineId = window.setInterval(() => {
      line += 1;
      setVisibleLines(line);
      if (line >= BOOT_LINES.length) window.clearInterval(lineId);
    }, 280);

    let p = 0;
    const barId = window.setInterval(() => {
      p = Math.min(p + Math.random() * 14 + 6, 100);
      setPct(Math.round(p));
      if (p >= 100) {
        window.clearInterval(barId);
        window.setTimeout(onDone, 450);
      }
    }, 130);

    return () => {
      window.clearInterval(lineId);
      window.clearInterval(barId);
    };
  }, [reduced, onDone]);

  return (
    <div className={styles.bootInner} role="status" aria-label="Loading">
      {BOOT_LINES.slice(0, visibleLines).map((l, i) => (
        <div key={l} className={styles.bootLine}>
          {l}
          {i === BOOT_LINES.length - 1 && <span className={styles.bootCheck}> ✓</span>}
        </div>
      ))}
      <div className={styles.bootBarTrack}>
        <div className={styles.bootBarFill} style={{ width: `${pct}%` }} />
      </div>
      <div className={styles.bootPct}>{pct}% — establishing connection</div>
    </div>
  );
}

export function HomeV2Terminal({
  onChatSubmit,
  initialMessages = [],
  skipBoot = false,
}: HomeV2TerminalProps) {
  const { messages, chatStatus, handleSubmit } = useChatSession({
    onSubmit: onChatSubmit,
    initialMessages,
  });
  const reduced = usePrefersReducedMotion();
  const [booted, setBooted] = useState(skipBoot);
  const logRef = useRef<HTMLDivElement | null>(null);

  // Headline types out only after boot finishes
  const { out: headline, done } = useTypewriter('I make expert tools learnable.', booted);
  const [recordsRef, recordsIn] = useInView<HTMLDivElement>();

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  const headlineParts = headline.split('learnable');

  return (
    <div className={styles.wrapper}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Boot overlay */}
      {!skipBoot && (
        <div
          className={[styles.boot, booted ? styles.bootHidden : ''].filter(Boolean).join(' ')}
          aria-hidden={booted}
        >
          {!booted && <BootSequence onDone={() => setBooted(true)} />}
        </div>
      )}

      {/* CRT overlay — purely decorative, above everything */}
      {!reduced && <div className={styles.crt} aria-hidden />}
      <div className={styles.crtVignette} aria-hidden />

      <NavBar activePath="/work" />

      <div
        className={[styles.pageContent, styles.assemble, booted ? styles.assembleIn : '']
          .filter(Boolean)
          .join(' ')}
      >
        {/* ——— HERO ——— */}
        <header className={styles.hero}>
          <div className={styles.heroGrid}>
            {/* Terminal window — headline + chat live inside the prompt */}
            <div className={styles.term}>
              <div className={styles.termBar}>
                <span className={styles.termDot} aria-hidden />
                <span className={styles.termDot} aria-hidden />
                <span className={styles.termDot} aria-hidden />
                <span className={styles.termTitle}>ben@viewbens — ~/portfolio — zsh</span>
              </div>
              <div className={styles.termBody}>
                <p className={styles.termPromptLine}>
                  <b>ben@viewbens</b>:~$ whoami
                </p>

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
                  experts actually adopt. Run a query below, or scroll to read the work.
                </p>

                {/* Chat as the terminal prompt */}
                <div style={{ marginTop: 28 }}>
                  <p className={styles.termPromptLine}>
                    <b>ben@viewbens</b>:~$ ask --assistant
                  </p>
                  {messages.length > 0 && (
                    <div className={styles.chatLog} ref={logRef} style={{ marginBottom: 14 }}>
                      {messages.map((m, i) =>
                        m.role === 'user' ? (
                          <p key={i} className={styles.msgUser}>
                            <span style={{ color: 'var(--color-green-accent)' }}>{'› '}</span>
                            {m.text}
                          </p>
                        ) : (
                          <p key={i} className={styles.recordDesc} style={{ marginTop: 6 }}>
                            {m.text}
                            {i === messages.length - 1 && m.text === '' && (
                              <span className="cursor-blink"> _</span>
                            )}
                          </p>
                        ),
                      )}
                    </div>
                  )}
                  <ChatInput
                    onSubmit={handleSubmit}
                    status={chatStatus}
                    placeholder="ask about my work…"
                    showStatus={false}
                  />
                  {messages.length === 0 && (
                    <div className={styles.heroCtaRow}>
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={styles.recordTag}
                          style={{ cursor: 'pointer', background: 'transparent' }}
                          onClick={() => handleSubmit(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Telemetry */}
            <aside className={styles.telemetry} aria-label="Profile telemetry">
              <div className={styles.telHead}>
                <span className={styles.telTitle}>System readout</span>
                <span className={styles.telBadge}>
                  <span className={styles.telDot} aria-hidden />
                  LIVE
                </span>
              </div>
              {TELEMETRY.map((row, i) => (
                <div key={row.k} className={styles.telRow}>
                  <div className={styles.telKey}>{row.k}</div>
                  <div className={styles.telVal}>
                    <Scramble text={row.v} start={booted} />
                  </div>
                  <span className="sr-only" style={{ display: 'none' }}>
                    {i}
                  </span>
                </div>
              ))}
              <div className={styles.telBars} aria-hidden>
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className={styles.telBar}
                    style={{ animationDelay: `${(i * 70) % 1100}ms` }}
                  />
                ))}
              </div>
            </aside>
          </div>
        </header>

        {/* ——— WORK ——— */}
        <main id="main-content">
          <section className={styles.workSection} aria-label="Selected work">
            <div className={styles.workHead}>
              <div className={styles.workKicker}>Selected work · 2014–2026</div>
              <h2 className={styles.workTitle}>Four tools, four regulated industries</h2>
            </div>

            <div className={styles.recordList} ref={recordsRef}>
              {CASE_STUDIES.map((cs) => (
                <a key={cs.index} href={cs.href} className={styles.record}>
                  <span className={styles.recordNum}>{cs.index}</span>
                  <div>
                    <div className={styles.recordTitle}>
                      <Scramble text={cs.title} start={recordsIn} />
                    </div>
                  </div>
                  <div className={styles.recordDesc}>{cs.desc}</div>
                  <div className={styles.recordMeta}>
                    <span className={styles.recordTag}>{cs.tag}</span>
                    <span className={styles.recordYear}>
                      {cs.role} · {cs.year}
                    </span>
                    <span className={styles.recordArrow} aria-hidden>
                      →
                    </span>
                  </div>
                </a>
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
