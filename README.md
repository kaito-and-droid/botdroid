# BotDroid — website and user guide

Product home and usage guide for BotDroid, built with [Astro Starlight](https://starlight.astro.build/). English at `/`, Vietnamese at `/vi/`.

**Live:** https://botdroid.app (Cloudflare Worker `botdroid-landing`; the old `botdroid-landing.kaitodroid.workers.dev` URL stays enabled because shipped app builds link to its `/privacy`).

## Layout

- `src/content/docs/` — English pages; `src/content/docs/vi/` — the same pages in Vietnamese. Add every new page in both.
- `astro.config.mjs` — locales and sidebar.
- `src/data/templates.json` — template catalog, synced from the app. `src/data/templates.vi.json` — Vietnamese descriptions by template id.
- `public/privacy.html` — privacy policy, served at `/privacy` (path must not change). `public/version.json` — kept at `/version.json`.
- `public/_redirects` — `/vi/privacy` → `/privacy`.

## Commands

```bash
npm install
npm run dev              # local preview at http://localhost:4321
npm run sync-templates   # refresh src/data/templates.json from ../app (run inside the bot_droid repo)
npm run build            # static site in dist/
npm run deploy           # build + wrangler deploy (needs Cloudflare auth)
```

When the app adds or changes a template: run `npm run sync-templates`, add the Vietnamese description to `templates.vi.json`, and rebuild.
