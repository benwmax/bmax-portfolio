import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { RoleCallout, RoleCallouts } from '../../components/RoleCallout';
import { ProcessStep, ProcessSteps } from '../../components/ProcessStep';
import { ImageCaption } from '../../components/ImageCaption';
import { imagesFor } from '../../content/work-images';
import { CaseStudyArt } from '../../components/CaseStudyCard/CaseStudyArt';
import { STUDIES } from '../studies';
import type { StudyId } from '../widgetIds';
import { Frame, Prose, Stat, StatRow } from './Frame';
import styles from './Widgets.module.css';

interface Step {
  key: string;
  label: string;
  body: ReactNode;
}

/**
 * The case study page, compressed into one card the visitor steps through.
 *
 * It follows the established case study structure (CLAUDE.md: problem, role,
 * users, process, key decision, what was hard, outcomes, what I'd do
 * differently) because that structure was chosen for this audience — a hiring
 * manager scanning for ownership and outcomes. A teaser study (Sagent) shows
 * only the sections that can be honest without the full story, like its page did.
 *
 * Steps rather than a long scroll: inside a chat log, a full case study would
 * push the conversation off screen. One section at a time keeps the transcript
 * readable and lets the visitor jump straight to Outcomes.
 */
export function CaseWalkthrough({ study }: { study: StudyId }) {
  const { content, name, tag, art } = STUDIES[study];
  const [index, setIndex] = useState(0);
  const panelId = useId();

  const outcomes = (
    <StatRow>
      {content.outcomes.map((o) => (
        <Stat key={o.label} {...o} />
      ))}
    </StatRow>
  );
  const role = (
    <RoleCallouts>
      {content.role.map((r) => (
        <RoleCallout key={r.label} {...r} />
      ))}
    </RoleCallouts>
  );
  const images = imagesFor(study);

  const steps: Step[] = content.teaser
    ? [
        { key: 'problem', label: 'Problem', body: <Prose paragraphs={content.problem.paragraphs} /> },
        { key: 'role', label: 'My role', body: role },
        {
          key: 'outcomes',
          label: 'Outcomes',
          body: (
            <>
              {outcomes}
              <p className={styles.note}>{content.teaser}</p>
            </>
          ),
        },
      ]
    : [
        { key: 'problem', label: 'Problem', body: <Prose paragraphs={content.problem.paragraphs} /> },
        { key: 'role', label: 'My role', body: role },
        { key: 'users', label: 'Users', body: <Prose paragraphs={content.userContext.paragraphs} /> },
        {
          key: 'process',
          label: 'Process',
          body: (
            <ProcessSteps>
              {content.process.map((p, i) => (
                <ProcessStep key={p.title} num={i + 1} {...p} />
              ))}
            </ProcessSteps>
          ),
        },
        {
          key: 'decision',
          label: 'Key decision',
          body: (
            <>
              <h4 className={styles.subhead}>{content.keyDecision.heading}</h4>
              <Prose paragraphs={content.keyDecision.paragraphs} />
            </>
          ),
        },
        { key: 'hard', label: 'What was hard', body: <Prose paragraphs={content.whatWasHard.paragraphs} /> },
        ...(images.length > 0
          ? [
              {
                key: 'work',
                label: 'The work',
                body: (
                  <div className={styles.gallery}>
                    {images.map((img) => (
                      <ImageCaption key={img.src} {...img} />
                    ))}
                  </div>
                ),
              },
            ]
          : []),
        { key: 'outcomes', label: 'Outcomes', body: outcomes },
        // Dropped when empty, as CaseStudyPage does — Sagent has none (decisions.md 2026-10-29).
        ...(content.whatIdDoDifferently.paragraphs.length > 0
          ? [
              {
                key: 'next',
                label: 'Next time',
                body: <Prose paragraphs={content.whatIdDoDifferently.paragraphs} />,
              },
            ]
          : []),
      ];

  const step = steps[index];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <Frame
      wide
      label={`${name} · Case study`}
      meta={
        <>
          {tag} · {content.dateRange}
        </>
      }
    >
      {/* The project's cover art behind the title, as the case study page had it. */}
      <div className={styles.walkHead}>
        {art && (
          <div className={styles.walkArt} aria-hidden="true">
            <CaseStudyArt variant={art} wash={false} />
          </div>
        )}
        <p className={styles.kicker}>In Ben's words</p>
        <h3 className={styles.title}>{content.heroTitle}</h3>
      </div>

      {/* A plain button row, not an ARIA tablist: each button is a "jump to
          section" control and the panel below announces nothing on change, so
          tab semantics (arrow-key roving focus) would promise behavior this
          doesn't need. aria-current marks the section being shown. */}
      <div className={styles.stepNav} role="group" aria-label={`${name} case study sections`}>
        {steps.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={[styles.stepBtn, i === index ? styles.stepBtnActive : ''].filter(Boolean).join(' ')}
            aria-current={i === index ? 'step' : undefined}
            aria-controls={panelId}
            onClick={() => setIndex(i)}
          >
            <span className={styles.stepNum} aria-hidden="true">
              {pad(i + 1)}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      <div id={panelId} className={styles.stepPanel}>
        {step.body}
      </div>

      <div className={styles.stepFooter}>
        <button
          type="button"
          className={styles.stepArrow}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <span aria-hidden="true">←</span> {index > 0 ? steps[index - 1].label : 'Previous'}
        </button>
        <span className={styles.stepCount} aria-live="polite">
          {pad(index + 1)} / {pad(steps.length)}
        </span>
        <button
          type="button"
          className={styles.stepArrow}
          onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          disabled={index === steps.length - 1}
        >
          {index < steps.length - 1 ? steps[index + 1].label : 'Next'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </Frame>
  );
}
