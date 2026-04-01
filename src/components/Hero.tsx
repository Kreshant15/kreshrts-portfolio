import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDownRight, Sparkles } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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

        {/* 🔥 NAME */}
        <h1 className="font-display font-black leading-[0.85] tracking-tight text-[clamp(3rem,10vw,7rem)]">
          
          {/* KRESHANT */}
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="block text-black"
          >
            KRESHANT
          </motion.span>

          {/* KUMAR */}
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="block text-purple-500 font-outline"
          >
            KUMAR
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

          {/* PRIMARY — Uiverse style */}
          <a
            href="#contact"
            className="group relative px-8 py-4 rounded-full bg-black text-white font-semibold overflow-hidden"
          >
            {/* Shine */}
            <span className="absolute left-[-100%] top-0 w-full h-full
            bg-gradient-to-r from-transparent via-white/40 to-transparent
            group-hover:left-[100%] transition-all duration-700" />

            <span className="relative flex items-center gap-2">
              Let’s Work Together
              <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition" />
            </span>
          </a>

          {/* SECONDARY */}
          <a
            href="#projects"
            className="px-8 py-4 rounded-full border border-black/20 font-semibold
            transition-all duration-300 hover:bg-black hover:text-white"
          >
            View Projects
          </a>
        </div>
      </motion.div>
    </section>
  );
};
