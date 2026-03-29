import { motion } from "motion/react";
import { Send, Mail, Instagram, Linkedin, X, Dribbble } from "lucide-react";

export const Contact = () => {
  const socialLinks = [
    { Icon: Instagram, href: "https://instagram.com/kreshrts", color: "hover:bg-[#E4405F] hover:border-[#E4405F]" },
    { Icon: Linkedin, href: "#", color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]" },
    { Icon: Dribbble, href: "#", color: "hover:bg-[#EA4C89] hover:border-[#EA4C89]" },
    { 
      Icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.584 2.236-2.597 4-4.974 4-2.828 0-5.125-2.297-5.125-5.125s2.297-5.125 5.125-5.125c2.455 0 4.495 1.718 4.998 4h-2.235c-.45-1.066-1.516-1.8-2.763-1.8-1.668 0-3.025 1.357-3.025 3.025s1.357 3.025 3.025 3.025c1.159 0 2.151-.652 2.66-1.6h2.309zm-12.059-3c0 .856-.391 1.579-1.062 2.037.712.463 1.162 1.235 1.162 2.132 0 1.484-1.207 2.691-2.691 2.691h-5.076v-14h4.751c1.381 0 2.5 1.119 2.5 2.5 0 .851-.425 1.588-1.076 2.04.814.47 1.492 1.323 1.492 2.6zm-7.001-4.5h2.385c.552 0 1-.448 1-1s-.448-1-1-1h-2.385v2zm0 7.5h2.71c.552 0 1-.448 1-1s-.448-1-1-1h-2.71v2z"/>
        </svg>
      ), 
      href: "#", 
      color: "hover:bg-[#053eff] hover:border-[#053eff]" 
    },
    { Icon: X, href: "#", color: "hover:bg-black hover:border-black" },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-accent-purple mb-4 block"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative font-display text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tighter text-black"
            >
              LET'S CREATE <br />
              <span className="text-accent-pink drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">SOMETHING</span> <br />
              COOL TOGETHER.
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-12 -right-12 font-hand text-5xl text-accent-purple -rotate-12 hidden md:block"
              >
                Say Hi!
              </motion.div>
            </motion.h2>
            
            <div className="space-y-6 mt-12">
              <a href="mailto:kreshant2002@gmail.com" className="flex items-center gap-4 group">
                <div className="p-4 bg-pastel-purple rounded-full group-hover:bg-accent-purple transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase text-black/40">Email Me</p>
                  <p className="text-xl font-bold text-black">kreshant2002@gmail.com</p>
                </div>
              </a>

              <div className="flex gap-4 pt-8">
                {socialLinks.map(({ Icon, href, color }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className={`p-4 border-2 border-black rounded-2xl hover:text-white transition-all text-black ${color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-pastel-yellow/40 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-mono text-xs uppercase mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-6 py-4 bg-white border-2 border-black rounded-2xl focus:outline-none focus:ring-4 ring-accent-pink/20 transition-all"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full px-6 py-4 bg-white border-2 border-black rounded-2xl focus:outline-none focus:ring-4 ring-accent-pink/20 transition-all"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase mb-2">Your Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 bg-white border-2 border-black rounded-2xl focus:outline-none focus:ring-4 ring-accent-pink/20 transition-all resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 group"
              >
                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
