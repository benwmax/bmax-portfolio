import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../components/NavBar';
import { ChatInput } from '../components/ChatInput';
import { useChatSession } from '../hooks/useChatSession';
import type { Message as CsMessage } from '../hooks/useChatSession';
import { CaseStudyHero } from '../components/CaseStudyHero';
import { ProcessStep, ProcessSteps } from '../components/ProcessStep';
import { StatBlock, StatGrid } from '../components/StatBlock';
import { RoleCallout, RoleCallouts } from '../components/RoleCallout';
import { ImageCaption } from '../components/ImageCaption';
import styles from './CaseStudyPage.module.css';

export type { CsMessage };

export interface ProcessStep {
  phase: string;
  title: string;
  body: string;
  artifact: string;
}

export interface OutcomeStat {
  value: string;
  label: string;
  body?: string;
}

export interface RoleRow {
  label: string;
  content: string;
}

export interface CaseMeta {
  label: string;
  value: string;
  /** Render value in green accent (e.g. headline stats) */
  accent?: boolean;
}

export interface CaseStudyContent {
  /** "04" */
  number: string;
  /** "2018–2020" */
  dateRange: string;
  /** "USAA" — shown in nav breadcrumb and chat context badge */
  company: string;
  heroTitle: string;
  heroSubtitle: string;
  meta: CaseMeta[];
  problem: { heading: string; paragraphs: string[] };
  role: RoleRow[];
  userContext: { paragraphs: string[] };
  process: ProcessStep[];
  keyDecision: { heading: string; paragraphs: string[]; artifactLabel?: string };
  whatWasHard: { paragraphs: string[] };
  outcomes: OutcomeStat[];
  whatIdDoDifferently: { paragraphs: string[] };
  chatSuggestions?: string[];
  nextCase?: { title: string; href: string };
}

export interface CaseStudyPageProps extends CaseStudyContent {
  /** Sidebar table of contents or linear (no sidebar) */
  layout?: 'sidebar' | 'linear';
  /** Show docked chat panel */
  showChat?: boolean;
  /** Storybook / test — intercepts submit instead of calling /api/chat */
  onChatSubmit?: (text: string) => void;
  initialMessages?: CsMessage[];
}

const NAV_SECTIONS = [
  { id: 'problem', label: 'Problem', num: '01' },
  { id: 'role', label: 'Role', num: '02' },
  { id: 'context', label: 'User context', num: '03' },
  { id: 'process', label: 'Process', num: '04' },
  { id: 'decision', label: 'Key decision', num: '05' },
  { id: 'hard', label: 'What was hard', num: '06' },
  { id: 'outcomes', label: 'Outcomes', num: '07' },
  { id: 'reflection', label: "What I'd do differently", num: '08' },
] as const;


export function CaseStudyPage({
  number,
  dateRange,
  company,
  heroTitle,
  heroSubtitle,
  meta,
  problem,
  role,
  userContext,
  process,
  keyDecision,
  whatWasHard,
  outcomes,
  whatIdDoDifferently,
  chatSuggestions = [],
  nextCase,
  layout = 'sidebar',
  showChat = true,
  onChatSubmit,
  initialMessages = [],
}: CaseStudyPageProps) {
  const { pathname } = useLocation();
  const { messages, chatStatus, handleSubmit } = useChatSession({
    onSubmit: onChatSubmit,
    initialMessages,
  });
  const [activeSection, setActiveSection] = useState('problem');
  const chatLogRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Scroll progress (direct DOM write — bypasses React render cycle for smoothness)
  // + active section (state — drives sidebar, re-render is acceptable there)
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBarRef.current) {
          const pct = docH > 0 ? Math.min(1, y / docH) : 0;
          progressBarRef.current.style.width = `${(pct * 100).toFixed(3)}%`;
        }
        let active = 'problem';
        for (const { id } of NAV_SECTIONS) {
          const el = document.getElementById(`sec-${id}`);
          if (el && el.getBoundingClientRect().top <= 100) active = id;
        }
        setActiveSection((prev) => (prev === active ? prev : active));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll chat log to bottom on new messages
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`sec-${id}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const canonicalUrl = `https://viewbens.work${pathname}`;
  const companySlug = pathname.split('/').pop() ?? 'work';
  const pageDescription =
    heroSubtitle.length > 155 ? heroSubtitle.slice(0, 152) + '...' : heroSubtitle;

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>{`${company} · ${heroTitle.replace(/\.$/, '')} — Ben Maxwell`}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${company} — Ben Maxwell`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`https://viewbens.work/og/${companySlug}.png`} />
      </Helmet>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {/* ——— NAV ——— */}
      <NavBar activePath="/work" />

      {/* ——— SCROLL PROGRESS ——— */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressBar} ref={progressBarRef} />
      </div>

      {/* ——— PAGE BODY ——— */}
      <div
        className={[styles.pageBody, showChat ? styles.pageBodyWithChat : '']
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles.layoutInner}>
          {/* ——— SIDEBAR ——— */}
          {layout === 'sidebar' && (
            <aside className={styles.sidebar} aria-label="Contents">
              <div className={styles.sidebarLabel}>Contents</div>
              <nav aria-label="Case study contents">
                {NAV_SECTIONS.map(({ id, label, num }) => (
                  <a
                    key={id}
                    href={`#sec-${id}`}
                    className={[
                      styles.sidebarLink,
                      activeSection === id ? styles.sidebarLinkActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    aria-current={activeSection === id ? 'location' : undefined}
                  >
                    <span
                      className={[
                        styles.sidebarNum,
                        activeSection === id ? styles.sidebarNumActive : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {num}
                    </span>
                    <span>{label}</span>
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* ——— MAIN ——— */}
          <main className={styles.main} id="main-content">
            {/* HERO */}
            <CaseStudyHero
              number={number}
              dateRange={dateRange}
              title={heroTitle}
              subtitle={heroSubtitle}
              meta={meta}
            />

            {/* 01 · PROBLEM */}
            <section id="sec-problem" className={styles.section} aria-labelledby="heading-problem">
              <span className={styles.sectionKicker}>01 · Problem</span>
              <h2 id="heading-problem" className={styles.sectionHeading}>
                {problem.heading}
              </h2>
              <div className={styles.prose}>
                {problem.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* 02 · ROLE */}
            <section id="sec-role" className={styles.section} aria-labelledby="heading-role">
              <span className={styles.sectionKicker}>02 · Role</span>
              <h2 id="heading-role" className="sr-only">
                Role
              </h2>
              <RoleCallouts>
                {role.map((row, i) => (
                  <RoleCallout key={i} label={row.label} content={row.content} />
                ))}
              </RoleCallouts>
            </section>

            {/* 03 · USER CONTEXT */}
            <section id="sec-context" className={styles.section} aria-labelledby="heading-context">
              <span className={styles.sectionKicker}>03 · User context</span>
              <h2 id="heading-context" className="sr-only">
                User context
              </h2>
              <div className={styles.prose}>
                {userContext.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* 04 · PROCESS */}
            <section id="sec-process" className={styles.section} aria-labelledby="heading-process">
              <span className={styles.sectionKicker}>04 · Process</span>
              <h2 id="heading-process" className="sr-only">
                Process
              </h2>
              <ProcessSteps>
                {process.map((step, i) => (
                  <ProcessStep
                    key={i}
                    num={i + 1}
                    phase={step.phase}
                    title={step.title}
                    body={step.body}
                    artifact={step.artifact}
                  />
                ))}
              </ProcessSteps>
            </section>

            {/* 05 · KEY DECISION */}
            <section
              id="sec-decision"
              className={styles.section}
              aria-labelledby="heading-decision"
            >
              <span className={styles.sectionKicker}>05 · Key decision</span>
              <h2 id="heading-decision" className={styles.sectionHeading}>
                {keyDecision.heading}
              </h2>
              <div className={styles.prose}>
                {keyDecision.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {keyDecision.artifactLabel && (
                <ImageCaption
                  tabLabel={`${company.toLowerCase()} · ${keyDecision.artifactLabel}`}
                  caption={`Fig. 01 — ${keyDecision.artifactLabel}.`}
                />
              )}
            </section>

            {/* 06 · WHAT WAS HARD */}
            <section id="sec-hard" className={styles.section} aria-labelledby="heading-hard">
              <span className={styles.sectionKicker}>06 · What was hard</span>
              <h2 id="heading-hard" className="sr-only">
                What was hard
              </h2>
              <div className={styles.prose}>
                {whatWasHard.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* 07 · OUTCOMES */}
            <section
              id="sec-outcomes"
              className={styles.section}
              aria-labelledby="heading-outcomes"
            >
              <span className={styles.sectionKicker}>07 · Outcomes</span>
              <h2 id="heading-outcomes" className="sr-only">
                Outcomes
              </h2>
              <StatGrid>
                {outcomes.map((o, i) => (
                  <StatBlock key={i} value={o.value} label={o.label} body={o.body} />
                ))}
              </StatGrid>
            </section>

            {/* 08 · WHAT I'D DO DIFFERENTLY */}
            <section
              id="sec-reflection"
              className={styles.section}
              aria-labelledby="heading-reflection"
            >
              <span className={styles.sectionKicker}>08 · What I'd do differently</span>
              <h2 id="heading-reflection" className="sr-only">
                What I'd do differently
              </h2>
              <div className={styles.prose}>
                {whatIdDoDifferently.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* END TICK */}
            <div className={styles.endTick}>
              <span className={styles.endTickLabel}>End of case study</span>
              <span className={styles.endTickLine} aria-hidden="true" />
              {nextCase && (
                <a href={nextCase.href} className={styles.endTickNext}>
                  Next: {nextCase.title} →
                </a>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ——— DOCKED CHAT PANEL ——— */}
      {showChat && (
        <aside className={styles.chatPanel} aria-label="Ask Ben assistant">
          <div className={styles.chatHeader}>
            <span className={styles.chatHeaderLabel}>Ask Ben</span>
            <span className={styles.chatOnlineBadge}>
              <span className={`${styles.chatOnlineDot} cursor-blink`} aria-hidden="true" />
              ONLINE
            </span>
          </div>

          <div className={styles.chatContext} aria-label={`Context: ${company}`}>
            <span>Context</span>
            <span className={styles.chatContextLine} aria-hidden="true" />
            <span className={styles.chatContextValue}>{company}</span>
          </div>

          <div
            className={styles.chatLog}
            ref={chatLogRef}
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.length === 0 ? (
              <>
                <p className={styles.msgAssistant}>
                  Reading about {company} — ask anything about this project, or jump to another case
                  study.
                  <span className={`${styles.msgCursor} cursor-blink`} aria-hidden="true">
                    _
                  </span>
                </p>
                {chatSuggestions.length > 0 && (
                  <div className={styles.chatSuggestions}>
                    <span className={styles.chatSuggestLabel}>Try asking</span>
                    {chatSuggestions.map((s) => (
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
                )}
              </>
            ) : (
              messages.map((m, i) =>
                m.role === 'user' ? (
                  <p key={i} className={styles.msgUser}>
                    <span className={styles.msgUserPrompt} aria-hidden="true">
                      ›{' '}
                    </span>
                    {m.text}
                  </p>
                ) : (
                  <p key={i} className={styles.msgAssistant}>
                    {m.text}
                    {i === messages.length - 1 && chatStatus === 'loading' && (
                      <span className={`${styles.msgCursor} cursor-blink`} aria-hidden="true">
                        _
                      </span>
                    )}
                  </p>
                ),
              )
            )}
          </div>

          <div className={styles.chatInputWrap}>
            <ChatInput onSubmit={handleSubmit} status={chatStatus} showStatus={false} />
          </div>
        </aside>
      )}
    </div>
  );
}
