import { NavBar } from '../components/NavBar';
import styles from './AboutPage.module.css';

const CAREER = [
  {
    company: 'Sabre',
    role: 'Senior UX Designer',
    sector: 'Travel technology',
    outcomes: ['$1B government contract win', '+23% revenue lift', 'NDC channel redesign'],
  },
  {
    company: 'USAA',
    role: 'Lead UX Designer — P&C',
    sector: 'Insurance',
    outcomes: ['Conversion +4–6%', 'P&C modernization', 'Research-driven redesign'],
  },
  {
    company: 'Market Rebellion',
    role: 'UX Designer',
    sector: 'Financial trading',
    outcomes: ['Retail options platform', 'Expert-to-novice translation'],
  },
  {
    company: 'Sagent',
    role: 'Principal UX Designer · Co-lead',
    sector: 'Mortgage technology',
    outcomes: ['Led 4-person design team', 'Coordinated 12 business teams', 'Stepped up when director departed'],
  },
  {
    company: 'Upfluent',
    role: 'Lead UX Designer',
    sector: 'Fintech',
    outcomes: ['AI chatbot design', 'Signup flow −30% steps', 'Hybrid advisory model'],
  },
  {
    company: 'Portfolio Rebuild',
    role: 'Principal UX Designer',
    sector: 'Meta · Self-directed',
    outcomes: ['AI-directed build process', 'Public case study', 'This site'],
  },
] as const;

export function AboutPage() {
  return (
    <div className={styles.wrapper}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar activePath="/about" />

      <main className={styles.main} id="main-content">
        {/* ——— INTRO ——— */}
        <header className={styles.intro}>
          <div className={styles.introInner}>
            <span className={styles.kicker}>About</span>
            <h1 className={styles.heading}>
              I make expert tools{' '}
              <span className={styles.headingAccent}>learnable</span>.
            </h1>
            <p className={styles.lede}>
              Fifteen years across travel, insurance, fintech, and mortgage — building tools
              that experts actually adopt. The work is in the details: the decision that made
              onboarding six months faster, the research that redesigned how an industry works,
              the chatbot that let retail traders think like professionals.
            </p>
          </div>
        </header>

        <div className={styles.contentInner}>
          {/* ——— HOW I WORK ——— */}
          <section className={styles.section} aria-labelledby="heading-approach">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionKicker}>01 · Approach</span>
              <h2 id="heading-approach" className={styles.sectionHeading}>
                The thing I'm actually good at.
              </h2>
            </div>
            <div className={styles.prose}>
              <p>
                The users I design for are professionals who've spent years getting good at
                something hard — claims adjusters, mortgage servicers, options traders, travel
                agents. They don't need things simplified. They need things organized. The
                distinction matters: simplifying expert tools usually breaks them. Organizing
                them is what makes them adoptable.
              </p>
              <p>
                I find that most adoption failures in enterprise tools aren't feature gaps —
                they're legibility gaps. The system works. The user can't tell what it's trying
                to say. My job is to close that gap without removing the depth the expert needs.
              </p>
            </div>
          </section>

          {/* ——— LEADERSHIP ——— */}
          <section className={styles.section} aria-labelledby="heading-leadership">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionKicker}>02 · Leadership</span>
              <h2 id="heading-leadership" className={styles.sectionHeading}>
                How I lead design teams.
              </h2>
            </div>
            <div className={styles.prose}>
              <p>
                At Sagent I co-led a four-person design team across twelve business teams
                simultaneously — no design director, unexpected leadership departure, and a
                mortgage platform mid-rebuild. I stepped up, ran strategic planning, mentored
                junior designers, and kept the program coherent. That's when I learned the
                difference between leading design and managing designers: the first one means
                protecting the work from scope sprawl and organizational churn.
              </p>
              <p>
                I'm a working lead. I'm in the details and in the decisions. I believe the
                best design leaders know what good looks like because they're still making it.
              </p>
            </div>
          </section>

          {/* ——— CAREER ARC ——— */}
          <section className={styles.section} aria-labelledby="heading-career">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionKicker}>03 · Career arc</span>
              <h2 id="heading-career" className={styles.sectionHeading}>
                Four industries, fifteen years.
              </h2>
            </div>
            <ol className={styles.careerList} aria-label="Career history">
              {CAREER.map((c) => (
                <li key={c.company} className={styles.careerItem}>
                  <div className={styles.careerLeft}>
                    <span className={styles.careerCompany}>{c.company}</span>
                    <span className={styles.careerRole}>{c.role}</span>
                    <span className={styles.careerSector}>{c.sector}</span>
                  </div>
                  <ul className={styles.careerOutcomes} aria-label={`${c.company} outcomes`}>
                    {c.outcomes.map((o) => (
                      <li key={o} className={styles.careerOutcome}>
                        {o}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          {/* ——— WHAT I'M LOOKING FOR ——— */}
          <section className={styles.section} aria-labelledby="heading-next">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionKicker}>04 · What I'm looking for</span>
              <h2 id="heading-next" className={styles.sectionHeading}>
                UX Principal or Design Director.
              </h2>
            </div>
            <div className={styles.prose}>
              <p>
                I'm looking for a senior IC or people-lead role at a company where design
                has real authority over product decisions — not a seat at the table in theory.
                Fintech, regulated industries, and companies with meaningful AI investment are
                the strongest fits. If the users are experts and the problem is hard, I want
                to talk.
              </p>
              <p>
                I'm based in [location] and open to remote or hybrid. Portfolio is at{' '}
                <a href="/" className={styles.inlineLink}>
                  viewbens.work
                </a>
                . Reach me at{' '}
                <a href="mailto:ben@viewbens.work" className={styles.inlineLink}>
                  ben@viewbens.work
                </a>
                .
              </p>
            </div>
          </section>
        </div>

        {/* ——— FOOTER ——— */}
        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <p className={styles.footerHeading}>
              Building something experts can't get wrong
              <span className={styles.footerQuestion}>?</span>
            </p>
            <div className={styles.footerLinks}>
              <a href="mailto:ben@viewbens.work" className={styles.footerLink}>
                ben@viewbens.work
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
            <span>Built with Claude — directed, not autopiloted.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
