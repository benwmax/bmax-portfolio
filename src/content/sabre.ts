import type { CaseStudyContent } from '../pages/CaseStudyPage';

export const sabreData: CaseStudyContent = {
  number: '04',
  dateRange: '2015–2018',
  company: 'Sabre',
  heroTitle: 'One tool, two users with opposite needs — and a $1B contract on the line.',
  heroSubtitle:
    "Sabre Red Workspace ran on a command line. Veterans had built careers on it. New agents couldn't read it. Modernize without breaking the experts, teach new agents without slowing veterans down, and ship on a hard deadline tied to a live bid.",
  meta: [
    { label: 'My role', value: 'Senior UX Designer · Hotel lead' },
    { label: 'Method', value: 'Field observation · Buy a Feature' },
    { label: 'Contract', value: '$1B win', accent: true },
    { label: 'Revenue', value: '+23%', accent: true },
  ],
  problem: {
    heading: 'A command line that took months to learn',
    paragraphs: [
      "Sabre Red Workspace ran on a command line. Agents typed cryptic strings to search flights, book hotels, pull pricing. Proficiency took weeks. Mastery took months.",
      "Flightcentre hires seasonally — many agents arrive with no travel industry background. That ramp time was a real cost, and they were leaving hotel revenue on the table because agents weren't surfacing it. They put the platform out to bid.",
    ],
  },
  role: [
    {
      label: 'Owned',
      content:
        "Individual contributor on the redesign team. I owned Hotel booking — the highest-margin area and the most neglected. After the product vision phase, teams split across feature areas and worked in parallel.",
    },
    {
      label: 'Also ran',
      content:
        'Led workshops throughout the project, including a Buy a Feature session at an industry conference with dozens of active agents.',
    },
  ],
  userContext: {
    paragraphs: [
      "Veterans had been typing command strings for years. Their speed was real — they could outrun any graphical interface and they knew it. Slow them down and they'd reject the tool, loudly, and with justification.",
      "Seasonal hires arrived with no industry background, learning under pressure during peak booking periods. The command line was a foreign language with no dictionary.",
      'One tool, two users with opposite needs. That was the design problem.',
    ],
  },
  process: [
    {
      phase: 'Field',
      title: 'Watch agents work, not just ask',
      body: "Weeks of stakeholder interviews and field observation — time at agents' desks watching them work. Built concept videos to align direction before anyone invested in detailed design.",
      artifact: 'Field observation · Concept videos',
    },
    {
      phase: 'Research',
      title: "Hotel: data that existed but wasn't surfaced",
      body: "Watched agents leave the tool mid-call to look up photos and amenities on Expedia. Dug into XML data structures to find what the system held but wasn't surfacing. A lot.",
      artifact: 'Usage analytics · XML data audit',
    },
    {
      phase: 'Validate',
      title: 'Buy a Feature to force tradeoffs',
      body: "Ran a Buy a Feature workshop at an industry conference. Agents spent a fictional budget to rank features — forces tradeoffs that interviews don't, gives you a defensible hierarchy for scope conversations.",
      artifact: 'Buy a Feature · Scope prioritization',
    },
  ],
  keyDecision: {
    heading: 'Hybrid, not migration',
    paragraphs: [
      "Some stakeholders wanted a full graphical redesign — deprecate the command line, move everyone over. The research said no. Veterans weren't giving up the keyboard, and their resistance would be valid.",
      "We built a hybrid: an updated command interface for veterans, a fully graphical mode for everyone else. Move between them freely. Neither treated as the backup option. For Hotel specifically, the call was simpler — use the mental model agents already knew from Expedia and Hotels.com, then bring everything they'd been tab-switching to find inside the tool.",
    ],
    artifactLabel: 'Hybrid command + graphical UI',
  },
  whatWasHard: {
    paragraphs: [
      "Every time we made the graphical interface more discoverable, we risked slowing down a veteran who'd already internalized the keyboard path. We tested constantly with both user types and there was no clean resolution — just ongoing calibration between two legitimate sets of needs.",
      "Hotel was also the most technically constrained feature area. Getting to what was actually buildable meant reading XML schemas and working closely with engineering before design could move. That wasn't in the original scope of what I thought I was signing up for. It was necessary.",
    ],
  },
  outcomes: [
    {
      value: '$1B',
      label: 'Flightcentre contract won',
      body: 'Competitive bid against multiple platform vendors.',
    },
    {
      value: '+23%',
      label: 'Revenue lift post-rollout',
      body: 'Flightcentre revenue growth after platform transition.',
    },
    {
      value: '6 mo. early',
      label: 'Rollout vs. 2-year timeline',
      body: 'Zero productivity loss during transition.',
    },
    {
      value: '+$800M',
      label: 'TTV year one',
      body: '8.7% increase in Total Transaction Volume across flights, hotels, and cars.',
    },
  ],
  whatIdDoDifferently: {
    paragraphs: [
      "Watching agents tab out to Expedia mid-call was the most clarifying moment in the Hotel research. It told us more about the gaps in the tool than months of interviews had. I'd push for that kind of in-context observation earlier — across every feature area, not just the one I owned.",
      "The product vision video aligned stakeholders fast. It also locked us into a direction before the feature-level research was complete. I'd want more explicit checkpoints between the vision phase and parallel development.",
    ],
  },
  chatSuggestions: [
    'How did the hybrid approach work?',
    'What was the Hotel key decision?',
    'How did you handle the contract deadline?',
  ],
};
