# Chat case study widgets — UX and visual design review (2026-10-29)

Scope: the widgets a visitor sees in a project tour (cover, key-decision sketch,
outcomes) and the full step-through case study. Reviewed in both themes at a
~700px pane and against the `/work/usaa` tour. The reader in mind is a hiring
manager or recruiter skimming, not a designer studying.

## What works
- The tour order is right: who and what (cover) → the one decision (sketch) →
  the result (outcomes). It mirrors the case study structure without its length.
- Body copy contrast is strong: 5.7–14.7:1 in every case.
- The sketches now support the sentence above them instead of competing with it.

## Findings

**Readability**
1. **Meaning carried by 10–11px caps.** Widget title bars, cover meta, stat labels,
   step numbers, axis labels and the walkthrough kicker are all 10–11px uppercase
   mono with wide tracking. All caps at that size is the slowest text on the page
   to read, and it labels the things a skimmer needs most (what each number means).
2. **Stat labels are harder to read than the stats' fine print.** "CONVERSION LIFT · P&C"
   is 11px caps, while the line under it ("Homeowners up 5%") is 14px sentence case.
   The hierarchy is upside down.

**Cognitive load**
3. **Repeated chrome.** In one tour, each project's name and years appear three or
   four times: the cover, then "USAA · The idea", then "USAA · Outcomes" with
   "Insurance · 2017–2021" again in its bar. Every repeat is something to read and
   then discard.
4. **Four outcomes, two of them soft.** Tours show every outcome, including ones that
   aren't numbers ("↓ Calls", "Scaled", "Picked up", "Early AI"). Next to "+4–6%"
   they dilute the strong results. A skimmer remembers two or three numbers, not four.
5. **The cover leaves out the role.** It shows industry, years and headline, but not
   what Ben did, which is the first thing a hiring manager looks for. The role only
   turns up later, in prose.
6. **The walkthrough has eight steps, and its tab row clips.** "What was hard" is cut
   off at the right edge, and the later steps are hidden behind a horizontal scroll
   that isn't obviously scrollable. Eight steps is also more than this audience will
   step through. "Users" and "Problem" are one idea, and "Next time" is a coda to
   the results.
7. **Double-labelled walkthrough.** The chat says "In his words, one section at a time",
   then the card repeats "In Ben's words", above a numbered tab strip plus an "01 / 08"
   counter. That's three progress and attribution cues saying the same thing.

**Contrast (WCAG AA, 4.5:1 for text under 18px)**
8. **Fails in Retro:** the metadata on the right of each widget's title bar is 4.43:1
   at 11px.
9. **Marginal:** inactive walkthrough tabs, the step counter, the sketch axis and the
   stat body are 4.84:1 in Retro. They pass, but at 11–14px they read as disabled.
   In Futuristic, everything measured is 5.0:1 or better.

## Plan
1. **Type floor:** meaningful labels go to 13px minimum. Stat labels and the highlight
   list's stat labels become sentence case at 14px, in the secondary text color. Caps
   stay only for short, decorative chrome. *(1, 2)*
2. **Contrast:** title-bar metadata, the step counter, inactive tabs and the sketch axis
   move from the tertiary to the secondary text color. *(8, 9)*
3. **Less repetition:** after the cover, a tour's widgets drop the duplicate metadata.
   The outcomes bar no longer repeats industry and years, and its label reads
   "Results". *(3)*
4. **Lead with the hard numbers:** tours show up to three outcomes whose values contain
   a number. The full case study still shows all of them. *(4)*
5. **Role on the cover:** add a fact row with Ben's role, years and industry, from each
   project's own `meta`. *(5)*
6. **Shorter walkthrough:** merge eight steps into six: The problem (problem + users),
   My role, Process, Key decision, What was hard, Results (outcomes + "Next time").
   Tabs wrap instead of scrolling, so every step is visible. Drop the per-tab numbers
   and the duplicate kicker, and say "Step 2 of 6" once. *(6, 7)*
