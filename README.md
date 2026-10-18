# Hieron Textile & Promotion — website

Product showcase and quote-request website, in **English, French, Turkish, Arabic (right-to-left) and Russian**.

## Run it

```bash
npm install      # only needed once
npm run dev      # then open http://localhost:3000
```

For the live version: `npm run build` then `npm start`.

Visitors are sent to their browser's language automatically (`/en`, `/fr`, `/tr`, `/ar`, `/ru`), and can switch with the globe menu in the header.

## Catalogue

229 products in four collections:

| Collection | Categories |
| --- | --- |
| Hotel | Towels · Bathrobes · Bath Mats · Bed Linen · Beach & Pool · Amenities & Room Sets |
| Home | Botanical · Hieroglyphs · Marine · Luxury · Bed & Mattress · Baby & Kids |
| Promotion | Wristbands/Lanyards/Keychains · Caps & Beanies · Sweatshirts & T-Shirts · Sportswear · Socks · Kitchen & Bar · Bags · Towels & Blankets · Pillows & Pet Beds · Business Gifts · Flags & Fan Items · Uniforms |
| Fabric & Yarn Export | Woven Fabrics (plain, twill, panama, half-panama, ripstop, microfiber) · Yarns & Filaments (cotton, polyester, blends, filament) |

Fabrics are requested in metres and yarns in kilograms; everything else in pieces. The export page text is in `lib/export-content.ts`.

## Where things are

| What | Where |
| --- | --- |
| Products (names in 5 languages, category, photos) | `lib/products.json` |
| Collections, categories, specs, sizes, branding options, contact details, certificates | `lib/structure.ts` |
| All interface text in 5 languages | `lib/i18n.ts` |
| Product photos (WebP, 1600 px) | `public/images/p/` |
| Certificate logos (ISO 9001, OEKO-TEX, GOTS, GRS) | `public/images/certs/` |
| Brand colours and fonts | `app/globals.css` |
| Pages | `app/[locale]/` |

### Adding a product

1. Save the photo(s) as WebP in `public/images/p/`, named `your-product-1.webp`, `your-product-2.webp`, …
2. Add an entry to `lib/products.json` (copy an existing one): `slug`, `division` (`hotel`, `home`, `promo` or `export`), `category`, the name in the 5 languages, and the image list.

Photos are served automatically as AVIF/WebP at the right size for each screen.

## Client requests

Clients add products to a request list (size, finish/branding, quantity), then send their details from **Request a Quote**.

- Every request is saved to `data/requests.json`, with the language the client used.
- View them at **/admin** — the login is `ADMIN_USER` / `ADMIN_PASSWORD` in `.env.local`.
- To also get each request by email, fill in the `SMTP_*` values in `.env.local` (see `.env.example`).
