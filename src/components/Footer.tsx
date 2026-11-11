import React from 'react';
import { ArrowUp, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#FFF8F1] border-t border-black/5 text-neutral-600">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#141416] flex items-center justify-center text-[#F9A826] font-extrabold text-sm font-sans">
            A
          </div>
          <span className="font-black text-lg text-[#141416] tracking-tight">
            AZIZ<span className="text-[#F9A826]">.</span>
          </span>
          <span className="text-neutral-300">|</span>
          <span className="text-xs text-neutral-500 font-medium">
            {PERSONAL_INFO.title}
          </span>
        </div>

        {/* Location & Copyright */}
        <div className="text-xs text-neutral-500 font-medium text-center md:text-left">
          © {new Date().getFullYear()} Compaoré Abdoul Aziz · Université Agitel Formation (Abidjan)
        </div>

        {/* Actions: Download Source ZIP & Back to top */}
        <div className="flex items-center gap-3">
          <a
            href="/aziz-compaore-portfolio-source.zip"
            download="aziz-compaore-portfolio-source.zip"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF5EB] hover:bg-[#F5E6D3] border border-[#F5E6D3] text-xs font-bold text-[#141416] transition-colors shadow-xs cursor-pointer"
            title="Télécharger l'archive ZIP propre du code source"
          >
            <Download className="w-3.5 h-3.5 text-[#F9A826]" />
            <span>Code Source (.ZIP)</span>
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10 hover:border-[#F9A826] text-xs font-bold text-[#141416] transition-colors shadow-xs cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#F9A826]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
