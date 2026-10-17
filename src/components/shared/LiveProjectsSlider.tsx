import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Magnet } from '../reactbits/Magnet';
import { BorderBeam } from '../reactbits/BorderBeam';
import { apiUrl } from '../../config/api';

export interface FeaturedSliderProject {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  liveUrl: string;
  technologies: string[];
  metrics: {
    lighthouse: number;
    speed: string;
    score: string;
  };
  highlights: string[];
  accentGradient: string;
  borderGlow: string;
}

const FEATURED_PROJECTS: FeaturedSliderProject[] = [
  {
    id: 'thecustomnest',
    name: 'TheCustomNest',
    category: 'Artisan E-Commerce & Checkout Engine',
    tagline: 'High-speed reactive e-commerce with optimistic cart drawer and sub-second checkout.',
    description:
      'Engineered for a boutique handmade crochet brand, featuring an instant-action cart drawer with zero layout shift, seamless multi-attribute catalog filtering, and direct WhatsApp / payment gateway integration.',
    liveUrl: 'https://www.thecustomnest.shop/',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Vite', 'Edge CDN'],
    metrics: {
      lighthouse: 99,
      speed: '0.38s FCP',
      score: '100% Mobile UX'
    },
    highlights: [
      'Optimistic cart drawer with instant subtotal tallying',
      'Zero layout shift (CLS: 0.00) with responsive WebP streaming',
      'Direct order dispatch and WhatsApp checkout integration'
    ],
    accentGradient: 'from-amber-500/20 via-blue-600/20 to-cyan-500/10',
    borderGlow: 'hover:border-cyan-400/50'
  },
  {
    id: 'javalearn',
    name: 'JavaLearn',
    category: 'Interactive Academic EdTech Platform',
    tagline: 'Gamified programming hub with step-by-step algorithmic visualizations and live concept drills.',
    description:
      'Designed for engineering students and software developers, delivering modular curriculum roadmaps, syntax highlighting code sandboxes, interactive drills, and automated progress analytics.',
    liveUrl: 'https://javalearn-omega.vercel.app/',
    technologies: ['TypeScript', 'React', 'TailwindCSS', 'Lucide Motion', 'Vercel Edge', 'Algorithms'],
    metrics: {
      lighthouse: 98,
      speed: '0.42s FCP',
      score: 'A+ Code Exec'
    },
    highlights: [
      'Interactive syntax highlighted drill exercises',
      'Algorithm step-by-step visualizer for data structures',
      'Sleek dark-mode academic workspace'
    ],
    accentGradient: 'from-blue-600/20 via-cyan-500/20 to-indigo-600/10',
    borderGlow: 'hover:border-blue-400/50'
  },
  {
    id: 'edusphere',
    name: 'EduSphere',
    category: 'Unified Higher-Ed Academic Ecosystem',
    tagline: 'Comprehensive university digital campus bridging real-time attendance, grading, and publications.',
    description:
      'An enterprise educational suite connecting university departments, student rosters, automated fee invoicing, examination analytics, and research paper repositories into a unified reactive portal.',
    liveUrl: 'https://edusphere08.vercel.app/',
    technologies: ['React 19', 'MongoDB Atlas', 'Express API', 'NodeNext', 'TailwindCSS', 'TypeScript'],
    metrics: {
      lighthouse: 99,
      speed: '0.45s FCP',
      score: '99.9% Uptime'
    },
    highlights: [
      'Cross-department institutional management with role-based ACL',
      'Integrated research publications repository & symposium portal',
      'Connected directly to MongoDB Atlas cluster with resilient synchronization'
    ],
    accentGradient: 'from-cyan-500/20 via-blue-600/20 to-purple-600/10',
    borderGlow: 'hover:border-cyan-400/50'
  },
  {
    id: 'research',
    name: 'Scientific Research & LaTeX Papers',
    category: 'Computer Science Research & IEEE Manuscripts',
    tagline: 'Rigorous empirical engineering papers, algorithmic benchmark visualizations, and reproducibility.',
    description:
      'Our dedicated research wing engineers peer-reviewed technical publications, IEEE / ACM LaTeX manuscripts, formal benchmark simulations, and statistical visualizations for cutting-edge computing paradigms.',
    liveUrl: 'https://edusphere08.vercel.app/',
    technologies: ['LaTeX', 'IEEE / ACM Standards', 'Python Benchmarking', 'Data Visuals', 'Algorithmic Proofs'],
    metrics: {
      lighthouse: 100,
      speed: 'IEEE Ready',
      score: '100% Reproducible'
    },
    highlights: [
      'Mathematical modeling & algorithmic complexity proofs',
      'High-resolution vector charts & statistical distribution graphics',
      'Conference and journal camera-ready LaTeX composition'
    ],
    accentGradient: 'from-purple-600/20 via-blue-600/20 to-emerald-500/10',
    borderGlow: 'hover:border-purple-400/50'
  }
];

export const LiveProjectsSlider: React.FC = () => {
  const [projectsList, setProjectsList] = useState<FeaturedSliderProject[]>(FEATURED_PROJECTS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync with live backend projects
  useEffect(() => {
    let isMounted = true;
    fetch(apiUrl('/api/projects'))
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          const mapped: FeaturedSliderProject[] = data.projects.map((p: any) => ({
            id: p.id || p.slug,
            name: p.name,
            category: p.category || 'Web Application',
            tagline: p.tagline || (p.description ? p.description.slice(0, 90) + '...' : 'Verified client deployment'),
            description: p.description || '',
            liveUrl: p.liveUrl || 'https://alphaencoders.vercel.app/',
            technologies: Array.isArray(p.technologies) && p.technologies.length > 0 ? p.technologies : ['TypeScript', 'React', 'TailwindCSS'],
            metrics: {
              lighthouse: p.metrics?.lighthousePerformance || 99,
              speed: p.metrics?.pageSpeed ? `${p.metrics.pageSpeed} FCP` : '0.40s FCP',
              score: p.metrics?.accessibility ? `${p.metrics.accessibility}% A11y` : '100% Score'
            },
            highlights: Array.isArray(p.highlights) && p.highlights.length > 0 ? p.highlights : [
              'Custom production architecture with sub-second performance',
              'Modular component system designed for scalability',
              '100% responsive cross-platform layout'
            ],
            accentGradient: 'from-blue-600/20 via-cyan-500/20 to-indigo-600/10',
            borderGlow: 'hover:border-cyan-400/50'
          }));
          setProjectsList(mapped);
        }
      })
      .catch((err) => {
        console.warn('Live projects API notice:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectsList.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const stepIncrement = (intervalStep / SLIDE_DURATION) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex, projectsList.length]);

  const currentProject = projectsList[currentIndex % projectsList.length] || projectsList[0];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Slider Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Interactive Live Showcase</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Slide {currentIndex + 1} of {FEATURED_PROJECTS.length}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Pause indicator pill */}
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-block">
            {isPaused ? 'Paused (hovered)' : 'Auto-sliding'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="p-2.5 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-slate-800 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all transform active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="p-2.5 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-slate-800 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all transform active:scale-95 shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slider Card Stage */}
      <div className="relative min-h-[480px] sm:min-h-[440px] rounded-3xl bg-[#0A1024] border border-blue-500/30 overflow-hidden shadow-2xl">
        <BorderBeam size={220} duration={8} colorFrom="#2563FF" colorTo="#22D3EE" />

        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 z-30">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Background Ambient Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentProject.accentGradient} opacity-60 pointer-events-none transition-all duration-700`}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/15 blur-[100px] pointer-events-none" />

        {/* Animated Slide Content */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="p-6 sm:p-10 lg:p-12 relative z-20 flex flex-col justify-between h-full"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30">
                  {currentProject.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Production Live
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 max-w-3xl">
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>{currentProject.name}</span>
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                </h3>
                <p className="text-sm sm:text-base text-cyan-200/90 font-medium leading-relaxed">
                  {currentProject.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  {currentProject.description}
                </p>
              </div>

              {/* Highlights & Metrics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 pt-2 border-t border-slate-800/80">
                {/* Highlights (Left 7 Cols) */}
                <div className="lg:col-span-7 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block font-semibold">
                    Key Engineering Achievements:
                  </span>
                  <div className="space-y-1.5">
                    {currentProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics Cards (Right 5 Cols) */}
                <div className="lg:col-span-5 grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-3 rounded-2xl bg-[#101A31]/90 border border-slate-800">
                    <div className="text-lg sm:text-xl font-bold text-emerald-400">
                      {currentProject.metrics.lighthouse}
                    </div>
                    <div className="text-[9px] uppercase text-slate-400 tracking-wider">Lighthouse</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#101A31]/90 border border-slate-800">
                    <div className="text-xs sm:text-sm font-bold text-cyan-300 mt-1">
                      {currentProject.metrics.speed}
                    </div>
                    <div className="text-[9px] uppercase text-slate-400 tracking-wider mt-1">Paint Speed</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#101A31]/90 border border-slate-800">
                    <div className="text-xs sm:text-sm font-bold text-blue-400 mt-1">
                      {currentProject.metrics.score}
                    </div>
                    <div className="text-[9px] uppercase text-slate-400 tracking-wider mt-1">Benchmark</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Tech Pills */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-1.5">
                {currentProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#101A31] border border-slate-700/80 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <Magnet magnetStrength={0.25}>
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 w-full sm:w-auto"
                  >
                    <span>Launch Live Application</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Magnet>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Thumbnail Selector Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-5">
        {projectsList.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
              setProgress(0);
            }}
            aria-label={`Go to slide ${idx + 1}: ${proj.name}`}
            className={`transition-all duration-300 rounded-full flex items-center justify-center ${
              idx === currentIndex
                ? 'w-10 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 ring-2 ring-blue-500/40'
                : 'w-3 h-3 bg-slate-800 hover:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
