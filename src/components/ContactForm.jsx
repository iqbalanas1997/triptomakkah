import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, X, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // EmailJS Configuration
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
    preferredDate: Yup.string()
      .required('Preferred date is required'),
    package: Yup.string()
      .required('Please select a package'),
    subject: Yup.string(),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      preferredDate: '',
      package: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setErrorMessage('');
        
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
            'EmailJS is not configured. Please set up your EmailJS credentials.'
          );
        }
        
        // Prepare email template parameters
        const templateParams = {
          to_email: 'iqbalanas99.ia@gmail.com',
          from_name: values.name,
          from_email: values.email,
          preferred_date: values.preferredDate,
          package: values.package,
          subject: values.subject || 'Contact Form Inquiry',
          message: values.message,
          email_body: `
Name: ${values.name}
Email: ${values.email}
Preferred Date: ${values.preferredDate}
Package: ${values.package}
Subject: ${values.subject || 'No subject'}
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
          setIsSubmitted(true);
          resetForm();
          setSubmitting(false);
        } else {
          throw new Error('Email service returned an error. Please try again.');
        }
      } catch (error) {
        console.error('EmailJS Error:', error);
        
        let userMessage = 'Failed to send message. Please try again or contact us directly.';
        
        if (error.message && error.message.includes('EmailJS is not configured')) {
          userMessage = 'EmailJS is not configured. Please set up your EmailJS credentials.';
        } else if (error.text) {
          userMessage = `Error: ${error.text}`;
        } else if (error.message) {
          userMessage = `Error: ${error.message}`;
        }
        
        setErrorMessage(userMessage);
        setSubmitting(false);
      }
    },
  });

  // Reset form after success message
  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to book a package? Send us a message and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Form - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                // Success Message
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for contacting Trip To Makkah. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <span>Send Another Message</span>
                  </button>
                </motion.div>
              ) : (
                // Contact Form
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={formik.handleSubmit}
                  className="space-y-6"
                >
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                        formik.touched.name && formik.errors.name
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400'
                      }`}
                      placeholder="Your name"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formik.errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                        formik.touched.email && formik.errors.email
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formik.errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Preferred Date Field */}
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                        formik.touched.preferredDate && formik.errors.preferredDate
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400'
                      }`}
                    />
                    {formik.touched.preferredDate && formik.errors.preferredDate && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formik.errors.preferredDate}</span>
                      </p>
                    )}
                  </div>

                  {/* Package Dropdown Field */}
                  <div>
                    <label
                      htmlFor="package"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Package <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="package"
                      name="package"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.package}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 bg-white ${
                        formik.touched.package && formik.errors.package
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400'
                      }`}
                    >
                      <option value="">Select a package</option>
                      <option value="Umrah">Umrah</option>
                      <option value="Hajj">Hajj</option>
                    </select>
                    {formik.touched.package && formik.errors.package && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formik.errors.package}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject Field (Optional) */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subject}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                        formik.touched.message && formik.errors.message
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400'
                      }`}
                      placeholder="Tell us about your inquiry..."
                    />
                    {formik.touched.message && formik.errors.message && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formik.errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
                    >
                      <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                      <p className="text-sm text-red-800">{errorMessage}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {formik.isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
