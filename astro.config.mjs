import { defineConfig } from 'astro/config';

// The site deploys to GitHub Pages as a project site, so it is served from
// /Joni-s-Web/ rather than the domain root. `base` applies in dev too — the
// dev server lives at http://localhost:4321/Joni-s-Web/
export default defineConfig({
  site: 'https://markajardi96-spec.github.io',
  base: '/Joni-s-Web',
  trailingSlash: 'ignore',
});
