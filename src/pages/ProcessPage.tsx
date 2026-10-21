import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { processStages } from '../data/processData';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { BorderBeam } from '../components/reactbits/BorderBeam';
import { Magnet } from '../components/reactbits/Magnet';
import { Lightfall } from '../components/reactbits/Lightfall';
import { ProcessPipelineAnim } from '../components/animations/ProcessPipelineAnim';
import {
  CheckCircle2,
  ArrowRight,
  Layers,
  Terminal,
  Compass,
  FileCheck,
  Rocket,
  LifeBuoy
} from 'lucide-react';

const stageIcons = [Compass, Layers, Terminal, FileCheck, Rocket, LifeBuoy];

export const ProcessPage: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Background WebGL2 Luminescent Cosmic Lightfall */}
      <div className="absolute inset-0 pointer-events-none opacity-45 z-0">
        <Lightfall
          colors={['#22D3EE', '#2563FF', '#A855F7']}
          speed={0.4}
          streakCount={3}
          streakWidth={1.2}
          streakLength={1.4}
          glow={1.4}
          zoom={2.5}
          bloom={0.5}
        />
      </div>
      <ProcessPipelineAnim className="opacity-30" />
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO INTRO */}
        <div className="max-w-3xl mx-auto text-center space-y-6 pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <DecryptedText text="TRANSPARENT METHODOLOGY" speed={40} className="text-cyan-300 tracking-wider font-mono" />
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            From First Conversation{' '}
            <span className="text-gradient-blue inline-block">
              to Final Launch.
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            Our disciplined 6-stage engineering process removes ambiguity. Know exactly what to expect at every milestone with clear deliverables and continuous feedback loops.
          </p>
        </div>

        {/* STAGE SELECTOR TABS (DESKTOP) */}
        <div className="hidden lg:grid grid-cols-6 gap-2 mb-12 bg-[#0A1024] p-2 rounded-2xl border border-slate-800">
          {processStages.map((stage, idx) => (
            <button
              key={stage.number}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`p-3 rounded-xl text-left transition-all ${
                activeStage === idx
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <span className="font-mono text-xs block opacity-75">
                STAGE {stage.number}
              </span>
              <span className="font-['Space_Grotesk'] font-bold text-sm truncate block mt-0.5">
                {stage.title}
              </span>
            </button>
          ))}
        </div>

        {/* ACTIVE STAGE SPOTLIGHT CARD (DESKTOP VIEW) */}
        <div className="hidden lg:block mb-16 rounded-3xl bg-[#0A1024] border border-blue-500/40 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <BorderBeam size={280} duration={14} colorFrom="#2563FF" colorTo="#22D3EE" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {(() => {
            const current = processStages[activeStage];
            const Icon = stageIcons[activeStage] || Compass;
            return (
              <div className="grid grid-cols-12 gap-8 items-start">
                <div className="col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-semibold block">
                        STAGE {current.number}
                      </span>
                      <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight">
                        {current.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-300 text-base leading-relaxed">
                    {current.summary}
                  </p>

                  <div className="p-4 rounded-xl bg-[#050816] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider block">
                      Client Involvement at this Stage:
                    </span>
                    <p className="text-sm text-slate-300">{current.clientInvolvement}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#050816] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider block">
                      Engineering & Technical Focus:
                    </span>
                    <p className="text-sm text-slate-300">{current.technicalFocus}</p>
                  </div>
                </div>

                <div className="col-span-5 rounded-2xl bg-[#050816] border border-slate-800 p-6 space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-sm font-semibold uppercase tracking-wider text-slate-200">
                    Tangible Deliverables Handed Off
                  </h3>
                  <div className="space-y-3">
                    {current.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-850 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Step {activeStage + 1} of 6
                    </span>
                    {activeStage < 5 && (
                      <button
                        type="button"
                        onClick={() => setActiveStage(activeStage + 1)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        Next: {processStages[activeStage + 1].title} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ALL 6 STAGES VERTICAL / RESPONSIVE TIMELINE (MOBILE & COMPLETE DIRECTORY) */}
        <div className="space-y-8">
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-6">
            Detailed 6-Stage Breakdown
          </h2>

          <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
            {processStages.map((stage, idx) => {
              const Icon = stageIcons[idx] || Compass;
              return (
                <div key={stage.number} className="relative group">
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#050816] border-2 border-blue-500 group-hover:border-cyan-400 flex items-center justify-center transition-colors">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>

                  <div className="rounded-2xl bg-[#0A1024] border border-slate-800 hover:border-blue-500/40 p-6 sm:p-8 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-blue-400 font-bold text-lg">
                          {stage.number}.
                        </span>
                        <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                          {stage.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full">
                        {stage.timeline}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {stage.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-850">
                      <div>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                          Key Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {stage.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                          Client Role:
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {stage.clientInvolvement}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PROCESS ASSURANCE CALLOUT */}
        <div className="mt-16 p-6 rounded-2xl bg-[#0A1024] border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <strong className="text-white">Predictability Guarantee:</strong> Detailed project timelines, revision cycles, and deployment dates are documented in your bespoke project agreement prior to kickoff. No surprise billing or scope ambiguity.
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Magnet magnetStrength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white font-semibold text-base shadow-lg shadow-blue-600/30 hover:brightness-110 transition-all"
            >
              <span>Start Stage 1 Discovery for Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnet>
        </div>
      </div>
    </div>
  );
};
