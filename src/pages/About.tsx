import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Users, Target, Lightbulb, Award, GraduationCap, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { achievements } from "@/data/portfolio";
import { AnimatedPage, FadeInOnScroll, StaggerContainer, StaggerItem } from "@/components/AnimatedPage";
import { motion } from "framer-motion";
import { getProfileImage } from "@/lib/assetLoader";

export default function About() {
  const profileImage = getProfileImage('profile-about') || getProfileImage('avatar');
  
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 md:mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="max-w-4xl mx-auto mb-12 md:mb-16">
              <FadeInOnScroll>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
                  About<span className="text-highlight-1">.</span>
                </h1>
              </FadeInOnScroll>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Avatar */}
                <FadeInOnScroll delay={0.1}>
                  <div className="border-4 border-foreground p-3 md:p-4 shadow-md mx-auto md:mx-0 max-w-xs md:max-w-none">
                    <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <img 
                          src={profileImage} 
                          alt="Srachet Rai" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl md:text-8xl font-display">SR</div>
                      )}
                    </div>
                  </div>
                </FadeInOnScroll>

                {/* Bio */}
                <FadeInOnScroll delay={0.2}>
                  <div className="space-y-3 md:space-y-4 border-l-4 border-foreground pl-4 md:pl-6">
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      I'm <span className="text-foreground font-bold">Srachet Rai</span>, an aspiring cyber security 
                      professional with a strong foundation in vulnerability and security assessment, networking, 
                      web development, and machine learning.
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Currently pursuing my B.Tech in CSE at NIIT University, I'm passionate about innovation, 
                      digital security, and problem-solving in the evolving tech landscape.
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      From penetration testing to building secure applications, I thrive on the challenge 
                      of staying one step ahead.
                    </p>
                    {/* Education Badge */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <div className="inline-flex items-center gap-2 border-2 border-foreground px-3 py-1.5 text-xs md:text-sm font-mono">
                        <GraduationCap className="w-4 h-4" />
                        B.Tech CSE (2022-2026)
                      </div>
                      <div className="inline-flex items-center gap-2 border-2 border-foreground px-3 py-1.5 text-xs md:text-sm font-mono">
                        <MapPin className="w-4 h-4" />
                        NIIT University
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>
              </div>
            </div>

            {/* Values */}
            <FadeInOnScroll className="max-w-4xl mx-auto mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 uppercase tracking-tight">What Drives Me</h2>
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { icon: Target, title: "Security-First", desc: "Building with security in mind from day one" },
                  { icon: Lightbulb, title: "Innovation", desc: "Always exploring cutting-edge solutions" },
                  { icon: Users, title: "Collaboration", desc: "Growing through shared knowledge" },
                  { icon: Heart, title: "Passion", desc: "Genuine love for what I do" },
                ].map((value) => (
                  <StaggerItem key={value.title}>
                    <motion.div 
                      className="border-4 border-foreground p-4 md:p-5 shadow-sm h-full"
                      whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-foreground bg-accent flex items-center justify-center mb-2 md:mb-3">
                        <value.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <h3 className="font-bold uppercase text-xs md:text-sm mb-1">{value.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{value.desc}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeInOnScroll>

            {/* Achievements */}
            <FadeInOnScroll className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 uppercase tracking-tight">Achievements</h2>
              <StaggerContainer className="grid md:grid-cols-2 gap-3 md:gap-4">
                {achievements.map((achievement) => (
                  <StaggerItem key={achievement.title}>
                    <motion.div 
                      className="border-4 border-foreground p-4 md:p-5 shadow-sm"
                      whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-foreground bg-highlight-2 flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 md:w-5 md:h-5 text-background" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xs md:text-sm uppercase mb-1 truncate">{achievement.title}</h3>
                          <p className="text-xs text-muted-foreground mb-1 md:mb-2 font-mono">{achievement.year}</p>
                          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeInOnScroll>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
}
