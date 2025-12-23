export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "intro-to-penetration-testing",
    title: "Introduction to Penetration Testing: A Beginner's Guide",
    excerpt: "Learn the fundamentals of ethical hacking and penetration testing. This comprehensive guide covers the essential tools, methodologies, and best practices for aspiring security professionals.",
    content: `
# Introduction to Penetration Testing

Penetration testing, often called "pen testing," is a crucial practice in cybersecurity that involves simulating cyberattacks to identify vulnerabilities in systems, networks, and applications.

## What is Penetration Testing?

Penetration testing is essentially authorized hacking. Security professionals use the same techniques as malicious hackers, but with permission and the goal of improving security rather than exploiting it.

## The Phases of Penetration Testing

1. **Reconnaissance** - Gathering information about the target
2. **Scanning** - Identifying open ports and services
3. **Gaining Access** - Exploiting vulnerabilities
4. **Maintaining Access** - Ensuring persistent access
5. **Analysis & Reporting** - Documenting findings

## Essential Tools

- **Nmap** - Network scanning and discovery
- **Burp Suite** - Web application testing
- **Metasploit** - Exploitation framework
- **Wireshark** - Network protocol analysis

Stay ethical, stay curious, and always get proper authorization before testing!
    `,
    category: "Security Fundamentals",
    tags: ["Penetration Testing", "Ethical Hacking", "Security"],
    date: "2024-12-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "securing-linux-servers",
    title: "Hardening Linux Servers: Essential Security Practices",
    excerpt: "A comprehensive guide to securing your Linux servers against common attacks. Learn about firewall configuration, SSH hardening, and implementing security best practices.",
    content: `
# Hardening Linux Servers

Linux servers are the backbone of modern infrastructure. Here's how to secure them properly.

## SSH Hardening

- Disable root login
- Use key-based authentication
- Change default port
- Implement fail2ban

## Firewall Configuration

Use iptables or ufw to control traffic:

\`\`\`bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw enable
\`\`\`

## Regular Updates

Keep your system updated:

\`\`\`bash
apt update && apt upgrade -y
\`\`\`
    `,
    category: "System Security",
    tags: ["Linux", "Server Hardening", "SSH", "Firewall"],
    date: "2024-12-10",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "web-app-vulnerabilities",
    title: "Top 10 Web Application Vulnerabilities in 2024",
    excerpt: "Explore the most critical web application security risks according to OWASP, and learn how to identify and prevent them in your applications.",
    content: `
# Top 10 Web Application Vulnerabilities

Understanding common vulnerabilities is the first step to building secure applications.

## 1. Broken Access Control

Ensure proper authorization checks on all endpoints.

## 2. Cryptographic Failures

Use strong encryption and proper key management.

## 3. Injection Attacks

Always validate and sanitize user input.

## 4. Insecure Design

Security should be built in from the start, not bolted on.

## 5. Security Misconfiguration

Review and harden all configurations.
    `,
    category: "Web Security",
    tags: ["OWASP", "Web Security", "Vulnerabilities"],
    date: "2024-12-05",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "incident-response-101",
    title: "Incident Response 101: What to Do When You're Breached",
    excerpt: "Learn the essential steps of incident response - from detection to recovery. Be prepared when security incidents occur.",
    content: `
# Incident Response 101

When a security incident occurs, having a plan is crucial.

## The IR Lifecycle

1. **Preparation** - Have plans and tools ready
2. **Detection** - Identify the incident
3. **Containment** - Limit the damage
4. **Eradication** - Remove the threat
5. **Recovery** - Restore normal operations
6. **Lessons Learned** - Improve for next time

## Key Takeaways

- Document everything
- Communicate clearly
- Preserve evidence
- Learn and improve
    `,
    category: "Incident Response",
    tags: ["Incident Response", "Blue Team", "Security Operations"],
    date: "2024-11-28",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "docker-security-best-practices",
    title: "Docker Security: Best Practices for Container Security",
    excerpt: "Containers are powerful but can introduce security risks. Learn how to secure your Docker deployments with these essential practices.",
    content: `
# Docker Security Best Practices

Containers need security attention just like any other infrastructure.

## Image Security

- Use official base images
- Scan images for vulnerabilities
- Keep images minimal

## Runtime Security

- Don't run as root
- Use read-only filesystems
- Limit resources

## Network Security

- Use Docker networks
- Don't expose unnecessary ports
- Implement network policies
    `,
    category: "DevSecOps",
    tags: ["Docker", "Containers", "DevSecOps"],
    date: "2024-11-20",
    readTime: "9 min read",
    featured: false,
  },
];

export const categories = [
  "All",
  "Security Fundamentals",
  "System Security",
  "Web Security",
  "Incident Response",
  "DevSecOps",
];