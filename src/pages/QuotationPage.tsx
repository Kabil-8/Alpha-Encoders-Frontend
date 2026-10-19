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
  ArrowLeft,
  CloudUpload,
  CheckCircle2,
  Loader2,
  FileDown
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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

  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [sheetTheme, setSheetTheme] = useState<'light' | 'dark'>('light');

  // Direct High-Resolution PDF Generator (No browser margin artifacts, no broken dark blocks)
  const handleDownloadPDF = async () => {
    const docElement = document.getElementById('quotation-document');
    if (!docElement) return;

    setIsGeneratingPDF(true);
    const prevTheme = sheetTheme;
    if (prevTheme === 'dark') {
      setSheetTheme('light');
      await new Promise((r) => setTimeout(r, 120));
    }

    try {
      const canvas = await html2canvas(docElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1200
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const margin = 8;
      const printableWidth = pageWidth - margin * 2;
      const printableHeight = (canvas.height * printableWidth) / canvas.width;

      let heightLeft = printableHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, printableWidth, printableHeight, undefined, 'FAST');
      heightLeft -= pageHeight - margin * 2;

      while (heightLeft > 0) {
        position = heightLeft - printableHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, printableWidth, printableHeight, undefined, 'FAST');
        heightLeft -= pageHeight - margin * 2;
      }

      pdf.save(`${quoteNumber}_Alpha_Encoders_Quotation.pdf`);
    } catch (error) {
      console.error('Direct PDF export error:', error);
      window.print();
    } finally {
      if (prevTheme === 'dark') {
        setSheetTheme('dark');
      }
      setIsGeneratingPDF(false);
    }
  };

  // Browser Print & PDF Export Execution
  const handlePrintPDF = () => {
    if (sheetTheme === 'dark') {
      setSheetTheme('light');
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
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

  const [isSavingCloud, setIsSavingCloud] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Synchronize Quotation with MongoDB Atlas API
  const handleSaveToCloud = async () => {
    setIsSavingCloud(true);
    setSaveSuccessMessage(null);
    try {
      const payload = {
        quoteNumber,
        issueDate,
        validUntil,
        currencyCode,
        currencySymbol,
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
        status: 'sent'
      };

      const res = await fetch(apiUrl('/api/quotations'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save quotation to cloud database.');
      }
      setSaveSuccessMessage('Quotation synchronized to MongoDB Atlas cloud database!');
      setTimeout(() => setSaveSuccessMessage(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Error saving quotation to cloud.');
    } finally {
      setIsSavingCloud(false);
    }
  };

  return (
    <div className="quotation-page-root relative min-h-screen bg-[#050816] text-[#F5F8FF] pt-24 pb-20 selection:bg-blue-600/30 selection:text-cyan-300">
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
            <h1 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Commercial Quotation & Proposal Builder
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Create, customize, and export client proposals with official branding, detailed tables, and PDF generation.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleSaveToCloud}
              disabled={isSavingCloud}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-xs font-mono text-cyan-300 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              title="Save to MongoDB Atlas Cloud Database"
            >
              <CloudUpload className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isSavingCloud ? 'Saving...' : 'Save to Cloud DB'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-slate-700 text-xs font-mono text-slate-300 transition-all shadow-sm cursor-pointer"
              title="Copy text summary for WhatsApp or Email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-slate-700 text-xs font-mono text-cyan-300 transition-all shadow-sm cursor-pointer"
              title="Download backup in JSON format"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            {/* Direct High-Resolution PDF Download Button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all cursor-pointer disabled:opacity-50"
              title="Download pristine high-resolution PDF document directly"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
              ) : (
                <FileDown className="w-4 h-4 text-cyan-200" />
              )}
              <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            {/* Browser Print / System PDF Dialog */}
            <button
              type="button"
              onClick={handlePrintPDF}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium text-xs transition-all cursor-pointer shadow-sm"
              title="Open System Print / Save as PDF dialog"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Print / System PDF</span>
            </button>
          </div>
        </div>

        {/* Cloud Save Notification */}
        {saveSuccessMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 no-print">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

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
          <div className="quotation-sheet-col lg:col-span-7">
            <div className="quotation-sticky-wrap sticky top-24 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 px-1 no-print">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Official Proposal Sheet (A4 Dimensions)
                </span>
                
                {/* Document Sheet Theme Toggle */}
                <div className="flex items-center gap-1 bg-[#0A1024] p-1 rounded-xl border border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => setSheetTheme('light')}
                    className={`px-3 py-1 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                      sheetTheme === 'light'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Executive White (PDF Match)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSheetTheme('dark')}
                    className={`px-3 py-1 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                      sheetTheme === 'dark'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Studio Dark
                  </button>
                </div>
              </div>

              {/* The Formal Document Container (Target of Print / PDF Download) */}
              <div
                id="quotation-document"
                className={`transition-colors duration-200 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-7 relative overflow-hidden ${
                  sheetTheme === 'light'
                    ? 'bg-white text-slate-900 border border-slate-200/90 shadow-slate-950/20'
                    : 'bg-[#0A1024] text-white border border-blue-500/30'
                }`}
              >
                {/* Visual Header Glow (only in dark mode, hidden in print) */}
                {sheetTheme === 'dark' && (
                  <div className="absolute top-0 right-0 w-80 h-40 bg-blue-600/10 blur-[90px] pointer-events-none no-print" />
                )}

                {/* 1. DOCUMENT TOP HEADER WITH LOGO & IDENTIFIERS */}
                <div
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b print-break-inside-avoid ${
                    sheetTheme === 'light' ? 'border-slate-200' : 'border-slate-800'
                  }`}
                >
                  {/* Brand Logo Emblem & Wordmark */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-2xl bg-[#0A1024] border border-blue-500/40 p-2 shadow-md flex items-center justify-center shrink-0">
                      <img
                        src="/favicon.svg"
                        alt="Alpha Encoders Official Emblem"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div
                        className={`font-['Space_Grotesk'] text-2xl font-bold tracking-tight flex items-center gap-1.5 ${
                          sheetTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        <span className={sheetTheme === 'light' ? 'text-slate-900' : 'text-white'}>ALPHA</span>{' '}
                        <span className={sheetTheme === 'light' ? 'text-blue-600 font-extrabold' : 'text-cyan-400 font-extrabold'}>
                          ENCODERS
                        </span>
                      </div>
                      <span
                        className={`text-[10px] tracking-widest uppercase font-mono font-semibold block ${
                          sheetTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        Digital Engineering & Research Studio
                      </span>
                      <span
                        className={`text-[10px] font-mono font-medium ${
                          sheetTheme === 'light' ? 'text-blue-600' : 'text-cyan-400'
                        }`}
                      >
                        Available for Q1 Projects • Verified Deployments
                      </span>
                    </div>
                  </div>

                  {/* Document Type & Reference */}
                  <div className="text-left sm:text-right font-mono space-y-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        sheetTheme === 'light'
                          ? 'bg-blue-50 border border-blue-200 text-blue-700'
                          : 'bg-blue-950/80 border border-blue-500/40 text-cyan-300'
                      }`}
                    >
                      Commercial Quotation
                    </span>
                    <div
                      className={`text-xs font-bold pt-1 ${
                        sheetTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {quoteNumber}
                    </div>
                    <div
                      className={`text-[11px] ${
                        sheetTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Date: {new Date(issueDate).toLocaleDateString()}
                    </div>
                    <div
                      className={`text-[11px] font-semibold ${
                        sheetTheme === 'light' ? 'text-amber-700' : 'text-amber-300'
                      }`}
                    >
                      Valid Through: {new Date(validUntil).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* 2. TWO-COLUMN ADDRESS ROSTER (PREPARED BY & PREPARED FOR) */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs pb-6 border-b print-break-inside-avoid ${
                    sheetTheme === 'light' ? 'border-slate-200' : 'border-slate-800/80'
                  }`}
                >
                  {/* Studio Details */}
                  <div
                    className={`space-y-1.5 p-4 rounded-2xl ${
                      sheetTheme === 'light'
                        ? 'bg-slate-50 border border-slate-200'
                        : 'bg-[#101A31]/40 border border-slate-800/80'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono uppercase font-bold tracking-wider block ${
                        sheetTheme === 'light' ? 'text-blue-700' : 'text-cyan-400'
                      }`}
                    >
                      From: Engineering Studio
                    </span>
                    <div
                      className={`font-bold text-sm font-['Space_Grotesk'] ${
                        sheetTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Alpha Encoders
                    </div>
                    <div className={sheetTheme === 'light' ? 'text-slate-700 font-mono' : 'text-slate-300 font-mono'}>
                      Lead Solutions Architect: K.Kabil
                    </div>
                    <div className={sheetTheme === 'light' ? 'text-slate-600 font-mono' : 'text-slate-400 font-mono'}>
                      Email: kabilk2023@gmail.com
                    </div>
                    <div className={sheetTheme === 'light' ? 'text-slate-600 font-mono' : 'text-slate-400 font-mono'}>
                      Phone: +91 8667452487
                    </div>
                    <div className={sheetTheme === 'light' ? 'text-slate-600 font-mono' : 'text-slate-400 font-mono'}>
                      Web: https://alphaencoders.com
                    </div>
                  </div>

                  {/* Client Details */}
                  <div
                    className={`space-y-1.5 p-4 rounded-2xl ${
                      sheetTheme === 'light'
                        ? 'bg-slate-50 border border-slate-200'
                        : 'bg-[#101A31]/40 border border-slate-800/80'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono uppercase font-bold tracking-wider block ${
                        sheetTheme === 'light' ? 'text-blue-700' : 'text-cyan-400'
                      }`}
                    >
                      Prepared For: Client Partner
                    </span>
                    <div
                      className={`font-bold text-sm font-['Space_Grotesk'] ${
                        sheetTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {clientName}
                    </div>
                    <div className={sheetTheme === 'light' ? 'text-slate-700 font-medium' : 'text-slate-200 font-medium'}>
                      {clientCompany || 'Direct Client Account'}
                    </div>
                    <div className={sheetTheme === 'light' ? 'text-slate-600 font-mono' : 'text-slate-400 font-mono'}>
                      {clientEmail}
                    </div>
                    {clientPhone && (
                      <div className={sheetTheme === 'light' ? 'text-emerald-700 font-mono font-medium' : 'text-emerald-400 font-mono'}>
                        {clientPhone}
                      </div>
                    )}
                    {clientLocation && (
                      <div className={sheetTheme === 'light' ? 'text-slate-600 font-mono' : 'text-slate-400 font-mono'}>
                        {clientLocation}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. PROJECT SCOPE TITLE BANNER */}
                <div
                  className={`p-4 rounded-2xl border print-break-inside-avoid ${
                    sheetTheme === 'light'
                      ? 'bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border-blue-200/80 border-l-4 border-l-blue-600'
                      : 'bg-gradient-to-r from-blue-950/70 to-[#101A31] border-blue-500/30'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono uppercase font-bold block tracking-wider ${
                      sheetTheme === 'light' ? 'text-blue-700' : 'text-cyan-400'
                    }`}
                  >
                    Project Scope of Work
                  </span>
                  <h2
                    className={`font-['Space_Grotesk'] text-base sm:text-lg font-bold mt-0.5 ${
                      sheetTheme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {projectTitle}
                  </h2>
                </div>

                {/* 4. DELIVERABLES & PRICING TABLE */}
                <div
                  className={`overflow-x-auto rounded-2xl border print-break-inside-avoid ${
                    sheetTheme === 'light' ? 'border-slate-200' : 'border-slate-800'
                  }`}
                >
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr
                        className={`font-mono uppercase text-[10px] border-b ${
                          sheetTheme === 'light'
                            ? 'bg-slate-100/80 text-slate-700 border-slate-200'
                            : 'bg-[#101A31] text-slate-300 border-slate-800'
                        }`}
                      >
                        <th className="py-3 px-3 w-8 text-center">#</th>
                        <th className="py-3 px-4">Deliverable / Scope Specification</th>
                        <th className="py-3 px-3 text-center">Qty</th>
                        <th className="py-3 px-4 text-right">Rate</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className={sheetTheme === 'light' ? 'divide-y divide-slate-200' : 'divide-y divide-slate-800/70'}>
                      {lineItems.map((item, index) => (
                        <tr
                          key={item.id}
                          className={
                            sheetTheme === 'light'
                              ? index % 2 === 1
                                ? 'bg-slate-50/70'
                                : 'bg-white'
                              : 'hover:bg-slate-900/30'
                          }
                        >
                          <td
                            className={`py-3.5 px-3 font-mono text-center text-xs ${
                              sheetTheme === 'light' ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            {index + 1}
                          </td>
                          <td className="py-3.5 px-4 space-y-1">
                            <div
                              className={`font-bold text-sm font-['Space_Grotesk'] ${
                                sheetTheme === 'light' ? 'text-slate-900' : 'text-white'
                              }`}
                            >
                              {item.title}
                            </div>
                            <div
                              className={`text-xs leading-relaxed max-w-md ${
                                sheetTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                              }`}
                            >
                              {item.description}
                            </div>
                          </td>
                          <td
                            className={`py-3.5 px-3 font-mono text-center ${
                              sheetTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                            }`}
                          >
                            {item.quantity}
                          </td>
                          <td
                            className={`py-3.5 px-4 font-mono text-right ${
                              sheetTheme === 'light' ? 'text-slate-700 font-medium' : 'text-slate-300'
                            }`}
                          >
                            {currencySymbol}{item.rate.toLocaleString()}
                          </td>
                          <td
                            className={`py-3.5 px-4 font-mono text-right font-bold text-sm ${
                              sheetTheme === 'light' ? 'text-blue-700' : 'text-cyan-300'
                            }`}
                          >
                            {currencySymbol}{(item.quantity * item.rate).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 5. FINANCIAL TOTALS BLOCK */}
                <div className="flex flex-col sm:flex-row justify-end items-end pt-2 print-break-inside-avoid">
                  <div className="w-full sm:w-76 space-y-2 text-xs font-mono">
                    <div
                      className={`flex justify-between pb-1.5 border-b ${
                        sheetTheme === 'light' ? 'text-slate-600 border-slate-200' : 'text-slate-400 border-slate-800/70'
                      }`}
                    >
                      <span>Subtotal:</span>
                      <span className={sheetTheme === 'light' ? 'text-slate-900 font-semibold' : 'text-white font-semibold'}>
                        {currencySymbol}{subtotal.toLocaleString()}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div
                        className={`flex justify-between pb-1.5 border-b ${
                          sheetTheme === 'light'
                            ? 'text-emerald-700 font-medium border-slate-200'
                            : 'text-emerald-400 border-slate-800/70'
                        }`}
                      >
                        <span>Discount ({discountPercent}%):</span>
                        <span>-{currencySymbol}{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    {taxPercent > 0 && (
                      <div
                        className={`flex justify-between pb-1.5 border-b ${
                          sheetTheme === 'light' ? 'text-slate-600 border-slate-200' : 'text-slate-400 border-slate-800/70'
                        }`}
                      >
                        <span>Tax / GST ({taxPercent}%):</span>
                        <span className={sheetTheme === 'light' ? 'text-slate-900' : 'text-white'}>
                          +{currencySymbol}{taxAmount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div
                      className={`flex justify-between items-center p-3.5 rounded-xl border text-sm ${
                        sheetTheme === 'light'
                          ? 'bg-blue-50/90 border-blue-200 text-blue-950 shadow-xs'
                          : 'bg-blue-950/70 border-blue-500/40 text-white'
                      }`}
                    >
                      <span className="font-bold font-['Space_Grotesk']">Grand Total:</span>
                      <span className={`font-bold text-lg ${sheetTheme === 'light' ? 'text-blue-700' : 'text-cyan-300'}`}>
                        {currencySymbol}{grandTotal.toLocaleString()} {currencyCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6. PAYMENT MILESTONE SCHEDULE */}
                <div
                  className={`p-4 rounded-2xl border space-y-3 print-break-inside-avoid ${
                    sheetTheme === 'light'
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#101A31]/50 border border-slate-800'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono uppercase font-bold block tracking-wider ${
                      sheetTheme === 'light' ? 'text-blue-700' : 'text-cyan-400'
                    }`}
                  >
                    Commercial Terms & Payment Milestone Schedule
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div
                      className={`p-3 rounded-xl border ${
                        sheetTheme === 'light'
                          ? 'bg-white border-emerald-200 shadow-xs'
                          : 'bg-[#0A1024] border-slate-800/80'
                      }`}
                    >
                      <div className={sheetTheme === 'light' ? 'font-bold text-emerald-700 text-sm' : 'font-bold text-emerald-400 text-sm'}>
                        50% Inception
                      </div>
                      <div className={sheetTheme === 'light' ? 'text-slate-800 font-semibold text-[11px] mt-0.5' : 'text-slate-300 text-[11px] mt-0.5'}>
                        {currencySymbol}{(grandTotal * 0.5).toLocaleString()} upon contract
                      </div>
                      <div className={sheetTheme === 'light' ? 'text-[10px] text-slate-500 mt-1' : 'text-[10px] text-slate-500 mt-1'}>
                        Architecture, UI & wireframe approval
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        sheetTheme === 'light'
                          ? 'bg-white border-sky-200 shadow-xs'
                          : 'bg-[#0A1024] border-slate-800/80'
                      }`}
                    >
                      <div className={sheetTheme === 'light' ? 'font-bold text-sky-700 text-sm' : 'font-bold text-cyan-300 text-sm'}>
                        30% Staging
                      </div>
                      <div className={sheetTheme === 'light' ? 'text-slate-800 font-semibold text-[11px] mt-0.5' : 'text-slate-300 text-[11px] mt-0.5'}>
                        {currencySymbol}{(grandTotal * 0.3).toLocaleString()} upon preview
                      </div>
                      <div className={sheetTheme === 'light' ? 'text-[10px] text-slate-500 mt-1' : 'text-[10px] text-slate-500 mt-1'}>
                        Core feature completion & review
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        sheetTheme === 'light'
                          ? 'bg-white border-indigo-200 shadow-xs'
                          : 'bg-[#0A1024] border-slate-800/80'
                      }`}
                    >
                      <div className={sheetTheme === 'light' ? 'font-bold text-indigo-700 text-sm' : 'font-bold text-blue-400 text-sm'}>
                        20% Handover
                      </div>
                      <div className={sheetTheme === 'light' ? 'text-slate-800 font-semibold text-[11px] mt-0.5' : 'text-slate-300 text-[11px] mt-0.5'}>
                        {currencySymbol}{(grandTotal * 0.2).toLocaleString()} upon deployment
                      </div>
                      <div className={sheetTheme === 'light' ? 'text-[10px] text-slate-500 mt-1' : 'text-[10px] text-slate-500 mt-1'}>
                        Production launch, DNS & code transfer
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7. INTELLECTUAL PROPERTY & TERMS */}
                <div
                  className={`text-xs space-y-2 border-t pt-5 print-break-inside-avoid ${
                    sheetTheme === 'light' ? 'text-slate-600 border-slate-200' : 'text-slate-400 border-slate-800'
                  }`}
                >
                  <span
                    className={`font-bold font-['Space_Grotesk'] text-sm block ${
                      sheetTheme === 'light' ? 'text-slate-900' : 'text-slate-300'
                    }`}
                  >
                    Ownership & Engagement Terms
                  </span>
                  <div
                    className={`p-3.5 rounded-xl border text-[11px] leading-relaxed whitespace-pre-wrap font-mono ${
                      sheetTheme === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-700'
                        : 'bg-[#101A31]/40 border-slate-800 text-slate-300'
                    }`}
                  >
                    {notes}
                  </div>
                </div>

                {/* 8. SIGNATURE AND ACCEPTANCE BLOCK */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-8 pt-5 border-t text-xs print-break-inside-avoid ${
                    sheetTheme === 'light' ? 'border-slate-200' : 'border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <span
                      className={`text-[10px] font-mono uppercase block font-semibold ${
                        sheetTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Authorized Studio Sign-off
                    </span>
                    <div
                      className={`pt-7 border-b-2 w-52 relative ${
                        sheetTheme === 'light' ? 'border-slate-300' : 'border-slate-700/80'
                      }`}
                    >
                      <span
                        className={`absolute bottom-1 left-0 font-['Space_Grotesk'] font-bold tracking-wider ${
                          sheetTheme === 'light' ? 'text-blue-700' : 'text-cyan-300'
                        }`}
                      >
                        K.Kabil
                      </span>
                    </div>
                    <div
                      className={`font-mono text-[11px] ${
                        sheetTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      K.Kabil • Founder & Lead Solutions Architect
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span
                      className={`text-[10px] font-mono uppercase block font-semibold ${
                        sheetTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Client Acceptance Sign-off
                    </span>
                    <div
                      className={`pt-7 border-b-2 w-52 ${
                        sheetTheme === 'light' ? 'border-slate-300' : 'border-slate-700/80'
                      }`}
                    ></div>
                    <div
                      className={`font-mono text-[11px] ${
                        sheetTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {clientName} • {clientCompany || 'Authorized Representative'}
                    </div>
                  </div>
                </div>

                {/* 9. OFFICIAL DOCUMENT VERIFICATION FOOTER */}
                <div
                  className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono gap-2 print-break-inside-avoid ${
                    sheetTheme === 'light'
                      ? 'border-slate-200 text-slate-500'
                      : 'border-slate-800 text-slate-500'
                  }`}
                >
                  <span>Alpha Encoders • Proposal Ref: {quoteNumber}</span>
                  <span>Confidential Commercial Proposal • Valid for 30 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
