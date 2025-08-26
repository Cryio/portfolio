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

// Certificate within a certification path (no issuer required since it's at path level)
export interface PathCertificate {
  title: string;
  date: string;
  description?: string;
  skills?: string[];
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

// Standalone certification (with issuer)
export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  skills?: string[];
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  type?: string;
}

// Achievement/Recognition certificate
export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  skills?: string[];
  credentialUrl?: string;
}

// Certification learning path/track
export interface CertificationPath {
  title: string;
  issuer: string;
  description: string;
  completionDate: string;
  totalCertificates: number;
  skills: string[];
  certificates: PathCertificate[]; // Use PathCertificate instead of Certification
}

// Main portfolio data interface
export interface PortfolioData {
  name: string;
  title: string;
  description: string;
  aboutDescription: string;
  technologies: TechnologySection[];
  experiences: Experience[];
  projects: Project[];
  certificationPaths: CertificationPath[];
  individualCertifications: Certification[];
  achievements: Achievement[];
  certifications?: Certification[]; // Optional combined array
  contact: ContactInfo;
}
