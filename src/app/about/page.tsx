"use client";

import { useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Github, Linkedin, Mail, Loader2 } from "lucide-react";

export default function About() {
  // Split the description into paragraphs
  const paragraphs = portfolioData.aboutDescription.trim().split('\n\n');

  // --- NEW: Form State ---
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // --- NEW: Handle Input Change ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW: Handle Form Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "home-contact",
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
          About Me
        </h1>
        
        <div className="grid gap-8">
          {/* About Section */}
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Background</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div className="space-y-6 text-xl leading-relaxed text-foreground">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
              <div className="mt-8 not-prose">
                <Button asChild>
                  <a href="/assets/cv.pdf" download>
                    Download CV
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section - UPDATED FORM */}
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form
                onSubmit={handleSubmit}
                className="grid gap-4"
              >
                {/* Essential for Netlify Detection */}
                <input type="hidden" name="form-name" value="about-contact" />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="about-name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      id="about-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="about-email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      id="about-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="about-subject" className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <input
                    id="about-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="about-message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="about-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can I help?"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-foreground/70">
                    {status === "success" && <span className="text-green-500 font-bold">Message sent successfully!</span>}
                    {status === "error" && <span className="text-red-500 font-bold">Something went wrong. Please try again.</span>}
                  </div>
                  <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>

              <div className="flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <a
                    href={portfolioData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={portfolioData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={`mailto:${portfolioData.contact.email}`}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Primary Email
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={`mailto:${portfolioData.contact.altEmail}`}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Alt Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}