# Real-Device QA: iPhone + Mac Safari

**About 25 minutes. No cable, no setup on the phone.** Note what breaks; don't fix anything
as you go.

**Test on:** `https://bmax-portfolio.vercel.app` (switch to `https://viewbens.work` after the
domain cutover). Not local dev, and not a branch preview link — those are behind a Vercel
login and can't use the chat.

**Why this exists:** the automated sweep (2026-07-16) ran WebKit through Playwright, which
isn't real Safari — no real touch, keyboard, notch, or iMessage. This is the pass that only a
person with a phone can do. Claude has no device access.

---

## On the Mac — desktop Safari (5–10 min)

Console errors show up the same way here as on the iPhone (same WebKit engine, same security
policy), so the console checks live on the Mac.

**Setup:** Safari → Settings → Advanced → turn on **Show Develop menu**. Then
**Develop → Show JavaScript Console** and leave it open.

- [ ] **Every page looks right and the console has no red errors.** Ignore errors that
      mention `vercel.live` — that's Vercel's own toolbar.
  - [ ] Home `/`
  - [ ] Portfolio Rebuild `/work/portfolio`
  - [ ] Upfluent `/work/upfluent`
  - [ ] USAA `/work/usaa`
  - [ ] Sabre `/work/sabre`
  - [ ] About `/about`
  - [ ] Resume `/resume`
  - [ ] Contact `/contact`
  - [ ] Any made-up URL, e.g. `/nope` → shows the 404 page
  - [ ] `/work/sagent` → also shows the 404 page (Sagent is unlisted)
- [ ] **Theme sticks.** Switch to Futuristic in the nav, reload. It stays Futuristic, with no
      flash of the dark theme first.

---

## On the iPhone — Safari (about 15 min)

- [ ] **1. Pages.** Scroll through every page from the Mac list. Nothing runs off the side,
      fonts and the dark theme look right, links work.
- [ ] **2. Chat handoff.** On the homepage, type a question into the chat in the hero and
      send it. It should open full-screen, with the reply streaming in there (text arriving
      in pieces, split into short paragraphs). Close it and open a case study: an
      **"Ask about Ben"** button should be there, and tapping it shows the same conversation.
- [ ] **3. Typing.** Tapping into any chat field doesn't zoom the page. In the full-screen
      chat, nothing is hidden under the notch at the top or the home bar at the bottom.
- [ ] **4. Contact form.** In the full-screen chat, ask *"How can I get in touch with Ben?"*
      A **SEND BEN A MESSAGE** form appears after the reply. Tapping its fields doesn't zoom,
      and the keyboard doesn't cover the field you're typing in. Type something, then ask one
      more question without sending: the new question appears **below** the form, and what
      you typed is still there. *(Sending it is optional — it emails ben@viewbens.work for
      real.)*
- [ ] **5. Rotation.** With the full-screen chat open, rotate to landscape and back. The
      layout still works and you can keep typing.
- [ ] **6. Link preview.** In iMessage, text yourself
      `bmax-portfolio.vercel.app/work/sabre`. The preview says **"Sabre — Ben Maxwell"**,
      not the homepage title. *(No preview image until the domain cutover — that's
      expected.)*

---

## Reporting back

Tell Claude which boxes passed and which didn't. For each failure: the page, the device,
what you saw, and a screenshot if you can.

- **All clear:** Claude checks off "Mobile device testing" in `build-plan.md` and logs it in
  `process-journal.md`.
- **Something failed:** Claude scopes the fix, and you re-test just that item.

*History: written 2026-07-20 as a longer runbook that mirrored the iPhone's console to the
Mac over a cable. Simplified 2026-10-08 (Ben's call) to a phone-only pass, with console
checks moved to desktop Safari. Dropped as low-risk: the private-browsing theme check and
repeating the phone checks on the Mac. Known gap: a JavaScript error that only happens on
iOS wouldn't appear on the Mac console, but would still be noticed if it visibly broke
something on the phone.*
