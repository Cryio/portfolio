import { technologyLogos } from "./technologies";

export const portfolioData = {
  // Basic Information
  name: "Srachet Rai",
  title: "Cybersecurity Enthusiast & BTech CSE",
  
  // Descriptions
  description: "A passionate cybersecurity enthusiast and creative designer with a strong foundation in computer science. Experienced in penetration testing, vulnerability assessment, and secure coding practices.",
  
  aboutDescription: `
    I am a Cybersecurity Enthusiast with a solid foundation in web development and ethical hacking. 
    As a Computer Science student, I am dedicated to securing digital infrastructures and addressing 
    emerging cyber threats.

    I have contributed to impactful projects—including developing a mobile application that tackles 
    real-world health challenges—and earned certifications in Ethical Hacking and Machine Learning. 
    My goal is to deliver innovative, practical solutions that blend creativity with technical expertise.

    In my leadership roles with the Google Developers Student Club and TEDxNIITUniversity, I drive 
    innovation and leverage my animation skills to craft immersive user experiences.
  `,

  // Technology Categories
  technologies: [
    {
      title: "Programming Languages & Tools",
      items: [
        {
          name: "Python",
          logo: technologyLogos.python,
          alt: "Python",
          description: "Security tools, automation, and data analysis"
        },
        {
          name: "JavaScript",
          logo: technologyLogos.javascript,
          alt: "JavaScript",
          description: "Web development and client-side security"
        },
        {
          name: "Java",
          logo: technologyLogos.java,
          alt: "Java",
          description: "Enterprise applications and Android security"
        },
        {
          name: "Docker",
          logo: technologyLogos.docker,
          alt: "Docker",
          description: "Containerization and secure deployment"
        },
        {
          name: "Podman",
          logo: technologyLogos.podman,
          alt: "Podman",
          description: "Rootless container management"
        },
        {
          name: "QEMU",
          logo: technologyLogos.qemu,
          alt: "QEMU",
          description: "System emulation and virtualization"
        },
        {
          name: "Flutter",
          logo: technologyLogos.flutter,
          alt: "Flutter",
          description: "Cross-platform mobile development"
        },
        {
          name: "HTML5",
          logo: technologyLogos.html5,
          alt: "HTML5",
          description: "Semantic web structure and accessibility"
        },
        {
          name: "CSS3",
          logo: technologyLogos.css3,
          alt: "CSS3",
          description: "Responsive design and animations"
        },
        {
          name: "React",
          logo: technologyLogos.react,
          alt: "React",
          description: "Component-based UI development"
        },
        {
          name: "Git",
          logo: technologyLogos.git,
          alt: "Git",
          description: "Version control and collaboration"
        },
        {
          name: "Node.js",
          logo: technologyLogos.nodejs,
          alt: "Node.js",
          description: "Server-side JavaScript runtime"
        },
        {
          name: "MongoDB",
          logo: technologyLogos.mongodb,
          alt: "MongoDB",
          description: "NoSQL database management"
        },
        {
          name: "Express",
          logo: technologyLogos.express,
          alt: "Express.js",
          darkLogo: technologyLogos.expressDark,
          description: "Web application framework"
        },
        {
          name: "MySQL",
          logo: technologyLogos.mysql,
          alt: "MySQL",
          description: "Relational database management"
        }
      ]
    },
    {
      title: "Creative Tools",
      items: [
        {
          name: "Blender",
          logo: technologyLogos.blender,
          alt: "Blender",
          description: "3D modeling and animation"
        },
        {
          name: "Adobe Photoshop",
          logo: technologyLogos.photoshop,
          alt: "Adobe Photoshop",
          description: "Digital image editing and manipulation",
          darkLogo: technologyLogos.photoshopDark
        },
        {
          name: "Adobe Illustrator",
          logo: technologyLogos.illustrator,
          alt: "Adobe Illustrator",
          description: "Vector graphics and illustrations"
        },
        {
          name: "Figma",
          logo: technologyLogos.figma,
          alt: "Figma",
          description: "UI/UX design and prototyping"
        },
        {
          name: "Unreal Engine",
          logo: technologyLogos.unreal,
          alt: "Unreal Engine",
          description: "Game development and visualization",
          darkLogo: technologyLogos.unrealDark
        }
      ]
    },
    {
      title: "Other Familiar Technologies",
      items: [
        {
          name: "Lua",
          logo: technologyLogos.lua,
          alt: "Lua",
          description: "Scripting and game development"
        },
        {
          name: "Apache",
          logo: technologyLogos.apache,
          alt: "Apache",
          description: "Web server and security"
        },
        {
          name: "GitHub",
          logo: technologyLogos.github,
          alt: "GitHub",
          darkLogo: technologyLogos.githubDark,
          description: "Code hosting and collaboration"
        },
        {
          name: "VirtualBox",
          logo: technologyLogos.virtualbox,
          alt: "VirtualBox",
          description: "Virtual machine management"
        },
        {
          name: "Jenkins",
          logo: technologyLogos.jenkins,
          alt: "Jenkins",
          description: "CI/CD pipeline automation"
        }
      ]
    }
  ],

  // Professional Experience
  experiences: [
    {
      title: "Junior Web Designer",
      company: "Maa Karma Global Engineering LLP",
      location: "Remote",
      period: "2023",
      description: [
        "Designed and developed web interfaces in a remote internship",
        "Implemented user-centered design principles",
        "Created responsive and accessible web solutions"
      ],
      technologies: ["Web Development", "Frontend Design", "CSS", "UI/UX", "Graphic Design", "User-Centered Design"]
    },
    {
      title: "English Language Instructor",
      company: "NIIT Foundation",
      location: "Career Development Center, Mokhada",
      period: "28 Oct 2022 - 14 Dec 2022",
      description: [
        "Conducted English language training for job readiness programs at the Career Development Center",
        "Completed dedicated volunteering tenure over a 6-week period",
        "Provided personalized guidance to enhance students' career advancement prospects",
        "Received recognition for diligent and proactive teaching approach",
        "Contributed to the Foundation's mission of empowering students through language skills"
      ],
      technologies: ["English Language Training", "Career Development", "Teaching", "Mentoring", "Volunteer Work"]
    },
    {
      title: "Design Core",
      company: "TEDxNIITUniversity",
      location: "Neemrana, Rajasthan",
      period: "2023 - 2024",
      description: [
        "Worked on visual storytelling and creative direction for TEDx events",
        "Developed 3D designs and graphics for event branding",
        "Managed public speaking aesthetics and event visuals"
      ],
      technologies: ["3D Design", "Graphic Design", "Event Branding", "Creative Direction", "Public Speaking Aesthetics"]
    },
    {
      title: "Design Lead",
      company: "Google Developers Student Club - NIIT University",
      location: "Neemrana, Rajasthan",
      period: "2023 - 2024",
      description: [
        "Led the design team, focusing on branding, graphics, and community engagement",
        "Developed and implemented UI/UX strategies for club projects",
        "Managed creative direction for club events and initiatives"
      ],
      technologies: ["UI/UX", "Graphic Design", "Branding", "Leadership", "Community Engagement", "CSS", "Mass Media"]
    }
  ],

  // Projects
  projects: [
    {
      title: "Wifi-CSI Based Activity Recognition",
      description: "Developed a machine learning model using WiFi Channel State Information (CSI) to recognize human activities. The system processes CSI data to detect and classify different human movements with high accuracy.",
      image: "/assets/projects/wifi-csi.png",
      technologies: ["Python", "TensorFlow", "NumPy", "Pandas"],
      github: "https://github.com/Cryio/Wifi-CSI-Based-Activity-Recognition",
      type: "research"
    },
    {
      title: "TinyLinux",
      description: "Created a minimalist Linux distribution from scratch, focusing on security and performance. Implemented custom kernel configurations and security hardening measures.",
      image: "/assets/projects/tinylinux.png",
      technologies: ["C", "Assembly", "Linux", "Shell"],
      github: "https://github.com/Cryio/TinyLinux",
      type: "system"
    },
    {
      title: "TCPIP Synergy",
      description: "A comprehensive networking toolkit implementing TCP/IP protocols from scratch. Features include packet analysis, network diagnostics, and custom protocol implementations for embedded systems and IoT devices.",
      image: "/assets/projects/tcpip.jpg",
      technologies: ["C++", "Networking", "TCP/IP", "Embedded Systems"],
      github: "https://github.com/Cryio/tcpip-synergy",
      type: "Networking",
      period: "Jan 2024 - Mar 2024"
    },
    {
      title: "Healthmate Zen Garden",
      description: "A wellness application combining meditation tracking, health monitoring, and virtual zen garden cultivation. Features include guided meditation sessions, health metrics visualization, and an interactive garden that grows based on user's meditation progress.",
      image: "/assets/projects/healthmate.jpg",
      technologies: ["React Native", "Node.js", "MongoDB", "WebGL"],
      github: "https://github.com/Cryio/healthmate-zen",
      type: "Mobile App",
      period: "Nov 2023 - Jan 2024"
    }
  ],

  // Certifications organized by learning paths
  certificationPaths: [
    {
      title: "Palo Alto Networks Certified Cybersecurity Practitioner",
      issuer: "Palo Alto Networks",
      description: "Comprehensive cybersecurity practitioner certification covering cloud security, endpoint security, network security fundamentals, and security operations.",
      completionDate: "2024",
      totalCertificates: 6,
      skills: ["Network security", "Cloud security", "Endpoint security", "Security operations", "Incident response", "Threat detection"],
      certificates: [
        {
          title: "Cloud Security Fundamentals",
          date: "2024",
          description: "Foundational knowledge of cloud security principles and best practices.",
          skills: ["Cloud security principles", "Cloud architecture", "Security controls", "Risk management"],
          credentialUrl: "certificates/Palo Alto Networks Certified Cybersecurity Practitioner/Cloud Security Fundamentals.png"
        },
        {
          title: "Cybersecurity Fundamentals",
          date: "2024",
          description: "Core cybersecurity concepts and threat landscape understanding.",
          skills: ["Cybersecurity basics", "Threat landscape", "Security frameworks", "Risk assessment"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Cybersecurity Practitioner/Cybersecurity Fundamentals.png"
        },
        {
          title: "Endpoint Security",
          date: "2024",
          description: "Protection strategies for endpoints including detection and response techniques.",
          skills: ["Endpoint protection", "Malware detection", "Incident response", "Threat hunting"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Cybersecurity Practitioner/Endpoint Security.png"
        },
        {
          title: "Network Security Fundamentals",
          date: "2024",
          description: "Network security principles, firewalls, and intrusion prevention systems.",
          skills: ["Network security", "Firewall management", "IPS/IDS", "Network monitoring"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Cybersecurity Practitioner/Network Security Fundamentals.png"
        },
        {
          title: "Security Operations Fundamentals",
          date: "2024",
          description: "Security operations center processes and incident management.",
          skills: ["SOC operations", "Incident management", "Security monitoring", "Threat analysis"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Cybersecurity Practitioner/Security Operations Fundamentals.png"
        },
        {
          title: "Understanding Security Operations - Foundational",
          date: "2024",
          description: "Foundational understanding of security operations and best practices.",
          skills: ["Security operations", "Best practices", "Process management", "Team coordination"],
          credentialUrl: "/certificate/Palo Alto Networks Certified Cybersecurity Practitioner//Understanding Security Operations - Foundational.png"
        }
      ]
    },
    {
      title: "Palo Alto Networks Certified Network Security Analyst",
      issuer: "Palo Alto Networks",
      description: "Advanced network security analyst certification focusing on PAN-OS, Panorama management, and security services.",
      completionDate: "2024",
      totalCertificates: 4,
      skills: ["PAN-OS administration", "Panorama management", "Traffic decryption", "Log analysis", "Security policy management"],
      certificates: [
        {
          title: "Decryption - Features",
          date: "2024",
          description: "Advanced traffic decryption and SSL inspection techniques.",
          skills: ["SSL decryption", "Traffic inspection", "Certificate management", "Security policies"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Network Security Analyst/Decryption - Features.png"
        },
        {
          title: "PAN-OS",
          date: "2024",
          description: "Comprehensive PAN-OS administration and configuration.",
          skills: ["PAN-OS administration", "Firewall configuration", "Policy management", "System maintenance"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Network Security Analyst/PAN-OS .png"
        },
        {
          title: "Panorama - Features",
          date: "2024",
          description: "Centralized management using Panorama for multiple firewalls.",
          skills: ["Panorama management", "Centralized policies", "Device monitoring", "Template management"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Network Security Analyst/Panorama - Features.png"
        },
        {
          title: "Strata Logging Service - Features",
          date: "2024",
          description: "Cloud-based logging and analysis service for enhanced security insights.",
          skills: ["Cloud logging", "Log analysis", "Security insights", "Threat intelligence"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Network Security Analyst/Strata Logging Service - Features.png"
        }
      ]
    },
    {
      title: "Cisco Networking & Cybersecurity Track",
      issuer: "Cisco",
      description: "Comprehensive networking and cybersecurity foundation from Cisco NetAcad",
      completionDate: "Apr 2025",
      totalCertificates: 3,
      skills: ["Networking fundamentals", "Cybersecurity", "Device configuration", "Protocol analysis", "Cisco technologies"],
      certificates: [
        {
          title: "Introduction to Cybersecurity",
          date: "Apr 2025",
          description: "Explore the exciting field of cybersecurity and why cybersecurity is a future-proof career.",
          skills: ["Cybersecurity fundamentals", "Security threats", "Risk management", "Security principles"],
          credentialUrl: "/certificates/Certificate_Introduction to Cybersecurity.jpg"
        },
        {
          title: "Networking Basics",
          date: "Apr 2025", 
          description: "Comprehensive understanding of network devices and protocols, data flow analysis, device configuration, and network troubleshooting.",
          skills: ["Network protocols", "Network devices", "Data flow analysis", "Network troubleshooting"],
          credentialUrl: "/certificates/certificate_networking_basics.jpg"
        },
        {
          title: "Networking Devices and Initial Configuration",
          date: "Apr 2025",
          description: "Mastery in cloud and virtualization benefits, IP addressing schemes, Cisco device configuration, connectivity testing, and Cisco Packet Tracer proficiency.",
          skills: ["Cisco device configuration", "IP addressing", "Cisco Packet Tracer", "Network connectivity"],
          credentialUrl: "/certificates/certificate_networking_device_and_initial_conf.jpg"
        }
      ]
    },
    {
      title: "Google Cloud & AI Specialization",
      issuer: "Google Cloud",
      description: "Comprehensive Google Cloud Platform expertise with focus on AI/ML and infrastructure management",
      completionDate: "2023",
      totalCertificates: 12,
      skills: ["Cloud computing", "Machine learning", "AI/ML", "Infrastructure management", "Generative AI", "Data processing"],
      certificates: [
        {
          title: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
          date: "2023",
          skills: ["Cloud computing fundamentals", "Google Cloud Platform", "Cloud services", "Infrastructure basics"],
          credentialId: "5567418",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5567418"
        },
        {
          title: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
          date: "2023",
          skills: ["Cloud infrastructure", "Virtual machines", "Networking", "Storage solutions"],
          credentialId: "5571191",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5571191"
        },
        {
          title: "Google Cloud Computing Foundations: Networking",
          date: "2023",
          skills: ["Cloud networking", "VPC", "Load balancing", "Network security"],
          credentialId: "5572287",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5572287"
        },
        {
          title: "Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud",
          date: "2023",
          skills: ["Data processing", "Machine learning", "AI services", "BigQuery"],
          credentialId: "5573816",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5573816"
        },
        {
          title: "Create and Manage Cloud Resources",
          date: "2023",
          skills: ["Resource management", "Cloud deployment", "Service configuration", "Monitoring"],
          credentialId: "5574243",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5574243"
        },
        {
          title: "Perform Foundational Infrastructure Tasks in Google Cloud",
          date: "2023",
          skills: ["Infrastructure automation", "Cloud Shell", "Compute Engine", "Cloud Storage"],
          credentialId: "5574788",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5574788"
        },
        {
          title: "Perform Foundational Data, ML, and AI Tasks in Google Cloud",
          date: "2023",
          skills: ["Data analysis", "ML model training", "AI APIs", "Data visualization"],
          credentialId: "5575600",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5575600"
        },
        {
          title: "Introduction to Generative AI",
          date: "2023",
          skills: ["Generative AI concepts", "AI applications", "Machine learning basics", "AI ethics"],
          credentialId: "5615143",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5615143"
        },
        {
          title: "Introduction to Large Language Models",
          date: "2023",
          skills: ["Large language models", "Natural language processing", "AI text generation", "Model architecture"],
          credentialId: "5615359",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5615359"
        },
        {
          title: "Introduction to Responsible AI",
          date: "2023",
          skills: ["AI ethics", "Responsible AI practices", "Bias mitigation", "AI governance"],
          credentialId: "5615469",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5615469"
        },
        {
          title: "Generative AI Fundamentals",
          date: "2023",
          skills: ["Generative AI fundamentals", "AI model types", "Content generation", "AI applications"],
          credentialId: "5615591",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5615591"
        },
        {
          title: "Level 3 GenAI: Prompt Engineering",
          date: "2023",
          skills: ["Prompt engineering", "AI prompt optimization", "Content generation", "AI interaction design"],
          credentialId: "5576903",
          credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5576903"
        }
      ]
    },
    {
      title: "Ethical Hacking & Penetration Testing Track",
      issuer: "Udemy",
      description: "Comprehensive ethical hacking education from fundamentals to advanced techniques",
      completionDate: "2021",
      totalCertificates: 3,
      skills: ["Ethical hacking", "Penetration testing", "Kali Linux", "Security assessment", "Vulnerability analysis"],
      certificates: [
        {
          title: "Learn Hacking From Scratch",
          date: "2021",
          skills: ["Ethical hacking fundamentals", "Security testing", "Vulnerability assessment", "Penetration testing basics"],
          credentialId: "UC-718ea92c-6082-4ce1-899e-3b04d94db66b",
          credentialUrl: "https://www.ude.my/UC-718ea92c-6082-4ce1-899e-3b04d94db66b/"
        },
        {
          title: "Start Kali Linux, Ethical Hacking and Penetration Testing!",
          date: "2021",
          skills: ["Kali Linux", "Security tools", "Network penetration", "System exploitation"],
          credentialId: "UC-c9a71c15-f501-42d7-898f-5100487f1fa7",
          credentialUrl: "https://www.ude.my/UC-c9a71c15-f501-42d7-898f-51004871f1a7"
        },
        {
          title: "Learn Ethical Hacking By Hacking Real Websites Legally",
          date: "2021",
          skills: ["Web application security", "Legal hacking", "Web vulnerabilities", "Security assessment"],
          credentialId: "UC-4a138727-9b8e-4d45-a9fd-667a7113b1b3",
          credentialUrl: "https://www.ude.my/UC-4a138727-9b8e-4d45-a9fd-667a7113b1b3/"
        }
      ]
    },
    {
      title: "Industrial Control Systems (ICS) Security",
      issuer: "CISA (Cybersecurity and Infrastructure Security Agency)",
      description: "Specialized training in Industrial Control Systems cybersecurity",
      completionDate: "2024",
      totalCertificates: 3,
      skills: ["ICS security", "Industrial protocols", "Critical infrastructure", "IT/OT convergence", "SCADA systems"],
      certificates: [
        {
          title: "Differences in Deployments of Industrial Control Systems (210W-01)",
          date: "2024",
          skills: ["ICS deployment models", "Industrial network architecture", "Control system design", "System integration"],
          credentialUrl: "/certificates/210W-01 1 of 1.png"
        },
        {
          title: "Influence of IT Components on Industrial Control Systems (210W-02)",
          date: "2024",
          skills: ["IT/OT convergence", "Industrial cybersecurity", "Network segmentation", "Risk assessment"],
          credentialUrl: "/certificates/210W-02 1 of 1.png"
        },
        {
          title: "Common ICS Components (210W-03)",
          date: "2024",
          skills: ["SCADA systems", "PLC programming", "HMI design", "Industrial protocols"],
          credentialUrl: "/certificates/210W-03 1 of 1.png"
        }
      ]
    }
  ],

  // Individual/Standalone Certifications
  individualCertifications: [
    {
      title: "ICS 300 (CISA)",
      issuer: "CISA (Cybersecurity and Infrastructure Security Agency)",
      date: "2024",
      description: "Advanced Industrial Control Systems security training focusing on comprehensive ICS security practices.",
      skills: ["Advanced ICS security", "Critical infrastructure protection", "Security assessment", "Risk management"],
      credentialUrl: "/certificates/ICS 300 (CISA).png"
    },
    {
      title: "Cato Certified Associate (CCA)",
      issuer: "Cato Networks",
      date: "July 22, 2025",
      description: "Successfully completed the Cato Certified Associate (CCA) course, demonstrating foundational knowledge in secure network architecture, cloud security, and the Cato SASE platform.",
      skills: ["Secure network architecture", "Cloud security", "SASE platform", "Network fundamentals"],
      credentialUrl: "/certificates/certificate-cato.png"
    },
    {
      title: "Machine Learning",
      issuer: "Indian Institute of Technology, Bombay",
      date: "2023",
      description: "Comprehensive training in machine learning concepts and practical applications.",
      skills: ["Machine learning fundamentals", "Data analysis", "Model training", "Algorithm implementation"],
      credentialUrl: "/certificates/Certificate.png"
    },
    {
      title: "Python",
      issuer: "Udemy",
      date: "2024",
      description: "Python programming fundamentals and advanced concepts for beginners.",
      skills: ["Python programming", "Data structures", "Algorithms", "Web development"],
      credentialId: "UC-279c235e-f1e0-44b4-8cba-d3053bfe8027",
      credentialUrl: "https://www.ude.my/UC-279c235e-f1e0-44b4-8cba-d3053bfe8027/"
    },
    {
      title: "Introduction to Blender",
      issuer: "Udemy",
      date: "2024",
      description: "Comprehensive training in Blender fundamentals and 3D modeling basics.",
      skills: ["3D modeling", "Animation", "Rendering", "Blender fundamentals"],
      credentialId: "UC-b2df5c82-4b15-4ca9-937c-68f95487b621",
      credentialUrl: "https://www.ude.my/UC-b2df5c82-4b15-4ca9-937c-68f95487b621/"
    }
  ],

  // Achievement & Recognition Certificates
  achievements: [
    {
      title: "Design Core",
      issuer: "TEDxNIITUniversity",
      date: "2024",
      description: "Leadership and digital design expertise in TEDx event organization.",
      skills: ["Digital design", "Leadership", "Event organization", "Creative direction"],
      credentialUrl: "/certificates/TEDxCertificate.png"
    },
    {
      title: "Learners' Premier League - Best Researcher",
      issuer: "NIIT University",
      date: "2023",
      description: "Certificate of achievement presented as Best Researcher in Learners' Premier League 2022.",
      skills: ["Research skills", "Analytical thinking", "Presentation skills", "Team collaboration"],
      credentialUrl: "/certificates/Researcher_certificate.jpg"
    },
    {
      title: "English Tutoring for Job Training",
      issuer: "NIIT Foundation",
      date: "2022",
      description: "Certificate of Appreciation for volunteering efforts to provide tutoring for English for Job Training to NIIT Foundation students.",
      skills: ["Tutoring", "Communication skills", "Mentoring", "Volunteer work"],
      credentialUrl: "/certificates/Teaching_certificate.jpg"
    },
    {
      title: "Digital Design",
      issuer: "siNUsoid",
      date: "2022",
      description: "Expertise in digital design principles and practices.",
      skills: ["Digital design", "Graphic design", "Creative thinking", "Software proficiency"],
      credentialUrl: "/certificates/sinu_design.jpg"
    },
    {
      title: "Tech Team Volunteer",
      issuer: "siNUsoid",
      date: "2022",
      description: "Technical contribution using CSS, GitHub, and HTML.",
      skills: ["Web development", "Collaboration", "Technical skills", "Problem-solving"],
      credentialUrl: "/certificates/sinu_tech.jpg"
    }
  ],

  // Contact Information
  contact: {
    email: "srachetrai@gmail.com",
    github: "https://github.com/Cryio",
    linkedin: "https://linkedin.com/in/srachetrai"
  }
};

// Helper function to get all certifications with proper typing
export const getAllCertifications = () => {
  const allCerts = [
    // Flatten certification paths
    ...portfolioData.certificationPaths.flatMap(path => 
      path.certificates.map(cert => ({
        ...cert,
        issuer: path.issuer,
        skills: cert.skills || path.skills,
        type: 'path' as const
      }))
    ),
    // Add individual certifications
    ...portfolioData.individualCertifications.map(cert => ({
      ...cert,
      type: 'individual' as const
    })),
    // Add achievements
    ...portfolioData.achievements.map(cert => ({
      ...cert,
      type: 'achievement' as const
    }))
  ];
  
  return allCerts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
