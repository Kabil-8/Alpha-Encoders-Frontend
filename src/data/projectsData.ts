import type { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'the-custom-nest',
    name: 'TheCustomNest',
    slug: 'the-custom-nest',
    industry: 'Handcrafted Lifestyle & E-Commerce',
    tagline: 'Artisan Crochet & Handcrafted Lifestyle Storefront',
    description: 'A bespoke e-commerce platform designed and built for TheCustomNest, an artisan crochet brand. Engineered with dynamic category navigation, interactive product catalogs, an intuitive responsive cart drawer, and custom brand storytelling tailored to handcrafted goods.',
    clientName: 'TheCustomNest Studio',
    deliveryDuration: '3 Weeks',
    completionDate: 'September 2026',
    services: [
      'E-commerce Development',
      'UI/UX Brand Design',
      'Responsive Mobile Optimization',
      'Cart & Inquiry Flow',
      'Performance Tuning'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons', 'Framer Motion'],
    liveUrl: 'https://www.thecustomnest.shop/',
    githubUrl: 'https://github.com/Kabil-8',
    verifiedResult: 'Deployed custom e-commerce experience with sub-second page loads (0.38s FCP) and zero layout shifts across mobile and desktop.',
    featured: true,
    category: 'E-commerce',
    highlights: [
      'Multi-category filtering for custom crochet collections with instant client-side state',
      'Frictionless slide-out cart drawer with instant quantity controls and optimistic updates',
      'Handcrafted aesthetic tailored to boutique artisan goods with warm typography',
      'Sub-second image loading with responsive WebP delivery and blur placeholders',
      'Zero-dependency lightweight checkout inquiry pathway with spam mitigation'
    ],
    architectureOverview: 'Built with modular React and TypeScript components, prioritizing fast initial bundle delivery and lightweight state management. Custom SVG accents and responsive image optimization ensure snappy performance on all mobile networks without heavy CMS overhead.',
    metrics: {
      lighthousePerformance: 99,
      pageSpeed: '0.38s',
      accessibility: 100,
      seoScore: 100,
      payloadSize: '142 KB'
    }
  },
  {
    id: 'javalearn',
    name: 'JavaLearn',
    slug: 'javalearn',
    industry: 'Developer Systems & Computer Science Education',
    tagline: 'Interactive Java Learning Platform & Code Architecture Guide',
    description: 'An interactive, developer-centric learning platform engineered to master Java programming, object-oriented software patterns, concurrency, algorithms, and backend enterprise architecture. Built with real-time code snippet exploration, progressive concept roadmaps, and high-performance interactive UI.',
    clientName: 'JavaLearn Systems',
    deliveryDuration: '3 Weeks',
    completionDate: 'October 2026',
    services: [
      'Developer Platform Engineering',
      'Interactive Code Sandboxing',
      'Technical Documentation UX',
      'Performance Tuning'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons', 'Syntax Highlighting'],
    liveUrl: 'https://javalearn-omega.vercel.app/',
    githubUrl: 'https://github.com/Kabil-8/JavaLearn-Java-Learning-Platform',
    verifiedResult: 'Live deployment delivering modular Java curriculum tracks with instant interactive code exploration and 100% responsive mobile layout.',
    featured: true,
    category: 'Web Application',
    highlights: [
      'Comprehensive Java curriculum spanning Core Java, OOPs, Collections, and Multithreading',
      'Syntax-highlighted interactive code modules with instant copy-paste developer ergonomics',
      'Zero-flicker client-side routing with optimized static asset caching and instant search',
      'Accessible dark-mode developer console layout engineered for high technical engagement'
    ],
    architectureOverview: 'Engineered with lightweight React components, optimized virtualized module navigation, and responsive typography tailored to technical code reading. Designed for zero-latency switching between lessons on desktop and mobile devices.',
    metrics: {
      lighthousePerformance: 99,
      pageSpeed: '0.36s',
      accessibility: 100,
      seoScore: 100,
      payloadSize: '138 KB'
    }
  },
  {
    id: 'edusphere',
    name: 'EduSphere',
    slug: 'edusphere',
    industry: 'Education & Academic Technology',
    tagline: 'Modular AI/ML-Driven Student Lifecycle Management Ecosystem',
    description: 'A modular AI/ML-driven student lifecycle platform unifying academic learning, coding assessments, and placement readiness, with an ML engine for performance prediction, risk detection, and personalized recommendations, plus an AI assistant for summarization and study planning.',
    clientName: 'EduSphere Platform',
    deliveryDuration: '4 Weeks',
    completionDate: 'September 2026',
    services: [
      'AI/ML Platform Engineering',
      'Predictive Analytics',
      'Coding Assessments Engine',
      'Placement Readiness Modules',
      'AI Assistant Integration'
    ],
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'scikit-learn', 'Tailwind CSS'],
    liveUrl: 'https://edusphere08.vercel.app/',
    githubUrl: 'https://github.com/Kabil-8',
    verifiedResult: 'Unified student assessment pipeline with predictive machine learning risk models and instant interactive career recommendation tracks.',
    featured: true,
    category: 'Web Application',
    highlights: [
      'Modular AI/ML engine for performance prediction and student drop-out risk detection',
      'Integrated real-time coding assessment sandboxes with automated evaluation metrics',
      'AI-powered assistant for personalized study schedules and curriculum summarization',
      'Comprehensive placement readiness radar charts with skill gap analysis'
    ],
    architectureOverview: 'Architected with a decoupled frontend and Python FastAPI ML inference service, streaming real-time predictions and adaptive recommendation trees with low-latency caching.',
    metrics: {
      lighthousePerformance: 98,
      pageSpeed: '0.42s',
      accessibility: 100,
      seoScore: 100,
      payloadSize: '158 KB'
    }
  },
  {
    id: 'research-works-papers',
    name: 'Research Works & Technical Papers',
    slug: 'research-works-papers',
    industry: 'Computer Science Research & Publications',
    tagline: 'Scientific Research, Algorithmic Benchmarking & Technical Whitepapers',
    description: 'Our dedicated scientific and computer science research division. We formulate algorithmic proofs, conduct empirical computational benchmarks, construct reproducible research artifact codebases, and draft peer-reviewed camera-ready manuscripts formatted for IEEE, ACM, and Springer publications.',
    clientName: 'Alpha Research Lab',
    deliveryDuration: '4-8 Weeks',
    completionDate: 'Active Lab',
    services: [
      'Scientific Research Formulation',
      'Algorithmic Benchmarking',
      'LaTeX / IEEE / ACM Paper Drafting',
      'Reproducible Artifact Engineering',
      'Peer-Review Revisions'
    ],
    technologies: ['Python', 'LaTeX', 'TypeScript', 'C++', 'PyTorch', 'Data Visualization'],
    liveUrl: 'https://edusphere08.vercel.app/',
    githubUrl: 'https://github.com/alpha-encoders/research-artifacts',
    verifiedResult: 'Engineered reproducible experimental benchmarks and formal computer science documentation with mathematical rigor.',
    featured: true,
    category: 'Research Paper',
    highlights: [
      'Mathematical formulation, algorithm design, and complexity analyses',
      'Empirical benchmarking with reproducible artifact repositories',
      'IEEE, ACM, and Springer compliant LaTeX typography and figure generation',
      'Comprehensive state-of-the-art literature reviews and comparative taxonomies'
    ],
    architectureOverview: 'Follows rigorous scientific methodology with automated benchmarking harnesses, containerized computational environments, and modular LaTeX compilation pipelines ensuring exact reproducibility.',
    metrics: {
      lighthousePerformance: 100,
      pageSpeed: '0.29s',
      accessibility: 100,
      seoScore: 100,
      payloadSize: '95 KB'
    }
  }
];

export const getProjectBySlug = (slug: string): ProjectItem | undefined => {
  return projectsData.find((p) => p.slug === slug);
};
