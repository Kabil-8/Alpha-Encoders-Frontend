import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>DATA INTEGRITY POLICY</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm">
            Last Updated: October 2026 • Alpha Encoders Digital Engineering Studio
          </p>
        </div>

        <div className="space-y-8 mt-10 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              1. Information We Collect
            </h2>
            <p>
              When you submit a project inquiry or contact Alpha Encoders, we collect information you voluntarily provide, such as your full name, email address, telephone/WhatsApp contact details, company name, website category, and technical requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              2. How We Use Project Information
            </h2>
            <p>
              Your submitted project requirements are used solely for evaluating project feasibility, preparing development quotations, formulating milestone scopes, and communicating directly with you regarding your web development engagement. We never sell, rent, or distribute client data to advertising networks or third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              3. Client Confidentiality & Non-Disclosure
            </h2>
            <p>
              Alpha Encoders respects the proprietary nature of your commercial ideas and code repositories. Any proprietary business logic, content drafts, design files, or internal data shared during discovery or active engineering sprints are held under strict professional confidentiality.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              4. Code Ownership & Security
            </h2>
            <p>
              Upon fulfillment of project milestones and agreed terms, all code written specifically for your custom website is transferred directly to your organization's version control accounts. We implement industry-standard SSL encryption and modern security practices across all production environments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              5. Contact Us Regarding Your Data
            </h2>
            <p>
              If you have any questions or wish to request the removal of any submitted project inquiry details, please reach out directly to{' '}
              <span className="font-semibold text-white">K.Kabil</span> at{' '}
              <a href="mailto:kabilk2023@gmail.com" className="text-cyan-400 hover:underline">
                kabilk2023@gmail.com
              </a>{' '}
              or via phone at{' '}
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
