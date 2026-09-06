# Lo Studio — Portfolio Website

The portfolio site for **Lo Studio** (Michael DeBiase) — brand, web, product UI, motion, and go-to-market design for early-stage startups.

A static, dependency-free website. No build step, no framework, no server-side code. Just HTML, CSS, and vanilla JavaScript.

## Run locally

Because pages load assets via relative paths, serve the folder over a local web server rather than opening the file directly:

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Structure

```
index.html            Home — hero, work grid, services, process, about, FAQ
resume.html           Résumé — experience, skills, tool stack (linked from the footer)
privacy.html          Privacy policy
404.html              Not-found page
work/project.html     Case-study template (reads ?id= from the work grid)
assets/
  styles.css          Base styles, tokens, layout primitives
  sections.css        Section-level styles
  case.css            Case-study page styles
  projects.js         Portfolio data + mock-screen renderer
  svc-illos.js        Service illustrations
  app.js              Scroll reveals, nav, motion
  cube.js             Hero cube animation
  butterfly.js        Butterfly perched on the hero CTA (three.js)
  cursor-spray.js     Hero cursor trail (three.js, desktop pointers only)
  wordmark-projection.js  Footer wordmark (three.js)
  brand/              Logo, favicon, portrait, hero video + poster
  logos/              Tool-stack brand marks for resume.html
uploads/              Project imagery
```

## Editing portfolio content

All work items live in `assets/projects.js` as a single array. Each entry drives both its card in the home grid and its detail page in `work/project.html`. Add, remove, or reorder items there.

## Deploy

Zero-config static site — no build step. All asset paths are relative, so it runs
correctly from a domain root or a project subpath.

### Vercel

The live site (`lostudio.net`) is served by Vercel.

1. Import the repo at [vercel.com/new](https://vercel.com/new).
   - Framework Preset: **Other**; Build Command and Output Directory left empty.
2. Deploy. Pushes to `main` redeploy automatically; PRs get preview URLs.

`vercel.json` adds long-lived immutable caching for `/assets` and `/uploads` plus
baseline security headers (`nosniff`, `X-Frame-Options`, `Referrer-Policy`). These are
Vercel-specific — they do nothing on a static host that ignores `vercel.json`.

**Custom domain:** add `lostudio.net` under the project's Domains tab and point your DNS
at Vercel. The site's canonical, Open Graph, and sitemap URLs already use
`https://lostudio.net/`.

**Analytics:** enable Analytics in the Vercel project. Each page loads
`/_vercel/insights/script.js`, guarded by hostname so it only fires on `*.vercel.app`
and `lostudio.net` — local dev and any non-Vercel host skip it instead of 404ing.

## Fonts

Geist, Geist Mono, and Instrument Serif, loaded from Google Fonts.

---

© 2026 Lo Studio. All rights reserved.
