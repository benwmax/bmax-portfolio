import { NavBar } from '../components/NavBar';
import styles from './ResumePage.module.css';

const EXPERIENCE = [
  {
    role: 'Principal UX Designer',
    company: 'Self-directed — Portfolio Rebuild',
    dates: '2026',
    sector: 'Meta',
    outcomes: [
      'Directed a full portfolio rebuild using Claude as AI collaborator — the build process is the lead case study.',
      'Designed and built the component system, page templates, and AI chat feature using React, Tailwind, and Storybook 8.',
    ],
  },
  {
    role: 'Lead UX Designer',
    company: 'Upfluent',
    dates: '2023–24',
    sector: 'Fintech',
    outcomes: [
      'Designed a hybrid AI chatbot that functions as a financial advisor: conversational interface with real control actions.',
      'Reduced signup flow length by 30% through targeted research and iterative testing.',
    ],
  },
  {
    role: 'Principal UX Designer · Co-lead',
    company: 'Sagent',
    dates: '2021–22',
    sector: 'Mortgage technology',
    outcomes: [
      'Co-led a 4-person design team coordinating across 12 business teams on a large-scale mortgage platform rebuild.',
      'Stepped into a director-level gap when the design director departed unexpectedly — ran strategic planning and mentored junior designers.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'Market Rebellion',
    dates: '2020–21',
    sector: 'Financial trading',
    outcomes: [
      'Designed retail-facing options trading tools for a platform co-founded by veteran traders — expert-to-novice translation at its hardest.',
    ],
  },
  {
    role: 'Lead UX Designer — P&C',
    company: 'USAA',
    dates: '2018–20',
    sector: 'Insurance',
    outcomes: [
      'Led UX for the P&C modernization initiative: heuristic review, design sprint, and iterative redesign of the core insurance experience.',
      'Conversion +4–6% across redesigned flows without removing the depth long-time members relied on.',
    ],
  },
  {
    role: 'Senior UX Designer',
    company: 'Sabre',
    dates: '2014–18',
    sector: 'Travel technology',
    outcomes: [
      'Redesigned the NDC booking channel; work contributed to a $1B government contract win and +23% revenue lift.',
      'Built complex tools for travel agents who need speed, accuracy, and zero-tolerance for UX errors.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'AT&T',
    dates: 'Mar–Oct 2015',
    sector: 'Telecom enterprise',
    outcomes: [
      'Analyzed end-to-end B2B user registration across all AT&T products and architected solutions covering online and offline touchpoints.',
      'Created designs for B2B internet and phone signup and servicing experiences in collaboration with product, engineering, and research.',
    ],
  },
  {
    role: 'UX/UI Designer',
    company: 'PeopleAnswers',
    dates: 'Oct 2014–Mar 2015',
    sector: 'HR technology',
    outcomes: [
      'Established the UX department and designed HR tools for hiring and employee management.',
      'Researched multi-lingual best practices for an internationalization project spanning six countries; provided UX recommendations across all markets.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'Aperia Solutions',
    dates: 'May–Oct 2014',
    sector: 'Fintech / compliance',
    outcomes: [
      'Helped establish the UX department and overhauled B2B financial and compliance applications used by millions of merchants nationwide.',
      'Reduced call-center costs and improved call-time efficiency by studying employee workflows and redesigning internal tools; led PCI compliance software redesign through usability testing with beta clients.',
    ],
  },
] as const;

const SKILLS = [
  { category: 'Methods', items: ['Heuristic review', 'Design sprints', 'User research', 'Usability testing', 'Journey mapping', 'Systems thinking'] },
  { category: 'Design', items: ['Figma', 'Storybook', 'Design systems', 'Component architecture', 'Interaction design', 'Accessibility (WCAG)'] },
  { category: 'Engineering', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'CSS Modules', 'Vercel / Edge Functions'] },
  { category: 'Leadership', items: ['Team lead', 'Cross-functional facilitation', 'Strategic planning', 'Mentorship', 'Stakeholder alignment'] },
] as const;

export function ResumePage() {
  return (
    <div className={styles.wrapper}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar activePath="/about" />

      <main className={styles.main} id="main-content">
        {/* ——— HEADER ——— */}
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.nameBlock}>
              <h1 className={styles.name}>Ben Maxwell</h1>
              <p className={styles.title}>UX Principal · Design Director</p>
            </div>
            <div className={styles.contactBlock}>
              <a href="mailto:ben@viewbens.work" className={styles.contactItem}>
                ben@viewbens.work
              </a>
              <a
                href="https://linkedin.com/in/benwmax"
                className={styles.contactItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/benwmax
              </a>
              <a href="/" className={styles.contactItem}>
                viewbens.work
              </a>
            </div>
          </div>
          <p className={styles.tagline}>
            15+ years across travel, insurance, fintech, and mortgage — building tools experts
            actually adopt.
          </p>
        </header>

        <div className={styles.body}>
          {/* ——— EXPERIENCE ——— */}
          <section aria-labelledby="heading-experience">
            <h2 id="heading-experience" className={styles.sectionLabel}>
              Experience
            </h2>
            <ol className={styles.expList} aria-label="Work experience">
              {EXPERIENCE.map((e) => (
                <li key={`${e.company}-${e.dates}`} className={styles.expItem}>
                  <div className={styles.expMeta}>
                    <span className={styles.expDates}>{e.dates}</span>
                    <span className={styles.expSector}>{e.sector}</span>
                  </div>
                  <div className={styles.expContent}>
                    <div className={styles.expHeader}>
                      <span className={styles.expRole}>{e.role}</span>
                      <span className={styles.expCompany}>{e.company}</span>
                    </div>
                    <ul className={styles.expOutcomes}>
                      {e.outcomes.map((o) => (
                        <li key={o} className={styles.expOutcome}>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ——— SKILLS ——— */}
          <section aria-labelledby="heading-skills" className={styles.skillsSection}>
            <h2 id="heading-skills" className={styles.sectionLabel}>
              Skills
            </h2>
            <div className={styles.skillsGrid}>
              {SKILLS.map((s) => (
                <div key={s.category} className={styles.skillGroup}>
                  <span className={styles.skillCategory}>{s.category}</span>
                  <ul className={styles.skillList}>
                    {s.items.map((item) => (
                      <li key={item} className={styles.skillItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
