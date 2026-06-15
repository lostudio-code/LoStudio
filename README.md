# Lo Studio — Portfolio Website

Personal portfolio for **Michael DeBiase** — brand, web, product UI, motion, and go-to-market design for startups and enterprises. 20+ years of experience scaling companies like LaunchDarkly, ProjectDiscovery, and Netflix.

**Live site:** [lostudio.net](https://lostudio.net) · **Book a call:** [calendly.com/lostudioinc/30min](https://calendly.com/lostudioinc/30min)

---

## About

Lo Studio is a one-person design studio specializing in the full creative stack for early-stage companies — from brand identity and marketing sites to product UI, motion graphics, video production, and go-to-market campaigns. The site showcases 13 portfolio projects across brand, web design, product UI, motion, and events, with full case studies for each.

## Features

- **Interactive 3D Rubik's cube** in the hero — drag to spin, click any tile to turn that face
- **Work grid** with 13 portfolio entries, filterable by category (Brand, Web Design, Product UI, Motion, Event)
- **Case-study pages** with full-bleed video support, hover-to-scroll tall images, and YouTube embed (including vertical Shorts)
- **Sticky services stack** — 5 service cards with SVG spot illustrations
- **Rolling digit counters** — animated stats on scroll (20+ years, 5000+ projects, $1B+ ARR, 6 brands)
- **Testimonial carousel** — 5 quotes with auto-advance and manual controls
- **FAQ accordion**
- **Cursor-driven 3D card tilt** with glare effect on all portfolio cards
- Particle starfield in the hero with mouse parallax
- Fully responsive — desktop nav collapses to mobile hamburger overlay
- Scroll-reveal animations throughout
- Respects `prefers-reduced-motion`

## Tech

No build step, no framework, no dependencies. Plain HTML, CSS, and vanilla JavaScript.

| Layer | Details |
|---|---|
| Fonts | Geist, Geist Mono, Instrument Serif (Google Fonts) |
| Animations | CSS transitions + `requestAnimationFrame` canvas |
| Data | Single JS array in `assets/projects.js` drives the grid and all case-study pages |
| Images | Served from `uploads/` with inline SVG fallback mocks |

## Run locally

Serve the folder over a local HTTP server — don't open `index.html` directly in a browser, as asset paths won't resolve correctly.

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

## Structure

```
index.html              Home — hero, work grid, services, process, stats, about, FAQ, footer
work/project.html       Case-study template (reads ?id= from the URL)
assets/
  styles.css            Design tokens, layout, nav, hero, cards, buttons, reveal
  sections.css          Services, process, stats, about, FAQ, footer
  case.css              Case-study page styles (hero, gallery, video, next card)
  projects.js           All portfolio data + branded mock-screen renderer
  svc-illos.js          SVG spot illustrations for the 5 service cards
  app.js                Starfield, tilt, scroll reveals, carousel, FAQ, scrollspy
  cube.js               Interactive 3D Rubik's cube (drag + click-to-turn)
  image-slot.js         Drag-and-drop portrait placeholder component
  brand/                Logomark SVG, PNG, and Michael's portrait photo
uploads/                Portfolio project images
```

## Editing portfolio content

All work items live in `assets/projects.js` as a single `PROJECTS` array. Each entry drives both the card in the homepage grid and the full case-study page at `work/project.html?id=<id>`. To add, remove, or edit a project, update that array — no other files need to change.

Each project entry supports:

- `id` — unique slug, used in the URL
- `company`, `title`, `cat`, `year` — displayed on the card and case-study header
- `hero` — card thumbnail image URL (falls back to a generated SVG mock if missing)
- `summary`, `role`, `scope`, `outcome` — case-study copy
- `stats` — array of `{n, l}` objects for the stat strip
- `gallery` — array of `{cap, img, yt, span, theme}` objects for the case-study media grid
- `heroVideo` — YouTube ID for a full-bleed featured video
- `videoOrientation: 'vertical'` — renders gallery videos as a 3-up Shorts layout
- `galleryLayout: 'grid'` — switches the gallery from masonry to a 2-column grid

## Contact

- **Email:** hello@lostudio.net
- **LinkedIn:** [linkedin.com/company/lo-studio-inc](https://www.linkedin.com/company/lo-studio-inc)
- **Instagram:** [@lostudioinc](https://www.instagram.com/lostudioinc/)
- **YouTube:** [@LoStudioInc](https://www.youtube.com/@LoStudioInc)
- **GitHub:** [github.com/lostudio-code](https://github.com/lostudio-code)

---

© 2026 Lo Studio. All rights reserved.
