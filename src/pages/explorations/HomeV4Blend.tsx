import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../../components/NavBar';
import { CaseStudyCard } from '../../components/CaseStudyCard';
import { ChatInput } from '../../components/ChatInput';
import { useChatSession } from '../../hooks/useChatSession';
import type { Message } from '../../hooks/useChatSession';
import { CASE_STUDIES, SUGGESTIONS, HERO_STATS, SOCIAL_LINKS } from './data';
import { useTypewriter, useInView, useCountUp, usePrefersReducedMotion } from './hooks';
import styles from './HomeV4Blend.module.css';

export type { Message };

export interface HomeV4BlendProps {
  /** Storybook only — intercepts submit instead of calling /api/chat. */
  onChatSubmit?: (text: string) => void;
  initialMessages?: Message[];
  /** Storybook only — skip the boot animation. */
  skipBoot?: boolean;
}

const BOOT_LINES = [
  '> initializing viewbens.work',
  '> mounting design_system + assistant',
  '> ready.',
] as const;

/** Faster, shorter boot: 3 lines at 160 ms each, progress bar fills in ~1 s. */
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
    }, 160);

    let p = 0;
    const barId = window.setInterval(() => {
      p = Math.min(p + Math.random() * 20 + 8, 100);
      setPct(Math.round(p));
      if (p >= 100) {
        window.clearInterval(barId);
        window.setTimeout(onDone, 250);
      }
    }, 75);

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

function HeroStat({ figure, label, start }: { figure: string; label: string; start: boolean }) {
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

export function HomeV4Blend({
  onChatSubmit,
  initialMessages = [],
  skipBoot = false,
}: HomeV4BlendProps) {
  const { messages, chatStatus, handleSubmit } = useChatSession({
    onSubmit: onChatSubmit,
    initialMessages,
  });
  const reduced = usePrefersReducedMotion();
  const [booted, setBooted] = useState(skipBoot);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);
  const heroLogRef = useRef<HTMLDivElement | null>(null);
  const dockedLogRef = useRef<HTMLDivElement | null>(null);
  const mobileLogRef = useRef<HTMLDivElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);

  const { out: headline, done } = useTypewriter('I make expert tools learnable.', booted);
  const [statsRef, statsIn] = useInView<HTMLDivElement>();
  const [gridRef, gridIn] = useInView<HTMLDivElement>();

  // Scroll all visible logs to bottom when messages change
  useEffect(() => {
    if (heroLogRef.current) heroLogRef.current.scrollTop = heroLogRef.current.scrollHeight;
    if (dockedLogRef.current) dockedLogRef.current.scrollTop = dockedLogRef.current.scrollHeight;
    if (mobileLogRef.current) mobileLogRef.current.scrollTop = mobileLogRef.current.scrollHeight;
  }, [messages]);

  // Return focus to FAB when mobile overlay closes
  useEffect(() => {
    if (!mobileChatOpen && fabRef.current) fabRef.current.focus();
  }, [mobileChatOpen]);

  // Hide the fixed scan once the hero has fully scrolled out of the viewport
  useEffect(() => {
    if (reduced) return;
    const hero = heroRef.current;
    const scan = scanRef.current;
    if (!hero || !scan) return;
    const onScroll = () => {
      scan.style.display = hero.getBoundingClientRect().bottom <= 0 ? 'none' : '';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  const isDocked = messages.length > 0;

  // Keep "tools learnable" on the same line by wrapping everything from "tools " onward in nowrap.
  const nowrapIdx = headline.indexOf('tools ');
  const hasNowrap = nowrapIdx !== -1;
  const beforeNowrap = hasNowrap ? headline.slice(0, nowrapIdx) : headline;
  const nowrapContent = hasNowrap ? headline.slice(nowrapIdx) : '';
  const learnableIdx = nowrapContent.indexOf('learnable');
  const hasLearnable = learnableIdx !== -1;
  const nowrapBefore = hasLearnable ? nowrapContent.slice(0, learnableIdx) : nowrapContent;
  const nowrapAfterLearnable = hasLearnable
    ? nowrapContent.slice(learnableIdx + 'learnable'.length)
    : '';

  // Shared panel chrome — rendered in hero panel, docked panel, and mobile overlay
  const chatBarJSX = (
    <div className={styles.chatBar}>
      <span className={styles.chatBarLabel}>Ask Ben</span>
      <span className={styles.chatOnlineBadge}>
        <span className={`${styles.chatOnlineDot} cursor-blink`} aria-hidden />
        ONLINE
      </span>
    </div>
  );

  function renderLog(logRef: RefObject<HTMLDivElement | null>, className: string) {
    return (
      <div className={className} ref={logRef}>
        {messages.length === 0 ? (
          <>
            <p className={styles.msgAssistant}>
              Howdy. Ask about any case study, what I'm looking for, or how I work with AI.{' '}
              <span className={`${styles.msgCursor} cursor-blink`} aria-hidden>
                _
              </span>
            </p>
            {/* role="group" gives AT users the context that these are related options */}
            <div className={styles.chatSuggestions} role="group" aria-label="Suggested questions">
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
    );
  }

  const bootActive = !skipBoot && !booted;

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>Ben Maxwell — UX Design Leader</title>
        <meta
          name="description"
          content="Portfolio of Ben Maxwell — a Design Leader who builds expert-level tools for fintech, insurance, travel, and mortgage. Ask the AI assistant anything about the work."
        />
        <link rel="canonical" href="https://viewbens.work" />
        <meta property="og:title" content="Ben Maxwell — UX Design Leader" />
        <meta
          property="og:description"
          content="Portfolio of Ben Maxwell — a Design Leader who builds expert-level tools for fintech, insurance, travel, and mortgage."
        />
        <meta property="og:url" content="https://viewbens.work" />
        <meta property="og:image" content="https://viewbens.work/og/home.png" />
      </Helmet>

      {/* Boot overlay — decorative/status, outside the inert wrapper so it stays visible */}
      {!skipBoot && (
        <div
          className={[styles.boot, booted ? styles.bootHidden : ''].filter(Boolean).join(' ')}
          aria-hidden={booted}
        >
          {!booted && <BootSequence onDone={() => setBooted(true)} />}
        </div>
      )}

      {/* Dot grid and scanline — purely decorative, always aria-hidden */}
      <div className={styles.dotGrid} aria-hidden />
      {!reduced && <div className={styles.scan} ref={scanRef} aria-hidden />}

      {/*
       * All interactive page content lives inside this wrapper.
       * aria-hidden + inert during boot prevents keyboard users from tabbing
       * through invisible content behind the boot overlay (WCAG 1.3.1, 4.1.2).
       */}
      <div
        aria-hidden={bootActive ? true : undefined}
        inert={bootActive ? true : undefined}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <NavBar activePath="/work" />

        <div
          className={[
            styles.pageContent,
            styles.assemble,
            booted ? styles.assembleIn : '',
            isDocked ? styles.pageContentDocked : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {/*
           * Hero — uses <section> not <header> because NavBar already provides
           * the page banner landmark. Two <header> elements at the root level
           * would create duplicate banner landmarks (WCAG 1.3.6).
           */}
          <section className={styles.hero} ref={heroRef as RefObject<HTMLElement>}>
            <div
              className={[styles.heroInner, isDocked ? styles.heroInnerDocked : '']
                .filter(Boolean)
                .join(' ')}
            >
              <div>
                {/* Status badge — no blinking dot */}
                <div className={styles.statusBadge}>Available for Design Leader roles</div>

                <h1 className={styles.heroH1} aria-label="I make expert tools learnable.">
                  <span aria-hidden>
                    {beforeNowrap}
                    {!hasNowrap && !done && <span className={styles.typeCursor} />}
                    {hasNowrap && (
                      <span style={{ whiteSpace: 'nowrap' }}>
                        {nowrapBefore}
                        {hasLearnable && (
                          <span className={styles.heroAmber}>learnable</span>
                        )}
                        {nowrapAfterLearnable}
                        {!done && <span className={styles.typeCursor} />}
                      </span>
                    )}
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

              {/* Chat panel — right column. Slides right + column collapses when conversation starts. */}
              <div className={styles.chatWrap}>
                <aside
                  className={[styles.chatPanel, isDocked ? styles.chatPanelHidden : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-label="Ask Ben — assistant"
                  aria-hidden={isDocked}
                  inert={isDocked ? true : undefined}
                >
                  {chatBarJSX}
                  {renderLog(heroLogRef, styles.chatLog)}
                  <div className={styles.chatInputWrap}>
                    <ChatInput
                      onSubmit={handleSubmit}
                      status={chatStatus}
                      placeholder="ask about my work…"
                      multiline
                      showStatus={false}
                    />
                    <p className={styles.chatFootnote}>ONLINE · assistant ready · ~2s response</p>
                  </div>
                </aside>
              </div>
            </div>

            {/* Scroll cue — from V3 Phosphor, decorative */}
            <div className={styles.scrollCue} aria-hidden>
              <span>scroll</span>
              <span className={styles.scrollCueLine} />
            </div>
          </section>

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
                    <CaseStudyCard {...cs} />
                  </div>
                ))}
              </div>
            </section>

            {/* ——— FOOTER ——— */}
            <footer className={styles.footer}>
              <div className={styles.footerTop}>
                {/* h2 not <p> so screen reader heading navigation finds the footer CTA */}
                <h2 className={styles.footerHeading}>
                  Building something experts can't get wrong
                  <span className={styles.footerQuestion}>?</span>
                </h2>
                <div className={styles.footerLinks}>
                  {SOCIAL_LINKS.map((l) => {
                    const isExternal = l.href.startsWith('http');
                    return (
                      <a
                        key={l.label}
                        href={l.href}
                        className={styles.footerLink}
                        {...(isExternal
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {l.label}
                        {/* Informs AT users the link opens in a new tab */}
                        {isExternal && <span className="sr-only"> (opens in new tab)</span>}
                      </a>
                    );
                  })}
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

        {/* ——— DOCKED PANEL (fixed right rail, desktop only) ——— */}
        <aside
          className={[styles.dockedPanel, isDocked ? '' : styles.dockedPanelHidden]
            .filter(Boolean)
            .join(' ')}
          aria-label="Ask Ben — assistant"
          aria-hidden={!isDocked}
          inert={!isDocked ? true : undefined}
        >
          {chatBarJSX}
          {renderLog(dockedLogRef, styles.dockedLog)}
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

        {/* ——— MOBILE FAB — visible on mobile only when conversation has started ——— */}
        {isDocked && (
          <button
            ref={fabRef}
            type="button"
            className={styles.fab}
            onClick={() => setMobileChatOpen(true)}
            aria-label={`Open chat — ${messages.length} message${messages.length !== 1 ? 's' : ''}`}
          >
            <span className={styles.fabPrompt} aria-hidden>
              ›
            </span>
            Ask Ben
            {messages.length > 0 && (
              <span className={styles.fabBadge} aria-hidden>
                {messages.length}
              </span>
            )}
          </button>
        )}

        {/* ——— MOBILE CHAT OVERLAY — full screen sheet ——— */}
        <div
          className={[styles.mobileOverlay, mobileChatOpen ? styles.mobileOverlayOpen : '']
            .filter(Boolean)
            .join(' ')}
          role="dialog"
          aria-modal="true"
          aria-label="Ask Ben — assistant"
          aria-hidden={!mobileChatOpen}
          inert={!mobileChatOpen ? true : undefined}
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
                onClick={() => setMobileChatOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>
          {renderLog(mobileLogRef, styles.mobileOverlayLog)}
          <div className={styles.chatInputWrap}>
            <ChatInput
              onSubmit={(text) => {
                handleSubmit(text);
              }}
              status={chatStatus}
              placeholder="ask about my work…"
              multiline
              showStatus={false}
            />
          </div>
        </div>
      </div>
      {/* end interactive content wrapper */}
    </div>
  );
}
