import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      'Umrah Packages',
      'Hajj Packages',
      'Al Aqsa Packages',
      'Hajj Guide',
      'Umrah Guide – English',
      'Umrah Guide – Urdu',
    ],
    company: [
      { name: 'Home', href: '#home' },
      { name: 'About Us', href: '#about' },
      { name: 'Packages', href: '#packages' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-3xl">🕋</div>
              <h3 className="text-2xl font-bold text-white">Trip to Makkah</h3>
            </div>
            <p className="text-gray-400 mb-2 text-sm">
              A trade name of Super Destinations Ltd
            </p>
            <p className="text-gray-400 mb-4 text-sm">
              Booking, reviews and advices on hotels, resorts, flights, vacation rentals, travel packages, and lots more!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection('#packages')}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  <strong>Trip to makkah</strong>, registered at 344-348 High Road, Ilford<br />
                  Essex IG1 1QP, United Kingdom
                </span>
              </li>
              <li>
                <a
                  href="tel:+447946890999"
                  className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Phone size={18} className="text-primary-400" />
                  <span className="text-sm"><strong>+447946890999</strong></span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@triptomakkah.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Mail size={18} className="text-primary-400" />
                  <span className="text-sm">info@triptomakkah.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-white font-bold text-lg mb-4">Subscribe to Our Newsletter</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Copyright@{currentYear}, All Rights Reserved
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Trip to Makkah – Hajj & Umrah Travel UK
          </p>
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <button className="text-gray-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </button>
            <span className="text-gray-600">|</span>
            <button className="text-gray-400 hover:text-primary-400 transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

