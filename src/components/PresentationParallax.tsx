import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { About } from './About';
import { Hero } from './Hero';

export const PresentationParallax: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(() =>
    window.matchMedia('(max-width: 63.999rem), (max-height: 43.999rem)').matches,
  );
  const [aboutIsActive, setAboutIsActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroPanelRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutPanelRef,
    offset: ['start end', 'end start'],
  });

  const heroX = useTransform(scrollYProgress, [0, 0.28, 0.66, 1], ['0%', '0%', '-100%', '-100%']);
  const aboutX = useTransform(scrollYProgress, [0, 0.28, 0.66, 1], ['100%', '100%', '0%', '0%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28, 0.66, 1], [1, 1, 0, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0, 0.28, 0.66, 1], [0, 0, 1, 1]);
  const heroCompactX = useTransform(heroProgress, [0, 0.7, 1], ['0%', '0%', '-100%']);
  const heroCompactOpacity = useTransform(heroProgress, [0, 0.7, 1], [1, 1, 0]);
  const aboutCompactX = useTransform(aboutProgress, [0, 0.45, 1], ['100%', '0%', '0%']);
  const aboutCompactOpacity = useTransform(aboutProgress, [0, 0.45, 1], [0, 1, 1]);

  React.useEffect(() => {
    const compactViewport = window.matchMedia('(max-width: 63.999rem), (max-height: 43.999rem)');
    const updateViewport = () => setIsCompact(compactViewport.matches);
    compactViewport.addEventListener('change', updateViewport);
    return () => compactViewport.removeEventListener('change', updateViewport);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIsActive = progress >= 0.47;
    setAboutIsActive((current) => current === nextIsActive ? current : nextIsActive);
  });

  return (
    <div ref={trackRef} className="presentation-parallax-track">
      <div className="presentation-parallax-stage">
        <motion.div
          ref={heroPanelRef}
          className="presentation-parallax-panel presentation-parallax-hero"
          style={{
            x: isCompact ? heroCompactX : heroX,
            opacity: isCompact ? heroCompactOpacity : heroOpacity,
            pointerEvents: isCompact || !aboutIsActive ? 'auto' : 'none',
          }}
        >
          <Hero />
        </motion.div>

        <span id="about" className="presentation-about-anchor" aria-hidden="true" />

        <motion.div
          ref={aboutPanelRef}
          className="presentation-parallax-panel presentation-parallax-about"
          style={{
            x: isCompact ? aboutCompactX : aboutX,
            opacity: isCompact ? aboutCompactOpacity : aboutOpacity,
            pointerEvents: isCompact || aboutIsActive ? 'auto' : 'none',
          }}
        >
          <About />
        </motion.div>
      </div>
    </div>
  );
};
