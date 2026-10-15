import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { BorderBeam } from '../../components/reactbits/BorderBeam';
import { Magnet } from '../../components/reactbits/Magnet';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('ae_admin_token', data.token);
        localStorage.setItem('ae_admin_user', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setError('Unable to communicate with the authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@alphaencoders.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
          </Link>
        </div>

        <div className="relative rounded-3xl bg-[#0A1024] border border-blue-500/30 p-8 shadow-2xl overflow-hidden">
          <BorderBeam size={240} duration={10} colorFrom="#2563FF" colorTo="#22D3EE" />

          {/* Logo & Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#050816] border border-blue-500/40 p-2.5 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20">
              <img
                src="/alpha-encoders-icon-dark.png"
                alt="Alpha Encoders"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
                Studio Command Center
              </h1>
              <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mt-1">
                Alpha Encoders Administration
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alphaencoders.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050816] text-white border border-slate-800 focus:border-blue-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Secret Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050816] text-white border border-slate-800 focus:border-blue-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <Magnet magnetStrength={0.15} className="w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white font-semibold text-sm shadow-xl shadow-blue-600/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Enter Studio Console</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </Magnet>
            </div>
          </form>

          {/* Quick Demo Credentials Fill */}
          <div className="mt-6 pt-6 border-t border-slate-850 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline font-mono inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Auto-fill Administrator Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
