import { portfolioData } from "../../data/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function About() {
  // Split the description into paragraphs
  const paragraphs = portfolioData.aboutDescription.trim().split('\n\n');

  return (
    <main className="min-h-screen pt-24">
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
            <CardContent className="prose prose-invert">
              <div className="space-y-6 text-xl leading-relaxed">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-black dark:text-white">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild>
                  <a href="/assets/cv.pdf" download>
                    Download CV
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
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
