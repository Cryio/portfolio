export const personalInfo = {
  name: "Srachet Rai",
  title: "Cybersecurity Enthusiast & BTech CSE",
  tagline: "A passionate cybersecurity enthusiast and creative designer with a strong foundation in computer science. Experienced in penetration testing, vulnerability assessment, and secure coding practices.",
  aboutDescription: `I am a Cybersecurity Enthusiast with a solid foundation in web development and ethical hacking. As a Computer Science student, I am dedicated to securing digital infrastructures and addressing emerging cyber threats.

I have contributed to impactful projects—including developing a mobile application that tackles real-world health challenges—and earned certifications in Ethical Hacking and Machine Learning. My goal is to deliver innovative, practical solutions that blend creativity with technical expertise.

In my leadership roles with the Google Developers Student Club and TEDxNIITUniversity, I drive innovation and leverage my animation skills to craft immersive user experiences.`,
  email: "srachetrai@gmail.com",
  github: "https://github.com/Cryio",
  linkedin: "https://linkedin.com/in/srachetrai",
  cvUrl: "/assets/documents/resume.pdf",
};

export const skillCategories = [
  {
    name: "Cybersecurity & Pentesting",
    icon: "Shield",
    skills: [
      { name: "Nessus", description: "Comprehensive vulnerability scanner for identifying security weaknesses" },
      { name: "Burp Suite", description: "Web application security testing platform" },
      { name: "Metasploit", description: "Penetration testing framework for exploit development" },
      { name: "Wireshark", description: "Network protocol analyzer for deep packet inspection" },
      { name: "Wazuh", description: "Open-source XDR and SIEM security platform" },
      { name: "TheHive", description: "Security Incident Response Platform (SIRP)" },
      { name: "DFIR-IRIS", description: "Digital forensics and incident response platform" },
      { name: "MISP", description: "Threat Intelligence Platform for IOC sharing" },
      { name: "Ghidra", description: "NSA's software reverse engineering tools" },
      { name: "Cuckoo Sandbox", description: "Automated malware analysis system" },
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
      { name: "JavaScript", description: "Web development" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "React", description: "UI component library" },
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
    title: "Technology Intern – Cyber Security",
    company: "Fluidech IT Services Private Limited",
    location: "Gurgaon, Haryana",
    period: "July 2025 – Present",
    description: [
      "Undertaking internship focused on core cyber security operations, risk assessment, and secure software practices",
      "Working on threat intelligence and security operations center (SOC) activities",
      "Participating in vulnerability assessment and incident response activities",
      "Gaining hands-on experience in OT security and reverse engineering techniques",
    ],
    technologies: ["Cybersecurity", "OT Security", "Threat Intelligence", "Vulnerability Assessment", "Reverse Engineering"],
    current: true,
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

export const certifications = [
  {
    title: "Palo Alto Networks Certified Cybersecurity Practitioner",
    issuer: "Palo Alto Networks",
    year: "2024",
    skills: ["Network security", "Cloud security", "Endpoint security", "Security operations", "Incident response"],
    featured: true,
    totalCertificates: 6,
    credentialUrl: "https://www.credly.com/badges/paloalto-cybersecurity",
  },
  {
    title: "Palo Alto Networks Certified Network Security Analyst",
    issuer: "Palo Alto Networks",
    year: "2024",
    skills: ["PAN-OS administration", "Panorama management", "Traffic decryption", "Log analysis"],
    featured: true,
    totalCertificates: 4,
    credentialUrl: "https://www.credly.com/badges/paloalto-network-security",
  },
  {
    title: "Cisco Networking & Cybersecurity Track",
    issuer: "Cisco",
    year: "2025",
    skills: ["Networking fundamentals", "Cybersecurity", "Device configuration", "Protocol analysis"],
    featured: true,
    totalCertificates: 3,
    credentialUrl: "https://www.credly.com/badges/cisco-networking",
  },
  {
    title: "Google Cloud & AI Specialization",
    issuer: "Google Cloud",
    year: "2023",
    skills: ["Cloud computing", "Machine learning", "AI/ML", "Generative AI", "Data processing"],
    featured: true,
    totalCertificates: 12,
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/srachetrai",
  },
  {
    title: "ICS 300 (CISA)",
    issuer: "CISA",
    year: "2024",
    skills: ["Advanced ICS security", "Critical infrastructure protection", "Risk management"],
    featured: false,
    credentialUrl: "https://www.cisa.gov/ics-training",
  },
  {
    title: "Cato Certified Associate (CCA)",
    issuer: "Cato Networks",
    year: "2025",
    skills: ["Secure network architecture", "Cloud security", "SASE platform"],
    featured: false,
    credentialUrl: "https://www.catonetworks.com/cato-academy/",
  },
  {
    title: "Machine Learning",
    issuer: "IIT Bombay",
    year: "2023",
    skills: ["ML fundamentals", "Data analysis", "Model training", "Algorithm implementation"],
    featured: false,
    credentialUrl: "https://www.iitbombayx.in/certificates",
  },
  {
    title: "Ethical Hacking & Penetration Testing Track",
    issuer: "Udemy",
    year: "2021",
    skills: ["Ethical hacking", "Penetration testing", "Kali Linux", "Security assessment"],
    featured: false,
    totalCertificates: 3,
    credentialUrl: "https://www.udemy.com/certificate",
  },
  {
    title: "Industrial Control Systems Security Track",
    issuer: "CISA",
    year: "2024",
    skills: ["ICS security", "Industrial protocols", "SCADA systems", "IT/OT convergence"],
    featured: false,
    totalCertificates: 3,
    credentialUrl: "https://www.cisa.gov/ics-training",
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
│ Email:    contact@srachetrai.dev                        │
│ Alt:      srachetrai@gmail.com                          │
│ GitHub:   github.com/Cryio                              │
│ LinkedIn: linkedin.com/in/srachetrai                    │
└─────────────────────────────────────────────────────────┘`,
  social: `
GitHub:   https://github.com/Cryio
LinkedIn: https://linkedin.com/in/srachetrai
Email:    contact@srachetrai.dev`,
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
