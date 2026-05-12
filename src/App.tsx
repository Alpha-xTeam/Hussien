import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollStory from './components/ScrollStory';
import StatsCounter from './components/StatsCounter';
import TechStack from './components/TechStack';
import BentoGrid from './components/BentoGrid';
import Showcase from './components/Showcase';
import ProjectTable from './components/ProjectTable';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StarField from './components/StarField';
import BackToTop from './components/BackToTop';
import { useLang } from './LanguageContext';

function App() {
  const { lang } = useLang();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [lang]);

  return (
    <div className="app-wrapper" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <StarField />
      <Navbar />
      <Hero />
      <ScrollStory />
      <StatsCounter />
      <TechStack />
      <BentoGrid />
      <Showcase />
      <ProjectTable />
      <FAQ />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
