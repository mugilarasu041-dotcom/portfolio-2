import { useState, useCallback } from 'react';
import { useLenis } from '@/hooks/useLenis';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';
import MouseGlowEffect from '@/components/MouseGlowEffect';
import FluidRibbonBackground from '@/components/FluidRibbonBackground';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import BackToTopButton from '@/components/BackToTopButton';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import ServicesSection from '@/sections/ServicesSection';
import ProjectsSection from '@/sections/ProjectsSection';
import StatisticsSection from '@/sections/StatisticsSection';
import ContactSection from '@/sections/ContactSection';
import FooterSection from '@/sections/FooterSection';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useLenis();

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-[100dvh]" style={{ backgroundColor: '#0a0a0a' }}>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <FluidRibbonBackground />
      <MouseGlowEffect />
      <Navbar />

      <main className="relative z-[2]">
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <StatisticsSection />
        <ContactSection />
        <FooterSection />
      </main>

      <FloatingWhatsAppButton />
      <BackToTopButton />
    </div>
  );
}

export default App;
