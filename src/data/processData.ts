import type { ProcessStage } from '../types';

export const processStages: ProcessStage[] = [
  {
    number: '01',
    title: 'Discovery & Requirements',
    timeline: 'Stage 1',
    summary: 'We dive deep into your business model, target clientele, brand objectives, content assets, functional necessities, and project constraints before touching a line of code.',
    deliverables: [
      'Comprehensive project scope document',
      'Feature list & functional requirement matrix',
      'Content asset inventory & timeline roadmap'
    ],
    clientInvolvement: 'Initial discovery questionnaire, brand asset handoff, and alignment on core business priorities.',
    technicalFocus: 'Feasibility analysis, framework selection, and technical architecture strategy.'
  },
  {
    number: '02',
    title: 'Planning & Design',
    timeline: 'Stage 2',
    summary: 'We establish information architecture, map intuitive customer journeys, craft bespoke visual identity palettes, and prepare production-ready interface layouts.',
    deliverables: [
      'Complete site map & navigation hierarchy',
      'High-fidelity interactive UI layouts & responsive previews',
      'Design tokens (color systems, typography, spacing)'
    ],
    clientInvolvement: 'Design review sessions and feedback on visual direction and user flow.',
    technicalFocus: 'Design system tokens, component modularity, and UX usability verification.'
  },
  {
    number: '03',
    title: 'Development & Engineering',
    timeline: 'Stage 3',
    summary: 'We turn designs into reality using clean, maintainable TypeScript, responsive layouts, modular component systems, and secure API integrations.',
    deliverables: [
      'Functional staging environment for client review',
      'Fully responsive, mobile-first frontend code',
      'Form workflows, third-party services, and integrations'
    ],
    clientInvolvement: 'Regular milestone updates and preview access on staging URLs.',
    technicalFocus: 'Clean code architecture, Core Web Vitals optimization, and strict type safety.'
  },
  {
    number: '04',
    title: 'Testing & Revisions',
    timeline: 'Stage 4',
    summary: 'Rigorous quality assurance across screen sizes, accessibility verification, cross-browser audits, form delivery tests, and implementation of agreed client revisions.',
    deliverables: [
      'Multi-device responsive test matrix (mobile, tablet, desktop)',
      'Cross-browser rendering validation (Chrome, Safari, Firefox, Edge)',
      'Form validation, error boundary, and security tests'
    ],
    clientInvolvement: 'Structured client walkthrough, feedback compilation, and revision approvals.',
    technicalFocus: 'WCAG 2.2 accessibility standards, lighthouse scores, and layout shift checks.'
  },
  {
    number: '05',
    title: 'Production Launch',
    timeline: 'Stage 5',
    summary: 'We configure your custom domain, provision SSL certificates, inject verified SEO metadata and Open Graph tags, perform final production checks, and take your site live.',
    deliverables: [
      'Live production deployment on global CDN edge',
      'Verified HTTPS security certificate & custom domain setup',
      'XML sitemap, robots.txt, and search engine console readiness'
    ],
    clientInvolvement: 'Domain DNS access authorization and final go-live sign-off.',
    technicalFocus: 'Edge caching, asset compression, production bundling, and CDN distribution.'
  },
  {
    number: '06',
    title: 'Maintenance & Support',
    timeline: 'Stage 6',
    summary: 'We provide dependable ongoing post-launch care, dependency updates, uptime monitoring, security patches, and incremental feature upgrades under an agreed scope.',
    deliverables: [
      'Uptime and SSL certificate monitoring',
      'Dependency and framework security updates',
      'Dedicated developer support for future enhancements'
    ],
    clientInvolvement: 'Optional scheduled maintenance check-ins and ad-hoc content request submission.',
    technicalFocus: 'Preventative patching, code longevity, and performance preservation.'
  }
];
