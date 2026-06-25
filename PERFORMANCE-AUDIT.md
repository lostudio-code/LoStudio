# Performance Audit — Lo Studio Website

**Scope:** `index.html`, `work/project.html`, and all `assets/` + `uploads/` referenced by them.
**Date:** June 18, 2026

---

## Summary

The site is visually rich but **image-heavy and unoptimized**. The single biggest problem is raw PNG payload: `uploads/` alone is **~91 MB** across 96 files, with several individual images over 3–10 MB. Combined with synchronous scripts in `<head>`, no lazy-loading on the homepage grid, and continuous `requestAnimationFrame` loops, the site will score poorly on LCP, total transfer size, and main-thread time — especially on mobile and slower connections.

| Area | Severity | Status |
|------|----------|--------|
| Image weight & format | 🔴 Critical | Many multi-MB PNGs, no WebP/AVIF |
| Lazy-loading | 🔴 High | Missing on homepage work grid |
| Image dimensions (CLS) | 🟠 Medium | No `width`/`height` on any `<img>` |
| Script loading | 🟠 Medium | Render-blocking scripts in `<head>` / no `defer` |
| Continuous animation | 🟠 Medium | Multiple always-on rAF loops |
| Fonts | 🟡 Low | 3 families, many weights; preconnect present |
| Third-party assets | 🟡 Low | Hero + avatars hot-linked from lostudio.net |

---

## 🔴 Critical — Image payload

The largest offenders (PNG, full resolution, served as-is):

| File | Size |
|------|------|
| `uploads/Website-Launch-Week.png` | **10.58 MB** |
| `uploads/Website-Enterprise.png` | 5.38 MB |
| `uploads/Website-Homepage.png` | 4.89 MB |
| `uploads/The_Definitive_Guide_to_Feature_Management.png` | 3.38 MB |
| `uploads/Solution.png` | 3.32 MB |
| `uploads/Enterprise.png` | 3.06 MB |
| `uploads/Website-Case-Study-50978f6a.png` | 3.01 MB |
| `uploads/Our_Customers.png` | 2.90 MB |
| `uploads/Website-Vulnerability-Management.png` | 2.86 MB |
| `uploads/Code_References.png` | 2.78 MB |
| …plus 26 "Brand Guidelines" PNGs at 0.5–1.2 MB each | |

These are screenshots displayed at a few hundred CSS pixels wide inside case-study galleries — there is no reason to ship 4K-resolution PNGs.

**Recommendations**
- Convert all screenshots/photos to **WebP or AVIF** (typically 70–90% smaller than PNG at equal quality). Keep PNG only for assets that need lossless transparency.
- **Resize** each image to roughly 2× its largest rendered size (e.g. a gallery tile shown at ~640px wide needs ~1280px, not 3840px).
- Add **`srcset`/`sizes`** so phones don't download desktop-resolution files.
- `assets/brand/logo-mark.png` is **725 KB** but is only referenced as an `apple-touch-icon` — replace with a 180×180 optimized PNG (<20 KB).
- Target: get the homepage's initial image load under ~1 MB and any single case page under ~3–4 MB.

---

## 🔴 High — Lazy-loading missing on homepage

`index.html` builds the work grid via `assets/projects.js` with markup `<img src="${p.hero}" alt="…">` — **no `loading="lazy"`** on any of the 9+ project cards. All hero images download immediately on page load even though most are below the fold.

The case-study page (`work/project.html`) does add `loading="lazy"` to gallery videos, but the **main gallery `<img>` tags do not** consistently get it either.

**Recommendation:** Add `loading="lazy"` to every below-the-fold `<img>` (work cards in `projects.js`, gallery/video tiles in `project.html`). Leave the hero/LCP image eager (and consider `fetchpriority="high"` on it).

---

## 🟠 Medium — No intrinsic dimensions (layout shift)

None of the `<img>` elements declare `width`/`height` (0 of 9 in `index.html`). As images stream in, content reflows, hurting **Cumulative Layout Shift**.

**Recommendation:** Add `width`/`height` attributes (or CSS `aspect-ratio`) to every image so the browser reserves space before the bytes arrive. The work cards and gallery tiles already sit in fixed-ratio containers — encode that ratio.

---

## 🟠 Medium — Render-blocking scripts

In `index.html`, scripts load **synchronously**:
- `assets/image-slot.js` (**31 KB**) is in `<head>` with no `defer` — it blocks parsing before any content renders, yet it only powers one portrait slot far down the page.
- `projects.js`, `svc-illos.js`, an inline build script, `app.js`, and `cube.js` load at end of `<body>` without `defer`/`async`, executing serially.

**Recommendations**
- Move `image-slot.js` out of `<head>` and add `defer`.
- Add `defer` to all script tags so they download in parallel and execute after parse without blocking.
- The inline grid-builder runs before `app.js`/`cube.js`; keep ordering but defer where dependencies allow.

---

## 🟠 Medium — Continuous main-thread animation

`assets/app.js` and `assets/cube.js` run several **always-on `requestAnimationFrame` loops**:
- Hero "light motes" canvas (`#starfield`) — up to 120 particles redrawn every frame.
- Hero parallax loop (`raf()`), running even when the cursor is idle.
- The Rubik's cube (`cube.js`) animation.
- `work/project.html` runs its own starfield loop too.

These keep the CPU/GPU busy for the life of the page, draining battery and competing with scrolling. They are correctly gated behind `prefers-reduced-motion` (good), but otherwise never stop.

**Recommendations**
- **Pause loops when off-screen** using an `IntersectionObserver` on the hero — stop the rAF when the hero scrolls out of view, resume when it returns.
- Pause the parallax loop when there's no pointer movement (idle-stop).
- Cap particle count more aggressively on small viewports.

---

## 🟡 Low — Fonts

`index.html` loads three families with wide weight ranges in one request:
`Geist` (300–900, 7 weights), `Geist Mono` (3 weights), `Instrument Serif`.

Positives: `preconnect` to `fonts.googleapis.com` + `fonts.gstatic.com` is present, and `display=swap` avoids invisible text.

**Recommendations**
- Subset to the weights actually used (audit usage; likely 400/500/600/700/800 of Geist).
- Consider self-hosting the fonts as `woff2` to drop a third-party connection and gain caching control.

---

## 🟡 Low — Third-party hot-linked images

The hero logo, several gallery images, and all testimonial avatars are loaded from `https://lostudio.net/wp-content/...`. This adds an extra DNS/TLS connection and puts caching/availability outside your control (the page already ships error fallbacks, which is good defensive code).

**Recommendation:** Download and self-host these (optimized) alongside `uploads/` so every asset is on one origin with consistent cache headers.

---

## Quick-win checklist

- [ ] Batch-convert `uploads/` PNGs → WebP/AVIF and resize to display size (≈ –85% transfer)
- [ ] Add `loading="lazy"` to work-grid and gallery images
- [ ] Add `width`/`height` (or `aspect-ratio`) to all images
- [ ] `defer` all scripts; move `image-slot.js` out of `<head>`
- [ ] Replace 725 KB `logo-mark.png` touch icon with a 180×180 optimized file
- [ ] Pause hero canvas/parallax rAF when hero is off-screen
- [ ] Self-host fonts + remaining third-party images
