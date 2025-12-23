export const personalInfo = {
  name: "Srachet Rai",
  title: "Cybersecurity Enthusiast & BTech CSE",
  tagline: "A passionate cybersecurity enthusiast and creative designer with a strong foundation in computer science. Experienced in penetration testing, vulnerability assessment, and secure coding practices.",
  aboutDescription: `I am a Cybersecurity Enthusiast with a solid foundation in web development and ethical hacking. As a Computer Science student, I am dedicated to securing digital infrastructures and addressing emerging cyber threats.

I have contributed to impactful projects—including developing a mobile application that tackles real-world health challenges—and earned certifications in Ethical Hacking and Machine Learning. My goal is to deliver innovative, practical solutions that blend creativity with technical expertise.

In my leadership roles with the Google Developers Student Club and TEDxNIITUniversity, I drive innovation and leverage my animation skills to craft immersive user experiences.`,
  email: "contact@srachetrai.dev",
  altEmail: "srachetrai@gmail.com",
  github: "https://github.com/Cryio",
  linkedin: "https://linkedin.com/in/srachetrai",
  cvUrl: "/assets/Srachet_Rai_CV.pdf",
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
    description: "Developed a machine learning model using WiFi Channel State Information (CSI) to recognize human activities. The system processes CSI data to detect and classify different human movements with high accuracy.",
    tech: ["Python", "TensorFlow", "NumPy", "Pandas"],
    github: "https://github.com/Cryio/Wifi-CSI-Based-Activity-Recognition",
    featured: true,
    type: "research",
  },
  {
    title: "TinyLinux",
    description: "Created a minimalist Linux distribution from scratch, focusing on security and performance. Implemented custom kernel configurations and security hardening measures.",
    tech: ["C", "Assembly", "Linux", "Shell"],
    github: "https://github.com/Cryio/TinyLinux",
    featured: true,
    type: "system",
  },
  {
    title: "TCPIP Synergy",
    description: "A comprehensive networking toolkit implementing TCP/IP protocols from scratch. Features include packet analysis, network diagnostics, and custom protocol implementations for embedded systems and IoT devices.",
    tech: ["C++", "Networking", "TCP/IP", "Embedded Systems"],
    github: "https://github.com/Cryio/tcpip-synergy",
    featured: false,
    type: "networking",
  },
  {
    title: "Healthmate Zen Garden",
    description: "A wellness application combining meditation tracking, health monitoring, and virtual zen garden cultivation. Features include guided meditation sessions, health metrics visualization, and an interactive garden that grows based on user's meditation progress.",
    tech: ["React Native", "Node.js", "MongoDB", "WebGL"],
    github: "https://github.com/Cryio/healthmate-zen",
    featured: false,
    type: "mobile",
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
      "Working on threat intelligence and security operations",
      "Participating in vulnerability assessment and incident response activities",
      "Gaining hands-on experience in OT security and reverse engineering techniques",
    ],
    technologies: ["Cybersecurity", "OT Security", "Threat Intelligence", "Vulnerability Assessment", "Reverse Engineering"],
    current: true,
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
      "Developed responsive and accessible web solutions",
    ],
    technologies: ["Web Development", "Frontend Design", "CSS", "UI/UX"],
    current: false,
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
      "Developed 3D designs and graphics for event branding",
    ],
    technologies: ["3D Design", "Graphic Design", "Event Branding", "Creative Direction"],
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
