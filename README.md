# BotDroid — Landing Page

Single-file marketing page for BotDroid v1.4.0 Public Beta.

**Live:** https://botdroid-landing.kaitodroid.workers.dev (Cloudflare Worker `botdroid-landing`)

## Files

- `index.html` — self-contained landing page (Tailwind via CDN, Google Fonts, inline SVG icon).
- `privacy.html` — privacy policy (canonical URL: `/privacy`, the `.html` form redirects).
- `worker.js` — Cloudflare Worker: serves static assets (thin passthrough to the `ASSETS` binding).
- `wrangler.jsonc` — Worker config (assets binding only).
- `.assetsignore` — files excluded from the asset upload.

## Stack

- HTML + Tailwind CDN (no build step)
- Inter (sans) + JetBrains Mono (mono) from Google Fonts
- Brand colors match the app: cyan `#00E5C8`, amber `#FFB830`, base `#060C09`

## Sections

1. Sticky nav with brand + version chip
2. Hero — headline, subhead, phone mockup of the in-app dashboard, proof strip
3. Provider strip — OpenRouter / OpenAI / NVIDIA / Gemini / Groq / Cloudflare / DeepSeek / xAI + Custom
4. Problem → Solution (3 pain cards + the BotDroid pitch panel)
5. Features grid — 7 cards covering bot types, BYOK, channels, persistence, dashboard, security, template config
6. Bot Templates — real showcase of the 20 shipped templates (13 free, 7 Pro), split by tier, with the 2 in-development templates called out separately
7. What's New — shipped vs. coming-soon items for the current release, updated per release
8. How it works — 3 numbered steps with terminal-style snippets
9. Comparison — VPS vs Pi vs BotDroid table
10. Pricing — Free vs Pro ($2.99/mo or $29.99 lifetime) vs Cloud (coming soon, no signup capture)
11. FAQ — 15 questions covering uptime, secrets, Python, link summarization, ABI, billing, reboot, source, trial, on-device, templates
12. CTA — primary Play Store + secondary source notes + Reddit
13. Footer with product / resources / connect columns

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

## Positioning revamp (2026-09-27, `/project-manager`)

Site had been running 1+ month with real users; re-focused the whole page's direction from a
generic "run AI bots 24/7" pitch onto the actual product strength — the shipped 20-template
catalog. Removed the "coming soon" community-marketplace section (fake template chips + a
creator-revenue-share email waitlist) entirely, since it never shipped and this direction change
supersedes it — replaced with a real showcase of the 20 already-shipped templates, split
free/Pro, pulled from `android_app/app/src/main/assets/bot_templates.json`. The waitlist
mechanism (email capture form, `POST /api/waitlist`, `WAITLIST` KV namespace, the "join the
waitlist" link on the BotDroid Cloud pricing card) was removed site-wide, not just from that one
section — `worker.js` is now a plain assets passthrough. The Cloudflare KV namespace
(`53348a58774140d98c0f2e5e5745551d`) still exists in the account with any prior signups; it's
just no longer bound or referenced. Export or delete it manually if desired.

## Honesty guardrails (updated 2026-09-18, `android_app/docs/project/ISSUES.md` PM-028)

The copy intentionally avoids overclaiming what's actually shipped and verified:
- No WhatsApp claim (UI exists, no gateway) — kept it out of channel mentions.
- No "syntax-highlighted script editor" claim — `:app` ships a basic script editor only.
- Channel copy names **Telegram only** as device-verified end-to-end (`PicoclawChannel.isTested`,
  `android_app/docs/project/DECISIONS.md` PM-D16) — every other channel, **including Zalo**, is
  marked best-effort/"not tested," not "first-class."
- Provider copy lists the exact 8 built-in presets (`LlmConfigPresets.defaultProviders`) + Custom —
  not "6+".
- **Excluded on purpose (do not add back without re-checking `ISSUES.md`):** Telegram Storage
  (PM-065/074/075/076), the SME Knowledge Base Assistant (PM-071), and MCP server management
  (PM-070) — all have open device-QC gates or incomplete tickets as of 2026-09-18.
- **Templates section (added 2026-09-27):** counts as of that date are 13 free + 7 Pro = 20 shown
  as live, from `android_app/app/src/main/assets/bot_templates.json`. Two catalog entries that
  exist in that file — Crypto Assistant (PM-081, CoinGecko MCP) and Travel Assistant (PM-080,
  Gondola MCP) — are deliberately called out as "coming soon" instead, since both were still
  QC-unverified/not user-accepted at write time. Move them into the live list only once
  `ISSUES.md` shows them accepted, and recount before changing the "20" figure anywhere on the
  page.
- On-device LLM is described as shipped (free, device-gated ~4GB RAM, Telegram-only) with no
  speed/latency claims — its real-device QA matrix (PM-035) has never been run.
- The 7-day Pro-monthly trial is stated as fact because it's a live, verified Play/RevenueCat
  offer (`trial-7-day`, ACTIVE, confirmed 2026-09-18) — not a promo code, and not tied to Remote
  Config (the project does not operate Firebase Remote Config, PM-D7).
- Pricing numbers: $0 free / **$2.99/mo Pro** / $29.99 lifetime. Monthly was cut from $4.99
  2026-09-18 (`docs/PRICING.md`, confirmed live against RevenueCat `get-product-store-state`
  — US territory price `2990000` micros) — verify against that source before ever changing again.
- Comparison table is hedged with "comparison targets typical DIY deploy".
- Site version leads the Play Store on purpose (v1.4.0 hasn't been promoted to Play production
  yet) — an accepted, repeated PM-028 precedent, not an error.

## Next

- Footer "GitHub" (Connect column) and "X / Twitter" are still placeholder `#` links — no verified
  public BotDroid org/social account was available as of 2026-09-18 (PM-029 candidate).
- Replace the inline phone mockup with a real screen recording or screenshots once Play listing assets land (see `docs/delivery/2026-05-27-delivery-report.md`, Step 8).
- Add an OG image (`og.png`, 1200×630) once the brand kit is finalized.
- `version.json`'s `apkUrl` still 404s — `kaito-and-droid/botdroid` has 0 GitHub releases. Don't
  treat the `direct` update-check flow as live until that's published.
