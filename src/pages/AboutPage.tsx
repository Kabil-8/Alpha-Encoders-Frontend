import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/shared/SectionHeading';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { Magnet } from '../components/reactbits/Magnet';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { BorderBeam } from '../components/reactbits/BorderBeam';
import { TechStackMarquee } from '../components/shared/TechStackMarquee';
import {
  ShieldCheck,
  Code2,
  Compass,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const principles = [
    {
      title: 'Business-First Engineering',
      desc: 'We understand your commercial model, audience, and operational goals before selecting frameworks or writing a line of code.'
    },
    {
      title: 'Bespoke Craftsmanship',
      desc: 'No generic, bloated templates. Every layout, component, and interaction is customized for your distinct brand identity.'
    },
    {
      title: 'Radical Transparency',
      desc: 'Direct communication with the engineer building your product. Realistic timelines, clear estimates, and zero hidden jargon.'
    },
    {
      title: 'Clean, Maintainable Architecture',
      desc: 'Structured, typed, and modular codebases that your team or future developers can easily manage, extend, and scale.'
    },
    {
      title: 'Responsive & Accessible by Default',
      desc: 'Flawless experiences across mobile phones, tablets, and high-DPI desktop screens adhering to WCAG 2.2 accessibility standards.'
    },
    {
      title: 'Focused on Practical ROI',
      desc: 'A beautiful website is only as valuable as the inquiries, bookings, or sales it generates. Conversion ergonomics are built into every view.'
    },
    {
      title: 'Dedicated Post-Launch Support',
      desc: 'Continued technical partnership, framework updates, dependency patches, and feature additions under agreed terms.'
    }
  ];

  const values = [
    {
      title: 'Clarity',
      desc: 'Clean code, clear communication, and straightforward user flows. We eliminate digital noise so your business value shines through.',
      icon: Compass,
      codeSnippet: 'const UX = { simplicity: true, conversion: "max" };'
    },
    {
      title: 'Craftsmanship',
      desc: 'Obsession over typography rhythm, fluid micro-interactions, sub-second rendering, and semantic markup.',
      icon: Code2,
      codeSnippet: '<Canvas performance="optimal" layout="fluid" />'
    },
    {
      title: 'Reliability',
      desc: 'Battle-tested TypeScript code, secure forms, verified SSL configs, and rock-solid edge deployments on global networks.',
      icon: ShieldCheck,
      codeSnippet: 'export type ProductionGrade = Strict<Safe>;'
    },
    {
      title: 'Collaboration',
      desc: 'Treating client projects as partnerships. We listen, advise, iterate, and celebrate shared success.',
      icon: HeartHandshake,
      codeSnippet: 'await Partnership.deliverWithIntegrity();'
    }
  ];

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Background Grid & Lighting */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-[600px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO SECTION */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <DecryptedText text="ABOUT ALPHA ENCODERS" speed={40} className="text-cyan-300 tracking-wider font-mono" />
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            Technology That Moves Your{' '}
            <span className="text-gradient-blue inline-block">
              Business Forward.
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Alpha Encoders is a digital engineering studio and research team that creates professional web applications, verified client storefronts, customized digital platforms, and computer science research works & academic publications.
          </p>
        </div>

        {/* SECTION: HOW WE THINK ABOUT DEVELOPMENT */}
        <div className="my-16 rounded-3xl bg-[#0A1024] border border-blue-500/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <BorderBeam size={280} duration={14} colorFrom="#2563FF" colorTo="#22D3EE" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-medium">
                Our Engineering Philosophy
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                How We Think About Development.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                A modern website should do far more than look attractive on a presentation slide. In reality, your website serves as your 24/7 digital headquarters: it must communicate instant authority, help customers understand your offering with zero friction, support day-to-day business operations, and make it effortlessly simple for high-intent visitors to take action.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                By bridging modern design aesthetics with enterprise-grade frontend engineering, we ensure every page is technically optimized, fast-loading, and built to scale with your commercial ambitions.
              </p>
            </div>

            {/* Visual Engineering Graphic */}
            <div className="lg:col-span-5 rounded-2xl bg-[#050816] border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">Architecture Matrix</span>
                <span className="text-xs font-mono text-cyan-400">TypeScript 6.0</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Design System</span>
                  <span className="text-emerald-400">Fluid & Responsive</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Bundle Weight</span>
                  <span className="text-cyan-400">&lt; 90kb Critical CSS</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">SEO Schema</span>
                  <span className="text-blue-400">JSON-LD Structured</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Accessibility</span>
                  <span className="text-emerald-400">WCAG 2.2 AA Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: 4 CORE VALUES (REACTBITS SPOTLIGHTCARD) */}
        <div className="my-20">
          <SectionHeading
            eyebrow="Foundational Pillars"
            title="Values That Guide"
            titleHighlight="Every Project."
            description="Our non-negotiable commitments to code quality, client communication, and digital excellence."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <SpotlightCard
                  key={idx}
                  spotlightColor="rgba(34, 211, 238, 0.16)"
                  className="p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:-translate-y-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-5">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2">
                      {val.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {val.desc}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050816] border border-slate-850 font-mono text-[11px] text-cyan-400 truncate">
                    {val.codeSnippet}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* SECTION: OUR 7 GUIDING PRINCIPLES */}
        <div className="my-20 border-t border-slate-850 pt-16">
          <SectionHeading
            eyebrow="Practical Standards"
            title="The Principles We"
            titleHighlight="Build By."
            description="How our development process protects your budget, schedules, and digital reputation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {principles.map((pr, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0A1024] border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-blue-950 border border-blue-500/40 text-[11px] font-mono text-cyan-300 flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">
                      {pr.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {pr.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: FULL-STACK & RESEARCH TOOLING SLIDER */}
        <div className="my-20 border-t border-slate-850 pt-16">
          <SectionHeading
            eyebrow="Engineered Foundations"
            title="The Modern Stack"
            titleHighlight="Powering Every Build."
            description="Proven languages, frameworks, edge caching networks, and empirical research systems."
          />
          <div className="mt-8">
            <TechStackMarquee />
          </div>
        </div>

        {/* SECTION: FOUNDER & LEADERSHIP PROFILE */}
        <div className="my-20 rounded-3xl bg-gradient-to-br from-[#0B1229] via-[#070B14] to-[#0D1836] border border-blue-500/30 p-8 sm:p-12 relative overflow-hidden">
          <BorderBeam size={320} duration={16} colorFrom="#D4AF6A" colorTo="#2FE0C4" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Bio */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-medium text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                FOUNDER &amp; LEAD SOLUTIONS ARCHITECT
              </div>

              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Kabil <span className="text-gradient-blue">K.</span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Kabil founded Alpha Encoders to bridge the gap between heavy enterprise full-stack engineering and stunning, high-converting digital interfaces. With extensive experience across 3 software engineering internships (Averexis Solutions, BlueStock Fintech, Genhub Innovations) and over 10+ end-to-end production &amp; open-source architectures, he personally oversees architectural integrity on every project.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 rounded-xl bg-[#050816]/80 border border-slate-800">
                  <div className="font-mono text-xl font-bold text-cyan-400">10+</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Projects</div>
                </div>
                <div className="p-3 rounded-xl bg-[#050816]/80 border border-slate-800">
                  <div className="font-mono text-xl font-bold text-amber-400">03</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Internships</div>
                </div>
                <div className="p-3 rounded-xl bg-[#050816]/80 border border-slate-800">
                  <div className="font-mono text-xl font-bold text-emerald-400">8.49</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">MCET CGPA</div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <Magnet magnetStrength={0.25}>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF6A] to-[#2FE0C4] text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
                  >
                    <span>Explore 3D Cyberpunk Portfolio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnet>
                <a
                  href="https://github.com/kabil-8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#050816] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-sm font-medium transition-colors"
                >
                  GitHub @Kabil-8 ↗
                </a>
              </div>
            </div>

            {/* Right: Technical Badges & Terminal Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#050816] border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">Founder Architecture Profile</span>
                <span className="text-xs font-mono text-cyan-400">Full-Stack Active</span>
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Core Systems</span>
                  <span className="text-amber-400 font-semibold">Java · MERN · Python</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Interactive 3D</span>
                  <span className="text-cyan-400 font-semibold">Three.js · WebGL · Shaders</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">API Architecture</span>
                  <span className="text-emerald-400 font-semibold">REST · JWT · WebSockets</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Certifications</span>
                  <span className="text-blue-400 font-semibold">Oracle · Cisco · MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA FOOTER BANNER */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0A1024] to-[#101A31] border border-blue-500/40 text-center space-y-6">
          <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
            Ready to partner with a developer who cares about results?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Tell us about your organization's goals, and let's craft an exceptional digital experience together.
          </p>
          <div className="pt-2">
            <Magnet magnetStrength={0.25}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:brightness-110 transition-all"
              >
                <span>Start a Project Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnet>
          </div>
        </div>
      </div>
    </div>
  );
};
