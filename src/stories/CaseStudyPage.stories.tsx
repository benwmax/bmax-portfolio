import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { CaseStudyPage } from '../pages/CaseStudyPage';
// Real production content, not a story-local copy. These used to be inline
// duplicates of src/content/*.ts, which is how the story and the live page
// drifted apart — Storybook is published as a portfolio artifact, so it
// showing different copy than the site is a visible defect, not just debt.
import { usaaData } from '../content/usaa';
import { portfolioRebuildData } from '../content/portfolio-rebuild';

const meta = {
  title: 'Pages/Case Study',
  component: CaseStudyPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full case-study page template — 8 labeled sections, sticky sidebar TOC, ' +
          'scroll progress bar, artifact inset, outcome stat grid, and docked chat panel. ' +
          'Props are data-driven: pass any CaseStudyContent object to fill the template. ' +
          'The sidebar tracks scroll position; the chat panel is always docked on the right ' +
          'and hides below 1100px viewport width.',
      },
    },
    ai: {
      guidance:
        'The canonical case study page template. Always use this template — never build a case study page from scratch. Pass a CaseStudyContent object for each case study.',
      contentRules: [
        'CaseStudyContent has a strict 8-section schema: problem, role, userContext, process, keyDecision, whatWasHard, outcomes, whatIdDoDifferently.',
        'The 8 sections are mandatory and in that order — the sidebar TOC is generated from them.',
        'All 8 sections must be populated. Do not skip sections.',
        'heroTitle must be a problem statement: "Modernizing X without Y", "Making X learnable for Y". Never use it as a project description.',
        'heroSubtitle is 2–4 sentences that set up the problem context.',
        'meta array: role and method cells are plain values; outcome cells use accent: true for hard numbers only.',
      ],
      avoid: [
        'Never build a case study page layout from scratch — always use this template.',
        "Don't change the 8-section order.",
        "Don't use accent: true for role, method, or non-numeric meta values.",
        "Don't write heroTitle as a project description — it must be a problem statement.",
      ],
    },
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['sidebar', 'linear'],
      description: 'Sidebar table of contents or linear single-column read.',
    },
    showChat: {
      control: 'boolean',
      description: 'Show or hide the docked chat panel.',
    },
  },
} satisfies Meta<typeof CaseStudyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------
   Reference content
   USAA is the reference case study for the template; Portfolio
   Rebuild exercises the `figures` array (captioned slots that render
   the placeholder frame until real screenshots are added).
--------------------------------------------------------------- */
const USAA = usaaData;
const PORTFOLIO_REBUILD = portfolioRebuildData;

/* ─────────────────────────────────────────────────────────────
   STORIES
───────────────────────────────────────────────────────────── */

export const Default: Story = {
  name: 'USAA — Sidebar + Chat',
  parameters: {
    docs: {
      description: {
        story:
          'The canonical case study layout: sidebar TOC, 8 content sections, docked chat panel. ' +
          'USAA is the reference implementation — all other case studies follow this structure.',
      },
    },
    ai: {
      guidance:
        'The canonical case study page: sidebar TOC, 8 content sections, docked chat panel, scroll progress bar. Pass a CaseStudyContent object — never build the layout from primitives.',
      contentRules: [
        'chatSuggestions: 2–3 conversation starters relevant to this case study.',
        'nextCase: { title, href } links to the next case study in order.',
      ],
    },
  },
  args: {
    ...USAA,
    layout: 'sidebar',
    showChat: true,
    onChatSubmit: fn(),
  },
};

export const PortfolioRebuild: Story = {
  name: 'Portfolio Rebuild — with figures',
  parameters: {
    docs: {
      description: {
        story:
          'The lead case study, and the only one using the `figures` array rather than ' +
          'keyDecision.artifactLabel. Figures are anchored per section and numbered in array ' +
          'order, so captions read Fig. 01–03 down the page regardless of which section each ' +
          'belongs to. All three render the dot-grid placeholder here because no `src` is set ' +
          'yet — that is the intended pre-screenshot state, not a broken image.',
      },
    },
    ai: {
      guidance:
        'Use `figures` for new case studies, not keyDecision.artifactLabel. Give each figure a section, a tabLabel, and a caption; add src + alt once a real screenshot exists. Never set both mechanisms on one page — each numbers its figures from 01.',
      contentRules: [
        'figures[].section is one of: problem, context, process, decision, hard. Role and Outcomes are excluded — they are already visual.',
        'caption omits the "Fig. 0N — " prefix; numbering is generated from array order.',
        'src and alt must be provided together — alt is required whenever src is set (WCAG 1.1.1).',
      ],
      avoid: [
        'Don\'t write a caption that starts with "Fig." — it will be doubled.',
        "Don't set keyDecision.artifactLabel on a page that uses figures.",
      ],
    },
  },
  args: {
    ...PORTFOLIO_REBUILD,
    layout: 'sidebar',
    showChat: true,
    onChatSubmit: fn(),
  },
};

export const Linear: Story = {
  name: 'USAA — Linear (no sidebar)',
  args: {
    ...USAA,
    layout: 'linear',
    showChat: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Linear layout with no sidebar TOC and no chat panel — fallback for smaller viewports or when sidebar is not wanted.',
      },
    },
    ai: {
      guidance:
        'Fallback layout for narrower viewports or when sidebar is not needed. Use layout="linear" and showChat={false}.',
      avoid: [
        "Don't use linear as the default — sidebar + chat is the intended production experience.",
        "Don't omit sections just because the layout is linear — all 8 sections are still required.",
      ],
    },
  },
};

export const WithConversation: Story = {
  name: 'USAA — Conversation started',
  args: {
    ...USAA,
    layout: 'sidebar',
    showChat: true,
    onChatSubmit: fn(),
    initialMessages: [
      { role: 'user', text: 'Why two parallel tracks?' },
      {
        role: 'assistant',
        text: "Conversion was bleeding now — we couldn't wait 18 months for the new platform. The two-track approach let us apply research insights immediately to production A/B tests, so the business saw measurable results throughout instead of at the end.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Docked panel with an in-progress conversation pre-seeded.',
      },
    },
    ai: {
      guidance:
        'Case study page with the docked chat panel pre-populated. Use initialMessages to seed the conversation for demonstration or testing.',
      contentRules: [
        'Pass initialMessages as [{ role: "user", text: "..." }, { role: "assistant", text: "..." }].',
        'chatSuggestions on the case study become the initial prompt chips.',
      ],
    },
  },
};

export const ContactCardVisible: Story = {
  name: 'USAA — Contact card visible',
  args: {
    ...USAA,
    layout: 'sidebar',
    showChat: true,
    onChatSubmit: fn(),
    initialMessages: [
      { role: 'user', text: 'Why two parallel tracks?' },
      {
        role: 'assistant',
        text: "Conversion was bleeding now — we couldn't wait 18 months for the new platform. The two-track approach let us apply research insights immediately to production A/B tests, so the business saw measurable results throughout instead of at the end.",
      },
    ],
    forceShowContactCard: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the inline ContactCard composed into the docked chat rail. In production this ' +
          "only appears once detectContactIntent matches a real message or reply — there's no " +
          'prop to trigger that from outside a live exchange, so this story sets a Storybook-only ' +
          'forceShowContactCard flag instead of seeding a fake trigger phrase. See ' +
          "Components/ContactCard for the component's own full state matrix.",
      },
    },
    ai: {
      guidance:
        "Reference for how ContactCard sits inside the docked chat rail — forceShowContactCard is Storybook-only, never wire it to application state. Consult Components/ContactCard for the component's own states.",
      avoid: [
        'forceShowContactCard is Storybook-only — never use it in application code. showContactCard from useChat() is the real production signal.',
      ],
    },
  },
};

export const Futuristic: Story = {
  name: 'USAA — Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'The canonical case study layout under the Futuristic theme — light surfaces, azure ' +
          'sidebar states and stats, gold tags, Space Grotesk headings. Token-driven; the chat ' +
          'message cursor becomes a pulsing dot via a scoped CSS override.',
      },
    },
    ai: {
      guidance:
        'Case study page under the futuristic theme — token-driven. Same structure rules as the retro stories.',
    },
  },
  args: {
    ...USAA,
    layout: 'sidebar',
    showChat: true,
    onChatSubmit: fn(),
  },
};
