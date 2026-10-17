import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Printer,
  Plus,
  Trash2,
  Download,
  Copy,
  Check,
  Building,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { apiUrl } from '../config/api';

interface QuotationLineItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  rate: number;
}

interface ClientPreset {
  email: string;
  fullName: string;
  company?: string;
  phone?: string;
  websiteType: string;
}

export const QuotationPage: React.FC = () => {
  const navigate = useNavigate();

  // Authentication Guard: Quotation engine is strictly accessible in Admin
  useEffect(() => {
    const token = localStorage.getItem('ae_admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  // Quotation Metadata
  const [quoteNumber, setQuoteNumber] = useState<string>(
    `AE-QUO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
  );
  const [issueDate, setIssueDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [validUntil, setValidUntil] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [currencyCode, setCurrencyCode] = useState<string>('USD');

  // Client Details
  const [clientName, setClientName] = useState<string>('Anya Sharma');
  const [clientCompany, setClientCompany] = useState<string>('TheCustomNest Studio');
  const [clientEmail, setClientEmail] = useState<string>('anya@thecustomnest.com');
  const [clientPhone, setClientPhone] = useState<string>('+1 415-890-2341');
  const [clientLocation, setClientLocation] = useState<string>('San Francisco, CA');
  const [projectTitle, setProjectTitle] = useState<string>(
    'TheCustomNest Artisan E-Commerce Platform & High-Speed Checkout Drawer'
  );

  // Line Items
  const [lineItems, setLineItems] = useState<QuotationLineItem[]>([
    {
      id: 'item-1',
      title: 'Bespoke Storefront Architecture & UI Design',
      description: 'Artisan brand visual storytelling, responsive mobile UX, product showcase grid, and custom SVG aesthetics.',
      quantity: 1,
      rate: 1500
    },
    {
      id: 'item-2',
      title: 'High-Speed Reactive Cart Drawer & State Machine',
      description: 'Frictionless slide-out cart drawer, optimistic quantity adjustments, zero layout shift, and instant item tallying.',
      quantity: 1,
      rate: 1100
    },
    {
      id: 'item-3',
      title: 'Dynamic Category Navigation & Catalog Search',
      description: 'Multi-attribute filtering for handmade crochet collections with client-side instant filtering.',
      quantity: 1,
      rate: 900
    },
    {
      id: 'item-4',
      title: 'Order Processing & Direct Checkout Flow',
      description: 'Friction-free checkout pipeline, WhatsApp direct order integration, payment gateway readiness, and email receipts.',
      quantity: 1,
      rate: 800
    },
    {
      id: 'item-5',
      title: 'Core Web Vitals & Sub-Second Edge Optimization',
      description: 'Responsive WebP asset streaming, blur placeholders, 99/100 Lighthouse benchmark performance, and global CDN hosting.',
      quantity: 1,
      rate: 500
    }
  ]);

  // Adjustments & Terms
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [notes, setNotes] = useState<string>(
    '• 100% intellectual property, design assets, and source code ownership transferred upon final milestone payment.\n• Includes 60 days of post-deployment technical warranty and monitoring.\n• Built with modern TypeScript, modular components, and sub-second edge performance.'
  );

  // UI States
  const [copied, setCopied] = useState<boolean>(false);
  const [clientPresets, setClientPresets] = useState<ClientPreset[]>([]);

  // Load clients from server API if available to enable quick filling
  useEffect(() => {
    fetch(apiUrl('/api/users'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          setClientPresets(
            data.users.map((u: any) => ({
              email: u.email,
              fullName: u.fullName,
              company: u.company,
              phone: u.phone,
              websiteType: u.websiteTypes?.[0] || 'Web Application'
            }))
          );
        }
      })
      .catch(() => {
        // Silently continue
      });
  }, []);

  // Quick Preset Package Handlers
  const handleLoadPreset = (presetType: 'ecommerce' | 'research' | 'academic' | 'corporate') => {
    if (presetType === 'ecommerce') {
      setProjectTitle('TheCustomNest Artisan E-Commerce Platform & Checkout Drawer');
      setLineItems([
        {
          id: 'item-1',
          title: 'Bespoke Storefront Architecture & UI Design',
          description: 'Artisan brand visual storytelling, responsive mobile UX, product showcase grid, and custom SVG aesthetics.',
          quantity: 1,
          rate: 1500
        },
        {
          id: 'item-2',
          title: 'High-Speed Reactive Cart Drawer & State Machine',
          description: 'Frictionless slide-out cart drawer, optimistic quantity adjustments, zero layout shift, and instant item tallying.',
          quantity: 1,
          rate: 1100
        },
        {
          id: 'item-3',
          title: 'Dynamic Category Navigation & Catalog Search',
          description: 'Multi-attribute filtering for handmade crochet collections with client-side instant filtering.',
          quantity: 1,
          rate: 900
        },
        {
          id: 'item-4',
          title: 'Order Processing & Direct Checkout Flow',
          description: 'Friction-free checkout pipeline, WhatsApp direct order integration, payment gateway readiness, and email receipts.',
          quantity: 1,
          rate: 800
        },
        {
          id: 'item-5',
          title: 'Core Web Vitals & Sub-Second Edge Optimization',
          description: 'Responsive WebP asset streaming, blur placeholders, 99/100 Lighthouse benchmark performance, and global CDN hosting.',
          quantity: 1,
          rate: 500
        }
      ]);
    } else if (presetType === 'research') {
      setProjectTitle('Computer Science Research Work & Academic Paper Engineering');
      setLineItems([
        {
          id: 'item-1',
          title: 'Scientific Formulation & Algorithm Design',
          description: 'Formal mathematical modeling, algorithm design, asymptotic complexity analysis, and methodology formulation.',
          quantity: 1,
          rate: 2000
        },
        {
          id: 'item-2',
          title: 'Empirical Benchmarking Harness & Experimental Evaluation',
          description: 'Reproducible computational experiments, baseline comparative performance telemetry, and data visualization charts.',
          quantity: 1,
          rate: 1600
        },
        {
          id: 'item-3',
          title: 'IEEE / ACM / Springer Camera-Ready LaTeX Manuscript',
          description: 'Complete academic publication drafting, formal dual-column typography, mathematical equations, references, and citations.',
          quantity: 1,
          rate: 1800
        },
        {
          id: 'item-4',
          title: 'Reproducible Artifact Repository & GitHub Archive',
          description: 'Containerized execution scripts, test suites, and open-source documentation adhering to ACM artifact guidelines.',
          quantity: 1,
          rate: 1100
        }
      ]);
    } else if (presetType === 'academic') {
      setProjectTitle('EduSphere & JavaLearn Academic Learning Platform Deployment');
      setLineItems([
        {
          id: 'item-1',
          title: 'Curriculum Explorer & Modular Syllabus Architecture',
          description: 'Multi-tiered course catalog, credit breakdown calculators, prerequisite roadmaps, and instant subject search.',
          quantity: 1,
          rate: 1800
        },
        {
          id: 'item-2',
          title: 'Interactive Code Sandboxing & Developer Documentation UX',
          description: 'Syntax-highlighted code blocks, one-click snippet copying, modular lesson navigation, and accessible dark ergonomics.',
          quantity: 1,
          rate: 1500
        },
        {
          id: 'item-3',
          title: 'Student Intake Pipeline & Admissions Inquiry Flow',
          description: 'Interactive admissions inquiry form, instant validation, downloadable syllabi PDFs, and staff email routing.',
          quantity: 1,
          rate: 1200
        },
        {
          id: 'item-4',
          title: 'WCAG AA Accessibility & Sub-Second Edge Performance',
          description: 'High-contrast typography, screen-reader optimized landmarks, semantic tags, and sub-second page delivery.',
          quantity: 1,
          rate: 900
        }
      ]);
    } else if (presetType === 'corporate') {
      setProjectTitle('Enterprise Corporate Digital Headquarters & Client Portal');
      setLineItems([
        {
          id: 'item-1',
          title: 'Custom Corporate Design System & Brand Digital Architecture',
          description: 'Executive leadership directories, capability breakdowns, interactive case study showcases, and cinematic aesthetics.',
          quantity: 1,
          rate: 1800
        },
        {
          id: 'item-2',
          title: 'Enterprise Inquiry & Request for Proposal (RFP) Engine',
          description: 'Multi-tier commercial inquiry routing, quotation estimator tool, CRM telemetry sync, and automated email confirmation.',
          quantity: 1,
          rate: 1200
        },
        {
          id: 'item-3',
          title: 'Technical SEO, JSON-LD Schema & High-Security Hosting',
          description: 'Full schema markup, OpenGraph social cards, SSL hardening, HTTP security headers, and ultra-fast edge delivery.',
          quantity: 1,
          rate: 1000
        }
      ]);
    }
  };

  // Line Item Table Operations
  const handleAddItem = () => {
    const newItem: QuotationLineItem = {
      id: `item-${Date.now()}`,
      title: 'New Engineering Deliverable',
      description: 'Detailed specification, component engineering, and testing.',
      quantity: 1,
      rate: 500
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleUpdateItem = (
    id: string,
    field: keyof QuotationLineItem,
    value: string | number
  ) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    if (lineItems.length <= 1) {
      alert('A quotation must contain at least one line item.');
      return;
    }
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  // Financial Calculations
  const subtotal = lineItems.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const grandTotal = taxableAmount + taxAmount;

  // Print & PDF Export Execution
  const handlePrintPDF = () => {
    window.print();
  };

  // Export Quote Data as JSON
  const handleExportJSON = () => {
    const data = {
      quoteNumber,
      issueDate,
      validUntil,
      currency: currencyCode,
      client: {
        name: clientName,
        company: clientCompany,
        email: clientEmail,
        phone: clientPhone,
        location: clientLocation
      },
      projectTitle,
      lineItems,
      subtotal,
      discountPercent,
      taxPercent,
      grandTotal,
      notes,
      generatedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${quoteNumber}_Alpha_Encoders_Quotation.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy quick summary to clipboard
  const handleCopySummary = () => {
    const text = `ALPHA ENCODERS • COMMERCIAL PROPOSAL / QUOTATION\nQuote Reference: ${quoteNumber}\nDate: ${issueDate}\nClient: ${clientName} (${clientCompany})\nProject: ${projectTitle}\n\nDeliverables:\n${lineItems
      .map((item, idx) => `${idx + 1}. ${item.title}: ${currencySymbol}${item.quantity * item.rate}`)
      .join('\n')}\n\nTotal Investment: ${currencySymbol}${grandTotal.toLocaleString()} ${currencyCode}\nPayment Terms: 50% Inception, 30% Milestone Staging, 20% Production Handover.\nValid Until: ${validUntil}\nContact: kabilk2023@gmail.com | K.Kabil (+91 8667452487)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-[#F5F8FF] pt-24 pb-20 selection:bg-blue-600/30 selection:text-cyan-300">
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none no-print" />
      <div className="absolute top-20 right-1/4 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none no-print" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP BAR / NAVIGATION (Hidden when Printing) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800 no-print">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Admin Console</span>
              </Link>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-950 border border-blue-500/30 text-cyan-300">
                Official Agency Quotation Engine
              </span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Commercial Quotation & Proposal Builder
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Create, customize, and export client proposals with official branding, detailed tables, and PDF generation.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-slate-700 text-xs font-mono text-slate-300 transition-all shadow-sm"
              title="Copy text summary for WhatsApp or Email"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Summary Copied' : 'Copy Summary'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-slate-700 text-xs font-mono text-cyan-300 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              onClick={handlePrintPDF}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Export to PDF / Print</span>
            </button>
          </div>
        </div>

        {/* WORKSPACE GRID: Controls Form on Left, Document Sheet on Right (Hidden during print) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* ========================================================= */}
          {/* LEFT COLUMN: INTERACTIVE FORM & PRESETS (no-print) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6 no-print">
            {/* Quick Preset Packages */}
            <div className="p-5 rounded-2xl bg-[#0A1024] border border-blue-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Architecture Presets</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">1-Click Fill</span>
              </div>
              <p className="text-xs text-slate-400">
                Populate complete deliverables, technical scopes, and rates based on verified deployments:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => handleLoadPreset('ecommerce')}
                  className="p-2.5 rounded-xl bg-[#101A31] hover:bg-blue-900/40 border border-slate-800 hover:border-blue-500/40 text-left text-slate-200 transition-all"
                >
                  <span className="font-bold text-cyan-300 block">TheCustomNest</span>
                  <span className="text-[10px] text-slate-400">E-Commerce Store</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPreset('academic')}
                  className="p-2.5 rounded-xl bg-[#101A31] hover:bg-blue-900/40 border border-slate-800 hover:border-blue-500/40 text-left text-slate-200 transition-all"
                >
                  <span className="font-bold text-cyan-300 block">JavaLearn / EduSphere</span>
                  <span className="text-[10px] text-slate-400">Academic Tech Platform</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPreset('research')}
                  className="p-2.5 rounded-xl bg-[#101A31] hover:bg-blue-900/40 border border-slate-800 hover:border-blue-500/40 text-left text-slate-200 transition-all"
                >
                  <span className="font-bold text-cyan-300 block">Research Papers</span>
                  <span className="text-[10px] text-slate-400">IEEE/ACM LaTeX Drafting</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPreset('corporate')}
                  className="p-2.5 rounded-xl bg-[#101A31] hover:bg-blue-900/40 border border-slate-800 hover:border-blue-500/40 text-left text-slate-200 transition-all"
                >
                  <span className="font-bold text-cyan-300 block">Corporate Site</span>
                  <span className="text-[10px] text-slate-400">Enterprise Digital HQ</span>
                </button>
              </div>
            </div>

            {/* Client Pre-Fill Selector */}
            {clientPresets.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#0A1024] border border-slate-800 space-y-2">
                <label className="text-xs font-mono uppercase text-slate-400 block font-semibold">
                  Pre-Fill from CRM Client Roster
                </label>
                <select
                  onChange={(e) => {
                    const found = clientPresets.find((c) => c.email === e.target.value);
                    if (found) {
                      setClientName(found.fullName);
                      setClientCompany(found.company || '');
                      setClientEmail(found.email);
                      if (found.phone) setClientPhone(found.phone);
                      setProjectTitle(`Custom ${found.websiteType} Deployment`);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-700 text-xs text-cyan-300 font-mono focus:outline-none"
                >
                  <option value="">Select a registered client or lead...</option>
                  {clientPresets.map((c, i) => (
                    <option key={i} value={c.email}>
                      {c.fullName} — {c.company || c.email} ({c.websiteType})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quotation Parameters */}
            <div className="p-5 rounded-2xl bg-[#0A1024] border border-slate-800 space-y-4">
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>Proposal & Client Details</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Quote Reference #</label>
                  <input
                    type="text"
                    value={quoteNumber}
                    onChange={(e) => setQuoteNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Currency</label>
                  <select
                    value={currencyCode}
                    onChange={(e) => {
                      const code = e.target.value;
                      setCurrencyCode(code);
                      if (code === 'INR') setCurrencySymbol('₹');
                      else if (code === 'EUR') setCurrencySymbol('€');
                      else if (code === 'GBP') setCurrencySymbol('£');
                      else setCurrencySymbol('$');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white font-mono focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Client Full Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Client Company</label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Client Email</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Client Location / Address</label>
                <input
                  type="text"
                  value={clientLocation}
                  onChange={(e) => setClientLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA / London, UK / Mumbai, India"
                  className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Project Scope Title</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Discount and Tax Adjustments */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Tax / GST / VAT (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Line Items Editor */}
            <div className="p-5 rounded-2xl bg-[#0A1024] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Deliverables & Pricing Table</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Row</span>
                </button>
              </div>

              <div className="space-y-3">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-[#101A31]/70 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Item 0{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Delete deliverable"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                      placeholder="Deliverable Title"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#0A1024] border border-slate-700 text-xs font-semibold text-white focus:outline-none"
                    />

                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                      placeholder="Detailed scope, technical specifications, and deliverables..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#0A1024] border border-slate-700 text-xs text-slate-300 focus:outline-none"
                    />

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[9px] uppercase text-slate-400 block mb-0.5">Quantity / Units</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value) || 1)}
                          className="w-full px-2.5 py-1 rounded bg-[#0A1024] border border-slate-700 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-slate-400 block mb-0.5">Rate ({currencySymbol})</span>
                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => handleUpdateItem(item.id, 'rate', Number(e.target.value) || 0)}
                          className="w-full px-2.5 py-1 rounded bg-[#0A1024] border border-slate-700 text-emerald-400 font-bold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Notes Editor */}
            <div className="p-5 rounded-2xl bg-[#0A1024] border border-slate-800 space-y-3">
              <label className="text-xs font-mono uppercase text-slate-400 block font-semibold">
                Engagement Terms & IP Transfer Notes
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify terms, milestone policies, warranty, and IP conditions..."
                className="w-full px-3 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-xs text-slate-200 focus:outline-none font-mono leading-relaxed"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: THE PRINTABLE QUOTATION DOCUMENT SHEET */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2 no-print">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Live Proposal Sheet Preview (A4 Dimensions)
                </span>
                <span>Click 'Export to PDF' to save or print</span>
              </div>

              {/* The Formal Document Container (Target of Print / PDF) */}
              <div
                id="quotation-document"
                className="bg-[#0A1024] border border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-white relative overflow-hidden"
              >
                {/* Visual Header Glow */}
                <div className="absolute top-0 right-0 w-80 h-40 bg-blue-600/10 blur-[90px] pointer-events-none no-print" />

                {/* 1. DOCUMENT TOP HEADER WITH LOGO & IDENTIFIERS */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-6">
                  {/* Brand Logo & Name */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-[#101A31] border border-blue-500/40 p-2 shadow-md flex items-center justify-center shrink-0">
                      <img
                        src="/alpha-encoders-icon-dark.png"
                        alt="Alpha Encoders Official Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                        ALPHA <span className="text-cyan-400 font-extrabold">ENCODERS</span>
                      </div>
                      <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono font-semibold block">
                        Digital Engineering & Research Studio
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        Available for Q1 Projects • Verified Deployments
                      </span>
                    </div>
                  </div>

                  {/* Document Type & Reference */}
                  <div className="text-left sm:text-right font-mono space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      Commercial Quotation
                    </span>
                    <div className="text-xs font-bold text-white pt-1">{quoteNumber}</div>
                    <div className="text-[11px] text-slate-400">Date: {new Date(issueDate).toLocaleDateString()}</div>
                    <div className="text-[11px] text-amber-300">Valid Through: {new Date(validUntil).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* 2. TWO-COLUMN ADDRESS ROSTER (PREPARED BY & PREPARED FOR) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-slate-800/80 pb-6">
                  {/* Studio Details */}
                  <div className="space-y-1.5 p-4 rounded-2xl bg-[#101A31]/40 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block">
                      From: Engineering Studio
                    </span>
                    <div className="font-bold text-white text-sm font-['Space_Grotesk']">Alpha Encoders</div>
                    <div className="text-slate-300 font-mono">Lead Solutions Architect: K.Kabil</div>
                    <div className="text-slate-400 font-mono">Email: kabilk2023@gmail.com</div>
                    <div className="text-slate-400 font-mono">Phone: +91 8667452487</div>
                    <div className="text-slate-400 font-mono">Web: https://alphaencoders.com</div>
                  </div>

                  {/* Client Details */}
                  <div className="space-y-1.5 p-4 rounded-2xl bg-[#101A31]/40 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block">
                      Prepared For: Client Partner
                    </span>
                    <div className="font-bold text-white text-sm font-['Space_Grotesk']">{clientName}</div>
                    <div className="text-slate-200 font-medium">{clientCompany || 'Direct Client Account'}</div>
                    <div className="text-slate-400 font-mono">{clientEmail}</div>
                    {clientPhone && <div className="text-emerald-400 font-mono">{clientPhone}</div>}
                    {clientLocation && <div className="text-slate-400 font-mono">{clientLocation}</div>}
                  </div>
                </div>

                {/* 3. PROJECT SCOPE TITLE BANNER */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/70 to-[#101A31] border border-blue-500/30">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block tracking-wider">
                    Project Scope of Work
                  </span>
                  <h2 className="font-['Space_Grotesk'] text-lg font-bold text-white mt-0.5">
                    {projectTitle}
                  </h2>
                </div>

                {/* 4. DELIVERABLES & PRICING TABLE */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-[#101A31] text-slate-300 font-mono uppercase text-[10px]">
                        <th className="py-3 px-3 w-8">#</th>
                        <th className="py-3 px-4">Deliverable / Scope Specification</th>
                        <th className="py-3 px-3 text-center">Qty</th>
                        <th className="py-3 px-4 text-right">Rate</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {lineItems.map((item, index) => (
                        <tr key={item.id} className="hover:bg-slate-900/30">
                          <td className="py-3.5 px-3 font-mono text-slate-500 text-center">{index + 1}</td>
                          <td className="py-3.5 px-4 space-y-1">
                            <div className="font-bold text-white text-sm font-['Space_Grotesk']">{item.title}</div>
                            <div className="text-slate-400 text-xs leading-relaxed max-w-md">{item.description}</div>
                          </td>
                          <td className="py-3.5 px-3 font-mono text-center text-slate-300">{item.quantity}</td>
                          <td className="py-3.5 px-4 font-mono text-right text-slate-300">
                            {currencySymbol}{item.rate.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-right font-bold text-cyan-300 text-sm">
                            {currencySymbol}{(item.quantity * item.rate).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 5. FINANCIAL TOTALS BLOCK */}
                <div className="flex flex-col sm:flex-row justify-end items-end pt-4">
                  <div className="w-full sm:w-72 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-400 pb-1 border-b border-slate-800/70">
                      <span>Subtotal:</span>
                      <span className="text-white font-semibold">{currencySymbol}{subtotal.toLocaleString()}</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-400 pb-1 border-b border-slate-800/70">
                        <span>Discount ({discountPercent}%):</span>
                        <span>-{currencySymbol}{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    {taxPercent > 0 && (
                      <div className="flex justify-between text-slate-400 pb-1 border-b border-slate-800/70">
                        <span>Tax / GST ({taxPercent}%):</span>
                        <span className="text-white">+{currencySymbol}{taxAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 p-3 rounded-xl bg-blue-950/70 border border-blue-500/40 text-sm">
                      <span className="font-bold text-white font-['Space_Grotesk']">Grand Total:</span>
                      <span className="font-bold text-cyan-300 text-lg">
                        {currencySymbol}{grandTotal.toLocaleString()} {currencyCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6. PAYMENT MILESTONE SCHEDULE */}
                <div className="p-4 rounded-2xl bg-[#101A31]/50 border border-slate-800 space-y-3">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block tracking-wider">
                    Commercial Terms & Payment Milestone Schedule
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#0A1024] border border-slate-800/80">
                      <div className="font-bold text-emerald-400 text-sm">50% Inception</div>
                      <div className="text-slate-300 text-[11px] mt-0.5">
                        {currencySymbol}{(grandTotal * 0.5).toLocaleString()} upon contract execution
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">Architecture, UI & wireframe approval</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0A1024] border border-slate-800/80">
                      <div className="font-bold text-cyan-300 text-sm">30% Staging</div>
                      <div className="text-slate-300 text-[11px] mt-0.5">
                        {currencySymbol}{(grandTotal * 0.3).toLocaleString()} upon interactive preview
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">Core feature completion & review</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0A1024] border border-slate-800/80">
                      <div className="font-bold text-blue-400 text-sm">20% Handover</div>
                      <div className="text-slate-300 text-[11px] mt-0.5">
                        {currencySymbol}{(grandTotal * 0.2).toLocaleString()} upon deployment
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">Production launch, DNS & code transfer</div>
                    </div>
                  </div>
                </div>

                {/* 7. INTELLECTUAL PROPERTY & TERMS */}
                <div className="text-xs text-slate-400 space-y-2 border-t border-slate-800 pt-6">
                  <span className="font-bold text-slate-300 font-['Space_Grotesk'] text-sm block">
                    Ownership & Engagement Terms
                  </span>
                  <div className="p-3.5 rounded-xl bg-[#101A31]/40 border border-slate-800 text-[11px] leading-relaxed whitespace-pre-wrap font-mono text-slate-300">
                    {notes}
                  </div>
                </div>

                {/* 8. SIGNATURE AND ACCEPTANCE BLOCK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-slate-800 text-xs">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                      Authorized Studio Sign-off
                    </span>
                    <div className="pt-8 border-b border-slate-700/80 w-48 relative">
                      <span className="absolute bottom-1 left-0 font-['Space_Grotesk'] font-bold text-cyan-300 tracking-wider">
                        K.Kabil
                      </span>
                    </div>
                    <div className="font-mono text-slate-400 text-[11px]">
                      K.Kabil • Founder & Lead Solutions Architect
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                      Client Acceptance Sign-off
                    </span>
                    <div className="pt-8 border-b border-slate-700/80 w-48"></div>
                    <div className="font-mono text-slate-400 text-[11px]">
                      {clientName} • {clientCompany || 'Authorized Representative'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
