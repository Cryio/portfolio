import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { GooeyCursor } from "@/components/GooeyCursor";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
export const dynamic = "force-static";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Srachet Rai - Cybersecurity Specialist & Web Developer Portfolio",
  description: "Explore the portfolio of Srachet Rai, a cybersecurity enthusiast and BTech CSE graduate. Specializing in penetration testing, vulnerability assessment, and secure coding practices.",
  keywords: [
    "Cybersecurity",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Web Development",
    "Security Analyst",
    "Ethical Hacking",
    "DevSecOps",
    "Cloud Security",
    "Incident Response",
    "Portfolio",
  ],
  authors: [
    {
      name: "Srachet Rai",
      url: "https://srachetrai.dev",
    },
  ],
  creator: "Srachet Rai",
  publisher: "Srachet Rai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://srachetrai.dev"),
  alternates: {
    canonical: "https://srachetrai.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://srachetrai.dev",
    siteName: "Srachet Rai - Portfolio",
    title: "Srachet Rai - Cybersecurity Specialist & Web Developer",
    description: "Explore the portfolio of Srachet Rai, a cybersecurity enthusiast and BTech CSE graduate. Specializing in penetration testing, vulnerability assessment, and secure coding practices.",
    images: [
      {
        url: "https://srachetrai.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Srachet Rai - Portfolio",
        type: "image/png",
      },
      {
        url: "https://srachetrai.dev/og-image-square.png",
        width: 800,
        height: 800,
        alt: "Srachet Rai - Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@srachetrai",
    creator: "@srachetrai",
    title: "Srachet Rai - Cybersecurity Specialist & Web Developer",
    description: "Explore the portfolio of Srachet Rai, a cybersecurity enthusiast and BTech CSE graduate.",
    images: ["https://srachetrai.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Srachet Rai - Portfolio",
  },
  applicationName: "Srachet Rai Portfolio",
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
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href="https://srachetrai.dev" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Srachet Rai - Portfolio" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Srachet Rai",
              url: "https://srachetrai.dev",
              image: "https://srachetrai.dev/og-image-square.png",
              description: "Cybersecurity Specialist & Web Developer",
              jobTitle: "Cybersecurity Enthusiast & BTech CSE",
              sameAs: [
                "https://www.linkedin.com/in/srachetrai",
                "https://github.com/srachetrai",
                "https://twitter.com/srachetrai",
              ],
              knowsAbout: [
                "Cybersecurity",
                "Penetration Testing",
                "Web Development",
                "Ethical Hacking",
                "Vulnerability Assessment",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased text-foreground bg-background`}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <GooeyCursor />
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