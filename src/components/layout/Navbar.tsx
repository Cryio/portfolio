import { useState, useEffect } from "react";
import { Menu, X, Terminal, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Certifications", href: "/certifications" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith("/#")) {
      // If we're on the home page, scroll to section
      if (location.pathname === "/") {
        const element = document.querySelector(href.replace("/", ""));
        element?.scrollIntoView({ behavior: "smooth" });
      }
      // If we're on another page, navigate to home then scroll
      return;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
        scrolled ? "bg-background border-b-4 border-foreground" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === "/") {
              scrollToSection("#home");
            }
          }}
          className="text-2xl font-display uppercase tracking-tight"
        >
          Srachet<span className="text-highlight-1">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            item.href.startsWith("/#") ? (
              location.pathname === "/" ? (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href.replace("/", ""))}
                  className="nav-link"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              )
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link"
              >
                {item.label}
              </Link>
            )
          ))}
          <Link
            to="/game"
            className="ml-2 border-4 border-foreground bg-primary text-primary-foreground px-4 py-2 font-bold uppercase text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            Game
          </Link>
          <Link
            to="/terminal"
            className="border-4 border-foreground bg-accent text-accent-foreground px-4 py-2 font-bold uppercase text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            Terminal
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-dark mt-2 mx-4 rounded-xl overflow-hidden animate-scale-in">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              item.href.startsWith("/#") && location.pathname === "/" ? (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href.replace("/", ""))}
                  className="py-2 px-4 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
            <Button
              variant="outline"
              className="mt-2 gap-2 border-primary/50"
              onClick={() => {
                if (location.pathname === "/") {
                  scrollToSection("#terminal");
                } else {
                  window.location.href = "/#terminal";
                }
              }}
            >
              <Terminal className="w-4 h-4" />
              Terminal
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}