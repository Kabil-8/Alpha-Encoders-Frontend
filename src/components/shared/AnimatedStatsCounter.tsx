import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Award, Terminal } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

const STATS_DATA: StatItem[] = [
  {
    label: 'Core Performance',
    value: 99,
    suffix: '/100',
    description: 'Average Lighthouse speed benchmark score',
    icon: Zap,
    accent: 'text-amber-400 border-amber-500/30'
  },
  {
    label: 'First Contentful Paint',
    value: 0.4,
    suffix: 's',
    prefix: '<',
    description: 'Sub-second edge caching & WebP streaming',
    icon: Terminal,
    accent: 'text-cyan-400 border-cyan-500/30'
  },
  {
    label: 'Code & IP Ownership',
    value: 100,
    suffix: '%',
    description: 'Zero proprietary lock-in, complete transfer',
    icon: ShieldCheck,
    accent: 'text-emerald-400 border-emerald-500/30'
  },
  {
    label: 'Engineering Services',
    value: 15,
    suffix: '+',
    description: 'From web apps to IEEE LaTeX research',
    icon: Award,
    accent: 'text-blue-400 border-blue-500/30'
  }
];

export const AnimatedStatsCounter: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(STATS_DATA.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 40;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3); // EaseOutCubic

      setCounts(
        STATS_DATA.map((s) => {
          const target = s.value;
          const current = target * easeOutProgress;
          return Number(current.toFixed(s.value % 1 !== 0 ? 1 : 0));
        })
      );

      if (stepCount >= steps) {
        clearInterval(timer);
        setCounts(STATS_DATA.map((s) => s.value));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {STATS_DATA.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="group relative p-5 sm:p-6 rounded-3xl bg-[#0A1024]/90 hover:bg-[#101A31] border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-600/15 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-600/10 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-slate-900 border ${stat.accent} group-hover:rotate-6 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-0.5">
                {stat.prefix && <span className="text-cyan-400 text-xl font-mono">{stat.prefix}</span>}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  {counts[idx]}
                </span>
                <span className="text-cyan-400 text-base sm:text-lg font-mono font-bold">{stat.suffix}</span>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1 font-['Space_Grotesk']">
                {stat.label}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 leading-relaxed border-t border-slate-800/80 pt-2.5">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
