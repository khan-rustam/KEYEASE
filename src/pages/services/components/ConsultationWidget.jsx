import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConsultationWidget = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const projectTypes = [
    { value: 'website', label: 'Business Website' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'webapp', label: 'Web Application' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'redesign', label: 'Website Redesign' },
    { value: 'maintenance', label: 'Maintenance & Support' },
    { value: 'consulting', label: 'Digital Strategy Consulting' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush project)' },
    { value: '1-2months', label: '1-2 months' },
    { value: '2-3months', label: '2-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: '6months+', label: '6+ months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
    }, 3000);
  };

  const availableSlots = [
    { date: '2025-07-17', time: '10:00 AM', available: true },
    { date: '2025-07-17', time: '2:00 PM', available: true },
    { date: '2025-07-17', time: '4:00 PM', available: false },
    { date: '2025-07-18', time: '9:00 AM', available: true },
    { date: '2025-07-18', time: '11:00 AM', available: true },
    { date: '2025-07-18', time: '3:00 PM', available: true },
    { date: '2025-07-19', time: '10:00 AM', available: true },
    { date: '2025-07-19', time: '1:00 PM', available: false },
    { date: '2025-07-19', time: '4:00 PM', available: true }
  ];

  if (showSuccess) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-12 shadow-xl text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} color="white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Thank You for Your Interest!
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              We've received your consultation request and will get back to you within 24 hours 
              to schedule your free consultation.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Our team will review your project requirements</li>
                <li>• We'll send you a calendar link to book your consultation</li>
                <li>• You'll receive a project brief template to fill out</li>
                <li>• We'll prepare a preliminary proposal for discussion</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Book Your Free <span className="brand-gradient-text">Consultation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Ready to transform your digital presence? Schedule a free consultation 
            with our experts to discuss your project requirements.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Tell Us About Your Project</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  type="text"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              {/* Project Details */}
              <Select
                label="Project Type"
                placeholder="Select project type"
                options={projectTypes}
                value={formData.projectType}
                onChange={(value) => handleInputChange('projectType', value)}
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Budget Range"
                  placeholder="Select budget range"
                  options={budgetRanges}
                  value={formData.budget}
                  onChange={(value) => handleInputChange('budget', value)}
                />
                <Select
                  label="Timeline"
                  placeholder="Select timeline"
                  options={timelineOptions}
                  value={formData.timeline}
                  onChange={(value) => handleInputChange('timeline', value)}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your project goals, requirements, and any specific features you need..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isSubmitting}
                className="cta-button text-white font-semibold py-4"
                iconName="Send"
                iconPosition="right"
              >
                {isSubmitting ? 'Sending Request...' : 'Request Free Consultation'}
              </Button>
            </form>
          </motion.div>

          {/* Available Slots & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Available Slots */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Available Time Slots</h3>
              <div className="space-y-4">
                {availableSlots.slice(0, 6).map((slot, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      slot.available
                        ? 'border-green-200 bg-green-50' :'border-slate-200 bg-slate-50 opacity-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name="Calendar" 
                        size={20} 
                        className={slot.available ? 'text-green-600' : 'text-slate-400'} 
                      />
                      <div>
                        <div className="font-medium text-slate-900">
                          {new Date(slot.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-sm text-slate-600">{slot.time}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      slot.available
                        ? 'bg-green-100 text-green-800' :'bg-slate-100 text-slate-600'
                    }`}>
                      {slot.available ? 'Available' : 'Booked'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Benefits */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">What You'll Get</h3>
              <ul className="space-y-4">
                {[
                  'Detailed project analysis and recommendations',
                  'Technology stack suggestions for your needs',
                  'Accurate timeline and budget estimates',
                  'Custom solution architecture overview',
                  'Next steps and project roadmap',
                  'No-obligation proposal and quote'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Check" size={20} className="text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Prefer to Talk Now?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium text-slate-900">+1 (555) 123-4567</div>
                    <div className="text-sm text-slate-600">Mon-Fri, 9AM-6PM EST</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium text-slate-900">hello@keyease.com</div>
                    <div className="text-sm text-slate-600">We respond within 2 hours</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium text-slate-900">Live Chat</div>
                    <div className="text-sm text-slate-600">Available 24/7</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationWidget;