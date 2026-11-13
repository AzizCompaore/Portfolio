import React, { useEffect } from 'react';
import { ArrowUpRight, Terminal, Brain, Database, Network, Users } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Specialties: React.FC = () => {
  const specialties = [
    {
      id: 'software',
      icon: <Terminal className="w-6 h-6 text-[#141416]" />,
      title: 'Full-Stack Software Development',
      description: 'Python (POO), Django, React, JavaScript, HTML5 & CSS3, Java, PHP (bases Laravel), Expo.',
      techs: ['Django', 'React', 'Python', 'JavaScript']
    },
    {
      id: 'ai',
      icon: <Brain className="w-6 h-6 text-[#F9A826]" />,
      title: 'Artificial Intelligence & LLMs',
      description: 'Intégration d\'API d\'intelligence artificielle, Google Gemini (Vainqueur Build with AI), OpenAI, Machine Learning.',
      techs: ['Google Gemini', 'OpenAI', 'LLM', 'Machine Learning']
    },
    {
      id: 'data',
      icon: <Database className="w-6 h-6 text-[#141416]" />,
      title: 'Data & Databases',
      description: 'SQL, PostgreSQL (en production), SQL Server, Oracle Database 21c, Python Data Stack (Pandas, NumPy, Matplotlib), Power BI.',
      techs: ['PostgreSQL', 'SQL Server', 'Oracle 21c', 'Pandas']
    },
    {
      id: 'tools',
      icon: <Network className="w-6 h-6 text-[#141416]" />,
      title: 'Tools & Infrastructure',
      description: 'Git, GitHub, Réseaux (TCP/IP, DHCP, DNS), Windows Server, Suite bureautique Word & Excel.',
      techs: ['Git/GitHub', 'TCP/IP', 'DNS', 'DHCP']
    },
    {
      id: 'leadership',
      icon: <Users className="w-6 h-6 text-[#141416]" />,
      title: 'Leadership & Conduite de Projet',
      description: 'Coordination d\'équipes, gestion de projets, participation et encadrement de groupes académiques et hackathons.',
      techs: ['Coordination', 'Agile', 'Hackathons']
    }
  ];

  useEffect(() => {
    const grid = document.querySelector('#specialties .grid');
    const intro = document.querySelector<HTMLElement>('#specialties .specialties-intro');

    if (!grid || !intro) return;

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('#specialties .specialty-drop-trigger'),
    ).map((trigger) => {
      const card = trigger.querySelector<HTMLElement>('.specialty-drop-card');
      if (!card) throw new Error('Specialty card is missing its animation element.');
      return { trigger, card, documentTop: 0 };
    });
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let columns = 1;
    let introBottom = 0;
    let headerBottom = 0;
    let frameId = 0;

    const measureLayout = () => {
      columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      const scrollY = window.scrollY;
      introBottom = intro.getBoundingClientRect().bottom + scrollY;
      headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
      cards.forEach(({ trigger }, index) => {
        cards[index].documentTop = trigger.getBoundingClientRect().top + scrollY;
      });
    };

    const updateCards = () => {
      frameId = 0;

      if (reduceMotion.matches) {
        cards.forEach(({ card }) => {
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
        return;
      }

      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const safeTop = Math.max(
        headerBottom + 16,
        introBottom - scrollY + 20,
      );
      const travelDistance = viewportHeight * 0.85;

      cards.forEach(({ card, documentTop }, index) => {
        const column = index % columns;
        const top = documentTop - scrollY;
        const startLine = viewportHeight * (0.88 - column * 0.1);
        const progress = Math.max(0, Math.min(1, (startLine - top) / travelDistance));
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const fall = -150 * (1 - easedProgress);
        const rotation = (index % 2 === 0 ? -9 : 9) * (1 - easedProgress);
        const scaleX = 0.84 + 0.16 * easedProgress;
        const scaleY = 0.9 + 0.1 * easedProgress;
        const offsetY = top > safeTop ? Math.max(fall, safeTop - top) : fall;

        card.style.opacity = String(Math.min(1, progress * 2.2));
        card.style.transform =
          `translate3d(0, ${offsetY}px, 0) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
      });
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateCards);
    };
    const handleResize = () => {
      measureLayout();
      scheduleUpdate();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(grid);
    resizeObserver.observe(intro);

    measureLayout();
    updateCards();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', handleResize);
    reduceMotion.addEventListener('change', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', handleResize);
      reduceMotion.removeEventListener('change', scheduleUpdate);
      resizeObserver.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section id="specialties" className="py-20 md:py-28 bg-[#FFF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="specialties-intro flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[#F9A826]" />
              <span className="text-xs uppercase tracking-widest text-[#F9A826] font-bold">
                Services &amp; Domaines
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141416] tracking-tight font-sans">
              My <span className="text-[#141416]">specialties</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md font-medium leading-relaxed">
            Conception de solutions logicielles de bout en bout, intégration d'intelligence artificielle appliquée et modélisation de données.
          </p>
        </div>

        {/* 6-Card Grid with Micro-Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((item) => (
            <div
              key={item.id}
              className="specialty-drop-trigger h-full"
            >
              <div className="specialty-drop-card h-full">
                <div className="bg-white rounded-[28px] p-8 border border-black/5 hover:border-[#F9A826]/50 transition-all duration-300 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF8F1] flex items-center justify-center border border-black/5 group-hover:scale-110 group-hover:bg-[#FFF3E0] transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#FFF8F1] flex items-center justify-center text-neutral-400 group-hover:bg-[#F9A826] group-hover:text-[#141416] transition-colors duration-300">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#141416] mb-3 group-hover:text-[#F9A826] transition-colors duration-200">
                      {item.title}
                    </h3>

                    <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Technologies unboxed tags */}
                  <div className="pt-4 border-t border-black/5 flex flex-wrap gap-1.5">
                    {item.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#FFF8F1] group-hover:bg-[#FFF3E0] text-neutral-700 font-medium transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 6th Card: Perez Dark Highlight Card with Hover Glow */}
          <div className="specialty-drop-trigger h-full">
            <div className="specialty-drop-card h-full">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="bg-[#141416] hover:bg-[#1a1b1e] rounded-[28px] p-8 text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1.5 shadow-xl hover:shadow-2xl flex flex-col justify-between group cursor-pointer border border-white/5 hover:border-[#F9A826]/40 h-full"
              >
                <div className="flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F9A826] group-hover:bg-[#F9A826] group-hover:text-[#141416] transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div className="my-8">
                  <span className="text-xs uppercase tracking-widest text-[#F9A826] font-bold block mb-2">
                    SAY HELLO!
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#F9A826] transition-colors break-all">
                    {PERSONAL_INFO.email}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Échanger sur une opportunité</span>
                  <span className="text-[#F9A826] font-bold group-hover:underline">Prendre contact ↗</span>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
