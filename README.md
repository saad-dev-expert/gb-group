# GB GROUP — Official Website

> Brand: **GB GROUP** (the domain is only a web address, never the brand)
> Consultancy / agency · Jharkhand & West Bengal · CEO Mohit Mallar
> www.gbgroup.in

A visual-first, static marketing website for four service verticals:

1. **Transport & Export** — `/services/transport-export`
2. **Education & Placement** — `/services/education-placement`
3. **Land Sales & Joint Ventures** — `/services/land-joint-work`
4. **Advertisement & Marketing** — `/services/advertising-marketing`

Plus a filterable [property portfolio](/land-joint-venture), About, Contact, Privacy Policy, Terms and a branded 404 page.

---

## Stack

- Astro 4 (static output), vanilla CSS design system, no UI framework
- `@astrojs/sitemap` generates `sitemap-index.xml` / `sitemap-0.xml` at build time
- All imagery and the logo are local, optimised WebP/SVG assets in `public/`
- No backend is required, but a configurable lead endpoint is supported (see below)

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # Astro diagnostics
npm run build    # outputs static site to dist/
npm run preview  # preview the production build
```

Deploy the contents of `dist/` to any static host. `trailingSlash: 'never'` is configured; verify that the host serves `/about` (not only `/about/`) so canonical URLs resolve correctly.

## Configuration

Brand, contact details, navigation, services, listings and FAQs live in **`src/config/site.ts`**. Change the domain and contact information there — it feeds canonical URLs, JSON-LD, forms, header and footer.

Optional integrations are read from environment variables. Copy `.env.example` to `.env`:

| Variable | Purpose |
|---|---|
| `PUBLIC_GA_ID` | GA4 measurement ID (`G-…`). If empty, no analytics script loads. |
| `PUBLIC_LEAD_ENDPOINT` | HTTPS JSON `POST` endpoint for enquiries. If empty, the form opens a prefilled WhatsApp message and offers an email fallback. |

Lead endpoint payload:

```json
{
  "name": "…", "phone": "10 digits", "email": "optional",
  "service": "…", "message": "…", "source": "contact",
  "submittedAt": "ISO timestamp"
}
```

When an endpoint is configured but unavailable, the form falls back to WhatsApp and tells the user. No lead is silently discarded.

## Tracking

Contact links carry `data-track` attributes. Events fired via `gtag` when analytics is enabled: `contact_call`, `contact_whatsapp`, `contact_email`, `enquiry_submit`, `enquiry_success`, `enquiry_validation_error`, `property_filter`.

## Content notes

- Photographs are **representative imagery** sourced from Unsplash and Wikimedia Commons, stored locally as WebP. They do not depict specific GB GROUP clients, employees, properties or projects. Property cards state this explicitly. When genuine site/team photography is available, replace the corresponding files in `public/images/` using the same filenames.
- The official `logo.png` is retained but was downscaled/optimised; `favicon.svg` is a lightweight brand monogram.
- Property listings, service copy and FAQs are data-driven from `src/config/site.ts`.

## Still needs client input / external accounts

- GA4 measurement ID and a Search Console property.
- A lead endpoint or CRM webhook if enquiries should be stored server-side.
- Genuine project/team photography and any business registrations to display.
- Social profile URLs (add to `site.social` to populate `sameAs` structured data).
- Dependency security: current npm advisories are only fixable by a major Astro upgrade (v7), which is a separate migration task. The deployed output is static HTML with no server runtime.
