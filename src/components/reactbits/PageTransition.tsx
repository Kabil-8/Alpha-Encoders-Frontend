import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ultra-snappy sub-200ms page progress indication
    setIsLoading(true);
    setLoadingProgress(40);

    const timer1 = setTimeout(() => setLoadingProgress(85), 60);
    const timer2 = setTimeout(() => setLoadingProgress(100), 140);
    const timer3 = setTimeout(() => {
      setIsLoading(false);
      setLoadingProgress(0);
    }, 240);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Top Loading Progress Bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-transparent pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-150 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      )}

      {/* Silky-smooth Route Viewport Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
