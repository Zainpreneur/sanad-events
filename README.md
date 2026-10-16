# Sanad — Event Planning & Supply, Jeddah

A bilingual (EN / AR) marketing and booking site for **Sanad**, an event planning and event
supply house in Jeddah, Saudi Arabia. Zero runtime dependencies: plain HTML, CSS and ES
modules, served by a ~70-line Node static server.

**Live:** the published GitHub Pages URL is linked in the repository's *About* section.
Booking line: **+966 50 744 6780** (WhatsApp-enabled).

## What is in here

| File | Purpose |
| --- | --- |
| `index.html` | Portfolio: hero, about, services, supply inventory, process, capacity, portfolio gallery, packages, testimonials, FAQ, CTA |
| `booking.html` | Five-step enquiry wizard with live SAR estimate, validation, draft autosave and a printable receipt |
| `404.html` | GitHub Pages fallback page |
| `assets/styles.css` | Design system, animations, responsive rules (mobile-first, logical properties for RTL) |
| `assets/main.js` | i18n, scroll reveals, counters, parallax, particles, nav, gallery + lightbox, slider |
| `assets/booking.js` | Wizard state machine, validation, estimate model, review and confirmation |
| `assets/chat.js` | Front-end WhatsApp booking assistant (no server, no API keys) |
| `assets/img/` | Locally generated SVG demo imagery — swap for photography when available |
| `server.js` | Static file server with gzip |

## Features

- **Bilingual EN ⇄ العربية** with real RTL (CSS logical properties throughout, Arabic-Indic
  numerals, mirrored sliders, arrows and lightbox navigation)
- **Animations**: canvas gold-dust particles, aurora orbs, conic light rays, word-by-word
  headline reveal, scroll-linked progress, animated counters, 3D card tilt, parallax frames,
  infinite marquee, timeline fill, chat typing dots — all gated behind
  `prefers-reduced-motion` and `prefers-contrast`
- **WhatsApp assistant**: a guided six-question conversation that ends in a pre-filled
  `wa.me/966507446780` message. Floating icon button, keyboard-aware panel
  (`visualViewport`), internal scrolling, `localStorage` draft.
- **Accessible**: semantic landmarks, one `h1` per page, labelled controls, `aria-invalid`
  errors, focus-visible rings, `<dialog>` lightbox, `Escape` handling, skip link, live
  region for wizard steps.
- **Performance**: 13 inline-safe SVG images (340 KB total, ~25 KB gzipped each), lazy
  loading below the fold, `fetchpriority="high"` on the hero image, gzip from the server.

## Run locally

```bash
npm start            # http://localhost:3001
PORT=8080 npm start  # any port you like
```

No build step, no `npm install` — `node server.js` is the only requirement (Node 18+).

## Booking data

Submissions are **front-end only**: the wizard and the assistant keep their state in
`localStorage` (`sanad-draft`, `sanad-bookings`, `sanad-wa-chat`) and hand off to WhatsApp.
Wire a real backend by replacing the `finish()` handler in `assets/booking.js` and the
`openWhatsApp()` handler in `assets/chat.js`.

## Booking line

`+966 50 744 6780` — defined once in `assets/chat.js` (`NUMBER`) and referenced from the
nav, footer, CTAs and both language dictionaries. Update all of them together.

© 2026 Sanad Events Co. Jeddah · CR 4030512877 · VAT 300152187700003