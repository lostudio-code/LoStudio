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
work/project.html     Case-study template (reads ?id= from the work grid)
assets/
  styles.css          Base styles, tokens, layout primitives
  sections.css        Section-level styles
  case.css            Case-study page styles
  projects.js         Portfolio data + mock-screen renderer
  svc-illos.js        Service illustrations
  app.js              Scroll reveals, nav, motion
  cube.js             Hero animation
  image-slot.js       Drag-and-drop image placeholder component
  brand/              Logo, favicon, portrait
uploads/              Project imagery
```

## Editing portfolio content

All work items live in `assets/projects.js` as a single array. Each entry drives both its card in the home grid and its detail page in `work/project.html`. Add, remove, or reorder items there.

## Deploy (GitHub + Vercel)

This is a zero-config static site. No build step.

1. **Push to GitHub** — commit the repo and push to a GitHub repository.
2. **Import in Vercel** — at [vercel.com/new](https://vercel.com/new), import the repo.
   - Framework Preset: **Other**
   - Build Command: *(leave empty)*
   - Output Directory: *(leave empty — root is served as-is)*
3. **Deploy.** Vercel serves `index.html` at the root; `vercel.json` adds long-lived caching for `/assets` and `/uploads` plus baseline security headers.

Every push to the default branch triggers an automatic production redeploy; pull requests get preview URLs.

## Fonts

Geist, Geist Mono, and Instrument Serif, loaded from Google Fonts.

---

© 2026 Lo Studio. All rights reserved.
