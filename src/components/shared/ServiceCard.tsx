import type { ServiceItem } from '../../types';
import { SpotlightCard } from '../reactbits/SpotlightCard';
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
  FileText,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
  FileText,
};

interface ServiceCardProps {
  service: ServiceItem;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, compact = false }) => {
  const IconComponent = iconMap[service.icon] || Sparkles;

  return (
    <SpotlightCard
      spotlightColor="rgba(34, 211, 238, 0.16)"
      className="group p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/40"
    >
      {/* Subtle top border glow highlight */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#101A31] border border-blue-500/30 flex items-center justify-center text-cyan-300 group-hover:border-cyan-400/50 group-hover:bg-[#2563FF]/20 group-hover:scale-105 transition-all">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors">
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {service.shortDesc}
        </p>

        {/* Feature bullets (if not compact) */}
        {!compact && (
          <div className="space-y-2 mb-6 pt-3 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Core Deliverables:
            </span>
            {service.keyFeatures.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer / Action */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <Link
          to={`/services#${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors"
        >
          <span>Catalog Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to={`/contact?service=${service.slug}`}
          className="text-xs text-blue-400 hover:text-cyan-300 font-medium transition-colors"
        >
          Inquire Scope →
        </Link>
      </div>
    </SpotlightCard>
  );
};
