import { motion } from 'framer-motion';
import { Target, Heart, Globe, Users } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Provide a comfortable, convenient and safe travel experience to our customers.',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Heart,
      title: 'Our Commitment',
      description: 'Dedicated to making your spiritual journey meaningful and memorable.',
      color: 'bg-red-100 text-red-700',
    },
    {
      icon: Globe,
      title: 'Our Services',
      description: 'Flight and hotel booking, visa assistance, and expert guides for your journey.',
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: Users,
      title: 'Our Community',
      description: 'Serving the UK Muslim community with trusted Hajj & Umrah services.',
      color: 'bg-purple-100 text-purple-700',
    },
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-secondary mb-6">
              About <span className="text-gradient">Trip To Makkah</span>
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Trip To Makkah is an online Islamic tourism platform that offers travel packages for Hajj and Umrah.
              </p>
              <p>
                <strong>Our mission</strong> is to provide a comfortable, convenient and safe travel experience to our customers.
              </p>
              <p>
                We provide a range of services including flight and hotel booking, visa assistance, and expert guides to assist our customers in their spiritual journey.
              </p>
              <p className="text-primary-600 font-semibold text-xl">
                Experience a spiritual journey like no other with Trip To Makkah.
              </p>
            </div>
            
            {/* Long Contact Paragraph */}
            <div className="mt-8 p-6 bg-primary-50 rounded-xl border-l-4 border-primary-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact us now</h3>
              <p className="text-gray-700 leading-relaxed">
                We have the most experienced and knowledgeable travel professionals in the TRIP TO MAKKAH LTD. we provide the most comprehensive an most reliable services to our clients including tour guides and administrators, religious guides, meet and assist guides, transportation services, hotel and meal services and many more.
              </p>
              <p className="text-primary-600 font-bold mt-4 text-lg">
                <strong>CONTACT US FOR CUSTOMIZED PACKAGES</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-primary-600 rounded-2xl p-8 text-white">
              <div className="text-6xl mb-6 text-center">🕋</div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                Trip To Makkah<br />
                Hajj & Umrah Travel LTD
              </h3>
              <p className="text-center opacity-90 mb-6">
                Certified by IATA, ATOL and Ministry of Hajj & Umrah of Saudi Arabia
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">IATA</div>
                  <div className="text-sm opacity-75">Certified</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">ATOL</div>
                  <div className="text-sm opacity-75">Protected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">KSA</div>
                  <div className="text-sm opacity-75">Approved</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className={`${value.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon size={28} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

