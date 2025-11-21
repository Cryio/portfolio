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
    title: "Cybersecurity & Pentesting",
    items: [
      { name: "Nessus", logo: technologyLogos.nessus, alt: "Nessus Logo", description: "A comprehensive vulnerability scanner used to identify security weaknesses, misconfigurations, and malware across network devices, servers, and applications." },
      { name: "Burp Suite", logo: technologyLogos.burpsuite, alt: "Burp Suite Logo", description: "An integrated platform for web application security testing, combining automated scanning with powerful manual tools for in-depth analysis and exploitation." },
      { name: "Metasploit", logo: technologyLogos.metasploit, alt: "Metasploit Logo", description: "A powerful penetration testing framework for developing, testing, and executing exploit code against remote targets to validate vulnerabilities." },
      { name: "Wireshark", logo: technologyLogos.wireshark, alt: "Wireshark Logo", description: "The world's foremost network protocol analyzer, allowing for deep inspection of network traffic to troubleshoot issues and investigate security incidents." },
      { name: "Wazuh", logo: technologyLogos.wazuh, alt: "Wazuh Logo", description: "An open-source security platform that unifies XDR and SIEM capabilities for threat detection, integrity monitoring, incident response, and compliance." },
      { name: "TheHive", logo: technologyLogos.thehive, alt: "TheHive Logo", description: "A scalable, open-source Security Incident Response Platform (SIRP) designed for security analysts to collaborate on investigations and streamline case management." },
      { name: "DFIR-IRIS", logo: technologyLogos.dfirIris, darkLogo: technologyLogos.dfirIrisDark, alt: "DFIR-IRIS Logo", description: "An open-source platform for collaborative digital forensics and incident response, helping teams manage and investigate security cases efficiently." },
      { name: "MISP", logo: technologyLogos.misp, alt: "MISP Logo", description: "A Threat Intelligence Platform (TIP) for sharing, storing, and correlating Indicators of Compromise (IOCs) from cybersecurity threats." },
      { name: "Ghidra", logo: technologyLogos.ghidra, alt: "Ghidra Logo", description: "A suite of software reverse engineering tools developed by the NSA, used for analyzing malicious code and discovering software vulnerabilities." },
      { name: "Cuckoo Sandbox", logo: technologyLogos.cuckoo, darkLogo: technologyLogos.cuckooDark, alt: "Cuckoo Sandbox Logo", description: "An open-source automated malware analysis system that detonates suspicious files in a controlled environment to observe their behavior." },
      { name: "SQLmap", logo: technologyLogos.sqlmap, alt: "SQLmap Logo", description: "An open-source tool that automates the process of detecting and exploiting SQL injection flaws and taking over database servers." },
      { name: "x64dbg", logo: technologyLogos.x64dbg, darkLogo: technologyLogos.x64dbgWhite, alt: "x64dbg Logo", description: "An open-source x64/x32 debugger for Windows, essential for reverse engineering and malware analysis on the Windows platform." },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "Microsoft Azure", logo: technologyLogos.azure, alt: "Microsoft Azure Logo", description: "A comprehensive cloud platform offering a wide range of services for computing, networking, storage, and application deployment." },
      { name: "Docker", logo: technologyLogos.docker, alt: "Docker Logo", description: "A containerization platform used to build, ship, and run applications in isolated environments, ensuring consistency across development and production." },
      { name: "Jenkins", logo: technologyLogos.jenkins, alt: "Jenkins Logo", description: "An open-source automation server that enables developers to reliably build, test, and deploy their software through CI/CD pipelines." },
      { name: "Okta (SSO)", logo: technologyLogos.okta, alt: "Okta Logo", description: "An enterprise-grade Identity and Access Management (IAM) service used to secure user access to applications with Single Sign-On." },
      { name: "CATO Networks", logo: technologyLogos.cato, alt: "CATO Networks Logo", description: "A cloud-native Secure Access Service Edge (SASE) platform that converges networking and security into a single, unified service." },
      { name: "Podman", logo: technologyLogos.podman, alt: "Podman Logo", description: "A daemonless container engine for developing, managing, and running OCI Containers on Linux systems, often used as a secure alternative to Docker." },
      { name: "QEMU", logo: technologyLogos.qemu, alt: "QEMU Logo", description: "A generic and open-source machine emulator and virtualizer used for running operating systems for any machine on any supported architecture." },
      { name: "VirtualBox", logo: technologyLogos.virtualbox, alt: "VirtualBox Logo", description: "A powerful, cross-platform virtualization product for enterprise and home use, allowing users to run multiple operating systems simultaneously." },
    ],
  },
  {
    title: "Languages & Development",
    items: [
      { name: "Python", logo: technologyLogos.python, alt: "Python Logo", description: "A high-level, versatile language widely used for security scripting, task automation, data analysis, and backend web development." },
      { name: "JavaScript", logo: technologyLogos.javascript, alt: "JavaScript Logo", description: "The core language of the web, enabling interactive and dynamic user experiences on the frontend." },
      { name: "TypeScript", logo: technologyLogos.typescript, alt: "TypeScript Logo", description: "A statically typed superset of JavaScript that enhances code quality and maintainability in large-scale applications." },
      { name: "React", logo: technologyLogos.react, alt: "React Logo", description: "A popular JavaScript library for building component-based, interactive user interfaces for single-page applications." },
      { name: "Node.js", logo: technologyLogos.nodejs, alt: "Node.js Logo", description: "A JavaScript runtime built on Chrome's V8 engine, used for building fast and scalable backend services and APIs." },
      { name: "Express", logo: technologyLogos.express, darkLogo: technologyLogos.expressDark, alt: "Express Logo", description: "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications." },
      { name: "Git", logo: technologyLogos.git, alt: "Git Logo", description: "A distributed version control system for tracking changes in source code during software development, enabling collaboration and history management." },
      { name: "GitHub", logo: technologyLogos.github, darkLogo: technologyLogos.githubDark, alt: "GitHub Logo", description: "A web-based platform for version control and collaboration, allowing developers to host and review code, manage projects, and build software." },
      { name: "MySQL", logo: technologyLogos.mysql, alt: "MySQL Logo", description: "A widely-used open-source relational database management system (RDBMS) known for its reliability, performance, and ease of use." },
      { name: "MongoDB", logo: technologyLogos.mongodb, alt: "MongoDB Logo", description: "A source-available, document-oriented NoSQL database program used for high-volume data storage and applications requiring flexible data models." },
    ],
  },
  {
    title: "Platforms & Software",
    items: [
      { name: "Figma", logo: technologyLogos.figma, alt: "Figma Logo", description: "A collaborative, web-based interface design tool used for creating, prototyping, and sharing UI/UX designs in real-time." },
      { name: "Blender", logo: technologyLogos.blender, alt: "Blender Logo", description: "A free and open-source 3D computer graphics software toolset used for creating animated films, visual effects, art, and 3D models." },
      { name: "Unreal Engine", logo: technologyLogos.unreal, darkLogo: technologyLogos.unrealDark, alt: "Unreal Engine Logo", description: "An advanced real-time 3D creation tool used for developing high-fidelity games, simulations, and immersive virtual experiences." },
      { name: "Adobe Photoshop", logo: technologyLogos.photoshop, darkLogo: technologyLogos.photoshopDark, alt: "Adobe Photoshop Logo", description: "The industry-standard raster graphics editor for digital art, photo editing, and image manipulation." },
      { name: "Adobe Illustrator", logo: technologyLogos.illustrator, alt: "Adobe Illustrator Logo", description: "A leading vector graphics editor and design program used to create logos, icons, illustrations, and typography." },
    ],
  },
],

// Professional Experience
experiences: [
  {
    title: "Technology Intern – Cyber Security",
    company: "Fluidech IT Services Private Limited",
    location: "Gurgaon, Haryana",
    period: "July 2025 – Present",
    description: [
      "Undertaking internship focused on core cyber security operations, risk assessment, and secure software practices as part of Fluidech",
      "Working on threat intelligence and security operations",
      "Participating in vulnerability assessment and incident response activities",
      "Gaining hands-on experience in OT security and reverse engineering techniques"
    ],
    technologies: ["Cybersecurity", "OT Security", "Threat Intelligence", "Vulnerability Assessment", "Reverse Engineering", "Incident Response"]
  },
  {
    title: "Junior Web Designer",
    company: "Maa Karma Global Engineering LLP",
    location: "Remote",
    period: "2023",
    description: [
      "Designed and developed web interfaces in a remote internship",
      "Created responsive and user-friendly website layouts",
      "Implemented modern UI/UX principles in design solutions",
      "Developed responsive and accessible web solutions"
    ],
    technologies: ["Web Development", "Frontend Design", "CSS", "UI/UX", "Graphic Design", "User-Centered Design"]
  },
  {
    title: "Design Core",
    company: "TEDxNIITUniversity",
    location: "Neemrana, Rajasthan",
    period: "2023 - 2024",
    description: [
      "Worked on visual storytelling and creative direction for TEDx events",
      "Created engaging visual content for social media and event promotions",
      "Collaborated with speakers to develop presentation visuals",
      "Developed 3D designs and graphics for event branding"
    ],
    technologies: ["3D Design", "Graphic Design", "Event Branding", "Creative Direction", "Public Speaking Aesthetics"]
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

  // Certifications organized by learning paths
  certificationPaths: [
    {
      title: "Palo Alto Networks Certified Cybersecurity Practitioner",
      issuer: "Palo Alto Networks",
      description: "Comprehensive cybersecurity practitioner certification covering cloud security, endpoint security, network security fundamentals, and security operations.",
      completionDate: "2024",
      totalCertificates: 6,
      skills: ["Network security", "Cloud security", "Endpoint security", "Security operations", "Incident response", "Threat detection"],
      pathCredentialUrl: "/certificates/Palo Alto Networks Certified Cybersecurity Practitioner/(Main) Palo Alto Networks Certified Cybersecurity Practitioner.png",
      certificates: [
        {
          title: "Cloud Security Fundamentals",
          date: "2024",
          description: "Foundational knowledge of cloud security principles and best practices.",
          skills: ["Cloud security principles", "Cloud architecture", "Security controls", "Risk management"],
          credentialUrl: "/certificates/Palo Alto Networks Certified Cybersecurity Practitioner/Cloud Security Fundamentals.png"
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
          credentialUrl: "/certificates/Palo Alto Networks Certified Cybersecurity Practitioner/Understanding Security Operations - Foundational.png"
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
    email1: "contact@srachetrai.tech",
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
