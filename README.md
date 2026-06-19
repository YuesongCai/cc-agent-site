# CC Agent — marketing site

The public marketing site for CC Agent: the governance gateway / API hub for enterprise AI. One API to route, govern, and audit every call your agents make. Claude on Amazon Bedrock today, model-agnostic by design.

Static, no build step. Open `index.html` or serve the folder.

## Run locally

```sh
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

## Pages (information architecture)

Nav: **Home · Platform · Models · Solutions · Trust · Pricing** (+ a persistent **Book a demo** CTA). Each page owns one job, to avoid the repetition the earlier version had.

| File | Job |
|---|---|
| `index.html` | Home. Sells the positioning and routes each visitor to the page that owns their question. Interactive product preview (Routing / Cost / Audit / Guardrails). |
| `platform.html` | What the product is, for the integrator: multi-model routing + named modes, reconcilable cost, budgets, guardrails, reliability, architecture. |
| `models.html` | The catalog + provider-routing table. Claude (Opus/Sonnet/Haiku) on Bedrock is **available now**; other vendors are tagged **roadmap / soon**. |
| `solutions.html` | Buyer/outcome axis: the buying-committee (Finance / Risk / Engineering) and **Who we serve** (ICP segments). |
| `trust.html` | The single owner of the compliance story: controls, the canonical `usage_event` audit record, and the "what we will not do" nevers. |
| `pricing.html` | The single owner of commercial claims: BYOA vs Managed, no-markup-on-BYOA, the AWS-channel motion, getting started, and the FAQ. |
| `docs.html` | Quickstart, API compatibility (Anthropic Messages live; OpenAI Chat Completions in progress), routing-mode reference. |
| `security.html` `status.html` `company.html` `careers.html` `privacy.html` `terms.html` | Footer pages, simple but real. |
| `design-system.html` | Standalone design-system reference (not in the nav). |

## How it's built

- **Shared chrome in JS.** `main.js` injects the nav, footer, and modals into every page, so the chrome stays identical. Each page is just `<head>` (SEO) + `<body data-page="…">` + `<header id="nav"></header>` + `<main>` + `<div id="site-footer"></div>` + `<script src="main.js">`.
- **One stylesheet.** `styles.css` holds the whole design system as CSS custom properties. See `DESIGN.md` for the system (warm "Aubergine" palette, Newsreader serif + Hanken Grotesk + IBM Plex Mono, motion rules).
- **Interactions** (all in `main.js`): scroll-reveal, the product-preview tabs, click-to-open card modals, the smooth single-open FAQ accordion, the mobile nav, and the demo form.
- **No tracking, no analytics, no cookies.**

## Demo form

The **Book a demo** button opens a lead-capture form. By default it composes an email to `yuesong.cai@outlook.com` (works with zero backend). To deliver it server-side without the visitor's mail client, create a free [Web3Forms](https://web3forms.com) access key (verify `yuesong.cai@outlook.com`) and paste it into `WEB3FORMS_KEY` near the top of `main.js`.

## SEO

Each page has a unique title/description, canonical, Open Graph + Twitter cards, and JSON-LD (`Organization` + `WebPage`, plus `FAQPage` on Pricing). Plus `robots.txt`, `sitemap.xml`, and `og.svg`.

> The canonical / OG URLs use the placeholder domain `https://ccagent.example`. Replace it with the real domain before launch (search-and-replace across the `.html` files, `sitemap.xml`, and `robots.txt`).

## Content guardrails

Bold "every model" brand positioning, but availability is tagged honestly (Claude live; others roadmap). No fabricated metrics or "verified" badges, no pricing markup/margin numbers, no claimed certifications, SLA framed as design intent, and channel/resale mentions carry the "subject to AWS and Anthropic authorization and per-model limits" hedge.
