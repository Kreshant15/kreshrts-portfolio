import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => {
  const [activeLegal, setActiveLegal] = useState<string | null>(null);

  const legalContent: Record<string, { title: string; content: string }> = {
    Privacy: {
      title: "Privacy Policy",
      content: "Your data is safe here. I don’t sell it, share it, or do anything shady with it. Honestly, I’m more interested in designing cool stuff than collecting your information."
    },
    Terms: {
      title: "Terms of Service",
      content: "Everything you see here is original work (unless stated otherwise). Feel free to get inspired — just don’t copy-paste it and call it yours. That’s not cool."
    },
    Cookies: {
      title: "Cookie Policy",
      content: "Yes, this site uses cookies. Not the tasty kind unfortunately — just the boring digital ones that help the site run smoothly. No tracking your life story, no creepy stuff. Just enough to keep things working and maybe make your experience slightly better."
    }
  };

  return (
    <footer className="py-12 px-6 border-t border-black/5 bg-transparent relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Logo />
        
        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-black/80">
          {Object.keys(legalContent).map((key) => (
            <button
              key={key}
              onClick={() => setActiveLegal(key)}
              className="hover:text-accent-pink transition-colors cursor-pointer"
            >
              {key}
            </button>
          ))}
        </div>

        <div className="text-black/80 font-mono text-xs">
          © {new Date().getFullYear()} — Handcrafted with ✨ by Kreshant
        </div>
      </div>

      {/* Legal Modal */}
      <AnimatePresence>
        {activeLegal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLegal(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white border-4 border-black rounded-[2rem] p-8 max-w-md w-full relative z-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              <button
                onClick={() => setActiveLegal(null)}
                className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="font-display text-3xl font-black mb-4 tracking-tight uppercase">
                {legalContent[activeLegal].title}
              </h3>
              <p className="text-black/70 leading-relaxed font-medium">
                {legalContent[activeLegal].content}
              </p>
              <button
                onClick={() => setActiveLegal(null)}
                className="mt-8 w-full py-4 bg-black text-white rounded-full font-bold hover:bg-accent-pink transition-colors"
              >
                Got it!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
