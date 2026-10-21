import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsData as fallbackProjects } from '../data/projectsData';
import { ProjectCard } from '../components/shared/ProjectCard';
import { LiveProjectsSlider } from '../components/shared/LiveProjectsSlider';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { Magnet } from '../components/reactbits/Magnet';
import { ArrowRight, Code, Shield, CheckCircle2, Search, SlidersHorizontal } from 'lucide-react';
import type { ProjectItem } from '../types';
import { apiUrl } from '../config/api';
import { GridScan } from '../components/reactbits/GridScan';
import { RadarScanGrid } from '../components/animations/RadarScanGrid';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'e-commerce', label: 'E-Commerce' },
    { id: 'edtech', label: 'EdTech & Platforms' },
    { id: 'academic', label: 'Research & Papers' },
    { id: 'custom', label: 'Web Applications' }
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (searchQuery.trim()) queryParams.set('search', searchQuery.trim());
    if (selectedCategory !== 'all') queryParams.set('category', selectedCategory);

    const url = apiUrl(`/api/projects?${queryParams.toString()}`);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.projects)) {
          setProjects(data.projects.length > 0 ? data.projects : fallbackProjects);
        }
      })
      .catch((err) => {
        console.warn('Projects API notice, utilizing local cache fallback:', err);
        if (isMounted) {
          // Client-side fallback filter
          let filtered = fallbackProjects;
          if (selectedCategory !== 'all') {
            filtered = filtered.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
          }
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.technologies.some((t) => t.toLowerCase().includes(q))
            );
          }
          setProjects(filtered);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedCategory]);

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* 3D Cybernetic Perspective Grid Scan Room */}
      <div className="absolute inset-0 pointer-events-none opacity-45 z-0">
        <GridScan
          scanColor="#22D3EE"
          linesColor="#1E293B"
          cells={10}
          depth={4}
          glow={0.7}
          lineThickness={1}
          interactive={true}
        />
      </div>
      <RadarScanGrid className="opacity-30" />
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO INTRO */}
        <div className="max-w-3xl mx-auto text-center space-y-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <DecryptedText text="AUTHENTIC CLIENT WORK" speed={40} className="text-cyan-300 tracking-wider font-mono" />
          </div>

          <h1 className="font-['Bricolage_Grotesque'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
            Real Projects.{' '}
            <span className="text-gradient-blue inline-block">
              Thoughtful Engineering.
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            We don't publish concept mockups or fictional client claims. Explore our verified client deployments engineered with modular architecture, high-converting UX, and production-grade code.
          </p>
        </div>

        {/* INTERACTIVE FEATURED SLIDER */}
        <div className="mb-12">
          <LiveProjectsSlider />
        </div>

        {/* FOUNDER PERSONAL PORTFOLIO LINK BANNER */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-[#0E1420] via-[#0A1024] to-[#050816] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-mono font-bold text-lg shrink-0">
              KK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                  Founder's Personal Engineering &amp; Systems Portfolio
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Claude UI
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5">
                Explore Kabil K.'s interactive 3D showcase featuring 9+ open-source full-stack, AI, and systems builds.
              </p>
            </div>
          </div>
          <Link
            to="/ceo"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF6A] to-[#2FE0C4] text-slate-950 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:brightness-110 transition-all shadow-md shadow-amber-500/20"
          >
            <span>Founder &amp; CEO Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </Link>
        </div>

        {/* LIVE SEARCH & CATEGORY BAR */}
        <div className="mb-12 p-4 rounded-2xl bg-[#0A1024]/80 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack, client, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050816] border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-500 hidden sm:inline mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                    : 'bg-[#101A31] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS SHOWCASE OR SKELETON LOADERS */}
        {loading ? (
          /* High-Fidelity Skeleton Loader (Solves "21. No skeleton loaders") */
          <div className="space-y-12 animate-pulse">
            {[1, 2].map((n) => (
              <div key={n} className="rounded-3xl bg-[#0A1024]/60 border border-slate-800 p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-28 bg-slate-800 rounded-md" />
                  <div className="h-4 w-36 bg-slate-800 rounded-full" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="h-8 w-3/4 bg-slate-800 rounded-lg" />
                    <div className="h-4 w-full bg-slate-800/80 rounded" />
                    <div className="h-4 w-5/6 bg-slate-800/80 rounded" />
                    <div className="flex gap-2 pt-4">
                      <div className="h-6 w-20 bg-slate-800 rounded-md" />
                      <div className="h-6 w-20 bg-slate-800 rounded-md" />
                      <div className="h-6 w-20 bg-slate-800 rounded-md" />
                    </div>
                  </div>
                  <div className="lg:col-span-5 h-56 bg-slate-800/40 rounded-2xl border border-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {projects.map((project, index) => (
              <div key={project.id} className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    CASE STUDY 0{index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.clientName && (
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        Client: <span className="text-slate-200">{project.clientName}</span>
                      </span>
                    )}
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Production Verified
                    </span>
                  </div>
                </div>
                <ProjectCard project={project} featuredLarge={true} />
              </div>
            ))}
          </div>
        )}

        {/* OUR PORTFOLIO PHILOSOPHY */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#0A1024] border border-blue-500/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-3">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-white">
                Bespoke Codebases
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Zero bloated themes or page builder baggage. Every site is built with modern, optimized TypeScript frameworks.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-white">
                Honest Representations
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We represent actual deliverables, real client business models, and verified production performance.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-white">
                Verifiable Deployments
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every project includes live domain links, metrics reports, and client testaments.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 text-center">
          <Magnet magnetStrength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all group"
            >
              <span>Discuss Your Custom Solution</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnet>
        </div>
      </div>
    </div>
  );
};
