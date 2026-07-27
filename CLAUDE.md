# Atlas Fuel Website — Claude Code Instructions

## Project Overview

Build a full production-ready website for **Atlas Fuel Australia** using **Gatsby + Sanity CMS**.
The design must be inspired by **mineralresources.com.au** — same premium corporate feel, smame style of animations, mega menu, and scroll transitions.
This is a demo-first project. The homepage must be completed first for client approval, then remaining pages.

---

## Tech Stack

- **Frontend:** Gatsby v5 (React)
- **CMS:** Sanity v3
- **Styling:** CSS Modules + GSAP for animations
- **Deployment:** Vercel (frontend) + Sanity Studio (free tier)
- **Images:** gatsby-plugin-image for optimization
- **Fonts:** Google Fonts — Inter (body) + Bebas Neue or Oswald (headings, like MinRes)

---

## Brand Guidelines

- **Primary Green:** `#2db234`
- **Dark Green:** `#1a7a1f`
- **Black:** `#0a0a0a`
- **White:** `#ffffff`
- **Light Grey:** `#f4f4f4`
- **Font Heading:** Bebas Neue or Oswald (bold, all caps)
- **Font Body:** Inter

---

## Logo & Assets

- Logo: Black "ATLAS" text with green globe icon above the "L", green italic "FUEL" text below right
- Hero image: Aerial shot of two white Atlas Fuel tanker trucks on a red desert road with salt lake background
- Both assets will be placed in `/static/images/` folder

---

## Project Structure

```
atlas-fuel/
├── studio/                  # Sanity Studio
│   ├── schemas/
│   │   ├── homePage.js
│   │   ├── service.js
│   │   ├── newsPost.js
│   │   ├── teamMember.js
│   │   └── siteSettings.js
├── web/                     # Gatsby frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.js        # Sticky mega menu header
│   │   │   │   ├── Footer.js        # Dark multi-column footer
│   │   │   │   └── MegaMenu.js      # Full-width dropdown menu
│   │   │   ├── Home/
│   │   │   │   ├── Hero.js          # Full screen hero with truck image
│   │   │   │   ├── ServicesTab.js   # Tab switcher section
│   │   │   │   ├── AboutSection.js  # About with image + text
│   │   │   │   ├── StatsSection.js  # Animated counters
│   │   │   │   ├── QuoteSection.js  # Full width dark quote
│   │   │   │   ├── NewsSection.js   # Latest news cards
│   │   │   │   └── CTASection.js    # Call to action banner
│   │   │   └── Common/
│   │   │       ├── AnimatedText.js  # Split text animation
│   │   │       ├── ScrollReveal.js  # Scroll triggered fade-in
│   │   │       └── SEO.js
│   │   ├── pages/
│   │   │   ├── index.js             # Homepage
│   │   │   ├── about.js
│   │   │   ├── services/
│   │   │   │   ├── index.js
│   │   │   │   ├── mining-fuel.js
│   │   │   │   ├── marine-fuel.js
│   │   │   │   ├── agriculture.js
│   │   │   │   ├── fuel-retailers.js
│   │   │   │   ├── onsite-bulk-diesel.js
│   │   │   │   └── local-fuel-distributors.js
│   │   │   ├── fuel-stations.js
│   │   │   ├── fuel-transportation.js
│   │   │   ├── careers.js
│   │   │   ├── community.js
│   │   │   ├── news/
│   │   │   │   ├── index.js
│   │   │   │   └── {post}.js        # Dynamic news post
│   │   │   └── contact.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   └── lib/
│   │       └── sanity.js            # Sanity client config
│   ├── gatsby-config.js
│   └── gatsby-node.js
```

---

## Navigation / Menu Structure

Replicate the MinRes mega menu style exactly:

- Sticky header, dark background `#0a0a0a`, white links
- Logo on the left
- Nav links on the right: About Us | Services | Fuel Stations | Fuel Transportation | Careers | News | Contact
- Top bar: Phone number `+61 8 6377 7644` | Email `info@atlasfuel.com.au`
- On hover: full-width mega dropdown slides down with:
  - Left: section image
  - Center: section description + "Learn more" link
  - Right: sub-page links list
- Mobile: hamburger menu with slide-in drawer, accordion sub-menus

### Mega Menu Items:

**About Us**

- Who We Are
- Leadership
- Vision & Purpose

**Services**

- Mining Fuel
- Marine Fuel
- Agriculture Fuel
- Fuel Retailers
- Onsite Bulk Diesel
- Local Fuel Distributors

**Fuel Stations**

- Store Locator
- Franchise Enquiry

**Fuel Transportation**

- Our Fleet
- Logistics

**Careers**

- View Jobs
- Why Atlas Fuel

**News**

- Latest News
- Community

---

## Homepage Sections (in order)

### 1. Hero Section

- Full viewport height
- Background: Atlas Fuel truck aerial image (the desert road shot)
- Dark overlay gradient (bottom to top, subtle)
- Large animated text — split line by line:
  - Line 1: "Welcome to" (thin, white, animates in from left)
  - Line 2: "ATLAS FUEL" (massive, bold, white, animates in from right)
  - Line 3: "AUSTRALIA" (large, green #2db234, animates in from left)
- Subtitle: "Reliable. Efficient. Nationwide."
- CTA button: "About Us" (white border button) + "Our Services" (green filled button)
- Scroll indicator arrow at bottom

### 2. Intro / About Strip

- Dark background `#0a0a0a`
- Left: large heading "Driving Growth and Reliability"
- Right: paragraph about Atlas Fuel + "Learn More" link
- Subtle fade-in on scroll

### 3. Services Tab Section

- White background
- Small label: "What We Do"
- Large heading: "Industries We Serve"
- Horizontal tab buttons: Mining | Marine | Agriculture | Retail | Distribution
- On tab click: image changes (left) + description changes (right) with smooth transition
- Data comes from Sanity

### 4. About Section

- Split layout: left = large image of Atlas Fuel truck/operations, right = text
- Heading: "About Atlas Fuel"
- Body: company description
- Stats inline: "Since 2010" | "Nationwide" | "ISO Certified"
- "Read More" green button

### 5. Stats Counter Section

- Dark green background `#1a7a1f`
- 4 animated counters on scroll:
  - 15+ Years in Operation
  - 6 Industries Served
  - 100% Australian Owned
  - 24/7 Service Available
- Numbers count up when section enters viewport

### 6. Quote Section

- Full width, black background
- Large italic white quote:
  _"Our purpose is to provide reliable and affordable petroleum products to help create a better world for everyone."_
- Attribution: — Atlas Fuel Vision 2030

### 7. Sustainability / Community Section

- Light grey background
- Left: text about community & responsibility
- Right: 2x2 image grid
- "Learn More" link

### 8. News Section

- White background
- Heading: "Latest News"
- 3 news cards in a row (image, category tag, title, date, excerpt)
- "View All" link
- Cards data from Sanity newsPost schema

### 9. CTA Banner

- Full width green `#2db234` background
- Heading: "Ready to Power Your Business?"
- Subtext: "Contact us today for a free fuel quote."
- White button: "Get a Free Quote"

### 10. Footer

- Dark `#0a0a0a` background
- Top: Atlas Fuel logo + short description + social icons
- 4 columns of links:
  - Company: About, Leadership, Vision, Careers
  - Services: Mining, Marine, Agriculture, Retailers, Bulk Diesel, Distributors
  - Support: Contact, Store Locator, Fuel Pricing, Franchising
  - Quick Links: News, Community, Products, FAQ
- Bottom bar: © 2025 Atlas Fuel. All Rights Reserved. | Privacy Policy | Disclaimer

---

## Animations (GSAP)

Install: `npm install gsap`

### Hero Text Animation

```js
// Staggered lines animate in on page load
gsap.from(".hero-line", {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});
```

### Scroll Reveal (all sections)

```js
// Use ScrollTrigger for every section
gsap.registerPlugin(ScrollTrigger);
gsap.from(".reveal", {
  scrollTrigger: ".reveal",
  y: 60,
  opacity: 0,
  duration: 0.9,
  ease: "power2.out",
});
```

### Stats Counter

```js
gsap.to(counter, {
  scrollTrigger: { trigger: counter, start: "top 80%" },
  innerHTML: targetNumber,
  duration: 2,
  snap: { innerHTML: 1 },
  ease: "power1.out",
});
```

### Mega Menu

```js
// Slide down on hover
gsap.from(".mega-menu", {
  y: -20,
  opacity: 0,
  duration: 0.3,
  ease: "power2.out",
});
```

---

## Sanity Schemas

### siteSettings.js

```js
export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "phone", type: "string" },
    { name: "email", type: "string" },
    { name: "address", type: "string" },
    { name: "logo", type: "image" },
  ],
};
```

### service.js

```js
export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "category", type: "string" }, // mining, marine, agriculture etc
    { name: "description", type: "text" },
    { name: "image", type: "image" },
    { name: "content", type: "array", of: [{ type: "block" }] }, // rich text
  ],
};
```

### newsPost.js

```js
export default {
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "publishedAt", type: "datetime" },
    { name: "category", type: "string" },
    { name: "excerpt", type: "text" },
    { name: "mainImage", type: "image" },
    { name: "body", type: "array", of: [{ type: "block" }] },
  ],
};
```

### homePage.js

```js
export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    { name: "heroHeading", type: "string" },
    { name: "heroSubtitle", type: "string" },
    { name: "heroImage", type: "image" },
    { name: "aboutHeading", type: "string" },
    { name: "aboutText", type: "text" },
    { name: "aboutImage", type: "image" },
    { name: "quoteText", type: "text" },
    { name: "ctaHeading", type: "string" },
    { name: "ctaSubtext", type: "string" },
  ],
};
```

---

## Setup Commands

Run these in order:

```bash
# 1. Create Gatsby site
npm init gatsby@latest web -- --ts=false

# 2. Install Gatsby plugins
cd web
npm install gatsby-source-sanity gatsby-plugin-image gatsby-plugin-sharp gatsby-transformer-sharp gsap

# 3. Create Sanity studio
cd ..
npm create sanity@latest -- --template clean --create-project "Atlas Fuel" --dataset production --output-path studio

# 4. Link Sanity project ID in gatsby-config.js
# 5. Start both dev servers
```

---

## Deployment

- Frontend: Push to GitHub → connect to Vercel → auto deploy
- Sanity Studio: `npx sanity deploy` → gives a free studio.sanity.io URL for client
- Environment variables on Vercel:
  - `SANITY_PROJECT_ID`
  - `SANITY_DATASET`
  - `SANITY_TOKEN`

---

## Priority Order (Build This First)

1. Project setup (Gatsby + Sanity linked)
2. Global styles + CSS variables
3. Header + Mega Menu
4. Homepage Hero section (with truck image + GSAP animation)
5. All remaining homepage sections
6. Footer
7. Deploy to Vercel for client demo link
8. Then build inner pages

---

## Important Notes

- Always use `gatsby-plugin-image` for images, never raw `<img>` tags
- All content must be editable from Sanity Studio
- Mobile responsive at 320px, 768px, 1024px, 1440px breakpoints
- No jQuery — pure React + GSAP only
- Page transitions: fade in/out between routes using gatsby-plugin-transition-link or CSS
- SEO: every page needs meta title, description, og:image via gatsby-plugin-react-helmet
- Performance target: Lighthouse score 90+ on all metrics
