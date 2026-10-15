import React from 'react';
import { Link } from 'react-router-dom';
import { HeroVisual } from '../components/hero/HeroVisual';
import { SectionHeading } from '../components/shared/SectionHeading';
import { ServiceCard } from '../components/shared/ServiceCard';
import { servicesData } from '../data/servicesData';
import { processStages } from '../data/processData';

// ReactBits Components
import { Squares } from '../components/reactbits/Squares';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { Magnet } from '../components/reactbits/Magnet';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { ShinyText } from '../components/reactbits/ShinyText';
import { BorderBeam } from '../components/reactbits/BorderBeam';

// Interactive Animation & Slider Showcase Components
import { LiveProjectsSlider } from '../components/shared/LiveProjectsSlider';
import { TechStackMarquee } from '../components/shared/TechStackMarquee';
import { TestimonialsSlider } from '../components/shared/TestimonialsSlider';
import { AnimatedStatsCounter } from '../components/shared/AnimatedStatsCounter';

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Zap,
  MessageSquare,
  Terminal,
  Compass,
  ShieldCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Select 6 primary services for home overview
  const featuredServices = servicesData.slice(0, 6);

  const capabilities = [
    'Website Design',
    'Full-Stack Development',
    'E-commerce Engineering',
    'Custom Applications',
    'Research Works & Papers',
    'Performance & SEO',
    'Responsive Mobile UI',
    'API Architecture',
    'Core Web Vitals Tuning'
  ];

  const differentiators = [
    {
      title: 'Tailored to Your Business',
      desc: 'Every project is shaped around actual business requirements, target customers, and objectives. We don’t force your brand into generic templates.',
      icon: Compass,
      tag: 'Strategic Alignment'
    },
    {
      title: 'Responsive by Design',
      desc: 'We engineer intuitive, pixel-perfect experiences across mobile phones, tablets, laptops, and ultra-wide desktop monitors from day one.',
      icon: Layers,
      tag: 'Omni-Device UX'
    },
    {
      title: 'Clean, Maintainable Development',
      desc: 'We build structured, reusable, and maintainable TypeScript code appropriate to each project’s needs, enabling seamless future growth.',
      icon: Terminal,
      tag: 'Engineered for Longevity'
    },
    {
      title: 'Transparent Communication',
      desc: 'Direct developer access, clear milestone roadmaps, honest feasibility discussions, and regular staging previews with no surprise hurdles.',
      icon: MessageSquare,
      tag: 'Direct Collaboration'
    },
    {
      title: 'Performance & Search Readiness',
      desc: 'Prioritize sub-second loading, semantic accessibility, technical schema markup, and Core Web Vitals to maximize search visibility.',
      icon: Zap,
      tag: 'Speed & Discovery'
    },
    {
      title: '100% IP & Source Ownership',
      desc: 'Zero proprietary lock-in. All Git repositories, design files, database schemas, and cloud deployment credentials are fully transferred to you.',
      icon: ShieldCheck,
      tag: 'Complete Ownership'
    }
  ];

  return (
    <div className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* ReactBits Interactive Animated Squares Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Squares
          direction="diagonal"
          speed={0.4}
          squareSize={42}
          borderColor="rgba(148, 163, 184, 0.06)"
          hoverFillColor="rgba(37, 99, 255, 0.15)"
        />
      </div>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[140px] pointer-events-none" />

      {/* SECTION A: HERO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pb-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <DecryptedText
                text="DIGITAL EXPERIENCES. ENGINEERED WITH PURPOSE."
                speed={35}
                animateOn="view"
                className="text-cyan-300 font-mono tracking-wider"
              />
            </div>

            <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              Professional Websites for{' '}
              <span className="text-gradient-blue inline-block">
                Every Kind of Business
              </span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-xl font-normal">
              Alpha Encoders engineers modern, responsive web applications, verified client storefronts, and rigorous computer science research works & academic publications.
            </p>

            {/* CTAs with ReactBits Magnet */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Magnet magnetStrength={0.25}>
                <Link
                  to="/contact"
                  className="relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white text-base font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:brightness-110 transition-all duration-200"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnet>

              <Magnet magnetStrength={0.2}>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#0A1024] hover:bg-[#101A31] text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-base font-semibold transition-all duration-200"
                >
                  <span>View Our Work</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </Magnet>
            </div>

            {/* Value Highlights Pill Row */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Custom Architecture
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> High Performance
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Honest Pricing
              </span>
            </div>
          </div>

          {/* Right Column: Signature Layered Visual */}
          <div className="lg:col-span-6 relative">
            <HeroVisual />
          </div>
        </div>

        {/* Dynamic Benchmark Stats Counters */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <AnimatedStatsCounter />
        </div>
      </section>

      {/* SECTION B: BUSINESS CAPABILITIES MARQUEE */}
      <section className="relative border-y border-slate-850 bg-[#0A1024]/40 py-8 overflow-hidden backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-white">
            Everything Your Business Needs to Go Digital.
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl mx-auto">
            From your first online presence to a fully customized digital platform, we build around your business goals.
          </p>
        </div>

        {/* Smooth Scrolling Marquee */}
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee flex items-center gap-4 whitespace-nowrap">
            {[...capabilities, ...capabilities].map((cap, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#101A31]/80 border border-blue-500/20 text-slate-200 text-xs sm:text-sm font-medium hover:border-cyan-400/50 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dual-Direction Continuous Tech Stack Slider */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="text-center mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30">
              Modern Full-Stack & Research Tooling
            </span>
          </div>
          <TechStackMarquee />
        </div>
      </section>

      {/* SECTION C: SERVICES OVERVIEW */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-10">
        <SectionHeading
          eyebrow="Solutions Catalog"
          title="Digital Solutions,"
          titleHighlight="Built Around You."
          description="Carefully engineered web experiences tailored to your industry, customers, and commercial objectives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-14">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Magnet magnetStrength={0.25}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-blue-500/30 text-white font-semibold text-sm transition-all shadow-sm hover:border-cyan-400"
            >
              <span>Explore All 14 Services</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </Magnet>
        </div>
      </section>

      {/* SECTION D: FEATURED PROJECTS */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-slate-850 z-10">
        <SectionHeading
          eyebrow="Portfolio & Proof"
          title="Real Projects."
          titleHighlight="Thoughtful Engineering."
          description="Inspect completed client websites built with modular components, fast loading speeds, and purpose-driven user interfaces."
        />

        {/* Interactive Live Projects 3D Slider */}
        <div className="mt-14">
          <LiveProjectsSlider />
        </div>

        <div className="mt-12 text-center">
          <Magnet magnetStrength={0.25}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-blue-500/30 text-white font-semibold text-sm transition-all shadow-md hover:border-cyan-400"
            >
              <span>Explore All Detailed Case Studies & Architecture</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </Magnet>
        </div>
      </section>

      {/* SECTION E: WHY ALPHA ENCODERS (WITH REACTBITS SPOTLIGHTCARD) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-slate-850 z-10">
        <SectionHeading
          eyebrow="The Alpha Encoders Advantage"
          title="More Than a Website."
          titleHighlight="A Better Digital Foundation."
          description="Why growing companies choose our direct, engineering-first approach over bloated agencies or restrictive website builders."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-14">
          {differentiators.map((diff, idx) => {
            const IconComponent = diff.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(37, 99, 255, 0.18)"
                className="p-6 sm:p-7 flex flex-col justify-between hover:border-blue-500/50 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-500/20">
                      {diff.tag}
                    </span>
                  </div>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* SECTION F: DEVELOPMENT PROCESS */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t border-slate-850 z-10">
        <SectionHeading
          eyebrow="Clear Roadmap"
          title="From First Conversation"
          titleHighlight="to Final Launch."
          description="A structured six-stage development workflow ensuring predictability, quality, and complete transparency."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {processStages.map((stage) => (
            <SpotlightCard
              key={stage.number}
              spotlightColor="rgba(34, 211, 238, 0.14)"
              className="p-6 sm:p-7 hover:border-cyan-500/40"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-blue-500">
                  {stage.number}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  {stage.timeline}
                </span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-2">
                {stage.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {stage.summary}
              </p>
              <div className="pt-3 border-t border-slate-850">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  Primary Focus:
                </span>
                <p className="text-xs text-slate-300 font-normal">
                  {stage.technicalFocus}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Magnet magnetStrength={0.2}>
            <Link
              to="/process"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors py-2 px-4 rounded-xl hover:bg-blue-950/40"
            >
              <span>Learn More About Our Milestones & Deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnet>
        </div>
      </section>

      {/* SECTION: CLIENT TESTIMONIALS & VERIFIED REVIEWS SLIDER */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t border-slate-850 z-10">
        <SectionHeading
          eyebrow="Client Testimonials & Feedback"
          title="Endorsed by Founders,"
          titleHighlight="Trusted by Educators."
          description="Hear directly from business owners, platform educators, and research partners who rely on Alpha Encoders engineering."
        />

        <div className="mt-14">
          <TestimonialsSlider />
        </div>
      </section>

      {/* SECTION G: BUILT AROUND YOUR BUSINESS GOALS (HONEST COLLABORATION) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t border-slate-850 z-10">
        <div className="rounded-3xl bg-gradient-to-b from-[#0A1024] to-[#050816] border border-blue-500/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-medium">
                Client-First Transparency
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Built Around Your Business Goals.
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                We believe in genuine collaboration over cookie-cutter marketing promises. When you work with Alpha Encoders, you partner directly with experienced developers who treat your business timeline, budget, and brand reputation with the utmost care.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>No middle-management communication overhead</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% intellectual property ownership upon completion</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Clean, thoroughly documented codebases</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Predictable milestones and staging link updates</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <Magnet magnetStrength={0.25}>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:brightness-110 transition-all inline-block"
                >
                  Discuss Your Project
                </Link>
              </Magnet>
              <span className="text-xs text-slate-400 mt-3 font-mono">
                Typical response within 24 business hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: FINAL CTA WITH REACTBITS BORDERBEAM */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="relative rounded-3xl bg-[#0A1024] border border-blue-500/40 p-8 sm:p-14 lg:p-16 text-center overflow-hidden shadow-2xl">
          <BorderBeam size={320} duration={12} colorFrom="#22D3EE" colorTo="#2563FF" />

          {/* Subtle Electric Blue Ambient Light */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-blue-600/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Have a Vision? <ShinyText text="Let's Build It." />
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Tell us about your business, your goals, and the website you have in mind. We'll help you turn the idea into a practical digital solution.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Magnet magnetStrength={0.3}>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white font-semibold text-base shadow-xl shadow-blue-600/40 hover:brightness-110 transition-all inline-block"
                >
                  Start Your Project
                </Link>
              </Magnet>

              <Magnet magnetStrength={0.2}>
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#101A31] hover:bg-[#162344] border border-blue-500/30 text-white font-semibold text-base transition-all inline-block"
                >
                  Explore Our Services
                </Link>
              </Magnet>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
