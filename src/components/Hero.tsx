import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring,
  useReducedMotion 
} from "motion/react";
import { ArrowDownRight, Sparkles, Download } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 10 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 10 });
  
  const parallaxX1 = useTransform(mouseXSpring, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-30, 30]);
  const parallaxY1 = useTransform(mouseYSpring, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-30, 30]);

  // Typewriter effect
  const [displayText, setDisplayText] = useState("");
  const fullText = "(Graphic Designer)";
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(fullText);
      return;
    }
    
    let index = 0;
    const speeds = [80, 100, 120, 90, 110]; // Variable typing speeds
    
    const type = () => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
        const speed = speeds[Math.floor(Math.random() * speeds.length)];
        setTimeout(type, speed);
      } else {
        // Add realistic pause before cursor
        setTimeout(() => {
          setDisplayText(prev => prev + '|');
        }, 1000);
      }
    };
    
    const timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, [fullText, prefersReducedMotion]);

  // Loading state for resume download
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsDownloading(true);
    // Reset after 3 seconds
    setTimeout(() => setIsDownloading(false), 3000);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section - Introduction to Kreshant Kumar"
    >
      {/* SEO Meta Data */}
      <div className="sr-only">
        <h1>Kreshant Kumar - Graphic Designer Portfolio</h1>
        <p>Creative graphic designer specializing in bold, concept-driven visuals that blend culture, emotion, and digital aesthetics.</p>
      </div>

      {/* Glass Morphism Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Main glass card behind content */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className="absolute inset-x-0 top-1/3 mx-auto w-[90%] max-w-3xl h-48 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.5 }}
          role="presentation"
          aria-hidden="true"
        />
        
        {/* Subtle floating glass elements */}
        <motion.div 
          style={{ 
            x: parallaxX1,
            y: useTransform(scrollYProgress, [0, 1], [0, 100])
          }}
          className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
          animate={prefersReducedMotion ? {} : { 
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          role="presentation"
          aria-hidden="true"
        />
        
        <div className="bg-grain absolute inset-0 pointer-events-none" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto px-6 relative z-10 w-full"
      >
        <div className="w-full text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-black/5 mb-8 relative z-10"
          >
            <Sparkles 
              className="w-4 h-4 text-accent-pink" 
              aria-hidden="true"
            />
            <span className="font-mono text-xs uppercase tracking-widest text-black">
              Available for Freelance
            </span>
          </motion.div>

          {/* Redesigned "Creative!" Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            className="absolute -top-8 -right-4 sm:-top-12 sm:-right-8 z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-full blur-xl"></div>
              <span className="font-hand text-3xl sm:text-5xl text-accent-pink drop-shadow-lg relative z-10 block transform -rotate-6">
                Creative!
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center mb-6">
            <motion.h1
              className="font-display text-3xl sm:text-7xl md:text-8xl lg:text-[clamp(3rem,10vw,8rem)] font-black leading-[0.8] tracking-tighter relative z-10 flex flex-wrap justify-center break-words"
              aria-label="KRESHANT KUMAR - Graphic Designer"
            >
              {["KRESHANT", "KUMAR"].map((word, wordIndex) => (
                <motion.span 
                  key={wordIndex} 
                  className="inline-block whitespace-nowrap mx-[0.1em]"
                  animate={prefersReducedMotion ? {} : { 
                    x: wordIndex === 0 ? [ 0, -10, 0 ] : [ 0, 10, 0 ],
                    opacity: [ 1, 0.9, 1 ]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity, 
                    repeatDelay: 4, 
                    ease: "easeInOut" 
                  }}
                >
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: (wordIndex * 8 + charIndex) * 0.05 + 0.3,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className={`inline-block ${wordIndex === 1 ? "text-transparent" : "text-black"}`}
                      style={wordIndex === 1 ? { 
                        WebkitTextStroke: "2px #8A2BE2", // Purple stroke
                        color: "transparent" // No fill
                      } : {}}
                      aria-hidden="true"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-10 relative z-10"
          >
            <span className="font-mono text-lg sm:text-2xl uppercase tracking-[0.4em] text-accent-pink font-black inline-block min-h-[2rem]">
              {displayText.replace('|', '')}
              {displayText.includes('|') && (
                <motion.span 
                  className="inline-block w-2 h-8 bg-accent-pink ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  aria-hidden="true"
                />
              )}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="max-w-2xl mx-auto text-base md:text-xl text-black/70 font-medium mb-12 px-4 relative z-10"
          >
            I design bold, concept-driven visuals that blend culture, emotion, and digital aesthetics.
            From glitchy experiments to meaningful visual stories, my work is all about making ideas <em className="not-italic font-semibold">feel</em> something—not just look good.
          </motion.p>

          {/* Restructured CTA Section - Only 2 Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10"
          >
            {/* Primary CTA - Filled */}
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-accent-pink to-purple-600 text-white rounded-full font-bold hover:from-purple-600 hover:to-accent-pink transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl text-center min-w-[200px] justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View portfolio projects"
            >
              View My Work
              <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform" aria-hidden="true" />
            </motion.a>

            {/* Secondary CTA - Outlined */}
            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition-all duration-300 text-black shadow-md hover:shadow-lg text-center min-w-[200px] flex justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact Kreshant for freelance opportunities"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Accessibility skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:z-50"
      >
        Skip to main content
      </a>
    </section>
  );
};
