import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  Search,
  ShieldCheck,
  Zap,
  Terminal,
  BookOpen,
  Send,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { ShinyText } from '../components/reactbits/ShinyText';
import { Magnet } from '../components/reactbits/Magnet';
import { Modal } from '../components/shared/Modal';
import { apiUrl } from '../config/api';
import { CodeParticleField } from '../components/animations/CodeParticleField';

export interface DomainTrack {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  technologies: string[];
  durations: string[];
  prerequisites: string;
  highlights: string[];
  color: string;
}

export const DOMAIN_TRACKS: DomainTrack[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack Web Development',
    badge: 'Flagship Track',
    icon: Code2,
    description:
      'Build end-to-end client platforms, reactive e-commerce applications, and scalable microservices using modern React, TypeScript, Node.js, and MongoDB Atlas.',
    technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'PostgreSQL', 'Tailwind CSS'],
    durations: ['1 Month', '3 Months', '6 Months'],
    prerequisites: 'Strong foundation in JavaScript/TypeScript, React fundamentals, and basic REST API concepts.',
    highlights: [
      'Contribute to production applications with live user traffic',
      'Architect robust database schemas with Mongoose and Prisma',
      'Optimize edge caching, SEO metadata, and 95+ Lighthouse scores',
      'Implement JWT/OAuth2 authentication and role-based permissions'
    ],
    color: 'from-blue-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'frontend-uiux',
    name: 'Frontend Engineering & UI/UX Design',
    badge: 'Design & Motion',
    icon: Sparkles,
    description:
      'Design and build cinematic, interactive user experiences with cutting-edge CSS, Framer Motion animations, component-driven design systems, and Figma mockups.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'ReactBits', 'Figma', 'WebGL / Canvas'],
    durations: ['1 Month', '3 Months', '6 Months'],
    prerequisites: 'Passionate about typography, micro-interactions, responsive design, and CSS animations.',
    highlights: [
      'Translate Figma design tokens into production-ready React components',
      'Master 60fps animations, magnet effects, and spotlight cards',
      'Ensure WCAG AA accessibility compliance across all viewports',
      'Build design systems that scale across enterprise web products'
    ],
    color: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'backend-cloud',
    name: 'Backend & Cloud Architecture',
    badge: 'High Scalability',
    icon: Terminal,
    description:
      'Architect resilient microservices, high-throughput REST & GraphQL APIs, distributed database clusters, and cloud-native deployments on AWS and GCP.',
    technologies: ['Node.js', 'Go', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS / GCP'],
    durations: ['3 Months', '6 Months'],
    prerequisites: 'Familiarity with server architectures, database modeling, and asynchronous programming.',
    highlights: [
      'Design high-throughput APIs with rate limiting and circuit breakers',
      'Containerize applications using Docker and CI/CD automated pipelines',
      'Implement multi-layer caching with Redis to reduce database read pressure',
      'Write automated integration tests and stress-test endpoints'
    ],
    color: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'aiml',
    name: 'AI & Machine Learning / GenAI',
    badge: 'Intelligent Systems',
    icon: Cpu,
    description:
      'Deploy Retrieval-Augmented Generation (RAG) pipelines, build autonomous agent workflows, fine-tune lightweight language models, and integrate vector databases.',
    technologies: ['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'ChromaDB / Pinecone', 'FastAPI', 'OpenAI APIs'],
    durations: ['3 Months', '6 Months'],
    prerequisites: 'Python proficiency, familiarity with vector embeddings, transformer architectures, and API integrations.',
    highlights: [
      'Build enterprise document search engines using semantic vector search',
      'Fine-tune open-weight models for specialized technical documentation',
      'Integrate AI conversational copilots into web interfaces',
      'Benchmark hallucination rates and inference latency optimization'
    ],
    color: 'from-purple-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Application Development',
    badge: 'Cross-Platform',
    icon: Layers,
    description:
      'Develop high-performance native and cross-platform mobile apps for iOS and Android with offline-first state synchronization and sleek motion transitions.',
    technologies: ['React Native', 'Expo', 'Flutter', 'TypeScript', 'Firebase', 'SQLite Mobile', 'Native APIs'],
    durations: ['3 Months', '6 Months'],
    prerequisites: 'JavaScript/TypeScript or Dart knowledge with understanding of mobile UI lifecycles.',
    highlights: [
      'Ship fluid mobile navigation with gestures and native animations',
      'Implement offline-first persistent SQLite and cache synchronization',
      'Integrate push notifications, camera, biometric auth, and geocoding',
      'Prepare production builds for App Store and Google Play testing'
    ],
    color: 'from-blue-600/20 via-sky-500/10 to-transparent'
  },
  {
    id: 'cs-research',
    name: 'Computer Science Research & Technical Whitepapers',
    badge: 'Academic & Papers',
    icon: BookOpen,
    description:
      'Conduct rigorous research in distributed systems, algorithmic complexity, and cloud performance. Author reproducible benchmarks and IEEE/ACM-compliant whitepapers.',
    technologies: ['LaTeX / Overleaf', 'Python Benchmarking', 'Distributed Systems', 'Algorithmic Complexity', 'ACM / IEEE'],
    durations: ['3 Months', '6 Months'],
    prerequisites: 'Strong mathematical thinking, CS fundamentals, interest in academic writing and formal proofs.',
    highlights: [
      'Co-author research manuscripts formatted for IEEE/ACM publication',
      'Formulate asymptotic runtime equations and empirical test matrices',
      'Build open-source reproducibility artifacts on GitHub',
      'Draft state-of-the-art comparative literature taxonomies'
    ],
    color: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & DevSecOps',
    badge: 'Security Engineering',
    icon: ShieldCheck,
    description:
      'Perform web penetration testing, OWASP Top 10 remediation, automated vulnerability scans, CI/CD pipeline hardening, and API authentication stress tests.',
    technologies: ['OWASP ZAP', 'Burp Suite', 'SonarQube', 'Docker Security', 'OAuth2 / OIDC', 'Linux Hardening'],
    durations: ['3 Months', '6 Months'],
    prerequisites: 'Knowledge of networking protocols (HTTP/TLS), web vulnerabilities, and Linux CLI.',
    highlights: [
      'Conduct comprehensive vulnerability assessments on production codebases',
      'Automate static and dynamic security testing (SAST/DAST) in GitHub Actions',
      'Audit token lifecycles, CSRF mitigations, and CORS configurations',
      'Produce professional executive security audit reports'
    ],
    color: 'from-rose-500/20 via-red-500/10 to-transparent'
  },
  {
    id: 'digital-seo',
    name: 'Digital Growth, SEO & Product Strategy',
    badge: 'Product & Analytics',
    icon: Globe,
    description:
      'Optimize web platforms for organic search domination, engineer structured JSON-LD schemas, analyze telemetry with GA4, and drive user conversion funnels.',
    technologies: ['Technical SEO', 'JSON-LD Schema', 'Core Web Vitals', 'Google Search Console', 'GA4', 'A/B Testing'],
    durations: ['1 Month', '3 Months'],
    prerequisites: 'Basic understanding of HTML, web analytics, content structure, and search engine ranking factors.',
    highlights: [
      'Audit and optimize Core Web Vitals (LCP, FID/INP, CLS) to 100/100',
      'Implement rich search snippets and semantic knowledge graph tags',
      'Analyze user interaction funnels and run programmatic landing page tests',
      'Formulate data-backed keyword strategy and technical marketing playbooks'
    ],
    color: 'from-teal-500/20 via-emerald-500/10 to-transparent'
  }
];

export const CareersPage: React.FC = () => {
  const location = useLocation();

  // Filter state
  // Search filter state
  const [searchQuery, setSearchQuery] = useState('');

  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedDomainForForm, setSelectedDomainForForm] = useState(DOMAIN_TRACKS[0].name);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    graduationYear: '2026',
    domain: DOMAIN_TRACKS[0].name,
    experienceLevel: 'Intermediate',
    skills: '',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    resumeUrl: '',
    statementOfPurpose: '',
    duration: '3 Months',
    startDate: 'Immediate'
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [submittedApplicationId, setSubmittedApplicationId] = useState<string | null>(null);

  // Application Status Lookup State
  const [lookupId, setLookupId] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupError, setLookupError] = useState('');

  // Auto-scroll to application form if url has #apply
  useEffect(() => {
    if (location.hash === '#apply') {
      const el = document.getElementById('apply-form-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  const handleOpenApplyModal = (domainName?: string) => {
    const targetDomain = domainName || DOMAIN_TRACKS[0].name;
    setSelectedDomainForForm(targetDomain);
    setFormData((prev) => ({ ...prev, domain: targetDomain }));
    setFormError('');
    setIsApplyModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.college ||
        !formData.degree ||
        !formData.domain ||
        !formData.resumeUrl ||
        !formData.statementOfPurpose
      ) {
        throw new Error('Please fill out all required fields before submitting.');
      }

      const res = await fetch(apiUrl('/api/internships'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit application.');
      }

      setSubmittedApplicationId(data.applicationId || data.internship?.id);
    } catch (err: any) {
      setFormError(err.message || 'Error submitting application.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleStatusLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupId.trim()) return;

    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await fetch(apiUrl(`/api/internships/${encodeURIComponent(lookupId.trim())}`));
      const data = await res.json();
      if (!res.ok || !data.success || !data.internship) {
        throw new Error('No application found with this Application ID or Email. Please check and try again.');
      }
      setLookupResult(data.internship);
    } catch (err: any) {
      setLookupError(err.message || 'Lookup failed.');
    } finally {
      setLookupLoading(false);
    }
  };

  const filteredTracks = DOMAIN_TRACKS.filter((track) => {
    return (
      searchQuery === '' ||
      track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="relative min-h-screen bg-[#050816] text-white pt-24 pb-20 overflow-hidden">
      {/* Background Ambience & Floating Developer Code Particles */}
      <CodeParticleField />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-3/4 -left-48 w-[400px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* ============================================================= */}
        {/* HERO SECTION */}
        {/* ============================================================= */}
        <div className="text-center space-y-6 max-w-4xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1024] border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,255,0.2)]">
            <GraduationCap className="w-4 h-4 text-[#22D3EE] animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-blue-200">
              Alpha Encoders Talent Program • 2026 Cohort
            </span>
          </div>

          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Build Real Production Systems.{' '}
            <span className="block mt-1">
              <ShinyText text="Launch Your Tech Career." speed={3} className="text-cyan-400 font-extrabold" />
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Join Alpha Encoders as an engineering, design, or research intern. You won’t build toy tutorial projects—you
            will write code that ships to real production platforms, work with experienced software architects, and
            earn verified credentials.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Magnet magnetStrength={0.25}>
              <button
                type="button"
                onClick={() => handleOpenApplyModal()}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-['Space_Grotesk'] font-bold text-sm shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_35px_rgba(37,99,255,0.5)] transition-all hover:scale-[1.02]"
              >
                <span>Apply for Internship</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Magnet>

            <a
              href="#track-status"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0A1024] hover:bg-[#101A31] text-slate-300 hover:text-white border border-slate-800 text-sm font-semibold transition-all"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Track Application Status</span>
            </a>
          </div>

          {/* Key Program Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-[#0A1024]/80 border border-slate-800 text-center">
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-cyan-400">8+</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Specialized Domains</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A1024]/80 border border-slate-800 text-center">
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Remote & Hybrid</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A1024]/80 border border-slate-800 text-center">
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-blue-400">1:1</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Architect Mentorship</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A1024]/80 border border-slate-800 text-center">
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-purple-400">PPO</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Full-Time Pathways</div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* DOMAIN TRACKS DIRECTORY */}
        {/* ============================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                Available Internship Roles
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white mt-1">
                Explore All Engineering Domains
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Choose the domain that matches your career trajectory. Each role offers structured sprints, code
                reviews, and verifiable projects.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search domains or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A1024] border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredTracks.map((track) => {
              const IconComp = track.icon;
              return (
                <SpotlightCard
                  key={track.id}
                  spotlightColor="rgba(34, 211, 238, 0.12)"
                  className="rounded-3xl bg-[#0A1024] border border-slate-800 hover:border-cyan-400/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group shadow-lg"
                >
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-[#101A31] border border-blue-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-300 font-semibold">
                            {track.badge}
                          </span>
                          <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                            {track.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed">{track.description}</p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                        Core Learning & Deliverables:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {track.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prerequisites */}
                    <div className="p-3 rounded-xl bg-[#101A31]/50 border border-slate-800/80 text-xs text-slate-400">
                      <span className="text-cyan-400 font-semibold">Prerequisites:</span> {track.prerequisites}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {track.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#101A31] text-slate-300 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{track.durations.join(' • ')}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenApplyModal(track.name)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white font-['Space_Grotesk'] text-xs font-bold transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(37,99,255,0.4)]"
                    >
                      <span>Apply For This Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* ============================================================= */}
        {/* WHY INTERN AT ALPHA ENCODERS (PROGRAM ADVANTAGES) */}
        {/* ============================================================= */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0A1024] to-[#050816] border border-slate-800 p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              The Alpha Encoders Experience
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white">
              Why Our Internship is Different
            </h2>
            <p className="text-sm text-slate-400">
              We treat interns as junior associates from day one. You will write code with Git workflows, deploy to
              staging environments, and experience modern engineering culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-[#101A31]/50 border border-slate-800/80 space-y-3">
              <div className="p-3 w-fit rounded-xl bg-blue-600/20 text-cyan-300">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Production-Ready Portfolio</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Work on actual client projects and research whitepapers. Add live URLs and verified repositories to
                your resume that stand out to technical interviewers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#101A31]/50 border border-slate-800/80 space-y-3">
              <div className="p-3 w-fit rounded-xl bg-cyan-600/20 text-cyan-300">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Official Verification & LOR</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive an official certificate of completion with a cryptographically verifiable ID, plus a personalized
                Letter of Recommendation (LOR) for top performers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#101A31]/50 border border-slate-800/80 space-y-3">
              <div className="p-3 w-fit rounded-xl bg-emerald-600/20 text-emerald-300">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Direct Pre-Placement Offer (PPO)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-impact contributors are directly considered for full-time junior engineer and research associate
                roles at Alpha Encoders upon graduation.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* REAL-TIME APPLICATION STATUS TRACKER */}
        {/* ============================================================= */}
        <div id="track-status" className="rounded-3xl bg-[#0A1024] border border-blue-500/30 p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Candidate Portal
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white mt-1">
                Track Your Internship Application
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your Application Reference ID (e.g. <code className="text-cyan-300 font-mono">AE-INT-260101</code>)
                or your registered email to check your status live.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenApplyModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-['Space_Grotesk'] text-xs font-bold transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit New Application</span>
            </button>
          </div>

          <form onSubmit={handleStatusLookup} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <input
              type="text"
              placeholder="Enter Application ID (AE-INT-...) or Email..."
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
              className="flex-grow px-4 py-3 rounded-xl bg-[#101A31] border border-slate-700/80 focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={lookupLoading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-['Space_Grotesk'] font-bold text-sm transition-all disabled:opacity-50"
            >
              {lookupLoading ? (
                <span>Checking...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Track Status</span>
                </>
              )}
            </button>
          </form>

          {lookupError && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{lookupError}</span>
            </div>
          )}

          {lookupResult && (
            <div className="p-6 rounded-2xl bg-[#101A31] border border-slate-700 space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Application Reference</span>
                  <div className="font-['Space_Grotesk'] font-bold text-lg text-white font-mono">
                    {lookupResult.id}
                  </div>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider ${
                      lookupResult.status === 'accepted'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : lookupResult.status === 'shortlisted' || lookupResult.status === 'interview'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                        : lookupResult.status === 'reviewing'
                        ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                        : lookupResult.status === 'rejected'
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    STATUS: {lookupResult.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-mono">Candidate:</span>
                  <span className="font-bold text-white">{lookupResult.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Domain Track:</span>
                  <span className="font-bold text-cyan-300">{lookupResult.domain}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">College / University:</span>
                  <span className="font-bold text-slate-200">{lookupResult.college}</span>
                </div>
              </div>

              {lookupResult.adminNotes && (
                <div className="p-3.5 rounded-xl bg-[#0A1024] border border-slate-800 text-xs space-y-1">
                  <span className="text-cyan-400 font-mono font-semibold uppercase text-[10px] block">
                    Review Board Feedback:
                  </span>
                  <p className="text-slate-300">{lookupResult.adminNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================= */}
      {/* APPLICATION MODAL / MULTI-STEP SUBMISSION DRAWER */}
      {/* ============================================================= */}
      {/* ============================================================= */}
      {/* APPLICATION MODAL / MULTI-STEP SUBMISSION DRAWER */}
      {/* ============================================================= */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        maxWidth="3xl"
        subtitle={!submittedApplicationId ? "Talent Cohort 2026" : undefined}
        title={
          !submittedApplicationId ? (
            <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-white">
              Internship Application • <span className="text-cyan-400">{selectedDomainForForm}</span>
            </h3>
          ) : undefined
        }
      >
        {submittedApplicationId ? (
          /* Success Confirmation Screen */
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
              Application Submitted Successfully!
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Thank you for applying to Alpha Encoders. Our engineering and research review board will examine your
              portfolio and reach out within 2-4 business days.
            </p>

            <div className="p-4 rounded-2xl bg-[#101A31] border border-slate-700 max-w-sm mx-auto font-mono text-center">
              <span className="text-xs text-slate-400 block uppercase">Your Application Reference ID:</span>
              <span className="text-xl font-bold text-cyan-300 select-all block mt-1">
                {submittedApplicationId}
              </span>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsApplyModalOpen(false);
                  setSubmittedApplicationId(null);
                }}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <>
            {formError && (
              <div className="p-3.5 mb-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Section 1: Candidate Basics */}
                  <div className="space-y-4">
                    <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white border-l-2 border-cyan-400 pl-2">
                      1. Candidate Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="e.g. K.Kabil"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="kabilk2023@gmail.com"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Phone / WhatsApp Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 8667452487"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">College / University *</label>
                        <input
                          type="text"
                          name="college"
                          required
                          placeholder="e.g. IIT Madras, BITS, NIT Trichy"
                          value={formData.college}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Degree & Major *</label>
                        <input
                          type="text"
                          name="degree"
                          required
                          placeholder="e.g. B.Tech Computer Science"
                          value={formData.degree}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Graduation Year</label>
                        <select
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="Recent Graduate">Recent Graduate</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Domain & Technical Skills */}
                  <div className="space-y-4">
                    <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white border-l-2 border-cyan-400 pl-2">
                      2. Domain Track & Expertise
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Target Specialization Domain *</label>
                        <select
                          name="domain"
                          value={formData.domain}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-cyan-300 font-semibold focus:outline-none focus:border-cyan-400"
                        >
                          {DOMAIN_TRACKS.map((t) => (
                            <option key={t.id} value={t.name}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Self-Assessed Experience Level</label>
                        <select
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="Beginner (Solid fundamentals)">Beginner (Solid fundamentals)</option>
                          <option value="Intermediate (Built personal projects)">
                            Intermediate (Built personal projects)
                          </option>
                          <option value="Advanced (Production / freelance experience)">
                            Advanced (Production / freelance experience)
                          </option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-400 font-mono mb-1">
                          Primary Technologies & Skills (comma separated)
                        </label>
                        <input
                          type="text"
                          name="skills"
                          placeholder="e.g. React, TypeScript, Node.js, Express, Tailwind, MongoDB"
                          value={formData.skills}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Portfolio, GitHub & Resume */}
                  <div className="space-y-4">
                    <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white border-l-2 border-cyan-400 pl-2">
                      3. Profiles & Resume
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Resume / CV Link (Google Drive / Notion / PDF) *</label>
                        <input
                          type="url"
                          name="resumeUrl"
                          required
                          placeholder="https://drive.google.com/file/d/..."
                          value={formData.resumeUrl}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                        <span className="text-[10px] text-slate-500">Ensure Google Drive link sharing is set to 'Anyone with link can view'</span>
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">GitHub Profile URL</label>
                        <input
                          type="url"
                          name="githubUrl"
                          placeholder="https://github.com/your-username"
                          value={formData.githubUrl}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Portfolio or Live Project URL</label>
                        <input
                          type="url"
                          name="portfolioUrl"
                          placeholder="https://yourportfolio.dev"
                          value={formData.portfolioUrl}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">LinkedIn Profile</label>
                        <input
                          type="url"
                          name="linkedinUrl"
                          placeholder="https://linkedin.com/in/your-profile"
                          value={formData.linkedinUrl}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Statement of Purpose & Availability */}
                  <div className="space-y-4">
                    <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white border-l-2 border-cyan-400 pl-2">
                      4. Motivation & Availability
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Internship Duration</label>
                        <select
                          name="duration"
                          value={formData.duration}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="1 Month">1 Month (Intensive Sprint)</option>
                          <option value="3 Months">3 Months (Standard Cohort)</option>
                          <option value="6 Months">6 Months (Comprehensive Capstone)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 font-mono mb-1">Earliest Start Date</label>
                        <select
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="Immediate">Immediate</option>
                          <option value="Within 2 Weeks">Within 2 Weeks</option>
                          <option value="Next Month">Next Month</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-400 font-mono mb-1">
                          Statement of Purpose / Why Alpha Encoders? *
                        </label>
                        <textarea
                          name="statementOfPurpose"
                          required
                          rows={3}
                          placeholder="Tell us about your background, key projects you've built, and why you are excited to intern with Alpha Encoders..."
                          value={formData.statementOfPurpose}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submission Buttons */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-['Space_Grotesk'] font-bold text-xs shadow-lg shadow-blue-500/25 hover:shadow-cyan-400/30 transition-all disabled:opacity-50"
                    >
                      {formSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Application to Board</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
      </Modal>
    </div>
  );
};

export default CareersPage;
