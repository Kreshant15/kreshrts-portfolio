import { motion } from "motion/react";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`flex items-center font-display font-black tracking-tighter ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative flex items-center">
        <span className="text-3xl md:text-4xl text-black flex font-hand">
          {"kreshrts".split("").map((char, i) => (
            <motion.span
              key={i}
              whileHover={{ y: -2, color: "#ff80ab" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {char}
            </motion.span>
          ))}
        </span>
        <motion.div
          className="ml-1 w-2 h-2 bg-accent-pink rounded-full"
          animate={{
            y: [0, -4, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-pink/20 rounded-full" />
      </div>
    </motion.div>
  );
};
