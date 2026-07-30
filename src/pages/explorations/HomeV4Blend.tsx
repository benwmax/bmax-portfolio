import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../../components/NavBar';
import { CaseStudyCard } from '../../components/CaseStudyCard';
import { ChatInput } from '../../components/ChatInput';
import { ContactCard } from '../../components/ContactCard';
import { MobileChatSurface } from '../../components/MobileChatSurface';
import { useChat } from '../../context/useChat';
import { splitParagraphs } from '../../hooks/useChatSession';
import type { Message } from '../../hooks/useChatSession';
import { CASE_STUDIES, SUGGESTIONS, HERO_STATS, SOCIAL_LINKS } from './data';
import {
  useTypewriter,
  useInView,
  useCountUp,
  usePrefersReducedMotion,
  useIsMobileViewport,
} from './hooks';
import styles from './HomeV4Blend.module.css';

export type { Message };

export interface HomeV4BlendProps {
  /** Storybook only — intercepts submit instead of calling /api/chat. */
  onChatSubmit?: (text: string) => void;
  initialMessages?: Message[];
  /** Storybook only — skip the boot animation. */
  skipBoot?: boolean;
  /**
   * Storybook only — forces the inline ContactCard to render regardless of
   * detectContactIntent, so its composed-in-page state can be previewed
   * without typing a live contact-intent message. Never wire to application
   * state; showContactCard from useChat() is the real signal in production.
   */
  forceShowContactCard?: boolean;
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

// The boot sequence should play once per visit, not on every return to the
// homepage. This module-level flag is set the first time the boot completes and
// read on mount so in-app navigation back to Home skips the loader and renders
// instantly. It lives for the lifetime of the loaded app (the SPA session), so
// a full browser refresh resets it and the boot plays again — a hard reload
// counts as a fresh arrival. Intentionally not persisted to storage.
let bootPlayed = false;

export function HomeV4Blend({
  onChatSubmit,
  initialMessages = [],
  skipBoot = false,
  forceShowContactCard = false,
}: HomeV4BlendProps) {
  const {
    messages,
    chatStatus,
    handleSubmit,
    setPageContext,
    fabRevealed,
    showContactCard,
    contactFormStatus,
    contactErrorText,
    submitContactForm,
    dismissContactCard,
  } = useChat({
    onSubmit: onChatSubmit,
    initialMessages,
  });
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobileViewport();
  // Skip the boot overlay if Storybook forces it off, or if the boot already
  // played earlier this session (returning to Home via in-app navigation). The
  // typewriter/count-up intro still runs — only the loader is skipped.
  const [booted, setBooted] = useState(skipBoot || bootPlayed);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);
  const heroLogRef = useRef<HTMLDivElement | null>(null);
  const dockedLogRef = useRef<HTMLDivElement | null>(null);

  const { out: headline, done } = useTypewriter('I make expert tools learnable.', booted);
  const [statsRef, statsIn] = useInView<HTMLDivElement>();
  const [gridRef, gridIn] = useInView<HTMLDivElement>();

  // Scroll the hero + docked logs to bottom when messages change. The mobile
  // overlay's own log is scrolled by MobileChatSurface.
  useEffect(() => {
    if (heroLogRef.current) heroLogRef.current.scrollTop = heroLogRef.current.scrollHeight;
    if (dockedLogRef.current) dockedLogRef.current.scrollTop = dockedLogRef.current.scrollHeight;
  }, [messages]);

  // Clear any case-study context left over from a previous page — Home has
  // no case-study framing of its own, and the chat session is shared across
  // navigation (see src/context/ChatContext.tsx).
  useEffect(() => {
    setPageContext(null);
  }, [setPageContext]);

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

  // Highlight "learnable" in amber. No forced nowrap around "tools learnable" —
  // that previously caused the phrase to overflow past the hero column at
  // viewport widths where the two-column grid is still active but the column
  // has narrowed too much for it to fit on one line. Left to wrap naturally.
  const learnableIdx = headline.indexOf('learnable');
  const hasLearnable = learnableIdx !== -1;
  const beforeLearnable = hasLearnable ? headline.slice(0, learnableIdx) : headline;
  const afterLearnable = hasLearnable ? headline.slice(learnableIdx + 'learnable'.length) : '';

  // Submitting from the inline hero panel (its input or a suggestion chip) hands
  // off to the full-screen overlay so the reply streams somewhere the visitor can
  // read and keep typing — the inline panel collapses once a conversation starts.
  // On desktop the overlay is display:none, so opening it is a harmless no-op and
  // the reply flows into the docked rail as before. Only the hero uses this; the
  // docked input and the overlay's own input call handleSubmit directly.
  const handleHeroSubmit = (text: string) => {
    setMobileChatOpen(true);
    handleSubmit(text);
  };

  // Shared panel chrome — rendered in hero panel, docked panel, and mobile overlay
  const chatBarJSX = (
    <div className={styles.chatBar}>
      <span className={styles.chatBarLabel}>Ask about Ben</span>
      <span className={styles.chatOnlineBadge}>
        <span className={`${styles.chatOnlineDot} cursor-blink`} aria-hidden />
        ONLINE
      </span>
    </div>
  );

  function renderLog(logRef: RefObject<HTMLDivElement | null>, className: string) {
    return (
      <div
        className={className}
        ref={logRef}
        // 'off' while streaming: chunks append to the same message dozens of
        // times per reply, and an always-on live region reads each partial
        // fragment. Flips to 'polite' once the reply finishes so the whole
        // thing gets announced once, not word-by-word.
        aria-live={chatStatus === 'loading' ? 'off' : 'polite'}
        aria-label="Chat messages"
      >
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
                  onClick={() => handleHeroSubmit(s)}
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
              <div key={i} className={styles.msgAssistant}>
                {(() => {
                  const paras = splitParagraphs(m.text);
                  const displayParas = paras.length > 0 ? paras : [''];
                  return displayParas.map((para, pi) => (
                    <p key={pi} className={styles.msgAssistantPara}>
                      {para}
                      {pi === displayParas.length - 1 &&
                        i === messages.length - 1 &&
                        m.text === '' && (
                          <span className={`${styles.msgCursor} cursor-blink`} aria-hidden>
                            _
                          </span>
                        )}
                    </p>
                  ));
                })()}
              </div>
            ),
          )
        )}
        {(forceShowContactCard || showContactCard) && (
          <ContactCard
            status={contactFormStatus}
            errorText={contactErrorText}
            onSubmit={submitContactForm}
            onDismiss={dismissContactCard}
          />
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
          {!booted && (
            <BootSequence
              onDone={() => {
                bootPlayed = true;
                setBooted(true);
              }}
            />
          )}
        </div>
      )}

      {/* Dot grid and scanline — purely decorative, always aria-hidden */}
      <div className={styles.dotGrid} aria-hidden />
      {!reduced && <div className={styles.scan} ref={scanRef} aria-hidden />}

      {/*
       * All interactive page content lives inside this wrapper.
       * aria-hidden + inert during boot prevents keyboard users from tabbing
       * through invisible content behind the boot overlay (WCAG 1.3.1, 4.1.2).
       * Also inert while the mobile chat overlay is open, for the same
       * reason — otherwise a keyboard/AT user could reach the NavBar, hero,
       * and work grid behind the full-screen overlay (WCAG 2.4.3, 4.1.2).
       *
       * The mobile-overlay case is gated on `isMobile`: on desktop the overlay
       * is display:none, but `mobileChatOpen` is still set true on first hero
       * submit (see handleHeroSubmit) so the reply can flow to the docked rail.
       * Without the viewport guard, that flag would make the entire desktop
       * page inert — nothing clickable or focusable. Gating on the same
       * `max-width: 760px` breakpoint the overlay uses keeps inert tied to the
       * overlay actually being on screen.
       */}
      <div
        aria-hidden={bootActive || (mobileChatOpen && isMobile) ? true : undefined}
        inert={bootActive || (mobileChatOpen && isMobile) ? true : undefined}
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
              <div className={styles.heroHeaderBlock}>
                {/* Status badge — no blinking dot */}
                <div className={styles.statusBadge}>Available for Design Leader roles</div>

                <h1 className={styles.heroH1} aria-label="I make expert tools learnable.">
                  <span className={styles.heroH1Ghost} aria-hidden>
                    I make expert tools <span className={styles.heroAmber}>learnable</span>.
                  </span>
                  <span className={styles.heroH1Visible} aria-hidden>
                    {beforeLearnable}
                    {hasLearnable && <span className={styles.heroAmber}>learnable</span>}
                    {afterLearnable}
                    {!done && <span className={styles.typeCursor} />}
                  </span>
                </h1>

                <p className={styles.heroLede}>
                  Design Leader across travel, insurance, fintech, and mortgage — building tools
                  experts actually adopt. Ask the assistant anything, or scroll to read the work.
                </p>
              </div>

              {/* Its own grid area (not nested in the header block) so it can be
                  repositioned independently at the mobile breakpoint — see
                  .heroInner's grid-template-areas. */}
              <div className={styles.statRow} ref={statsRef}>
                {HERO_STATS.map((s) => (
                  <HeroStat key={s.label} figure={s.figure} label={s.label} start={statsIn} />
                ))}
              </div>

              {/* Chat panel — right column. Slides right + column collapses when conversation starts. */}
              <div className={styles.chatWrap}>
                <aside
                  className={[styles.chatPanel, isDocked ? styles.chatPanelHidden : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-label="Ask about Ben — assistant"
                  aria-hidden={isDocked}
                  inert={isDocked ? true : undefined}
                >
                  {chatBarJSX}
                  {renderLog(heroLogRef, styles.chatLog)}
                  <div className={styles.chatInputWrap}>
                    <ChatInput
                      onSubmit={handleHeroSubmit}
                      status={chatStatus}
                      placeholder="ask about my work…"
                      multiline
                      showStatus={false}
                    />
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
                  {/* Deliberately uncounted. This heading previously read "Four tools,
                      four regulated industries" — a countable claim that was wrong above
                      five cards and wrong differently above four. Echoing the positioning
                      statement instead means it can't go stale as the grid changes. */}
                  <h2 className={styles.workTitle}>Expert tools, high-stakes industries</h2>
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
          </main>

          {/* footer is intentionally a sibling of <main>, not nested inside it —
              nesting it there strips the contentinfo landmark role. See
              docs/ai-component-guide.md Accessibility Patterns → Footer
              landmark placement. */}
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
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
        </div>

        {/* ——— DOCKED PANEL (fixed right rail, desktop only) ——— */}
        <aside
          className={[styles.dockedPanel, isDocked ? '' : styles.dockedPanelHidden]
            .filter(Boolean)
            .join(' ')}
          aria-label="Ask about Ben — assistant"
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
      </div>
      {/* end interactive content wrapper — MobileChatSurface renders outside it
          (below) so the wrapper's inert state can hide the rest of the page
          behind the mobile overlay without also hiding the overlay itself. */}

      {/* ——— MOBILE FAB + CHAT OVERLAY ———
          The FAB appears once a conversation has started (isDocked) or the
          entry point was unlocked on a case study page (fabRevealed, which
          persists back to Home per the shared session). Hidden before either,
          per the mobile flow decided 2026-07-19. */}
      <MobileChatSurface
        visible={isDocked || fabRevealed}
        open={mobileChatOpen}
        onOpenChange={setMobileChatOpen}
        messageCount={messages.length}
        chatStatus={chatStatus}
        onSubmit={handleSubmit}
        renderLog={renderLog}
      />
    </div>
  );
}
