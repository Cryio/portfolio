import { useState } from "react";
import { Send, Github, Linkedin, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/data/portfolio";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const WEB3FORMS_ACCESS_KEY = "4f5453cd-b7dd-447d-82bd-4b20f5032dc9";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      toast({
        title: "Validation Error",
        description: "Please check the form fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...result.data,
          to: "srachetrai@gmail.com",
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.3)" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subheading mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8 animate-fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  required
                  className={`bg-secondary/50 border-border/50 ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className={`bg-secondary/50 border-border/50 ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className={`bg-secondary/50 border-border/50 ${errors.subject ? 'border-destructive' : ''}`}
                />
                {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your message..."
                  rows={4}
                  required
                  className={`bg-secondary/50 border-border/50 resize-none ${errors.message ? 'border-destructive' : ''}`}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full gap-2 bg-gradient-primary hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div>
              <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
              <p className="text-muted-foreground">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 glass rounded-xl hover-lift group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass rounded-xl hover-lift group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    github.com/Cryio
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass rounded-xl hover-lift group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    linkedin.com/in/srachetrai
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}