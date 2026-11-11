import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 md:py-28 bg-[#FFF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#F9A826] font-bold block mb-2">
            Formation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141416] tracking-tight font-sans">
            Academic <span className="text-[#F9A826]">Background</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            Cursus académique en informatique à Abidjan et fondations scientifiques.
          </p>
        </div>

        {/* Education 2-card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EDUCATION_DATA.map((item, index) => (
            <div
              key={item.institution}
              className="bg-white rounded-[32px] p-8 border border-black/5 hover:border-[#F9A826]/30 shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF8F1] flex items-center justify-center text-[#F9A826] border border-black/5">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFF5EB] text-xs font-bold text-[#F9A826] font-mono">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#141416] mb-1 font-sans">
                  {item.degree}
                </h3>

                <p className="text-sm font-bold text-neutral-800 mb-2">
                  {item.institution}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-5">
                  <MapPin className="w-3.5 h-3.5 text-[#F9A826]" />
                  <span>{item.location}</span>
                </div>

                <ul className="space-y-2 pt-4 border-t border-black/5 text-xs text-neutral-600 font-normal">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F9A826] mt-1 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{index === 0 ? 'En cours (Licence 3)' : 'Diplôme Validé'}</span>
                <span>Côte d'Ivoire</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
