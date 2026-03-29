import { motion, AnimatePresence } from "motion/react";
import { Menu, X as CloseIcon, Palette, Instagram, Linkedin, X, Dribbble } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

const MotionLink = motion(Link);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Removed scroll lock to address user report of "glitch and stops scrolling"

  const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Contact", href: "/#contact" },
  ];

  const socialIcons = [
    { Icon: Instagram, href: "https://instagram.com/kreshrts", hoverColor: "hover:text-[#E4405F]" },
  ];

  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3 }}
      className={`fixed top-0 left-0 w-full transition-all duration-300 ${
        isOpen ? "z-[100]" : "z-50"
      } ${
        scrolled || isOpen ? "py-4 bg-white/20 backdrop-blur-md shadow-sm" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -2 }}
            >
              {link.href.startsWith("/#") ? (
                <a
                  href={link.href}
                  className="font-mono text-sm uppercase tracking-widest text-black/80 hover:text-accent-pink transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="font-mono text-sm uppercase tracking-widest text-black/80 hover:text-accent-pink transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </motion.div>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l pl-8 border-black/10">
            {socialIcons.map(({ Icon, href, hoverColor }, i) => (
              <a key={i} href={href} className={`transition-colors text-black/60 ${hoverColor}`}>
                <Icon className="w-5 h-5 cursor-pointer" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <span className="font-hand text-2xl text-accent-pink -rotate-6">Menu</span>
          <button
            className="p-2 text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseIcon /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center gap-8 md:hidden overflow-y-auto py-20"
          >
            <div className="absolute top-8 left-6">
              <Logo />
            </div>
            <button
              className="absolute top-8 right-6 p-2 text-black"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </button>

            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1, rotate: -2 }}
                onClick={() => setIsOpen(false)}
              >
                {link.href.startsWith("/#") ? (
                  <a
                    href={link.href}
                    className="font-display text-4xl font-bold text-black"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="font-display text-4xl font-bold text-black"
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <div className="flex gap-6 mt-8">
              {socialIcons.map(({ Icon, href, hoverColor }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors text-black/60 ${hoverColor}`}
                >
                  <Icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
