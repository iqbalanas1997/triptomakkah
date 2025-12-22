import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle, X, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // EmailJS Configuration
  // Get these from: https://dashboard.emailjs.com/admin
  // You can set them as environment variables or replace directly here
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .min(10, 'Phone number must be at least 10 digits')
      .required('Contact number is required'),
    departureDates: Yup.string()
      .required('Departure dates are required'),
    numberOfNights: Yup.string()
      .required('Number of nights is required'),
    interestedIn: Yup.string()
      .required('Please select Hajj or Umrah'),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      departureDates: '',
      numberOfNights: '',
      interestedIn: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setErrorMessage('');
        setIsError(false);
        
        // Validate EmailJS configuration
        if (
          EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
          EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
          EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
          !EMAILJS_SERVICE_ID ||
          !EMAILJS_TEMPLATE_ID ||
          !EMAILJS_PUBLIC_KEY
        ) {
          throw new Error(
            'EmailJS is not configured. Please set up your EmailJS credentials. See EMAILJS_SETUP.md for instructions.'
          );
        }
        
        // Prepare email template parameters
        const templateParams = {
          to_email: 'iqbalanas99.ia@gmail.com',
          from_name: values.name,
          from_email: values.email,
          contact_number: values.phone,
          departure_dates: values.departureDates,
          number_of_nights: values.numberOfNights,
          interested_in: values.interestedIn,
          message: values.message,
          // Formatted email body
          email_body: `
Name: ${values.name}
Email: ${values.email}
Contact Number: ${values.phone}
Departure Dates: ${values.departureDates}
Number of Nights: ${values.numberOfNights}
Interested In: ${values.interestedIn}
Message:
${values.message}
          `.trim(),
        };

        // Send email via EmailJS
        const response = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );

        // Check if email was sent successfully
        if (response.status === 200) {
          // Success
          setIsSubmitted(true);
          setIsError(false);
          setShowModal(true);
          resetForm();
          setSubmitting(false);
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            setShowModal(false);
          }, 5000);
        } else {
          throw new Error('Email service returned an error. Please try again.');
        }
      } catch (error) {
        console.error('EmailJS Error Details:', {
          error,
          message: error.message,
          text: error.text,
          status: error.status,
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID,
          hasPublicKey: !!EMAILJS_PUBLIC_KEY,
        });
        
        setIsError(true);
        
        // Provide specific error messages
        let userMessage = 'Failed to send message. Please try again or contact us directly.';
        
        if (error.message && error.message.includes('EmailJS is not configured')) {
          userMessage = 'EmailJS is not configured. Please set up your EmailJS credentials. See EMAILJS_SETUP.md for instructions.';
        } else if (error.text) {
          userMessage = `Error: ${error.text}. Please check your EmailJS configuration.`;
        } else if (error.message) {
          userMessage = `Error: ${error.message}`;
        } else if (error.status) {
          userMessage = `Email service error (Status: ${error.status}). Please check your EmailJS configuration.`;
        }
        
        setErrorMessage(userMessage);
        setSubmitting(false);
        
        // Show error modal
        setShowModal(true);
      }
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
            Contact <span className="text-gradient">Us Now</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We have the most experienced and knowledgeable travel professionals in the TRIP TO MAKKAH LTD. we provide the most comprehensive an most reliable services to our clients including tour guides and administrators, religious guides, meet and assist guides, transportation services, hotel and meal services and many more.
          </p>
          <p className="text-lg text-primary-600 font-bold mt-4">
            <strong>CONTACT US FOR CUSTOMIZED PACKAGES</strong>
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
                href="tel:+923232202360"
                className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow group"
              >
                <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <Phone className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">+92 323 2202360</p>
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
            <div className="bg-gray-200 rounded-lg h-64 overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=344-348+High+Road,+Ilford,+Essex+IG1+1QP,+United+Kingdom&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trip To Makkah Location"
              />
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Inquiry Form</h3>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
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
                    placeholder="Your name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your email *
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
                    placeholder="Your email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number *
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
                    placeholder="Your contact number"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="departureDates" className="block text-sm font-semibold text-gray-700 mb-2">
                    Departure Dates *
                  </label>
                  <input
                    type="text"
                    id="departureDates"
                    name="departureDates"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.departureDates}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      formik.touched.departureDates && formik.errors.departureDates
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Preferred departure dates"
                  />
                  {formik.touched.departureDates && formik.errors.departureDates && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.departureDates}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="numberOfNights" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Nights *
                  </label>
                  <input
                    type="text"
                    id="numberOfNights"
                    name="numberOfNights"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.numberOfNights}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      formik.touched.numberOfNights && formik.errors.numberOfNights
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Number of nights"
                  />
                  {formik.touched.numberOfNights && formik.errors.numberOfNights && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.numberOfNights}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Interested in: *
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interestedIn"
                        value="Hajj"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.interestedIn === 'Hajj'}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">Hajj</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interestedIn"
                        value="Umrah"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.interestedIn === 'Umrah'}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">Umrah</span>
                    </label>
                  </div>
                  {formik.touched.interestedIn && formik.errors.interestedIn && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.interestedIn}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message: *
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
                    placeholder="Your message"
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
              {isError ? (
                <>
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Error</h3>
                  <p className="text-gray-600 mb-6">
                    {errorMessage || 'Failed to send message. Please try again or contact us directly.'}
                  </p>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setIsError(false);
                      setErrorMessage('');
                    }}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting Trip To Makkah. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ContactForm;

