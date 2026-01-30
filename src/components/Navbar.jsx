import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../data/images/logo-invert-2.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Packages', href: '#packages' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-3'
            : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="Trip To Makkah Logo" 
                className="h-10 w-auto"
              />
            
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#packages')}
                className="btn-primary"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <img 
                    src={logoImage} 
                    alt="Trip To Makkah Logo" 
                    className="h-8 w-auto"
                  />
                  <h2 className="text-xl font-bold text-primary-600">
                    Trip To Makkah
                  </h2>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('#packages')}
                  className="btn-primary mt-4"
                >
                  Book Now
                </button>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-200">
                <div className="space-y-3">
                  <a
                    href="tel:0203 727 6374"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                  >
                    <Phone size={18} />
                    <span className="text-sm">0203 727 6374</span>
                  </a>
                  <a
                    href="mailto:info@triptomakkah.com"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                  >
                    <Mail size={18} />
                    <span className="text-sm">info@triptomakkah.com</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;

