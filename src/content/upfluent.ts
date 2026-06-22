import type { CaseStudyContent } from '../pages/CaseStudyPage';

export const upfluentData: CaseStudyContent = {
  number: '02',
  dateRange: '2023–24',
  company: 'Upfluent',
  heroTitle: "Retail traders needed expert tools without an expert's learning curve.",
  heroSubtitle:
    "Upfluent was building a trading platform and advisor marketplace from scratch — mobile-first, AI-native, for users who wanted to trade options like professionals without spending years learning to think like one.",
  meta: [
    { label: 'My role', value: 'Lead UX Designer' },
    { label: 'Method', value: 'Card sort · Tree test · AI prototype' },
    { label: 'Signup', value: '−30%+ steps', accent: true },
    { label: 'Delivery', value: '12 months', accent: true },
  ],
  problem: {
    heading: 'Two bad choices for retail traders',
    paragraphs: [
      "Retail options traders were stuck: learn a dense professional toolset built for power users, or trade at a disadvantage without it. No platform was closing that gap from the ground up.",
      "Upfluent set out to build one — a trading platform and educator marketplace designed to meet traders at their level and grow with them, without dumbing down the tools serious traders actually need.",
    ],
  },
  role: [
    {
      label: 'Owned',
      content:
        "Led the AI chatbot design effort end to end. Owned the major platform experiences individually: signup, account management, and core modules including Risk Analysis — a visual approach to showing how options spreads shift with adjustments to time horizons and downside risk.",
    },
    {
      label: 'Team effort',
      content:
        'Brand and visual system were a team effort I contributed to and helped converge. Three designers total.',
    },
  ],
  userContext: {
    paragraphs: [
      "Our users were retail traders who wanted to trade options like professionals but didn't have the time or background to learn a Bloomberg-style interface.",
      "They needed a platform that could meet them at their level of experience and grow with them — without removing the depth that serious traders actually depend on.",
    ],
  },
  process: [
    {
      phase: 'Research',
      title: 'Competitive intelligence',
      body: 'Mapped where the market was crowded and where we could differentiate — established the strategic gaps before any design work started.',
      artifact: 'Competitive analysis',
    },
    {
      phase: 'Test',
      title: 'Card sort + tree test for signup',
      body: 'Settled the navigation hierarchy with structured testing, cutting the registration flow by over 30% compared to competitors before a single screen was designed.',
      artifact: 'Card sort · Tree test',
    },
    {
      phase: 'Prototype',
      title: 'Working AI chatbot',
      body: "Built a working prototype using early ChatGPT models — before function calling, before any of the tooling that makes this easy now. Contributed both code and design to work around the structured output problem.",
      artifact: 'AI prototype · Engineering collaboration',
    },
  ],
  keyDecision: {
    heading: 'Hybrid: conversational AI with structured controls inline',
    paragraphs: [
      "The chatbot could have gone two ways: pure conversational interface, or a structured menu system with AI polish. I pushed for a hybrid — the bot handles free-flowing conversation, but when a user wants to act on something, it surfaces structured controls inline.",
      "The user gets the flexibility of talking to an advisor and the precision of a real interface, without choosing between them. Early models made this harder than it sounds — getting reliable structured output from a model that wasn't built for it was its own design problem.",
    ],
    artifactLabel: 'Hybrid NLP + structured UI',
  },
  whatWasHard: {
    paragraphs: [
      "Stakeholders wanted a full-featured desktop trading platform on par with ThinkorSwim, and they wanted that same depth on mobile. Options trading is genuinely complex — multi-leg spreads, Greeks, risk visualizations — and most of that complexity doesn't translate to a phone screen without breaking.",
      'I spent a lot of time in hard conversations about what to cut, what to simplify, and what just couldn\'t live on mobile the same way.',
    ],
  },
  outcomes: [
    {
      value: '−30%+',
      label: 'Signup steps vs. competitors',
      body: 'Validated through card sort and tree testing.',
    },
    {
      value: 'Picked up',
      label: 'Chatbot by engineering',
      body: 'Prototype proved the hybrid concept — engineering built from it.',
    },
    {
      value: '12 mo.',
      label: 'Full platform delivery',
      body: 'Designs, research, brand, and chatbot concepts — all from scratch.',
    },
    {
      value: 'Early AI',
      label: 'Pre-function-calling work',
      body: "Hands-on AI product work before the tooling existed to make it easy.",
    },
  ],
  whatIdDoDifferently: {
    paragraphs: [
      "Push harder, earlier, for a way to test the chatbot with real traders — even a closed beta — instead of relying on internal prototype reviews. The hybrid concept was the right call, but I never got to see how it held up against someone actually trying to manage a live position under pressure.",
    ],
  },
  chatSuggestions: [
    'How did the hybrid chatbot work?',
    'What was the structured output problem?',
    'How did you validate the signup flow?',
  ],
  nextCase: { title: 'Sagent', href: '/work/sagent' },
};
