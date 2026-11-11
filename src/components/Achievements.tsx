import React from 'react';
import { ACHIEVEMENTS_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { Trophy, Award, CheckCircle2 } from 'lucide-react';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20 md:py-28 bg-[#FFF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#F9A826] font-bold block mb-2">
            Hackathons &amp; Distinctions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141416] tracking-tight font-sans">
            Experience &amp; <span className="text-[#F9A826]">Wins</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            Mises en pratique intensives, prototypage rapide et présentation de solutions fonctionnelles devant des jurys de haut niveau.
          </p>
        </div>

        {/* 2-Column Split: Authentic Photo & Hackathon Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Authentic Awards Ceremony Photo — Natural colors */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] rounded-[44px] overflow-hidden bg-[#141416] p-3 shadow-2xl group border-2 border-white/20">
              <div className="relative aspect-[3/4] rounded-[36px] overflow-hidden bg-neutral-900">
                <img
                  src={PERSONAL_INFO.images.awardsPhoto}
                  alt="Remise de certificats de hackathon — Compaoré Abdoul Aziz et son équipe"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Caption pill */}
              <div className="mt-3 px-4 py-2 text-center text-xs font-bold text-white flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4 text-[#F9A826]" />
                <span>Cérémonie officielle de remise de certificats</span>
              </div>
            </div>
          </div>

          {/* Right: Hackathon Cards */}
          <div className="lg:col-span-7 space-y-6">
            {ACHIEVEMENTS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[32px] p-8 border border-black/5 hover:border-[#F9A826]/40 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5EB] border border-[#F5E6D3] text-xs font-bold text-[#F9A826]">
                    <Award className="w-3.5 h-3.5" />
                    <span>{item.badge}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-neutral-400">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#141416] mb-1 font-sans">
                  {item.title}
                </h3>

                <p className="text-sm font-bold text-[#F9A826] mb-3">
                  {item.role}
                </p>

                <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-5">
                  {item.summary}
                </p>

                <div className="space-y-2 pt-4 border-t border-black/5">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-600">
                      <CheckCircle2 className="w-4 h-4 text-[#F9A826] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 flex flex-wrap gap-1.5 text-[11px] font-mono text-neutral-500">
                  <span className="font-semibold text-neutral-700">Technologies :</span>
                  {item.technologies.map((t, idx) => (
                    <span key={t}>
                      {t}{idx < item.technologies.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
