# Sanad — frontend-design plan & critique

Applied per `frontend-design` skill (anthropics/skills, Apache-2.0): two passes — plan, then critique against templated defaults, then build.

## Subject matter (from brief)
- **Product:** Sanad — Event Planning & Supply, Jeddah, Saudi Arabia
- **Industry:** luxury event planning & event-supply rentals (weddings, corporate summits, exhibitions, khaldi nights)
- **Audience:** engaged couples, corporate clients, families
- **Primary job:** build trust through demonstrated capacity (860 events, 3,500 m² warehouse, 120 crew) → convert to a booking enquiry
- **Languages:** EN / AR bilingual, RTL
- **Existing aesthetic:** dark ink (#0b0b0f), gold (#d4af6a), Cormorant Garamond serif display, Inter/Tajawal sans body, mashrabiya pattern, animated hero orbs

## Pass 1 — design plan

**Color (4–6 named hex)**
- ink-900 `#08080b` — deepest dark
- ink-800 `#0b0b0f` — surface dark (primary background)
- gold-400 `#d4af6a` — primary accent
- ivory `#f6f1e7` — light surface, used sparingly
- paper `#fffdf9` — near-white surface
- clay `#b5566b` — secondary accent

**Type**
- Display: Cormorant Garamond (serif) — headlines
- Body EN: Inter (sans)
- Body AR: Tajawal (sans)

**Layout**
- Shell-constrained (~78rem max), mobile-first
- Breakpoints 40 / 60 / 75rem
- Body left-aligned (EN) / right-aligned (AR); never justified
- Hero opens with the characteristic moment: warehouse/yard imagery + bold headline

**Principles**
- Spend boldness in one place: hero headline sheen + orbs; everything else quiet and disciplined
- Bilingual first-class support (EN/AR parity)
- Cut decoration that does not serve the brief

## Pass 2 — critique against templated defaults

| Default trait (skill) | Sanad before | Verdict | Change |
|---|---|---|---|
| Warm cream `#F4F1EA` + serif + terracotta `#D97757` | ivory `#f6f1e7` exists but dark is primary, gold not terracotta | OK | — |
| Near-black + acid green / vermilion | gold accent | OK | — |
| SaaS-card kit: identical rounded cards + same soft shadow | radius varies by hierarchy (tier `--r-lg`, card `--r-md`, chip `--r-pill`) | OK | — |
| **ALL-CAPS eyebrow labels** | `.section__eyebrow` & `.eyebrow` used `text-transform: uppercase` | FIX | removed uppercase; sentence case shown via copy |
| **Middle dots in meta strings** | `hero.eyebrow` / `bk.eyebrow` "A · B · C" | FIX | dots → commas |
| `→` on links/buttons, monospace data labels | absent | OK | — |
| Tinted near-black `#0B0B0B`/`#111` as black | `--ink-800 #0b0b0f` is core brand dark | keep | brief's direction wins |

**Line lengths:** all `< 80ch` (body `68ch`, CTA lede `44ch`, quotes `30ch`) ✓  
**CTAs active voice:** "Start your booking", "Book this package", "Send enquiry" ✓  
**Errors:** state cause + fix (e.g. "Use a Saudi mobile: 05XXXXXXXX") ✓  
**Reduced motion / focus-visible / landmarks / skip link / one h1 per page:** already correct (verified against ui-ux-pro-max rules too) ✓

## Build changes
1. `assets/styles.css` — removed `text-transform: uppercase` from `.section__eyebrow`, `.eyebrow`, `.tier__price` (tightened letter-spacing for sentence case)
2. `assets/main.js`, `assets/booking.js`, `index.html`, `booking.html` — eyebrow copy middle dots → commas

## Notes for future passes
- Tried keeping the dark brand as primary (it is the brief's direction, per "the brief's own words always win"); only the all-caps + middle-dot template chrome was removed.
- Cursor glow, scroll progress, and pulse on eyebrows are kept as subtle, deliberate decoration — not scattered fade/slide-up reveals on every card (the generic default the skill warns against).
