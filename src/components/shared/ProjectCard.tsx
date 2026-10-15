import { useState } from 'react';
import type { ProjectItem } from '../../types';
import { ExternalLink, CheckCircle, Shield, Layers, ChevronRight, Sparkles, Terminal, FileText, Code2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BorderBeam } from '../reactbits/BorderBeam';
import { Magnet } from '../reactbits/Magnet';

interface ProjectCardProps {
  project: ProjectItem;
  featuredLarge?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featuredLarge = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`group relative rounded-2xl bg-[#0A1024] border border-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-950/40 ${
          featuredLarge ? 'lg:grid lg:grid-cols-12 gap-0' : ''
        }`}
      >
        {/* ReactBits Animated Border Beam on Featured Project */}
        {featuredLarge && (
          <BorderBeam size={280} duration={14} colorFrom="#2563FF" colorTo="#22D3EE" />
        )}

        {/* Visual Mockup Section */}
        <div
          className={`relative bg-[#050816] p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-850 overflow-hidden ${
            featuredLarge ? 'lg:col-span-7' : ''
          }`}
        >
          {/* Ambient Lighting */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

          {/* Browser Top Chrome */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="px-3 py-1 rounded-full bg-[#0A1024] text-[11px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5 max-w-[220px] truncate">
              <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{project.liveUrl || 'https://alphaencoders.preview'}</span>
            </div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          {/* Interactive Screen Preview Container */}
          <div className="relative rounded-xl bg-[#0A1024] border border-slate-850 p-4 sm:p-5 overflow-hidden min-h-[220px] sm:min-h-[280px] flex flex-col justify-center transition-transform duration-500 group-hover:scale-[1.01]">
            {project.id === 'the-custom-nest' || project.slug === 'the-custom-nest' ? (
              // 1. BESPOKE MOCKUP: TheCustomNest
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-amber-300 font-serif font-bold text-sm">
                      CN
                    </div>
                    <div>
                      <h4 className="font-['Space_Grotesk'] text-white font-bold text-sm">TheCustomNest</h4>
                      <p className="text-[10px] text-amber-400">Handcrafted Crochet Store</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-500/30">
                    Live Production
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#050816] border border-slate-800">
                    <div className="h-16 rounded bg-slate-900 flex items-center justify-center text-2xl mb-2">
                      🧶
                    </div>
                    <span className="text-xs font-semibold text-white block">Crochet Sweaters</span>
                    <span className="text-[11px] text-cyan-300 font-mono">$72.00</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#050816] border border-slate-800">
                    <div className="h-16 rounded bg-slate-900 flex items-center justify-center text-2xl mb-2">
                      🧸
                    </div>
                    <span className="text-xs font-semibold text-white block">Amigurumi Gifts</span>
                    <span className="text-[11px] text-cyan-300 font-mono">$36.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Reactive Cart State
                  </span>
                  <span className="font-mono text-slate-400">0.38s Edge Load</span>
                </div>
              </div>
            ) : project.id === 'javalearn' || project.slug === 'javalearn' ? (
              // 2. BESPOKE MOCKUP: JavaLearn (Developer Code Sandbox)
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-400/40 flex items-center justify-center text-blue-300 font-mono font-bold text-sm">
                      JL
                    </div>
                    <div>
                      <h4 className="font-['Space_Grotesk'] text-white font-bold text-sm">JavaLearn Platform</h4>
                      <p className="text-[10px] text-blue-400 font-mono">Algorithms & Architecture Engine</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Live Platform
                  </span>
                </div>

                {/* Real-time Code Editor Sandbox Visual */}
                <div className="p-3 rounded-xl bg-[#050816] border border-blue-500/20 font-mono text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-800/60 text-[10px]">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      ConcurrentPipeline.java
                    </span>
                    <span className="text-emerald-400">JDK 21 VirtualThreads</span>
                  </div>
                  <div className="text-blue-400 pt-1">
                    public class <span className="text-cyan-300">PipelineExecutor</span> {'{'}
                  </div>
                  <div className="pl-3 text-slate-300">
                    <span className="text-purple-400">var</span> stream = data.<span className="text-cyan-300">parallelStream()</span>;
                  </div>
                  <div className="pl-3 text-slate-400">
                    // Zero lock contention event stream
                  </div>
                  <div className="text-blue-400">{'}'}</div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-mono">
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    Interactive Code Drills
                  </span>
                  <span className="font-mono text-emerald-400">0.36s Latency</span>
                </div>
              </div>
            ) : project.id === 'research-works-papers' || project.slug === 'research-works-papers' || project.category === 'Research Paper' ? (
              // 3. BESPOKE MOCKUP: Computer Science Research & LaTeX Papers
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-400/40 flex items-center justify-center text-purple-300 font-mono font-bold text-sm">
                      RP
                    </div>
                    <div>
                      <h4 className="font-['Space_Grotesk'] text-white font-bold text-sm">Alpha Research Lab</h4>
                      <p className="text-[10px] text-purple-300 font-mono">IEEE / ACM LaTeX Manuscripts</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-500/30">
                    Camera-Ready
                  </span>
                </div>

                {/* Academic LaTeX & Algorithmic Proof Visual */}
                <div className="p-3 rounded-xl bg-[#050816] border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-800/80 pb-1">
                    <span className="text-purple-300 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-purple-400" />
                      IEEE Trans. Parallel & Dist. Syst.
                    </span>
                    <span className="text-cyan-400 font-bold">TeX Live 2026</span>
                  </div>
                  <div className="text-xs font-serif text-slate-200 italic leading-snug">
                    "On Empirical Asymptotic Convergence in Resilient Edge-State Clusters"
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-900/90 font-mono text-[11px] text-cyan-300 text-center tracking-wider border border-slate-800">
                    lim_&#123;n→∞&#125; E[T(n)] = O(n log n) ± ε
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                  <span className="flex items-center gap-1.5 text-purple-300 font-mono">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    Formal Peer-Review Rigor
                  </span>
                  <span className="font-mono text-emerald-400">100% Reproducible</span>
                </div>
              </div>
            ) : (
              // 4. BESPOKE MOCKUP: EduSphere Academy
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-sm">
                      ES
                    </div>
                    <div>
                      <h4 className="font-['Space_Grotesk'] text-white font-bold text-sm">EduSphere</h4>
                      <p className="text-[10px] text-cyan-400">Curriculum & Learning Portal</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Deployed
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-[#050816] border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white block">Full-Stack Engineering 101</span>
                      <span className="text-[10px] text-slate-400">12 Modules • Capstone Project</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-blue-900/40 px-2 py-0.5 rounded">
                      Open Enrollment
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050816] border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white block">Digital Product Design</span>
                      <span className="text-[10px] text-slate-400">8 Modules • Figma & Usability</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-blue-900/40 px-2 py-0.5 rounded">
                      Available
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Layers className="w-3.5 h-3.5" />
                    Structured Syllabus Taxonomy
                  </span>
                  <span className="font-mono text-slate-400">100 Accessibility</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content & Details Section */}
        <div
          className={`p-6 sm:p-8 flex flex-col justify-between ${
            featuredLarge ? 'lg:col-span-5' : ''
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#101A31] border border-blue-500/30 text-xs font-mono text-cyan-300 font-medium">
                {project.industry}
              </span>
              <span className="text-xs text-slate-400">• {project.category}</span>
            </div>

            <div>
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm font-medium text-slate-300 mt-1">
                {project.tagline}
              </p>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Services Delivered */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Services Delivered
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Technology Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#101A31] border border-blue-500/20 text-cyan-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Result Callout */}
            {project.verifiedResult && (
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{project.verifiedResult}</span>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
            >
              Case Study Details
              <ChevronRight className="w-4 h-4" />
            </button>

            {project.liveUrl && (
              <Magnet magnetStrength={0.25}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#101A31] hover:bg-[#2563FF] border border-blue-500/40 text-xs font-semibold text-white transition-all shadow-sm hover:shadow-blue-500/30"
                >
                  <span>Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Magnet>
            )}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0A1024] border border-blue-500/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  Architecture & Case Study
                </span>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                  {project.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 text-sm text-slate-300">
              <div>
                <h4 className="font-['Space_Grotesk'] text-white font-semibold mb-2 text-base">
                  Project Overview
                </h4>
                <p className="leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h4 className="font-['Space_Grotesk'] text-white font-semibold mb-2 text-base">
                  Technical Architecture & Engineering
                </h4>
                <p className="leading-relaxed text-slate-400">{project.architectureOverview}</p>
              </div>

              <div>
                <h4 className="font-['Space_Grotesk'] text-white font-semibold mb-2 text-base">
                  Key Engineering Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to={`/contact?project=${project.slug}`}
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                >
                  Discuss a Similar Project
                </Link>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline"
                  >
                    Open Live Deployment <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
