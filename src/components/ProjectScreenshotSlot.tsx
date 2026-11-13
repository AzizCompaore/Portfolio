import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, ExternalLink, X, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectScreenshotSlotProps {
  project: Project;
  aspect?: 'video' | 'card';
}

export const ProjectScreenshotSlot: React.FC<ProjectScreenshotSlotProps> = ({ project, aspect = 'card' }) => {
  const [customScreenshot, setCustomScreenshot] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const screenshot = customScreenshot ?? project.screenshot ?? null;

  // Load saved screenshot from localStorage if user provided one
  useEffect(() => {
    const saved = localStorage.getItem(`screenshot_${project.id}`);
    setCustomScreenshot(saved);
  }, [project.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomScreenshot(result);
        try {
          localStorage.setItem(`screenshot_${project.id}`, result);
        } catch {
          // In case of quota exceeded, keep in memory state
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomScreenshot(null);
    localStorage.removeItem(`screenshot_${project.id}`);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#141416] border border-black/5 shadow-soft group">
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1F2024] border-b border-white/5 text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>
        <div className="px-3 py-0.5 rounded-md bg-black/40 text-[10px] text-neutral-300 max-w-[220px] truncate">
          {project.url.replace('https://', '')}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="text-neutral-400 hover:text-[#F9A826] transition-colors"
          title="Ouvrir le site en ligne"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Container Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full ${aspect === 'video' ? 'aspect-video' : 'aspect-[16/10]'} flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden transition-all duration-300 ${
          screenshot ? 'bg-black' : 'bg-gradient-to-br from-[#1C1D21] to-[#121316] hover:from-[#23252A] hover:to-[#17181C]'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {screenshot ? (
          <>
            <img
              src={screenshot}
              alt={`Capture d'écran de ${project.title}`}
              className={`w-full h-full ${project.screenshotFit === 'contain' ? 'object-contain' : 'object-cover object-top'} transition-transform duration-500 group-hover:scale-105`}
            />
            {/* Overlay to remove or update */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <span className="px-3 py-1.5 bg-[#F9A826] text-[#141416] text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-lg">
                <Upload className="w-3.5 h-3.5" />
                Remplacer la capture
              </span>
              {customScreenshot && (
                <button
                  onClick={handleRemove}
                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                  title="Supprimer la capture personnalisée"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          /* Empty state slot specifically matching: "laisse un vide pour que je termine moi meme" */
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#2A2B31] border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[#F9A826]/50 transition-all">
              <ImageIcon className="w-5 h-5 text-[#F9A826]" />
            </div>
            <span className="text-xs font-medium text-neutral-200 mb-1">
              Emplacement Capture d'Écran
            </span>
            <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
              Déposez ou cliquez pour importer votre capture de <strong className="text-neutral-300">{project.title}</strong>
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#F9A826] group-hover:bg-[#F9A826] group-hover:text-[#141416] transition-colors">
              <Upload className="w-3 h-3" />
              <span>Importer votre image</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
