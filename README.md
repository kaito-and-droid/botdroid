# BotDroid — Landing Page

Single-file marketing page for BotDroid v0.4.0 Public Beta.

**Live:** https://botdroid-landing.kaitodroid.workers.dev (Cloudflare Worker `botdroid-landing`)

## Files

- `index.html` — self-contained landing page (Tailwind via CDN, Google Fonts, inline SVG icon).
- `privacy.html` — privacy policy (canonical URL: `/privacy`, the `.html` form redirects).
- `worker.js` — Cloudflare Worker: serves static assets + `POST /api/waitlist` (stores signups in Workers KV).
- `wrangler.jsonc` — Worker config (assets binding + `WAITLIST` KV namespace).
- `.assetsignore` — files excluded from the asset upload.

## Stack

- HTML + Tailwind CDN (no build step)
- Inter (sans) + JetBrains Mono (mono) from Google Fonts
- Brand colors match the app: cyan `#00E5C8`, amber `#FFB830`, base `#060C09`

## Sections

1. Sticky nav with brand + version chip
2. Hero — headline, subhead, phone mockup of the in-app dashboard, proof strip
3. Provider strip — OpenAI / Anthropic / OpenRouter / Gemini / DeepSeek / xAI / NVIDIA
4. Problem → Solution (3 pain cards + the BotDroid pitch panel)
5. Features grid — 6 cards covering bot types, BYOK, channels, persistence, dashboard, security
6. How it works — 3 numbered steps with terminal-style snippets
7. Comparison — VPS vs Pi vs BotDroid table
8. Pricing — Free vs Pro ($4.99/mo or $19.99 lifetime)
9. FAQ — 7 questions covering uptime, secrets, Python, ABI, billing, reboot, source
10. CTA — primary Play Store + secondary source notes
11. Footer with product / resources / connect columns

## Preview locally

```bash
cd landing-page
python3 -m http.server 4567
# open http://localhost:4567
```

## Deploy (Cloudflare Workers)

```bash
cd landing-page
wrangler deploy          # ships static assets + worker.js
```

Deploys to `https://botdroid-landing.kaitodroid.workers.dev`. Requires `wrangler` authenticated to the Cloudflare account (already set up via OAuth).

### Waitlist

`POST /api/waitlist` accepts `{ email, source }` (`source`: `marketplace` | `cloud`), validates the email, silently drops honeypot submissions (`company` field filled), and stores one KV key per email in the `WAITLIST` namespace.

```bash
wrangler kv key list --binding WAITLIST --remote                 # export signups
wrangler kv key get "email:<addr>" --binding WAITLIST --remote   # inspect one
```

## Honesty guardrails (from `marketing/plan.md`)

The copy intentionally avoids the "what NOT to claim" list:
- No WhatsApp claim (UI exists, no gateway) — kept it out of channel mentions.
- No "syntax-highlighted script editor" claim — `:app` ships a basic script editor only.
- No "templates library" claim beyond the v0.3.0 8-template surface.
- Pro tier is described as wired (it is — v0.4.0 ships Play Billing) but pricing copy mirrors the values from `marketing/plan.md`.
- Comparison table is hedged with "comparison targets typical DIY deploy".

## Next

- Swap the GitHub-anchor links in the CTA + footer once the public URLs exist.
- Replace the inline phone mockup with a real screen recording or screenshots once Play listing assets land (see `docs/delivery/2026-05-27-delivery-report.md`, Step 8).
- Add an OG image (`og.png`, 1200×630) once the brand kit is finalized.
