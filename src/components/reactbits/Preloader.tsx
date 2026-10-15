import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING STUDIO CORE...');

  useEffect(() => {
    // Check if user already saw the loader in this tab session
    const hasLoaded = sessionStorage.getItem('ae_loaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('ae_loaded', 'true');
          }, 300);
          return 100;
        }

        if (prev === 30) setStatusText('CALIBRATING DESIGN SYSTEM...');
        if (prev === 65) setStatusText('ESTABLISHING REACTBITS MOTION...');
        if (prev === 90) setStatusText('EXPERIENCE READY');

        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050816] flex flex-col items-center justify-center p-4 overflow-hidden select-none"
        >
          {/* Ambient Radial Illumination */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none animate-pulse-glow" />

          {/* Genuine Alpha Encoders Emblem Visual with Orbital Ring */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Pulsing orbital rings */}
            <div className="absolute w-36 h-36 rounded-full border border-blue-500/20 border-dashed animate-[spin_10s_linear_infinite]" />
            <div className="absolute w-44 h-44 rounded-full border border-cyan-400/25 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Glowing Logo Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-24 h-24 rounded-2xl bg-[#0A1024] border border-blue-500/50 p-3 shadow-[0_0_35px_rgba(37,99,255,0.4)] flex items-center justify-center backdrop-blur-xl"
            >
              <img
                src="/alpha-encoders-icon-dark.png"
                alt="Alpha Encoders"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              />
            </motion.div>
          </div>

          {/* Wordmark */}
          <div className="text-center mb-6">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
              ALPHA <span className="text-cyan-400">ENCODERS</span>
            </h2>
            <span className="text-[10px] tracking-[0.25em] text-slate-400 font-mono uppercase block mt-0.5">
              DIGITAL ENGINEERING STUDIO
            </span>
          </div>

          {/* High-Tech Progress Meter */}
          <div className="w-64 max-w-full space-y-2">
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2563FF] via-[#22D3EE] to-[#3B82F6]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-cyan-400">{statusText}</span>
              <span className="text-slate-400 font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
