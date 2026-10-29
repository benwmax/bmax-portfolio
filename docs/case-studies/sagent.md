# Sagent — case study (Phase 1C)

*Published 2026-10-29 as `src/content/sagent.ts`. This file is a readable copy of the draft;
the TypeScript file is the source of truth. Text-only: the work is under NDA, no images.*

**Ten designers, fourteen teams, and no design leader for nine months.**
I led the team through the gap, then used AI to ship a workflow builder in two days.

**Problem.** Dara is a suite of mortgage servicing products. When I joined as Principal, ten
designers supported fourteen business teams across three products. A month later our design
leader left, and the other principals followed. The company didn't backfill for almost nine months.

**Role.** Owned: the team's ways of working, principles, and processes; two designers on
Defaults; the Attorney Portal and its design system; the first Workflow UI. Shared: co-led with a
designer promoted from within; vetted and interviewed designers; helped plan headcount. Not
mine: hiring decisions and the manager title; I advised on Roots DS but didn't design it. AI:
taught the team AI tooling; built tools for product partners' PRDs.

**User context.** Defaults manages mortgages in default. Workflow, a Dara Core feature,
coordinates tasks and guides users through them. Attorneys' old tool covered several job roles
and was complex; they needed one focused tool.

**Process.** Defaults: hundreds of UI enhancements and net-new features in under a year with two
designers. Attorney Portal: built the Figma library from scratch, designed mobile-up in under
four months around legacy systems; a few dozen attorneys interviewed, a few dozen beta users.
Workflow: designed the first builder UI, which degraded as capabilities grew.

**Key decision.** Build the real thing instead of waiting for capacity. The AI-built node-diagram
prototype was estimated at 3+ sprints (not on our stack) and shelved; I then used AI to build a
working builder on real components and APIs, and developers finished it in two days.

**What was hard.** The team shrank 10 → 8 → 6 while 14 teams still needed us; with product I drew
a line between work needing designed screens and work assembled from Roots components. AI also
didn't finish the builder: developers fixed API/data connections and added validations I'd
missed; I wrote a "how it was built" doc for their AI tooling.

**Outcomes.** Workflow builder live in 2 days (3+ sprints estimated) plus a few days of QA, in
use. Attorney Portal designed in under four months, praised for focus and usability; its library
migrates onto Roots over time. Hundreds of Defaults enhancements. 10 → 6 designers, same 14 teams.

**What I'd do differently.** Omitted — Ben had nothing to add.
