# dylanabela.com

The personal portfolio site of **Dylan Abela** — game developer based in Malta.

It showcases the commercial games and slot titles he's worked on, alongside personal
and game-jam projects.

**Live:** <https://www.dylanabela.com/>

## Tech stack

- **Static single-page site** — plain HTML/CSS/JS. No build step, no package manager.
- [Bootstrap 5.3.3](https://getbootstrap.com/) + [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/)
- [Typed.js 2.0.11](https://mattboldt.github.io/typed.js/) — hero subtitle
- [PureCounter](https://github.com/srexi/purecounterjs) — animated stat counters
- Third-party libraries are committed under `assets/vendor/` (pruned to only what's used).

## Structure

```
index.html                  # the entire site — all content lives here
assets/
  css/style_new.css         # the only stylesheet loaded
  js/main.js                # nav, section filters, counters, footer year, preloader
  img/
    commercialgames/        # commercial + slot card images (4:3)
    jamgames/               # personal project card images (1:1)
  vendor/                   # Bootstrap, Bootstrap Icons, Typed.js, PureCounter
games/                      # playable WebGL builds & downloads (Git LFS)
AGENTS.md                   # guidance for AI coding agents
Color Scheme.txt            # canonical colour palette
```

### Sections

| Section | Anchor | Content |
|---|---|---|
| Hero | `#hero` | Name + typing subtitle |
| About | `#about` | Stats, bio, skills, social links |
| Commercial Games | `#work` | Filterable grid — **Mobile / PC / Slots** |
| Personal Projects | `#blog` | Filterable grid — **Web / Jams / Other** |

Filters are driven by `data-target` / `data-filter` attributes (see `AGENTS.md`).

## Running locally

There is no build step. Serve the folder over HTTP — the Unity WebGL games need a
server rather than opening `file://` directly:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Git LFS

The game builds and downloads under `games/` are stored with
[Git LFS](https://git-lfs.com/) (patterns `*.unityweb`, `*.rar`, `*.zip`, `*.apk`).
Install it **before cloning**, otherwise you'll only get pointer files:

```bash
git lfs install
```

## Notes

- Palette is defined in `Color Scheme.txt` and applied in `assets/css/style_new.css`.
- Card titles are intentionally white; red is reserved for links and accents.
- The copyright year and the "years of experience" counter are computed at runtime.
