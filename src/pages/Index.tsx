import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  HeroSection, 
  AboutPreview, 
  SkillsPreview, 
  ProjectsPreview, 
  CertificationsPreview,
  CTASection 
} from "@/components/sections/HomePageSections";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutPreview />
        <SkillsPreview />
        <ProjectsPreview />
        <CertificationsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;