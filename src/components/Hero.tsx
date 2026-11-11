import React, { useState, useRef } from 'react';
import { ArrowUpRight, ArrowDown, Sparkles, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm text-xs font-semibold text-neutral-800 mb-6 animate-float">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Disponible pour nouveaux projets</span>
              <span className="text-neutral-300">·</span>
              <span className="text-neutral-500 font-mono text-[11px]">Abidjan (UTC+0)</span>
            </div>

            {/* Greeting badge */}
            <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-neutral-800 mb-3">
              <span className="w-8 h-[2px] bg-[#F9A826]" />
              <span>Hello, I'm 👋</span>
            </div>

            {/* Monumental Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#141416] tracking-tight leading-[0.95] mb-5 font-sans">
              Aziz <br />
              <span className="text-[#141416] hover:text-[#F9A826] transition-colors duration-300">
                Compaoré
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl font-medium text-neutral-600 mb-8 max-w-xl leading-relaxed">
              <strong className="text-[#141416]">Full-Stack Developer &amp; AI Builder</strong> | Based in Abidjan, Côte d'Ivoire
            </p>

            {/* Buttons (Perez style pills with hover lift) */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#141416] hover:bg-neutral-800 text-white rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4 text-[#F9A826] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-neutral-50 border border-neutral-300 text-[#141416] rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 group cursor-pointer"
              >
                <span>My Work</span>
                <ArrowDown className="w-4 h-4 text-[#141416] group-hover:translate-y-1 transition-transform" />
              </a>

              {/* Quick 1-click email copy button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 bg-white/60 hover:bg-white border border-black/5 rounded-full text-xs font-semibold text-neutral-700 transition-colors shadow-sm cursor-pointer"
                title="Copier l'adresse email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Email copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#F9A826]" />
                    <span>Copier email</span>
                  </>
                )}
              </button>
            </div>

            {/* Proof Strip */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-neutral-700 pt-6 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black text-[#141416]">Licence 3</span>
                <span className="text-xs text-neutral-500 font-normal">Université Agitel</span>
              </div>
              <span className="text-neutral-300">|</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F9A826] transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-neutral-300">|</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F9A826] transition-colors flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-neutral-300">|</span>
              <div className="flex items-center gap-1 text-neutral-500">
                <Sparkles className="w-3.5 h-3.5 text-[#F9A826]" />
                <span>2 Hackathons Gagnés</span>
              </div>
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

              {/* Rotating Circular Stamp Badge with Smooth Spin & Hover Pulse */}
              <a
                href="#work"
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-28 h-28 sm:w-32 sm:h-32 bg-[#141416] rounded-full p-2 flex items-center justify-center shadow-2xl group cursor-pointer hover:scale-110 transition-transform duration-300 z-20"
                title="Découvrir mes projets"
              >
                {/* Rotating SVG circular text */}
                <svg
                  className="w-full h-full animate-spin-slow group-hover:[animation-duration:8s]"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="circlePathHero"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="text-[10.5px] font-bold uppercase tracking-[2px] fill-[#F9A826]">
                    <textPath href="#circlePathHero" startOffset="0%">
                      • CONTACT ME • FULL-STACK • AI BUILDER •
                    </textPath>
                  </text>
                </svg>

                {/* Center Yellow Dot with Animated Arrow */}
                <div className="absolute w-10 h-10 rounded-full bg-[#F9A826] flex items-center justify-center text-[#141416] group-hover:scale-110 group-hover:translate-y-0.5 transition-transform">
                  <ArrowDown className="w-5 h-5 stroke-[2.5]" />
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
