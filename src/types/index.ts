export type ProjectCategory = 'all' | 'ai' | 'web' | 'proptech' | 'ecommerce';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  url: string;
  screenshot?: string;
  screenshotFit?: 'cover' | 'contain';
  githubUrl?: string;
  role: string;
  context: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  accentColor: string;
  isFeatured?: boolean;
  statusBadge: string;
  mockupType: 'browser' | 'telematics' | 'marketplace' | 'ai-scanner' | 'estate' | 'studio' | 'transit';
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level: 'Avancé' | 'Production' | 'Opérationnel' | 'Bases';
    context?: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  role: string;
  date: string;
  badge: string;
  organization: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details: string[];
}
