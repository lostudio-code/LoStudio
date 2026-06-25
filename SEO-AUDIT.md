# SEO Audit — Lo Studio Website

**Scope:** `index.html`, `work/project.html` (template for all `?id=` case studies).
**Date:** June 18, 2026

---

## Summary

The homepage has solid fundamentals — a descriptive `<title>`, a meta description, `lang="en"`, one `<h1>`, and clean heading structure. The gaps are in **social/share metadata, structured data, the project sub-pages, and crawl infrastructure**. The case-study pages are the weakest link: their title is set by JavaScript and they ship with **no meta description and a generic default title**, so any crawler that doesn't execute JS sees "Project · Lo Studio" for every project.

| Area | Severity | Status |
|------|----------|--------|
| Project pages: title/description | 🔴 High | Set only via JS; no static description |
| Open Graph / Twitter cards | 🔴 High | Absent on both pages |
| Structured data (JSON-LD) | 🟠 Medium | None (no Person/Portfolio schema) |
| Canonical URLs | 🟠 Medium | Missing on both pages |
| robots.txt / sitemap.xml | 🟠 Medium | Not present |
| Broken in-page anchors | 🟡 Low | `#contact` linked but no such section |
| Core fundamentals (title, desc, h1, lang) | 🟢 Good | Homepage only |

---

## 🔴 High — Project pages have no static title or description

`work/project.html` ships with:
```html
<title>Project · Lo Studio</title>
```
and **no `<meta name="description">` at all** (0 found). The real title is written client-side:
```js
document.title = `${P.company} — ${P.title} · Lo Studio`;
```

Risks:
- Crawlers/social scrapers that don't run JS index every project URL as the identical generic title with no description.
- All `?id=…` variants look like duplicate/empty pages.

**Recommendations**
- Add a meaningful default `<title>` and `<meta name="description">` to the static HTML.
- Inject a **per-project `<meta name="description">`** in the same JS block that sets the title (the project data already has `summary` — use it).
- Ideally pre-render or statically generate one HTML file per project so metadata exists without JS.

---

## 🔴 High — No Open Graph or Twitter Card metadata

Neither page has any `og:*` or `twitter:*` tags (0 found on both). When the portfolio is shared on LinkedIn, X, Slack, or iMessage, there's **no title card, description, or preview image** — a real miss for a designer's portfolio where the visual is the pitch.

**Recommendations** — add to `<head>`:
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Lo Studio — Brand & Product Design · Michael DeBiase" />
<meta property="og:description" content="The full creative stack for startups and enterprises…" />
<meta property="og:image" content="https://…/share-card.jpg" />
<meta property="og:url" content="https://lostudio.net/" />
<meta name="twitter:card" content="summary_large_image" />
```
Give each **project page its own `og:image`** (the project hero) and `og:title`/`og:description` via the JS injector.

---

## 🟠 Medium — No structured data (JSON-LD)

There is no `application/ld+json` block. For a personal portfolio this is a strong opportunity.

**Recommendations**
- Add a **`Person`** schema (name, jobTitle, `sameAs` linking GitHub/LinkedIn/Instagram/YouTube/X, `worksFor`).
- Optionally `ProfilePage` / `CreativeWork` for individual case studies.
- A `BreadcrumbList` on project pages (Home → Work → Project) reinforces structure.

---

## 🟠 Medium — Missing canonical tags

No `rel="canonical"` on either page. The project page especially needs it because `work/project.html?id=…` produces many URL variants from one file — without canonicals these can be read as near-duplicates.

**Recommendation:** Add a self-referencing `<link rel="canonical">` to each page; on the project page set it dynamically to the current `?id=` URL.

---

## 🟠 Medium — No robots.txt or sitemap.xml

Neither file is present in the project. A sitemap is valuable here because the project pages are query-string variants a crawler may not discover by link-following alone.

**Recommendations**
- Add `robots.txt` allowing crawl and pointing to the sitemap.
- Generate `sitemap.xml` listing the homepage **and every project `?id=` URL**.

---

## 🟡 Low — Broken / mismatched anchors

`work/project.html` and its mobile menu link to `../index.html#contact`, but `index.html` has **no `#contact` section** — the Contact nav item is a `mailto:` link and the page sections are `#work/#services/#process/#about/#faq`. The footer "Back to top" on the project page targets `#top`, which also doesn't exist on that page.

**Recommendation:** Point those links at a real anchor (or the `mailto:`), and either add an `id="top"` target on the project page or change the link. Broken in-page anchors are minor for ranking but hurt UX and crawl signals.

---

## 🟢 Good — keep these

- `index.html`: accurate, keyword-relevant `<title>` and `<meta name="description">`.
- `lang="en"` set on both pages.
- Exactly one `<h1>` per page; logical `h2`/`h3` order.
- Most images carry descriptive `alt` text.
- `viewport` meta present (mobile-friendly).
- Outbound social links use `rel="noopener"`.
- `work/project.html` sets `referrer` policy and uses `youtube-nocookie` embeds.

---

## Quick-win checklist

- [ ] Add static `<title>` + `<meta description>` to `project.html`; inject per-project values via JS
- [ ] Add Open Graph + Twitter Card tags to both pages (per-project `og:image`)
- [ ] Add `Person` JSON-LD on the homepage; breadcrumb schema on project pages
- [ ] Add self-referencing `rel="canonical"` (dynamic on project pages)
- [ ] Create `robots.txt` + `sitemap.xml` (include all `?id=` project URLs)
- [ ] Fix the `#contact` / `#top` anchor mismatches
