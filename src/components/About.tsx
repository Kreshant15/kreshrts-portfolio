import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  Figma, Palette, Zap, Layout, Image as ImageIcon,
  Code, MapPin, GraduationCap, User, Instagram, Briefcase,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const skills = [
  { name: "Photoshop",       icon: <ImageIcon className="w-4 h-4" />, color: "#31A8FF" },
  { name: "Illustrator",     icon: <Palette   className="w-4 h-4" />, color: "#FF9A00" },
  { name: "Figma",           icon: <Figma     className="w-4 h-4" />, color: "#A259FF" },
  { name: "InDesign",        icon: <Layout    className="w-4 h-4" />, color: "#FF3366" },
  { name: "Canva",           icon: <Palette   className="w-4 h-4" />, color: "#00C4CC" },
  { name: "After Effects",   icon: <Zap       className="w-4 h-4" />, color: "#9999FF" },
  { name: "DaVinci Resolve", icon: <ImageIcon className="w-4 h-4" />, color: "#0055FF" },
  { name: "CorelDRAW",       icon: <Palette   className="w-4 h-4" />, color: "#00A950" },
  { name: "HTML / CSS",      icon: <Code      className="w-4 h-4" />, color: "#E34F26" },
];

const profileRows = [
  {
    label: "Name",
    value: "Kreshant Kumar",
    icon: <User className="w-4 h-4" />,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    label: "Role",
    value: "Graphic Designer",
    icon: <Briefcase className="w-4 h-4" />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "Based",
    value: "Dharamshala, Himachal, India",
    icon: <MapPin className="w-4 h-4" />,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    label: "Education",
    value: "Diploma: Graphic & Web Design\nBA: Journalism & Mass Comm.",
    icon: <GraduationCap className="w-4 h-4" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

// ─── Skill Pill ──────────────────────────────────────────────────────────────

const SkillPill = ({
  name, icon, color, index,
}: {
  name: string; icon: React.ReactNode; color: string; index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.045, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-default select-none"
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? color : "rgba(255,255,255,0.8)",
          borderColor:     hovered ? color : "rgba(0,0,0,0.08)",
          color:           hovered ? "#fff" : "#111",
          scale:           hovered ? 1.06  : 1,
        }}
        transition={{ duration: 0.22 }}
        className="flex items-center gap-2.5 px-4 py-2 rounded-full
          border backdrop-blur-sm shadow-sm"
      >
        <motion.span
          animate={{ color: hovered ? "#fff" : color }}
          transition={{ duration: 0.22 }}
        >
          {icon}
        </motion.span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
          {name}
        </span>
      </motion.div>

      {/* Glow behind pill on hover */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-full blur-md -z-10 opacity-40"
          style={{ backgroundColor: color }}
        />
      )}
    </motion.div>
  );
};

// ─── Section Label (same as Projects) ───────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="inline-flex items-center gap-2
      font-mono text-[10px] uppercase tracking-[0.3em]
      text-purple-600 mb-4"
  >
    <span className="w-4 h-px bg-purple-400" />
    {children}
  </motion.span>
);

// ─── Main About ──────────────────────────────────────────────────────────────

export const About = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Kreshant Kumar"
      className="relative py-28 md:py-36 px-4 sm:px-6 overflow-hidden bg-[#faf7f2]"
    >
      {/* ── BACKGROUND (matches Hero / Projects) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-0 w-[500px] h-[500px]
          bg-gradient-to-br from-violet-100/40 to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
          bg-gradient-to-tl from-amber-100/30 to-transparent blur-[80px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(#8b5cf6 1px, transparent 1px),
              linear-gradient(90deg, #8b5cf6 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── SECTION HEADER ── */}
        <div className="mb-16 md:mb-20">
          <SectionLabel>The Story</SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black leading-[0.9] tracking-tight"
          >
            <span
              className="block text-[clamp(2.4rem,7vw,5.5rem)] text-[#111111]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              BORN IN THE
            </span>
            <span
              className="block text-[clamp(2.4rem,7vw,5.5rem)]"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px #7c3aed",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              DIGITAL ERA.
            </span>
          </motion.h2>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Profile card ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Photo + badge */}
            <div className="relative w-44 h-44 md:w-56 md:h-56 mx-auto lg:mx-0">
              {/* Purple ring — outline style matching "KUMAR" in Hero */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "transparent",
                  border: "2px solid #7c3aed",
                  transform: "rotate(-6deg) scale(1.06)",
                }}
              />
              {/* Solid amber fill ring for depth */}
              <div className="absolute inset-0 rounded-full bg-amber-100/60 rotate-3 scale-105" />

              {/* Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/80 shadow-xl z-10">
                <img
                  src="/images/me/kresh.webp"
                  alt="Kreshant Kumar — Graphic Designer from Himachal Pradesh"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* "That's me!" label */}
              <motion.span
                initial={{ opacity: 0, rotate: -20 }}
                whileInView={{ opacity: 1, rotate: -12 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -top-10 -left-10 font-mono text-xs
                  text-purple-500 tracking-widest uppercase hidden md:block"
                style={{ writingMode: "vertical-rl", transform: "rotate(-180deg)" }}
              >
                That's me!
              </motion.span>

              {/* Open to work badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-4 z-20
                inline-flex items-center gap-1.5
                bg-white/90 backdrop-blur-sm border border-neutral-200
                px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600">
                  Open to work
                </span>
              </div>
            </div>

            {/* Profile info card */}
            <div className="relative rounded-2xl overflow-hidden
              bg-white/70 backdrop-blur-md
              border border-neutral-200/80
              shadow-[0_2px_24px_rgba(0,0,0,0.07)]
              p-6 md:p-7 space-y-5"
            >
              {/* Subtle corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32
                bg-gradient-to-bl from-violet-100/50 to-transparent rounded-bl-full pointer-events-none" />

              {profileRows.map((row) => (
                <div key={row.label} className="flex items-start gap-4 relative z-10">
                  <div className={`shrink-0 p-2 rounded-xl ${row.iconBg}`}>
                    <span className={row.iconColor}>{row.icon}</span>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-0.5">
                      {row.label}
                    </p>
                    <p className="text-sm font-semibold text-[#111] leading-snug whitespace-pre-line">
                      {row.value}
                    </p>
                  </div>
                </div>
              ))}

              {/* Personality + IG */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-1">
                    Personality
                  </p>
                  <p className="text-sm font-bold text-violet-600">INTP ✦ Taurus</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-1">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/kreshrts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#111]
                      hover:text-violet-600 transition-colors duration-200"
                  >
                    <Instagram className="w-3 h-3" />
                    @kreshrts
                  </a>
                </div>
              </div>

              {/* Resume CTA */}
              <motion.a
                href="/doc/Kreshant_Fresher_Designer_CV.pdf"
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative block w-full py-3.5 rounded-full text-center
                  font-semibold text-sm text-white overflow-hidden
                  shadow-[0_4px_20px_rgba(124,58,237,0.3)]
                  hover:shadow-[0_6px_28px_rgba(124,58,237,0.45)]
                  transition-shadow duration-300"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)",
                }}
                aria-label="Download Kreshant Kumar's design resume"
              >
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                    bg-gradient-to-r from-transparent via-white/25 to-transparent
                    transition-transform duration-700"
                />
                <span className="relative">Download Resume</span>
              </motion.a>
            </div>
          </motion.div>

          {/* ── RIGHT: Bio + Skills ── */}
          <div className="lg:pt-2">

            {/* Bio text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base md:text-lg leading-relaxed text-neutral-500 font-light mb-12"
            >
              I'm a graphic designer who sees design as more than visuals — it's a way to explore
              ideas, emotions, and meaning. My work blends digital culture, philosophy, and
              experimental aesthetics. Whether it's a streetwear brand or a conceptual poster
              series, I focus on work that doesn't just{" "}
              <em className="text-[#111] not-italic font-semibold">look good</em> — it{" "}
              <em className="text-violet-600 not-italic font-semibold">says something</em>.
            </motion.p>

            {/* Skills */}
            <div id="skills">
              <SectionLabel>My Toolkit</SectionLabel>

              <div className="flex flex-wrap gap-2.5 mt-4">
  {skills.map((skill, i) => (
    <SkillPill
      name={skill.name}
      icon={skill.icon}
      color={skill.color}
      index={i}
    />
  ))}
</div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.55 }}
                className="mt-12 grid grid-cols-3 gap-4"
              >
                {[
                  { value: "4+", label: "Projects" },
                  { value: "9+", label: "Poster Series" },
                  { value: "∞",  label: "Ideas" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-neutral-200/80 bg-white/60
                      backdrop-blur-sm p-4 text-center
                      shadow-[0_1px_12px_rgba(0,0,0,0.05)]"
                  >
                    <p
                      className="font-black text-3xl md:text-4xl leading-none text-[#111]"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;