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
  AlertCircle,
  Check,
  Copy,
  FileCheck,
  FileBadge,
  UploadCloud,
  ExternalLink,
  Lock,
  Receipt
} from 'lucide-react';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { ShinyText } from '../components/reactbits/ShinyText';
import { Magnet } from '../components/reactbits/Magnet';
import { Modal } from '../components/shared/Modal';
import { apiUrl } from '../config/api';
import { CodeParticleField } from '../components/animations/CodeParticleField';
import { GridScan } from '../components/reactbits/GridScan';

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

  // Dynamic Free Slots & Stats from Backend
  const [stats, setStats] = useState<{
    totalApplications: number;
    freeSlotsUsed: number;
    freeSlotsTotal: number;
    remainingFreeSlots: number;
    isFreeSlotsFull: boolean;
    standardFee: number;
    upiId: string;
    payeeName: string;
  }>({
    totalApplications: 3,
    freeSlotsUsed: 3,
    freeSlotsTotal: 50,
    remainingFreeSlots: 47,
    isFreeSlotsFull: false,
    standardFee: 150,
    upiId: 'kabilk2023@oksbi',
    payeeName: 'Kabil'
  });

  const fetchStats = async () => {
    try {
      const res = await fetch(apiUrl('/api/internships/stats'));
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.warn('Could not fetch real-time internship stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Filter state
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
    startDate: 'Immediate',
    feeType: 'free',
    transactionId: '',
    paymentScreenshot: ''
  });

  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [activeQrMode, setActiveQrMode] = useState<'dynamic' | 'card'>('dynamic');
  const [copiedUpi, setCopiedUpi] = useState(false);

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
    const initialFee = stats.remainingFreeSlots > 0 ? 'free' : 'paid';
    setFormData((prev) => ({
      ...prev,
      domain: targetDomain,
      feeType: initialFee
    }));
    setFormError('');
    setIsApplyModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setFormError('Screenshot image must be less than 15MB. Please upload a smaller file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setScreenshotPreview(base64);
      setFormData((prev) => ({ ...prev, paymentScreenshot: base64 }));
    };
    reader.readAsDataURL(file);
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

      // If fee is paid, enforce payment screenshot and transaction ID
      const isPaid = formData.feeType === 'paid' || stats.remainingFreeSlots <= 0;
      if (isPaid) {
        if (!formData.transactionId || !formData.transactionId.trim()) {
          throw new Error('Please enter your 12-digit UPI Transaction / UTR ID from Google Pay.');
        }
        if (!formData.paymentScreenshot) {
          throw new Error('Please upload your ₹150 payment screenshot. Proof of payment is required for enrollment verification.');
        }
      }

      const res = await fetch(apiUrl('/api/internships'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          feeType: isPaid ? 'paid' : 'free'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit application.');
      }

      setSubmittedApplicationId(data.applicationId || data.internship?.id);
      fetchStats();
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
      {/* 3D Cybernetic Perspective Grid Scan Room (Fit to screen & static) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-35">
        <GridScan
          scanColor="#22D3EE"
          linesColor="#1E293B"
          cells={10}
          depth={4}
          glow={0.6}
          lineThickness={1}
          interactive={true}
        />
      </div>

      {/* Background Ambience & Floating Developer Code Particles */}
      <CodeParticleField className="opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/10 blur-[140px] pointer-events-none" />
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
        {/* DYNAMIC FREE 50 STUDENTS COUNTER & TALENT SCHOLARSHIP BANNER */}
        {/* ============================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1536] via-[#080E24] to-[#040817] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.12)] overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>2026 Talent Grant • 100% Free for First 50 Students</span>
              </div>

              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Claim Your Free Internship Spot.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Zero Fee for First 50 Enrollees.
                </span>
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                To empower passionate student developers, Alpha Encoders sponsors the entire admission cost for the first
                50 selected students (100% Free). For applicants following slot 50, a standard verification fee of <strong>₹150</strong> applies.
              </p>

              {/* Dynamic Live Counter & Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Dynamic Slot Counter:</span>
                    <strong className="text-white font-bold">{stats.freeSlotsUsed} of {stats.freeSlotsTotal} Slots Claimed</strong>
                  </span>
                  <span className={stats.remainingFreeSlots > 0 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {stats.remainingFreeSlots > 0
                      ? `${stats.remainingFreeSlots} Free Slots Remaining!`
                      : 'Free Slots Full • Standard ₹150 Active'}
                  </span>
                </div>

                {/* Animated Glowing Progress Bar */}
                <div className="w-full h-3.5 rounded-full bg-slate-900/90 border border-slate-700/80 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-1000 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    style={{
                      width: `${Math.min(100, Math.max(6, (stats.freeSlotsUsed / stats.freeSlotsTotal) * 100))}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Action & Slot Claim Button */}
            <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 w-full sm:w-auto">
              <div className="p-4 rounded-2xl bg-[#050816]/90 border border-slate-800 text-center sm:text-right space-y-1 w-full sm:w-64">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Current Admission Fee</div>
                <div className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                  {stats.remainingFreeSlots > 0 ? (
                    <span className="text-emerald-400">₹0 <span className="text-xs text-slate-400 line-through">₹150</span> (Free Grant)</span>
                  ) : (
                    <span className="text-cyan-400">₹150.00 <span className="text-xs text-slate-400">(Standard)</span></span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {stats.remainingFreeSlots > 0 ? `Next applicant gets Slot #${stats.freeSlotsUsed + 1}` : 'Direct review queue'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenApplyModal()}
                className="w-full sm:w-64 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-white font-['Space_Grotesk'] font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <span>{stats.remainingFreeSlots > 0 ? 'Claim Free Scholarship Slot' : 'Enroll with ₹150'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* PURE PROFESSIONAL PROGRAM: LOI, CERTIFICATE, LOR SHOWCASE */}
        {/* ============================================================= */}
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Industry Standard Accreditation
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white">
              Pure Professional Credentials for Every Intern
            </h2>
            <p className="text-slate-400 text-sm">
              Whether you enroll via the Free 50 Grant or Standard ₹150 verification, you receive all 3 official engineering deliverables to jumpstart your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Credential 1: LOI */}
            <div className="p-6 rounded-3xl bg-[#0A1024] border border-blue-500/30 hover:border-blue-400 transition-all duration-300 space-y-4 shadow-lg group relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileBadge className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-950 text-blue-300 border border-blue-500/30">
                  Appointment Phase
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                  Letter of Intent (LOI)
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Official offer letter issued immediately upon board selection. Confirms your designated domain track, duration, architect mentor, and start date. Fully recognized for college internship credit approvals.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Issued upon board acceptance</span>
              </div>
            </div>

            {/* Credential 2: Verified Completion Certificate */}
            <div className="p-6 rounded-3xl bg-[#0A1024] border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 space-y-4 shadow-lg group relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Graduation Phase
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                  Verified Completion Certificate
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tamper-proof completion certificate featuring a unique public Verification ID and scannable QR code. Seamlessly embeddable on LinkedIn, GitHub, and portfolios to prove hands-on production code contributions.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cryptographically verifiable online</span>
              </div>
            </div>

            {/* Credential 3: Letter of Recommendation (LOR) */}
            <div className="p-6 rounded-3xl bg-[#0A1024] border border-purple-500/30 hover:border-purple-400 transition-all duration-300 space-y-4 shadow-lg group relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-500/30">
                  Leadership Endorsement
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                  Letter of Recommendation (LOR)
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Personalized, detailed recommendation letter signed by engineering leadership detailing your sprint deliverables, technical mastery, problem-solving agility, and collaborative teamwork.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Signed by Senior Software Architects</span>
              </div>
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
                <div className="flex items-center gap-2 flex-wrap">
                  {lookupResult.feeType === 'paid' ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      ₹150 Fee • {lookupResult.paymentStatus === 'verified' ? 'Proof Verified' : 'Awaiting Proof Check'}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      🎉 Free Grant (Slot #{lookupResult.slotNumber || 1}/50)
                    </span>
                  )}
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
              {formData.feeType === 'paid' || stats.remainingFreeSlots <= 0
                ? 'Your application and ₹150 payment screenshot have been delivered to the admin dashboard. Once your payment proof is verified by the admin, your official Letter of Intent (LOI) will be granted.'
                : `Congratulations! You have secured a Free Early-Bird Slot! Our technical review board is evaluating your profile and will grant your official Letter of Intent (LOI).`}
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

                  {/* Section 5: Admission Category & Enrollment Verification */}
                  <div className="space-y-4 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white border-l-2 border-cyan-400 pl-2 flex items-center gap-2">
                        <span>5. Admission Category & Verification Fee</span>
                      </h4>
                      <span className="text-[11px] font-mono text-cyan-400">
                        {stats.remainingFreeSlots > 0
                          ? `🎉 ${stats.remainingFreeSlots}/50 Free Seats Active`
                          : '⚡ Standard Admission (₹150)'}
                      </span>
                    </div>

                    {/* Category Selector if free slots available */}
                    {stats.remainingFreeSlots > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <label
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            formData.feeType === 'free'
                              ? 'bg-emerald-950/40 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50'
                              : 'bg-[#101A31]/60 border-slate-700/60 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Free Early-Bird Grant</span>
                              </div>
                              <div className="text-[11px] text-emerald-300 font-mono mt-0.5">
                                Slot #{stats.freeSlotsUsed + 1} of 50
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="feeType"
                              value="free"
                              checked={formData.feeType === 'free'}
                              onChange={handleFormChange}
                              className="text-emerald-500 focus:ring-emerald-400 mt-1"
                            />
                          </div>
                          <div className="mt-2 text-[10px] text-slate-300">
                            100% Fee Waived (₹0). Includes full LOI, Completion Certificate & LOR.
                          </div>
                        </label>

                        <label
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            formData.feeType === 'paid'
                              ? 'bg-blue-950/40 border-cyan-500/80 shadow-[0_0_15px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/50'
                              : 'bg-[#101A31]/60 border-slate-700/60 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <Receipt className="w-3.5 h-3.5 text-cyan-400" />
                                <span>Standard Admission</span>
                              </div>
                              <div className="text-[11px] text-cyan-300 font-mono mt-0.5">₹150 Registration Fee</div>
                            </div>
                            <input
                              type="radio"
                              name="feeType"
                              value="paid"
                              checked={formData.feeType === 'paid'}
                              onChange={handleFormChange}
                              className="text-cyan-500 focus:ring-cyan-400 mt-1"
                            />
                          </div>
                          <div className="mt-2 text-[10px] text-slate-300">
                            Direct queue, priority mentor code reviews & credential verification.
                          </div>
                        </label>
                      </div>
                    ) : (
                      /* Free slots full - Standard only */
                      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-amber-200">All 50 Free Scholarship Slots Claimed!</div>
                          <div className="text-slate-300 text-[11px] mt-0.5">
                            Standard admission is currently active. The internship fee is <strong>₹150</strong> which covers your Letter of Intent (LOI), Verified Completion Certificate, and Letter of Recommendation (LOR).
                          </div>
                        </div>
                      </div>
                    )}

                    {/* If Paid Slot: Show ₹150 UPI Scanner & Screenshot Upload */}
                    {(formData.feeType === 'paid' || stats.remainingFreeSlots <= 0) && (
                      <div className="p-4 rounded-2xl bg-[#080E24] border border-cyan-500/40 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                            <span className="font-['Space_Grotesk'] text-sm font-bold text-white">
                              Scan & Pay ₹150 via Google Pay / Any UPI App
                            </span>
                          </div>
                          {/* Toggle QR mode */}
                          <div className="flex items-center bg-[#101A31] p-0.5 rounded-lg border border-slate-700 text-[10px] font-mono">
                            <button
                              type="button"
                              onClick={() => setActiveQrMode('dynamic')}
                              className={`px-2 py-1 rounded transition-colors ${
                                activeQrMode === 'dynamic' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              ₹150 Preloaded QR
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveQrMode('card')}
                              className={`px-2 py-1 rounded transition-colors ${
                                activeQrMode === 'card' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              Official GPay Card
                            </button>
                          </div>
                        </div>

                        {/* QR Code Container */}
                        <div className="flex flex-col sm:flex-row items-center gap-5 bg-[#050816] p-4 rounded-2xl border border-slate-800">
                          <div className="relative group shrink-0">
                            {activeQrMode === 'dynamic' ? (
                              <div className="relative p-2.5 bg-white rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.25)] flex flex-col items-center justify-center">
                                <img
                                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                                    'upi://pay?pa=kabilk2023@oksbi&pn=Kabil&am=150.00&cu=INR&tn=Alpha%20Encoders%20Internship%20Fee'
                                  )}&margin=10`}
                                  alt="UPI QR Scanner - Preloaded ₹150"
                                  className="w-44 h-44 object-contain rounded-xl"
                                />
                                <div className="text-[10px] text-slate-800 font-mono font-bold mt-1 text-center">
                                  ₹150 PRE-LOADED IN GPAY
                                </div>
                              </div>
                            ) : (
                              <div className="relative p-1 bg-white rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.25)] flex flex-col items-center justify-center max-w-[200px]">
                                <img
                                  src="/images/gpay-scanner.jpg"
                                  alt="Google Pay Scanner"
                                  className="w-44 h-auto object-contain rounded-xl"
                                />
                              </div>
                            )}
                          </div>

                          <div className="space-y-2.5 text-xs flex-grow w-full">
                            <div>
                              <div className="text-slate-400 text-[10px] font-mono uppercase">Payee Name</div>
                              <div className="font-bold text-white text-sm">Kabil (Alpha Encoders Lead)</div>
                            </div>

                            <div>
                              <div className="text-slate-400 text-[10px] font-mono uppercase">Verified UPI ID</div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <code className="px-2.5 py-1 rounded-lg bg-[#101A31] border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
                                  kabilk2023@oksbi
                                </code>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText('kabilk2023@oksbi');
                                    setCopiedUpi(true);
                                    setTimeout(() => setCopiedUpi(false), 2000);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#101A31] hover:bg-slate-800 text-slate-300 text-xs font-mono inline-flex items-center gap-1 border border-slate-700"
                                >
                                  {copiedUpi ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            <div>
                              <div className="text-slate-400 text-[10px] font-mono uppercase">Fee Amount</div>
                              <div className="text-emerald-400 font-bold text-base font-mono">
                                ₹150.00 <span className="text-[11px] text-slate-400 font-normal">(One-time)</span>
                              </div>
                            </div>

                            <a
                              href="upi://pay?pa=kabilk2023@oksbi&pn=Kabil&am=150.00&cu=INR&tn=Alpha%20Encoders%20Internship%20Fee"
                              className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md hover:brightness-110 transition-all sm:hidden"
                            >
                              <span>Tap to Open GPay / UPI App (₹150)</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                        {/* Transaction ID & Screenshot Upload Form */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                          <div>
                            <label className="block text-slate-300 font-mono mb-1">
                              UPI Transaction ID / UTR Number *
                            </label>
                            <input
                              type="text"
                              required
                              name="transactionId"
                              placeholder="e.g. 423456789012 (12 digits)"
                              value={formData.transactionId}
                              onChange={handleFormChange}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-cyan-500/40 focus:border-cyan-400 text-white placeholder-slate-500 font-mono text-xs focus:outline-none"
                            />
                            <span className="text-[10px] text-slate-400">Found on your GPay / UPI payment receipt</span>
                          </div>

                          <div>
                            <label className="block text-slate-300 font-mono mb-1">
                              Upload Payment Screenshot (₹150) *
                            </label>
                            <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-dashed border-cyan-500/50 hover:border-cyan-400 cursor-pointer text-slate-300 text-xs font-mono transition-all">
                              <UploadCloud className="w-4 h-4 text-cyan-400" />
                              <span className="truncate">
                                {screenshotPreview ? 'Change Screenshot' : 'Choose Receipt Image'}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotUpload}
                                className="hidden"
                              />
                            </label>
                            <span className="text-[10px] text-slate-400">JPG, PNG, WebP up to 15MB</span>
                          </div>
                        </div>

                        {/* Live Screenshot Preview Thumbnail */}
                        {screenshotPreview && (
                          <div className="p-3 rounded-xl bg-[#050816] border border-cyan-500/40 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={screenshotPreview}
                                alt="Screenshot Preview"
                                className="w-14 h-14 object-cover rounded-lg border border-slate-700"
                              />
                              <div>
                                <div className="font-bold text-white text-xs">Payment Screenshot Attached</div>
                                <div className="text-[10px] text-emerald-400 font-mono">Ready for admin verification</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setScreenshotPreview(null);
                                setFormData((prev) => ({ ...prev, paymentScreenshot: '' }));
                              }}
                              className="text-xs text-rose-400 hover:text-rose-300 font-mono px-2 py-1 rounded bg-slate-900 border border-rose-500/30"
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        {/* Acceptance Gate Warning */}
                        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-300 flex items-start gap-2.5">
                          <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                          <div className="leading-relaxed">
                            <strong>Mandatory Acceptance Verification Policy:</strong> After sending the screenshot of ₹150, our administration team will verify your transaction. <strong>Until verified, you will not be accepted into the internship.</strong> Once the screenshot of 150 is approved by the admin, you will receive your official Letter of Intent (LOI) and onboarding package.
                          </div>
                        </div>
                      </div>
                    )}
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
