import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { About } from "../components/About";
import { InstagramCarousel } from "../components/InstagramCarousel";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";
import { motion, useScroll, useSpring } from "motion/react";

export const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative selection:bg-accent-pink selection:text-white">
      <LoadingScreen />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-pink z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <div className="relative">
        {/* Animated Background Gradients - Layer 0 */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700 bg-white">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 20, 0],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[5%] w-[60vw] h-[60vw] rounded-full blur-[100px] transition-all duration-700 bg-gradient-to-br from-pastel-pink/40 to-pastel-blue/40 opacity-40" 
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              rotate: [0, -20, 0],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] rounded-full blur-[100px] transition-all duration-700 bg-gradient-to-br from-pastel-purple/40 to-pastel-yellow/40 opacity-40" 
          />
          <motion.div 
            animate={{ 
              x: [0, 30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] rounded-full blur-[80px] transition-all duration-700 bg-gradient-to-br from-pastel-green/30 to-pastel-blue/30 opacity-30" 
          />
        </div>

        {/* Content Wrapper - Layer 10 */}
        <div className="relative z-10">
          <Hero />
          <Projects />
          <About />
          <InstagramCarousel />
          <Contact />
          <Footer />
        </div>

        {/* Global Grain Overlay - Layer 100 */}
        <motion.div 
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="fixed inset-0 pointer-events-none z-[100] bg-grain" 
        />
      </div>
    </main>
  );
};
