import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsData as fallbackProjects } from '../data/projectsData';
import { ProjectCard } from '../components/shared/ProjectCard';
import { LiveProjectsSlider } from '../components/shared/LiveProjectsSlider';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { Magnet } from '../components/reactbits/Magnet';
import { ArrowRight, Code, Shield, CheckCircle2, RefreshCw } from 'lucide-react';
import type { ProjectItem } from '../types';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch((err) => {
        console.warn('Projects API unavailable, using verified local fallback:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO INTRO */}
        <div className="max-w-3xl mx-auto text-center space-y-6 pb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <DecryptedText text="AUTHENTIC CLIENT WORK" speed={40} className="text-cyan-300 tracking-wider font-mono" />
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            Real Projects.{' '}
            <span className="text-gradient-blue inline-block">
              Thoughtful Engineering.
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            We don't publish concept redesigns or fictional client claims. Explore our verified client deployments engineered with modular architecture, high-converting UX, and production-grade code.
          </p>
        </div>

        {/* INTERACTIVE FEATURED SLIDER */}
        <div className="mb-20">
          <LiveProjectsSlider />
        </div>

        {/* PROJECTS SHOWCASE */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
            <span className="font-mono text-sm">Loading verified deployments...</span>
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
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
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
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
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
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Complete Ownership
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Upon project completion, all design assets, code repositories, and credentials belong 100% to you.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-4">
            Have a project in mind for your business?
          </h2>
          <Magnet magnetStrength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-base shadow-lg shadow-blue-500/25 transition-all"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Magnet>
        </div>
      </div>
    </div>
  );
};
