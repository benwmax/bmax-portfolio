import { Frame } from './Frame';
import styles from './Diagrams.module.css';

// Each key decision as a small picture that supports the sentence above it in
// the chat. Built from HTML so it themes with the tokens.
//
// Rewritten 2026-10-29 (Ben: "confusing — less technical, more visual"): the
// first versions labelled every box with jargon ("legacy stack · A/B tests",
// "inline controls", "before function calling"). The reader is a recruiter or
// hiring manager who just read one plain sentence; the picture should let them
// *see* that sentence, not decode a second, more technical one. So: few words,
// plain ones, and the visual does the explaining.
//
// These are sketches of the idea, not product screens — real screens go in the
// gallery once Ben adds them (src/content/work-images.ts). No labels add facts
// beyond the case study content. The sketches are aria-hidden; each figure's
// caption carries the meaning for screen readers.

/** Sabre: two ways in — typing for veterans, point-and-click for new agents — one booking. */
export function SabreDiagram() {
  return (
    <Frame wide label="Sabre · The idea">
      <figure className={styles.figure}>
        <div className={styles.sabre} aria-hidden="true">
          <div className={styles.door}>
            <span className={styles.doorWho}>Veteran agents</span>
            <div className={styles.keys}>
              {['H', 'O', 'T', 'E', 'L'].map((k) => (
                <span key={k} className={styles.key}>
                  {k}
                </span>
              ))}
              <span className={styles.caret} />
            </div>
            <span className={styles.doorHow}>Keep typing</span>
          </div>

          <div className={styles.door}>
            <span className={styles.doorWho}>New agents</span>
            <div className={styles.form}>
              <span className={styles.field} />
              <span className={styles.field} />
              <span className={styles.button}>Search</span>
            </div>
            <span className={styles.doorHow}>Point and click</span>
          </div>

          <div className={styles.join}>
            <span className={styles.joinLine} />
            <span className={styles.joinLine} />
          </div>

          <div className={styles.result}>
            <span className={styles.resultIcon}>✓</span>
            Same booking
          </div>
        </div>
        <figcaption className={styles.caption}>
          Two ways into one tool. Agents switch whenever they like.
        </figcaption>
      </figure>
    </Frame>
  );
}

/** USAA: small wins shipped on the current site while the redesign was still being built. */
export function UsaaDiagram() {
  const wins = Array.from({ length: 8 });
  return (
    <Frame wide label="USAA · The idea">
      <figure className={styles.figure}>
        <div className={styles.usaa} aria-hidden="true">
          <div className={styles.row}>
            <span className={styles.rowLabel}>Current site</span>
            <div className={styles.lane}>
              {wins.map((_, i) => (
                <span key={i} className={styles.win}>
                  ✓
                </span>
              ))}
            </div>
          </div>

          <div className={styles.feed}>
            <span>↑</span>
            <span>↑</span>
            <span>↑</span>
          </div>

          <div className={styles.row}>
            <span className={styles.rowLabel}>New design</span>
            <div className={[styles.lane, styles.laneBuild].join(' ')}>
              <span className={styles.buildBar} />
            </div>
          </div>

          <div className={styles.axis}>
            <span>Week 1</span>
            <span>18 months</span>
          </div>
        </div>
        <figcaption className={styles.caption}>
          Wins shipped from week one, using what the redesign was learning.
        </figcaption>
      </figure>
    </Frame>
  );
}

/** Upfluent: ask the advisor in plain words, then act right there in the chat. */
export function UpfluentDiagram() {
  return (
    <Frame wide label="Upfluent · The idea">
      <figure className={styles.figure}>
        <div className={styles.upfluent} aria-hidden="true">
          <div className={styles.phone}>
            <span className={styles.step}>1 · Ask</span>
            <span className={styles.bubbleUser}>What if I give this trade more time?</span>
            <span className={styles.bubbleBot}>Here's how your risk changes:</span>

            <span className={styles.step}>2 · Act</span>
            <div className={styles.control}>
              <div className={styles.slider}>
                <span className={styles.sliderFill} />
                <span className={styles.sliderKnob} />
              </div>
              <div className={styles.riskBars}>
                {[30, 45, 60, 50, 35].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <span className={styles.apply}>Update trade</span>
            </div>
          </div>
        </div>
        <figcaption className={styles.caption}>
          Talk it through like an advisor, then act without leaving the chat.
        </figcaption>
      </figure>
    </Frame>
  );
}
