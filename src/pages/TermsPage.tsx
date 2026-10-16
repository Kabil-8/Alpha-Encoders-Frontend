import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>

        <div className="space-y-4 pb-8 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-mono text-cyan-300">
            <FileText className="w-3 h-3 text-cyan-400" />
            <span>CLIENT ENGAGEMENT TERMS</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 text-sm">
            Last Updated: October 2026 • Alpha Encoders Freelance Development Services
          </p>
        </div>

        <div className="space-y-8 mt-10 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              1. Scope of Work & Milestones
            </h2>
            <p>
              All development services provided by Alpha Encoders are executed against an agreed written Project Specification and milestone schedule. Scope adjustments requested after milestone sign-off are evaluated transparently and quoted as separate items.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              2. Review & Revision Cycles
            </h2>
            <p>
              Each developmental stage includes agreed revision cycles (typically 2-3 iterative rounds per stage) to ensure design and functional alignment before proceeding to subsequent engineering phases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              3. Intellectual Property Rights
            </h2>
            <p>
              Upon receipt of final milestone payments, complete intellectual property rights, source code repositories, visual assets, and deployment environments transfer directly to the client. Alpha Encoders reserves the right to display the completed work in its professional portfolio unless otherwise specified under a formal non-disclosure agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              4. Hosting, Third-Party APIs & Maintenance
            </h2>
            <p>
              Clients are responsible for their third-party accounts (such as domain registrars, hosting edge platforms, and payment gateways like Stripe or Razorpay). Post-launch maintenance, monitoring, and updates are provided under agreed support agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              5. Governing Contact
            </h2>
            <p>
              For any questions regarding commercial terms or project agreements, please contact{' '}
              <span className="font-semibold text-white">K.Kabil</span> at{' '}
              <a href="mailto:kabilk2023@gmail.com" className="text-cyan-400 hover:underline">
                kabilk2023@gmail.com
              </a>{' '}
              or via phone / WhatsApp at{' '}
              <a href="tel:+918667452487" className="text-cyan-400 hover:underline font-mono">
                +91 8667452487
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
