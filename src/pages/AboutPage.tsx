import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/shared/SectionHeading';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { Magnet } from '../components/reactbits/Magnet';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { BorderBeam } from '../components/reactbits/BorderBeam';
import { TechStackMarquee } from '../components/shared/TechStackMarquee';
import { ConstellationGrid } from '../components/animations/ConstellationGrid';
import { GridScan } from '../components/reactbits/GridScan';
import {
  ShieldCheck,
  Code2,
  Compass,
  ArrowRight,
  HeartHandshake,
  Globe,
  Layout,
  ShoppingCart,
  Layers,
  Database,
  RefreshCw
} from 'lucide-react';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const AboutPage: React.FC = () => {
  const servicesList = [
    {
      title: 'Business and Corporate Websites',
      desc: 'Professional, brand-defining corporate websites designed to build immediate credibility and turn high-intent visitors into clients.',
      icon: Globe
    },
    {
      title: 'Custom Web Applications',
      desc: 'Tailor-made, interactive web platforms and portals built with responsive ergonomics, strict security, and scalable architectures.',
      icon: Layout
    },
    {
      title: 'E-Commerce Website Development',
      desc: 'Seamless, high-converting digital storefronts featuring friction-free carts, automated order management, and secure checkouts.',
      icon: ShoppingCart
    },
    {
      title: 'Frontend & Backend Development',
      desc: 'End-to-end full stack development with clean, typed codebases, sub-second rendering, and modular backend APIs.',
      icon: Layers
    },
    {
      title: 'API Integration & Database Solutions',
      desc: 'Robust RESTful APIs, third-party service connections, caching strategies, and optimized relational or document database architectures.',
      icon: Database
    },
    {
      title: 'Website Maintenance & Optimization',
      desc: 'Continuous performance optimization, security monitoring, framework updates, dependency patches, and ongoing technical support.',
      icon: RefreshCw
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

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* 3D Cybernetic Perspective Grid Scan Room (Fit to screen & static) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-35">
        <GridScan
          scanColor="#22D3EE"
          linesColor="#1E293B"
          cells={10}
          depth={4}
          glow={0.6}
          lineThickness={1}
          interactive={true}
        />
      </div>

      {/* Background Architectural Matrix & Constellation Animation */}
      <ConstellationGrid className="opacity-35" />
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-[600px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO SECTION: ABOUT ALPHA ENCODERS */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <DecryptedText text="ABOUT ALPHA ENCODERS" speed={40} className="text-cyan-300 tracking-wider font-mono" />
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            Turning Ideas Into{' '}
            <span className="text-gradient-blue inline-block">
              Impactful Digital Experiences.
            </span>
          </h1>

          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
            Alpha Encoders is a web development company focused on building professional, responsive, and scalable digital solutions for businesses of all sizes.
          </p>

          <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto">
            We help startups, small businesses, and established organizations strengthen their digital presence through custom website development, e-commerce solutions, and web applications tailored to their business needs.
          </p>
        </div>

        {/* SECTION: OUR SERVICES */}
        <div className="my-16 border-t border-slate-850 pt-16">
          <SectionHeading
            eyebrow="What We Build"
            title="Our Core"
            titleHighlight="Services."
            description="Our approach combines modern technology, thoughtful user experience, and reliable engineering to create digital products that support business growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {servicesList.map((srv, idx) => {
              const IconComponent = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0A1024]/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-5 group-hover:scale-105 group-hover:border-cyan-400/60 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
                At Alpha Encoders, our goal is simple: to turn ideas into effective digital experiences and build long-term relationships with our clients.
              </p>
            </div>

            {/* Visual Engineering Graphic */}
            <div className="lg:col-span-5 rounded-2xl bg-[#050816] border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">Architecture Matrix</span>
                <span className="text-xs font-mono text-cyan-400">Enterprise Ready</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Design System</span>
                  <span className="text-emerald-400">Responsive &amp; Fluid</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Code Architecture</span>
                  <span className="text-cyan-400">Clean &amp; Maintainable</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Database &amp; APIs</span>
                  <span className="text-blue-400">Optimized Solutions</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0A1024] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Client Relationships</span>
                  <span className="text-emerald-400">Transparent &amp; Long-Term</span>
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

        {/* SECTION: FULL-STACK & MODERN TOOLING MARQUEE */}
        <div className="my-20 border-t border-slate-850 pt-16">
          <SectionHeading
            eyebrow="Engineered Foundations"
            title="The Modern Stack"
            titleHighlight="Powering Every Build."
            description="Proven languages, frameworks, edge caching networks, and reliable database architectures."
          />
          <div className="mt-8">
            <TechStackMarquee />
          </div>
        </div>

        {/* ═══ SECTION: FOUNDER & CEO PROFILE (EXACT SPECIFICATION) ═══ */}
        <div className="my-20 rounded-3xl bg-gradient-to-br from-[#0B1229] via-[#070B14] to-[#0D1836] border border-blue-500/30 p-8 sm:p-12 relative overflow-hidden">
          <BorderBeam size={320} duration={16} colorFrom="#2563FF" colorTo="#22D3EE" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Bio */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                FOUNDER &amp; CEO · ALPHA ENCODERS
              </div>

              <div>
                <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Kabil <span className="text-gradient-blue">K.</span>
                </h2>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mt-1">
                  Founder &amp; CEO, Alpha Encoders
                </p>
              </div>

              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I founded Alpha Encoders with a clear vision: to help businesses turn ideas into impactful digital experiences. As Founder &amp; CEO, I lead our vision, technology strategy, and project execution, ensuring every solution we build aligns with our clients’ goals.
                </p>
                <p>
                  From business websites and e-commerce platforms to custom web applications, I work with our team to deliver digital solutions that combine thoughtful design, reliable engineering, and real business value.
                </p>
                <p className="font-medium text-white border-l-2 border-cyan-400 pl-3.5 italic bg-[#050816]/60 py-2 rounded-r-xl">
                  &ldquo;My focus is simple: build meaningful digital products, create lasting client relationships, and help businesses grow through technology.&rdquo;
                </p>
              </div>

              {/* Key Highlights */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-[#050816]/90 border border-slate-800">
                  <div className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-cyan-400">
                    15+
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Projects Built</div>
                    <div className="text-xs text-slate-400 font-mono">End-to-end client &amp; custom solutions</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <Magnet magnetStrength={0.25}>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#22D3EE] text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
                  >
                    <span>Discover Alpha Encoders</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnet>
                <a
                  href="https://www.linkedin.com/in/k-kabil-091233325/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#050816] border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 text-sm font-medium transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right: Leadership & Expertise */}
            <div className="lg:col-span-5 rounded-2xl bg-[#050816] border border-slate-800 p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">
                  Leadership &amp; Expertise
                </h3>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  Executive Focus
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#0A1024] border border-slate-800/80 space-y-1">
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-cyan-300">
                    Business &amp; Product Strategy
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Understanding business goals and translating ideas into practical digital solutions.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A1024] border border-slate-800/80 space-y-1">
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-blue-400">
                    Technology &amp; Engineering
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Guiding full-stack development, application architecture, API integration, and database design.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A1024] border border-slate-800/80 space-y-1">
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-emerald-400">
                    Project Delivery
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Overseeing development workflows, quality, and delivery to create dependable digital products.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A1024] border border-slate-800/80 space-y-1">
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-amber-400">
                    Client Partnerships
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Building transparent, collaborative relationships focused on long-term value and business growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA FOOTER BANNER */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0A1024] to-[#101A31] border border-blue-500/40 text-center space-y-6">
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white">
            Have a project in mind?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Connect with us to discuss your requirements and let's craft an exceptional digital experience together.
          </p>
          <div className="pt-2">
            <Magnet magnetStrength={0.25}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#22D3EE] text-white font-semibold text-base shadow-xl shadow-cyan-600/30 hover:brightness-110 transition-all"
              >
                <span>Connect with Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
