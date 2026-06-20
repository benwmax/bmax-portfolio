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
