import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2.5;
      });
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        clearInterval(timer);
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-[#07080B] text-[#F4F2EC] p-6 md:p-12 select-none overflow-hidden"
      >
        {/* Subtle background ambient mesh */}
        <div className="absolute inset-0 bg-radial from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

        {/* Top bar: location, role & skip action */}
        <div className="relative z-10 flex items-center justify-between text-xs tracking-widest uppercase text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#D4AF37]">01 / 01</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Abidjan, Côte d'Ivoire</span>
          </div>
          <button
            onClick={onComplete}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#D4AF37]/50 text-neutral-300 hover:text-[#D4AF37] transition-colors cursor-pointer text-xs"
          >
            <span>Passer l'introduction</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Center: Monumental Editorial Identity */}
        <div className="relative z-10 max-w-5xl mx-auto my-auto text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-mono mb-4"
          >
            Portfolio Personnel
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-tight text-[#F4F2EC] leading-[1.05]"
          >
            Compaoré Abdoul Aziz
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm md:text-lg text-neutral-300 font-light"
          >
            <span className="tracking-wide">Full-Stack Developer</span>
            <span className="text-[#D4AF37]">×</span>
            <span className="tracking-wide">AI Builder</span>
            <span className="text-[#D4AF37]">×</span>
            <span className="tracking-wide">Agitel Formation</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-6 text-xs md:text-sm text-neutral-400 font-serif italic max-w-xl mx-auto leading-relaxed"
          >
            "Building digital experiences. Engineering intelligent solutions."
          </motion.p>
        </div>

        {/* Bottom bar: Cinematic Loading progression */}
        <div className="relative z-10 max-w-xl mx-auto w-full flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>CHARGEMENT DE L'EXPÉRIENCE</span>
            <span>{Math.min(100, Math.round(progress))}%</span>
          </div>
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37]/50 via-[#D4AF37] to-[#F4F2EC]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
