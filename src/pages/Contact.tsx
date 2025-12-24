import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Github, Linkedin, Mail, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/data/portfolio";
import { AnimatedPage, FadeInOnScroll, SlideInFromLeft, SlideInFromRight } from "@/components/AnimatedPage";
import { motion } from "framer-motion";
import { z } from "zod";

// Web3Forms access key - this is a public key, safe to include in frontend
const WEB3FORMS_ACCESS_KEY = "4f5453cd-b7dd-447d-82bd-4b20f5032dc9";

// Input validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters"),
});

export default function Contact() {
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

    // Validate input
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      toast({
        title: "Validation Error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: result.data.name,
          email: result.data.email,
          subject: result.data.subject,
          message: result.data.message,
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
        throw new Error(responseData.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Header */}
            <FadeInOnScroll className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tight">
                Contact<span className="text-highlight-2">.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Have a project in mind or just want to chat? I'd love to hear from you.
              </p>
            </FadeInOnScroll>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <SlideInFromLeft>
                <div className="border-4 border-foreground p-8 shadow-md">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold uppercase">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          className={`brutalist-input ${errors.name ? 'border-destructive' : ''}`}
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold uppercase">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className={`brutalist-input ${errors.email ? 'border-destructive' : ''}`}
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-bold uppercase">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        required
                        className={`brutalist-input ${errors.subject ? 'border-destructive' : ''}`}
                      />
                      {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold uppercase">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message..."
                        rows={5}
                        required
                        className={`brutalist-input resize-none ${errors.message ? 'border-destructive' : ''}`}
                      />
                      {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      className="w-full gap-2"
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
              </SlideInFromLeft>

              {/* Contact Info */}
              <SlideInFromRight>
                <div className="space-y-6">
                  <div className="border-l-4 border-foreground pl-4">
                    <h2 className="text-xl font-bold uppercase tracking-wide mb-4">Let's Connect</h2>
                    <p className="text-muted-foreground">
                      I'm always open to discussing new projects, creative ideas, cybersecurity challenges, 
                      or opportunities to collaborate.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Mail, label: "Primary Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                      { icon: Mail, label: "Alternate Email", value: personalInfo.altEmail, href: `mailto:${personalInfo.altEmail}` },
                      { icon: Github, label: "GitHub", value: "github.com/Cryio", href: personalInfo.github },
                      { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/srachetrai", href: personalInfo.linkedin },
                    ].map((contact, i) => (
                      <motion.a
                        key={contact.label}
                        href={contact.href}
                        target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 border-4 border-foreground shadow-sm"
                        whileHover={{ y: -2, boxShadow: "var(--shadow-md)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-12 h-12 border-4 border-foreground bg-accent flex items-center justify-center">
                          <contact.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground uppercase font-bold">{contact.label}</p>
                          <p className="font-mono text-sm">{contact.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Response Time */}
                  <div className="border-4 border-foreground bg-secondary p-5 shadow-sm">
                    <h3 className="font-bold uppercase text-sm mb-2">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      I typically respond within 24-48 hours. For urgent matters, 
                      feel free to reach out via LinkedIn.
                    </p>
                  </div>
                </div>
              </SlideInFromRight>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
}
