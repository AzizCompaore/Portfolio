import React, { useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-[90vh] pt-32 md:pt-36 pb-16 flex flex-col justify-center bg-[#FFF8F1] overflow-hidden">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-16 right-12 w-[550px] h-[550px] bg-[#F9A826]/12 blur-[140px] rounded-full pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#F9A826]/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Typographic Presentation with Motion */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Live Availability Floating Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm text-xs font-semibold text-neutral-800 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Disponible pour nouveaux projets</span>
            </div>

            {/* Monumental Name */}
            <h1 className="text-[clamp(2.5rem,12vw,3rem)] sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#141416] tracking-tight leading-[0.95] mb-5 font-sans">
              Aziz <br />
              <span className="text-[#141416] hover:text-[#F9A826] transition-colors duration-300">
                Compaoré
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl font-medium text-neutral-600 mb-8 max-w-xl leading-relaxed">
              <strong className="text-[#141416]">Développeur Full-Stack &amp; créateur IA</strong> basé à Abidjan.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-neutral-50 border border-neutral-300 text-[#141416] rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 group cursor-pointer"
              >
                <span>Voir mes projets</span>
                <ArrowDown className="w-4 h-4 text-[#141416] group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Signature Perez Organic Graphic Shape with 3D Tilt Motion */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[380px] sm:max-w-[420px] transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* Luxury Neutral Frame with Soft Shadow */}
              <div className="absolute inset-0 rounded-[60px] sm:rounded-[80px] bg-black/15 blur-2xl -z-10 transform scale-105" />

              {/* The iconic diagonal organic egg/oval shape in luxury neutral styling */}
              <div className="relative aspect-[4/5] rounded-[60px] sm:rounded-[80px] overflow-hidden bg-[#18181B] shadow-2xl group border-4 border-white/90">
                
                {/* User Authentic Photo — 100% Natural Color, No Filter, No Tint */}
                <img
                  src={PERSONAL_INFO.images.heroPortrait}
                  alt="Portrait de Compaoré Abdoul Aziz, Full-Stack Developer & AI Builder"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle bottom gradient to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Handwritten signature overlay (Caveat cursive font) */}
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none select-none">
                  <span
                    className="font-handwriting text-5xl sm:text-6xl text-white font-bold tracking-wider drop-shadow-lg block -rotate-6 transition-transform duration-300 group-hover:scale-105"
                    style={{ fontFamily: 'var(--font-handwriting)' }}
                  >
                    Aziz Compaore
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
