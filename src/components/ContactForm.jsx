import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle, X } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Here you would typically send the data to your backend API
      console.log('Form submitted:', values);
      setIsSubmitted(true);
      setShowModal(true);
      resetForm();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setShowModal(false);
      }, 5000);
    },
  });

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We have the most experienced and knowledgeable travel professionals. Contact us for customized packages.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <p className="text-gray-600 mb-8">
                Trip to Makkah, registered at 344-348 High Road, Ilford, Essex. IG1 1QP
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="tel:+442037276364"
                className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow group"
              >
                <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <Phone className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">+44 0203 727 6364</p>
                </div>
              </a>

              <a
                href="mailto:info@triptomakkah.co.uk"
                className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow group"
              >
                <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <Mail className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">info@triptomakkah.co.uk</p>
                </div>
              </a>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <MapPin className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600">
                    344-348 High Road, Ilford<br />
                    Essex IG1 1QP<br />
                    United Kingdom
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Google Map Embed</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      formik.touched.name && formik.errors.name
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      formik.touched.phone && formik.errors.phone
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                      formik.touched.message && formik.errors.message
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your travel plans..."
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                  disabled={formik.isSubmitting}
                >
                  <Send size={20} />
                  <span>{formik.isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. We'll get back to you soon.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ContactForm;

