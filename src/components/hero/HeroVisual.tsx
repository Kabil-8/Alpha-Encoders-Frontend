import React, { useState } from 'react';
import { ShoppingBag, Star, CheckCircle2, TrendingUp, Code, ShieldCheck } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] flex items-center justify-center perspective-[1200px] select-none"
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
      }}
    >
      {/* Central Ambient Focal Glow */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-600/25 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-64 h-64 rounded-full bg-cyan-400/20 blur-[80px] pointer-events-none" />

      {/* Decorative Technical Crosshairs and Orbital Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[420px] h-[420px] rounded-full border border-blue-500/15 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="w-[300px] h-[300px] rounded-full border border-cyan-400/20" />
      </div>

      {/* Layer 1: Background Layer - Analytics & Web Dashboard Mockup */}
      <div
        className="absolute top-4 sm:top-8 right-2 sm:right-6 w-[290px] sm:w-[360px] md:w-[400px] rounded-2xl bg-[#0A1024]/90 border border-slate-700/60 shadow-2xl backdrop-blur-xl p-3 sm:p-4 animate-float-reverse z-10 transition-transform"
        style={{
          transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, -40px)`
        }}
      >
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="px-2.5 py-0.5 rounded-md bg-[#050816] text-[10px] font-mono text-slate-400 border border-slate-800/80 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>app.enterprise-portal.internal</span>
          </div>
          <div className="text-[10px] text-cyan-400 font-mono">LIVE 99.98%</div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-[#050816]/70 border border-slate-800/70">
              <span className="text-[10px] text-slate-400 block">Digital Conversion</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-bold font-['Space_Grotesk'] text-white">4.82%</span>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center">
                  <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> +28%
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#050816]/70 border border-slate-800/70">
              <span className="text-[10px] text-slate-400 block">Avg. Load Speed</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-bold font-['Space_Grotesk'] text-cyan-300">0.42s</span>
                <span className="text-[10px] text-blue-400 font-medium">99 Core Vitals</span>
              </div>
            </div>
          </div>

          {/* Mini Chart Bars */}
          <div className="p-2.5 rounded-xl bg-[#050816]/70 border border-slate-800/70">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
              <span>Traffic Growth Activity</span>
              <span className="text-cyan-400">TypeScript API</span>
            </div>
            <div className="h-10 flex items-end justify-between gap-1.5 px-1">
              {[40, 65, 52, 78, 60, 92, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-800/80 rounded-t-sm h-full flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm transition-all duration-500"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2: Main Featured Hero Mockup - TheCustomNest E-Commerce Showcase */}
      <div
        className="relative w-[320px] sm:w-[420px] md:w-[470px] rounded-2xl bg-[#0A1024] border border-blue-500/40 shadow-2xl shadow-blue-900/30 backdrop-blur-2xl p-4 sm:p-5 z-20 animate-float-slow transition-transform"
        style={{
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 20px)`
        }}
      >
        {/* Subtle cyan light streak across the top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

        {/* Browser Top Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex-1 max-w-[210px] sm:max-w-[240px] mx-3 px-3 py-1 rounded-full bg-[#050816] text-[11px] font-mono text-slate-300 border border-slate-700/60 flex items-center justify-between">
            <span className="truncate text-cyan-300">https://thecustomnest.com</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 ml-1">SSL</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-white text-xs font-semibold">Cart (3)</span>
          </div>
        </div>

        {/* TheCustomNest Storefront Interior Mockup */}
        <div className="rounded-xl bg-[#050816] border border-slate-800/80 p-3 sm:p-4 space-y-3 overflow-hidden">
          {/* Header Brand Bar inside Mockup */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
                CN
              </div>
              <div>
                <span className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm text-white tracking-tight">
                  TheCustomNest
                </span>
                <span className="text-[9px] text-amber-400/90 block -mt-0.5">Artisan Crochet & Lifestyle</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Verified Client Store</span>
            </div>
          </div>

          {/* Featured Product Presentation */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Product Card 1 */}
            <div className="rounded-lg bg-[#0A1024] border border-slate-800 p-2.5 group/card hover:border-cyan-500/40 transition-colors">
              <div className="h-20 sm:h-24 w-full rounded-md bg-gradient-to-br from-amber-950/40 via-slate-900 to-rose-950/30 flex items-center justify-center relative overflow-hidden border border-slate-800/60">
                <div className="text-2xl select-none">🧶</div>
                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-blue-600/80 text-[8px] font-semibold text-white uppercase">
                  Bespoke
                </span>
              </div>
              <div className="mt-2">
                <span className="text-[11px] font-medium text-white block truncate">Handcrafted Woolen Tote</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-cyan-300">$64.00</span>
                  <div className="flex items-center text-[9px] text-amber-400">
                    <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" /> 5.0
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="rounded-lg bg-[#0A1024] border border-slate-800 p-2.5 group/card hover:border-cyan-500/40 transition-colors">
              <div className="h-20 sm:h-24 w-full rounded-md bg-gradient-to-br from-blue-950/40 via-slate-900 to-cyan-950/30 flex items-center justify-center relative overflow-hidden border border-slate-800/60">
                <div className="text-2xl select-none">🪡</div>
                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-emerald-600/80 text-[8px] font-semibold text-white uppercase">
                  Featured
                </span>
              </div>
              <div className="mt-2">
                <span className="text-[11px] font-medium text-white block truncate">Artisan Amigurumi Bear</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-cyan-300">$48.00</span>
                  <div className="flex items-center text-[9px] text-amber-400">
                    <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" /> 5.0
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Store Bottom Bar Feature Badges */}
          <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-900">
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Dynamic Cart Drawer
            </span>
            <span className="text-cyan-400 font-mono text-[9px]">Custom React 19 Frontend</span>
          </div>
        </div>
      </div>

      {/* Layer 3: Foreground Floating Panel - Mobile Responsive Preview */}
      <div
        className="absolute -bottom-2 sm:bottom-4 -left-1 sm:left-4 w-[210px] sm:w-[240px] rounded-2xl bg-[#0A1024]/95 border border-cyan-500/35 shadow-2xl backdrop-blur-2xl p-3 z-30 animate-float-reverse transition-transform"
        style={{
          transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 50px)`
        }}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-medium text-white">Mobile Viewport</span>
          </div>
          <span className="text-[9px] text-slate-400 font-mono">390×844</span>
        </div>

        <div className="rounded-xl bg-[#050816] p-2.5 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-12 h-2 rounded-full bg-blue-500/50" />
            <div className="w-4 h-4 rounded bg-slate-800" />
          </div>
          <div className="h-10 rounded-lg bg-gradient-to-r from-blue-900/40 to-cyan-900/30 border border-blue-500/20 p-2 flex flex-col justify-center">
            <div className="w-20 h-2 rounded bg-cyan-300/80 mb-1" />
            <div className="w-14 h-1.5 rounded bg-slate-400/50" />
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            100% Touch Responsive
          </div>
        </div>
      </div>

      {/* Code Snippet Tag Floating Pill */}
      <div
        className="absolute -top-3 left-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101A31] border border-blue-500/40 text-xs text-white shadow-lg z-30 font-mono"
        style={{
          transform: `translate3d(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px, 10px)`
        }}
      >
        <Code className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-[11px] text-slate-300">&lt;AlphaEncoders.deploy /&gt;</span>
      </div>
    </div>
  );
};
