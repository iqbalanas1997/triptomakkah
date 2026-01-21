import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import PackagesList from './components/PackagesList';
import WhyChooseUs from './components/WhyChooseUs';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppPopup from './components/WhatsAppPopup';
import { Phone, MessageCircle } from 'lucide-react';
import { PackageProvider } from './context/PackageContext';

function App() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <PackageProvider>
      <div className="App">
        <Navbar />
        <main>
          <HeroBanner />
          <PackagesList />
          <WhyChooseUs />
          <AboutSection />
          <ContactForm />
        </main>
        <Footer />

        {/* WhatsApp Popup */}
        <WhatsAppPopup />

        {/* Floating Contact Buttons */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          <a
            href="tel:+447946890999"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Call us"
          >
            <Phone size={24} />
          </a>
          <a
            href="https://wa.me/447946890999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="WhatsApp us"
          >
            <MessageCircle size={24} />
          </a>
        </div>
      </div>
    </PackageProvider>
  );
}

export default App;

