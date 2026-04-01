import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDownRight, Sparkles, Download } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsDownloading(true);
    // Reset after 3 seconds
    setTimeout(() => setIsDownloading(false), 3000);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#f5f1eb]"
    >
      {/* 🌌 BACKGROUND BLOBS */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2
          w-[700px] h-[700px]
          bg-gradient-to-r from-purple-400/30 to-pink-300/30
          blur-[140px] opacity-70 rounded-full"
        />

        <motion.div
          className="absolute bottom-0 left-1/4
          w-[500px] h-[500px]
          bg-gradient-to-r from-blue-300/30 to-purple-300/30
          blur-[120px] opacity-60 rounded-full"
        />

        {/* Grain */}
        <div className="bg-grain absolute inset-0 pointer-events-none opacity-60" />
      </div>

      {/* ✨ FLOATING STICKERS */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute left-10 top-1/3 text-purple-400 text-3xl opacity-60"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute right-16 bottom-1/3 text-pink-400 text-2xl opacity-60"
      >
        ◎
      </motion.div>

      {/* ✨ CONTENT */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Availability */}
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full
        bg-white/60 backdrop-blur-md border border-black/10
        text-xs uppercase tracking-widest font-mono">
          <Sparkles className="w-4 h-4 text-purple-500" />
          Available for Freelance
        </div>

        {/* 🔥 NAME with Framer-style animation */}
        <h1 className="font-display font-black leading-[0.85] tracking-tight text-[clamp(3rem,10vw,7rem)]">
          {/* KRESHANT */}
          <motion.span
            initial={{ opacity: 0, y: 80, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1]
            }}
            className="block text-black"
          >
            KRESHANT
          </motion.span>

          {/* KUMAR with staggered letter animation */}
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="block"
          >
            {"KUMAR".split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 80, 
                    rotateY: -90 
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotateY: 0 
                  }
                }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                  delay: 0.2 + index * 0.1
                }}
                className="inline-block text-transparent"
                style={{ 
                  WebkitTextStroke: "2px #8B5CF6" // purple-500
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* ROLE */}
        <p className="mt-6 text-sm sm:text-lg tracking-[0.4em] uppercase text-purple-500 font-semibold">
          Graphic Designer
        </p>

        {/* DESC */}
        <p className="mt-6 max-w-2xl mx-auto text-black/70 text-base md:text-lg">
          I design bold, concept-driven visuals blending culture, emotion, and digital aesthetics.
          My work turns ideas into experiences — not just visuals.
        </p>

        {/* 🚀 CTA BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* PRIMARY — Uiverse style with pastel purple gradient */}
          <a
            href="#contact"
            className="group relative px-8 py-4 rounded-full font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(45deg, #c77dff, #a855f7, #d8b4fe)',
              backgroundSize: '200% 200%',
            }}
          >
            {/* Animated gradient shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
            
            <span className="relative flex items-center gap-2 text-white">
              Let's Work Together
              <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </span>
          </a>

          {/* SECONDARY — Resume Download with Anime/Game Vibe */}
          <motion.a
            href="/doc/Kreshant_Fresher_Designer_CV.pdf"
            download="Kreshant_Fresher_Designer_CV.pdf"
            onClick={handleDownload}
            className="group relative px-8 py-4 rounded-full font-semibold overflow-hidden border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated download icon */}
            <motion.span
              animate={isDownloading ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isDownloading ? Infinity : 0, ease: "linear" }}
            >
              <Download className="w-5 h-5 text-purple-600 group-hover:text-purple-800 transition-colors" />
            </motion.span>
            
            <span className="relative text-purple-700 group-hover:text-purple-900 transition-colors">
              {isDownloading ? "Downloading..." : "Download Resume"}
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

