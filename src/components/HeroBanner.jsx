import { motion } from 'framer-motion';
import { Phone, Mail, Award, Shield, Plane } from 'lucide-react';

const HeroBanner = () => {
  const scrollToPackages = () => {
    const element = document.querySelector('#packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                🕋 Certified by IATA, ATOL & Ministry of Hajj & Umrah
              </span>
            </motion.div>

            <h1 className="heading-primary text-gradient mb-6">
              Welcome to<br />
              <span className="text-primary-600">Trip To Makkah</span>
            </h1>

            <p className="text-xl text-gray-700 mb-4 leading-relaxed">
              <strong>Hajj & Umrah Travel LTD</strong>
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Trip To Makkah hajj & Umrah Travel Ltd has been catering to the UK Muslim community desirous of performing Umrah and Hajj. We are certified by the <strong>International Air Transport Association (IATA)</strong>, <strong>Air Travel Organiser's Licence (ATOL)</strong> and registered by the <strong>Ministry of Hajj & Umrah of Saudi Arabia</strong>.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="tel:+442037276363"
                className="flex items-center justify-center lg:justify-start space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Phone size={20} />
                <span className="font-medium">+44 203 7276363</span>
              </a>
              <a
                href="mailto:info@triptomakkah.co.uk"
                className="flex items-center justify-center lg:justify-start space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Mail size={20} />
                <span className="font-medium">info@triptomakkah.co.uk</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
            </div>
          </motion.div>

          {/* Right Content - Trust Badges */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { icon: Award, title: 'IATA Certified', color: 'bg-blue-100 text-blue-700' },
              { icon: Shield, title: 'ATOL Protected', color: 'bg-green-100 text-green-700' },
              { icon: Plane, title: 'Ministry Approved', color: 'bg-purple-100 text-purple-700' },
              { icon: Award, title: '20+ Years Experience', color: 'bg-gold-400/20 text-gold-600' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`${badge.color} p-6 rounded-xl text-center shadow-lg`}
              >
                <badge.icon className="mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-sm">{badge.title}</h3>
              </motion.div>
            ))}
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

