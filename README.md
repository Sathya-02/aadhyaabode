# Aadhya Abode Website

Premium, fully furnished short-term luxury rentals and vacation stays in Kanyakumari, Tamil Nadu, India. This repository contains the Hugo-based marketing site for **Aadhya Abode** with a modern coastal luxury aesthetic.

## Tech Stack

- [Hugo](https://gohugo.io/) (static site generator)
- [Tailwind CSS](https://tailwindcss.com/) via CDN (can be swapped for compiled Tailwind later)
- Vanilla JavaScript for small interactions (mobile menu, property filter)

## Project Structure

```text
├── config.toml                 # Global site configuration & editable links
├── layouts/
│   ├── _default/
│   │   └── baseof.html        # Base layout with header/footer wrappers
│   ├── partials/
│   │   ├── header.html        # Sticky nav + WhatsApp CTA
│   │   ├── footer.html        # Dark footer with quick links & contact
│   │   └── scripts.html       # JS includes
│   └── index.html             # Home page sections & content
└── static/
    └── js/
        └── main.js            # Mobile menu toggle & property filter
```

- Images are currently loaded from Unsplash CDN placeholders. You can swap them to your own assets later.
- All external links (WhatsApp booking, Maps, social, contact) are configured in `config.toml` under `params`.

## Configuration

Open `config.toml` and update as needed:

- `params.contact.phone_display` and `phone_link`
- `params.contact.whatsapp_number` and `whatsapp_message`
- `params.links.whatsapp_booking` (pre-filled WhatsApp URL)
- `params.links.maps_url` (Google Maps location link)
- `params.footer.instagram` / `facebook`

These values are used throughout the layouts so you can change them in a single place.

## Running the site locally

### 1. Install Hugo (extended)

Follow the official installation guide: https://gohugo.io/installation/

Make sure the `hugo` command is available in your shell:

```bash
hugo version
```

### 2. Clone the repository

```bash
git clone https://github.com/Sathya-02/aadhyaabode.git
cd aadhyaabode
```

### 3. Start the development server

From the project root, run:

```bash
hugo server -D
```

Then open the URL printed in the terminal (by default):

- http://localhost:1313

Hugo will watch the files and live-reload as you edit layouts, content, or config.

## Building for production

To generate the static site into the `public/` directory:

```bash
hugo
```

The `public/` folder contains the fully static, production-ready HTML, CSS, and JS. You can deploy this folder to any static host (Netlify, Vercel, GitHub Pages, Nginx, etc.).

## Notes

- Tailwind is currently included via CDN in `layouts/_default/baseof.html`. For a highly optimized build, you can later integrate a Tailwind build pipeline (PostCSS/Hugo Pipes) to tree-shake unused classes.
- Google Maps is currently a placeholder link under the Location section. When ready, you can replace it with an embeddable iframe using the same URL from `config.toml`.
