# Lo Studio — Brand Guide

The visual system for **Lo Studio**, the portfolio of Michael DeBiase — brand, web, product UI, motion, and go-to-market design for mission-driven startups and enterprises.

The system is dark-first, editorial, and chrome-minimal: a near-black canvas, crisp Geist type, an electric "volt" yellow as the single hero accent, and monospace eyebrows that lend a technical, studio-grade feel.

---

## 1. Logo

**Primary wordmark** — "Lo Studio" set in Geist, rendered white on dark backgrounds. In the nav it is delivered as a PNG (`LO_STUDIO_LOGO_DARK.png`) sized to **24px tall** and inverted to pure white via `filter: brightness(0) invert(1)`.

**Logo mark** — an articulated "walking figure" rig drawn as inline SVG (`viewBox 0 0 491 745`), built from a head (circle), core, two arms, and two legs on transform-origin hinges. It renders solid white (`fill: #fff`) at **26px tall**, with a soft 42%-opacity glow circle behind the head. The walk animation is rigged but currently static.

**Fallback mark** — a rounded square "L" tile (30×30px, 9px radius) on an orange-to-deep-navy gradient, used only when image assets fail.

**Footer wordmark** — "Lo Studio" set massive (`clamp(70px, 17vw, 280px)`), weight 800, as a near-invisible embossed graphic: a top-to-bottom white gradient (16% → 3% opacity) clipped to the text.

### Logo rules
- Clear space: keep at least the mark's own height of padding around it.
- The mark is monochrome white on dark; never recolor it to the volt accent.
- Favicon / touch icon: `assets/brand/logomark.svg` and `logo-mark.png`.

---

## 2. Typography

Three families, loaded from Google Fonts.

| Role | Family | CSS token | Usage |
|------|--------|-----------|-------|
| Sans (primary) | **Geist** | `--sans` | All headings, body, UI |
| Mono | **Geist Mono** | `--mono` | Eyebrows, labels, numerals, metadata |
| Serif (accent) | **Instrument Serif** *(italic)* | `--serif` | Emphasis phrases, decorative quote marks |

Weights loaded: Geist 300–900; Geist Mono 400/500/600; Instrument Serif italic 0/1.

```css
--sans:  'Geist', system-ui, sans-serif;
--mono:  'Geist Mono', ui-monospace, monospace;
--serif: 'Instrument Serif', Georgia, serif;
```

### Type scale

| Style | Size | Weight | Tracking | Notes |
|-------|------|--------|----------|-------|
| `.display` | `clamp(48px, 8vw, 116px)` | 800 | -.05em | Hero / footer CTA headline, line-height .92 |
| `.h2` | `clamp(32px, 4.4vw, 60px)` | 700 | -.035em | Section titles |
| Section h3 | `clamp(26px, 2.8vw, 38px)` | 700 | -.03em | Service / card titles |
| `.lead` | `clamp(16px, 1.35vw, 19px)` | 400 | — | Intro paragraphs, line-height 1.55, muted ink |
| Body `p` | ~15–16px | 400 | — | line-height ~1.6 |
| `.eyebrow` | 12px | — | **.22em**, UPPERCASE | Geist Mono kicker above headings |
| `.serif-em` | inherits | 400 *italic* | 0 | Instrument Serif emphasis inside headings |

**Conventions**
- Headings carry tight negative tracking (-.03em to -.05em) and line-heights near 1.0 for a dense, editorial feel.
- Eyebrows, section numbers (`01`, `//`), status pills, form labels, and stats labels are **all Geist Mono**, uppercase, wide-tracked.
- Use `text-wrap: balance` / `pretty` on large headings and quotes.
- Italic Instrument Serif is the only "decorative" voice — reserve it for one emphasis phrase, big quote marks, and the about-section flourish.

---

## 3. Color

The palette is a full dark theme. "Paper" sections and "dark" sections both resolve to near-black — contrast comes from subtle panel steps and the volt accent, not from light/dark inversion.

### Neutrals (backgrounds & surfaces)

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#141414` | Hero, dark bands, footer |
| `--bg-2` | `#101010` | Deepest background |
| `--paper` | `#141414` | Default section background |
| `--paper-2` | `#1c1c1e` | Raised section / card surface |
| `--paper-3` | `#242427` | Highest surface |
| `--panel` | `#1d1d1f` | Float cards, process steps |
| `--panel-2` | `#242427` | Panel step-up |

### Ink (text on dark)

| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#ffffff` | Primary text |
| `--ink-2` | rgba(255,255,255,.74) | Secondary |
| `--ink-3` | rgba(255,255,255,.54) | Muted / lead copy |
| `--ink-4` | rgba(255,255,255,.40) | Faint labels, numbers |
| `--line` | rgba(255,255,255,.10) | Hairline borders |
| `--line-2` | rgba(255,255,255,.16) | Stronger borders |

*(A parallel `--d-ink-*` / `--d-line-*` set with the same logic is used for explicitly-dark chrome like the nav and footer.)*

### Accents

| Token | Value | Role |
|-------|-------|------|
| **`--link`** | **`#D9F400`** | **Volt yellow — primary action, links, active states, the single hero color** |
| `--link-hi` | `#e9ff45` | Hover / gradient top |
| `--link-d` | `#aec700` | Pressed / shadow |
| `--link-ink` | `#141400` | Text *on* volt fills |
| `--accent` | `#FF3D00` | Lo Studio orange (secondary / brand-red) |
| `--accent-hi` | `#ff7a4d` | Orange hover |
| `--accent-d` | `#d12f00` | Orange dark / `::selection` |
| `--cyan` | `#ff9d33` | Warm amber tertiary |

**Usage rules**
- **Volt (`#D9F400`) is the only "loud" color.** Use it for primary buttons, link hovers, active nav, filter pills, FAQ +/− icons, form focus rings, the marquee asterisks, and counters. Don't dilute it by using it for large fills.
- Text on a volt fill is always near-black `--link-ink (#141400)`, never white.
- Orange (`#FF3D00`) is a supporting brand color (dot-grid textures, fallback mark, selection highlight) — not a co-primary.
- Glows: volt accents get soft colored shadows, e.g. `box-shadow: 0 14px 40px -12px rgba(217,244,0,.55)`.

### Glyph note
The marquee asterisk (`✳`) carries a text-presentation variation selector (`U+FE0E`) so it renders as a monochrome glyph and inherits `--link` (volt) on every platform, instead of falling back to a full-color emoji on mobile.

---

## 4. Spacing & layout

| Token | Value | Use |
|-------|-------|-----|
| `--maxw` | `1180px` | Max content width (`.wrap`) |
| `--rail` | `248px` | Reserved left-rail width |
| Wrap padding | `0 40px` desktop → `0 22px` (≤620) → `0 18px` (≤420) | Gutters |
| Section rhythm | `110px` top/bottom → `70px` on mobile (≤620) | `.sec`, `.work`, `.testi`, `.about`, `.faq`, `.contact` |
| Stats band | `90px` vertical | — |

**Grids**
- Work grid: 3 columns → 2 (≤1000px) → 1 (≤620px), gap 18px.
- Process steps: 4 → 2 (≤900px) → 1 (≤560px), gap 14px.
- Stats: 4 → 2 → 1, gap 24px.
- Services: 2-column card (visual + info) that collapses to stacked on ≤900px; cards are **sticky** (`top: 90px`) for a stacking-scroll effect.

**Breakpoints:** 1180 (rail/status), 1100 (nav → mobile bar), 1000, 900 (tablet — copy goes full width), 620 (phone rhythm), 520, 460, 420.

Body copy is constrained to `max-width: 75%` on desktop and released to full width at ≤900px.

---

## 5. Radii, borders, shadow & texture

**Corner radii**
- Pills / buttons / chips / status: `999px`
- Cards & media: `16px`
- Service cards: `24px`; forms & portrait: `22px`; process steps: `18px`
- Small tiles / inputs: `9–14px`

**Borders** — hairlines only: 1px at 10–16% white (`--line` / `--line-2`). Volt-tinted borders (`rgba(217,244,0,.3–.45)`) signal active/interactive accents.

**Shadows** — large, soft, dark, deeply offset for "floating glass," e.g. `0 40px 80px -50px rgba(11,14,22,.5)`; volt actions add a colored glow layer.

**Signature effects**
- **Animated border beam** — a conic-gradient volt sweep masked to a 1.6px border, revealed on hover of work cards and process steps (`@property --beam-angle`, 2.6s spin).
- **Cursor glare** — a soft radial highlight that follows the pointer across work-card media (`soft-light` blend).
- **Grain** — fixed fractal-noise SVG overlay at 3.5% opacity, multiply blend.
- **Dot grids** — radial-dot backgrounds (orange on dark, ink on light) masked with radial gradients for ambient texture.
- **Volt bloom** — blurred radial volt glow behind the hero and portrait.

---

## 6. Components

**Buttons** (`.btn`, pill, 14×24px padding, weight 600)
- `.btn-primary` — volt gradient fill (`--link-hi → --link`), `--link-ink` text, volt glow + inset highlight; lifts -2px and brightens on hover. Arrow icon nudges up-right on hover.
- `.btn-ghost` — translucent white fill, hairline border (on dark).
- `.btn-dark` / `.btn-light` — solid ink / paper variants.

**Nav** — fixed top nav; links are muted-ink mono-adjacent pills that turn volt on hover/active (active gets a faint volt wash). A "Book a call" volt CTA sits at the right. Below 1100px it swaps to a mobile bar + full-screen overlay menu with 34px link type. A live status pip (pulsing green `#43e08a`) + clock appear ≥1180px.

**Eyebrow / section header** — mono uppercase kicker (.22em) + optional mono section number, above an `.h2`, optional `.lead`, max-width 660px (center variant available).

**Work card (`.pcard`)** — rounded media (16/10.5 aspect) with category pill, hover scale + glare + border beam, body with mono company label, 17px title, and a circular arrow button that flips to volt and rotates -45° on hover.

**Filter pills** — mono, hairline border; active state = volt fill with `--link-ink` text.

**Service card** — sticky 2-up: dot-grid spot illustration + numbered info block; capabilities listed as mono items prefixed with a volt `//`.

**Process step** — dark panel, big mono numeral (volt accent digit), volt-tinted rounded icon tile that fills volt and animates on hover, plus the border beam.

**Stats** — rolling-digit reels (mono labels) counting up on a dark band.

**FAQ accordion** — hairline-divided rows; a +/− icon built from two volt bars where the vertical bar collapses (`scaleY(0)`) when `.open`. Items start collapsed (plus) and expand on click.

**Testimonials** — single-quote carousel: large 500-weight quote, oversized italic Instrument Serif quote mark at 13% volt, avatar + mono attribution, volt arrows and a stretching volt active dot.

**Form** — paper-2 card, mono uppercase labels, inputs with hairline borders that focus to a volt border + 3px volt glow ring; toggle chips fill volt when on.

**Footer** — dark, mono column headers, links that hover volt, the giant embossed "Lo Studio" wordmark, and a mono bottom bar.

---

## 7. Motion

- **Reveal on scroll** — `.reveal` fades + rises 26px; staggered via `data-d="1..5"` (.07s steps). Easing `cubic-bezier(.2,.7,.3,1)`.
- **Marquee** — infinite horizontal scroll (26s), pauses on hover; volt asterisk separators.
- **Hover lifts** — interactive surfaces translate -2 to -7px with deepened shadows.
- **Rotating role** — hero subtitle cycles "brand designer / marketing designer / vibe coder / web designer / motion designer / video editor" with a 3D flip.
- **Border beams, cursor glare, rolling counters, spinning about-badge, pulsing status pip.**
- **Accessibility:** all animation/transition is disabled under `prefers-reduced-motion: reduce`, and reveals resolve to their visible end-state.

---

## 8. Voice

Confident, lowercase-friendly, startup-fluent. The hero reads: *"Michael DeBiase is a [rotating role]. The full creative stack for startups and enterprises. Providing effective design solutions that drives real growth."* Pair plainspoken value statements with technical, monospace metadata for a studio-grade, engineered tone.

---

*© 2026 Lo Studio. All rights reserved.*
