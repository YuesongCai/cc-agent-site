# CC Agent — Website Design System

The design language for the CC Agent marketing site. English-only. Warm, humanist, editorial. Built once here, implemented as CSS custom properties.

> Design read: enterprise AI-infrastructure landing for Chinese enterprise buyers with overseas entities and technical evaluators. Trust-first, but the brand should feel human, calm, and premium, in the family of anthropic.com and microsoft.ai. "Technology that is accessible for everyone." Reliable, not tacky-tech.
> Dials: DESIGN_VARIANCE 6 · MOTION_INTENSITY 4 (calm, motivated) · VISUAL_DENSITY 3 (airy, premium).
> Skill note: the design-taste skill bans the cream + terracotta + Fraunces palette as a lazy default. This system avoids that family deliberately: the base is a cool mauve-grey (not warm cream), the accent is a muted plum/aubergine (not terracotta, brass, or oxblood), and the serif is Newsreader (never Fraunces or Instrument Serif). The warm humanist direction is an explicit, articulated brand brief, not a default reach.

---

## 1. Brand & voice

- **Positioning:** a compliant, enterprise-grade AI gateway. We sell governance, compliance, local delivery, and channel pricing as one package, not the cheapest token.
- **Feel:** warm, human, calm, confident, reliable. Editorial, not "dark hacker tech." Technology made legible and trustworthy for the people who have to sign for it.
- **Tone:** precise and plain. No hype verbs (no "elevate / seamless / unleash / next-gen / revolutionize").
- **Hard copy rules:** zero em-dashes anywhere. No fabricated customer logos, counts, or pricing numbers. Channel-resale claims always carry the "subject to AWS / Anthropic official authorization and per-model limits" hedge.

## 2. Color (warm, light-primary) — Aubergine

One warm system, two surfaces: a soft mauve-grey paper canvas (primary) and a warm aubergine near-black for occasional contrast blocks. Both share the same warm-cool undertone, so it reads as one world. Single accent: a muted plum, used sparingly as signal. Distinct from Anthropic's terracotta and from generic tech blue.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F1EEEF` | page canvas |
| `--surface` | `#FAF8F8` | cards, raised surfaces |
| `--muted` | `#E8E3E5` | subtle fills, alt rows |
| `--ink` | `#221C28` | headings, body, warm-dark blocks |
| `--ink-soft` | `#5A5060` | secondary text |
| `--ink-faint` | `#8B8290` | captions, meta, labels |
| `--line` | `rgba(34,28,40,.12)` | hairlines |
| `--line-2` | `rgba(34,28,40,.22)` | stronger borders |
| `--plum` | `#7A4A72` | accent: links, marks, highlights, accent text (AA on paper) |
| `--plum-deep` | `#5E3656` | accent on light buttons, hover |
| `--plum-soft` | `rgba(122,74,114,.10)` | accent wash, tints |

On warm-dark blocks (`background: var(--ink)`): text becomes `--paper`, lines become `rgba(241,238,239,.14)`, accent lightens to `#B07FA6` for legibility.

Rules: plum is signal, never a background field; roughly one-tenth of the surface area. Plum passes AA as text on paper (~6:1) so links and accent text are fine, but body stays ink. No gradients, no glows, no neon. Shadows are warm-tinted and used only on genuinely raised surfaces.

## 3. Typography

Three families with clear roles. Serif carries the human, editorial voice.

- **Display + headlines:** `Newsreader` (variable humanist serif, warm, true italics). Weights 400 / 500, italic for in-headline emphasis (same family, never a foreign serif dropped into a sans).
- **Body + UI:** `Hanken Grotesk` (warm humanist sans, readable, not Inter). Weights 400 / 500 / 700.
- **Data / labels / code:** `IBM Plex Mono`. Weights 400 / 500. Used for eyebrows, route records, `upstream_vendor/model/region`, and code.

Scale (fluid via `clamp`):

| Token | Size | Family | Role |
|---|---|---|---|
| `--fs-display` | `clamp(2.75rem, 6.5vw, 5rem)` | Newsreader 400 | hero H1 |
| `--fs-h2` | `clamp(2rem, 4vw, 3.25rem)` | Newsreader 400 | section titles |
| `--fs-h3` | `1.25rem` | Newsreader 500 | card / item titles |
| `--fs-body` | `1.0625rem` | Hanken Grotesk 400 | body |
| `--fs-sm` | `0.9375rem` | Hanken Grotesk 400 | secondary |
| `--fs-mono` | `0.8125rem` | IBM Plex Mono | eyebrows, labels, data |

Display and section titles: serif, tracking `-0.015em`, `line-height 1.05`. Body: `line-height 1.7`, `max-width 62ch`. Eyebrows and labels: mono, uppercase, `letter-spacing 0.16em`, in `--plum` or `--ink-faint`.

## 4. Spacing, radius, layout

- **Space scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px.
- **Section rhythm:** `padding-block: clamp(6rem, 11vw, 9rem)` (airy, density 3).
- **Container:** `max-width 1180px`, side padding `clamp(1.25rem, 5vw, 2.5rem)`.
- **Breakpoints:** sm 640 · md 768 · lg 1024 · xl 1280. High-variance grids collapse to single column below 768.
- **Radius (one system):** cards/surfaces `16px`, inputs `12px`, chips/labels and all buttons `999px` (pill). Generous, soft, friendly, which supports the "accessible to everyone" read.
- **Shadows:** warm-tinted (`0 20px 50px rgba(34,28,40,.08)`), only on raised surfaces.

## 5. Motion (MOTION_INTENSITY 4, calm)

Quieter than a typical agency site, to feel reliable. Every animation is motivated.

- **Scroll reveal:** opacity 0 to 1, `y: 20 to 0`, stagger ~70ms, ease `[0.16,1,0.3,1]`. Content arrives as you read.
- **Hero diagram:** routing wires draw in once. Storytelling, not loop.
- **Nav:** condenses with a hairline after scroll. Feedback.
- **Buttons / links:** soft `:active` translateY(1px), plum underline grows on link hover.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables all motion; content renders static and complete. Mandatory.
- No marquees, no scroll cues, no infinite loops on content.

## 6. Components

- **Buttons** `.btn` (pill): `--primary` is ink fill with paper text (the dark, highest-contrast primary); `--plum` is plum-deep fill with paper text (AA verified); `--ghost` is transparent with `--line-2` border. Sizes `--sm`, `--lg`. One label per intent ("Book a demo" everywhere).
- **Eyebrow** `.eyebrow`: mono uppercase, plum. Budget at most one per three sections.
- **Cards** `.card`: surface fill, hairline border, 16px radius, serif title + sans body.
- **Bento:** asymmetric grid, exact cell count, rhythm not repetition. At least 2 to 3 cells carry real visual variation (plum wash, mono data, one warm-dark cell).
- **Ticks** `.ticks`: plum check + line, for short verified-claim lists.
- **Record** `.record`: a warm-dark mono card representing a `usage_event`, clearly labeled illustrative. A data artifact, not a fake product screenshot. Doubles as the page's warm-dark contrast moment.
- **Diagram** `.diagram`: hero routing schematic (client to gateway to Bedrock multi-region / Anthropic failover). Carries meaning.
- **Logo mark:** a rounded-square boundary containing one inbound node routed to three upstream nodes. Reads as "governed gateway, routing transparently." Renders in plum on paper, paper on ink, single-color on plum.

## 7. Iconography & imagery

- **Icons:** Phosphor (regular weight) via CDN. One family, consistent weight, plum or ink. No hand-rolled icon paths.
- **Logos:** real marks via Simple Icons (AWS, Anthropic) with text fallback. Framed as the supply/channel stack, not customer social proof. Logos only, no category labels.
- **No** div-based fake screenshots, no gradients-as-decoration, no stock-photo filler. The hero diagram, the logo mark, and the `usage_event` record are the custom visuals; all three carry meaning.

## 8. Accessibility

- Contrast: body and labels meet WCAG AA against their surface; plum used as accent text only at larger sizes or as underlined links. Ink-on-paper and paper-on-ink both verified.
- Visible focus rings (plum), skip link, semantic landmarks, `prefers-reduced-motion` honored.
- Mobile: every multi-column block declares its single-column fallback.
