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
  cube.js             Hero cube animation
  wordmark-projection.js  Footer wordmark (three.js)
  image-slot.js       Drag-and-drop image placeholder component
  brand/              Logo, favicon, portrait
uploads/              Project imagery
```

## Editing portfolio content

All work items live in `assets/projects.js` as a single array. Each entry drives both its card in the home grid and its detail page in `work/project.html`. Add, remove, or reorder items there.

## Deploy

Zero-config static site — no build step. All asset paths are relative, so it runs
correctly from a domain root or a project subpath (e.g. `username.github.io/repo/`).

### GitHub Pages (recommended)

A workflow at `.github/workflows/deploy.yml` publishes the site automatically.

1. **Push to GitHub** — commit and push to a repository (default branch `main`).
2. **Enable Pages** — repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. **Deploy.** Every push to `main` runs the workflow and publishes the site. The live
   URL appears in the workflow run and under Settings → Pages.

`.nojekyll` disables Jekyll processing so files are served exactly as committed.

**Custom domain (`lostudio.net`):** in Settings → Pages set the custom domain, then add
your DNS records (an `ALIAS`/`ANNAME` or four `A` records to GitHub's IPs for the apex,
or a `CNAME` to `username.github.io` for `www`). GitHub commits a `CNAME` file for you.
The site's canonical, Open Graph, and sitemap URLs already point to `https://lostudio.net/`.

### Vercel (alternative)

1. Import the repo at [vercel.com/new](https://vercel.com/new).
   - Framework Preset: **Other**; Build Command and Output Directory left empty.
2. Deploy. `vercel.json` adds long-lived caching for `/assets` and `/uploads` plus
   baseline security headers. Pushes redeploy automatically; PRs get preview URLs.

## Fonts

Geist, Geist Mono, and Instrument Serif, loaded from Google Fonts.

---

© 2026 Lo Studio. All rights reserved.
