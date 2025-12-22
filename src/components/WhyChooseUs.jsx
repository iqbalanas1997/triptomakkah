import { motion } from 'framer-motion';
import { Users, Clock } from 'lucide-react';
import highStandardImage from '../data/images/high standard.jpg';
import bestInTownImage from '../data/images/best in town.jpeg';
import secureTravelImage from '../data/images/secure travel.jpg';
import servicesImage from '../data/images/services.jpg';
import hajjActivitiesImage from '../data/images/hajj activities.jpg';

const WhyChooseUs = () => {
  const features = [
    {
      image: highStandardImage,
      title: 'High Standards',
      description: 'We provide high standard services of Hotels, Transportation and Flights',
    },
    {
      image: bestInTownImage,
      title: 'Best in Town',
      description: 'We offer best complete packages of Hajj and Umrah from UK',
    },
    {
      image: secureTravelImage,
      title: 'Secure Travel',
      description: 'Authorized and approved from IATA, ATOL and Ministry of Hajj & Umrah KSA',
    },
  ];

  const stats = [
    { icon: Clock, value: '20+', label: 'Years of Experience', color: 'text-primary-600' },
    { icon: Users, value: '10k+', label: 'Trusted by Customer', color: 'text-green-600' },
  ];

  const certifications = [
    'IATA',
    'ATOL',
    'Ministry of Hajj & Umrah Saudia',
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary mb-4">
            Why <span className="text-gradient">Choose Us?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are <strong>accredited</strong>, knowledgeable, and <strong>Professional</strong> Hajj & Umrah services provider.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card overflow-hidden text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={servicesImage} 
              alt="Trip To Makkah Services" 
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Hajj Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={hajjActivitiesImage} 
                  alt="Hajj Activities"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 text-white flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Hajj Activities</h3>
                <p className="text-lg mb-6 opacity-90">
                  Plan your next journey with us….
                </p>
                <button
                  onClick={() => {
                    const element = document.querySelector('#packages');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-fit"
                >
                  View Deals
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 text-center"
            >
              <stat.icon className={`mx-auto mb-4 ${stat.color}`} size={48} />
              <div className="text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg text-gray-700 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">We are authorized</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold"
              >
                ✓ {cert}
              </motion.div>
            ))}
          </div>
          <p className="text-lg opacity-90 italic">
            Approved from IATA, ATOL and Ministry of Hajj & Umrah Saudia
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

