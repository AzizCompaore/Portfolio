import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectScreenshotSlot } from './ProjectScreenshotSlot';
import { CylinderProjectCarousel } from './CylinderProjectCarousel';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, ExternalLink, Columns, LayoutGrid } from 'lucide-react';
import { Project, ProjectCategory } from '../types';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [viewMode, setViewMode] = useState<'cylinder' | 'grid'>('cylinder');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="bg-[#FFF8F1]">
      {/* 1. Cylindrical 3D Panoramic Ribbon Carousel (Matching uploaded reference image) */}
      {viewMode === 'cylinder' ? (
        <div className="relative">
          <CylinderProjectCarousel
            onOpenProjectModal={(proj) => setSelectedProject(proj)}
            onSwitchToGrid={() => setViewMode('grid')}
          />
        </div>
      ) : (
        /* 2. Grid View Mode (Classic 2-Column Perez Editorial Layout) */
        <div className="py-20 md:py-28 bg-[#FFF8F1]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            {/* Header & View Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F9A826] font-bold block mb-1">
                  Catalogue des Projets
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#141416] tracking-tight font-sans">
                  My recent <span className="text-[#F9A826]">work</span>
                </h2>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-black/10 shadow-sm shrink-0">
                <button
                  onClick={() => setViewMode('cylinder')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-neutral-600 hover:text-black cursor-pointer transition-colors"
                >
                  <Columns className="w-3.5 h-3.5 text-[#F9A826]" />
                  <span>Vue Rouleau Vertical 3D</span>
                </button>

                <button
                  onClick={() => setViewMode('grid')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#141416] text-white shadow-md cursor-pointer"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#F9A826]" />
                  <span>Vue Grille</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: 'all', label: 'All Projects (8)' },
                { id: 'ai', label: 'AI & Machine Learning' },
                { id: 'web', label: 'Web & Télématique' },
                { id: 'proptech', label: 'PropTech & Immobilier' },
                { id: 'ecommerce', label: 'E-Commerce' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as ProjectCategory)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#141416] text-white shadow-md'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-black/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-[32px] p-6 border border-black/5 hover:border-[#F9A826]/30 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <ProjectScreenshotSlot project={project} />

                    <div className="flex flex-wrap items-center gap-2 mt-5 mb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFF5EB] text-[#F9A826] border border-[#F5E6D3]">
                        {project.categoryLabel}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600">
                        {project.statusBadge}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black text-[#141416] group-hover:text-[#F9A826] transition-colors font-sans">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-medium leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-[#FFF8F1] group-hover:bg-[#F9A826] border border-black/5 flex items-center justify-center text-[#141416] transition-all shrink-0 mt-1"
                        title="Visiter le site en direct"
                      >
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>

                    <ul className="mt-4 pt-4 border-t border-black/5 space-y-1.5 text-xs text-neutral-500 font-normal">
                      {project.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F9A826]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-[#F9A826] hover:underline cursor-pointer"
                    >
                      Détails de l'étude de cas ↗
                    </button>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#141416] hover:text-[#F9A826] transition-colors"
                    >
                      <span>Tester le site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
