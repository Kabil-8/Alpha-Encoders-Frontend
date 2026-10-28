import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    'INITIALIZING...',
    'LOADING ASSETS...',
    'ALMOST READY...',
    'WELCOME',
  ];

  useEffect(() => {
    // Only show preloader once per browser session
    if (sessionStorage.getItem('ae_loaded')) {
      setLoading(false);
      return;
    }

    let current = 0;
    const tick = setInterval(() => {
      current += Math.random() * 4 + 2; // random increment 2–6
      if (current >= 100) {
        current = 100;
        clearInterval(tick);
        setProgress(100);
        setPhase(3);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('ae_loaded', 'true');
        }, 600);
        return;
      }
      setProgress(Math.floor(current));
      if (current >= 65) setPhase(2);
      else if (current >= 30) setPhase(1);
    }, 35);

    return () => clearInterval(tick);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#050816' }}
          aria-label="Loading Alpha Encoders"
          role="status"
        >
          {/* ── Background layers ─────────────────────────────── */}

          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Ambient blue glow — top-center */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(37,99,255,0.18) 0%, transparent 70%)',
            }}
          />

          {/* Ambient cyan glow — bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.1) 0%, transparent 70%)',
            }}
          />

          {/* ── Logo block ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6 mb-12"
          >
            {/* Icon + outer rings */}
            <div className="relative flex items-center justify-center">
              {/* Outer ring — slow spin */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                className="absolute w-[130px] h-[130px] rounded-full"
                style={{
                  border: '1px dashed rgba(37,99,255,0.25)',
                }}
              />
              {/* Inner ring — counter-spin */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
                className="absolute w-[100px] h-[100px] rounded-full"
                style={{
                  border: '1px solid rgba(34,211,238,0.18)',
                }}
              />

              {/* Icon container */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(37,99,255,0.3), inset 0 0 12px rgba(34,211,238,0.08)',
                    '0 0 40px rgba(37,99,255,0.55), inset 0 0 20px rgba(34,211,238,0.18)',
                    '0 0 20px rgba(37,99,255,0.3), inset 0 0 12px rgba(34,211,238,0.08)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
                style={{
                  background: '#0A1024',
                  border: '1px solid rgba(37,99,255,0.45)',
                }}
              >
                <img
                  src="/alpha-encoders-icon-dark.png"
                  alt="Alpha Encoders icon"
                  className="w-[52px] h-[52px] object-contain"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.5))' }}
                />
              </motion.div>
            </div>

            {/* Full logo wordmark */}
            <div className="flex flex-col items-center gap-1.5">
              <img
                src="/alpha-encoders-logo-dark.png"
                alt="Alpha Encoders"
                className="h-9 object-contain"
                style={{ filter: 'drop-shadow(0 0 10px rgba(37,99,255,0.35))' }}
              />
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: '#A5B4CF' }}
              >
                Digital Engineering Studio
              </span>
            </div>
          </motion.div>

          {/* ── Progress bar ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="flex flex-col items-center gap-3 w-72 max-w-[90vw]"
          >
            {/* Track */}
            <div
              className="w-full h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(148,163,184,0.1)', border: '0 none' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #2563FF 0%, #22D3EE 100%)',
                  boxShadow: '0 0 8px rgba(34,211,238,0.6)',
                  transition: 'width 0.12s linear',
                }}
              />
            </div>

            {/* Status row */}
            <div className="flex items-center justify-between w-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-[11px] tracking-[0.15em]"
                  style={{ color: '#22D3EE' }}
                >
                  {phases[phase]}
                </motion.span>
              </AnimatePresence>
              <span
                className="font-mono text-[11px] tabular-nums"
                style={{ color: '#64748B' }}
              >
                {progress}%
              </span>
            </div>
          </motion.div>

          {/* ── Corner decorations ────────────────────────────── */}
          {(['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'] as const).map(
            (pos) => (
              <div
                key={pos}
                className={`absolute ${pos} w-5 h-5 pointer-events-none`}
                style={{
                  borderTop: pos.includes('top') ? '1px solid rgba(37,99,255,0.3)' : 'none',
                  borderBottom: pos.includes('bottom') ? '1px solid rgba(37,99,255,0.3)' : 'none',
                  borderLeft: pos.includes('left') ? '1px solid rgba(37,99,255,0.3)' : 'none',
                  borderRight: pos.includes('right') ? '1px solid rgba(37,99,255,0.3)' : 'none',
                }}
              />
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
