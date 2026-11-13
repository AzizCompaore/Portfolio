import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lock,
  Sparkles,
  Upload,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface CylinderProjectCarouselProps {
  onOpenProjectModal?: (project: Project) => void;
  onSwitchToGrid?: () => void;
}

export const CylinderProjectCarousel: React.FC<CylinderProjectCarouselProps> = ({
  onOpenProjectModal,
  onSwitchToGrid,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTargetId = useRef<string | null>(null);
  const dragStartRef = useRef<{ y: number; pos: number } | null>(null);
  const [animPos, setAnimPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [customScreenshots, setCustomScreenshots] = useState<Record<string, string>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const total = PROJECTS_DATA.length;
  const activeIdx = ((Math.round(animPos) % total) + total) % total;
  const activeProject = PROJECTS_DATA[activeIdx] ?? PROJECTS_DATA[0];

  useEffect(() => {
    const loaded: Record<string, string> = {};
    PROJECTS_DATA.forEach((project) => {
      const saved = localStorage.getItem(`screenshot_${project.id}`);
      if (saved) loaded[project.id] = saved;
    });
    setCustomScreenshots(loaded);
  }, []);

  const moveBy = (amount: number) => {
    setAnimPos((position) => Math.round(position) + amount);
  };

  const jumpToProject = (index: number) => {
    const current = Math.round(animPos);
    const currentIndex = ((current % total) + total) % total;
    let difference = index - currentIndex;
    if (difference > total / 2) difference -= total;
    if (difference < -total / 2) difference += total;
    setAnimPos(current + difference);
  };

  const openProject = (project: Project) => {
    if (onOpenProjectModal) {
      onOpenProjectModal(project);
    } else {
      setSelectedProject(project);
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const projectId = uploadTargetId.current;
    if (!file || !projectId) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') return;
      setCustomScreenshots((previous) => ({ ...previous, [projectId]: result }));
      try {
        localStorage.setItem(`screenshot_${projectId}`, result);
      } catch {
        // Keep the selected image available for this session if storage is full.
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = { y: event.clientY, pos: animPos };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    setAnimPos(dragStartRef.current.pos - (event.clientY - dragStartRef.current.y) * 0.0055);
  };

  const handlePointerUp = () => {
    if (!dragStartRef.current) return;
    setAnimPos((position) => Math.round(position));
    dragStartRef.current = null;
    setIsDragging(false);
  };

  return (
    <div className="relative overflow-hidden bg-[#FFF8F1] py-5 font-sans text-[#141416] selection:bg-[#F9A826] selection:text-[#141416] sm:py-6 md:py-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-4 flex flex-col items-start gap-3 border-b border-black/10 pb-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F9A826]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em]">
              Galerie des réalisations
            </span>
            <span className="text-neutral-300">|</span>
            <span className="rounded-full border border-[#F5E6D3] bg-[#FFF5EB] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#F9A826]">
              {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-4 self-end sm:self-auto">
            {onSwitchToGrid && (
              <button
                onClick={onSwitchToGrid}
                className="text-xs font-mono font-bold text-neutral-600 transition-colors hover:text-[#141416]"
              >
                VUE GRILLE
              </button>
            )}
            <a
              href="#contact"
              className="text-xs font-mono font-bold text-neutral-600 transition-colors hover:text-[#141416]"
            >
              CONTACT
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="z-20 flex flex-col justify-center lg:col-span-5">
            <div key={`${activeProject.id}-category`} className="mb-3 inline-flex w-fit animate-[projectDetailIn_450ms_cubic-bezier(0.22,1,0.36,1)] items-center gap-2 rounded-full border border-[#F5E6D3] bg-[#FFF5EB] px-3 py-1 font-mono text-[11px] font-bold text-[#F9A826] motion-reduce:animate-none">
              <Sparkles className="h-3 w-3" />
              <span>{activeProject.categoryLabel}</span>
              <span className="text-neutral-300">·</span>
              <span className="text-neutral-600">{activeProject.statusBadge}</span>
            </div>

            <h2 key={`${activeProject.id}-title`} className="animate-[projectDetailIn_550ms_cubic-bezier(0.22,1,0.36,1)] font-serif text-3xl font-black leading-tight tracking-tight motion-reduce:animate-none sm:text-4xl md:text-5xl">
              {activeProject.title}
            </h2>
            <p key={`${activeProject.id}-tagline`} className="mt-3 max-w-md animate-[projectDetailIn_650ms_cubic-bezier(0.22,1,0.36,1)] text-sm leading-relaxed text-neutral-600 motion-reduce:animate-none sm:text-base">
              {activeProject.tagline}
            </p>

            <div className="mt-4 space-y-2 border-t border-black/10 pt-3">
              {activeProject.features.slice(0, 3).map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-xs text-neutral-700">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F9A826]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-black/10 pt-3">
              <button
                onClick={() => openProject(activeProject)}
                className="inline-flex items-center gap-2 rounded-full bg-[#141416] px-6 py-3 text-xs font-bold tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                VOIR L'ÉTUDE DE CAS
                <ArrowUpRight className="h-3.5 w-3.5 text-[#F9A826]" />
              </button>
              <a
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#F5E6D3] bg-white px-4 py-3 text-xs font-semibold transition-colors hover:bg-neutral-50"
              >
                TESTER EN DIRECT
                <ExternalLink className="h-3.5 w-3.5 text-[#F9A826]" />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => moveBy(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5E6D3] bg-white shadow-xs transition-colors hover:bg-[#FFF5EB]"
                aria-label="Projet précédent"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => moveBy(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5E6D3] bg-white shadow-xs transition-colors hover:bg-[#FFF5EB]"
                aria-label="Projet suivant"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="ml-2 flex items-center gap-1.5">
                {PROJECTS_DATA.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => jumpToProject(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeIdx === index ? 'w-7 bg-[#F9A826]' : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                    aria-label={`Afficher ${project.title}`}
                  />
                ))}
              </div>
              <span className="ml-auto hidden text-xs font-mono text-neutral-500 sm:inline">
                Glissez pour explorer
              </span>
            </div>
          </div>

          <div
            onWheel={(event) => {
              setAnimPos((position) => position + event.deltaY * 0.0035);
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={(event) => {
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                moveBy(-1);
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                moveBy(1);
              }
            }}
            tabIndex={0}
            role="region"
            aria-label="Carrousel des projets. Utilisez les flèches haut et bas pour naviguer."
            className="relative flex h-[360px] select-none items-center justify-center overflow-hidden rounded-[30px] border border-[#F5E6D3] bg-[#FFF5EB] shadow-soft outline-none focus-visible:ring-2 focus-visible:ring-[#F9A826] sm:h-[400px] md:h-[min(450px,65svh)] lg:col-span-7"
            style={{ perspective: '900px', touchAction: 'none' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent" />
            <div className="relative flex h-full w-full items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {PROJECTS_DATA.map((project, index) => {
                let offset = index - (animPos % total);
                while (offset > total / 2) offset -= total;
                while (offset < -total / 2) offset += total;
                if (Math.abs(offset) > 4.1) return null;

                const distance = Math.abs(offset);
                const isActive = distance < 0.45;
                const image = customScreenshots[project.id] ?? project.screenshot;
                const angle = offset * 20;
                const radians = (angle * Math.PI) / 180;
                const wheelRadius = 270;
                const verticalPosition = Math.sin(radians) * wheelRadius;
                const depthPosition = (Math.cos(radians) - 1) * wheelRadius;
                const scale = Math.max(0.66, 1 - distance * 0.085);
                const opacity = Math.max(0.3, 1 - distance * 0.2);
                const style: React.CSSProperties = {
                  transform: `translate3d(0, ${verticalPosition}px, ${depthPosition}px) rotateX(${angle}deg) rotateZ(${-offset * 1.4}deg) scale(${scale})`,
                  opacity,
                  filter: `blur(${Math.min(1.5, distance * 0.38)}px)`,
                  zIndex: Math.round(50 - distance * 12),
                  willChange: 'transform',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transition: isDragging
                    ? 'none'
                    : 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease, filter 700ms ease',
                };

                return (
                  <article
                    key={project.id}
                    onClick={() => (isActive ? openProject(project) : jumpToProject(index))}
                    className={`group absolute aspect-[16/10] w-[220px] cursor-pointer overflow-hidden rounded-[18px] border-2 bg-white transition-[box-shadow,border-color] duration-700 motion-reduce:transition-none sm:w-[280px] md:w-[320px] ${
                      isActive
                        ? 'border-white shadow-[0_34px_70px_rgba(20,20,22,0.28),0_0_34px_rgba(249,168,38,0.18)] ring-2 ring-[#F9A826]'
                        : 'border-[#F5E6D3] shadow-[0_16px_38px_rgba(20,20,22,0.12)]'
                    }`}
                    style={style}
                    aria-label={`${project.title}${isActive ? ', projet sélectionné' : ', sélectionner le projet'}`}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`Capture d'écran de ${project.title}`}
                        className={`h-full w-full ${project.screenshotFit === 'contain' ? 'bg-[#12523A] object-contain' : 'object-cover object-top'}`}
                      />
                    ) : (
                      <div className="flex h-full flex-col bg-[#FAFAF8] text-neutral-900">
                        <div className="flex items-center justify-between border-b border-neutral-100 bg-white px-3.5 py-2 text-[10px] text-neutral-500">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="flex shrink-0 items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[9px] font-medium text-emerald-600">
                              <Lock className="h-2.5 w-2.5" />
                              https
                            </span>
                            <span className="truncate font-mono text-[9.5px] text-neutral-600">
                              {project.url.replace('https://', '')}
                            </span>
                          </div>
                          <span className="ml-2 rounded-full bg-[#FFF5EB] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#F9A826]">
                            {project.categoryLabel}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-white via-[#FCFAF7] to-[#F7F4EE] p-4">
                          <div>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#F9A826]">
                                <Sparkles className="h-2.5 w-2.5" />
                                Interface projet
                              </span>
                              <span className="font-mono text-[9px] text-neutral-400">{project.year}</span>
                            </div>
                            <h3 className="line-clamp-1 font-serif text-base font-black leading-snug sm:text-lg">
                              {project.title}
                            </h3>
                            <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-relaxed text-neutral-600">
                              {project.tagline}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5 border-t border-black/5 pt-2">
                            {project.features.slice(0, 3).map((feature, featureIndex) => (
                              <div
                                key={feature}
                                className="flex flex-col justify-between rounded-lg border border-[#F5E6D3] bg-white p-1.5 text-[8.5px] font-medium text-neutral-700 shadow-2xs"
                              >
                                <span className="font-mono text-[7.5px] font-bold text-[#F9A826]">
                                  0{featureIndex + 1}
                                </span>
                                <span className="line-clamp-2">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          openProject(project);
                        }}
                        className="rounded-full bg-[#141416] px-4 py-2 text-xs font-bold text-white shadow-lg"
                      >
                        Détails du projet
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          uploadTargetId.current = project.id;
                          fileInputRef.current?.click();
                        }}
                        className="rounded-full bg-white/70 p-2 text-[#141416] backdrop-blur-md transition-colors hover:bg-white"
                        title="Remplacer la capture d'écran"
                        aria-label={`Remplacer la capture de ${project.title}`}
                      >
                        <Upload className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-[#FFF5EB] via-[#FFF5EB]/85 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-16 bg-gradient-to-t from-[#FFF5EB] via-[#FFF5EB]/85 to-transparent" />
          </div>
        </div>
      </div>

      {!onOpenProjectModal && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};
