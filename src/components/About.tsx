import React, { useState, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Perez Style About Card Container with Subtle Interactive Depth */}
        <div className="bg-[#FFF5EB] border border-[#F5E6D3] rounded-[40px] sm:rounded-[48px] p-8 sm:p-12 md:p-16 shadow-soft hover:shadow-card-hover transition-shadow duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Stadium / Pill Photo Card with Interactive 3D Tilt */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[340px] aspect-[4/5] rounded-[48px] bg-[#18181B] overflow-hidden shadow-2xl group border-4 border-white/80 transition-transform duration-200 ease-out cursor-pointer"
                style={{
                  transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                {/* Authentic Photo — 100% Natural Color, No Filter */}
                <img
                  src={PERSONAL_INFO.images.leadershipPortrait}
                  alt="Compaoré Abdoul Aziz à l'Université Agitel Formation"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Subtitle badge in card */}
                <div className="absolute bottom-4 left-4 right-4 text-center py-2 px-3 bg-white/20 backdrop-blur-md rounded-2xl text-[11px] font-mono text-white font-bold">
                  Agitel Formation · Abidjan
                </div>
              </div>
            </div>

            {/* Right: Editorial Story & Signature */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-[#F9A826]" />
                <span className="text-xs uppercase tracking-widest text-[#F9A826] font-bold">
                  À propos
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141416] tracking-tight leading-tight mb-2 font-sans">
                Mon approche
              </h2>

              <div className="text-neutral-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Je conçois des applications web et intègre des outils d'intelligence artificielle pour répondre à des besoins concrets. J'accorde autant d'importance à la qualité technique qu'à l'utilité des solutions développées.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
