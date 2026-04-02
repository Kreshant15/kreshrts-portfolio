import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const instagramPosters = [
  { id: 1, url: "/images/insta/Rebirth.webp",      title: "Rebirth" },
  { id: 2, url: "/images/insta/Ahinsa.webp",       title: "Ahiṃsā" },
  { id: 3, url: "/images/insta/Digital-Skin.webp", title: "Digital Skin" },
  { id: 4, url: "/images/insta/antaryatra.webp",   title: "Antaryātrā" },
  { id: 5, url: "/images/insta/Ember.webp",        title: "Ember" },
  { id: 6, url: "/images/insta/krodh.webp",        title: "Krodha" },
  { id: 7, url: "/images/insta/Greed.webp",        title: "Greed" },
  { id: 8, url: "/images/insta/Lo-Fi-Utopia.webp", title: "Lo-Fi Utopia" },
];

// ─── Single poster card ──────────────────────────────────────────────────────

const PosterCard = ({
  poster,
}: {
  poster: (typeof instagramPosters)[0];
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-48 sm:w-56 md:w-64 aspect-[4/5]
        rounded-2xl overflow-hidden cursor-pointer
        border border-white/20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={poster.url}
        alt={`${poster.title} — poster by @kreshrts`}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Bottom gradient + title — same warm purple as site */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-[#0d0010]/80 via-transparent to-transparent
          flex items-end p-4 pointer-events-none"
      >
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-purple-300 mb-1">
            @kreshrts
          </p>
          <p
            className="text-white font-black text-base leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {poster.title}
          </p>
        </div>
      </motion.div>

      {/* Grain on card — matches site texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />
    </div>
  );
};

// ─── Marquee Row ─────────────────────────────────────────────────────────────

const MarqueeRow = ({
  direction = "left",
  speed = 30,
  items,
}: {
  direction?: "left" | "right";
  speed?: number;
  items: typeof instagramPosters;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const tripled = [...items, ...items, ...items]; // triple for seamless loop

  return (
    <div className="relative overflow-hidden">
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : { x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex gap-4 px-2 will-change-transform"
        style={{ width: "max-content" }}
      >
        {tripled.map((poster, i) => (
          <PosterCard
            poster={poster}
          />
        ))}
      </motion.div>
    </div>
  );
};

// ─── Section Label (consistent with rest of site) ────────────────────────────

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

// ─── Main Carousel ───────────────────────────────────────────────────────────

export const InstagramCarousel = () => {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <section
      aria-label="Instagram visual work by @kreshrts"
      className="relative py-24 md:py-32 overflow-hidden bg-[#faf7f2]"
    >
      {/* ── BACKGROUND (same system) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[300px]
          bg-gradient-to-r from-violet-100/30 via-purple-50/20 to-amber-50/20
          blur-[100px] rounded-full" />
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

      {/* ── HEADER ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-14 md:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <SectionLabel>Visual World</SectionLabel>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black leading-[0.9] tracking-tight"
            >
              <span
                className="block text-[clamp(2rem,6vw,4.5rem)] text-[#111111]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                MY POSTER
              </span>
              <span
                className="block text-[clamp(2rem,6vw,4.5rem)]"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px #7c3aed",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Universe.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="max-w-xs text-sm leading-relaxed text-neutral-400 font-light sm:text-right"
          >
            Experiments, ideas, and creative drops — a glimpse into the visual language of @kreshrts.
          </motion.p>
        </div>

        {/* Divider line */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
      </div>

      {/* ── DUAL MARQUEE ── */}
      <div className="space-y-4" ref={rowRef}>
        {/* Row 1 — left scroll */}
        <MarqueeRow direction="left"  speed={32} items={instagramPosters} />
        {/* Row 2 — right scroll (reversed) */}
        <MarqueeRow direction="right" speed={40} items={[...instagramPosters].reverse()} />
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Divider */}
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent mb-10" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Counter */}
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            {instagramPosters.length} posters & counting ✦
          </p>

          {/* CTA button — matches Hero primary */}
          <motion.a
            href="https://instagram.com/kreshrts"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5
              px-7 py-3 rounded-full
              font-semibold text-sm text-white overflow-hidden
              shadow-[0_4px_20px_rgba(124,58,237,0.3)]
              hover:shadow-[0_6px_28px_rgba(124,58,237,0.45)]
              transition-shadow duration-300"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)",
            }}
            aria-label="Follow @kreshrts on Instagram"
          >
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                bg-gradient-to-r from-transparent via-white/25 to-transparent
                transition-transform duration-700"
            />
            <span className="relative">Follow @kreshrts</span>
            <ArrowUpRight className="relative w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramCarousel;
