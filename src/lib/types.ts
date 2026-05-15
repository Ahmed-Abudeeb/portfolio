export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  photo: string;
  resumeFile: string;
  stats: { label: string; value: string }[];
  socials: { linkedin: string; github: string; email: string; googleScholar?: string };
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  year: string;
  thesis?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  link?: string;
}

export interface Project extends ProjectMeta {
  content: string;
}

export interface Contact {
  email: string;
  locationText: string;
}
