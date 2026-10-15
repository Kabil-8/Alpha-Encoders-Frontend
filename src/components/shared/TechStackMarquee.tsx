import React from 'react';
import {
  Code2,
  Database,
  Cpu,
  Globe,
  Layers,
  Terminal,
  Server,
  Zap,
  Sparkles,
  GitBranch,
  FileCode,
  ShieldCheck
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  color: string;
}

const TECH_ROW_1: TechItem[] = [
  { name: 'React 19', category: 'Frontend', icon: Code2, tag: 'Concurrent Mode', color: 'text-cyan-400' },
  { name: 'TypeScript', category: 'Language', icon: Terminal, tag: 'Strict Typing', color: 'text-blue-400' },
  { name: 'Next.js & Vite', category: 'Framework', icon: Zap, tag: 'Sub-Second HMR', color: 'text-emerald-400' },
  { name: 'Tailwind CSS v4', category: 'Styling', icon: Layers, tag: 'Zero-Runtime CSS', color: 'text-cyan-300' },
  { name: 'Framer Motion', category: 'Animation', icon: Sparkles, tag: 'Physics & Springs', color: 'text-purple-400' },
  { name: 'Express API', category: 'Backend', icon: Server, tag: 'Typed REST Routes', color: 'text-amber-400' },
  { name: 'MongoDB Atlas', category: 'Cloud Database', icon: Database, tag: 'Resilient Cluster', color: 'text-emerald-400' },
  { name: 'Node.js', category: 'Runtime', icon: Cpu, tag: 'NodeNext Engine', color: 'text-lime-400' }
];

const TECH_ROW_2: TechItem[] = [
  { name: 'Python Engineering', category: 'Scientific', icon: Terminal, tag: 'Algorithmic Proofs', color: 'text-amber-300' },
  { name: 'LaTeX & IEEE', category: 'Research', icon: FileCode, tag: 'Camera-Ready Paper', color: 'text-cyan-400' },
  { name: 'WebSockets & RPC', category: 'Real-time', icon: Zap, tag: 'Bi-directional Flow', color: 'text-blue-400' },
  { name: 'Edge CDN Caching', category: 'DevOps', icon: Globe, tag: 'Global PoPs', color: 'text-emerald-300' },
  { name: 'Git & Automated CI', category: 'VCS', icon: GitBranch, tag: 'Semantic Versioning', color: 'text-rose-400' },
  { name: 'Core Web Vitals', category: 'Performance', icon: ShieldCheck, tag: '99/100 Lighthouse', color: 'text-cyan-300' },
  { name: 'Docker Containers', category: 'Virtualization', icon: Server, tag: 'Microservices Ready', color: 'text-blue-400' },
  { name: 'GraphQL & REST', category: 'API Design', icon: Layers, tag: 'Predictable Schemas', color: 'text-purple-300' }
];

export const TechStackMarquee: React.FC = () => {
  return (
    <div className="relative w-full py-10 overflow-hidden space-y-6">
      {/* Side Fade Gradients for Seamless Infinity Look */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#050816] via-[#050816]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#050816] via-[#050816]/90 to-transparent z-20 pointer-events-none" />

      {/* Row 1: Sliding Left */}
      <div className="overflow-hidden">
        <div className="animate-marquee hover:[animation-play-state:paused] flex items-center gap-4">
          {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={`row1-${idx}`}
                className="group relative flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#0A1024]/90 hover:bg-[#101A31] border border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 shrink-0 shadow-lg hover:shadow-blue-600/20 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${tech.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left font-mono">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>{tech.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="text-cyan-400/80 font-semibold">{tech.tag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Sliding Right (Reverse) */}
      <div className="overflow-hidden">
        <div className="animate-marquee-reverse hover:[animation-play-state:paused] flex items-center gap-4">
          {[...TECH_ROW_2, ...TECH_ROW_2].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={`row2-${idx}`}
                className="group relative flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#0A1024]/90 hover:bg-[#101A31] border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 shrink-0 shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${tech.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left font-mono">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>{tech.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="text-cyan-400/80 font-semibold">{tech.tag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
