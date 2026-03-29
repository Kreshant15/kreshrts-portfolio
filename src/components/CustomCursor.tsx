import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring for the outer ring (the "aura")
  const springConfig = { damping: 25, stiffness: 250 };
  const auraX = useSpring(mouseX, springConfig);
  const auraY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest("a, button, [role='button'], input, textarea, .group")
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none hidden md:block">
      {/* Main Dot - Instant tracking */}
      <motion.div
        className="absolute w-2 h-2 bg-black rounded-full"
        style={{ 
          x: mouseX, 
          y: mouseY, 
          translateX: "-50%", 
          translateY: "-50%" 
        }}
      />

      {/* Aura - Smooth following ring */}
      <motion.div
        className="absolute rounded-full border border-black/20"
        style={{ 
          x: auraX, 
          y: auraY, 
          translateX: "-50%", 
          translateY: "-50%",
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          backgroundColor: isHovering ? "rgba(255, 128, 171, 0.15)" : "transparent",
          borderColor: isHovering ? "rgba(255, 128, 171, 0.5)" : "rgba(0, 0, 0, 0.2)",
        }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300,
          backgroundColor: { duration: 0.2 },
          width: { duration: 0.2 },
          height: { duration: 0.2 }
        }}
      >
        {/* Inner Glow for Aura */}
        <motion.div 
          animate={{ 
            scale: isHovering ? [1, 1.2, 1] : 1,
            opacity: isHovering ? 0.4 : 0
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-accent-pink rounded-full blur-md"
        />
      </motion.div>

      {/* Floating Sparkle for Hover */}
      <motion.div
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0,
          rotate: isHovering ? 180 : 0
        }}
        style={{ 
          x: mouseX, 
          y: mouseY, 
          translateX: "20px", 
          translateY: "-20px" 
        }}
        className="absolute text-accent-pink"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </motion.div>
    </div>
  );
};

