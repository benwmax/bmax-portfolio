import { Link } from 'react-router-dom';
import { PageHead } from '../seo/PageHead';
import { RESUME_META } from '../seo/pageMeta';
import { NavBar } from '../components/NavBar';
import { EXPERIENCE } from '../content/experience';
import styles from './ResumePage.module.css';

const SKILLS = [
  { category: 'Methods', items: ['Heuristic review', 'Design sprints', 'User research', 'Usability testing', 'Journey mapping', 'Systems thinking'] },
  { category: 'Design', items: ['Figma', 'Storybook', 'Design systems', 'Component architecture', 'Interaction design', 'Accessibility (WCAG)'] },
  { category: 'Engineering', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'CSS Modules', 'Vercel / Edge Functions'] },
  { category: 'Leadership', items: ['Team lead', 'Cross-functional facilitation', 'Strategic planning', 'Mentorship', 'Stakeholder alignment'] },
] as const;

export function ResumePage() {
  return (
    <div className={styles.wrapper}>
      <PageHead meta={RESUME_META} />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar activePath="/resume" />

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
                href="https://www.linkedin.com/in/benjaminwmaxwell/"
                className={styles.contactItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/benjaminwmaxwell
              </a>
              <Link to="/" className={styles.contactItem}>
                viewbens.work
              </Link>
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
