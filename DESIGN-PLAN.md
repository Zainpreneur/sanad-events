# Sanad — frontend-design plan & critique

Applied per `frontend-design` (anthropics/skills, Apache-2.0): two passes — plan, then critique against templated defaults, then build. Sanad is already subject-grounded (Jeddah event planning & supply; dark ink + gold + Cormorant Garamond; mashrabiya pattern), so this run sharpens rather than repaints.

## Subject matter (from brief)
- **Product:** Sanad — Event Planning & Supply, Jeddah, Saudi Arabia
- **Industry:** luxury event planning & event-supply rentals (weddings, corporate summits, exhibitions, khaldi nights)
- **Audience:** engaged couples, corporate clients, families
- **Primary job:** build trust through demonstrated capacity (860 events, 3,500 m² warehouse, 120 crew) → convert to a booking enquiry
- **Languages:** EN / AR bilingual, RTL
- **The memorable thing:** the headline + warehouse/yard imagery — not a generic stat band

## Pass 1 — design plan

**Color (named hex)**
- `--ink-900 #08080b` — deepest dark, primary text on light surfaces
- `--ink-800 #0b0b0f` — surface dark (dominant page background)
- `--gold-400 #d4af6a` — primary accent (CTA, focus, highlights)
- `--ivory #f6f1e7` — light surface, used sparingly (light sections)
- `--paper #fffdf9` — near-white card surface
- `--clay #b5566b` — secondary accent (required-field markers)

**Type**
- Display/headlines: Cormorant Garamond (serif) — the personality of the page
- Body EN: Inter (sans)
- Body AR: Tajawal (sans)
- One family pair, clearly distinct; no all-caps labels; sentence case everywhere

**Layout (one-sentence prose + ASCII wireframes)**
- Shell: fixed header, full-bleed hero, section-constrained content (~78rem shell), footer. Mobile-first; breakpoints 40 / 60 / 75rem.
- Alignment: left-aligned (EN) / right-aligned (AR); never justified; line length < 80ch.

```
Desktop (≥75rem)                            Mobile (<40rem)
+-----------------------------------------+  +-----------------------------------------+
| header (fixed)                          |  | header (fixed)                          |
|                                         |  |                                         |
|   HERO (full viewport)                  |  |   HERO (full viewport)                  |
|   · eyebrow    (single moment)          |  |   · eyebrow    (single moment)          |
|   · headline   (word-split reveal)      |  |   · headline   (word-split reveal)      |
|   · lede  <80ch                         |  |   · lede  <80ch                         |
|   · CTA                                    |  |   · CTA                                 |
|                                         |  |                                         |
|   section (shell-constrained)           |  |   section (full-bleed)                  |
|   · eyebrow                              |  |   · eyebrow                              |
|   · h2                                   |  |   · h2                                   |
|   · cards / timeline / gallery           |  |   · cards / timeline / gallery (1 col)  |
|                                         |  |                                         |
+-----------------------------------------+  +-----------------------------------------+
| footer                                  |  | footer                                  |
+-----------------------------------------+  +-----------------------------------------+
```

**Principles**
- Spend boldness in one place: hero headline sheen + word-split reveal + orbs; everything around it quiet and disciplined.
- Cut scattered decoration: no fade-and-slide-up on every section (the generic default); motion answers a user action (hover, tap, open, confirm) or is the single load-time hero reveal.
- Bilingual parity: EN/AR copy, direction, and typeface treated equally.

## Pass 2 — critique against templated defaults

| Default trait (skill) | Sanad before | Verdict | Change |
|---|---|---|---|
| Warm cream `#F4F1EA` + serif + terracotta `#D97757` | ivory exists but dark is primary, gold not terracotta | OK | — |
| Near-black + acid green / vermilion | gold accent | OK | — |
| SaaS-card kit: identical rounded cards + same soft shadow | radius varies by hierarchy (tier `--r-lg`, card `--r-md`, chip `--r-pill`) | OK | — |
| **ALL-CAPS eyebrow labels** | `.section__eyebrow`, `.eyebrow`, `.tier__price` uppercase | FIX | removed uppercase (sentence case via copy) |
| **Middle dots in meta strings** | `hero.eyebrow` / `bk.eyebrow` "A · B · C" | FIX | dots → commas (EN + AR) |
| `→` on links/buttons, monospace data labels | absent | OK | — |
| **Fade-and-slide-up on every section** | `.reveal` IO on every section + staggered counters | FIX | single orchestrated hero reveal only |
| **Hover transition on every card** | card hover lift + shadow | OK | user-triggered motion — welcome |

**Line lengths:** all < 80ch (body 68ch, CTA lede 44ch, quotes 30ch) ✓  
**CTAs active voice:** "Start your booking", "Book this package", "Send enquiry" ✓  
**Errors:** cause + fix ✓  
**Reduced motion / focus-visible / landmarks / skip link / one h1 per page:** ✓ (verified vs. ui-ux-pro-max)

## Build changes
1. `assets/main.js` — reveal: keep the single orchestrated hero word-split reveal on load; drop the per-section IntersectionObserver fade-and-slide-up so sections are static by default. `prefers-reduced-motion` still respected (hero reveal skipped, everything instant).
2. `assets/styles.css` — `.reveal` no longer fades/slides on scroll; only `.reveal--load` (hero eyebrow + title) animates on page load.
3. Copy: sentence-case eyebrows, comma-separated meta (EN + AR) — already done in prior commit.

## Notes for future passes
- Dark brand as primary is kept: it is the brief's direction ("the brief's own words always win").
- Cursor glow, scroll progress, and the eyebrow pulse are kept as subtle, deliberate decoration — not scattered reveals on every card.
