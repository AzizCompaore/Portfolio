import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF8F1]/90 backdrop-blur-md border-b border-black/5 py-4 shadow-sm'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Logo Brand matching Perez style */}
          <a
            href="#"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#141416] flex items-center justify-center text-[#F9A826] font-extrabold text-sm font-sans tracking-tight">
              A
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#141416] font-sans">
              AZIZ<span className="text-[#F9A826]">.</span>
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <a
              href="#about"
              className="hover:text-[#141416] transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#specialties"
              className="hover:text-[#141416] transition-colors whitespace-nowrap"
            >
              Specialties
            </a>
            <a
              href="#workstation"
              className="hover:text-[#F9A826] transition-colors whitespace-nowrap flex items-center gap-1 font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F9A826]" />
              <span>3D Workstation</span>
            </a>
            <a
              href="#work"
              className="hover:text-[#141416] transition-colors whitespace-nowrap"
            >
              Recent Work
            </a>
            <a
              href="#achievements"
              className="hover:text-[#141416] transition-colors whitespace-nowrap"
            >
              Hackathons
            </a>
            <a
              href="#education"
              className="hover:text-[#141416] transition-colors whitespace-nowrap"
            >
              Education
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Download Source Code ZIP Button (Clean, short paths, 100% Windows compatible) */}
            <a
              href="/aziz-compaore-portfolio-source.zip"
              download="aziz-compaore-portfolio-source.zip"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFF5EB] hover:bg-[#F5E6D3] text-[#141416] border border-[#F5E6D3] rounded-full text-xs font-bold tracking-wide transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group"
              title="Télécharger le code source propre (.zip sans erreur Windows)"
            >
              <Download className="w-3.5 h-3.5 text-[#F9A826] group-hover:translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline">Télécharger ZIP</span>
              <span className="sm:hidden">Code ZIP</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141416] hover:bg-neutral-800 text-white rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F9A826]" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#141416] hover:text-[#F9A826] focus:outline-none cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#FFF8F1]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28">
          <nav className="flex flex-col gap-6 text-2xl font-bold text-[#141416]">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F9A826] py-2 border-b border-black/5"
            >
              About Me
            </a>
            <a
              href="#specialties"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F9A826] py-2 border-b border-black/5"
            >
              My Specialties
            </a>
            <a
              href="#workstation"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F9A826] py-2 border-b border-black/5 flex items-center justify-between"
            >
              <span>3D Workstation (Motion)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F9A826]/20 font-mono">3D</span>
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F9A826] py-2 border-b border-black/5"
            >
              My Recent Work
            </a>
            <a
              href="#achievements"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F9A826] py-2 border-b border-black/5"
            >
              Hackathons &amp; Wins
            </a>
            <a
              href="#education"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F9A826] py-2 border-b border-black/5"
            >
              Education
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F9A826] py-2"
            >
              Let's Talk ↗
            </a>
          </nav>

          <div className="pt-6 border-t border-black/10 flex flex-col gap-4">
            <a
              href="/aziz-compaore-portfolio-source.zip"
              download="aziz-compaore-portfolio-source.zip"
              className="inline-flex items-center justify-center gap-2 p-3.5 bg-[#F9A826] text-[#141416] rounded-full text-sm font-bold shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le Code Source (.ZIP)</span>
            </a>

            <div className="text-xs font-mono text-neutral-500 flex justify-between items-center">
              <span>Abidjan, Côte d'Ivoire</span>
              <span>Agitel Formation</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
