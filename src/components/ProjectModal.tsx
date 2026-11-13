import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProjectScreenshotSlot } from './ProjectScreenshotSlot';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog (Perez rounded style) */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl sm:rounded-[36px] border border-black/10 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-start justify-between gap-3 px-4 sm:px-8 py-4 sm:py-5 border-b border-black/5 bg-[#FFF8F1]">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-[#FFF5EB] text-[#F9A826] border border-[#F5E6D3] uppercase tracking-wider">
              {project.categoryLabel}
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-neutral-500 font-mono">{project.role}</span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-neutral-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fermer la fenêtre modale"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-8 md:p-10 max-h-[65dvh] sm:max-h-[75dvh] overflow-y-auto space-y-6 sm:space-y-8 bg-white">
          
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#141416] mb-2 font-sans">
              {project.title}
            </h2>
            <p className="text-base text-neutral-600 font-medium leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Screenshot Container with Interactive Dropzone */}
          <div>
            <ProjectScreenshotSlot project={project} aspect="video" />
          </div>

          {/* Context, Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/5">
            <div className="p-5 rounded-2xl bg-[#FFF8F1] border border-black/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Problématique</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {project.problem}
              </p>
              <p className="text-xs text-neutral-500 pt-1">
                <strong>Contexte :</strong> {project.context}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFF8F1] border border-black/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solution Développée</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3 pt-4 border-t border-black/5">
            <h3 className="text-xs uppercase tracking-widest text-[#F9A826] font-bold">
              Fonctionnalités Vérifiées
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-[#FFF8F1] p-3 rounded-xl border border-black/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F9A826] mt-1.5 shrink-0" />
                  <span className="leading-relaxed font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="space-y-3 pt-4 border-t border-black/5">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
              Technologies Confirmées
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-[#FFF5EB] text-neutral-800 border border-[#F5E6D3] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8 py-4 sm:py-5 border-t border-black/5 bg-[#FFF8F1]">
          <div className="text-xs font-mono text-neutral-500">
            Statut : <span className="text-[#141416] font-bold">{project.statusBadge}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 hover:border-black text-xs font-semibold text-neutral-800 hover:text-black transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code Source</span>
              </a>
            )}

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-[#141416] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Accéder au site en direct</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F9A826]" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
