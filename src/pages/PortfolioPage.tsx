import React, { useEffect, useRef, useState } from 'react';
import {
  GraduationCap,
  Code2,
  Terminal,
  Cpu,
  Database,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Users,
  ArrowRight,
  Send,
  Layers,
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { SectionHeading } from '../components/shared/SectionHeading';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { Magnet } from '../components/reactbits/Magnet';
import { BorderBeam } from '../components/reactbits/BorderBeam';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { GridScan } from '../components/reactbits/GridScan';
import { ConstellationGrid } from '../components/animations/ConstellationGrid';
import './PortfolioPage.css';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Project {
  num: string;
  title: string;
  desc: string;
  date: string;
  url: string;
  tags: string[];
  category: 'fullstack' | 'ai' | 'systems' | 'frontend';
}

const projectsList: Project[] = [
  {
    num: '01',
    title: 'TheCustomNest - Crochet E-Commerce Storefront',
    desc: 'Built a crochet e-commerce storefront using React, TypeScript, Vite, Tailwind CSS, and Framer Motion, with a login-gated cart and wishlist, a role-protected admin dashboard, and order tracking.',
    date: 'Sept 2026 – Oct 2026',
    url: 'https://www.thecustomnest.shop/',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    category: 'frontend'
  },
  {
    num: '02',
    title: 'EduSphere - AI-Powered Student Lifecycle Management Ecosystem',
    desc: 'Modular AI/ML-driven student lifecycle platform unifying academic learning, coding assessments, and placement readiness, with an ML engine for performance prediction, risk detection, and personalized recommendations, plus an AI assistant for summarization and study planning.',
    date: 'Jul 2026 – Sept 2026',
    url: 'https://github.com/Kabil-8',
    tags: ['Python', 'FastAPI', 'scikit-learn', 'React', 'MongoDB', 'LLM Integration'],
    category: 'ai'
  },
  {
    num: '03',
    title: 'TalentAI ATS - Enterprise AI-Powered Applicant Tracking System',
    desc: 'Architected a modular, enterprise-ready ATS with a Docker-orchestrated stack (MongoDB, Node.js/Express, Python FastAPI AI microservice, React 19), automating recruitment workflows and cutting recruiter workload by over 80%.',
    date: 'Jun – Jul 2026',
    url: 'https://github.com/Kabil-8',
    tags: ['Docker', 'FastAPI', 'Node.js', 'Express', 'MongoDB', 'React 19'],
    category: 'ai'
  },
  {
    num: '04',
    title: 'EmoLearn - AI Powered Emotion Based Learning System',
    desc: 'An AI-powered emotion-based learning platform using the MERN stack, FastAPI, OpenCV, and DeepFace, enabling real-time emotion detection and adaptive content personalization with secure JWT authentication and live analytics.',
    date: 'Mar – May 2026',
    url: 'https://github.com/Kabil-8/EmoLearn---Averexis',
    tags: ['OpenCV', 'DeepFace', 'FastAPI', 'MERN Stack', 'JWT', 'Computer Vision'],
    category: 'ai'
  },
  {
    num: '05',
    title: 'SpendWise AI',
    desc: 'An AI-powered startup spend audit platform using Next.js 15, TypeScript, Tailwind CSS, Zustand, and Anthropic Claude, delivering personalized cost-saving recommendations, lead capture, and shareable audit reports.',
    date: 'May – Jun 2026',
    url: 'https://github.com/Kabil-8/SpendWise-AI',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Claude AI API'],
    category: 'ai'
  },
  {
    num: '06',
    title: 'RealTime Collaborative Workspace',
    desc: 'Developed a MERN-based real-time collaborative workspace application featuring secure JWT authentication, role-based access control, workspace and Kanban board management, invitation-based collaboration with RESTful APIs.',
    date: 'Jun – Jul 2026',
    url: 'https://github.com/Kabil-8/Real-Time-Collaborative-Workspace',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'REST APIs'],
    category: 'fullstack'
  },
  {
    num: '07',
    title: 'HireFlow - Resume Shortlisting Platform',
    desc: 'Designed and implemented a Resume Shortlisting Platform to streamline candidate screening, automate resume filtering, facilitate interview scheduling, and provide comprehensive admin controls.',
    date: 'Aug – Sept 2025',
    url: 'https://github.com/Kabil-8/Resume-Tracker---Frontend',
    tags: ['React.js', 'Python', 'FastAPI', 'Tailwind CSS', 'Document Parsing'],
    category: 'fullstack'
  },
  {
    num: '08',
    title: 'LivePresence - HR Management System',
    desc: 'An HR solution to manage employee attendance, leave, payroll, and profiles. Centralizes workforce data for easier monitoring and reporting.',
    date: 'Jun – Aug 2025',
    url: 'https://github.com/Kabil-8/Gen-AI-HRMS-Frontend',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'JWT Auth'],
    category: 'systems'
  }
];

export const PortfolioPage: React.FC = () => {
  const heroCardRef = useRef<HTMLDivElement | null>(null);

  // Filter tabs state
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'fullstack' | 'systems' | 'frontend'>('all');

  // Typing carousel state
  const [typedText, setTypedText] = useState<string>('AI/ML Full Stack Developer');

  // Active section for dock scroll spy
  const [activeSection, setActiveSection] = useState<string>('overview');

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formErrors, setFormErrors] = useState({ name: false, email: false, msg: false });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. TYPING CAROUSEL
  useEffect(() => {
    const words = [
      'AI/ML Full Stack Developer',
      'Computer Vision & LLM Integrator',
      'Backend & Distributed Systems Architect',
      'REST API & Microservice Specialist',
      'MERN & FastAPI Engineer'
    ];
    let wi = 0;
    let ci = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const word = words[wi];
      if (!deleting) {
        ci++;
        setTypedText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        ci--;
        setTypedText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 30);
      }
    }

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  // 2. SCROLL SPY FOR DOCK
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'education', 'skills', 'projects', 'experience', 'certifications', 'leadership', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. 3D HERO CARD TILT
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardWrap = e.currentTarget;
    const card = heroCardRef.current;
    if (!card) return;

    const rect = cardWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
  };

  const handleCardMouseLeave = () => {
    if (heroCardRef.current) {
      heroCardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
  };

  // 4. CONTACT FORM SUBMIT
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameOk = formName.trim().length > 1;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.trim());
    const msgOk = formMsg.trim().length >= 8;

    setFormErrors({ name: !nameOk, email: !emailOk, msg: !msgOk });

    if (!nameOk || !emailOk || !msgOk) {
      setFormStatus('Please correct the highlighted fields.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('Preparing your email...');

    const subject = encodeURIComponent(`Portfolio inquiry from ${formName.trim()}`);
    const body = encodeURIComponent(`${formMsg.trim()}\n\n— Sent by ${formName.trim()} (${formEmail.trim()})`);

    setTimeout(() => {
      window.location.href = `mailto:kabilk2023@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setFormStatus('Email client opened. Looking forward to speaking with you!');
      setFormName('');
      setFormEmail('');
      setFormMsg('');
    }, 500);
  };

  const filteredProjects = projectsList.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  const dockLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Arsenal' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Journey' },
    { id: 'certifications', label: 'Credentials' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="pf-container selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Cybernetic Perspective Grid Scan Room */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <GridScan
          scanColor="#22D3EE"
          linesColor="#1E293B"
          cells={10}
          depth={4}
          glow={0.5}
          lineThickness={1}
          interactive={true}
        />
      </div>

      {/* Constellation Particle Field */}
      <ConstellationGrid className="opacity-25" />

      {/* ═══ FLOATING IN-PAGE DOCK ═══ */}
      <div className="pf-dock-wrapper">
        <nav className="pf-dock" aria-label="Portfolio sections">
          {dockLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`pf-dock-btn ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <div className="pf-dock-status">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE TO WORK</span>
          </div>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ═══ HERO SECTION ═══ */}
        <section id="overview" className="pf-hero">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="pf-hero-chip">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <DecryptedText
                  text="AI/ML FULL STACK DEVELOPER · SYSTEMS & APPLIED AI"
                  speed={35}
                  className="font-mono text-xs text-cyan-300"
                />
              </div>

              <div>
                <h1 className="pf-hero-title">
                  <span className="pf-gradient-text">Kabil</span>
                </h1>
                <div className="pf-typing-text mt-2">
                  <span>{typedText}</span>
                  <span className="pf-typing-cursor" />
                </div>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Versatile Full Stack Developer with hands-on experience building AI/ML-powered web applications, integrating computer vision, predictive models, and LLM-driven features into production-grade systems. Seeking an AI/ML Full Stack Developer role to build intelligent, scalable products that combine strong system design with applied machine learning.
              </p>

              {/* Areas of Interest */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  Areas of Interest
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Full Stack Web Development',
                    'Backend Development',
                    'Scalable System Design',
                    'REST API Development',
                    'Machine Learning & AI Integration'
                  ].map((interest, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#0A1024] border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-sm hover:border-cyan-400 transition-colors"
                    >
                      • {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Contact Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-3 border-t border-slate-800/80">
                <a
                  href="mailto:kabilk2023@gmail.com"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  kabilk2023@gmail.com
                </a>
                <span className="text-slate-700">|</span>
                <a
                  href="tel:+918667452487"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  +91 86674 52487
                </a>
                <span className="text-slate-700">|</span>
                <a
                  href="https://linkedin.com/in/k-kabil-091233325/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                  linkedin.com/in/k-kabil
                </a>
                <span className="text-slate-700">|</span>
                <a
                  href="https://github.com/kabil-8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                  github.com/kabil-8
                </a>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Magnet magnetStrength={0.25}>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#22D3EE] text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
                  >
                    <span>Explore 8 Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Magnet>
                <a
                  href="#contact"
                  className="px-5 py-3 rounded-xl bg-[#0A1024] border border-slate-700 hover:border-cyan-500/60 text-slate-200 text-sm font-medium transition-all"
                >
                  Get in Touch
                </a>
                <a
                  href="mailto:kabilk2023@gmail.com?subject=Resume%20Inquiry%20-%20Kabil"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-transparent border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-sm transition-all"
                >
                  <span>⬇ Request Resume</span>
                </a>
              </div>
            </div>

            {/* Right: 3D Holographic Executive Card */}
            <div
              className="lg:col-span-5 pf-hero-card-perspective"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="pf-hero-card" ref={heroCardRef}>
                <BorderBeam size={260} duration={14} colorFrom="#2563FF" colorTo="#22D3EE" />

                {/* Avatar Hologram */}
                <div className="pf-avatar-halo">
                  <div className="pf-avatar-circle">K</div>
                  <div className="pf-avatar-pulse" />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
                    KABIL
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                    Founder &amp; CEO · Alpha Encoders
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    AI/ML Full Stack Engineer
                  </p>
                </div>

                {/* Stats Matrix */}
                <div className="grid grid-cols-3 gap-3 my-6 text-center">
                  <div className="p-3 rounded-xl bg-[#050816] border border-slate-800">
                    <div className="font-['Space_Grotesk'] text-2xl font-bold text-cyan-400">
                      08
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                      Projects
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#050816] border border-slate-800">
                    <div className="font-['Space_Grotesk'] text-2xl font-bold text-blue-400">
                      03
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                      Internships
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#050816] border border-slate-800">
                    <div className="font-['Space_Grotesk'] text-2xl font-bold text-emerald-400">
                      8.49
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                      MCET CGPA
                    </div>
                  </div>
                </div>

                {/* Featured Skills Chips */}
                <div className="flex flex-wrap gap-1.5 justify-center text-center">
                  {[
                    'Java',
                    'Python',
                    'React.js',
                    'FastAPI',
                    'Node.js',
                    'OpenCV',
                    'MongoDB',
                    'Docker',
                    'Redis'
                  ].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#050816] border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Status Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Role Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available to Work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION: EDUCATION ═══ */}
        <section id="education" className="pf-section">
          <SectionHeading
            eyebrow="Academic Pedigree"
            title="Education &"
            titleHighlight="Foundations."
            description="Computer Science Engineering degree program backed by rigorous secondary CBSE academics."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Degree */}
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.16)"
              className="p-6 flex flex-col justify-between hover:border-cyan-500/50"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/80 border border-blue-500/30 text-[11px] font-mono text-cyan-300 mb-3">
                  <Calendar className="w-3 h-3" />
                  Expected Graduation: May 2027
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1">
                  Bachelor of Engineering in Computer Science
                </h3>
                <p className="text-slate-300 text-sm font-medium mb-3">
                  Dr. Mahalingam College of Engineering and Technology, Pollachi
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Focusing on Advanced Data Structures, Algorithms, Distributed Backend Architectures, and Applied Machine Learning systems.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Cumulative Grade</span>
                <span className="text-base font-bold font-mono text-emerald-400">CGPA: 8.49</span>
              </div>
            </SpotlightCard>

            {/* HSC */}
            <SpotlightCard
              spotlightColor="rgba(37, 99, 255, 0.16)"
              className="p-6 flex flex-col justify-between hover:border-blue-500/50"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
                  <Award className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 mb-3">
                  <Calendar className="w-3 h-3" />
                  Completed: March 2023
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1">
                  Higher School Certificate (HSC)
                </h3>
                <p className="text-slate-300 text-sm font-medium mb-3">
                  CBSE – Honey Bunch School, Pollachi
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Higher secondary senior curriculum with comprehensive preparation in Mathematics, Physics, Chemistry, and Computer Science.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Board Percentage</span>
                <span className="text-base font-bold font-mono text-cyan-400">72.6%</span>
              </div>
            </SpotlightCard>

            {/* SSLC */}
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.16)"
              className="p-6 flex flex-col justify-between hover:border-emerald-500/50"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#101A31] border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 mb-3">
                  <Calendar className="w-3 h-3" />
                  Completed: March 2021
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1">
                  Secondary School Leaving Certificate (SSLC)
                </h3>
                <p className="text-slate-300 text-sm font-medium mb-3">
                  CBSE – Honey Bunch School, Pollachi
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Secondary school foundation covering Science, Advanced Mathematics, Social Sciences, and Languages with academic distinction.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Distinction Grade</span>
                <span className="text-base font-bold font-mono text-emerald-400">90.0%</span>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* ═══ SECTION: SKILLS ARSENAL ═══ */}
        <section id="skills" className="pf-section">
          <SectionHeading
            eyebrow="Technical Arsenal"
            title="Skills &"
            titleHighlight="Specializations."
            description="Categorized breakdown of programming languages, frameworks, AI/ML tools, and databases."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Programming Languages */}
            <div className="pf-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#101A31] border border-blue-500/30 text-cyan-300">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                    Programming Languages
                  </h4>
                  <p className="text-xs font-mono text-slate-400">Core engineering syntax</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Java', 'Python', 'C', 'C++'].map((lang, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#050816] border border-blue-500/20 text-slate-200 text-xs font-mono"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Scripting Languages */}
            <div className="pf-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#101A31] border border-blue-500/30 text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                    Scripting Languages
                  </h4>
                  <p className="text-xs font-mono text-slate-400">Web & interface foundations</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['HTML5', 'CSS3', 'JavaScript (ES6+)'].map((script, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#050816] border border-blue-500/20 text-slate-200 text-xs font-mono"
                  >
                    {script}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Backends */}
            <div className="pf-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#101A31] border border-blue-500/30 text-cyan-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                    Frameworks &amp; Runtimes
                  </h4>
                  <p className="text-xs font-mono text-slate-400">Server & client architecture</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['React.js', 'Node.js', 'Express.js', 'FastAPI'].map((fw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#050816] border border-cyan-500/20 text-cyan-300 text-xs font-mono"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            {/* AI/ML & Data */}
            <div className="pf-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#101A31] border border-blue-500/30 text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                    AI/ML &amp; Data Science
                  </h4>
                  <p className="text-xs font-mono text-slate-400">Models, CV & LLM pipelines</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'OpenCV',
                  'DeepFace',
                  'scikit-learn',
                  'Random Forest',
                  'CNN',
                  'Pandas',
                  'NumPy',
                  'LLM API Integration'
                ].map((aiml, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#050816] border border-emerald-500/20 text-emerald-300 text-xs font-mono"
                  >
                    {aiml}
                  </span>
                ))}
              </div>
            </div>

            {/* Database Management */}
            <div className="pf-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#101A31] border border-blue-500/30 text-amber-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                    Database Management
                  </h4>
                  <p className="text-xs font-mono text-slate-400">Relational, Document & Cache</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['MySQL', 'MongoDB', 'Redis'].map((db, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#050816] border border-amber-500/20 text-amber-300 text-xs font-mono"
                  >
                    {db}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & DevOps */}
            <div className="pf-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#101A31] border border-blue-500/30 text-blue-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                    Tools &amp; Technologies
                  </h4>
                  <p className="text-xs font-mono text-slate-400">CI/CD, containers & testing</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Docker', 'Postman', 'Git', 'GitHub Actions', 'VS Code'].map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#050816] border border-blue-500/20 text-slate-200 text-xs font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Soft Skills */}
            <div className="pf-card md:col-span-2 lg:col-span-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#101A31] border border-blue-500/30 text-cyan-300">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                    Professional &amp; Leadership Skills
                  </h4>
                  <p className="text-xs font-mono text-slate-400">Team delivery & problem solving</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    title: 'Strong Communication',
                    desc: 'Clear technical documentation, cross-functional stakeholder updates, and team alignment.'
                  },
                  {
                    title: 'Problem-Solving',
                    desc: 'Engineering-first root cause analysis and resilient algorithmic resolution.'
                  },
                  {
                    title: 'Analytical & Critical Thinking',
                    desc: 'Data-driven trade-offs across performance, memory footprint, and architectural scalability.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#050816] border border-slate-800">
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION: PROJECTS ═══ */}
        <section id="projects" className="pf-section">
          <SectionHeading
            eyebrow="Engineered Works"
            title="Featured Production"
            titleHighlight="Projects."
            description="8 real-world AI/ML, computer vision, distributed backend, and full-stack implementations."
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
            {[
              { id: 'all', label: 'All Projects (08)' },
              { id: 'ai', label: 'AI/ML & CV (04)' },
              { id: 'fullstack', label: 'Full Stack (02)' },
              { id: 'systems', label: 'Systems & HRMS (01)' },
              { id: 'frontend', label: 'E-Commerce (01)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`pf-filter-btn ${activeFilter === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <div key={proj.num} className="pf-card flex flex-col justify-between group">
                <BorderBeam size={220} duration={16} colorFrom="#2563FF" colorTo="#22D3EE" />

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-cyan-300">
                      PROJECT #{proj.num}
                    </span>
                    <span className="text-slate-400">{proj.date}</span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {proj.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#050816] border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-850">
                    <span className="text-xs font-mono text-slate-500 uppercase">
                      Category: {proj.category}
                    </span>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Explore Repository / Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION: PROFESSIONAL JOURNEY / INTERNSHIPS ═══ */}
        <section id="experience" className="pf-section">
          <SectionHeading
            eyebrow="Professional Journey"
            title="Industry"
            titleHighlight="Internships."
            description="Hands-on software development and data analyst internships across commercial software workflows."
          />

          <div className="space-y-6 mt-12">
            {/* Averexis Solutions */}
            <div className="pf-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                      Full Stack Developer Intern
                    </h3>
                    <p className="text-cyan-400 text-sm font-medium font-mono">
                      Averexis Solutions
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-[#050816] border border-slate-800 w-fit">
                  Feb 2026 – May 2026
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mt-4">
                Built responsive full-stack web applications with designing RESTful APIs, implementing secure authentication, performing CRUD operations, and optimizing relational database schema for performance and scalability.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-850 text-xs font-mono text-slate-400">
                <span className="text-slate-300">Key Focus:</span>
                <span>RESTful APIs</span> • <span>JWT Auth</span> • <span>CRUD Architecture</span> • <span>Database Optimization</span>
              </div>
            </div>

            {/* Genhub Innovations */}
            <div className="pf-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101A31] border border-blue-500/30 text-blue-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                      Software Developer Intern
                    </h3>
                    <p className="text-blue-400 text-sm font-medium font-mono">
                      Genhub Innovations
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-[#050816] border border-slate-800 w-fit">
                  Jun 2025 – Sept 2025
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mt-4">
                Contributed to the development of 5 scalable web solutions and built 10+ RESTful APIs, enhancing application performance and user experience, resulting in a 30% reduction in load times.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-850 text-xs font-mono text-slate-400">
                <span className="text-slate-300">Key Focus:</span>
                <span>5 Scalable Web Solutions</span> • <span>10+ REST APIs</span> • <span>30% Latency Reduction</span> • <span>Production Performance</span>
              </div>
            </div>

            {/* DataConquest */}
            <div className="pf-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101A31] border border-blue-500/30 text-emerald-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                      Data Analyst Intern
                    </h3>
                    <p className="text-emerald-400 text-sm font-medium font-mono">
                      DataConquest
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-[#050816] border border-slate-800 w-fit">
                  Internship
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mt-4">
                Collected, cleaned, and analyzed datasets to identify trends, and prepared reports and visualizations for real-world projects. Collaborated with team members within professional workflows and business requirements, strengthening technical, analytical, communication, and teamwork skills.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-850 text-xs font-mono text-slate-400">
                <span className="text-slate-300">Key Focus:</span>
                <span>Dataset Cleaning</span> • <span>Trend Analysis</span> • <span>Visual Reports</span> • <span>Team Collaboration</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION: CERTIFICATIONS ═══ */}
        <section id="certifications" className="pf-section">
          <SectionHeading
            eyebrow="Verified Credentials"
            title="Certifications &"
            titleHighlight="Recognitions."
            description="Verified credentials across Cyber Security, MongoDB database systems, Java, Python, and Environmental Studies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: 'Cyber Security Fundamentals',
                issuer: 'Cisco Networking Academy',
                desc: 'Completed comprehensive certification covering network security principles, threat mitigation, encryption protocols, and foundational defense practices.',
                badge: 'Cisco Certified'
              },
              {
                title: 'Introductory MongoDB Credential',
                issuer: 'MongoDB University',
                desc: 'Earned official credential for document schema design, aggregation pipelines, indexing strategies, and database operations.',
                badge: 'MongoDB Univ'
              },
              {
                title: 'Certified in C, C++, Python & Java',
                issuer: 'Kalvi Institute & Oracle Certified',
                desc: 'Certified in C, C++, and Python by Kalvi Institute, accompanied by official Oracle Certification credentials in Java programming.',
                badge: 'Oracle & Kalvi'
              },
              {
                title: 'Environment & Psychology of Learning',
                issuer: 'Recognized NPTEL Certification',
                desc: 'Recognized credentials in Environment and Development, Environmental Impact Assessment (EIA), and Psychology of Learning.',
                badge: 'Recognized'
              },
              {
                title: '8 Hindi Exams Completed',
                issuer: 'DBHPS (Dakshina Bharat Hindi Prachar Sabha)',
                desc: 'Completed all 8 official Hindi examinations demonstrating fluency in reading, writing, and language comprehension.',
                badge: 'DBHPS'
              }
            ].map((cert, idx) => (
              <div key={idx} className="pf-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-cyan-300">
                      {cert.badge}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{cert.issuer}</span>
                  </div>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-850 flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Credential
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION: LEADERSHIP & ACHIEVEMENTS ═══ */}
        <section id="leadership" className="pf-section">
          <SectionHeading
            eyebrow="Leadership & Impact"
            title="Extracurriculars &"
            titleHighlight="Achievements."
            description="Student governance, event leadership, university representation, hobbies, and multilingual fluency."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* DigiFlash President */}
            <div className="pf-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                  President — CSE Association “DigiFlash”
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Department Executive Leadership
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Leading the association by setting strategic goals, overseeing department activities &amp; extracurricular engagement.
              </p>
            </div>

            {/* DigiFlash Vice President */}
            <div className="pf-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs font-mono text-blue-400 uppercase font-semibold">
                  Vice President — CSE Association “DigiFlash”
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Student Initiatives &amp; Faculty Liaison
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Led student initiatives, coordinated committees, and represented the association in faculty meetings.
              </p>
            </div>

            {/* Event Coordinator */}
            <div className="pf-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                  Event Coordinator — “DigiFlash”
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Logistics &amp; Registrations
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Planned and executed departmental events while managing volunteers, logistics, and registrations.
              </p>
            </div>

            {/* Placement Coordinator */}
            <div className="pf-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs font-mono text-amber-400 uppercase font-semibold">
                  Placement Coordinator — Department of CSE
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Recruiter Liaison &amp; Drive Management
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Liaised between students and recruiters, organized placement drives, and managed interview schedules.
              </p>
            </div>

            {/* IV Coordinator */}
            <div className="pf-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
                  Industrial Visit (IV) Coordinator
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Corporate Exposure &amp; Logistical Approvals
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Organized company visits by coordinating approvals, logistics, and student participation.
              </p>
            </div>

            {/* Symposium & Team Lead */}
            <div className="pf-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                  Key Achievements &amp; Team Lead
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Symposium Lead &amp; Project Delivery
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Organized multiple symposiums and technical events over 2 years. Led multiple projects as Team Lead, managing team coordination and ensuring timely delivery.
              </p>
            </div>

            {/* Languages Known & Hobbies */}
            <div className="pf-card md:col-span-2 lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
                    Languages Known
                  </h4>
                  <p className="text-sm text-white font-medium mb-1">
                    Tamil · English · Hindi [Read &amp; Write]
                  </p>
                  <p className="text-xs text-slate-400">
                    Fluent trilingual communication for technical presentations, documentation, and stakeholder interaction.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-2">
                    Hobbies &amp; Personal Interests
                  </h4>
                  <p className="text-sm text-white font-medium mb-1">
                    Playing Cricket · Fitness &amp; Outdoor Activities
                  </p>
                  <p className="text-xs text-slate-400">
                    Passionate about sportsmanship, tactical discipline, endurance, and physical health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION: DIRECT CONTACT ═══ */}
        <section id="contact" className="pf-section pb-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#0B1229] via-[#070B14] to-[#0D1836] border border-blue-500/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <BorderBeam size={300} duration={14} colorFrom="#2563FF" colorTo="#22D3EE" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-medium text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  AVAILABLE FOR WORK &amp; COLLABORATION
                </div>

                <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Let’s Build Something{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Intelligent Together.
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Whether you're looking for an AI/ML Full Stack Developer, seeking high-performance system design, or wanting to discuss a project with Alpha Encoders, I'd love to connect.
                </p>

                <div className="space-y-3 pt-3 text-sm font-mono">
                  <a
                    href="mailto:kabilk2023@gmail.com"
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                    kabilk2023@gmail.com
                  </a>
                  <a
                    href="tel:+918667452487"
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-cyan-400" />
                    +91 86674 52487
                  </a>
                  <div className="flex items-center gap-3 text-slate-400">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Pollachi / Coimbatore, Tamil Nadu, India
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://linkedin.com/in/k-kabil-091233325/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#050816] border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/kabil-8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#050816] border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Direct Form */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleContactSubmit}
                  className="p-6 sm:p-8 rounded-2xl bg-[#050816]/90 border border-slate-800 space-y-4 shadow-xl"
                >
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-2">
                    Send Direct Message
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#0A1024] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors ${
                        formErrors.name ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#0A1024] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors ${
                        formErrors.email ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Hi Kabil, I'd like to discuss an AI/ML developer role or project..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#0A1024] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none ${
                        formErrors.msg ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>

                  {formStatus && (
                    <div className="text-xs font-mono text-cyan-300 py-1">
                      {formStatus}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#22D3EE] text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Direct Message'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage;
