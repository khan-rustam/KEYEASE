import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicePackages = () => {
  const [selectedPackage, setSelectedPackage] = useState('growth');

  const packages = [
    {
      id: 'startup',
      name: 'Startup',
      subtitle: 'Perfect for new businesses',
      price: '$5,000',
      duration: '4-6 weeks',
      popular: false,
      color: 'green',
      description: 'Essential digital presence with modern design and core functionality',
      features: [
        'Responsive website design',
        'Up to 5 pages',
        'Contact form integration',
        'Basic SEO optimization',
        'Mobile optimization',
        'SSL certificate',
        '3 months support',
        'Google Analytics setup'
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
      ideal: ['New businesses', 'Personal brands', 'Small service providers']
    },
    {
      id: 'growth',
      name: 'Growth',
      subtitle: 'Most popular choice',
      price: '$12,000',
      duration: '6-10 weeks',
      popular: true,
      color: 'blue',
      description: 'Comprehensive solution with advanced features and integrations',
      features: [
        'Custom web application',
        'Up to 15 pages',
        'CMS integration',
        'Advanced SEO & analytics',
        'E-commerce functionality',
        'Payment gateway integration',
        'User authentication',
        'API integrations',
        '6 months support',
        'Performance optimization'
      ],
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      ideal: ['Growing businesses', 'E-commerce stores', 'SaaS startups']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      subtitle: 'For large-scale projects',
      price: '$25,000+',
      duration: '10-16 weeks',
      popular: false,
      color: 'purple',
      description: 'Full-scale digital transformation with custom solutions',
      features: [
        'Custom enterprise solution',
        'Unlimited pages',
        'Advanced CMS',
        'Multi-language support',
        'Advanced integrations',
        'Custom API development',
        'Advanced security',
        'Load balancing',
        'Dedicated support team',
        '12 months support',
        'Training & documentation'
      ],
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      ideal: ['Large enterprises', 'Complex platforms', 'Multi-tenant systems']
    }
  ];

  const getColorClasses = (color, type = 'bg') => {
    const colorMap = {
      green: type === 'bg' ? 'bg-green-500' : type === 'text' ? 'text-green-600' : 'border-green-500',
      blue: type === 'bg' ? 'bg-blue-500' : type === 'text' ? 'text-blue-600' : 'border-blue-500',
      purple: type === 'bg' ? 'bg-purple-500' : type === 'text' ? 'text-purple-600' : 'border-purple-500'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Service <span className="brand-gradient-text">Packages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Choose the perfect package for your business needs. All packages include 
            our proven process and ongoing support.
          </motion.p>
        </div>

        {/* Package Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                pkg.popular ? 'border-blue-500 scale-105' : 'border-slate-200'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${getColorClasses(pkg.color)} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon name="Package" size={28} color="white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                <p className="text-slate-600 mb-4">{pkg.subtitle}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900">{pkg.price}</span>
                  {pkg.id !== 'enterprise' && <span className="text-slate-600 ml-2">starting from</span>}
                </div>
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">{pkg.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-center mb-6">{pkg.description}</p>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-900 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Icon name="Check" size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-900 mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {pkg.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ideal For */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-900 mb-3">Ideal for:</h4>
                <ul className="space-y-1">
                  {pkg.ideal.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-slate-600">
                      <Icon name="ArrowRight" size={14} className="text-slate-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                variant={pkg.popular ? "default" : "outline"}
                fullWidth
                className={pkg.popular ? "cta-button text-white font-semibold" : "border-slate-300 hover:border-blue-500"}
                iconName="ArrowRight"
                iconPosition="right"
              >
                {pkg.id === 'enterprise' ? 'Get Custom Quote' : 'Choose Package'}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Package Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Why Choose KEYEASE?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Icon name="X" size={20} className="text-red-500 mr-2" />
                Typical Agencies
              </h4>
              <ul className="space-y-3">
                {[
                  'Generic templates and themes',
                  'Limited customization options',
                  'Poor performance optimization',
                  'Minimal post-launch support',
                  'Outdated technology stack',
                  'No scalability planning'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-slate-600">
                    <Icon name="Minus" size={16} className="text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Icon name="Check" size={20} className="text-green-500 mr-2" />
                KEYEASE Approach
              </h4>
              <ul className="space-y-3">
                {[
                  'Custom-built solutions from scratch',
                  'Unlimited design possibilities',
                  'Performance-first architecture',
                  'Comprehensive ongoing support',
                  'Cutting-edge technology stack',
                  'Built for growth and scaling'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-slate-600">
                    <Icon name="Check" size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Not sure which package is right for you?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation and we'll help you choose the perfect solution 
            for your business needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="default"
              size="lg"
              className="cta-button text-white font-semibold px-8"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 hover:border-blue-500 px-8"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Chat with Our Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePackages;