# Review Screenshots

Drop your Airbnb and Google review screenshot images into this folder.

## Naming Convention

Files must match the `filename` values in `data/content.yaml` exactly:

| File | Source |
|------|--------|
| `airbnb-review-1.jpg` | Screenshot from Airbnb listing review |
| `airbnb-review-2.jpg` | Screenshot from Airbnb listing review |
| `airbnb-review-3.jpg` | Screenshot from Airbnb listing review |
| `airbnb-review-4.jpg` | Screenshot from Airbnb listing review |
| `airbnb-review-5.jpg` | Screenshot from Airbnb listing review |
| `google-review-1.jpg` | Screenshot from Google Maps review |
| `google-review-2.jpg` | Screenshot from Google Maps review |
| `google-review-3.jpg` | Screenshot from Google Maps review |
| `google-review-4.jpg` | Screenshot from Google Maps review |
| `google-review-5.jpg` | Screenshot from Google Maps review |

## How to Take Screenshots

### Airbnb
1. Go to your Airbnb listing page.
2. Scroll to the **Reviews** section.
3. Screenshot each individual review card (include the guest name, stars, and review text).
4. Crop to the card boundary. Recommended width: 540px.

### Google
1. Search for **Aadhya Abode Kanyakumari** on Google Maps.
2. Click **Reviews** tab on the listing.
3. Screenshot each review card (include the reviewer name, star rating, and text).
4. Crop to the card boundary. Recommended width: 540px.

## Format

- Format: **JPG or PNG** (JPG preferred for smaller file size)
- Width: **540px** recommended
- Quality: Compress to under **150 KB** per image for fast page loads
- You can use [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) to compress.

## Adding More Reviews

To add more screenshots, add a new entry in `data/content.yaml` under `testimonials.reviews`:

```yaml
- platform: "Airbnb"          # or "Google"
  filename: "airbnb-review-6.jpg"
  screenshot: "/images/reviews/airbnb-review-6.jpg"
  alt: "Airbnb guest review screenshot — 5 stars"
  link: ""                    # optional: paste the direct URL to the review
```

Then drop the image file here. No template changes needed.
