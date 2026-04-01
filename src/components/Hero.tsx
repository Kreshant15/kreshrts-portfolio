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

  // Enhanced Typewriter effect with multiple phrases
  const [displayText, setDisplayText] = useState("");
  const phrases = ["(Graphic Designer)", "(Visual Storyteller)", "(Digital Artist)"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(phrases[0]);
      return;
    }
    
    let index = 0;
    const currentPhrase = phrases[currentPhraseIndex];
    
    const type = () => {
      if (index <= currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, index));
        index++;
        setTimeout(type, 100);
      } else {
        // Cursor blinking
        setTimeout(() => {
          setDisplayText(prev => prev.includes('|') ? prev.replace('|', '') : prev + '|');
        }, 500);
        
        // Move to next phrase after delay
        setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    };
    
    const timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, [currentPhraseIndex, phrases, prefersReducedMotion]);

  // Loading state for resume download
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsDownloading(true);
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

      {/* Enhanced Glass Morphism Background */}
      <div className="absolute inset-0 z-0">
        {/* Large glass gradient background */}
        <motion.div 
          style={{ y: y1, x: parallaxX1 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pastel-pink/30 to-accent-purple/30 rounded-full blur-3xl opacity-40"
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          role="presentation"
          aria-hidden="true"
        />
        <motion.div 
          style={{ y: y2, x: parallaxX1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pastel-blue/30 to-purple-300/30 rounded-full blur-3xl opacity-40"
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          role="presentation"
          aria-hidden="true"
        />
        
        {/* Glass morphism cards behind content */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
          className="absolute inset-x-0 top-1/4 mx-auto w-[90%] max-w-4xl h-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.8 }}
          role="presentation"
          aria-hidden="true"
        />
        
        {/* Subtle floating glass elements */}
        <motion.div 
          style={{ 
            x: useTransform(mouseXSpring, [0, window.innerWidth || 1920], [-20, 20]),
            y: useTransform(scrollYProgress, [0, 1], [0, 50])
          }}
          className="absolute top-1/3 left-20 w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
          animate={prefersReducedMotion ? {} : { 
            rotate: [0, 10, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
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
          {/* Enhanced "Available for Freelance" with sparkle animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-black/5 mb-8 relative z-10"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Sparkles 
                className="w-4 h-4 text-accent-pink" 
                aria-hidden="true"
              />
            </motion.div>
            <span className="font-mono text-xs uppercase tracking-widest text-black">
              Available for Freelance
            </span>
          </motion.div>

          {/* Repositioned "Creative!" tag with better anchoring */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-6 -right-2 sm:-top-8 sm:-right-4 md:-top-10 md:-right-8 rotate-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/30 to-purple-300/30 rounded-full blur-md"></div>
              <span className="font-hand text-2xl sm:text-4xl md:text-5xl text-accent-pink drop-shadow-sm relative z-10 block">
                Creative!
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center mb-6">
            {/* Restored name animation with enhanced glass effect container */}
            <div className="relative mb-8">
              <motion.div 
                className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.h1
                className="font-display text-3xl sm:text-6xl md:text-7xl lg:text-[clamp(3rem,10vw,7rem)] font-black leading-[0.8] tracking-tighter relative z-10 flex flex-wrap justify-center break-words px-4 py-6"
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
                          WebkitTextStroke: "2px #8A2BE2",
                          color: "transparent"
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
          </div>

          {/* Enhanced typewriter effect with multiple phrases */}
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

          {/* Optimized CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10"
          >
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
