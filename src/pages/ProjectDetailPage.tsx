import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Calendar, Tag, User } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";

interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  date: string;
  tags: string[];
  fullDescription: string;
}

const projectDetails: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    title: "Driphive",
    category: "Branding",
    image: "https://picsum.photos/seed/drip/1200/800",
    description: "A modern identity for a premium streetwear brand.",
    client: "Driphive Collective",
    date: "March 2024",
    tags: ["Branding", "Logo Design", "Typography"],
    fullDescription: "Driphive is a streetwear collective that focuses on high-quality, limited-edition drops. The branding needed to reflect a sense of exclusivity while remaining accessible to the urban youth culture. We developed a custom typeface and a versatile logo system that works across digital platforms and physical apparel."
  },
  2: {
    id: 2,
    title: "Vexels",
    category: "Branding",
    image: "https://picsum.photos/seed/vex/1200/800",
    description: "Visual identity for a tech-forward creative agency.",
    client: "Vexels Studio",
    date: "January 2024",
    tags: ["Branding", "Visual Identity", "Web Design"],
    fullDescription: "Vexels Studio required a visual identity that showcased their technical prowess and creative flair. The resulting brand system uses geometric shapes and a vibrant color palette to represent the intersection of technology and art. The project included a full brand guide, stationery, and a responsive website."
  },
  3: {
    id: 3,
    title: "Banana Quest",
    category: "UI Design",
    image: "https://picsum.photos/seed/banana/1200/800",
    description: "A playful and engaging mobile game interface.",
    client: "Monkey Games",
    date: "December 2023",
    tags: ["UI Design", "UX Design", "Game UI"],
    fullDescription: "Banana Quest is a casual mobile game where players navigate a jungle to collect rare bananas. The UI design focused on vibrant colors, chunky buttons, and intuitive navigation to ensure a fun experience for all ages. We created a comprehensive design system including icons, menus, and in-game HUDs."
  },
  4: {
    id: 4,
    title: "Pixel Era",
    category: "Poster Design",
    image: "https://picsum.photos/seed/pixel/1200/800",
    description: "A series of retro-futuristic event posters.",
    client: "Synthwave Nights",
    date: "November 2023",
    tags: ["Poster Design", "Illustration", "Graphic Design"],
    fullDescription: "Pixel Era is a tribute to the 80s synthwave aesthetic. This series of posters was designed for a monthly electronic music event. Using a mix of pixel art and modern gradients, the posters capture the nostalgia of the early digital age while maintaining a contemporary edge."
  }
};

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectDetails[Number(id)];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-accent-pink hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-black/60 hover:text-black mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">Back to Projects</span>
          </Link>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-hand text-3xl text-accent-pink mb-4 block"
              >
                {project.category}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-3xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black mb-8 break-all sm:break-words"
              >
                {project.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-black/70 leading-relaxed max-w-xl"
              >
                {project.description}
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-8 self-end">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-black/40">
                  <User className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">Client</span>
                </div>
                <p className="font-bold text-black">{project.client}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-black/40">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">Date</span>
                </div>
                <p className="font-bold text-black">{project.date}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="col-span-2 space-y-4"
              >
                <div className="flex items-center gap-2 text-black/40">
                  <Tag className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-4 py-2 bg-black/5 rounded-full text-xs font-bold text-black/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative aspect-video rounded-3xl overflow-hidden mb-24 shadow-2xl"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Detailed Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-4xl font-bold mb-8 text-black">The Challenge</h2>
              <p className="text-lg text-black/70 leading-relaxed mb-12">
                {project.fullDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img 
                  src={`https://picsum.photos/seed/${project.id}a/600/400`} 
                  alt="Process 1" 
                  className="rounded-2xl w-full"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src={`https://picsum.photos/seed/${project.id}b/600/400`} 
                  alt="Process 2" 
                  className="rounded-2xl w-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="space-y-12">
              <div className="p-8 bg-pastel-pink/30 rounded-3xl border border-accent-pink/20">
                <h3 className="font-hand text-3xl text-accent-pink mb-4">Quick Note</h3>
                <p className="text-black/70 leading-relaxed italic">
                  "This project was a turning point in my design career, allowing me to explore the 
                  boundaries of {project.category.toLowerCase()} and visual storytelling."
                </p>
              </div>

              <button className="w-full py-6 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-accent-pink transition-colors group">
                View Live Project
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
