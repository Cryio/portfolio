import { Github, Linkedin, Mail, Heart, Terminal, Shield, ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/about", label: "About", color: "hover:text-highlight-1" },
    { to: "/projects", label: "Projects", color: "hover:text-highlight-2" },
    { to: "/skills", label: "Skills", color: "hover:text-highlight-3" },
    { to: "/experience", label: "Experience", color: "hover:text-highlight-4" },
    { to: "/certifications", label: "Certifications", color: "hover:text-highlight-1" },
    { to: "/blog", label: "Blog", color: "hover:text-highlight-2" },
  ];

  const socialLinks = [
    { href: personalInfo.github, icon: Github, label: "GitHub" },
    { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
  ];

  return (
    <footer className="border-t-4 border-foreground bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 text-6xl font-display">{'</'}</div>
        <div className="absolute bottom-4 right-4 text-6xl font-display">{'>'}</div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="border-4 border-foreground p-2 bg-highlight-1/10 group-hover:bg-highlight-1 transition-colors">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-2xl font-display uppercase tracking-tight">
                Srachet<span className="text-highlight-1">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 font-mono leading-relaxed">
              {personalInfo.title}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-display uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-highlight-2" />
              Quick Links
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-mono ${link.color} transition-colors flex items-center gap-1`}
                >
                  <span className="text-muted-foreground/50">→</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-display uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-highlight-3" />
              Contact
            </h3>
            <div className="space-y-2 font-mono text-sm">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {personalInfo.email}
              </a>
              <a 
                href={`mailto:${personalInfo.altEmail}`}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {personalInfo.altEmail}
              </a>
            </div>
          </div>

          {/* Social & Terminal */}
          <div className="md:col-span-1">
            <h3 className="font-display uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-highlight-4" />
              Connect
            </h3>
            <div className="flex gap-2 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : "_blank"}
                  rel={social.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                  className="border-4 border-foreground p-2 hover:bg-foreground hover:text-background transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <Link 
              to="/terminal"
              className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-highlight-1 transition-colors"
            >
              <Terminal className="w-3 h-3" />
              Try the terminal →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t-2 border-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {currentYear} Srachet Rai. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              to="/contact" 
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
