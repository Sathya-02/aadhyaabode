# Aadhya Abode — Premium Coastal Luxury Stays in Kanyakumari

> **Property:** Aadhya Abode | **Location:** Kanyakumari, Tamil Nadu, India  
> **Business Model:** Premium, fully furnished short-term luxury rentals & vacation stays  
> **Website Type:** Highly optimised multi-page static website

This repository contains the complete Hugo-based marketing site for **Aadhya Abode** — a premium short-term rental property at the southern tip of India, where the Bay of Bengal, the Arabian Sea, and the Indian Ocean converge.

---

## Design & Aesthetic Guidelines

| Dimension | Decision |
|---|---|
| **Theme** | Modern coastal luxury · warm hospitality |
| **Primary colour** | Deep Ocean Blue / Elegant Teal (`teal-600` / `teal-700`) |
| **Accent colour** | Golden Sunset Gold / Amber (`amber-400`) for CTAs, badges, highlights |
| **Backgrounds** | Pure white (`white`) and soft slate (`slate-50`) |
| **Typography** | Inter (Google Fonts) — elegant sans-serif, 400/500/600/700 weights |
| **Motion** | Subtle `hover:-translate-y-0.5` lifts on buttons; no heavy animations |

---

## Tech Stack

- **[Hugo](https://gohugo.io/)** — static site generator (extended version required)
- **[Tailwind CSS](https://tailwindcss.com/)** via CDN (swap for compiled Tailwind + PostCSS for production optimisation)
- **Vanilla JavaScript** — mobile burger menu toggle, property type filter, gallery lightbox
- **Data-driven layouts** — all copy and room cards are in YAML data files, not hardcoded in templates

---

## Project Structure

```text
aadhyaabode/
├── config.toml                  # Global site config & all configurable external links
├── data/
│   ├── content.yaml             # All guest-facing static copy (hero, amenities, policies, etc.)
│   └── abodes.yaml              # Configurable room / abode card definitions
├── layouts/
│   ├── _default/
│   │   └── baseof.html          # Base HTML shell — fonts, hero CSS, main wrapper
│   ├── partials/
│   │   ├── header.html          # Sticky nav, WhatsApp CTA (desktop), floating WhatsApp (mobile)
│   │   ├── footer.html          # Dark footer — quick links, contact, social, copyright
│   │   └── scripts.html        # JS includes (deferred)
│   └── index.html               # Home page — all sections, fully data-driven
└── static/
    ├── images/
    │   ├── hero/                # hero-1.jpg, hero-2.jpg, hero-3.jpg
    │   ├── gallery/             # gallery-1.jpg … gallery-N.jpg
    │   ├── abodes/              # per-room images referenced in data/abodes.yaml
    │   └── map-aadhya-abode.png # Static map screenshot for the Location section
    ├── videos/                  # Optional mp4/webm assets
    └── js/
        └── main.js              # Mobile menu toggle · property filter · gallery lightbox
```

**Key principle:** images and static content live in `static/`. External links and configurable strings live in `config.toml`. Guest-facing copy lives in `data/content.yaml`. Room card data lives in `data/abodes.yaml`.

---

## Page Sections (Home)

| # | Section ID | Description |
|---|---|---|
| 1 | `#hero` | Full-viewport hero — coastal image, headline, two CTAs |
| 2 | `#gallery` | Horizontal scroll gallery with lightbox |
| 3 | `#abodes` | Interactive property grid with type filter |
| 4 | `#amenities` | All-in-one comfort services (4-column icon grid) |
| 5 | `#policies` | Booking, payment & cancellation policies (3-column) |
| 6 | `#location` | Location highlights + Google Maps placeholder |

All nav anchor links use `scroll-mt-20` on each section so headings land cleanly below the sticky header.

---

## Configuration

### Contact & External Links — `config.toml`

All external links and contact details are centralised in `config.toml` under `[params]`. Update once; they propagate everywhere.

```toml
[params.contact]
phone_display = "+91 80151 60563"
phone_link    = "tel:+918015160563"
email         = "stay@aadhyaabode.com"

[params.links]
whatsapp_booking = "https://wa.me/8015160563?text=Hi%20Aadhya%20Abode,%20I'd%20like%20to%20check%20availability"
maps_url         = "https://maps.app.goo.gl/8hFLJTv4RXsi5u2EA"

[params.footer]
instagram = "https://instagram.com/aadhyaabode"
facebook  = "https://facebook.com/aadhyaabode"
```

### Static Copy — `data/content.yaml`

All guest-facing section text (hero tag/title/subtitle, amenities, policies, location bullets, trust cards) lives here. Edit this file to update copy without touching layouts.

### Room Cards — `data/abodes.yaml`

Each abode card is one YAML block:

```yaml
- id: premium-1bhk
  type: "1bhk"           # matches filter pill data-filter value
  badge: "Premium 1BHK Room"
  title: "Premium 1BHK Room"
  tagline: "Ideal for couples or solo travellers."
  image: "/images/abodes/premium-1bhk.jpg"
  alt: "Premium 1BHK room interior"
  gallery:
    - "/images/abodes/premium-1bhk-2.jpg"
  bullets:
    - "Fully air-conditioned bedroom"
    - "Dedicated work desk & ergonomic chair"
    - "Smart TV with OTT apps"
  suitability: "Perfect for couples"
  occupancy: "Max 2 guests"
```

To **add** a new room type: append a block with a unique `id` and `type`. The grid updates automatically.  
To **remove** a room: delete its block from the file.  
To **add a new filter pill**: add a `<button>` in the filter row in `layouts/index.html` with the matching `data-filter` value.

---

## Core Functionalities

### Sticky Conversion Touchpoints
- **Desktop header**: prominent `[ WhatsApp Booking ]` button (teal, rounded-full) linking to the pre-filled WhatsApp API URL from `config.toml`.
- **Mobile**: floating `position: fixed` WhatsApp circle button (`bottom-4 right-4`), always visible while scrolling.

### Property Grid Filter
Filter pills (`All`, `Luxury 2BHK`, etc.) are powered by lightweight vanilla JS in `static/js/main.js`. To add a new tier, add a `data-filter` button in `layouts/index.html` and tag room cards with the matching `data-type`.

### Hero Section
- Full-viewport: `height: calc(100dvh - 4rem)` (viewport minus the `h-16` sticky header), `min-height: 480px`.
- Desktop: horizontal snap-scroll carousel of hero images.
- Mobile: single static image (`gallery-9.jpg` by default).
- Overlay: soft `linear-gradient(to bottom, 0.25 → 0.70 opacity)` so the background image remains fully visible while text stays readable.

### Gallery Lightbox
Horizontal scroll strip with click-to-enlarge lightbox, handled in `main.js`.

---

## Known Fixes Applied

| Fix | File(s) Changed | Detail |
|---|---|---|
| Hero image not visible (overlay too dark) | `baseof.html` | Replaced radial overlay (0.6–0.85) with linear-gradient (0.25→0.70) |
| Hero not filling full viewport | `baseof.html`, `index.html` | Added `.hero-fullscreen` CSS class using `calc(100dvh - 4rem)`; removed fixed `h-[520px]` |
| Content slipping under sticky header | `baseof.html`, `index.html` | Removed `pt-28` from `<main>`; added `scroll-mt-20` to all non-hero sections |
| Section titles not aligning below header on anchor scroll | `index.html` | All sections use `scroll-mt-20`; hero has no `scroll-mt` (it sits at top) |

---

## Running Locally

### Prerequisites

- Hugo Extended ≥ 0.120: https://gohugo.io/installation/

```bash
hugo version
# Should show "hugo v0.120+ extended ..."
```

### Development server

```bash
git clone https://github.com/Sathya-02/aadhyaabode.git
cd aadhyaabode
hugo server -D
# Open http://localhost:1313
```

Hugo watches for changes and live-reloads automatically.

### Production build

```bash
hugo
# Output in public/ — deploy this folder
```

The `public/` folder is fully static and can be deployed to **Netlify**, **Vercel**, **GitHub Pages**, **Nginx**, or any static host.

---

## Deployment Notes

- `public/` is gitignored by default — only source files are tracked.
- Tailwind CSS is currently loaded via CDN. For production, integrate a PostCSS / Hugo Pipes build to tree-shake unused classes and reduce CSS size.
- Google Maps in the Location section is currently a static screenshot (`map-aadhya-abode.png`) + a link. Replace with a full `<iframe>` embed when an embeddable URL is available — just update `layouts/index.html` inside `#location`.
- WhatsApp booking URL and all contact details are single-source in `config.toml` — update once for site-wide changes.

---

## Roadmap / Future Enhancements

- [ ] Extract abodes into individual Hugo content pages (`content/abodes/*.md`) for dedicated detail pages with SEO-friendly URLs.
- [ ] Compile Tailwind CSS via Hugo Pipes / PostCSS for optimised production CSS.
- [ ] Add Google Maps `<iframe>` embed in the Location section.
- [ ] Integrate a review/testimonials data file (`data/reviews.yaml`) rendered as trust cards.
- [ ] Add a "Seasonal Pricing" or "Availability Calendar" section.
- [ ] Progressive Web App (PWA) manifest for mobile home-screen install.

---

## Space Context

This project is maintained under the **Aadhya Abode** Space in Perplexity, which preserves the full conversation context across sessions — including design decisions, section wireframe specs, tech constraints, and iterative layout fixes. The Space is configured to prioritise `github.com/Sathya-02/aadhyaabode` as its primary source, so all future prompts in that Space will automatically have repo awareness and continuity with decisions documented here.

---

*Built with Hugo · Tailwind CSS · Vanilla JS · Coastal love from Kanyakumari* 🌊
