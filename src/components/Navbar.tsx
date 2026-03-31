import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Menu, 
  X as CloseIcon, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Dribbble 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll lock and background
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Contact", href: "/#contact" },
  ];

  const socialIcons = [
    { Icon: Instagram, href: "https://instagram.com/kreshrts", label: "Instagram" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/kreshant-kumar", label: "LinkedIn" },
    { Icon: Dribbble, href: "https://dribbble.com/Kresh_15", label: "Dribbble" },
    { Icon: Twitter, href: "https://x.com/kreshrts", label: "Twitter" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
        scrolled ? "py-4 bg-white/90 backdrop-blur-md shadow-sm" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" aria-label="Kreshant Kumar homepage">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name}>
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
            </div>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l pl-8 border-black/10">
            {socialIcons.map(({ Icon, href, label }, i) => (
              <a 
                key={i} 
                href={href} 
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-black/60 hover:text-accent-pink"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="p-2 text-black"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <CloseIcon /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Fixed Position */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white z-[60] md:hidden"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            zIndex: 60
          }}
        >
          <div className="flex flex-col h-full pt-20 pb-10">
            {/* Header */}
            <div className="px-6 flex justify-between items-center border-b border-gray-100 pb-6">
              <Logo />
              <button
                className="p-2 text-black"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 overflow-y-auto">
              <div className="space-y-8">
                {navLinks.map((link) => (
                  <div key={link.name} className="text-center">
                    {link.href.startsWith("/#") ? (
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="font-display text-4xl font-bold text-black hover:text-accent-pink transition-colors block py-2"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="font-display text-4xl font-bold text-black hover:text-accent-pink transition-colors block py-2"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="px-6 pt-6 border-t border-gray-100">
              <div className="flex justify-center gap-8 py-6">
                {socialIcons.map(({ Icon, href, label }, i) => (
                  <a 
                    key={i} 
                    href={href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="text-black hover:text-accent-pink transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
