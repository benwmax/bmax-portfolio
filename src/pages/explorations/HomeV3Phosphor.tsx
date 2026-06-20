import { useRef, useEffect, useCallback } from 'react';
import { NavBar } from '../../components/NavBar';
import { ChatInput } from '../../components/ChatInput';
import { useChatSession } from '../../hooks/useChatSession';
import type { Message } from '../../hooks/useChatSession';
import { CASE_STUDIES, SUGGESTIONS, SOCIAL_LINKS } from './data';
import { usePrefersReducedMotion } from './hooks';
import { PhosphorCanvas } from './PhosphorCanvas';
import styles from './HomeV3Phosphor.module.css';

export type { Message };

export interface HomeV3PhosphorProps {
  onChatSubmit?: (text: string) => void;
  initialMessages?: Message[];
}

/** A case study card that tilts in 3D toward the cursor and lights a sheen. */
function TiltCard({
  cs,
  reduced,
}: {
  cs: (typeof CASE_STUDIES)[number];
  reduced: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height;
      const max = 8; // degrees
      el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`);
      el.style.setProperty('--rx', `${(0.5 - py) * 2 * max}deg`);
      el.style.setProperty('--cx', `${px * 100}%`);
      el.style.setProperty('--cy', `${py * 100}%`);
    },
    [reduced],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return (
    <a
      ref={ref}
      href={cs.href}
      className={styles.tiltCard}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className={styles.tiltSheen} aria-hidden />
      <span className={styles.tiltTag}>{cs.tag}</span>
      <span className={styles.tiltNum} aria-hidden>
        {cs.index}
      </span>
      <h3 className={styles.tiltTitle}>{cs.title}</h3>
      <p className={styles.tiltDesc}>{cs.desc}</p>
      <div className={styles.tiltMeta}>
        <div className={styles.tiltMetaCell}>
          <span className={styles.tiltMetaKey}>Role</span>
          <span className={styles.tiltMetaVal}>{cs.role}</span>
        </div>
        <div className={styles.tiltMetaCell}>
          <span className={styles.tiltMetaKey}>Year</span>
          <span className={styles.tiltMetaVal}>{cs.year}</span>
        </div>
        <div className={styles.tiltMetaCell}>
          <span className={styles.tiltMetaKey}>Sector</span>
          <span className={styles.tiltMetaVal}>{cs.sector}</span>
        </div>
      </div>
    </a>
  );
}

/** A button that drifts toward the cursor when it's near — a "magnetic" CTA. */
function MagneticCTA({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      el.style.setProperty('--tx', `${(e.clientX - cx) * 0.3}px`);
      el.style.setProperty('--ty', `${(e.clientY - cy) * 0.3}px`);
    },
    [reduced],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tx', '0px');
    el.style.setProperty('--ty', '0px');
  }, []);

  return (
    <span className={styles.magnetWrap}>
      <a
        ref={ref}
        href="mailto:ben@benjaminwmaxwell.com"
        className={styles.magnet}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        Start a conversation →
      </a>
    </span>
  );
}

export function HomeV3Phosphor({ onChatSubmit, initialMessages = [] }: HomeV3PhosphorProps) {
  const { messages, chatStatus, handleSubmit } = useChatSession({
    onSubmit: onChatSubmit,
    initialMessages,
  });
  const reduced = usePrefersReducedMotion();
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <PhosphorCanvas className={styles.canvas} />
      <div className={styles.canvasFade} aria-hidden />

      <NavBar activePath="/work" />

      <div className={styles.content}>
        {/* ——— HERO ——— */}
        <header className={styles.hero}>
          <div className={styles.heroBadge}>
            <span className={`${styles.heroDot} cursor-blink`} aria-hidden />
            Available for Design Leader roles
          </div>

          <h1 className={styles.heroH1}>
            <span className={styles.heroLine}>I make expert tools</span>
            <span className={styles.heroLine}>
              <span className={styles.glow}>learnable</span>.
            </span>
          </h1>

          <p className={styles.heroLede}>
            Design Leader across travel, insurance, fintech, and mortgage — building tools experts
            actually adopt. Ask the assistant, or scroll to read the work.
          </p>

          {/* Floating command bar */}
          <div className={styles.commandWrap}>
            <div className={styles.command}>
              <div className={styles.commandBar}>
                <span className={styles.commandLabel}>Ask Ben — assistant</span>
                <span className={styles.commandBadge}>
                  <span className={`${styles.heroDot} cursor-blink`} aria-hidden />
                  ONLINE
                </span>
              </div>
              <div className={styles.commandBody}>
                {messages.length > 0 && (
                  <div className={styles.chatLog} ref={logRef}>
                    {messages.map((m, i) =>
                      m.role === 'user' ? (
                        <p key={i} className={styles.msgUser}>
                          <span style={{ color: 'var(--color-green-accent)' }}>{'› '}</span>
                          {m.text}
                        </p>
                      ) : (
                        <p key={i} className={styles.msgAssistant}>
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
                  <div className={styles.suggestRow}>
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={styles.suggestBtn}
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

          <div className={styles.scrollCue} aria-hidden>
            <span>scroll</span>
            <span className={styles.scrollCueLine} />
          </div>
        </header>

        {/* ——— WORK ——— */}
        <main id="main-content">
          <section className={styles.workSection} aria-label="Selected work">
            <div className={styles.workHead}>
              <div className={styles.workKicker}>Selected work · 2014–2026</div>
              <h2 className={styles.workTitle}>Four tools, four regulated industries</h2>
            </div>

            <div className={styles.workGrid}>
              {CASE_STUDIES.map((cs) => (
                <TiltCard key={cs.index} cs={cs} reduced={reduced} />
              ))}
            </div>
          </section>

          {/* ——— CTA ——— */}
          <section className={styles.cta}>
            <h2 className={styles.ctaHeading}>
              Building something experts can't get wrong
              <span className={styles.ctaQ}>?</span>
            </h2>
            <MagneticCTA reduced={reduced} />
          </section>

          <footer className={styles.footer}>
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
            <span className={styles.footerFine}>
              © 2026 Ben Maxwell · viewbens.work — built with Claude, directed not autopiloted.
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
