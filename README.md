# GB GROUP — Official Website

> **Consultancy / Agency • Jharkhand & West Bengal**  
> **Domain:** [www.gbgroup.in](https://www.gbgroup.in)  
> **Leadership:** Mohit Mallar (CEO)  
> **Mobile / WhatsApp:** [74397 86518](https://wa.me/917439786518)  
> **Email:** [ceo@gbgroup.co.in](mailto:ceo@gbgroup.co.in)  
> **Office Address:** GC 50, Block Sector V, Kolkata, West Bengal – 700064

---

## 📌 Project Overview
Built strictly following the **GB Group Website Blueprint**.  
- **Brand Slogan:** *"GB Group — Ek Chhat Ke Neeche 4 Badi Services"*
- **Core Services:**
  1. **Transport & Export** (`/services/transport-export`)
  2. **Education Consultant & Placement** (`/services/education-placement`)
  3. **Land Sales & Joint Work** (`/services/land-joint-work`)
  4. **Advertisement & Marketing** (`/services/advertising-marketing`)
- **Key Feature Page:**
  - **Land Sales & Joint Venture** (`/land-joint-venture`) — Location-wise listing layout by **Area, Size, and Purpose** across Jharkhand & West Bengal.

---

## 🚀 Tech Stack
- **Framework:** [Astro](https://astro.build/) (Static Site Generation — SSG)
- **Styling:** Mobile-first responsive CSS (`src/styles/global.css`)
- **Backend:** Pure static (No backend, no database, no login required)
- **Forms:** Client-side 10-digit phone validation routing directly to WhatsApp (+91 74397 86518) and Email (`ceo@gbgroup.co.in`).

---

## 📂 Project Structure

```text
gb-group/
├── dist/                                  # Production-ready static output (Deploy this folder)
├── public/
│   ├── logo.png                           # Official GB Group dark blue logo
│   ├── robots.txt                         # Search engine directives
│   ├── sitemap.xml                        # Complete XML sitemap for SEO
│   └── images/
│       ├── transport.svg                  # Transport & Export vector artwork
│       ├── education.svg                  # Education & Placement vector artwork
│       ├── land.svg                       # Land Sales & Joint Work vector artwork
│       └── marketing.svg                  # Advertisement & Marketing vector artwork
├── src/
│   ├── components/
│   │   ├── Header.astro                   # Header with Logo, Navigation & Call/WhatsApp buttons
│   │   ├── Footer.astro                   # Footer with Services, Navigation, Contact details & Copyright
│   │   ├── ServiceCard.astro              # Card component for the 4 core services
│   │   ├── EnquiryForm.astro              # Validated enquiry form with WhatsApp & Email submission
│   │   └── WhatsAppButton.astro           # Floating WhatsApp button + mobile bottom action bar
│   ├── layouts/
│   │   └── BaseLayout.astro               # Shared layout, SEO meta tags & Schema.org structured data
│   ├── pages/
│   │   ├── index.astro                    # Home ("GB Group — Ek Chhat Ke Neeche 4 Badi Services")
│   │   ├── about.astro                    # About Us
│   │   ├── services.astro                 # Our Services (Overview of all 4)
│   │   ├── services/
│   │   │   ├── transport-export.astro     # Transport & Export in Jharkhand & West Bengal
│   │   │   ├── education-placement.astro  # Education Consultant & Placement (+ Student Enquiry)
│   │   │   ├── land-joint-work.astro      # Land Sales & Joint Work
│   │   │   └── advertising-marketing.astro # Advertisement & Marketing
│   │   ├── land-joint-venture.astro       # Land & Joint Venture (Area, Size, Purpose listings)
│   │   └── contact.astro                  # Contact Us (Sector V Office, Google Maps, CEO contact)
│   └── styles/
│       └── global.css                     # Mobile-first stylesheet
├── astro.config.mjs                       # Astro configuration (site: https://www.gbgroup.in)
├── package.json                           # NPM dependencies and scripts
└── README.md                              # Handover documentation
```

---

## 🛠️ Build and Development Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser to test locally.

### 3. Build for Production
```bash
npm run build
```
This generates the optimized static files in the `dist/` directory.

### 4. Preview the Production Build
```bash
npm run preview
```

---

## 🌐 Deployment to www.gbgroup.in
Upload the entire contents of the `dist/` folder to your web server / hosting provider:
- **cPanel / Apache / Nginx:** Upload all files inside `dist/` directly into `public_html/` (or web root).
- **Vercel / Netlify / Cloudflare Pages:** Connect this repository or drag-and-drop the `dist/` folder.
- Ensure SSL (HTTPS) is active for `https://www.gbgroup.in`.

---

## 📞 Official Contacts (Verified)
- **CEO:** Mohit Mallar
- **Mobile / WhatsApp:** +91 74397 86518
- **Email:** ceo@gbgroup.co.in
- **Website:** https://www.gbgroup.in
- **Office Address:** GC 50, Block Sector V, Kolkata, West Bengal – 700064
