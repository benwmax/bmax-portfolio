# Mobile / Real-Device Safari QA Runbook

**Purpose:** the automated cross-browser sweep (2026-07-16) covered Chromium, Firefox, and
WebKit via Playwright — but WebKit-the-engine isn't Safari-the-browser: no extensions, no
iOS quirks, no real touch input, no real device. This runbook is the manual pass that
closes that gap. See `CLAUDE.md` → "Immediate next steps" for the full rationale and
`build-plan.md`'s "Mobile device testing" item for how this fits into Phase 5.

**Who runs this:** Ben, by hand, on real devices. Claude has no physical device access, so
this can't be delegated the way `docs/testing/hardening-verification.md` was — that one had
Claude drive a terminal; this one needs eyes and fingers on an actual iPhone and Mac.

**Devices:**
- A real iPhone, Safari (primary target — likely the largest single mobile segment for this
  audience)
- A real Mac, desktop Safari
- Android/Chrome on a real device is lower priority — Chromium via Playwright already
  proxies it reasonably well, unlike WebKit-vs-Safari

**Target URL:** `https://bmax-portfolio.vercel.app` — **not** local dev (`npm run dev`) and
not `viewbens.work` (still the old site). The chat widget's origin allowlist, the enforced
CSP, and Vercel's real headers only exist on a real deployment, and this is currently the
only public one. (This is the temporary origin — see the `TEMPORARY` comment in
`api/chat.ts` and `decisions.md` 2026-07-19.)

---

## Setup: viewing the iPhone's console from your Mac

Several checks below need to see JavaScript console output on the iPhone, which isn't
visible on the device itself. Set this up once:

1. On iPhone: **Settings → Safari → Advanced → Web Inspector** → toggle on.
2. Connect the iPhone to the Mac with a cable (or same Wi-Fi network if wireless debugging
   is enabled on both).
3. On Mac Safari: if you don't see a **Develop** menu, enable it first —
   **Safari → Settings → Advanced → check "Show Develop menu in menu bar."**
4. With the site open on the iPhone, go to **Develop → [your iPhone's name] → the open
   tab** on the Mac. This opens a Web Inspector window mirroring the iPhone's console,
   network, and DOM — use this for every "check the console" step below.

---

## Part A — Quick sanity sweep (all 9 pages, both devices)

Load each page on the iPhone and on desktop Safari. For each, check the box only if **all**
of the following hold: page loads (no blank screen / error), dark theme background renders
correctly, no horizontal scrollbar/overflow, fonts render (not obvious fallback/system
font), nav links work, console is clean (see Setup above for the iPhone).

| Page | URL | iPhone Safari | Desktop Safari |
|---|---|---|---|
| Home | `/` | ☐ | ☐ |
| Portfolio Rebuild | `/work/portfolio` | ☐ | ☐ |
| Upfluent | `/work/upfluent` | ☐ | ☐ |
| Sagent | `/work/sagent` | ☐ | ☐ |
| USAA | `/work/usaa` | ☐ | ☐ |
| Sabre | `/work/sabre` | ☐ | ☐ |
| About | `/about` | ☐ | ☐ |
| Resume | `/resume` | ☐ | ☐ |
| Contact | `/contact` | ☐ | ☐ |
| 404 (bonus) | `/anything-fake` | ☐ | ☐ |

If any box fails, note the page, device, and what went wrong before moving on — don't try
to debug live, just log it (see "Reporting results" at the bottom).

---

## Part B — Focused risk areas (iPhone Safari, unless noted)

These are the specific things likely to break on real Safari that the automated sweep
can't catch. Go through each one deliberately, not as part of the general click-through
above.

### B1. Mobile chat FAB/overlay handoff
*(`src/components/MobileChatSurface.tsx` — the highest-risk area; this exact bug class was
already found once, 2026-07-19)*

1. Open `/` on the iPhone. Scroll to the inline chat container in the hero and type a
   message, then submit.
   - **Expect:** it hands off to a full-screen chat overlay, and the reply streams in
     there — visible and interactive.
   - **Fail:** the reply appears in the (now-inert) inline container instead, or nothing
     visibly happens.
2. Close the overlay, navigate to a case study (e.g. `/work/sabre`) via the nav or a work
   grid card.
   - **Expect:** an "Ask Ben" floating button (FAB) is visible.
3. Tap the FAB.
   - **Expect:** the overlay opens showing your prior conversation, still intact.
4. Navigate back to Home.
   - **Expect:** the FAB is still visible (it should persist once revealed), and reopening
     it shows the same conversation.

### B2. iOS auto-zoom on chat input focus

1. Tap into the chat input — try this in at least two places: the Home inline hero and the
   full-screen overlay.
   - **Expect:** no automatic viewport zoom when the keyboard appears.
   - **Fail:** the page zooms in on tap (this was previously fixed via a 16px minimum
     font-size on inputs — see `decisions.md` — so a regression here means that font-size
     rule broke somewhere).

### B3. Theme toggle persistence (both devices)

1. Toggle to **Futuristic** via the NavBar control.
2. Reload the page.
   - **Expect:** stays Futuristic, no flash of the Retro theme before it applies.
3. Open a **Private Browsing** window and repeat.
   - **Expect:** no crash or visual glitch within that session. It's fine (expected) if the
     preference doesn't survive closing the private window — Safari's ITP partitions/limits
     storage there by design.

### B4. Enforced CSP — zero console violations

Using the Web Inspector setup from above, load each of the 9 pages from Part A and watch
the console.
- **Expect:** no red errors mentioning "Content Security Policy," "Refused to...," or
  "violates the following Content Security Policy directive."
- **Fail:** note the exact page and the exact directive/resource named in the violation —
  this would mean something (a script, a style, a font, an image) isn't covered by
  `vercel.json`'s CSP and needs a source added.

### B5. Chat response streaming

1. Ask a real question and watch the reply render.
   - **Expect:** text streams in progressively — visible chunks arriving over time, not one
     delayed dump. Paragraph breaks render as separate blocks, not one dense wall of text.
   - **Fail:** reply appears all at once after a long pause, or renders as a single unbroken
     paragraph regardless of length.

### B6. Safe-area insets on the full-screen chat overlay

1. Open the full-screen chat overlay on the iPhone (needs a notch/Dynamic Island model, or
   any iPhone with the home-indicator bar — most current models qualify).
   - **Expect:** the header, close button, and chat input all sit clear of the
     notch/Dynamic Island at top and the home-indicator bar at bottom, with sensible
     padding — nothing obscured or cramped against those areas.
   - **Fail:** text or the input field is cut off or sits underneath the safe area.

### B7. Orientation change

1. With the chat overlay open, rotate the iPhone to landscape, then back to portrait.
2. Repeat on the Home page generally (not just the overlay).
   - **Expect:** layout reflows cleanly each time, no horizontal scroll, no overlapping
     elements, chat stays usable throughout.

---

## Reporting results

When done, come back and tell Claude what you found — pass/fail per section (A and B1–B7)
is enough, plus specifics for anything that failed (page, device, what you saw, ideally a
screenshot). From there:
- If everything passed: check off "Mobile device testing" in `build-plan.md`, and Claude
  will log a `process-journal.md` entry.
- If something failed: Claude will scope the fix the same way this pass itself was scoped,
  and the checkbox stays unchecked until it's resolved and re-verified.

Either outcome is useful case study material — a clean real-device pass is a data point
too, not just the bugs.
