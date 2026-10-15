import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { DecryptedText } from '../components/reactbits/DecryptedText';
import { BorderBeam } from '../components/reactbits/BorderBeam';
import { Magnet } from '../components/reactbits/Magnet';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MessageSquare,
  Clock,
  Shield,
  Sparkles
} from 'lucide-react';

interface FormErrors {
  fullName?: string;
  email?: string;
  websiteType?: string;
  description?: string;
}

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [websiteType, setWebsiteType] = useState('Business website');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Contact form', 'SEO']);
  const [estimatedBudget, setEstimatedBudget] = useState('$1,000 – $2,500');
  const [completionTimeline, setCompletionTimeline] = useState('1-2 months');
  const [description, setDescription] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap

  // UX & Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  // Pre-fill from query params if navigated from service or project card
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const projectParam = searchParams.get('project');

    if (serviceParam) {
      if (serviceParam.includes('ecommerce')) setWebsiteType('E-commerce');
      else if (serviceParam.includes('corporate') || serviceParam.includes('business')) setWebsiteType('Business website');
      else if (serviceParam.includes('portfolio')) setWebsiteType('Portfolio');
      else if (serviceParam.includes('restaurant') || serviceParam.includes('hotel')) setWebsiteType('Restaurant or hotel');
      else if (serviceParam.includes('educational')) setWebsiteType('Education');
      else if (serviceParam.includes('healthcare')) setWebsiteType('Healthcare');
      else if (serviceParam.includes('real-estate')) setWebsiteType('Real estate');
      else if (serviceParam.includes('landing')) setWebsiteType('Landing page');
      else if (serviceParam.includes('apps')) setWebsiteType('Custom web application');
      else if (serviceParam.includes('redesign')) setWebsiteType('Website redesign');
    }

    if (projectParam) {
      setDescription(`Hello Alpha Encoders, I noticed your case study on "${projectParam}" and would like to build a similar solution for my business.`);
    }
  }, [searchParams]);

  const websiteTypes = [
    'Business website',
    'E-commerce',
    'Portfolio',
    'Education',
    'Research Work & Academic Papers',
    'Custom web application',
    'Restaurant or hotel',
    'Healthcare',
    'Real estate',
    'Landing page',
    'Website redesign',
    'Other'
  ];

  const featureOptions = [
    'Contact form',
    'User authentication',
    'Admin dashboard',
    'Product catalog',
    'Online payments',
    'Booking or appointments',
    'Content management',
    'Third-party API integration',
    'SEO & Analytics',
    'Research & Benchmark Artifacts',
    'LaTeX / IEEE Paper Formatting',
    'Other'
  ];

  const budgetOptions = [
    'Under $1,000',
    '$1,000 – $2,500',
    '$2,500 – $5,000',
    '$5,000 – $10,000',
    '$10,000+',
    'To be determined with developer'
  ];

  const timelineOptions = [
    'Within 2-4 weeks',
    '1-2 months',
    '2-3 months',
    'Flexible timeline'
  ];

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailRegex.test(email)) {
      errs.email = 'Please provide a valid email format (e.g., name@company.com).';
    }

    if (!websiteType) {
      errs.websiteType = 'Please select a website type.';
    }

    if (!description.trim() || description.trim().length < 15) {
      errs.description = 'Please describe your project requirements in at least 15 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot check
    if (honeypot) {
      console.warn('Spam submission intercepted.');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionFeedback(null);

    try {
      // Dispatch project inquiry directly to backend API
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          company,
          websiteType,
          requiredFeatures: selectedFeatures,
          estimatedBudget,
          completionTimeline,
          description,
          honeypot,
        }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error status.');
      }

      // Fire celebratory confetti for the user
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563FF', '#22D3EE', '#3B82F6', '#F5F8FF'],
        });
      } catch (err) {
        // Safe fallback
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmissionFeedback('We encountered a temporary network issue. Your details have been preserved. Please retry or contact us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setDescription('');
    setErrors({});
  };

  // WhatsApp quick text constructor
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Hello Alpha Encoders! My name is ${fullName || 'a client'}. I am interested in building a ${websiteType} for ${company || 'my business'}.`
  )}`;

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO INTRO */}
        <div className="max-w-3xl mx-auto text-center space-y-6 pb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <DecryptedText text="START A CONVERSATION" speed={40} className="text-cyan-300 tracking-wider font-mono" />
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            Let's Talk About{' '}
            <span className="text-gradient-blue inline-block">
              Your Project.
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            Share a few details about your business and what you'd like to build. We'll use them to understand your requirements and discuss the next steps.
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT: FORM & DIRECT CHANNELS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Form */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-[#0A1024] border border-blue-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <BorderBeam size={280} duration={12} colorFrom="#2563FF" colorTo="#22D3EE" />
              {isSubmitted ? (
                // SUCCESS STATE
                <div className="py-12 px-4 text-center space-y-6 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-900/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                    Inquiry Received Successfully!
                  </h3>

                  <p className="text-slate-300 text-base max-w-lg mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{fullName}</span>. We've logged your requirements for a <strong className="text-cyan-300">{websiteType}</strong>. A lead engineer will review your project scope and reply to <strong className="text-cyan-300">{email}</strong> within 24 business hours.
                  </p>

                  <div className="p-4 rounded-xl bg-[#050816] border border-slate-800 text-xs font-mono text-slate-400 max-w-md mx-auto">
                    Inquiry Ticket: AE-{Math.floor(100000 + Math.random() * 900000)} • Encrypted & Logged
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Follow-up on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 rounded-xl bg-[#101A31] hover:bg-[#162344] text-slate-300 hover:text-white border border-slate-800 text-sm font-semibold transition-all"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                // INQUIRY FORM
                <form onSubmit={handleSubmit} noValidate className="space-y-8">
                  {/* Honeypot field (hidden for users, catches spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_field">Do not fill this</label>
                    <input
                      type="text"
                      id="hp_field"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Submission Error Banner */}
                  {submissionFeedback && (
                    <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-sm text-rose-300 flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submissionFeedback}</span>
                    </div>
                  )}

                  {/* Group 1: Contact Details */}
                  <div className="space-y-4">
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white border-b border-slate-800 pb-2">
                      1. Contact Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                        >
                          Full Name <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full px-4 py-3 rounded-xl bg-[#050816] text-white border text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                          }`}
                        />
                        {errors.fullName && (
                          <span className="text-xs text-rose-400 mt-1 block">{errors.fullName}</span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                        >
                          Email Address <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. alex@yourcompany.com"
                          className={`w-full px-4 py-3 rounded-xl bg-[#050816] text-white border text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                          }`}
                        />
                        {errors.email && (
                          <span className="text-xs text-rose-400 mt-1 block">{errors.email}</span>
                        )}
                      </div>

                      {/* Phone or WhatsApp */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                        >
                          Phone or WhatsApp <span className="text-slate-500 font-normal">(Optional)</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 rounded-xl bg-[#050816] text-white border border-slate-800 focus:border-blue-500 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>

                      {/* Company Name */}
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                        >
                          Company or Business Name <span className="text-slate-500 font-normal">(Optional)</span>
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Acme Studio"
                          className="w-full px-4 py-3 rounded-xl bg-[#050816] text-white border border-slate-800 focus:border-blue-500 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Group 2: Project Classification */}
                  <div className="space-y-4">
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white border-b border-slate-800 pb-2">
                      2. Project Scope & Specifications
                    </h3>

                    {/* Website Type (Required Select) */}
                    <div>
                      <label
                        htmlFor="websiteType"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Website Type <span className="text-cyan-400">*</span>
                      </label>
                      <select
                        id="websiteType"
                        value={websiteType}
                        onChange={(e) => setWebsiteType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#050816] text-white border border-slate-800 focus:border-blue-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        {websiteTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#050816] text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Required Features (Multi-Select Pills) */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                        Required Features <span className="text-slate-500 font-normal">(Select all that apply)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {featureOptions.map((feat) => {
                          const isSelected = selectedFeatures.includes(feat);
                          return (
                            <button
                              key={feat}
                              type="button"
                              onClick={() => toggleFeature(feat)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                isSelected
                                  ? 'bg-blue-600 text-white border border-blue-400/50 shadow-sm shadow-blue-500/20'
                                  : 'bg-[#050816] text-slate-400 hover:text-white border border-slate-800'
                              }`}
                            >
                              {isSelected ? `✓ ${feat}` : `+ ${feat}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                        >
                          Estimated Budget <span className="text-slate-500 font-normal">(Optional)</span>
                        </label>
                        <select
                          id="budget"
                          value={estimatedBudget}
                          onChange={(e) => setEstimatedBudget(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#050816] text-white border border-slate-800 focus:border-blue-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                          {budgetOptions.map((b) => (
                            <option key={b} value={b} className="bg-[#050816] text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                        >
                          Preferred Completion Timeline <span className="text-slate-500 font-normal">(Optional)</span>
                        </label>
                        <select
                          id="timeline"
                          value={completionTimeline}
                          onChange={(e) => setCompletionTimeline(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#050816] text-white border border-slate-800 focus:border-blue-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                          {timelineOptions.map((t) => (
                            <option key={t} value={t} className="bg-[#050816] text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Group 3: Description */}
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider"
                    >
                      Project Description & Requirements <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={5}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please tell us about your goals, existing website links if any, target customers, and key milestones you have in mind..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#050816] text-white border text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.description ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.description && (
                      <span className="text-xs text-rose-400 block">{errors.description}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Magnet magnetStrength={0.15} className="w-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Encrypting & Dispatching Scope...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Project Inquiry</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </Magnet>
                    <p className="text-center text-xs text-slate-500 mt-3 font-mono">
                      Strict non-disclosure. We never share client contact details or project scopes.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Direct Channels & Collaboration Assurances */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Contact Card */}
            <div className="rounded-3xl bg-[#0A1024] border border-slate-800 p-6 space-y-5">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Direct Inquiries
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:contact@alphaencoders.com"
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#050816] border border-slate-800 hover:border-blue-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Email Us Directly
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      contact@alphaencoders.com
                    </span>
                  </div>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#050816] border border-slate-800 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      WhatsApp Quick Chat
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      Start WhatsApp Thread
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Response Time & Assurances */}
            <div className="rounded-3xl bg-[#0A1024] border border-slate-800 p-6 space-y-4 text-xs text-slate-300">
              <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white uppercase tracking-wider">
                What to Expect
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Prompt response within 24 business hours from a senior frontend engineer.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Free initial discovery review and feasibility assessment.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Clear, transparent milestone roadmap with no hidden retainers.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
