import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Driphive",
    category: "Branding",
    image: "https://picsum.photos/seed/drip/800/600",
    color: "bg-pastel-pink",
  },
  {
    id: 2,
    title: "Vexels",
    category: "Branding",
    image: "https://picsum.photos/seed/vex/800/600",
    color: "bg-pastel-blue",
  },
  {
    id: 3,
    title: "Banana Quest",
    category: "UI Design",
    image: "https://picsum.photos/seed/banana/800/600",
    color: "bg-pastel-yellow",
  },
  {
    id: 4,
    title: "Pixel Era",
    category: "Poster Design",
    image: "https://picsum.photos/seed/pixel/800/600",
    color: "bg-pastel-purple",
  },
];

export const Projects = ({ showExploreButton = true }: { showExploreButton?: boolean }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section id="projects" className="py-24 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-hand text-2xl text-accent-pink mb-4 block"
            >
              Selected Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-black"
            >
              PROJECT <span className="font-hand text-accent-pink">Gallery</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-md text-black/80 font-medium mb-2"
          >
            A curated mix of branding, visual experiments, and concept-driven design — where each project explores a different idea, mood, or story.

          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {projects.map((project) => (
            <Link
              to={`/project/${project.id}`}
              key={project.id}
              className="group relative block"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div variants={itemVariants}>
                {/* Main Card Container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(255,128,171,0.3)]">
                {/* Image with Anime Zoom */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  animate={{ 
                    scale: hoveredId === project.id ? 1.1 : 1,
                    filter: hoveredId === project.id ? "grayscale(0%) contrast(1.1)" : "grayscale(20%) contrast(1)"
                  }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />

                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                {/* HUD Elements */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                  {/* Top HUD */}
                  <div className="flex justify-between items-start">
                    <motion.div
                      animate={{ 
                        opacity: hoveredId === project.id ? 1 : 0,
                        x: hoveredId === project.id ? 0 : -20
                      }}
                      className="flex flex-col gap-1"
                    >
                      <div className="w-8 h-[2px] bg-accent-pink" />
                      <div className="w-[2px] h-8 bg-accent-pink" />
                      <span className="font-mono text-[10px] text-accent-pink mt-2 tracking-tighter">ID: 00{project.id}</span>
                    </motion.div>
                    
                    <motion.div
                      animate={{ 
                        opacity: hoveredId === project.id ? 1 : 0,
                        x: hoveredId === project.id ? 0 : 20
                      }}
                      className="flex flex-col items-end gap-1"
                    >
                      <div className="w-8 h-[2px] bg-accent-pink" />
                      <div className="w-[2px] h-8 bg-accent-pink" />
                      <span className="font-mono text-[10px] text-accent-pink mt-2 tracking-tighter">STATUS: ACTIVE</span>
                    </motion.div>
                  </div>

                  {/* Center Impact */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: hoveredId === project.id ? [0.8, 1.1, 1] : 0.8,
                        opacity: hoveredId === project.id ? 1 : 0,
                        rotate: hoveredId === project.id ? [0, 90, 0] : 0
                      }}
                      className="w-24 h-24 border border-accent-pink/30 rounded-full flex items-center justify-center"
                    >
                      <div className="w-16 h-16 border border-accent-pink/50 rounded-full flex items-center justify-center animate-pulse">
                        <Plus className="w-8 h-8 text-accent-pink" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom HUD */}
                  <div className="flex justify-between items-end">
                    <motion.div
                      animate={{ 
                        opacity: hoveredId === project.id ? 1 : 0,
                        y: hoveredId === project.id ? 0 : 20
                      }}
                      className="flex flex-col gap-1"
                    >
                      <span className="font-mono text-[10px] text-accent-pink mb-2 tracking-tighter">COORD: 35.6895° N</span>
                      <div className="w-[2px] h-8 bg-accent-pink" />
                      <div className="w-8 h-[2px] bg-accent-pink" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ 
                        opacity: hoveredId === project.id ? 1 : 0,
                        y: hoveredId === project.id ? 0 : 20
                      }}
                      className="flex flex-col items-end gap-1"
                    >
                      <span className="font-mono text-[10px] text-accent-pink mb-2 tracking-tighter">TYPE: {project.category.split(' ')[0].toUpperCase()}</span>
                      <div className="w-[2px] h-8 bg-accent-pink" />
                      <div className="w-8 h-[2px] bg-accent-pink" />
                    </motion.div>
                  </div>
                </div>

                {/* Glitch Flash */}
                <motion.div
                  animate={{ 
                    opacity: hoveredId === project.id ? [0, 0.3, 0] : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-white pointer-events-none"
                />
              </div>

              {/* Info Section */}
              <div className="mt-8 relative">
                <motion.div
                  animate={{ 
                    x: hoveredId === project.id ? [0, -2, 2, -2, 0] : 0
                  }}
                  transition={{ duration: 0.2, repeat: hoveredId === project.id ? Infinity : 0, repeatDelay: 2 }}
                >
                  <h3 className="font-display text-3xl font-black mb-2 tracking-tighter text-black group-hover:text-accent-pink transition-colors">
                    {project.title}
                  </h3>
                </motion.div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/60">{project.category}</span>
                  <div className="h-[1px] flex-grow bg-black/10 group-hover:bg-accent-pink/30 transition-colors" />
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

        {showExploreButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-20 text-center"
          >
            <Link 
              to="/projects"
              className="inline-block px-12 py-5 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition-all group text-black"
            >
              Explore All Projects 
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
