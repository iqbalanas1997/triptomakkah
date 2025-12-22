import { useState } from 'react';
import { motion } from 'framer-motion';
import PackageCard from './PackageCard';
import { packages } from '../data/packages';

const PackagesList = () => {
  const [filter, setFilter] = useState('all');

  const filteredPackages = filter === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.type === filter);

  const filterButtons = [
    { id: 'all', label: 'All Packages' },
    { id: 'premium', label: '5 Star Packages' },
    { id: 'economy', label: 'Economy Packages' },
  ];

  return (
    <section id="packages" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">
            Our Best <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We ensure Best Hotels at Makkah and Madinah<br />
            Airline booking, Transportation etc.<br />
            <strong>Best Umrah Packages 2024 from UK</strong>
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === btn.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} package={pkg} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center bg-primary-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Looking for a Customized Package?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Contact us for personalized Hajj & Umrah packages tailored to your needs
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Contact Us for Customized Packages
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesList;

