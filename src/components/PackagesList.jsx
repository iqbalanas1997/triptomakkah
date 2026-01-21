import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PackageCard from './PackageCard';

const PackagesList = () => {
  const [filter, setFilter] = useState('all');
  const [packages, setPackages] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [threeStarPackages, setThreeStarPackages] = useState([]);
  const [fourStarPackages, setFourStarPackages] = useState([]);
  const [fiveStarPackages, setFiveStarPackages] = useState([]);
  const [ramadanPackages, setRamadanPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages from JSON file
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/data/umrahPackages.json');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        
        // Transform data to match existing PackageCard structure
        const transformPackage = (pkg) => ({
          id: pkg.packageId,
          title: pkg.packageTitle,
          price: pkg.price,
          nights: typeof pkg.nightsMakkah === 'number' && typeof pkg.nightsMadinah === 'number' 
            ? pkg.nightsMakkah + pkg.nightsMadinah 
            : pkg.duration,
          departure: "as per your desire",
          hotelMakkah: pkg.hotelMakkah,
          hotelMakkahStars: pkg.category === '3-star' ? 3 : pkg.category === '4-star' ? 4 : pkg.category === '5-star' ? 5 : pkg.category === 'ramadan' ? (pkg.packageTitle.includes('3 Star') ? 3 : pkg.packageTitle.includes('4 Star') ? 4 : 5) : 4,
          hotelMakkahNights: typeof pkg.nightsMakkah === 'number' ? pkg.nightsMakkah : undefined,
          hotelMadinah: pkg.hotelMadinah,
          hotelMadinahStars: pkg.category === '3-star' ? 3 : pkg.category === '4-star' ? 4 : pkg.category === '5-star' ? 5 : pkg.category === 'ramadan' ? (pkg.packageTitle.includes('3 Star') ? 3 : pkg.packageTitle.includes('4 Star') ? 4 : 5) : 5,
          hotelMadinahNights: typeof pkg.nightsMadinah === 'number' ? pkg.nightsMadinah : undefined,
          inclusions: pkg.inclusions || [],
          featured: pkg.featured || false,
          type: pkg.category === '3-star' ? 'economy' : pkg.category === '5-star' ? 'premium' : pkg.category === 'ramadan' ? 'ramadan' : 'economy',
          custom: pkg.custom || false,
          badge: pkg.badge,
          transportType: pkg.transportType,
          duration: pkg.duration,
          imageUrl: pkg.imageUrl
        });

        const threeStar = (data.threeStarPackages || []).map(transformPackage);
        const fourStar = (data.fourStarPackages || []).map(transformPackage);
        const fiveStar = (data.fiveStarPackages || []).map(transformPackage);
        const ramadan = (data.ramadanPackages || []).map(transformPackage);
        
        const all = [...threeStar, ...fourStar, ...fiveStar, ...ramadan];
        
        setThreeStarPackages(threeStar);
        setFourStarPackages(fourStar);
        setFiveStarPackages(fiveStar);
        setRamadanPackages(ramadan);
        setAllPackages(all);
        setPackages(all);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Update filtered packages when filter changes
  useEffect(() => {
    if (filter === 'all') {
      setPackages(allPackages);
    } else if (filter === '3star') {
      setPackages(threeStarPackages);
    } else if (filter === '4star') {
      setPackages(fourStarPackages);
    } else if (filter === '5star') {
      setPackages(fiveStarPackages);
    } else if (filter === 'ramadan') {
      setPackages(ramadanPackages);
    }
  }, [filter, allPackages, threeStarPackages, fourStarPackages, fiveStarPackages, ramadanPackages]);

  const filterButtons = [
    { id: 'all', label: 'All Packages' },
    { id: '3star', label: '3 Star Packages' },
    { id: '4star', label: '4 Star Packages' },
    { id: '5star', label: '5 Star Packages' },
    { id: 'ramadan', label: 'Ramadan Packages' },
  ];

  if (loading) {
    return (
      <section id="packages" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-gray-600">Loading packages...</p>
          </div>
        </div>
      </section>
    );
  }

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
            <strong>Best Umrah Packages 2026 from UK</strong>
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
          {packages.map((pkg, index) => (
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
