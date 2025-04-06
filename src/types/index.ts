export interface Technology {
  name: string;
  badge?: string;
  logo?: string;
  darkLogo?: string;
  icon?: string;
  alt: string;
  description?: string;
}

export interface TechnologySection {
  title: string;
  items: Technology[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  link?: string;
  type?: string;
  period?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string[];
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  skills?: string[];
  hours?: number;
}

export interface PortfolioData {
  name: string;
  title: string;
  description: string;
  aboutDescription: string;
  technologies: TechnologySection[];
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
  contact: ContactInfo;
}

export interface Repository {
  name: string;
  full_name: string;
  description: string;
  fork: boolean;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks: number;
} 