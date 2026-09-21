# Jonuz Markaj — pianist

Site for booking piano performances at weddings, private parties and
corporate events. Albanian by default, with an English toggle.

Built with [Astro](https://astro.build). Static output, no server needed.

## Running it

```bash
npm install
npm run dev
```

The dev server runs at **http://localhost:4321/Joni-s-Web/** — the path
matters, because `base` in `astro.config.mjs` matches the GitHub Pages
project URL.

```bash
npm run build     # static site into dist/
npm run preview   # serve the built output
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/content.js` | All copy in both languages, the video list, repertoire and contact details |
| `src/pages/index.astro` | The one page, assembled from components |
| `src/components/` | One component per section |
| `src/layouts/Base.astro` | `<head>`, fonts, script loading |
| `src/styles/global.css` | The whole stylesheet, tokens first |
| `src/scripts/site.js` | Language toggle, click-to-load videos, the opening film |
| `public/` | Files served as-is |

**To change any text, edit `src/data/content.js`** — both languages sit
side by side there, so nothing falls out of sync.

## Deploying

Pushing to `main` builds and publishes via
`.github/workflows/deploy.yml`. Enable it once under
**Settings → Pages → Source → GitHub Actions**.

## Still to do

- Replace the placeholder phone and email in `src/data/content.js`
- Confirm the international repertoire list reflects what Jonuz
  actually plays — it is currently a placeholder set
