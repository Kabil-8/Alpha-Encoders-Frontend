import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageSquare, Phone, Shield, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050816] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group" aria-label="Alpha Encoders">
              <div className="w-10 h-10 rounded-xl bg-[#0A1024] border border-blue-500/40 flex items-center justify-center p-1.5 shadow-sm shadow-blue-500/20 group-hover:border-cyan-400/60 transition-all overflow-hidden">
                <img
                  src="/alpha-encoders-icon-dark.png"
                  alt="Alpha Encoders Emblem"
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                  ALPHA <span className="text-[#22D3EE] font-semibold">ENCODERS</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono font-medium -mt-0.5">
                  DIGITAL ENGINEERING STUDIO
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Alpha Encoders designs and develops professional websites and customized digital solutions that help businesses establish and grow their online presence. Founded &amp; led by K.Kabil.{' '}
              <Link to="/portfolio" className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-1">
                View 3D Portfolio →
              </Link>
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="mailto:kabilk2023@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors bg-[#0A1024] px-3 py-2 rounded-lg border border-slate-800"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  kabilk2023@gmail.com
                </a>
                <a
                  href="tel:+918667452487"
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors bg-[#0A1024] px-3 py-2 rounded-lg border border-slate-800 font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  +91 8667452487
                </a>
              </div>
              <div>
                <a
                  href="https://wa.me/918667452487?text=Hello%20K.Kabil%20(Alpha%20Encoders),%20I%20would%20like%20to%20discuss%20a%20website%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-emerald-400 transition-colors bg-[#0A1024] px-3 py-2 rounded-lg border border-slate-800"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: +91 8667452487 (K.Kabil)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Alpha Encoders</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">Services Directory</Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-white transition-colors">Client Projects</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-amber-300 hover:text-amber-200 font-medium transition-colors flex items-center gap-1.5">
                  <span>Founder Portfolio</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">3D UI</span>
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-slate-400 hover:text-white transition-colors">Our 6-Step Process</Link>
              </li>
              <li>
                <Link to="/careers" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1.5">
                  <span>Careers & Internships</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-900/60 text-cyan-300">2026</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Start Project Inquiry</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Services */}
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Core Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">Corporate Websites</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">E-commerce Stores</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">Custom Web Applications</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">Performance Optimization</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">Hospitality & Bookings</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">Website Redesign</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Verified Client Work & Code */}
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Case Studies
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/projects" className="group block">
                  <span className="text-white font-medium group-hover:text-cyan-400 flex items-center gap-1">
                    TheCustomNest
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-xs text-slate-500 block">Artisan Crochet E-Commerce</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="group block">
                  <span className="text-white font-medium group-hover:text-cyan-400 flex items-center gap-1">
                    JavaLearn
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-xs text-slate-500 block">Developer Learning Platform</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="group block">
                  <span className="text-white font-medium group-hover:text-cyan-400 flex items-center gap-1">
                    EduSphere
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-xs text-slate-500 block">Modern Academic Platform</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="group block">
                  <span className="text-white font-medium group-hover:text-cyan-400 flex items-center gap-1">
                    Research & Papers
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-xs text-slate-500 block">CS Research & IEEE Papers</span>
                </Link>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101A31] border border-blue-500/20 text-xs text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TypeScript & React Stack</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Alpha Encoders. All rights reserved. Professional digital craftsmanship.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <div className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
