import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import {
  ExternalLink,
  Upload,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Lock,
  CheckCircle2,
  Activity,
  Layers,
} from 'lucide-react';

interface CylinderProjectCarouselProps {
  onOpenProjectModal?: (project: Project) => void;
  onSwitchToGrid?: () => void;
}

export const CylinderProjectCarousel: React.FC<CylinderProjectCarouselProps> = ({
  onOpenProjectModal,
  onSwitchToGrid,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);

  // User uploaded custom screenshots saved in localStorage
  const [customScreenshots, setCustomScreenshots] = useState<Record<string, string>>({});

  useEffect(() => {
    const loaded: Record<string, string> = {};
    PROJECTS_DATA.forEach((p) => {
      const saved = localStorage.getItem(`screenshot_${p.id}`);
      if (saved) loaded[p.id] = saved;
    });
    setCustomScreenshots(loaded);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTargetId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomScreenshots((prev) => ({ ...prev, [uploadTargetId]: result }));
        try {
          localStorage.setItem(`screenshot_${uploadTargetId}`, result);
        } catch {
          // ignore quota
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const total = PROJECTS_DATA.length; // 8 projects

  // Active project index (0 to 7)
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Continuous vertical roller position with smooth lerp physics
  const targetPosRef = useRef(0);
  const currentPosRef = useRef(0);
  const [animPos, setAnimPos] = useState(0);
  const animationFrameRef = useRef<number>(0);

  // Touch & Pointer Drag Physics with Momentum Fling
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startPosRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  // 60 FPS physics loop with momentum smoothing
  useEffect(() => {
    const loop = () => {
      const diff = targetPosRef.current - currentPosRef.current;
      currentPosRef.current += diff * 0.14;
      setAnimPos(currentPosRef.current);

      // Derive active project index (wrapping around total)
      const wrapped = ((Math.round(currentPosRef.current) % total) + total) % total;
      setActiveIdx(wrapped);

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [total]);

  // Stepper handlers (Up / Down)
  const handlePrev = () => {
    targetPosRef.current = Math.round(targetPosRef.current) - 1;
  };

  const handleNext = () => {
    targetPosRef.current = Math.round(targetPosRef.current) + 1;
  };

  const jumpToProject = (idx: number) => {
    const current = Math.round(targetPosRef.current);
    const currentMod = ((current % total) + total) % total;
    let diff = idx - currentMod;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    targetPosRef.current = current + diff;
  };

  // --- Pointer & Mouse Handlers ---
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    lastYRef.current = e.clientY;
    lastTimeRef.current = performance.now();
    startPosRef.current = targetPosRef.current;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dy = e.clientY - lastYRef.current;

    velocityRef.current = dy / dt; // pixels per ms
    lastYRef.current = e.clientY;
    lastTimeRef.current = now;

    const totalDeltaY = e.clientY - startYRef.current;
    targetPosRef.current = startPosRef.current - totalDeltaY * 0.0055;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Apply momentum fling based on release velocity
    const momentum = -velocityRef.current * 0.28;
    targetPosRef.current = Math.round(targetPosRef.current + momentum);
  };

  // --- Dedicated Touch Handlers for Smooth Finger Dragging on Mobile & Tablets ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    isDraggingRef.current = true;
    startYRef.current = touch.clientY;
    lastYRef.current = touch.clientY;
    lastTimeRef.current = performance.now();
    startPosRef.current = targetPosRef.current;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dy = touch.clientY - lastYRef.current;

    velocityRef.current = dy / dt;
    lastYRef.current = touch.clientY;
    lastTimeRef.current = now;

    const totalDeltaY = touch.clientY - startYRef.current;
    targetPosRef.current = startPosRef.current - totalDeltaY * 0.0055;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Apply momentum fling
    const momentum = -velocityRef.current * 0.32;
    targetPosRef.current = Math.round(targetPosRef.current + momentum);
  };

  // Vertical wheel scrub
  const handleWheel = (e: React.WheelEvent) => {
    targetPosRef.current += e.deltaY * 0.0035;
  };

  const activeProject = PROJECTS_DATA[activeIdx] || PROJECTS_DATA[0];

  return (
    <div className="relative py-14 sm:py-20 md:py-24 bg-[#FFF8F1] text-[#141416] selection:bg-[#F9A826] selection:text-[#141416] font-sans overflow-hidden">
      {/* Hidden file input for screenshot drops */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Minimal Strip in Perez Luxury Cream Style */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F9A826]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#141416] uppercase font-bold">
              GALERIE DES RÉALISATIONS
            </span>
            <span className="text-neutral-300">|</span>
            <span className="text-[11px] font-mono font-bold text-[#F9A826] bg-[#FFF5EB] border border-[#F5E6D3] px-2.5 py-0.5 rounded-full">
              {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-5">
            {onSwitchToGrid && (
              <button
                onClick={onSwitchToGrid}
                className="text-xs font-mono text-neutral-600 hover:text-[#141416] transition-colors cursor-pointer font-bold"
              >
                VUE GRILLE
              </button>
            )}
            <a
              href="#contact"
              className="text-xs font-mono text-neutral-600 hover:text-[#141416] transition-colors font-bold"
            >
              CONTACT
            </a>
          </div>
        </div>

        {/* SPLIT SCREEN CONTAINER: Left Details (45%) | Right 3D Vertical Cylinder Roller (55%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Project Details in warm Perez luxury palette */}
          <div className="lg:col-span-5 flex flex-col justify-center z-20">
            
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5EB] border border-[#F5E6D3] text-[11px] font-mono text-[#F9A826] font-bold w-fit mb-3">
              <Sparkles className="w-3 h-3" />
              <span>{activeProject.categoryLabel}</span>
              <span className="text-neutral-300">·</span>
              <span className="text-neutral-600">{activeProject.statusBadge}</span>
            </div>

            {/* Monumental Luxury Title (Five Keys Editorial Serif Style) */}
            <h3
              onClick={() => {
                setSelectedProject(activeProject);
                onOpenProjectModal?.(activeProject);
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#141416] tracking-tight leading-tight hover:text-[#F9A826] transition-colors cursor-pointer"
            >
              {activeProject.title}
            </h3>

            {/* Project Tagline */}
            <p className="text-sm sm:text-base text-neutral-600 font-normal mt-3 leading-relaxed max-w-md">
              {activeProject.tagline}
            </p>

            {/* Key Features List */}
            <div className="mt-5 pt-4 border-t border-black/10 space-y-2">
              {activeProject.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F9A826]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons: Solid Charcoal + Outlined Warm Beige */}
            <div className="mt-7 pt-4 border-t border-black/10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedProject(activeProject);
                  onOpenProjectModal?.(activeProject);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141416] hover:bg-neutral-800 text-white text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>VOIR L'ÉTUDE DE CAS</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F9A826] stroke-[2.5]" />
              </button>

              <a
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white hover:bg-neutral-50 border border-[#F5E6D3] text-xs font-semibold text-[#141416] transition-colors shadow-xs"
                title="Ouvrir le projet en direct"
              >
                <span>TESTER EN DIRECT</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F9A826]" />
              </a>
            </div>

            {/* Vertical Stepper Navigation (Up / Down arrows with interactive project selector pills) */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#FFF5EB] border border-[#F5E6D3] flex items-center justify-center text-[#141416] transition-colors cursor-pointer shadow-xs active:scale-95"
                title="Projet précédent (Haut)"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#FFF5EB] border border-[#F5E6D3] flex items-center justify-center text-[#141416] transition-colors cursor-pointer shadow-xs active:scale-95"
                title="Projet suivant (Bas)"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Direct Project Indicators (Dots / Pills) */}
              <div className="flex items-center gap-1.5 ml-2">
                {PROJECTS_DATA.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => jumpToProject(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIdx === idx
                        ? 'w-7 bg-[#F9A826]'
                        : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                    title={`Aller à ${p.title}`}
                  />
                ))}
              </div>

              <span className="text-xs font-mono text-neutral-500 ml-auto hidden sm:inline">
                Glissez au doigt ou à la souris
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Vertical Cylinder Drum Carousel (Warm Perez Ivory Chamber) */}
          <div
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="lg:col-span-7 relative h-[450px] sm:h-[490px] md:h-[530px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-[36px] bg-[#FFF5EB] border border-[#F5E6D3] shadow-soft"
            style={{ perspective: '1100px', touchAction: 'none' }}
          >
            {/* Ambient subtle warm glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent" />

            {/* 3D Vertical Stage Container */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {PROJECTS_DATA.map((project, idx) => {
                // Calculate distance from active position along vertical axis
                let offset = idx - (animPos % total);
                while (offset > total / 2) offset -= total;
                while (offset < -total / 2) offset += total;

                // Don't render cards that are far outside vertical view
                if (Math.abs(offset) > 2.6) {
                  return null;
                }

                // Geometric layout along the 3D VERTICAL cylinder:
                const spacingY = 170; // vertical distance between card centers
                const posY = offset * spacingY;
                const posZ = -Math.abs(offset) * 65; // pushes top & bottom cards back into depth
                const rotateX = offset * 22; // curve around vertical drum
                const scale = Math.max(0.74, 1 - Math.abs(offset) * 0.13);
                const opacity = Math.max(0.35, 1 - Math.abs(offset) * 0.30);
                const zIndex = Math.round(50 - Math.abs(offset) * 10);

                const isCenter = Math.abs(offset) < 0.45;
                const customImg = customScreenshots[project.id];

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (isCenter) {
                        setSelectedProject(project);
                        onOpenProjectModal?.(project);
                      } else {
                        // Click to center this card vertically
                        targetPosRef.current = Math.round(targetPosRef.current + offset);
                      }
                    }}
                    className={`absolute w-[300px] sm:w-[360px] md:w-[400px] aspect-[16/10] rounded-[22px] overflow-hidden bg-white transition-all duration-200 cursor-pointer ${
                      isCenter
                        ? 'shadow-[0_26px_56px_rgba(20,20,22,0.18)] ring-2 ring-[#F9A826] border-2 border-white'
                        : 'shadow-[0_12px_28px_rgba(20,20,22,0.08)] border border-[#F5E6D3] hover:brightness-105'
                    }`}
                    style={{
                      transform: `translate3d(0px, ${posY}px, ${posZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      willChange: 'transform',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Realistic Website Viewport */}
                    <div className="relative w-full h-full flex flex-col bg-white text-neutral-900 select-none">
                      
                      {customImg ? (
                        <img
                          src={customImg}
                          alt={project.title}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col bg-[#FAFAF8]">
                          {/* Realistic Browser Header Bar with SSL Padlock & URL */}
                          <div className="px-3.5 py-2 border-b border-neutral-100 flex items-center justify-between text-[10px] bg-white text-neutral-500">
                            <div className="flex items-center gap-2 truncate max-w-[210px]">
                              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-mono font-medium">
                                <Lock className="w-2.5 h-2.5" />
                                <span>https</span>
                              </div>
                              <span className="font-mono text-neutral-600 truncate text-[9.5px]">
                                {project.url.replace('https://', '')}
                              </span>
                            </div>
                            <span className="font-mono text-[#F9A826] font-bold text-[9px] uppercase tracking-wider bg-[#FFF5EB] px-2 py-0.5 rounded-full">
                              {project.categoryLabel}
                            </span>
                          </div>

                          {/* Hero Mockup Viewport */}
                          <div className="flex-1 p-4 flex flex-col justify-between bg-gradient-to-br from-white via-[#FCFAF7] to-[#F7F4EE]">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <div className="text-[9px] font-mono text-[#F9A826] font-bold uppercase tracking-wider flex items-center gap-1">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>INTERFACE PROJET</span>
                                </div>
                                <span className="text-[9px] font-mono text-neutral-400">
                                  {project.year || '2026'}
                                </span>
                              </div>

                              <h4 className="text-base sm:text-lg font-serif font-black text-[#141416] leading-snug line-clamp-1">
                                {project.title}
                              </h4>
                              <p className="text-[10.5px] text-neutral-600 font-normal mt-0.5 line-clamp-2 leading-relaxed">
                                {project.tagline}
                              </p>
                            </div>

                            {/* 3 Distinct Feature Highlights */}
                            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-black/5">
                              {project.features.slice(0, 3).map((feat, fIdx) => (
                                <div
                                  key={fIdx}
                                  className="p-1.5 rounded-lg bg-white border border-[#F5E6D3] text-[8.5px] text-neutral-700 font-medium line-clamp-2 shadow-2xs flex flex-col justify-between"
                                >
                                  <span className="text-[7.5px] font-mono text-[#F9A826] font-bold">0{fIdx + 1}</span>
                                  <span className="line-clamp-2">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hover action prompt */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                            onOpenProjectModal?.(project);
                          }}
                          className="px-4 py-2 rounded-full bg-[#141416] text-white text-xs font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
                        >
                          Détails du projet
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadTargetId(project.id);
                            fileInputRef.current?.click();
                          }}
                          className="p-2 rounded-full bg-white/40 hover:bg-white text-[#141416] backdrop-blur-md transition-colors"
                          title="Remplacer la capture d'écran"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vertical top and bottom shadow fades matching the warm cream chamber */}
            <div className="absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-[#FFF5EB] via-[#FFF5EB]/85 to-transparent pointer-events-none z-40" />
            <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-[#FFF5EB] via-[#FFF5EB]/85 to-transparent pointer-events-none z-40" />
          </div>

        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
