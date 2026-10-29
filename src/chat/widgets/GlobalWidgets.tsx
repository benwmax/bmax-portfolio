import { EXPERIENCE } from '../../content/experience';
import { SIDE_PROJECTS } from '../../content/side-projects';
import { CASE_STUDIES, STORYBOOK_URL } from '../../pages/explorations/data';
import { CaseStudyArt } from '../../components/CaseStudyCard/CaseStudyArt';
import { STUDIES, CLIENT_STUDY_ORDER } from '../studies';
import type { TopicId } from '../topics';
import { Frame, LinkRow, Stat, StatRow, TopicButton } from './Frame';
import { useWidgetActions } from './WidgetActions';
import styles from './Widgets.module.css';

const EMAIL = 'ben@viewbens.work';
const LINKEDIN = 'https://www.linkedin.com/in/benjaminwmaxwell/';
const REPO = 'https://github.com/benwmax/bmax-portfolio';

/**
 * One line per client case study, with the number a hiring manager will
 * remember. Portfolio order (01–04), not sorted by size of outcome — the order
 * is a strategic decision (CLAUDE.md) and this widget doesn't get to overrule it.
 */
const HEADLINE_OUTCOME: Record<string, number> = { upfluent: 0, sagent: 0, usaa: 0, sabre: 0 };

export function Highlights() {
  const { playTopic } = useWidgetActions();
  return (
    <Frame wide label="Selected work" meta="2015 → now">
      <ul className={styles.highlightList} role="list">
        {CLIENT_STUDY_ORDER.map((id) => {
          const { content, name, tag, topic, art } = STUDIES[id];
          const card = CASE_STUDIES.find((c) => c.title === name);
          const stat = content.outcomes[HEADLINE_OUTCOME[id]];
          return (
            <li key={id}>
              <button type="button" className={styles.highlight} onClick={() => playTopic(topic)}>
                {/* The project's cover art, fading out behind its number — the same
                    line motion that opens its tour, so the row and the tour match. */}
                {art && (
                  <span className={styles.highlightArt} aria-hidden="true">
                    <CaseStudyArt variant={art} wash={false} />
                  </span>
                )}
                <span className={styles.highlightStat}>{stat.value}</span>
                <span className={styles.highlightStatLabel}>{stat.label}</span>
                <span className={styles.highlightMain}>
                  <span className={styles.highlightName}>
                    {name}
                    <span className={styles.highlightTag}>
                      {tag} · {card?.year ?? content.dateRange}
                    </span>
                  </span>
                  <span className={styles.highlightDesc}>{card?.desc ?? content.heroTitle}</span>
                </span>
                <span className={styles.highlightGo} aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

const REASONS: { title: string; body: string; topic: TopicId; cta: string }[] = [
  {
    title: 'Outcomes in regulated industries',
    body: 'A $1B contract at Sabre. A 4–6% conversion lift at USAA. Tools that experts in travel, insurance, fintech, and mortgage actually adopted.',
    topic: 'best-work',
    cta: 'See the work',
  },
  {
    title: 'Leads before the title says so',
    body: "Led Sagent's design team through nine months without a director, across fourteen business teams. Built USAA's service blueprint to run without him.",
    topic: 'leadership',
    cta: 'How he leads',
  },
  {
    title: 'Design judgment that holds up with AI in the loop',
    body: 'Used AI to code a working Workflow builder at Sagent that developers finished in two days against a 3+ sprint estimate. Designed an AI trading advisor before function calling existed.',
    topic: 'ai',
    cta: 'Design + AI',
  },
];

export function WhyBen() {
  return (
    <Frame wide label="Why Ben" meta="UX Principal · Design Director">
      <ol className={styles.reasonGrid}>
        {REASONS.map((r, i) => (
          <li key={r.title} className={styles.reason}>
            <span className={styles.reasonNum} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h4 className={styles.subhead}>{r.title}</h4>
            <p className={styles.reasonBody}>{r.body}</p>
            <TopicButton topic={r.topic}>{r.cta}</TopicButton>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

// Resume entries that have a tour to open. Market Rebellion and the early roles
// have none — there's nothing written beyond the resume line, so no button.
const CAREER_TOPICS: Record<string, TopicId> = {
  'Self-directed — Portfolio Rebuild': 'ai',
  Sagent: 'sagent',
  Upfluent: 'upfluent',
  USAA: 'usaa',
  Sabre: 'sabre',
};

export function CareerTimeline() {
  const { playTopic } = useWidgetActions();
  return (
    <Frame wide label="Career" meta="2014 → now">
      <ol className={styles.timeline}>
        {EXPERIENCE.map((e) => {
          const topic = CAREER_TOPICS[e.company];
          return (
            <li key={`${e.company}-${e.dates}`} className={[styles.timelineRow, topic ? styles.timelineRowLinked : ''].filter(Boolean).join(' ')}>
              <span className={styles.timelineDates}>{e.dates}</span>
              <span className={styles.timelineDot} aria-hidden="true" />
              <div className={styles.timelineMain}>
                <span className={styles.timelineCompany}>{e.company.replace('Self-directed — ', '')}</span>
                <span className={styles.timelineRole}>
                  {e.role} · {e.sector}
                </span>
                <span className={styles.timelineOutcome}>{e.outcomes[0]}</span>
                {topic && (
                  <button type="button" className={styles.topicBtn} onClick={() => playTopic(topic)}>
                    Walk through it <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Frame>
  );
}

export function LookingFor() {
  return (
    <Frame label="Looking for" meta={<span className={styles.online}>Available</span>}>
      <blockquote className={styles.quote}>
        I make expert-level tools learnable — for agents, adjusters, attorneys, and traders who
        can't afford to get it wrong.
      </blockquote>
      <dl className={styles.facts}>
        <div>
          <dt>Roles</dt>
          <dd>UX Principal · Design Director</dd>
        </div>
        <div>
          <dt>Best fit</dt>
          <dd>Fintech, regulated industries, design systems at scale, serious AI product investment</dd>
        </div>
        <div>
          <dt>Experience</dt>
          <dd>15+ years · travel, insurance, fintech, mortgage</dd>
        </div>
        <div>
          <dt>Based in</dt>
          <dd>Dallas, Texas</dd>
        </div>
      </dl>
      <div className={styles.actions}>
        <LinkRow href="/resume" label="Resume" />
        <TopicButton topic="contact">Get in touch</TopicButton>
      </div>
    </Frame>
  );
}

const METHODS = [
  {
    method: 'Field observation · XML data audit',
    project: 'Sabre',
    changed:
      'Agents tabbed out to Expedia mid-call — so Hotel brought photos, rooms, and maps inside the tool.',
  },
  {
    method: 'Buy a Feature, at an industry conference',
    project: 'Sabre',
    changed: 'Agents spent a fictional budget, which gave the team a defensible scope hierarchy.',
  },
  {
    method: 'Heuristic review · Usability testing',
    project: 'USAA',
    changed: 'An honest baseline of what was broken, before any redesign started.',
  },
  {
    method: 'Service blueprint',
    project: 'USAA',
    changed:
      'Employee actions, regulation, and backend systems mapped together for the first time.',
  },
  {
    method: 'Card sorting · Tree testing',
    project: 'Upfluent',
    changed: "Signup came in 30%+ shorter than competitors'.",
  },
];

export function ResearchMethods() {
  return (
    <Frame wide label="Research" meta="Method → what it changed">
      <ul className={styles.methodList} role="list">
        {METHODS.map((m) => (
          <li key={m.method} className={styles.method}>
            <span className={styles.methodName}>{m.method}</span>
            <span className={styles.methodProject}>{m.project}</span>
            <span className={styles.methodChanged}>{m.changed}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function AiSplit() {
  const { content } = STUDIES.portfolio;
  const owned = content.role.find((r) => r.label === 'Owned');
  const claude = content.role.find((r) => r.label === 'Claude owned');
  const distinction = content.role.find((r) => r.label === 'The distinction');
  return (
    <Frame wide label="Portfolio rebuild · Who did what" meta="2026">
      <div className={styles.split}>
        <div className={[styles.splitCol, styles.splitColBen].join(' ')}>
          <span className={styles.nodeKicker}>Ben owned</span>
          <p>{owned?.content}</p>
        </div>
        <div className={styles.splitCol}>
          <span className={styles.nodeKicker}>Claude owned</span>
          <p>{claude?.content}</p>
        </div>
      </div>
      {distinction && <blockquote className={styles.quote}>{distinction.content}</blockquote>}
    </Frame>
  );
}

const AI_LIMITS = [
  {
    wrong: 'Never raised the NDA question in its first audit.',
    did: 'Ran a second, adversarial review aimed at the first one’s output.',
  },
  {
    wrong: 'Called his only visually strong case study the weakest.',
    did: 'Kept his own read of which work showed craft.',
  },
  {
    wrong: 'Wanted to merge two drafts of a case study.',
    did: 'Kept the leaner one.',
  },
  {
    wrong: 'Wanted to leave a gap in the case study numbering.',
    did: 'Renumbered — a gap reads as something missing.',
  },
];

export function AiLimits() {
  const { content } = STUDIES.portfolio;
  return (
    <Frame wide label="Portfolio rebuild · Where he overruled the AI">
      <ul className={styles.limitList} role="list">
        {AI_LIMITS.map((l) => (
          <li key={l.wrong} className={styles.limit}>
            <span className={styles.limitWrong}>
              <span className={styles.limitTag}>AI</span>
              {l.wrong}
            </span>
            <span className={styles.limitDid}>
              <span className={[styles.limitTag, styles.limitTagBen].join(' ')}>Ben</span>
              {l.did}
            </span>
          </li>
        ))}
      </ul>
      <StatRow>
        {content.outcomes.map((o) => (
          <Stat key={o.label} {...o} />
        ))}
      </StatRow>
    </Frame>
  );
}

export function SideProjects() {
  if (SIDE_PROJECTS.length === 0) return null;
  return (
    <Frame wide label="On his own time" meta={`${SIDE_PROJECTS.length} projects`}>
      <ul className={styles.projectGrid} role="list">
        {SIDE_PROJECTS.map((p) => (
          <li key={p.title} className={styles.project}>
            {p.image && <img src={p.image.src} alt={p.image.alt} className={styles.projectImg} />}
            <span className={styles.nodeKicker}>{p.year}</span>
            <h4 className={styles.subhead}>{p.title}</h4>
            <p className={styles.reasonBody}>{p.summary}</p>
            <span className={styles.projectTags}>{p.tags.join(' · ')}</span>
            {p.href && <LinkRow href={p.href} label="Open" />}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function DesignSystemLinks() {
  return (
    <Frame label="Design system" meta="Public">
      <div className={styles.linkList}>
        <LinkRow href={STORYBOOK_URL} label="Browse the component library" detail="system.viewbens.work" />
        <LinkRow href={REPO} label="Read the source" detail="github.com/benwmax/bmax-portfolio" />
      </div>
    </Frame>
  );
}

export function ResumeLinks() {
  return (
    <Frame label="Resume">
      <div className={styles.linkList}>
        <LinkRow href="/resume" label="Full resume" detail="Roles, dates, skills" />
        <LinkRow href="/about" label="About Ben" detail="The longer story" />
        <LinkRow href={LINKEDIN} label="LinkedIn" detail="linkedin.com/in/benjaminwmaxwell" />
      </div>
    </Frame>
  );
}

export function ContactLinks() {
  return (
    <Frame label="Contact" meta="Replies within 48 hours">
      <div className={styles.linkList}>
        <LinkRow href={`mailto:${EMAIL}`} label="Email" detail={EMAIL} />
        <LinkRow href={LINKEDIN} label="LinkedIn" detail="linkedin.com/in/benjaminwmaxwell" />
        <LinkRow href="/contact" label="Contact page" />
      </div>
    </Frame>
  );
}
