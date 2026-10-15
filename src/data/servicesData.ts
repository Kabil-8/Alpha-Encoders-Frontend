import type { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'business-corporate',
    number: '01',
    title: 'Business and Corporate Websites',
    slug: 'business-corporate',
    shortDesc: 'Credible, polished digital headquarters designed to position your company as an industry authority.',
    fullDesc: 'We architect and develop high-performance corporate platforms that communicate organizational credibility, articulate value propositions, and drive inbound corporate inquiries.',
    targetAudience: 'B2B enterprises, consulting firms, financial practices, agencies, and growing regional businesses.',
    keyFeatures: [
      'Custom modular corporate layout system',
      'Executive leadership and board profile directories',
      'Dedicated service and capability showcases',
      'Multi-tier corporate inquiry & quotation routing',
      'Integrated technical SEO architecture and schema markup',
      'Compliance-ready privacy and security policies'
    ],
    businessBenefits: [
      'Elevates corporate reputation and investor/client confidence',
      'Shortens enterprise sales cycles with clear capability positioning',
      'Delivers lightning-fast responsiveness across desktop and mobile devices'
    ],
    icon: 'Building2',
    category: 'core'
  },
  {
    id: 'ecommerce',
    number: '02',
    title: 'E-commerce Websites',
    slug: 'ecommerce',
    shortDesc: 'High-converting online storefronts with streamlined checkout, inventory presentation, and frictionless UX.',
    fullDesc: 'Engineered for smooth buying journeys, our e-commerce implementations balance beautiful product storytelling with robust cart flows, payment integrations, and order management.',
    targetAudience: 'DTC retail brands, boutique makers, artisan shops, and businesses transitioning from physical to digital retail.',
    keyFeatures: [
      'Dynamic product catalogs with multi-attribute filtering',
      'High-speed cart drawers and multi-step secure checkouts',
      'Integration with Stripe, Razorpay, or payment gateways',
      'Real-time inventory status and automated order notifications',
      'Mobile-first responsive purchasing interface',
      'Customer account dashboards and saved wishlists'
    ],
    businessBenefits: [
      'Reduces cart abandonment with friction-free checkout flows',
      'Empowers store owners to manage catalogs effortlessly',
      'Builds brand loyalty through premium bespoke visual presentation'
    ],
    icon: 'ShoppingBag',
    category: 'core'
  },
  {
    id: 'portfolio',
    number: '03',
    title: 'Portfolio & Personal Branding',
    slug: 'portfolio',
    shortDesc: 'Artful, interactive showcase platforms engineered for creatives, architects, founders, and consultants.',
    fullDesc: 'Stand out from generic template portfolios with tailor-made visual narratives, editorial typography, project deep-dives, and seamless interactive case study presentations.',
    targetAudience: 'Architects, interior designers, creative directors, senior consultants, developers, and photographers.',
    keyFeatures: [
      'Immersive full-screen and editorial case study layouts',
      'Interactive project filtering by discipline or year',
      'High-resolution optimized media rendering',
      'Embedded client testimonials and verified results',
      'Direct client inquiry and calendar integration'
    ],
    businessBenefits: [
      'Commands premium client rates through top-tier design presentation',
      'Provides an authoritative digital anchor for speaking and press',
      'Turns profile visitors into active contract inquiries'
    ],
    icon: 'Sparkles',
    category: 'core'
  },
  {
    id: 'restaurant-hotel',
    number: '04',
    title: 'Restaurant & Hospitality Websites',
    slug: 'restaurant-hotel',
    shortDesc: 'Atmospheric digital dining and lodging experiences featuring visual menus and table/room booking links.',
    fullDesc: 'Bring the ambiance of your hospitality venue online with sensory photography layouts, interactive digital menus, event announcements, and direct reservation flows.',
    targetAudience: 'Fine dining restaurants, boutique hotels, cafes, event spaces, and resort retreats.',
    keyFeatures: [
      'Mobile-optimized interactive food & beverage menus with dietary tags',
      'Direct reservation widget integration (OpenTable, Resy, or custom form)',
      'Location, operating hours, and interactive map directions',
      'Private event catering and room buyout request workflows',
      'Seasonal promotional banners and photo galleries'
    ],
    businessBenefits: [
      'Drives direct reservations without heavy third-party commissions',
      'Provides guests with immediate access to hours, parking, and menus',
      'Reflects the physical atmosphere of your hospitality space'
    ],
    icon: 'UtensilsCrossed',
    category: 'specialized'
  },
  {
    id: 'educational',
    number: '05',
    title: 'Educational & Academy Websites',
    slug: 'educational',
    shortDesc: 'Structured curriculum portals, course discovery systems, and student onboarding platforms.',
    fullDesc: 'Built to structure complex academic content into clean, accessible learning pathways. Ideal for training institutes, online academies, and educational organizations.',
    targetAudience: 'Private schools, vocational academies, ed-tech startups, course creators, and research institutions.',
    keyFeatures: [
      'Hierarchical course directories with syllabus overviews',
      'Instructor profiles, credentials, and office hours',
      'Student admissions and enrollment inquiry workflows',
      'Downloadable prospectuses and resource libraries',
      'Integration with external LMS or student login portals'
    ],
    businessBenefits: [
      'Increases student enrollment conversions with intuitive course paths',
      'Reduces support queries by surfacing clear curriculum details',
      'Establishes academic prestige and institutional trustworthiness'
    ],
    icon: 'GraduationCap',
    category: 'specialized'
  },
  {
    id: 'healthcare-clinic',
    number: '06',
    title: 'Healthcare & Clinic Websites',
    slug: 'healthcare-clinic',
    shortDesc: 'Compassionate, accessible medical interfaces built with strict privacy and appointment request flows.',
    fullDesc: 'Patients need clarity, empathy, and ease of access. We engineer healthcare websites with verified physician profiles, procedure guides, clear clinic locations, and safe intake forms.',
    targetAudience: 'Private medical clinics, dental practices, wellness centers, and specialized therapists.',
    keyFeatures: [
      'Doctor & practitioner specialty credentials directory',
      'Interactive treatment guide and FAQ breakdown',
      'Direct appointment request forms with specialty selection',
      'Emergency contact highlights and wheelchair accessibility details',
      'WCAG 2.2 AA compliant high-contrast readable typography'
    ],
    businessBenefits: [
      'Builds patient trust during critical healthcare decisions',
      'Streamlines receptionist phone load with pre-appointment requests',
      'Guarantees accessible digital care for patients of all abilities'
    ],
    icon: 'Stethoscope',
    category: 'specialized'
  },
  {
    id: 'real-estate',
    number: '07',
    title: 'Real Estate & Property Showcases',
    slug: 'real-estate',
    shortDesc: 'Property listing platforms with interactive filters, floorplan galleries, and agent contact funnels.',
    fullDesc: 'Designed to showcase residential and commercial developments with high-impact architectural imagery, neighborhood context, specifications, and instant viewing booking.',
    targetAudience: 'Real estate developers, property management firms, luxury brokers, and architectural agencies.',
    keyFeatures: [
      'Multi-filter property search (price, bedrooms, location, sqft)',
      'High-resolution floorplan viewports and virtual tour links',
      'Neighborhood amenity highlights and interactive location maps',
      'Schedule a Private Viewing modal workflow',
      'Automated broker lead notifications'
    ],
    businessBenefits: [
      'Accelerates buyer lead generation with high-fidelity visual assets',
      'Allows buyers to self-qualify through detailed amenity data',
      'Positions properties as exclusive luxury assets'
    ],
    icon: 'Home',
    category: 'specialized'
  },
  {
    id: 'booking-appointments',
    number: '08',
    title: 'Booking & Appointment Systems',
    slug: 'booking-appointments',
    shortDesc: 'Automated scheduling workflows that connect client bookings directly to your business calendar.',
    fullDesc: 'Eliminate email back-and-forth. We integrate intuitive client booking interfaces with real-time calendar synchronization, automated confirmation emails, and reminder triggers.',
    targetAudience: 'Consultants, beauty salons, personal trainers, legal advisors, and service contractors.',
    keyFeatures: [
      'Interactive date & time slot selector with timezone handling',
      'Automated Google Calendar / Outlook calendar synchronization',
      'Optional deposit or pre-payment collection at booking',
      'Automated confirmation email and WhatsApp reminders',
      'Self-service client rescheduling and cancellation window policies'
    ],
    businessBenefits: [
      'Eliminates no-shows through automated reminder sequences',
      'Saves dozens of admin hours each week on calendar management',
      'Enables clients to book services 24/7 without waiting for a phone call'
    ],
    icon: 'CalendarCheck',
    category: 'specialized'
  },
  {
    id: 'landing-pages',
    number: '09',
    title: 'High-Conversion Landing Pages',
    slug: 'landing-pages',
    shortDesc: 'Laser-focused single-page campaigns built to convert ad traffic into qualified customer leads.',
    fullDesc: 'Every headline, proof point, and CTA is engineered for maximum psychological conversion. Optimized for fast rendering and high advertising Quality Scores.',
    targetAudience: 'SaaS product launches, webinar registrations, promotional campaigns, and service promotions.',
    keyFeatures: [
      'Persuasive narrative structure (Problem, Agitation, Solution, Proof)',
      'Sub-second load times engineered for Google & Meta Ads traffic',
      'Frictionless lead-capture forms with validation',
      'Analytics event tracking (Meta Pixel, Google Analytics 4, Tag Manager)',
      'A/B testing-ready modular page sections'
    ],
    businessBenefits: [
      'Lowers customer acquisition cost (CAC) on paid ad campaigns',
      'Delivers immediate ROI on new product or service launches',
      'Provides actionable user behavior data through tracking integrations'
    ],
    icon: 'Target',
    category: 'core'
  },
  {
    id: 'blogs-content',
    number: '10',
    title: 'Blogs & Content Publishing Platforms',
    slug: 'blogs-content',
    shortDesc: 'Fast, readable publication platforms engineered for SEO authority and editorial content.',
    fullDesc: 'Transform your brand into a thought leader with structured editorial design, fast markdown rendering, category navigation, search, and social sharing hooks.',
    targetAudience: 'Industry analysts, media publications, corporate newsrooms, and content creators.',
    keyFeatures: [
      'Sleek editorial typography engineered for extended reading',
      'Category taxonomies and tag filtering systems',
      'Instant client-side content search and related article suggestions',
      'Rich code syntax highlighting and quote block callouts',
      'Newsletter subscription capture modals'
    ],
    businessBenefits: [
      'Drives compounding organic search engine traffic',
      'Builds brand authority within your target market',
      'Nurtures prospects into long-term subscribers and clients'
    ],
    icon: 'BookOpen',
    category: 'specialized'
  },
  {
    id: 'custom-web-apps',
    number: '11',
    title: 'Custom Web Applications',
    slug: 'custom-web-apps',
    shortDesc: 'Tailored SaaS portals, operational dashboards, and client-facing digital tools.',
    fullDesc: 'When off-the-shelf software falls short, we build custom full-stack solutions with role-based access, interactive data tables, REST APIs, and responsive dashboard interfaces.',
    targetAudience: 'Tech startups, logistics managers, member organizations, and businesses with custom workflows.',
    keyFeatures: [
      'Secure authentication and role-based permissions (RBAC)',
      'Interactive data visualization and real-time metric counters',
      'Custom database models and scalable API architectures',
      'Exportable reporting (CSV, PDF) and internal workflows',
      'Modular state management with clean TypeScript code'
    ],
    businessBenefits: [
      'Automates proprietary business processes unique to your company',
      'Provides a proprietary digital asset that increases enterprise valuation',
      'Scales seamlessly as your transaction volume and user base grow'
    ],
    icon: 'Terminal',
    category: 'specialized'
  },
  {
    id: 'website-redesign',
    number: '12',
    title: 'Strategic Website Redesign',
    slug: 'website-redesign',
    shortDesc: 'Transform outdated web assets into modern, high-converting digital powerhouses while preserving SEO.',
    fullDesc: 'If your current website feels dated, sluggish, or fails to generate leads, we perform a systematic overhaul—reimagining visual aesthetics and UX while safeguarding your existing SEO rankings.',
    targetAudience: 'Established businesses with legacy sites (WordPress, Wix, custom HTML) needing a modern revamp.',
    keyFeatures: [
      'Comprehensive heuristic UI/UX audit of the legacy website',
      'Modern responsive redesign with current design systems',
      '301 redirect mapping to preserve established search rankings',
      'Content migration and readability restructuring',
      'Brand modernization and asset regeneration'
    ],
    businessBenefits: [
      'Reclaims lost customers who bounced due to outdated interfaces',
      'Protects existing search rankings with rigorous URL migration',
      'Puts your digital presence ahead of competing market alternatives'
    ],
    icon: 'RefreshCw',
    category: 'optimization'
  },
  {
    id: 'performance-optimization',
    number: '13',
    title: 'Performance & Core Web Vitals Optimization',
    slug: 'performance-optimization',
    shortDesc: 'Speed audits, asset compression, and code splitting to achieve sub-second load times.',
    fullDesc: 'Slow sites lose visitors and rank lower on Google. We diagnose rendering bottlenecks, optimize image delivery, eliminate unused scripts, and streamline critical rendering paths.',
    targetAudience: 'Any website suffering from low PageSpeed scores, slow mobile loading, or high bounce rates.',
    keyFeatures: [
      'In-depth Core Web Vitals diagnostic (LCP, INP, CLS)',
      'Modern image format conversion (WebP, AVIF) with responsive srcset',
      'JavaScript bundle splitting and unneeded dependency pruning',
      'HTTP/2, CDN caching headers, and browser storage tuning',
      'DOM depth refactoring and CSS rendering optimizations'
    ],
    businessBenefits: [
      'Directly improves Google search rankings via Page Experience signals',
      'Drastically decreases mobile bounce rates and improves engagement',
      'Delivers an instant, snappy user feel across all network conditions'
    ],
    icon: 'Zap',
    category: 'optimization'
  },
  {
    id: 'maintenance-support',
    number: '14',
    title: 'Maintenance & Technical Support',
    slug: 'maintenance-support',
    shortDesc: 'Dependable post-launch care, continuous security updates, dependency patches, and feature additions.',
    fullDesc: 'A website is a living asset. We provide dependable, on-demand technical support, uptime monitoring, framework updates, security checks, and content adjustments under an agreed scope.',
    targetAudience: 'Business owners who want peaceful confidence without maintaining code themselves.',
    keyFeatures: [
      'Regular package and dependency security updates',
      'Automated site health, SSL certificate, and uptime monitoring',
      'Scheduled backups and fast disaster recovery procedures',
      'Dedicated monthly hours for design or copy updates',
      'Direct priority developer access via email and WhatsApp'
    ],
    businessBenefits: [
      'Zero downtime worries or security vulnerability surprises',
      'Protects your initial development investment for years',
      'Gives your team a reliable technical partner on speed dial'
    ],
    icon: 'ShieldCheck',
    category: 'optimization'
  },
  {
    id: 'research-works-papers',
    number: '15',
    title: 'Research Works & Academic Papers Engineering',
    slug: 'research-works-papers',
    shortDesc: 'Rigorous computer science research, algorithmic prototyping, technical whitepapers, and IEEE/ACM publication-ready papers.',
    fullDesc: 'Beyond commercial web applications, our engineering studio conducts deep computer science and digital systems research. We assist researchers, founders, and academic institutions in mathematical formulation, algorithmic benchmarks, experimental prototyping, literature syntheses, and peer-reviewed publication drafting.',
    targetAudience: 'Postgraduate researchers, academic labs, deep-tech startups, R&D departments, and founders publishing technical papers.',
    keyFeatures: [
      'Algorithmic benchmarking and experimental performance data visualization',
      'IEEE, ACM, and Springer LaTeX formatting and camera-ready drafting',
      'Literature review, methodology structuring, and mathematical proofs',
      'Prototyping codebases and reproducible research artifact repositories',
      'Peer review feedback addressing and manuscript revisions'
    ],
    businessBenefits: [
      'Accelerates acceptance in high-impact journals and conferences',
      'Validates novel tech architectures with rigorous reproducible benchmarks',
      'Elevates technological credibility and intellectual property positioning'
    ],
    icon: 'FileText',
    category: 'specialized'
  }
];
