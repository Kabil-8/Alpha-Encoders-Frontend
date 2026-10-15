import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  project: string;
  quote: string;
  rating: number;
  metric: string;
  avatarColor: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    clientName: 'Anya Sharma',
    role: 'Founder & Creative Director',
    company: 'TheCustomNest Studio',
    project: 'E-Commerce Storefront & Cart Drawer',
    quote:
      'Alpha Encoders transformed our artisan crochet brand. The custom high-speed cart drawer and responsive mobile catalog jumped our checkout completion rate by over 40%. The site loads instantly even on mobile 4G.',
    rating: 5,
    metric: '+42% Checkout Conversion',
    avatarColor: 'from-amber-400 to-rose-500'
  },
  {
    id: 't-2',
    clientName: 'Dr. Vikram Malhotra',
    role: 'Academic Director & Dept Head',
    company: 'EduSphere Academic Network',
    project: 'Higher-Ed Campus Suite & Research Symposium',
    quote:
      'The unified portal engineered by Alpha Encoders brought automated student attendance, fee management, and departmental research archives into one reactive interface. It handled our annual enrollment surge with zero latency.',
    rating: 5,
    metric: '99.9% Uptime Under Peak Load',
    avatarColor: 'from-blue-500 to-cyan-400'
  },
  {
    id: 't-3',
    clientName: 'Kavita Sundaram',
    role: 'Lead Platform Educator',
    company: 'JavaLearn Academy',
    project: 'Interactive Code Drills & Course Visualizer',
    quote:
      'The step-by-step algorithm visualizer and instant drill sandboxes made complex computer science concepts intuitive for our students. The dark-tech UI keeps learners engaged for hours.',
    rating: 5,
    metric: '98/100 Lighthouse Benchmark',
    avatarColor: 'from-emerald-400 to-teal-500'
  },
  {
    id: 't-4',
    clientName: 'Rohan Deshmukh',
    role: 'Principal Research Scientist',
    company: 'Computing Paradigm Symposium',
    project: 'IEEE / ACM LaTeX Research Manuscripts',
    quote:
      'Working with Alpha Encoders on our empirical benchmark paper was seamless. The mathematical proofs, LaTeX typography, and high-DPI vector visualizations met strict conference camera-ready standards on the first submission.',
    rating: 5,
    metric: '100% Peer-Review Compliance',
    avatarColor: 'from-purple-500 to-indigo-500'
  }
];

export const TestimonialsSlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, index]);

  const item = TESTIMONIALS[index];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.97
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: 'easeOut' as const }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.25, ease: 'easeIn' as const }
    })
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative p-6 sm:p-10 rounded-3xl bg-[#0A1024] border border-blue-500/30 overflow-hidden shadow-2xl">
        {/* Glow & Quote Icon Watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[80px] pointer-events-none" />
        <Quote className="absolute top-6 right-8 w-24 h-24 text-blue-500/10 pointer-events-none rotate-12" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-amber-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </span>
              <span className="text-xs font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/30">
                {item.metric}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Review"
                className="p-2 rounded-xl bg-[#101A31] hover:bg-blue-900/40 border border-slate-800 text-slate-300 hover:text-white transition-all transform active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Review"
                className="p-2 rounded-xl bg-[#101A31] hover:bg-blue-900/40 border border-slate-800 text-slate-300 hover:text-white transition-all transform active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Testimonial Animated Body */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={item.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              <p className="font-['Space_Grotesk'] text-base sm:text-xl text-slate-100 font-medium leading-relaxed italic">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.avatarColor} flex items-center justify-center font-bold text-white text-base shadow-lg shadow-blue-900/30 shrink-0 font-['Space_Grotesk']`}
                >
                  {item.clientName[0]}
                </div>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <span>{item.clientName}</span>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {item.role} • <span className="text-cyan-300 font-semibold">{item.company}</span>
                  </div>
                  <div className="text-[11px] text-blue-400/90 font-mono mt-0.5">
                    Engagement: {item.project}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            aria-label={`Show testimonial from ${t.clientName}`}
            className={`transition-all duration-300 rounded-full ${
              i === index ? 'w-8 h-2.5 bg-cyan-400' : 'w-2.5 h-2.5 bg-slate-800 hover:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
