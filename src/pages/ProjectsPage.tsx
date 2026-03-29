import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Projects } from "../components/Projects";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const ProjectsPage = () => {
  return (
    <main className="relative selection:bg-accent-pink selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 min-h-screen relative transition-colors duration-700 bg-transparent">
        {/* Background Blobs for consistency */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full blur-[100px] transition-all duration-700 w-[600px] h-[600px] top-[10%] -left-[10%] bg-gradient-to-br from-pastel-purple to-accent-purple opacity-15" 
          />
          <motion.div 
            animate={{ 
              x: [0, -20, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute rounded-full blur-[100px] transition-all duration-700 w-[700px] h-[700px] bottom-[10%] -right-[10%] bg-gradient-to-br from-pastel-blue to-accent-blue opacity-10" 
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-accent-pink transition-colors group text-black/60"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-black">
              ALL <span className="font-hand text-accent-pink">Projects</span>
            </h1>
            <p className="max-w-2xl text-lg text-black/50 font-medium">
              A comprehensive archive of my creative journey, from commercial 
              branding to experimental digital art and UI explorations.
            </p>
          </motion.div>

          {/* Reusing the Projects component but we could also expand it here */}
          <Projects showExploreButton={false} />
        </div>
      </div>

      <Footer />
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-grain" />
    </main>
  );
};
