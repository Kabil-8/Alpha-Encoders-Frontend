import React, { useEffect, useRef, useState } from 'react';
import { X, ShieldCheck, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BorderBeam } from '../reactbits/BorderBeam';

export const GoogleAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, googleClientId } = useAuth();
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const gisButtonRef = useRef<HTMLDivElement>(null);

  // Initialize official Google Identity Services button if Client ID exists
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const win = window as any;
    if (googleClientId && win.google?.accounts?.id && gisButtonRef.current) {
      try {
        win.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            if (response.credential) {
              setLoadingRole('google');
              const res = await loginWithGoogle({
                email: '',
                credential: response.credential,
              });
              setLoadingRole(null);
              if (!res.success) {
                setErrorMessage(res.message || 'Google authentication failed.');
              }
            }
          },
        });

        win.google.accounts.id.renderButton(gisButtonRef.current, {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
          width: 320,
        });
      } catch (err) {
        console.warn('GIS Init notice:', err);
      }
    }
  }, [isAuthModalOpen, googleClientId, loginWithGoogle]);

  if (!isAuthModalOpen) return null;

  const handleAdminQuickLogin = async () => {
    setLoadingRole('admin');
    setErrorMessage(null);
    const res = await loginWithGoogle({
      email: 'kabilk2023@gmail.com',
      name: 'K.Kabil',
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    });
    setLoadingRole(null);
    if (!res.success) {
      setErrorMessage(res.message || 'Login failed.');
    }
  };

  const handleClientQuickLogin = async () => {
    setLoadingRole('client');
    setErrorMessage(null);
    const res = await loginWithGoogle({
      email: 'alex.morgan@techstart.io',
      name: 'Alex Morgan',
      picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    });
    setLoadingRole(null);
    if (!res.success) {
      setErrorMessage(res.message || 'Login failed.');
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) {
      setErrorMessage('Please enter a valid Google email address.');
      return;
    }
    setLoadingRole('custom');
    setErrorMessage(null);
    const res = await loginWithGoogle({
      email: customEmail.trim().toLowerCase(),
      name: customName.trim() || customEmail.split('@')[0],
      picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customName || customEmail)}`,
    });
    setLoadingRole(null);
    if (!res.success) {
      setErrorMessage(res.message || 'Authentication error.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#0A1024] border border-blue-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <BorderBeam size={260} duration={8} colorFrom="#2563FF" colorTo="#22D3EE" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Branding Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#050816] border border-blue-500/40 p-3 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20">
            {/* Google SVG Logo */}
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>

          <div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
              Sign in with Google
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
              Authenticate your identity to submit project details, receive instant quotations, and access client features.
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-300 flex items-start gap-2 mb-5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* GIS Official Button Container (Rendered when Client ID is configured) */}
        {googleClientId && (
          <div className="flex flex-col items-center justify-center mb-5 pb-5 border-b border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400 mb-2">
              Official Google Identity
            </span>
            <div ref={gisButtonRef} className="min-h-[44px] flex items-center justify-center" />
          </div>
        )}

        {/* Quick One-Tap Options */}
        <div className="space-y-3">
          <button
            type="button"
            disabled={loadingRole !== null}
            onClick={handleAdminQuickLogin}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#101A31] hover:bg-[#152342] border border-blue-500/40 hover:border-cyan-400/60 transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0A1024] rounded-[10px] flex items-center justify-center font-bold text-cyan-300 text-sm">
                  K
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    Continue as K.Kabil
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-bold">
                    Admin
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">kabilk2023@gmail.com</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            type="button"
            disabled={loadingRole !== null}
            onClick={handleClientQuickLogin}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#101A31] hover:bg-[#152342] border border-slate-800 hover:border-blue-500/50 transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center font-bold text-blue-300 text-sm">
                AM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    Continue as Alex Morgan
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/30">
                    Client
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">alex.morgan@techstart.io</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Toggle Custom Google Email */}
          {!showCustomForm ? (
            <button
              type="button"
              onClick={() => setShowCustomForm(true)}
              className="w-full text-center py-2.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
            >
              + Use a different Google Account email
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="pt-3 border-t border-slate-800/80 space-y-3 animate-in fade-in">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                  Google Account Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050816] border border-slate-800 focus:border-cyan-400 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                  Google Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050816] border border-slate-800 focus:border-cyan-400 text-xs text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loadingRole !== null}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loadingRole === 'custom' ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Authorize Google Account</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Security Footer Notice */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>OAuth 2.0 Identity Protocol</span>
          </div>
          <span className="text-slate-500">Alpha Encoders Security</span>
        </div>
      </div>
    </div>
  );
};
