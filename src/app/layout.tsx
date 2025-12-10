import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
export const dynamic = "force-static";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Srachet Rai - Portfolio",
  description: "Cybersecurity Enthusiast & BTech CSE",
  icons: {
    icon: [
      { url: "/assets/favicon.ico" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/assets/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/assets/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/assets/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" }
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={`${inter.className} antialiased text-foreground bg-background`}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <Background />
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="border-t border-border/60 bg-background/80 backdrop-blur">
            <div className="container mx-auto px-4 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">{portfolioData.name}</p>
                <p className="text-sm text-foreground/70">{portfolioData.title}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-foreground/80">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
                <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
                <Link href="/certifications" className="hover:text-primary transition-colors">Certifications</Link>
                <Link href="/roles" className="hover:text-primary transition-colors">Roles</Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-foreground/80">
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="hover:text-primary transition-colors"
                >
                  Email
                </a>
                <a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}