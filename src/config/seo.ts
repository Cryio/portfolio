// SEO Configuration for Srachet Rai Portfolio
// This file contains all SEO-related constants and configurations

export const seoConfig = {
  // Primary Site Information
  siteUrl: "https://srachetrai.dev",
  siteName: "Srachet Rai - Portfolio",
  siteDescription: "Explore the portfolio of Srachet Rai, a cybersecurity enthusiast and BTech CSE graduate. Specializing in penetration testing, vulnerability assessment, and secure coding practices.",
  
  // Personal Information
  author: {
    name: "Srachet Rai",
    email: "contact@srachetrai.dev",
    bio: "Cybersecurity Specialist & Web Developer",
  },

  // Social Media
  social: {
    twitter: {
      handle: "@srachetrai",
      id: "srachetrai",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/srachetrai",
      handle: "srachetrai",
    },
    github: {
      url: "https://github.com/srachetrai",
      handle: "srachetrai",
    },
  },

  // Keywords
  keywords: [
    "Cybersecurity",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Web Development",
    "Security Analyst",
    "Ethical Hacking",
    "DevSecOps",
    "Cloud Security",
    "Incident Response",
    "Portfolio",
    "Srachet Rai",
  ],

  // Open Graph & Meta Images
  images: {
    og: "https://srachetrai.dev/og-image.png",
    ogSquare: "https://srachetrai.dev/og-image-square.png",
    favicon: "https://srachetrai.dev/assets/favicon.ico",
  },

  // Page-specific metadata
  pages: {
    home: {
      title: "Srachet Rai - Cybersecurity Specialist & Web Developer Portfolio",
      description: "Explore the portfolio of Srachet Rai, a cybersecurity enthusiast and BTech CSE graduate. Specializing in penetration testing, vulnerability assessment, and secure coding practices.",
      slug: "/",
      priority: 1,
      changeFrequency: "weekly",
    },
    about: {
      title: "About Srachet Rai - Cybersecurity Specialist",
      description: "Learn more about Srachet Rai's background, skills, and experience in cybersecurity and web development.",
      slug: "/about",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    projects: {
      title: "Projects - Srachet Rai",
      description: "Explore Srachet Rai's cybersecurity and web development projects.",
      slug: "/projects",
      priority: 0.85,
      changeFrequency: "weekly",
    },
    certifications: {
      title: "Certifications - Srachet Rai",
      description: "View Srachet Rai's professional certifications in cybersecurity and technology.",
      slug: "/certifications",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    blogs: {
      title: "Blog - Srachet Rai",
      description: "Read articles and insights on cybersecurity, ethical hacking, and web development.",
      slug: "/blogs",
      priority: 0.8,
      changeFrequency: "weekly",
    },
    roles: {
      title: "Roles & Experience - Srachet Rai",
      description: "Discover Srachet Rai's professional roles and leadership experience.",
      slug: "/roles",
      priority: 0.7,
      changeFrequency: "monthly",
    },
  },

  // JSON-LD Schema.org Data
  schema: {
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Srachet Rai",
      url: "https://srachetrai.dev",
      image: "https://srachetrai.dev/og-image-square.png",
      description: "Cybersecurity Specialist & Web Developer",
      jobTitle: "Cybersecurity Enthusiast & BTech CSE",
      email: "contact@srachetrai.dev",
      sameAs: [
        "https://www.linkedin.com/in/srachetrai",
        "https://github.com/srachetrai",
        "https://twitter.com/srachetrai",
      ],
      knowsAbout: [
        "Cybersecurity",
        "Penetration Testing",
        "Web Development",
        "Ethical Hacking",
        "Vulnerability Assessment",
        "DevSecOps",
        "Cloud Security",
        "Incident Response",
      ],
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Srachet Rai - Portfolio",
      url: "https://srachetrai.dev",
      description: "Cybersecurity Specialist & Web Developer Portfolio",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://srachetrai.dev/search?q={search_term_string}",
        },
        query_input: "required name=search_term_string",
      },
    },
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default seoConfig;
