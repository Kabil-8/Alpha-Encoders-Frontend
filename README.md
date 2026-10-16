# Alpha Encoders — Frontend Web Application & Studio Experience

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

Welcome to the official frontend client repository for **Alpha Encoders** — an award-winning digital engineering and research studio. Crafted with a cinematic dark-tech aesthetic, electric-blue accents, custom CSS and ReactBits physics animations, and interactive proposal tooling.

---

## 🌟 Live Client Deployments

Explore verified, production applications engineered by the Alpha Encoders team:

- 🛍️ **[TheCustomNest](https://www.thecustomnest.shop/)** — Artisan handmade crochet e-commerce platform featuring an optimistic reactive checkout drawer, instant cart calculations, and responsive catalog browsing.
- ☕ **[JavaLearn](https://javalearn-omega.vercel.app/)** — Interactive academic learning hub with dark-mode coding environments, step-by-step algorithms, and instant concept drills.
- 🌐 **[EduSphere](https://edusphere08.vercel.app/)** — Institutional educational ecosystem featuring real-time class rosters, course catalog navigation, and integrated scientific research work.

---

## 🚀 Key Features

### 📄 Commercial Quotation & Proposal Generator (`/quotation`)
- **Official Studio Identity**: Embedded high-resolution Alpha Encoders official insignia and verification seal.
- **Interactive Scope Matrix**: Real-time deliverable table editor allowing dynamic row insertion, unit rate definitions, quantity scaling, and automatic subtotal calculation.
- **Multi-Currency & Financial Adjustments**: Support for USD (`$`), INR (`₹`), EUR (`€`), and GBP (`£`) with configurable discount and GST / VAT tax percentages.
- **Milestone Breakdown**: Visual 3-stage commercial schedule (50% Inception, 30% Staging, 20% Handover).
- **Native A4 Print / PDF Engine**: One-click **Export to PDF** styled via dedicated `@media print` rules (`@page { size: A4 portrait; margin: 10mm 12mm; }`), completely hiding UI navigation and rendering a clean commercial proposal document.
- **Architecture Presets**: Instant pre-fills for E-Commerce, EdTech, Corporate Sites, and Academic Research Papers.

### 🔬 Scientific Research Works & Technical Papers
- Complete showcase of computer science research engineering: IEEE & ACM manuscript drafting, LaTeX formatting, algorithmic benchmarks, and empirical data visualization.

### 🎨 Cinematic Dark-Tech Visual Design & ReactBits
- Custom palette: `#050816` cosmic obsidian, `#0A1024` navy cards, `#2563FF` electric blue, and `#22D3EE` cyan glow.
- Physics-based interactive components:
  - **Magnet**: Smooth magnetic attraction on interactive action buttons and badges.
  - **Hyperspeed**: Ambient warp-speed starfield canvas backgrounds.
  - **Liquid Chrome**: Fluid metallic WebGL shaders.
  - **DecryptedText & SplitText**: Character-cycling decryption animations for headers.
  - **PageTransitions**: Seamless route shifts with motion state preservation.

### 🔒 Secured Studio Admin Portal (`/admin`)
- Administrative control center with CRM lead pipeline, client dossiers, project case study editor, and live studio metrics.

---

## 📁 Repository Structure

```text
├── public/
│   ├── alpha-encoders-icon-dark.png   # High-resolution official studio badge
│   ├── robots.txt                     # SEO crawler directives
│   └── sitemap.xml                    # Studio index and routing map
├── src/
│   ├── components/
│   │   ├── layout/                    # Navbar, Footer, Sticky CTA, Preloader
│   │   ├── reactbits/                 # DecryptedText, Magnet, Hyperspeed, etc.
│   │   └── shared/                    # ProjectCard, ServiceCard, EstimatorModal
│   ├── data/
│   │   ├── projectsData.ts            # Verified live portfolio case studies
│   │   ├── servicesData.ts            # Studio engineering & research service catalog
│   │   └── processData.ts             # 5-stage sprint methodology
│   ├── pages/
│   │   ├── HomePage.tsx               # Studio hero, live projects, benchmarks
│   │   ├── AboutPage.tsx              # Philosophy, stack, research capabilities
│   │   ├── ProjectsPage.tsx           # Filterable production case studies
│   │   ├── ContactPage.tsx            # Interactive project scope brief form
│   │   ├── QuotationPage.tsx          # Proposal generator & PDF exporter
│   │   └── admin/                     # Admin login & CRM dashboard
│   ├── index.css                      # Design tokens, Tailwind CSS v4, print rules
│   ├── App.tsx                        # Router configuration & page transitions
│   └── main.tsx                       # React 19 application entry point
├── package.json                       # Dependencies & build scripts
├── vite.config.ts                     # Vite configuration & backend /api proxy
├── tsconfig.json                      # TypeScript root project settings
└── README.md                          # Comprehensive documentation
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/Kabil-8/Alpha-Encoders-Frontend.git
cd Alpha-Encoders-Frontend

# Install dependencies
npm install
```

### Local Development
```bash
# Start Vite development server
npm run dev
```
The application will launch at `http://localhost:5173`.

### Connecting to Backend
This frontend connects seamlessly to the [Alpha-Encoders-Backend](https://github.com/Kabil-8/Alpha-Encoders-Backend). When running locally, Vite automatically proxies all `/api` calls to `http://localhost:5000`.

### Production Build
```bash
# Verify TypeScript types and compile optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deployment

### Vercel (Recommended)
1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Deploy with one click.

---

## 📬 Contact & Inquiries

- **Lead Engineer & Founder:** K.Kabil
- **Email:** [kabilk2023@gmail.com](mailto:kabilk2023@gmail.com)
- **Phone / WhatsApp:** [+91 8667452487](tel:+918667452487)
- **Website:** [https://alphaencoders.com](https://alphaencoders.com)

---

## 📄 License
MIT © [Alpha Encoders](https://alphaencoders.com) & [K.Kabil](https://github.com/Kabil-8)
