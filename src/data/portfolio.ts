export const personalInfo = {
  name: "Srachet Rai",
  title: "Platform Engineer & Cybersecurity Professional",
  tagline: "Aspiring cyber security professional with a strong foundation in vulnerability and security assessment, networking, web development, and machine learning. Passionate about innovation, digital security, and problem-solving in the evolving tech landscape.",
  aboutDescription: `I'm an aspiring cyber security professional with a strong foundation in vulnerability and security assessment, networking, web development, and machine learning. As a Computer Science student, I'm dedicated to securing digital infrastructures and addressing emerging cyber threats.

I've contributed to impactful work—from a research paper accepted at ComsNets 2026 on WiFi-CSI based activity recognition, to VAPT engagements during my cybersecurity internship, and data engineering pipelines as an engineering intern at Xcaliber Health. I've earned certifications spanning Palo Alto Networks, Cisco, CISA, and Google Cloud.

Outside of security, I bring leadership and creative design experience from TEDxNIITUniversity and the NIIT Foundation, blending technical expertise with a passion for 2D/3D digital art and game development.`,
  email: "srachetrai@gmail.com",
  phone: "+91-7302598847",
  github: "https://github.com/Cryio",
  linkedin: "https://linkedin.com/in/srachetrai",
  website: "https://www.srachetrai.dev",
  cvUrl: "/assets/documents/resume.pdf",
};

export const skillCategories = [
  {
    name: "Cybersecurity & Pentesting",
    icon: "Shield",
    skills: [
      { name: "Nessus", description: "Comprehensive vulnerability scanner for identifying security weaknesses" },
      { name: "OpenVAS", description: "Open-source vulnerability scanning and management" },
      { name: "Burp Suite", description: "Web application security testing platform" },
      { name: "Nikto", description: "Web server scanner for vulnerabilities and misconfigurations" },
      { name: "Metasploit", description: "Penetration testing framework for exploit development" },
      { name: "Wireshark", description: "Network protocol analyzer for deep packet inspection" },
      { name: "Wazuh", description: "Open-source XDR and SIEM security platform" },
      { name: "TheHive", description: "Security Incident Response Platform (SIRP)" },
      { name: "DFIR-IRIS", description: "Digital forensics and incident response platform" },
      { name: "MISP", description: "Threat Intelligence Platform for IOC sharing" },
      { name: "Ghidra", description: "NSA's software reverse engineering tools" },
      { name: "Cuckoo Sandbox", description: "Automated malware analysis system" },
      { name: "Caldera", description: "Automated adversary emulation platform (MITRE ATT&CK)" },
      { name: "SQLmap", description: "SQL injection detection and exploitation tool" },
      { name: "x64dbg", description: "Open-source x64/x32 debugger for Windows" },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      { name: "Microsoft Azure", description: "Cloud computing platform" },
      { name: "Docker", description: "Containerization platform" },
      { name: "Jenkins", description: "CI/CD automation server" },
      { name: "Okta", description: "Identity and access management with SSO" },
      { name: "CATO Networks", description: "Cloud-native SASE platform" },
      { name: "Podman", description: "Daemonless container engine" },
      { name: "QEMU", description: "Machine emulator and virtualizer" },
      { name: "VirtualBox", description: "Cross-platform virtualization" },
    ],
  },
  {
    name: "Languages & Development",
    icon: "Code",
    skills: [
      { name: "Python", description: "Security scripting & automation" },
      { name: "Java", description: "Object-oriented application development" },
      { name: "JavaScript", description: "Web development" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "React", description: "UI component library" },
      { name: "Flutter", description: "Cross-platform mobile app development" },
      { name: "Node.js", description: "Backend runtime" },
      { name: "Express", description: "Node.js web framework" },
      { name: "Git", description: "Version control" },
      { name: "MySQL", description: "Relational database" },
      { name: "MongoDB", description: "NoSQL database" },
    ],
  },
  {
    name: "Platforms & Design",
    icon: "Palette",
    skills: [
      { name: "Figma", description: "UI/UX design tool" },
      { name: "Blender", description: "3D graphics software" },
      { name: "Unreal Engine", description: "Real-time 3D creation" },
      { name: "Adobe Photoshop", description: "Image editing" },
      { name: "Adobe Illustrator", description: "Vector graphics" },
    ],
  },
];

export const projects = [
  {
    title: "Wifi-CSI Based Activity Recognition",
    description: "Use of ESP32 to collect WiFi CSI to recognize daily human activities for camera-free activity monitoring. Used Python to convert CSI and audio into heatmaps and mel-spectrograms. Implemented GANs to recognize activities with CSI for smart home, health, and security applications.",
    tech: ["Python", "ESP32", "TensorFlow", "GANs", "NumPy", "Machine Learning", "Jupyter Notebook"],
    github: "https://github.com/Cryio/Wifi-CSI-Based-Activity-Recognition",
    featured: true,
    type: "research",
  },
  {
    title: "TinyLinux",
    description: "A lightweight Operating System built with the Linux kernel, custom shell (C programming), and efficient system calls (assembly). The kernel being <1MB, it provides a minimal OS environment for learning low-level system programming and OS development.",
    tech: ["C", "Assembly", "Linux", "Shell", "Operating Systems"],
    github: "https://github.com/Cryio/TinyLinux",
    featured: true,
    type: "system",
  },
  {
    title: "Vulnerability Assessment in Docker & Podman",
    description: "R&D project involving setting up containers in Docker and Podman, implementing PoC exploits in C and Python to demonstrate real-world security risks, and constructing intentionally vulnerable containers to analyze attack vectors.",
    tech: ["Docker", "Podman", "Python", "C", "Security", "Shell", "Penetration Testing"],
    github: "https://github.com/Cryio/Vulnerability-Assessment-in-Docker-and-Podman",
    featured: true,
    type: "security",
  },
  {
    title: "UniHealth Application",
    description: "Developed a mobile app to streamline student healthcare in university hostels, presented at Google Students Developer Solution Challenge 2024. Implemented health logs, doctor-student communication, progress tracking, and a dynamic dashboard for real-time health monitoring.",
    tech: ["Flutter", "Dart", "OAuth", "Firebase", "Mobile Development"],
    github: "https://github.com/Cryio/Synergy_Project",
    featured: true,
    type: "mobile",
  },
  {
    title: "TCP/IP Stack Implementation",
    description: "Implementation of a custom TCP/IP stack in C. Covers TCP header parsing, state machine management, and core networking protocols for educational purposes in understanding network fundamentals.",
    tech: ["C", "Networking", "TCP/IP", "Wireshark", "Linux"],
    github: "https://github.com/Cryio/TCP-IP-in-C",
    featured: true,
    type: "system",
  },
  {
    title: "Zen Garden",
    description: "A web application designed to make habit tracking engaging and interactive. Features gamified progress tracking, visual garden that grows with your habits, and personalized goal setting.",
    tech: ["JavaScript", "React", "Node.js", "MongoDB", "Web Development"],
    github: "https://github.com/Cryio/Zen_Garden",
    featured: false,
    type: "web",
  },
  {
    title: "siNUsoid CTF",
    description: "A Capture The Flag competition platform designed to challenge and enhance cybersecurity skills through engaging and diverse tasks. Organized CTF event with 100+ active participants.",
    tech: ["Python", "Docker", "CTFd", "Security", "Penetration Testing", "Ethical Hacking"],
    github: "https://github.com/Cryio/siNUsoidCTF",
    featured: false,
    type: "security",
  },
  {
    title: "Vulnerability Assessment Report",
    description: "A comprehensive sample VA report based on the CERT-in reporting format. Demonstrates proper vulnerability documentation, risk assessment methodologies, and security reporting practices.",
    tech: ["Security", "Nessus", "Vulnerability Assessment", "CERT-in", "Documentation"],
    github: "https://github.com/Cryio/Vulnerability-Assessment-Report",
    featured: false,
    type: "security",
  },
  {
    title: "HealthMate AI",
    description: "A Flask-based text generation API using the Meta-Llama 3.1 8B model from Hugging Face. Leverages Docker for deployment and stores the model locally to optimize performance for health-related queries.",
    tech: ["Python", "Flask", "Docker", "Machine Learning", "Hugging Face", "AI"],
    github: "https://github.com/Cryio/healthmate",
    featured: false,
    type: "ai",
  },
  {
    title: "Practical Concepts",
    description: "Translating complex, ambiguous, and niche concepts into practical solutions and examples. A repository of educational implementations covering various programming and security topics.",
    tech: ["Python", "Education", "Programming", "Security"],
    github: "https://github.com/Cryio/Practrical_Concepts",
    featured: false,
    type: "education",
  },
  {
    title: "Karma Tech Website",
    description: "A base website design for the Karma Tech company. Clean, professional design with responsive layouts and modern UI components.",
    tech: ["HTML", "CSS", "JavaScript", "Web Development", "UI/UX", "Figma"],
    github: "https://github.com/Cryio/Karma_Tech",
    featured: false,
    type: "web",
  },
  {
    title: "Maa Karmaa Website",
    description: "A professional website design for Maa Karmaa company. Features responsive design, modern aesthetics, and user-friendly navigation.",
    tech: ["HTML", "CSS", "JavaScript", "Web Development", "UI/UX"],
    github: "https://github.com/Cryio/Maa_Karmaa",
    featured: false,
    type: "web",
  },
  {
    title: "CTF Q2023",
    description: "Questions and challenges designed for CTF 2023 organized by Cibernutic. Includes web, crypto, and forensics challenges for cybersecurity training.",
    tech: ["Security", "CTF", "Python", "Web Security", "Cryptography"],
    github: "https://github.com/Cryio/CTF_Q2023",
    featured: false,
    type: "security",
  },
  {
    title: "Qu1cksc0pe Reports",
    description: "Collection of malware analysis reports from Qu1cksc0pe tool. Saved for easier access and reference during security research and incident response.",
    tech: ["Malware Analysis", "Security", "Digital Forensics", "Python", "Ghidra"],
    github: "https://github.com/Cryio/Qu1cksc0pe_reports",
    featured: false,
    type: "security",
  },
  {
    title: "n8n Render Deployment",
    description: "Configuration and setup for deploying n8n workflow automation platform on Render. Enables serverless automation workflows for various integrations.",
    tech: ["Docker", "DevOps", "Automation", "Node.js", "Cloud"],
    github: "https://github.com/Cryio/n8n_render",
    featured: false,
    type: "devops",
  },
];

export const experiences = [
  {
    title: "Platform Engineer",
    company: "Xcaliber Health",
    location: "Bangalore, Karnataka",
    period: "June 2026 – Present",
    description: [
      "Converted from intern to full-time Platform Engineer on the core data platform team",
      "Design and operate change-data-capture and data-sync pipelines (Kafka, Debezium, Ray, Temporal) powering analytics at scale",
      "Build and harden platform capabilities — data catalog, lineage, and distributed data-quality validation",
      "Drive reliability, security, and observability across workflow orchestration and infrastructure",
    ],
    technologies: ["Kafka", "Debezium", "Ray", "Temporal", "Daft", "Iceberg", "Platform Engineering"],
    current: true,
  },
  {
    title: "Engineering Intern",
    company: "Xcaliber Health",
    location: "Bangalore, Karnataka",
    period: "March 2026 – June 2026",
    description: [
      "Developed scalable CDC and Data Sync pipelines using Kafka, Debezium, Ray, and Temporal",
      "Built Data Catalog, Lineage, and Analytics platform features for enterprise users",
      "Implemented distributed Data Quality validation using Daft and Ray",
      "Enhanced platform reliability, security, and observability through workflow and infrastructure improvements",
    ],
    technologies: ["Kafka", "Debezium", "Ray", "Temporal", "Daft", "Data Engineering"],
    current: false,
  },
  {
    title: "CyberSecurity Intern",
    company: "Fluidech IT Services",
    location: "Gurugram, Haryana",
    period: "July 2025 – March 2026",
    description: [
      "Assisted in monitoring security alerts and logs from endpoints to identify suspicious activities",
      "Performed VAPT activities using industry-standard tools and manual testing",
      "Gained hands-on exposure to SIEM dashboards and Case Management solutions",
      "Integrated external threat intelligence feeds into security workflows to enhance detection and prioritization",
    ],
    technologies: ["VAPT", "SIEM", "Threat Intelligence", "Incident Response", "Security Operations"],
    current: false,
  },
  {
    title: "Junior Web Designer",
    company: "Maa Karmaa Global Engineering LLP",
    location: "Kalyan, Maharashtra",
    period: "Apr 2023 – Sep 2023",
    description: [
      "Designed and developed web pages using HTML/CSS, improving UI/UX consistency",
      "Created engaging graphic designs to enhance visual communication",
      "Collaborated with cross-functional teams to implement responsive design solutions",
      "Developed multiple landing pages and marketing materials",
    ],
    technologies: ["HTML", "CSS", "UI/UX", "Graphic Design", "Responsive Design"],
    current: false,
  },
  {
    title: "Design Core",
    company: "TEDxNIITUniversity",
    location: "Neemrana, Rajasthan",
    period: "Oct 2023 – May 2024",
    description: [
      "Assisted in organizing and managing TEDx talks, contributing to an engaging experience for students",
      "Designed promotional materials and event visuals, enhancing audience engagement",
      "Captured and edited event footage, ensuring high-quality post-production output",
      "Created 3D designs and graphics for event branding and marketing",
    ],
    technologies: ["3D Design", "Graphic Design", "Video Editing", "Event Branding", "Creative Direction"],
    current: false,
  },
  {
    title: "English Language Instructor",
    company: "NIIT Foundation",
    location: "Neemrana, Rajasthan",
    period: "Oct 2022 – Dec 2022",
    description: [
      "Conducted English language training for job readiness programs at the Career Development Center",
      "Completed dedicated volunteering tenure over a 6-week period",
      "Contributed to the Foundation's mission of empowering students through language skills",
      "Developed curriculum and teaching materials for diverse student groups",
    ],
    technologies: ["Teaching", "Communication", "Curriculum Development", "English Language"],
    current: false,
  },
];

export const achievements = [
  {
    title: "Research Talk at Comsnets 2026",
    year: "2026",
    description: "Presenting a 20-minute research talk as the first author on WiFi-CSI Based Activity Recognition.",
  },
  {
    title: "siNUsoidCTF Organizer",
    year: "2024",
    description: "Organized the Capture the Flag challenge siNUsoidCTF with 100+ active participants.",
  },
  {
    title: "Google Developers Solution Challenge 2024",
    year: "2024",
    description: "Selected for the Google Developers Solution Challenge 2024 with the UniHealth Application project.",
  },
  {
    title: "Design Core - TEDxNIITUniversity",
    year: "2024",
    description: "Leadership and digital design expertise in TEDx event organization.",
  },
  {
    title: "English Language Instructor - NIIT Foundation",
    year: "2022",
    description: "Completed dedicated 6-week volunteering tenure conducting English language training for job readiness programs.",
  },
];

export const terminalCommands = {
  help: `Available commands:
  about     - Learn about me
  skills    - View my technical skills
  projects  - See my projects
  contact   - Get my contact info
  clear     - Clear the terminal
  social    - View social links`,
  about: `
╔══════════════════════════════════════════════════════════╗
║  SRACHET RAI                                             ║
║  Cybersecurity Enthusiast & BTech CSE                    ║
╚══════════════════════════════════════════════════════════╝

A passionate cybersecurity enthusiast with expertise in:
→ Penetration Testing & Vulnerability Assessment
→ Digital Forensics & Incident Response
→ Secure Coding Practices
→ Network Security Analysis

Currently pursuing B.Tech in Computer Science.`,
  skills: `
┌─────────────────────────────────────────────────────────┐
│ TECHNICAL SKILLS                                        │
├─────────────────────────────────────────────────────────┤
│ Security: Nessus, Burp Suite, Metasploit, Wireshark    │
│ Cloud:    Azure, Docker, Jenkins, Podman               │
│ Dev:      Python, TypeScript, React, Node.js           │
│ Design:   Figma, Blender, Unreal Engine                │
└─────────────────────────────────────────────────────────┘`,
  projects: `
╭──────────────────────────────────────────────────────────╮
│ FEATURED PROJECTS                                        │
├──────────────────────────────────────────────────────────┤
│ ▸ WiFi-CSI Activity Recognition                          │
│   ML model for human activity detection using WiFi CSI   │
│                                                          │
│ ▸ TinyLinux                                              │
│   Custom minimalist Linux distribution                   │
│                                                          │
│ ▸ TCPIP Synergy                                          │
│   Networking toolkit with TCP/IP protocols               │
│                                                          │
│ ▸ Healthmate Zen Garden                                  │
│   Wellness app with meditation tracking                  │
╰──────────────────────────────────────────────────────────╯`,
  contact: `
┌─────────────────────────────────────────────────────────┐
│ CONTACT INFO                                            │
├─────────────────────────────────────────────────────────┤
│ Email:    srachetrai@gmail.com                          │
│ Phone:    +91-7302598847                                │
│ Website:  www.srachetrai.dev                            │
│ GitHub:   github.com/Cryio                              │
│ LinkedIn: linkedin.com/in/srachetrai                    │
└─────────────────────────────────────────────────────────┘`,
  social: `
GitHub:   https://github.com/Cryio
LinkedIn: https://linkedin.com/in/srachetrai
Website:  https://www.srachetrai.dev
Email:    srachetrai@gmail.com`,
};

export const radarData = [
  { skill: "Forensics", value: 85 },
  { skill: "Containers", value: 80 },
  { skill: "Networking", value: 90 },
  { skill: "Cloud", value: 75 },
  { skill: "Red Team", value: 85 },
  { skill: "Blue Team", value: 80 },
  { skill: "AI/ML", value: 70 },
  { skill: "Dev", value: 75 },
  { skill: "3D & Design", value: 65 },
];
