import { RoleCallout, RoleCallouts } from '../../components/RoleCallout';
import { ImageCaption } from '../../components/ImageCaption';
import { imagesFor } from '../../content/work-images';
import { STUDIES } from '../studies';
import type { StudyId } from '../widgetIds';
import { CaseStudyArt } from '../../components/CaseStudyCard/CaseStudyArt';
import { Frame, Prose, Stat, StatRow, TopicButton } from './Frame';
import styles from './Widgets.module.css';

// Single-section slices of a case study, for when the conversation needs one
// part (the outcomes, the hard moment) rather than the whole walkthrough.

/**
 * The project's title card, opening its tour: the line-art cover from the old
 * work grid, the index chip, and the headline. Ben (2026-10-29): the art "added
 * character to each case study", and the chat had lost it — every project
 * opened on the same plain text. Each project keeps its own line motion
 * (route, ripple, contour, converge), so they stay recognizable as you move
 * between tours.
 */
export function StudyCover({ study }: { study: StudyId }) {
  const { content, name, tag, art, index, years } = STUDIES[study];
  // The role is what a hiring manager scans for first (review 2026-10-29).
  const role = content.meta.find((m) => m.label === 'My role')?.value;
  return (
    <section className={styles.cover} aria-label={`${name} case study`}>
      {art && (
        <div className={styles.coverArt} aria-hidden="true">
          <CaseStudyArt variant={art} />
        </div>
      )}
      <div className={styles.coverBody}>
        <div className={styles.coverMeta}>
          {index && <span className={styles.coverIndex}>{index}</span>}
          <span>
            {tag} · {years}
          </span>
        </div>
        <h3 className={styles.coverName}>{name}</h3>
        <p className={styles.coverHeadline}>{content.heroTitle}</p>
        {role && (
          <p className={styles.coverRole}>
            <span>Ben's role · </span>
            {role}
          </p>
        )}
      </div>
    </section>
  );
}

/**
 * The outcomes a skimmer will remember: up to three whose value contains a
 * number, in the content's own order. Soft outcomes ("Scaled", "Picked up")
 * diluted the hard ones when all four sat side by side (review 2026-10-29).
 * The full case study still shows every outcome.
 */
function headlineOutcomes(study: StudyId) {
  const all = STUDIES[study].content.outcomes;
  const hard = all.filter((o) => /\d/.test(o.value)).slice(0, 3);
  return hard.length > 0 ? hard : all.slice(0, 3);
}

export function StudyOutcomes({ study }: { study: StudyId }) {
  const { name } = STUDIES[study];
  // No metadata in the bar: the cover just above already says the industry and
  // years, and repeating it is something to read and discard.
  return (
    <Frame wide label={`${name} · Results`}>
      <StatRow>
        {headlineOutcomes(study).map((o) => (
          <Stat key={o.label} {...o} />
        ))}
      </StatRow>
    </Frame>
  );
}

export function StudyRole({ study }: { study: StudyId }) {
  const { content, name } = STUDIES[study];
  const myRole = content.meta.find((m) => m.label === 'My role')?.value;
  return (
    <Frame label={`${name} · Role`} meta={myRole}>
      <RoleCallouts>
        {content.role.map((r) => (
          <RoleCallout key={r.label} {...r} />
        ))}
      </RoleCallouts>
    </Frame>
  );
}

export function StudyDecision({ study }: { study: StudyId }) {
  const { content, name, topic } = STUDIES[study];
  // A teaser (Sagent) has no key decision written — render nothing rather than an empty card.
  if (content.keyDecision.paragraphs.length === 0) return null;
  return (
    <Frame label={`${name} · Key decision`} title={content.keyDecision.heading}>
      <p className={styles.kicker}>In Ben's words</p>
      <Prose paragraphs={content.keyDecision.paragraphs} />
      <TopicButton topic={topic}>The whole {name} story</TopicButton>
    </Frame>
  );
}

export function StudyHard({ study }: { study: StudyId }) {
  const { content, name, topic } = STUDIES[study];
  if (content.whatWasHard.paragraphs.length === 0) return null;
  return (
    <Frame label={`${name} · What was hard`}>
      <p className={styles.kicker}>In Ben's words</p>
      <Prose paragraphs={content.whatWasHard.paragraphs} />
      <TopicButton topic={topic}>The whole {name} story</TopicButton>
    </Frame>
  );
}

/** Real screenshots only — renders nothing until Ben adds images for this study. */
export function StudyGallery({ study }: { study: StudyId }) {
  const images = imagesFor(study);
  if (images.length === 0) return null;
  const { name } = STUDIES[study];
  return (
    <Frame wide label={`${name} · The work`} meta={`${images.length} screens`}>
      <div className={styles.gallery}>
        {images.map((img) => (
          <ImageCaption key={img.src} {...img} />
        ))}
      </div>
    </Frame>
  );
}
