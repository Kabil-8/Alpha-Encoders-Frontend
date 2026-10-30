import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  UserCheck,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  FilePlus2,
} from 'lucide-react';
import { Magnet } from '../reactbits/Magnet';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, openAuthModal, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (userDropdownOpen) setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, userDropdownOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Process', path: '/process' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050816]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-2.5'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand with Magnet effect */}
          <Magnet magnetStrength={0.2}>
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF] rounded-lg p-1"
              aria-label="Alpha Encoders Home"
            >
              <div className="h-10 w-10 rounded-xl bg-[#0A1024] border border-blue-500/30 flex items-center justify-center p-1.5 shadow-sm shadow-blue-500/20 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all overflow-hidden">
                <img
                  src="/alpha-encoders-icon-dark.png"
                  alt="Alpha Encoders Emblem"
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  ALPHA <span className="text-[#22D3EE] font-semibold">ENCODERS</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono font-medium -mt-1 hidden sm:block">
                  DIGITAL STUDIO
                </span>
              </div>
            </Link>
          </Magnet>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0A1024]/70 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-white bg-[#2563FF]/20 border border-blue-500/40 shadow-sm shadow-blue-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action: Google Auth & Start Project CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Google Login / Authenticated Capsule */}
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={openAuthModal}
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0A1024] hover:bg-[#101A31] border border-blue-500/40 hover:border-cyan-400 text-xs font-semibold text-white shadow-md shadow-blue-500/10 hover:shadow-cyan-500/20 transition-all duration-200"
              >
                {/* Official Google G Logo */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>Google Sign In</span>
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0A1024] border border-blue-500/40 hover:border-cyan-400 text-xs text-white transition-all shadow-md shadow-blue-500/10"
                >
                  {/* User Avatar */}
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.fullName || 'User'}
                      className="w-6 h-6 rounded-lg object-cover border border-cyan-400/50"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-[11px] text-white">
                      {(user?.fullName || user?.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="font-semibold text-xs max-w-[110px] truncate text-slate-200">
                    {user?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || 'User'}
                  </span>

                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                      isAdmin
                        ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                        : 'bg-blue-950/80 text-cyan-300 border border-blue-500/40'
                    }`}
                  >
                    {isAdmin ? 'Admin' : 'Client'}
                  </span>

                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0A1024] border border-blue-500/40 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    {/* User Info Header */}
                    <div className="p-2.5 rounded-xl bg-[#101A31] border border-slate-800 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-white truncate">
                          {user?.fullName || user?.name || 'Authenticated User'}
                        </span>
                        {isAdmin ? (
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 truncate">{user?.email}</p>
                    </div>

                    <div className="space-y-1">
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-purple-300 hover:text-white hover:bg-purple-950/50 border border-purple-500/30 transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4 text-purple-400" />
                          <span>Admin Command Center</span>
                        </Link>
                      )}

                      <Link
                        to="/contact"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                      >
                        <FilePlus2 className="w-4 h-4 text-cyan-400" />
                        <span>Enter Project Details</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-300 hover:text-white hover:bg-rose-950/50 transition-all"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Start a Project CTA Button */}
            <Magnet magnetStrength={0.3}>
              <Link
                to="/contact"
                className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white text-xs font-semibold shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 hover:brightness-110 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Start a Project
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </Magnet>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#0A1024] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#050816]/98 border-b border-slate-800 shadow-2xl backdrop-blur-2xl p-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            {/* Mobile Google Auth Section */}
            <div className="mb-3 p-3 rounded-2xl bg-[#0A1024] border border-blue-500/30">
              {!isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl bg-[#101A31] border border-blue-500/40 text-xs font-semibold text-white shadow-md"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  <span>Sign In with Google</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                        {(user?.fullName || user?.email || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {user?.fullName || user?.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        isAdmin ? 'bg-purple-950 text-purple-300' : 'bg-blue-950 text-cyan-300'
                      }`}
                    >
                      {isAdmin ? 'Admin' : 'Client'}
                    </span>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-xs text-purple-300 font-semibold"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Admin Command Center</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-1.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-300"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-white bg-[#2563FF]/20 border border-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <Sparkles className="w-4 h-4 text-cyan-400" />}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-3">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#2563FF] to-[#3B82F6] text-white font-semibold text-sm shadow-lg shadow-blue-600/30"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
