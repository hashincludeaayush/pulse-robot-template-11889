
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HumanoidSection from "@/components/HumanoidSection";
import SpecsSection from "@/components/SpecsSection";
import DetailsSection from "@/components/DetailsSection";
import ImageShowcaseSection from "@/components/ImageShowcaseSection";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import MadeByHumans from "@/components/MadeByHumans";
import Footer from "@/components/Footer";

const Index = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Enhanced parallax scroll effect for both background and content
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      
      // Background parallax layers
      const rate = scrolled * -0.5;
      const rate2 = scrolled * -0.3;
      const rate3 = scrolled * -0.7;

      const parallaxBgElements = document.querySelectorAll('.parallax-bg');
      parallaxBgElements.forEach((element, index) => {
        const rates = [rate, rate2, rate3];
        const currentRate = rates[index % 3] || rate;
        (element as HTMLElement).style.transform = `translateY(${currentRate}px)`;
      });

      // Content parallax sections
      const parallaxElements = document.querySelectorAll('.parallax[data-speed]');
      parallaxElements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrolled * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    // Only enable parallax on desktop for better performance
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Parallax Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Background Layer 1 - Slowest */}
        <div className="parallax-bg absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-96 right-20 w-80 h-80 bg-gradient-to-l from-primary/15 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        {/* Background Layer 2 - Medium */}
        <div className="parallax-bg absolute inset-0 opacity-10">
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-secondary/30 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-[800px] left-1/4 w-64 h-64 bg-gradient-to-tr from-accent/25 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        {/* Background Layer 3 - Fastest */}
        <div className="parallax-bg absolute inset-0 opacity-15">
          <div className="absolute top-60 left-1/3 w-48 h-48 bg-gradient-to-r from-primary/40 to-transparent rounded-full blur-lg"></div>
          <div className="absolute top-[1200px] right-1/3 w-56 h-56 bg-gradient-to-l from-muted/30 to-transparent rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="space-y-4 sm:space-y-8"> {/* Reduced space on mobile */}
          <div className="parallax" data-speed="0.1">
            <Hero />
          </div>
          <div className="parallax" data-speed="0.15">
            <HumanoidSection />
          </div>
          <div className="parallax" data-speed="0.08">
            <SpecsSection />
          </div>
          <div className="parallax" data-speed="0.12">
            <DetailsSection />
          </div>
          <div className="parallax" data-speed="0.05">
            <ImageShowcaseSection />
          </div>
          <div className="parallax" data-speed="0.18">
            <Features />
          </div>
          <div className="parallax" data-speed="0.1">
            <Testimonials />
          </div>
          <div className="parallax" data-speed="0.14">
            <Newsletter />
          </div>
          <div className="parallax" data-speed="0.07">
            <MadeByHumans />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
