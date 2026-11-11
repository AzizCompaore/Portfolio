import React from 'react';
import { Sparkles } from 'lucide-react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    'FULL-STACK ARCHITECTURE',
    'AI BUILDER & MULTIMODAL',
    'VAINQUEUR GOOGLE BUILD WITH AI',
    'LEAD DÉVELOPPEUR VIBEATHON',
    'DJANGO & POSTGRESQL',
    'REACT & TYPESCRIPT',
    'UNIVERSITÉ AGITEL FORMATION',
    'ABIDJAN, CÔTE D\'IVOIRE',
  ];

  return (
    <div className="relative py-4 bg-[#141416] text-white overflow-hidden border-y border-black/10 select-none shadow-md">
      {/* Background ambient gold glint */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F9A826]/10 to-transparent pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8 text-xs font-mono font-bold tracking-[0.2em] uppercase">
        {/* Render twice for continuous infinite seamless loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span className={idx % 2 === 0 ? 'text-white' : 'text-[#F9A826]'}>
              {text}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#F9A826]" />
          </div>
        ))}
      </div>
    </div>
  );
};
