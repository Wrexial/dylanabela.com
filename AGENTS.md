# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

The static personal portfolio site for **Dylan Abela** (game developer), served at
<https://www.dylanabela.com/>. It is a **single-page static site** — there is **no
build step, no package manager, and no tests**. Everything is plain HTML/CSS/JS plus
committed third-party vendor libraries.

Do not introduce a framework, bundler, or `package.json` unless explicitly asked.

## Repository layout

```
index.html                  # THE site — single page, all content lives here
README.md                   # one-line description
Color Scheme.txt            # canonical color palette (source of truth)
assets/
  css/style_new.css         # ← the ONLY stylesheet linked by index.html
  scss/style.scss           # legacy SCSS source (NOT wired up / not loaded)
  js/main.js                # all custom site JS
  img/
    commercialgames/        # images for the "Commercial Games" section
    jamgames/               # images for the "Personal Projects" section
  vendor/                   # third-party libs — DO NOT EDIT
```

## Front-end stack (all in `assets/vendor/`, already wired up)

- **Bootstrap 5.3.3** (`bootstrap/css/bootstrap.min.css`, `bootstrap/js/bootstrap.bundle.min.js`)
- **Bootstrap Icons 1.11.3** (`bootstrap-icons/bootstrap-icons.css` + `fonts/`)
- **Typed.js 2.0.11** (hero subtitle)
- **PureCounter** (animated About counters — auto-initialises)
- `assets/js/main.js` — nav, typed init, years-of-experience, section filters, footer year, preloader

Only the files listed above exist in `vendor/` — unused libraries (Swiper, GLightbox,
jQuery) and the extra Bootstrap grid/reboot/utilities/RTL/map builds were deliberately
removed. Don't re-add a library unless it's actually used on the page.

`Bootstrap Icons` is an older-major fork-free set; a few modern names (e.g.
`bi-pc-display`, `bi-coin`) **don't exist** — check `bootstrap-icons.css` before using
an unfamiliar `bi-*` class.

## Page structure

Single page with anchor navigation (`#hero`, `#about`, `#work`, `#blog`):

| Section | id       | Content |
|---------|----------|---------|
| Hero    | `#hero`  | Name + Typed.js subtitle |
| About   | `#about` | Bio, contact links, skill logos, animated counters |
| Commercial Games | `#work` | `.work-box` cards (image, title, studio, date) |
| Personal Projects | `#blog` | `.card card-blog` cards (image, category, title, description, footer links) |

Navbar is in `<header id="header">`, footer near the bottom (socials + copyright),
then `#preloader` and `.back-to-top`.

### Filter component (both sections)

Each section has a filter bar and a grid:

```html
<div class="project-filters" data-target="commercial-grid">
    <button class="project-filter active" data-filter="all">All</button>
    ...
</div>
<div class="row" id="commercial-grid">
    <div class="col-xl-3 col-md-4 col-sm-6 filter-item" data-filter="mobile">…</div>
</div>
```

`main.js` wires up any `.project-filter` inside a `.project-filters` bar and toggles
`.d-none` on `#<data-target> .filter-item` by matching `data-filter`.
Current groups: Commercial `mobile|pc|slot`, Personal `web|jam`.

## Image conventions

- **Commercial** images: `assets/img/commercialgames/<slug>-large.jpg`, displayed in a
  rounded **4:3** frame with `object-fit: cover` (cropping is expected).
- **Personal** images: `assets/img/jamgames/<slug>.png`, displayed in a rounded **1:1**
  frame with `object-fit: cover`.
- Keep images reasonably sized; don't commit multi-MB originals.

## Color scheme (must be followed)

Use the palette from `Color Scheme.txt` exactly — **black background + red accents**:

```
#F10000  Bright Red   links
#E50000  Red          base red
#B00000  Darker Red   background red
#2D0000  Dark Red
#000000  Black        base color
#050505  Black Light  background highlights
#333333  Grey Dark    (unused)
#999999  Grey Light   most text
#D0D0D0  Grey Very Light  titles
#FFFFFF  White        header text
```

Card titles (`.w-title a`, `.card-title a`) are intentionally **white**; red is
reserved for links/accents.

## Conventions

- **2-space indentation** in HTML and CSS; `main.js` uses 4 spaces.
- Keep `index.html` self-contained — new content is new markup in the relevant
  `<section>`.
- Section wrappers follow `<section id="..." class="...-mf sect-pt4 route">` with a
  `.title-box` heading. Copy an existing card when adding content so classes/layout
  match.
- Interactive/icon-only links and images should keep their `aria-label` / meaningful
  `alt` attributes.
- Never edit anything under `assets/vendor/` (except deliberate version bumps).

## Common tasks

### Add a commercial game (`#work`)
Copy a `<div class="col-xl-3 col-md-4 col-sm-6 filter-item" data-filter="slot">`
→ `.work-box` block; update image, title, studio, date, links, and `data-filter`
(`mobile|pc|slot`). Keep the grid sorted newest → oldest.

### Add a personal project (`#blog`)
Copy a `<div class="col-xl-3 col-md-4 col-sm-6 filter-item" data-filter="jam">`
→ `.card card-blog` block; update image, category, title, description, footer links,
and `data-filter` (`web|jam`). Keep the grid sorted newest → oldest.

### Update the palette
Edit `Color Scheme.txt` first, then apply consistently in `style_new.css`.

## Known issues / gotchas

- **Git "dubious ownership".** The repo directory is owned by a different Windows user
  than the current one, so plain `git` commands fail until you allow it:
  `git config --global --add safe.directory 'E:/Website 2.0'`, or prefix commands with
  `git -c safe.directory='E:/Website 2.0' ...`.
- **Line endings.** `index.html`, `assets/css/style_new.css`, and `assets/js/main.js`
  are **CRLF** in the working copy. Preserve them — write with `newline='\r\n'` and
  don't reformat whole files just to change line endings.
- `.vs/` (Visual Studio) is untracked and should not be committed. There is no
  `.gitignore`; if you add one, include `.vs/` and OS/editor junk.
- `style_new.css` still contains some dead rules for a project-detail page
  (`.portfolio-details`, `.blog-single`, etc.) that doesn't exist. Harmless, trim only
  if certain.

## Verifying changes

There is no build/test command. Verify by:

1. `node --check assets/js/main.js` after touching JS.
2. Opening `index.html` in a browser (or `python -m http.server`) and checking the
   Console/Network tab for 404s and JS errors.
3. Reviewing layout at mobile and desktop widths (Bootstrap grid: `col-*` breakpoints),
   and checking both section filters.

Before finishing, run `git -c safe.directory='E:/Website 2.0' status` and make sure you
only changed files relevant to the task.
