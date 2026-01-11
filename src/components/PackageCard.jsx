import { motion } from 'framer-motion';
import { Calendar, Moon, Star, MapPin, CheckCircle } from 'lucide-react';

const PackageCard = ({ package: pkg, index }) => {
  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < count ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card ${pkg.featured ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`}
    >
      {pkg.badge && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-2 px-4 text-center font-semibold text-sm">
          ⭐ {pkg.badge}
        </div>
      )}
      {pkg.featured && !pkg.badge && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-2 px-4 text-center font-semibold text-sm">
          ⭐ Featured Package
        </div>
      )}

      {/* Package Image */}
      {pkg.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={pkg.imageUrl} 
            alt={pkg.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
            <div className="text-3xl font-bold text-primary-600 mb-2">{pkg.price}</div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
          <div className="text-4xl">🕋</div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2 text-gray-700">
            <Moon size={18} className="text-primary-600" />
            <span className="text-sm">
              <strong>{typeof pkg.nights === 'number' ? `${pkg.nights} Nights` : pkg.nights}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <Calendar size={18} className="text-primary-600" />
            <span className="text-sm">
              <strong>Departure:</strong> {pkg.departure}
            </span>
          </div>

          {/* Makkah Hotel */}
          <div className="bg-primary-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary-600" />
                <span className="text-sm font-semibold text-gray-900">Makkah</span>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(pkg.hotelMakkahStars)}
              </div>
            </div>
            <div className="text-sm text-gray-700 ml-6">
              {pkg.hotelMakkah}
              {pkg.hotelMakkahNights && (
                <span className="text-gray-500"> ({pkg.hotelMakkahNights} Nights)</span>
              )}
            </div>
          </div>

          {/* Madinah Hotel */}
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-green-600" />
                <span className="text-sm font-semibold text-gray-900">Madinah</span>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(pkg.hotelMadinahStars)}
              </div>
            </div>
            <div className="text-sm text-gray-700 ml-6">
              {pkg.hotelMadinah}
              {pkg.hotelMadinahNights && (
                <span className="text-gray-500"> ({pkg.hotelMadinahNights} Nights)</span>
              )}
            </div>
          </div>
        </div>

        {/* Inclusions */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Included Services:</h4>
          <div className="grid grid-cols-2 gap-2">
            {pkg.inclusions.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            const element = document.querySelector('#contact');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full btn-primary"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default PackageCard;

