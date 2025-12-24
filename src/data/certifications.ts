/**
 * Certification Types and Utilities
 * 
 * This file provides a structured way to manage certifications.
 * 
 * AUTOMATIC BADGE LOADING:
 * Badge images are automatically loaded from src/assets/certificates/
 * Just name the file with the certification ID:
 *   - Certification id: "paloalto-cybersecurity"
 *   - File: src/assets/certificates/paloalto-cybersecurity.png
 * 
 * Supported formats: png, jpg, jpeg, webp, svg, gif
 * 
 * To add a new certification:
 * 1. Add an image to src/assets/certificates/{id}.png
 * 2. Add the certification to the array below
 * 
 * Template:
 * {
 *   id: "unique-id", // Must match the image filename (without extension)
 *   title: "Certification Name",
 *   issuer: "Issuing Organization",
 *   issueDate: "2024-01-15",
 *   expiryDate: "2027-01-15", // optional
 *   credentialId: "ABC123", // optional
 *   credentialUrl: "https://...",
 *   skills: ["Skill 1", "Skill 2"],
 *   category: "security" | "cloud" | "development" | "design" | "other",
 *   featured: true | false,
 *   totalCertificates: 1, // if part of a track
 *   description: "Optional description", // optional
 * }
 */

import { getCertificateImage, getAllAssets } from '@/lib/assetLoader';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // ISO date format: YYYY-MM-DD
  expiryDate?: string; // Optional expiry date
  credentialId?: string;
  credentialUrl: string;
  skills: string[];
  category: 'security' | 'cloud' | 'development' | 'design' | 'other';
  featured: boolean;
  totalCertificates?: number; // For certification tracks
  description?: string;
}

// Extended certification type with resolved badge URL
export interface CertificationWithBadge extends Certification {
  badgeUrl?: string;
}

// Helper to get year from ISO date
export const getYear = (isoDate: string): string => {
  return new Date(isoDate).getFullYear().toString();
};

// Helper to check if certification is expired
export const isExpired = (cert: Certification): boolean => {
  if (!cert.expiryDate) return false;
  return new Date(cert.expiryDate) < new Date();
};

// Helper to check if certification expires soon (within 90 days)
export const expiresSoon = (cert: Certification): boolean => {
  if (!cert.expiryDate) return false;
  const expiryDate = new Date(cert.expiryDate);
  const now = new Date();
  const daysUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return daysUntilExpiry > 0 && daysUntilExpiry <= 90;
};

// Get certifications by category
export const getCertificationsByCategory = (certs: Certification[], category: Certification['category']): Certification[] => {
  return certs.filter(c => c.category === category);
};

// Get featured certifications
export const getFeaturedCertifications = (certs: Certification[]): Certification[] => {
  return certs.filter(c => c.featured);
};

// Sort certifications by date (newest first)
export const sortByDate = (certs: Certification[]): Certification[] => {
  return [...certs].sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
};

/**
 * Get certification with auto-resolved badge URL
 * Badge is automatically loaded from src/assets/certificates/{id}.png
 */
export const getCertificationWithBadge = (cert: Certification): CertificationWithBadge => {
  return {
    ...cert,
    badgeUrl: getCertificateImage(cert.id),
  };
};

/**
 * Get all certifications with auto-resolved badge URLs
 */
export const getCertificationsWithBadges = (): CertificationWithBadge[] => {
  return certifications.map(getCertificationWithBadge);
};

/**
 * Get list of available certificate assets
 */
export const getAvailableCertificateAssets = () => {
  return getAllAssets('certificates');
};

/**
 * CERTIFICATIONS DATABASE
 * Add new certifications here following the Certification interface
 * Badge images are auto-loaded from src/assets/certificates/{id}.png
 */
export const certifications: Certification[] = [
  // === PALO ALTO NETWORKS ===
  {
    id: "paloalto-cybersecurity-practitioner",
    title: "Palo Alto Networks Certified Cybersecurity Practitioner",
    issuer: "Palo Alto Networks",
    issueDate: "2024-06-15",
    credentialUrl: "https://www.credly.com/badges/paloalto-cybersecurity",
    skills: ["Network security", "Cloud security", "Endpoint security", "Security operations", "Incident response"],
    category: "security",
    featured: true,
    totalCertificates: 6,
    description: "Comprehensive certification covering enterprise security operations and incident response.",
  },
  {
    id: "Cloud Security Fundamentals",
    title: "Cloud Security Fundamentals",
    issuer: "Palo Alto Networks",
    issueDate: "2024-05-01",
    credentialUrl: "https://www.credly.com/badges/paloalto-cloud-security",
    skills: ["Cloud security", "Security architecture", "Cloud compliance"],
    category: "security",
    featured: false,
  },
  {
    id: "Cybersecurity Fundamentals",
    title: "Cybersecurity Fundamentals",
    issuer: "Palo Alto Networks",
    issueDate: "2024-04-15",
    credentialUrl: "https://www.credly.com/badges/paloalto-cybersecurity-fundamentals",
    skills: ["Cybersecurity basics", "Threat landscape", "Security principles"],
    category: "security",
    featured: false,
  },
  {
    id: "Endpoint Security",
    title: "Endpoint Security",
    issuer: "Palo Alto Networks",
    issueDate: "2024-05-10",
    credentialUrl: "https://www.credly.com/badges/paloalto-endpoint",
    skills: ["Endpoint protection", "Malware prevention", "XDR"],
    category: "security",
    featured: false,
  },
  {
    id: "Network Security Fundamentals",
    title: "Network Security Fundamentals",
    issuer: "Palo Alto Networks",
    issueDate: "2024-04-20",
    credentialUrl: "https://www.credly.com/badges/paloalto-network-fundamentals",
    skills: ["Network security", "Firewall management", "Network segmentation"],
    category: "security",
    featured: false,
  },
  {
    id: "Security Operations Fundamentals",
    title: "Security Operations Fundamentals",
    issuer: "Palo Alto Networks",
    issueDate: "2024-05-05",
    credentialUrl: "https://www.credly.com/badges/paloalto-secops",
    skills: ["SOC operations", "Incident response", "Threat detection"],
    category: "security",
    featured: false,
  },
  {
    id: "Understanding Security Operations - Foundational",
    title: "Understanding Security Operations - Foundational",
    issuer: "Palo Alto Networks",
    issueDate: "2024-04-25",
    credentialUrl: "https://www.credly.com/badges/paloalto-secops-foundation",
    skills: ["Security operations", "SOC fundamentals", "Security monitoring"],
    category: "security",
    featured: false,
  },
  // === PALO ALTO NETWORK SECURITY ANALYST ===
  {
    id: "paloalto-network-security-analyst",
    title: "Palo Alto Networks Certified Network Security Analyst",
    issuer: "Palo Alto Networks",
    issueDate: "2024-05-20",
    credentialUrl: "https://www.credly.com/badges/paloalto-network-security",
    skills: ["PAN-OS administration", "Panorama management", "Traffic decryption", "Log analysis"],
    category: "security",
    featured: true,
    totalCertificates: 4,
  },
  {
    id: "Decryption - Features",
    title: "Decryption - Features",
    issuer: "Palo Alto Networks",
    issueDate: "2024-05-15",
    credentialUrl: "https://www.credly.com/badges/paloalto-decryption",
    skills: ["SSL/TLS decryption", "Traffic inspection", "Security analysis"],
    category: "security",
    featured: false,
  },
  {
    id: "PAN-OS ",
    title: "PAN-OS",
    issuer: "Palo Alto Networks",
    issueDate: "2024-05-12",
    credentialUrl: "https://www.credly.com/badges/paloalto-panos",
    skills: ["PAN-OS", "Firewall configuration", "Security policies"],
    category: "security",
    featured: false,
  },
  {
    id: "Panorama - Features",
    title: "Panorama - Features",
    issuer: "Palo Alto Networks",
    issueDate: "2024-05-18",
    credentialUrl: "https://www.credly.com/badges/paloalto-panorama",
    skills: ["Panorama", "Centralized management", "Policy deployment"],
    category: "security",
    featured: false,
  },
  {
    id: "Strata Logging Service - Features",
    title: "Strata Logging Service - Features",
    issuer: "Palo Alto Networks",
    issueDate: "2024-05-08",
    credentialUrl: "https://www.credly.com/badges/paloalto-strata-logging",
    skills: ["Log management", "Security analytics", "Strata Cloud"],
    category: "security",
    featured: false,
  },
  // === CISCO ===
  {
    id: "cisco-networking-cybersecurity",
    title: "Cisco Networking & Cybersecurity Track",
    issuer: "Cisco",
    issueDate: "2025-01-10",
    credentialUrl: "https://www.credly.com/badges/cisco-networking",
    skills: ["Networking fundamentals", "Cybersecurity", "Device configuration", "Protocol analysis"],
    category: "security",
    featured: true,
    totalCertificates: 3,
  },
  {
    id: "Certificate_Introduction to Cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issueDate: "2024-02-15",
    credentialUrl: "https://www.credly.com/badges/cisco-intro-cybersecurity",
    skills: ["Cybersecurity basics", "Threat awareness", "Security fundamentals"],
    category: "security",
    featured: false,
  },
  {
    id: "certificate_networking_basics",
    title: "Networking Basics",
    issuer: "Cisco",
    issueDate: "2024-01-20",
    credentialUrl: "https://www.credly.com/badges/cisco-networking-basics",
    skills: ["Networking fundamentals", "OSI model", "TCP/IP"],
    category: "development",
    featured: false,
  },
  {
    id: "certificate_networking_device_and_initial_conf",
    title: "Networking Device and Initial Configuration",
    issuer: "Cisco",
    issueDate: "2024-02-01",
    credentialUrl: "https://www.credly.com/badges/cisco-device-config",
    skills: ["Device configuration", "Router setup", "Switch configuration"],
    category: "development",
    featured: false,
  },
  // === CISA ===
  {
    id: "ICS 300 (CISA)",
    title: "ICS 300 (CISA)",
    issuer: "CISA",
    issueDate: "2024-03-20",
    credentialUrl: "https://www.cisa.gov/ics-training",
    skills: ["Advanced ICS security", "Critical infrastructure protection", "Risk management"],
    category: "security",
    featured: false,
  },
  {
    id: "210W-01 1 of 1",
    title: "ICS 210W - Intermediate ICS Security",
    issuer: "CISA",
    issueDate: "2024-03-15",
    credentialUrl: "https://www.cisa.gov/ics-training",
    skills: ["ICS security", "Industrial protocols", "Risk assessment"],
    category: "security",
    featured: false,
  },
  {
    id: "210W-02 1 of 1",
    title: "ICS 210W - Module 2",
    issuer: "CISA",
    issueDate: "2024-03-18",
    credentialUrl: "https://www.cisa.gov/ics-training",
    skills: ["ICS architecture", "Security controls", "Incident handling"],
    category: "security",
    featured: false,
  },
  {
    id: "210W-03 1 of 1",
    title: "ICS 210W - Module 3",
    issuer: "CISA",
    issueDate: "2024-03-22",
    credentialUrl: "https://www.cisa.gov/ics-training",
    skills: ["OT security", "Network segmentation", "Defense strategies"],
    category: "security",
    featured: false,
  },
  // === CLOUD & OTHER ===
  {
    id: "google-cloud-ai",
    title: "Google Cloud & AI Specialization",
    issuer: "Google Cloud",
    issueDate: "2023-08-15",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/srachetrai",
    skills: ["Cloud computing", "Machine learning", "AI/ML", "Generative AI", "Data processing"],
    category: "cloud",
    featured: true,
    totalCertificates: 12,
    description: "Comprehensive Google Cloud skills including AI/ML and data engineering.",
  },
  {
    id: "certificate-cato",
    title: "Cato Certified Associate (CCA)",
    issuer: "Cato Networks",
    issueDate: "2025-02-01",
    credentialUrl: "https://www.catonetworks.com/cato-academy/",
    skills: ["Secure network architecture", "Cloud security", "SASE platform"],
    category: "cloud",
    featured: false,
  },
  {
    id: "iitb-machine-learning",
    title: "Machine Learning",
    issuer: "IIT Bombay",
    issueDate: "2023-05-10",
    credentialUrl: "https://www.iitbombayx.in/certificates",
    skills: ["ML fundamentals", "Data analysis", "Model training", "Algorithm implementation"],
    category: "development",
    featured: false,
    description: "Machine learning fundamentals from IIT Bombay's online learning platform.",
  },
  // === RESEARCH & TEACHING ===
  {
    id: "Researcher_certificate",
    title: "Research Certification",
    issuer: "Academic Institution",
    issueDate: "2024-01-15",
    credentialUrl: "#",
    skills: ["Research methodology", "Academic writing", "Data analysis"],
    category: "other",
    featured: false,
  },
  {
    id: "Teaching_certificate",
    title: "Teaching Certification",
    issuer: "NIIT Foundation",
    issueDate: "2022-12-01",
    credentialUrl: "#",
    skills: ["Teaching", "Communication", "English language instruction"],
    category: "other",
    featured: false,
  },
  {
    id: "TEDxCertificate",
    title: "TEDx Design Core",
    issuer: "TEDxNIITUniversity",
    issueDate: "2024-06-01",
    credentialUrl: "#",
    skills: ["Event design", "Visual storytelling", "Creative direction"],
    category: "design",
    featured: false,
  },
  // === siNU Certificates ===
  {
    id: "sinu_digital",
    title: "siNU Digital Certificate",
    issuer: "NIIT University",
    issueDate: "2023-11-15",
    credentialUrl: "#",
    skills: ["Digital skills", "Technology fundamentals"],
    category: "development",
    featured: false,
  },
  {
    id: "sinu_tech",
    title: "siNU Tech Certificate",
    issuer: "NIIT University",
    issueDate: "2023-11-20",
    credentialUrl: "#",
    skills: ["Technical skills", "Problem solving"],
    category: "development",
    featured: false,
  },
  {
    id: "Certificate",
    title: "General Certificate",
    issuer: "Various",
    issueDate: "2023-06-01",
    credentialUrl: "#",
    skills: ["Professional development"],
    category: "other",
    featured: false,
  },
];

// Category display names and colors
export const categoryConfig = {
  security: { 
    label: "Security", 
    color: "highlight-1",
    icon: "Shield"
  },
  cloud: { 
    label: "Cloud", 
    color: "highlight-2",
    icon: "Cloud"
  },
  development: { 
    label: "Development", 
    color: "highlight-3",
    icon: "Code"
  },
  design: { 
    label: "Design", 
    color: "highlight-4",
    icon: "Palette"
  },
  other: { 
    label: "Other", 
    color: "muted",
    icon: "Award"
  },
};