import React, { useEffect, useRef, useState } from 'react';
import { X, AlertCircle, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BorderBeam } from '../reactbits/BorderBeam';

export const GoogleAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, googleClientId, setGoogleClientId } = useAuth();
  const [clientIdInput, setClientIdInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const gisButtonRef = useRef<HTMLDivElement>(null);

  // Initialize official Google Identity Services
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const win = window as any;
    if (googleClientId && win.google?.accounts?.id && gisButtonRef.current) {
      try {
        win.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            if (response.credential) {
              setIsLoading(true);
              setErrorMessage(null);
              const res = await loginWithGoogle({
                email: '',
                credential: response.credential,
              });
              setIsLoading(false);
              if (!res.success) {
                setErrorMessage(res.message || 'Google authentication failed.');
              }
            }
          },
        });

        gisButtonRef.current.innerHTML = '';
        win.google.accounts.id.renderButton(gisButtonRef.current, {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
          width: 280,
          logo_alignment: 'left',
        });

        // Trigger Google One-Tap account chooser prompt
        win.google.accounts.id.prompt();
      } catch (err: any) {
        console.warn('Google Identity Services notice:', err);
      }
    }
  }, [isAuthModalOpen, googleClientId, loginWithGoogle]);

  if (!isAuthModalOpen) return null;

  const handleSaveClientId = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientIdInput.trim()) {
      setErrorMessage('Please enter your Google OAuth Client ID.');
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    await setGoogleClientId(clientIdInput.trim());
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#0A1024] border border-blue-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <BorderBeam size={240} duration={8} colorFrom="#2563FF" colorTo="#22D3EE" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Google Branding Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#050816] border border-blue-500/40 p-3 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20">
            {/* Google Logo SVG */}
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
            <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
              to continue to Alpha Encoders
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-300 flex items-start gap-2 mb-5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Authentic Official Google Button */}
        {googleClientId ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <div ref={gisButtonRef} className="min-h-[46px] flex items-center justify-center w-full" />
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating with Google...</span>
              </div>
            )}
          </div>
        ) : (
          /* Client ID Input prompt if not configured yet */
          <div className="py-2 space-y-4">
            <div className="p-4 rounded-2xl bg-[#050816] border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
                <KeyRound className="w-4 h-4" />
                <span>Google OAuth Client ID</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Paste your Google OAuth <strong>Client ID</strong> from Google Cloud Console (ends with <code className="text-cyan-300">.apps.googleusercontent.com</code>) to activate the official Google sign-in:
              </p>
            </div>

            <form onSubmit={handleSaveClientId} className="space-y-3">
              <input
                type="text"
                required
                placeholder="1234567890-xxx.apps.googleusercontent.com"
                value={clientIdInput}
                onChange={(e) => setClientIdInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050816] border border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-500 font-mono focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Connect Google Client ID</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Standard Google OAuth Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            To continue, Google will share your name, email address, and profile picture with Alpha Encoders.
          </p>
        </div>
      </div>
    </div>
  );
};
