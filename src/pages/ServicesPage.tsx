import { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { Magnet } from '../components/reactbits/Magnet';
import {
  Building2,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  GraduationCap,
  Stethoscope,
  Home,
  CalendarCheck,
  Target,
  BookOpen,
  Terminal,
  RefreshCw,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  HelpCircle
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  GraduationCap,
  Stethoscope,
  Home,
  CalendarCheck,
  Target,
  BookOpen,
  Terminal,
  RefreshCw,
  Zap,
  ShieldCheck,
};

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 14 Services' },
    { id: 'core', label: 'Core Digital Platforms' },
    { id: 'specialized', label: 'Specialized Industry Solutions' },
    { id: 'optimization', label: 'Performance & Engineering' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === selectedCategory);

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO INTRO */}
        <div className="max-w-3xl mx-auto text-center space-y-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <DecryptedText text="FULL-SPECTRUM WEB CATALOG" speed={40} className="text-cyan-300 tracking-wider font-mono" />
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            Engineered Web Solutions,{' '}
            <span className="text-gradient-blue inline-block">
              Tailored to Your Scope.
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            From focused landing pages to complex corporate platforms and e-commerce stores, explore our comprehensive catalog of 14 tailored development services.
          </p>
        </div>

        {/* CATEGORY FILTER BAR */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                  : 'bg-[#0A1024] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* SERVICES DIRECTORY CARDS */}
        <div className="space-y-12">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon] || Sparkles;

            return (
              <div
                key={service.id}
                id={service.slug}
                className="group relative rounded-3xl bg-[#0A1024] border border-slate-800 hover:border-blue-500/40 p-6 sm:p-10 transition-all duration-300 shadow-xl scroll-mt-28"
              >
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300 group-hover:bg-blue-600/20 transition-all">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-semibold block">
                          SERVICE {service.number}
                        </span>
                        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-300 text-base leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <div className="p-3 rounded-xl bg-[#050816] border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-cyan-300 font-mono font-semibold uppercase tracking-wider shrink-0 mt-0.5">
                        Ideal For:
                      </span>
                      <span>{service.targetAudience}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 lg:text-right">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-mono text-cyan-300 capitalize">
                        {service.category} Service
                      </span>
                    </div>

                    <div>
                      <Magnet magnetStrength={0.25}>
                        <Link
                          to={`/contact?service=${service.slug}`}
                          className="inline-flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white font-semibold text-sm shadow-md shadow-blue-600/30 hover:brightness-110 transition-all"
                        >
                          <span>Inquire About This Service</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Magnet>
                    </div>
                  </div>
                </div>

                {/* Features & Benefits Two-Column Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-800/80">
                  {/* Left: Features */}
                  <div className="space-y-3">
                    <h3 className="font-['Space_Grotesk'] text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-cyan-400" /> Key Features & Capabilities
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                      {service.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Business Benefits */}
                  <div className="space-y-3">
                    <h3 className="font-['Space_Grotesk'] text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-400" /> Commercial Business Benefits
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                      {service.businessBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SCOPE CLARITY NOTE */}
        <div className="mt-16 p-6 rounded-2xl bg-[#0A1024] border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Note on Project Scope:</strong> Specific functionality, third-party integrations, and feature sets are determined collaboratively during the Discovery & Requirements phase. Not every feature is required or included in every project scope.
          </p>
        </div>
      </div>
    </div>
  );
};
