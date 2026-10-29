import { Frame } from './Frame';
import styles from './Widgets.module.css';

// Each key decision drawn as a diagram, built from HTML rather than images so it
// themes with the tokens and reads to a screen reader as text. These are
// illustrations of the *pattern*, not product screens — the real screens go in
// the gallery once Ben adds them (src/content/work-images.ts). Every label is
// taken from the case study content; nothing here adds a fact.

/** Sabre: one booking, two front doors, switch freely. */
export function SabreDiagram() {
  return (
    <Frame wide label="Sabre · Key decision" meta="Hybrid, not migration">
      <div className={styles.diagram}>
        <div className={styles.lanes2}>
          <div className={styles.node}>
            <span className={styles.nodeKicker}>Veterans</span>
            <span className={styles.nodeTitle}>Command line</span>
            <span className={styles.codeBars} aria-hidden="true">
              <span>›</span> ▮▮▮▮ ▮▮ ▮▮▮▮▮▮ ▮▮▮
            </span>
            <span className={styles.nodeBody}>Kept, and updated. Their speed was real.</span>
          </div>
          <div className={styles.swap} aria-hidden="true">
            <span>⇄</span>
          </div>
          <div className={styles.node}>
            <span className={styles.nodeKicker}>New &amp; seasonal agents</span>
            <span className={styles.nodeTitle}>Graphical mode</span>
            <span className={styles.formBars} aria-hidden="true">
              <span />
              <span />
              <span className={styles.formBtn} />
            </span>
            <span className={styles.nodeBody}>Fully graphical. No travel background needed.</span>
          </div>
        </div>
        <p className={styles.diagramJoin}>Switch freely — neither one is the backup option</p>
        <div className={[styles.node, styles.nodeAccent].join(' ')}>
          <span className={styles.nodeKicker}>Hotel, specifically</span>
          <span className={styles.nodeBody}>
            The Expedia layout agents already knew, with photos, rooms, maps, and neighborhood
            context brought inside the tool — so nobody tabs out mid-call.
          </span>
        </div>
      </div>
    </Frame>
  );
}

/** USAA: wins ship on the old stack while the redesign runs alongside and feeds them. */
export function UsaaDiagram() {
  const ships = Array.from({ length: 9 });
  return (
    <Frame wide label="USAA · Key decision" meta="Two parallel tracks">
      <div className={styles.diagram}>
        <div className={styles.track}>
          <span className={styles.trackLabel}>Legacy stack · A/B tests</span>
          <div className={styles.trackLine}>
            {ships.map((_, i) => (
              <span key={i} className={styles.trackShip} aria-hidden="true" />
            ))}
          </div>
          <span className={styles.trackNote}>Wins in production from week one</span>
        </div>
        <div className={styles.trackFeed} aria-hidden="true">
          <span>↑ insights</span>
          <span>↑ insights</span>
          <span>↑ insights</span>
        </div>
        <div className={styles.track}>
          <span className={styles.trackLabel}>Full redesign</span>
          <div className={[styles.trackLine, styles.trackLong].join(' ')}>
            <span className={styles.trackEnd}>18 mo.</span>
          </div>
          <span className={styles.trackNote}>The big reveal nobody had to wait for</span>
        </div>
      </div>
    </Frame>
  );
}

/** Upfluent: talk like an advisor, act with real controls — in the same thread. */
export function UpfluentDiagram() {
  return (
    <Frame wide label="Upfluent · Key decision" meta="Illustration of the pattern">
      <div className={styles.diagram}>
        <div className={styles.lanes2}>
          <div className={styles.node}>
            <span className={styles.nodeKicker}>Talk</span>
            <span className={styles.nodeTitle}>Conversation</span>
            <div className={styles.mockChat} aria-hidden="true">
              <span className={styles.mockUser}>What happens if I adjust this spread?</span>
              <span className={styles.mockBot}>Here's how your risk shifts →</span>
            </div>
            <span className={styles.nodeBody}>Free-flowing, like talking to an advisor.</span>
          </div>
          <div className={styles.swap} aria-hidden="true">
            <span>→</span>
          </div>
          <div className={styles.node}>
            <span className={styles.nodeKicker}>Act</span>
            <span className={styles.nodeTitle}>Inline controls</span>
            <div className={styles.mockControls} aria-hidden="true">
              <span className={styles.mockSlider}>
                Time horizon <span />
              </span>
              <span className={styles.mockSlider}>
                Downside risk <span />
              </span>
            </div>
            <span className={styles.nodeBody}>The precision of a real interface, in the same thread.</span>
          </div>
        </div>
        <p className={styles.diagramJoin}>
          Before function calling — reliable structured output took code and design together
        </p>
      </div>
    </Frame>
  );
}
