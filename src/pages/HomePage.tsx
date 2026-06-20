import { useState, useRef, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import { NavBar } from '../components/NavBar';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { ChatInput } from '../components/ChatInput';
import type { ChatWidgetStatus } from '../components/ChatInput';
import styles from './HomePage.module.css';
export interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export interface HomePageProps {
  /** Storybook only — intercepts submit instead of calling /api/chat. */
  onChatSubmit?: (text: string) => void;
  /** Pre-seed messages — triggers docked mode automatically. */
  initialMessages?: Message[];
}

const SUGGESTIONS = [
  'How did Sabre win the $1B contract?',
  'What did you do at Upfluent?',
  'What are you looking for next?',
] as const;

const CASE_STUDIES = [
  {
    index: '01',
    title: 'Portfolio Rebuild with Claude',
    desc: 'Directing an AI to build a portfolio — and making the process the case study.',
    tag: 'Meta',
    href: '/work/portfolio',
    role: 'Principal UX Designer',
    year: '2026',
    sector: 'Product Design',
  },
  {
    index: '02',
    title: 'Upfluent',
    desc: 'A hybrid AI chatbot: talk like an advisor, act with real controls.',
    tag: 'Fintech',
    href: '/work/upfluent',
    role: 'Lead UX Designer',
    year: '2023–24',
    sector: 'Fintech',
  },
  {
    index: '03',
    title: 'Sagent',
    desc: 'Design leadership on a mortgage platform with no design director.',
    tag: 'Mortgage',
    href: '/work/sagent',
    role: 'Principal UX Designer',
    year: '2021–22',
    sector: 'Mortgage',
  },
  {
    index: '04',
    title: 'USAA',
    desc: 'Modernizing P&C insurance without losing the members who trusted it.',
    tag: 'Insurance',
    href: '/work/usaa',
    role: 'Senior UX Designer',
    year: '2018–20',
    sector: 'Insurance',
  },
] as const;

const STAT_RAIL_DATA = [
  { date: 'Portfolio Rebuild · 2026', outcome: 'Principal · AI-directed process, public.' },
  { date: 'Upfluent · 2023–24', outcome: 'Lead · AI chatbot, signup 30% shorter.' },
  { date: 'Sagent · 2021–22', outcome: 'Co-lead · 4 designers, 12 business teams.' },
  { date: 'USAA · 2018–20', outcome: 'Lead, P&C · conversion +4–6%.' },
] as const;

async function streamChat(messages: Message[], onChunk: (text: string) => void): Promise<void> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.map(m => ({ role: m.role, content: m.text })),
    }),
  });
  if (!res.ok || !res.body) throw new Error(`Chat error ${res.status}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
}

export function HomePage({ onChatSubmit, initialMessages = [] }: HomePageProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [chatStatus, setChatStatus] = useState<ChatWidgetStatus>('online');
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const messagesRef = useRef(messages);
  const heroLogRef = useRef<HTMLDivElement | null>(null);
  const dockedLogRef = useRef<HTMLDivElement | null>(null);
  const mobileLogRef = useRef<HTMLDivElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Scroll all visible logs to bottom when messages change
  useEffect(() => {
    if (heroLogRef.current) heroLogRef.current.scrollTop = heroLogRef.current.scrollHeight;
    if (dockedLogRef.current) dockedLogRef.current.scrollTop = dockedLogRef.current.scrollHeight;
    if (mobileLogRef.current) mobileLogRef.current.scrollTop = mobileLogRef.current.scrollHeight;
  }, [messages]);

  // Return focus to FAB when mobile overlay closes
  useEffect(() => {
    if (!mobileChatOpen && fabRef.current) {
      fabRef.current.focus();
    }
  }, [mobileChatOpen]);

  const handleSubmit = useCallback(async (text: string) => {
    if (onChatSubmit) {
      onChatSubmit(text);
      return;
    }
    const current = messagesRef.current;
    const withUser: Message[] = [...current, { role: 'user', text }];
    setMessages(withUser);
    setChatStatus('loading');
    try {
      // Append empty assistant message immediately so the cursor shows
      setMessages(prev => [...prev, { role: 'assistant', text: '' }]);
      await streamChat(withUser, chunk => {
        setMessages(prev => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { role: 'assistant', text: last.text + chunk };
          return next;
        });
      });
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: "The assistant isn't available right now — try again in a moment." },
      ]);
    } finally {
      setChatStatus('online');
    }
  }, [onChatSubmit]);

  const isDocked = messages.length > 0;

  // Shared panel header
  const chatBarJSX = (
    <div className={styles.chatBar}>
      <span className={styles.chatBarLabel}>Ask Ben</span>
      <span className={styles.chatOnlineBadge}>
        <span className={`${styles.chatOnlineDot} cursor-blink`} aria-hidden />
        ONLINE
      </span>
    </div>
  );

  // Render the message log into a given container ref + class
  function renderLog(logRef: RefObject<HTMLDivElement | null>, className: string) {
    return (
      <div className={className} ref={logRef}>
        {messages.length === 0 ? (
          <>
            <p className={styles.msgAssistant}>
              Howdy. Ask about any case study, what I'm looking for, or how I work with AI.{' '}
              <span className={`${styles.msgCursor} cursor-blink`} aria-hidden>_</span>
            </p>
            <div className={styles.chatSuggestions}>
              <span className={styles.chatSuggestLabel}>Try asking</span>
              {SUGGESTIONS.map(s => (
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
                <span className={styles.msgUserPrompt} aria-hidden>{'› '}</span>
                {m.text}
              </p>
            ) : (
              <p key={i} className={styles.msgAssistant}>
                {m.text}
                {i === messages.length - 1 && m.text === '' && (
                  <span className={`${styles.msgCursor} cursor-blink`} aria-hidden>_</span>
                )}
              </p>
            )
          )
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <NavBar activePath="/work" />

      <div
        className={[styles.pageContent, isDocked ? styles.pageContentDocked : ''].filter(Boolean).join(' ')}
      >

      {/* ——— HERO ——— */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>

          {/* Identity — left column */}
          <div>
            <div className={styles.statusBadge}>
              Available for Design Leader roles
            </div>
            <h1 className={styles.heroH1}>
              I make expert tools{' '}
              <span className={styles.heroAmber}>learnable</span>.
            </h1>
            <p className={styles.heroLede}>
              Design Leader across travel, insurance, fintech, and mortgage — building
              tools experts actually adopt. Ask the assistant anything, or scroll to read
              the work.
            </p>
            <div className={styles.statRow}>
              <div className={styles.statCell}>
                <div className={styles.statFigure}>15+ yrs</div>
                <div className={styles.statLabel}>4 regulated industries</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statFigure}>$1B · +23%</div>
                <div className={styles.statLabel}>contract · revenue · Sabre</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statFigure}>now</div>
                <div className={styles.statLabel}>seeking Design Leader roles</div>
              </div>
            </div>
          </div>

          {/* Chat panel — right column, fades out when docked */}
          <aside
            className={[styles.chatPanel, isDocked ? styles.chatPanelHidden : ''].filter(Boolean).join(' ')}
            aria-label="Ask Ben — assistant"
            aria-hidden={isDocked}
            // @ts-expect-error — inert is a standard HTML attribute not yet in React's types
            inert={isDocked ? '' : undefined}
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
              <p className={styles.chatFootnote}>
                ONLINE · assistant ready · ~2s response
              </p>
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
        <div className={styles.workGrid}>
          {CASE_STUDIES.map(cs => (
            <CaseStudyCard key={cs.index} {...cs} />
          ))}
        </div>
      </section>

      {/* ——— STAT RAIL ——— */}
      <div className={styles.statRail} aria-hidden>
        {STAT_RAIL_DATA.map(r => (
          <div key={r.date} className={styles.statRailCell}>
            <span className={styles.statRailDate}>{r.date}</span>
            <span className={styles.statRailOutcome}>{r.outcome}</span>
          </div>
        ))}
      </div>

      {/* ——— FOOTER ——— */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <p className={styles.footerHeading}>
            Building something experts can't get wrong
            <span className={styles.footerQuestion}>?</span>
          </p>
          <div className={styles.footerLinks}>
            <a href="mailto:ben@benjaminwmaxwell.com" className={styles.footerLink}>
              ben@benjaminwmaxwell.com
            </a>
            <a
              href="https://linkedin.com/in/benwmax"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/benwmax"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className={styles.footerFine}>
          <span>© 2026 Ben Maxwell · viewbens.work</span>
          <span>Built with Claude — directed, not autopiloted. The process is the case study.</span>
        </div>
      </footer>

      </main>
      </div>{/* end .pageContent */}

      {/* ——— DOCKED CHAT PANEL (fixed right rail, desktop only) ——— */}
      <aside
        className={[styles.dockedPanel, isDocked ? '' : styles.dockedPanelHidden].filter(Boolean).join(' ')}
        aria-label="Ask Ben — assistant"
        aria-hidden={!isDocked}
        // @ts-expect-error — inert is a standard HTML attribute not yet in React's types
        inert={!isDocked ? '' : undefined}
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
          <span className={styles.fabPrompt} aria-hidden>›</span>
          Ask Ben
          {messages.length > 0 && (
            <span className={styles.fabBadge} aria-hidden>{messages.length}</span>
          )}
        </button>
      )}

      {/* ——— MOBILE CHAT OVERLAY — full screen sheet ——— */}
      <div
        className={[styles.mobileOverlay, mobileChatOpen ? styles.mobileOverlayOpen : ''].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Ask Ben — assistant"
        aria-hidden={!mobileChatOpen}
        // @ts-expect-error — inert is a standard HTML attribute not yet in React's types
        inert={!mobileChatOpen ? '' : undefined}
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
  );
}
