import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowDownRight } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Magnetic button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 10 });

  const handleMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient blob */}
        <motion.div
          style={{ y }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2
          w-[700px] h-[700px]
          bg-gradient-to-r from-purple-400/40 to-pink-300/40
          blur-[140px] opacity-70 rounded-full"
        />

        {/* Secondary soft blob */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
          className="absolute bottom-0 right-1/4
          w-[500px] h-[500px]
          bg-gradient-to-r from-blue-300/30 to-purple-300/30
          blur-[120px] opacity-60 rounded-full"
        />

        {/* 🌫️ FULL-WIDTH GLASS PANEL */}
        <div className="
        absolute inset-x-0 top-1/2 -translate-y-1/2
        mx-auto w-[95%] max-w-6xl h-[420px]

        rounded-[40px]

        bg-white/10
        backdrop-blur-3xl
        border border-white/20

        shadow-[0_20px_60px_rgba(0,0,0,0.2)]

        before:absolute before:inset-0 before:rounded-[40px]
        before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent
        before:opacity-70

        after:absolute after:inset-0 after:rounded-[40px]
        after:border after:border-white/30 after:opacity-40
        " />

        {/* Grain */}
        <div className="bg-grain absolute inset-0 pointer-events-none opacity-70" />
      </div>

      {/* ✨ CONTENT */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Availability */}
        <div className="inline-block mb-6 px-5 py-2 rounded-full
        bg-white/20 backdrop-blur-md border border-white/20
        text-xs uppercase tracking-widest font-mono">
          Available for Freelance
        </div>

        {/* NAME */}
        <h1 className="font-display font-black leading-[0.9] tracking-tight text-4xl sm:text-6xl md:text-7xl">
          <span className="block text-black">KRESHANT</span>
          <span
            className="block text-transparent"
            style={{ WebkitTextStroke: "2px #8A2BE2" }}
          >
            KUMAR
          </span>
        </h1>

        {/* ROLE */}
        <p className="mt-6 text-sm sm:text-lg tracking-[0.35em] uppercase text-purple-500 font-semibold">
          Graphic Designer
        </p>

        {/* DESC */}
        <p className="mt-6 max-w-2xl mx-auto text-black/70 text-base md:text-lg">
          I design bold, concept-driven visuals blending culture, emotion, and digital aesthetics.
          My work turns ideas into experiences — not just visuals.
        </p>

        {/* 🚀 CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">

          {/* PRIMARY */}
          <motion.a
            href="#projects"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x: springX, y: springY }}
            className="group relative px-8 py-4 rounded-full
            bg-white/10 backdrop-blur-xl border border-white/30
            text-black font-semibold overflow-hidden
            transition-all duration-300 hover:scale-105"
          >
            {/* glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition" />

            {/* shine */}
            <span className="absolute left-[-100%] top-0 w-full h-full
            bg-gradient-to-r from-transparent via-white/40 to-transparent
            group-hover:left-[100%] transition-all duration-700" />

            <span className="relative flex items-center gap-2">
              View My Work
              <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition" />
            </span>
          </motion.a>

          {/* SECONDARY */}
          <motion.a
            href="#contact"
            className="group relative px-8 py-4 rounded-full
            border border-black/20 text-black font-semibold
            overflow-hidden transition-all duration-300
            hover:bg-black hover:text-white"
          >
            <span className="absolute inset-0 rounded-full border border-transparent
            group-hover:border-purple-400 blur-md opacity-0 group-hover:opacity-100 transition" />

            Let’s Talk
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};
