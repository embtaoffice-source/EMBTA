# Eastern Maring Business & Traders Association (EMBTA)

> **Official Motto:** *“Combine, Syndicate a Trust”*  
> **Headline:** *“Connecting Businesses. Strengthening Communities.”*

The official public 3D web platform for the **Eastern Maring Business & Traders Association (EMBTA)**, representing and supporting regional traders, transporters, enterprise operators, and local commercial wings.

---

## 🌟 Key Features

- **Distinct 3D Visual Concepts Per Page**:
  - **Home (`/`)**: 3D interactive Business Network Galaxy with floating nodes, glowing connection lines, ambient particles, and mouse-parallax drift.
  - **About EMBTA (`/about`)**: Conceptual 3D organizational nucleus & interactive 3D historical timeline with glowing mission/vision focal point.
  - **Executive Profile (`/executive`)**: Interactive 3D tilt leadership directory with dynamic lighting and hover elevation.
  - **Media Gallery (`/gallery`)**: 3D floating media wall supporting photos, local video embeds, and YouTube integration (`aqz-KE-bpKQ`) with full 3D Lightbox.
  - **News Bulletins (`/news` & `/news/:slug`)**: 3D gazette cards with depth tilt, category filtering, and slug-based single article reading experience.
  - **Contact Desk (`/contact`)**: 3D communication ray network, secretariat coordinate cards, and full interactive contact form with validation and feedback states.
  - **404 Not Found (`/404`)**: Tumbling 3D wireframe polyhedron with particle dust and return button.
- **Authentic Official Branding**:
  - Strict preservation of the official EMBTA logo and insignia without redrawing or color distortion.
  - Institutional color palette: Deep Navy (`#00152a`), Dark Blue (`#102a43`), Association Green (`#1b873f`), and Civic Red (`#c92a2a`) accents.
- **Strict Data Integrity**:
  - All official data uses designated placeholders (`[Official Address]`, `[Official Phone Number]`, `[Official Email Address]`, `[Office Hours]`, `[Name]`, `[Biography]`, etc.) to prevent fabrication.
  - Demo articles and sample media are explicitly badged.
- **Future CMS & Backend Ready**:
  - Clean modular data layer in `src/data/` enabling drop-in REST/GraphQL/Prisma integration later.
- **Accessibility & Performance**:
  - Lightweight Three.js lifecycle management with automatic cleanup to prevent memory leaks.
  - Hardware-accelerated CSS 3D transforms.
  - Support for `prefers-reduced-motion` and responsive from 320px up to 4K displays.

---

## 🛠️ Technology Stack

- **Framework**: React 18 / TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom institutional design system tokens
- **3D & Visuals**: Three.js (WebGL canvas) + CSS 3D Transforms (`perspective`, `rotateX/Y`, `translateZ`)
- **Icons**: Lucide React
- **Routing**: React Router DOM v6

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended, tested on Node v24)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd "new embta website"

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build & Preview
```bash
# Build production bundle with type checking
npm run build

# Preview the built distribution
npm run preview
```

---

## 📁 Project Structure

```
├── public/
│   ├── assets/
│   │   └── embta-logo.png         # Official high-resolution EMBTA logo
│   ├── robots.txt                 # Search engine directives
│   └── sitemap.xml                # SEO sitemap
├── src/
│   ├── components/
│   │   ├── 3d/                    # Three.js & CSS 3D visual scenes
│   │   │   ├── Network3D.tsx      # Business network galaxy canvas
│   │   │   ├── Communication3D.tsx# Communication signal scene
│   │   │   ├── Polyhedron3D.tsx   # 404 rotating geometry
│   │   │   └── TiltCard.tsx       # Mouse tracking 3D tilt wrapper
│   │   ├── common/                # Reusable UI widgets
│   │   │   ├── GlassCard.tsx
│   │   │   ├── Button3D.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── Lightbox.tsx
│   │   └── layout/                # Global Header, Footer, SEOHead
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── SEOHead.tsx
│   ├── data/                      # Structured data (CMS ready)
│   │   ├── siteConfig.ts
│   │   ├── aboutData.ts
│   │   ├── executiveData.ts
│   │   ├── galleryData.ts
│   │   └── newsData.ts
│   ├── pages/                     # Routed pages
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ExecutivePage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── NewsDetailPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── types/                     # TypeScript type definitions
│   ├── utils/                     # Helpers (YouTube parser, classes)
│   ├── App.tsx                    # Main App routes
│   ├── main.tsx                   # React root entry
│   └── index.css                  # Global styles & 3D CSS
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🛡️ License

Copyright © 2026 Eastern Maring Business & Traders Association. All rights reserved.
