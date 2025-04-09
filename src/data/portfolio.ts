import { PortfolioData } from "../types";
import { technologyLogos } from "./technologies";

export const portfolioData: PortfolioData = {
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
    innovation and leverage my animation skills to craft immersive user experiences. Welcome to my portfolio.
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
    },
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

  // Certifications
  certifications: [
    {
      title: "Networking Devices and Initial Configuration",
      issuer: "Cisco",
      date: "Apr, 2025",
      description: "Mastery in cloud and virtualization benefits, IP addressing schemes, Cisco device configuration, connectivity testing, and Cisco Packet Tracer proficiency.",
      skills: ["Cloud and virtualization", "IP addressing", "Cisco device configuration", "Connectivity testing", "Cisco Packet Tracer"],
      credentialUrl: "/certificates/Certificate_Networking Devices and Initial Configuration.jpg"
    },
    {
      title: "Networking Basics",
      issuer: "Cisco",
      date: "Apr, 2025",
      description: "Comprehensive understanding of network devices and protocols, data flow analysis, device configuration, and network troubleshooting.",
      skills: ["Network devices", "Protocols", "Data flow analysis", "Device configuration", "Network troubleshooting"],
      credentialUrl: "/certificates/Certificate_Networking Basics.jpg"
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "Apr, 2025",
      description: "Explore the exciting field of cybersecurity and why cybersecurity is a future-proof career.",
      skills: ["Cybersecurity fundamentals", "Threat analysis", "Risk management", "Secure coding practices"],
      credentialUrl: "/certificates/Certificate_Introduction to Cybersecurity.jpg"
    },
    {
      title: "Introduction to Blender",
      issuer: "Udemy",
      date: "2024",
      description: "Comprehensive training in Blender fundamentals and 3D modeling basics.",
      skills: ["3D modeling", "Animation", "Rendering", "Blender fundamentals"],
      credentialId: "UC-b2df5c82-4b15-4ca9-937c-68f95487b621",
      credentialUrl: "https://www.ude.my/UC-b2df5c82-4b15-4ca9-937c-68f95487b621/"
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
      title: "Design Core",
      issuer: "TEDxNIITUniversity",
      date: "2024",
      description: "Leadership and digital design expertise in TEDx event organization.",
      skills: ["Digital design", "Leadership", "Event organization", "Creative direction"],
      credentialUrl: "/certificates/TEDxCertificate.png"
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
      title: "Create and Manage Cloud Resources",
      issuer: "Google",
      date: "2023",
      description: "Expertise in creating and managing resources in Google Cloud Platform (GCP).",
      skills: ["Cloud resource management", "GCP services", "Infrastructure setup", "Cost management"],
      credentialId: "5574243",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5574243"
    },
    {
      title: "Generative AI Fundamentals",
      issuer: "Google",
      date: "2023",
      description: "Core concepts and applications of Generative AI technologies.",
      skills: ["Generative AI concepts", "Model training", "AI applications", "Ethical considerations"],
      credentialId: "5615591",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5615591"
    },
    {
      title: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
      issuer: "Google",
      date: "2023",
      description: "Foundational knowledge of cloud computing concepts and Google Cloud Platform.",
      skills: ["Cloud computing fundamentals", "GCP architecture", "Service models", "Deployment strategies"],
      credentialId: "5567418",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5567418"
    },
    {
      title: "Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud",
      issuer: "Google",
      date: "2023",
      description: "Understanding of data processing, machine learning, and AI services in GCP.",
      skills: ["Data processing", "Machine learning services", "AI tools", "GCP integration"],
      credentialId: "5573816",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5573816"
    },
    {
      title: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
      issuer: "Google",
      date: "2023",
      description: "Deep dive into GCP infrastructure services and best practices.",
      skills: ["Infrastructure management", "GCP services", "Best practices", "Security measures"],
      credentialId: "5571191",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5571191"
    },
    {
      title: "Google Cloud Computing Foundations: Networking",
      issuer: "Google",
      date: "2023",
      description: "Comprehensive understanding of networking concepts in Google Cloud.",
      skills: ["Networking fundamentals", "GCP networking", "Security protocols", "Network design"],
      credentialId: "5572287",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5572287"
    },
    {
      title: "Introduction to Generative AI",
      issuer: "Google",
      date: "2023",
      description: "Introduction to generative AI concepts and applications.",
      skills: ["Generative AI", "Model training", "Applications", "Ethical considerations"],
      credentialId: "5615591",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5615143"
    },
    {
      title: "Introduction to Large Language Models",
      issuer: "Google",
      date: "2023",
      description: "Understanding of large language models and their applications.",
      skills: ["Language models", "Natural language processing", "Applications", "Model training"],
      credentialId: "5615359",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5615359"
    },
    {
      title: "Introduction to Responsible AI",
      issuer: "Google",
      date: "2023",
      description: "Ethical considerations and responsible practices in AI development.",
      skills: ["Ethical AI", "Responsible practices", "AI governance", "Bias mitigation"],
      credentialId: "5615469",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5615469"
    },
    {
      title: "Level 3 GenAI: Prompt Engineering",
      issuer: "Google",
      date: "2023",
      description: "Advanced techniques in prompt engineering for generative AI models.",
      skills: ["Prompt engineering", "Generative AI", "Model optimization", "Use case development"],
      credentialId: "5576903",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5576903"
    },
    {
      title: "Perform Foundational Data, ML, and AI Tasks in Google Cloud",
      issuer: "Google",
      date: "2023",
      description: "Practical implementation of ML and AI tasks in Google Cloud Platform.",
      skills: ["Data tasks", "Machine learning", "AI implementation", "GCP tools"],
      credentialId: "5575600",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5575600"
    },
    {
      title: "Perform Foundational Infrastructure Tasks in Google Cloud",
      issuer: "Google",
      date: "2023",
      description: "Hands-on experience with GCP infrastructure management.",
      skills: ["Infrastructure tasks", "GCP management", "Best practices", "Resource allocation"],
      credentialId: "5574788",
      credentialUrl: "https://www.cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2/badges/5574788"
    },
    {
      title: "Learners' Premier League",
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
      title: "Tech Team volunteer",
      issuer: "siNUsoid",
      date: "2022",
      description: "Technical contribution using CSS, GitHub, and HTML.",
      skills: ["Web development", "Collaboration", "Technical skills", "Problem-solving"],
      credentialUrl: "/certificates/sinu_tech.jpg"
    },
    {
      title: "Learn Ethical Hacking By Hacking Real Websites Legally",
      issuer: "Udemy",
      date: "2021",
      description: "Practical ethical hacking techniques and methodologies.",
      skills: ["Ethical hacking", "Penetration testing", "Security assessment", "Vulnerability analysis"],
      credentialId: "UC-4a138727-9b8e-4d45-a9fd-667a7113b1b3",
      credentialUrl: "https://www.ude.my/UC-4a138727-9b8e-4d45-a9fd-667a7113b1b3/"
    },
    {
      title: "Learn Hacking From Scratch",
      issuer: "Udemy",
      date: "2021",
      description: "Fundamentals of ethical hacking and security testing.",
      skills: ["Ethical hacking", "Security testing", "Network security", "Risk assessment"],
      credentialId: "UC-718ea92c-6082-4ce1-899e-3b04d94db66b",
      credentialUrl: "https://www.ude.my/UC-718ea92c-6082-4ce1-899e-3b04d94db66b/"
    },
    {
      title: "Start Kali Linux, Ethical Hacking and Penetration Testing!",
      issuer: "Udemy",
      date: "2021",
      description: "Introduction to Kali Linux and penetration testing methodologies.",
      skills: ["Kali Linux", "Penetration testing", "Security tools", "Ethical hacking"],
      credentialId: "UC-c9a71c15-f501-42d7-898f-5100487f1fa7",
      credentialUrl: "https://www.ude.my/UC-c9a71c15-f501-42d7-898f-51004871f1a7"
    }
  ],

  // Contact Information
  contact: {
    email: "srachetrai@gmail.com",
    github: "https://github.com/Cryio",
    linkedin: "https://linkedin.com/in/srachetrai"
  }
}; 