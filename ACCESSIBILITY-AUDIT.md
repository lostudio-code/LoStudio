# Accessibility Audit — Lo Studio Website

**Scope:** `index.html`, `work/project.html`, shared CSS/JS in `assets/`.
**Standard:** WCAG 2.1 AA.
**Date:** June 18, 2026

---

## Summary

The site does several things right — `prefers-reduced-motion` is widely respected in JS, the carousel and menu controls have `aria-label`s, decorative SVGs are `aria-hidden`, and form fields have real labels. The main gaps are **keyboard focus visibility, missing landmarks/skip link, low-contrast text, and interactive widgets (FAQ, mobile menu, carousel) that don't expose state to assistive tech.**

| Area | Severity | Status |
|------|----------|--------|
| Visible focus indicators | 🔴 High | No global `:focus-visible`; one `outline:none` |
| Skip link + landmarks | 🔴 High | No skip link; homepage has no `<main>` |
| Color contrast | 🟠 Medium | `--ink-4`/eyebrow text fails AA on dark |
| FAQ accordion state | 🟠 Medium | No `aria-expanded`/`aria-controls` |
| Mobile menu dialog | 🟠 Medium | No `aria-expanded`, focus trap, or Esc |
| Carousel semantics | 🟡 Low | No `aria-live`; auto-advance |
| Reduced-motion (CSS loops) | 🟡 Low | Marquee/keyframes ignore the setting |
| Labels, alt, reduced-motion (JS) | 🟢 Good | Mostly solid |

---

## 🔴 High — Keyboard focus is barely visible

There is **no global `:focus-visible` style** (0 found across CSS). The only focus rule is on form inputs (`assets/sections.css`), and one rule sets `outline: none`. Every other interactive element — nav links, the volt CTA buttons, filter chips, FAQ question buttons, carousel arrows/dots, project cards — relies on the browser default outline, which on this dark, custom-styled UI is often low-contrast or visually lost.

Keyboard and switch users can't reliably tell where focus is.

**Recommendation:** Add a high-contrast, global focus style:
```css
:focus-visible {
  outline: 2px solid var(--link);
  outline-offset: 2px;
  border-radius: 4px;
}
```
Audit each component to ensure the ring isn't clipped by `overflow:hidden` (project cards, pcards) — use `outline-offset` or an inset `box-shadow` ring where needed.

---

## 🔴 High — No skip link; homepage lacks a `<main>` landmark

- **No "skip to content" link** exists on either page, so keyboard users must tab through the entire nav (and mobile bar) on every page.
- `index.html` wraps its body in `<div class="content">` with **no `<main>` element** — screen-reader users get no main landmark. (`work/project.html` does use `<main id="cs">`, good.)
- Both pages render **two brand/nav blocks** (desktop `.topnav` + mobile `.topbar`/overlay) with no distinguishing `aria-label`, producing duplicate, unlabeled navigation landmarks.

**Recommendations**
- Add a visually-hidden-until-focused skip link as the first focusable element: `<a class="skip" href="#main">Skip to content</a>`.
- Change `index.html`'s `<div class="content">` to `<main id="main">` (or add a `<main>` inside it).
- Give each `<nav>` a distinct `aria-label` ("Primary", "Mobile").

---

## 🟠 Medium — Color contrast failures

Several text tokens fall below the WCAG AA 4.5:1 threshold on the dark `#141414` background:

| Token | Value | Use | Verdict |
|-------|-------|-----|---------|
| `--ink-4` | `rgba(255,255,255,.40)` | eyebrows, labels, footer meta | ✗ ~3.0:1 — fails AA |
| `--ink-3` | `rgba(255,255,255,.54)` | `.lead` body copy | ⚠ ~4.2:1 — borderline, fails for normal text |
| `--d-ink-4` | `rgba(255,255,255,.34)` | scroll cue, faint labels | ✗ fails |

The volt link `#D9F400` on dark passes, and white headings pass.

**Recommendations**
- Raise `--ink-4`/`--d-ink-4` usage for any **real text** to at least `.62` opacity (≈4.6:1). Reserve sub-.5 opacities for genuinely decorative, non-essential text.
- Verify `.lead` (`--ink-3`) meets 4.5:1 — bump to ~`.66` to be safe.
- Don't rely on the volt color alone to signal the active nav item; it also adds a background tint (good) — keep that.

---

## 🟠 Medium — FAQ accordion doesn't expose state

In `index.html` the FAQ uses `<button class="faq-q">` toggled by `assets/app.js` adding an `.open` class, but the buttons have **no `aria-expanded`** and the answer panels have no `aria-controls`/`id` relationship or `hidden` management. Screen-reader users aren't told whether an item is open or collapsed.

**Recommendation:** Set `aria-expanded="false"`/`"true"` on each question button as it toggles, link it to its panel with `aria-controls`, and toggle the panel's visibility via `hidden` (in addition to the `max-height` animation).

---

## 🟠 Medium — Mobile menu isn't an accessible dialog

The overlay (`#menuOverlay`) opens via a class toggle. Issues:
- The "Menu" button has **no `aria-expanded`** / `aria-controls`.
- The overlay has **no `role="dialog"`/`aria-modal`**, **no focus trap**, and **no Escape-to-close** (only click handlers).
- Focus isn't moved into the overlay on open or returned to the trigger on close.

**Recommendations**
- Add `aria-expanded` to the toggle, `role="dialog" aria-modal="true"` + an accessible name to the overlay.
- On open: move focus to the first link / close button; trap Tab within the overlay; close on `Esc`; restore focus to the button on close.

---

## 🟡 Low — Carousel semantics

The testimonial carousel arrows and dots have `aria-label`s (good) and auto-advance is disabled under `prefers-reduced-motion` (good). Remaining gaps:
- No `aria-live="polite"` region, so quote changes aren't announced.
- Auto-advance (6 s) can only be paused by **hovering** — keyboard users can't pause it.

**Recommendations:** Wrap the active slide in an `aria-live="polite"` container, and pause auto-advance on focus-within (not just hover).

---

## 🟡 Low — CSS animations ignore reduced-motion

JS motion is well-gated, but some **CSS keyframe loops run regardless** of the user's setting: the marquee (`scrollx`, infinite), the status pip `blink`, and the scroll-cue `wheel`. The marquee only pauses on hover.

**Recommendation:** Add a global guard:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; }
}
```
or specifically stop the marquee/pip/wheel animations for those users.

---

## 🟢 Good — keep these

- `prefers-reduced-motion` checked throughout `app.js` (starfield, parallax, role rotator, carousel autoplay, tilt) and `cube.js`.
- Decorative SVG logo marks and the cube stage use `aria-hidden="true"`.
- Carousel arrows/dots and the video tiles have descriptive `aria-label`s; video tiles are keyboard-operable (`tabindex`, Enter/Space).
- Contact form fields have associated `<label>`s with a clear `:focus` style.
- One `<h1>` per page with logical heading order.
- `lang="en"` set; `viewport` allows zoom (no `user-scalable=no`).

---

## Quick-win checklist

- [ ] Add a global high-contrast `:focus-visible` style
- [ ] Add a skip link; wrap homepage content in `<main>`; label both `<nav>`s
- [ ] Raise low-opacity text tokens (`--ink-4`, `--d-ink-4`) to meet 4.5:1
- [ ] Add `aria-expanded`/`aria-controls` + `hidden` to FAQ accordion
- [ ] Make the mobile menu a real dialog (focus trap, Esc, `aria-expanded`)
- [ ] Add `aria-live` to the carousel; pause on focus-within
- [ ] Gate CSS marquee/keyframe loops behind `prefers-reduced-motion`
