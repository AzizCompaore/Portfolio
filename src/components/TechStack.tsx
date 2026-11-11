import React, { useState } from 'react';
import { TECH_CATEGORIES } from '../data/portfolioData';
import { Terminal, Database, Cpu, Wrench, Users, Check, Sparkles } from 'lucide-react';

export const TechStack: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'software':
        return <Terminal className="w-4 h-4 text-[#D4AF37]" />;
      case 'ai':
        return <Cpu className="w-4 h-4 text-[#D4AF37]" />;
      case 'data':
        return <Database className="w-4 h-4 text-[#D4AF37]" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-[#D4AF37]" />;
      case 'leadership':
        return <Users className="w-4 h-4 text-[#D4AF37]" />;
      default:
        return <Terminal className="w-4 h-4 text-[#D4AF37]" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Avancé':
        return 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/5';
      case 'Production':
        return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5';
      case 'Opérationnel':
        return 'text-sky-400 border-sky-400/30 bg-sky-400/5';
      case 'Bases':
        return 'text-neutral-400 border-white/10 bg-white/5';
      default:
        return 'text-neutral-300 border-white/10';
    }
  };

  return (
    <section id="competences" className="py-24 md:py-32 border-b border-white/5 relative bg-[#07080B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-mono mb-2">
              <span>04. Compétences Techniques</span>
              <span aria-hidden="true">/</span>
              <span>Rigueur &amp; Réalité du CV</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4F2EC] tracking-tight">
              Tech Stack &amp; Maîtrise
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md font-sans">
            Aucun pourcentage arbitraire. Chaque compétence reflète un niveau vérifiable d'usage en production ou en environnement académique rigoureux.
          </p>
        </div>

        {/* Legend strip (Clean unboxed markers) */}
        <div className="flex flex-wrap items-center gap-6 mb-12 text-xs font-mono text-neutral-400">
          <span className="text-neutral-500 uppercase">Niveaux de maîtrise :</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-neutral-300">Avancé (Conception &amp; Architecture)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-neutral-300">Production (Applications Live &amp; Hackathons)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-neutral-300">Opérationnel (Projets &amp; Laboratoires)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            <span className="text-neutral-400">Bases (Fondamentaux théoriques)</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="p-6 md:p-8 bg-[#0B0D12] border border-white/10 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#13151D] border border-white/10">
                    {getCategoryIcon(category.id)}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#F4F2EC] font-semibold">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 font-light mb-6">
                  {category.subtitle}
                </p>

                {/* Skills list */}
                <div className="space-y-3">
                  {category.skills.map((skill) => {
                    const isSelected = selectedTech === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedTech(isSelected ? null : skill.name)}
                        className={`p-3 border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#121520] border-[#D4AF37]/60'
                            : 'bg-[#0E1017] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-medium text-neutral-200">
                            {skill.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 border ${getLevelColor(
                              skill.level
                            )}`}
                          >
                            {skill.level}
                          </span>
                        </div>

                        {skill.context && (
                          <p className="mt-2 text-[11px] font-sans text-neutral-400 leading-relaxed font-light">
                            {skill.context}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer note */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>{category.skills.length} compétences</span>
                <span>Agitel &amp; Projets</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
