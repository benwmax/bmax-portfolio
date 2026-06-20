# Process Journal

Running log for the build process and follow-on case study work.

## 2026-06-01

### Initialized documentation structure
- Created the case study documentation scaffold under `docs/case-study/`.
- Added starter files for process notes, insights, decisions, and AI prompt tracking.
- Added a placeholder file so the `screenshots/` directory is tracked in git.

### Next entries to add
- Major implementation milestones
- Problems encountered and how they were resolved
- Screenshots captured at meaningful turning points

## 2026-06-09
**What I did:**
Rewrote the USAA case study using two parallel methods to stress-test
which produces better output.

**What I decided:**
Version B (interview-first) is the stronger approach for case study
drafting. Selected it as the base. No items from Version A folded in.

**Why:**
Version A was a direct rewrite from source material — complete and
structured, but reading like a project summary. Version B was built
from targeted interview questions and had more voice, more story, and
a clearer point of view. The stakeholder pivot section was the clearest
differentiator — it read like something that happened to a person, not
a line in a debrief.

**What I'm uncertain about:**
Question 7 (what outlasted the project that doesn't show up in metrics)
was skipped. That section is currently the weakest part of the draft.

**What Claude contributed:**
Wrote both versions. Flagged the length problem in Version A before
being asked. Identified the structural differences between drafts and
made a direction recommendation with reasoning.

**Where I overrode or redirected Claude:**
Rejected the recommendation to fold Version A items into Version B.
Kept B clean.
## 2026-06-20
**What I did:**
Created three homepage explorations on a `homepage-explorations` branch,
each progressively more futuristic and dynamic, all built on the locked
phosphor-terminal design system (no new tokens — only CSS extensions).
Added a new "Explorations" section to Storybook to review them side by side.

**What I decided:**
Build three distinct directions rather than iterate one, so the contrast is
legible: 01 · Signal (current homepage with the dynamism turned up —
cursor spotlight, self-typing headline, count-up stats, hover shine);
02 · Boot (machine boot sequence, CRT scanlines, live telemetry, glyph-decode
case records); 03 · Phosphor (animated synthwave-grid canvas, kinetic hero,
3D-tilt holographic cards, magnetic CTA). All three reuse the production
NavBar, ChatInput, and useChatSession so the assistant behaves identically.

**Why:**
The brief was to wow on entry while staying recognizably "us." Three points
on a spectrum make the risk/reward of each easy to feel before committing.

**What I'm uncertain about:**
Which direction to actually ship — Signal is safest, Phosphor is the boldest
and may be heavier than the rest of the site warrants. Open for Ben's call.

**What Claude contributed:**
Built all three variants end to end: shared data/hooks modules, the canvas
animation, the components and CSS, and the Storybook stories. Gated every
effect on prefers-reduced-motion so motion resolves to a static, legible state.

**Where I overrode or redirected Claude:**
(Pending Ben's review of the three directions.)

## 2026-06-20
**What I did:**
Built the AI component guidance system: added `parameters.ai` blocks to every
Storybook story (guidance, contentRules, avoid fields), created
`docs/ai-component-guide.md` as an authoritative 783-line component reference
with a decision tree, prop cheat sheets, composition patterns, and out-of-scope
list. Also added Contact.stories.tsx and Storybook exploration stories for all
three homepage variants (Signal, Boot, Phosphor) so they can be compared in
the Explorations section.

**What I decided:**
The parameters.ai blocks embedded in stories are the right place for AI
guidance — they travel with the component so future sessions can't miss them.
The ai-component-guide.md is the macro view: decision tree first, then
inventory, then what's out of scope.

**Why:**
Each new Claude session was starting cold on which components exist, which were
cut, and what the token rules are. Two places to look (CLAUDE.md at the macro
level, parameters.ai at the component level) cover both the before-you-build
question and the while-you're-building question.

**What I'm uncertain about:**
Whether the parameters.ai system and the MDX docs (coming next) are
complementary or redundant — the answer will depend on how future sessions
actually navigate Storybook vs. reading source files.

**What Claude contributed:**
Authored the full ai-component-guide.md, extracted rules and do's/don'ts from
existing decisions and CLAUDE.md, wrote all parameters.ai blocks, and created
the Contact and exploration stories.

**Where I overrode or redirected Claude:**
N/A — structural documentation pass, no design decisions required.

## 2026-06-20
**What I did:**
Created 12 MDX documentation pages for all components in Storybook: Button,
CaseStudyCard, CaseStudyHero, ChatInput, ImageCaption, Input, NavBar,
ProcessStep, RoleCallout, StatBlock, StatusIndicator, Tag. Each page includes
a prose description, embedded Canvas preview, do's/don'ts pulled from
parameters.ai, and an ArgTypes prop table.

**What I decided:**
Storybook as a public portfolio artifact needs to read as documentation, not
just a sandbox. MDX pages are the right format — they surface prose and
structure at the Docs tab level, which is the first thing a non-developer sees.

**Why:**
The Storybook component inventory is part of the portfolio pitch. A hiring
manager or design director landing on it should immediately understand what
each component is for, how it's used, and what the design constraints are —
without reading source code.

**What I'm uncertain about:**
None — straightforward documentation pass.

**What Claude contributed:**
Wrote all 12 MDX pages, extracted do's/don'ts from existing parameters.ai
guidance, structured the prop tables from existing story args.

**Where I overrode or redirected Claude:**
N/A.
