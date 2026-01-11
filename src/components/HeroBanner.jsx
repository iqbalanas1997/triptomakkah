import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import welcomeImage from '../data/images/welcome.jpeg';
import bannerImage from '../data/images/banner.jpg';
import welcomeBannerImage from '../data/images/welcome banner.jpg';
import iataLogo from '../data/images/png-clipart-international-air-transport-association-logo-airline-air-cargo-international-association-of-travel-agents-network-air-shipping-blue-text-removebg-preview.png';

const HeroBanner = () => {
  const scrollToPackages = () => {
    const element = document.querySelector('#packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={welcomeBannerImage} 
          alt="Welcome Banner Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="heading-primary text-gradient mb-6"
            >
              Welcome to<br />
              <span className="text-primary-600">Trip To Makkah</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-gray-700 mb-4 leading-relaxed font-bold"
            >
              Hajj & Umrah Travel LTD
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              Trip To Makkah hajj & Umrah Travel Ltd has been catering to the UK Muslim community desirous of performing Umrah and Hajj. We are certified by the <strong>International Air Transport Association (IATA)</strong>, <strong>Air Travel Organiser's Licence (ATOL)</strong> and registered by the <strong>Ministry of Hajj & Umrah of Saudi Arabia</strong>.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <a
                href="tel:+923232202360"
                className="flex items-center justify-center lg:justify-start space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                <Phone size={20} />
                <span>+92 323 2202360</span>
              </a>
              <a
                href="mailto:info@triptomakkah.co.uk"
                className="flex items-center justify-center lg:justify-start space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                <Mail size={20} />
                <span>info@triptomakkah.co.uk</span>
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToPackages}
                className="btn-primary text-lg px-8 py-4"
              >
                View Best Packages
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image and Trust Badges */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Welcome Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={welcomeImage} 
                alt="Welcome to Trip To Makkah" 
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">We are authorized</h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <div className="flex flex-col items-center">
                  <img 
                    src={iataLogo} 
                    alt="IATA Certified" 
                    className="h-12 w-auto object-contain mb-2"
                  />
                  <span className="text-xs text-gray-600 font-semibold">IATA</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-600 text-white px-4 py-2 rounded font-bold text-sm mb-2">
                    ATOL
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Protected</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-primary-600 text-white px-4 py-2 rounded font-bold text-sm mb-2">
                    KSA
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Ministry</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mt-4 italic">
                Approved from IATA, ATOL and Ministry of Hajj & Umrah Saudia
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-primary-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;

