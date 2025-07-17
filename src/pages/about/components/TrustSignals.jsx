import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
    {
      name: "AWS Solutions Architect",
      provider: "Amazon Web Services",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Certified in designing distributed systems on AWS",
      level: "Professional",
      validUntil: "2025"
    },
    {
      name: "Google Cloud Professional",
      provider: "Google Cloud Platform",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Expert in Google Cloud architecture and services",
      level: "Professional",
      validUntil: "2025"
    },
    {
      name: "Shopify Plus Partner",
      provider: "Shopify",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Certified for enterprise e-commerce solutions",
      level: "Plus Partner",
      validUntil: "2024"
    },
    {
      name: "MongoDB Professional",
      provider: "MongoDB Inc.",
      logo: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Database design and optimization expertise",
      level: "Professional",
      validUntil: "2025"
    }
  ];

  const partnerships = [
    {
      name: "Shopify Plus",
      type: "Technology Partner",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Official partner for enterprise e-commerce solutions",
      benefits: ["Priority support", "Advanced features access", "Dedicated account management"]
    },
    {
      name: "Amazon Web Services",
      type: "Cloud Partner",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Certified AWS partner with proven cloud expertise",
      benefits: ["Technical support", "Training resources", "Solution architecture guidance"]
    },
    {
      name: "Google Cloud Platform",
      type: "Technology Partner",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Strategic partnership for cloud and AI solutions",
      benefits: ["Early access to features", "Technical consultation", "Marketing support"]
    },
    {
      name: "Microsoft Azure",
      type: "Cloud Partner",
      logo: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Certified Azure partner for enterprise solutions",
      benefits: ["Solution templates", "Technical resources", "Go-to-market support"]
    }
  ];

  const awards = [
    {
      title: "Best Digital Agency 2023",
      organization: "Tech Excellence Awards",
      year: "2023",
      description: "Recognized for outstanding innovation in digital transformation",
      icon: "Award"
    },
    {
      title: "Top Web Development Company",
      organization: "Industry Leaders Magazine",
      year: "2023",
      description: "Ranked among top 10 web development companies",
      icon: "Trophy"
    },
    {
      title: "Client Satisfaction Excellence",
      organization: "Business Review Board",
      year: "2022",
      description: "98% client satisfaction rate achievement",
      icon: "Star"
    },
    {
      title: "Innovation in E-commerce",
      organization: "Digital Commerce Awards",
      year: "2022",
      description: "Outstanding contribution to e-commerce innovation",
      icon: "Lightbulb"
    }
  ];

  const securityCompliance = [
    {
      standard: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls",
      icon: "Shield",
      status: "Compliant"
    },
    {
      standard: "GDPR Compliance",
      description: "European data protection regulation adherence",
      icon: "Lock",
      status: "Certified"
    },
    {
      standard: "ISO 27001",
      description: "Information security management system",
      icon: "FileCheck",
      status: "In Progress"
    },
    {
      standard: "PCI DSS",
      description: "Payment card industry data security standard",
      icon: "CreditCard",
      status: "Compliant"
    }
  ];

  const clientLogos = [
    { name: "TechCorp", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "InnovateLab", logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "DataFlow", logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "CloudSync", logo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "NextGen", logo: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "ScaleUp", logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-6 py-3 mb-6">
            <Icon name="Shield" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Trust & Recognition</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="brand-gradient-text">Trusted</span>
            {' '}by Industry Leaders
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our certifications, partnerships, and industry recognition demonstrate our commitment 
            to excellence and our clients' trust in our capabilities.
          </p>
        </div>

        {/* Client Logos */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Trusted by Leading Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  className="w-20 h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
              >
                <div className="text-center mb-4">
                  <Image
                    src={cert.logo}
                    alt={cert.provider}
                    className="w-16 h-16 object-cover rounded-lg mx-auto mb-4"
                  />
                  <h4 className="font-bold text-slate-900 mb-1">{cert.name}</h4>
                  <p className="text-sm text-primary font-medium">{cert.provider}</p>
                </div>
                
                <p className="text-sm text-slate-600 mb-4 text-center">
                  {cert.description}
                </p>
                
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="bg-blue-50 text-primary px-2 py-1 rounded-full">
                    {cert.level}
                  </span>
                  <span>Valid until {cert.validUntil}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Partnerships */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Strategic Partnerships
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {partnerships.map((partner, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-xl font-bold text-slate-900">{partner.name}</h4>
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        {partner.type}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{partner.description}</p>
                    <div className="space-y-2">
                      {partner.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Icon name="Check" size={14} className="text-green-500" />
                          <span className="text-sm text-slate-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Awards & Recognition
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={award.icon} size={24} color="white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{award.title}</h4>
                <p className="text-primary font-medium text-sm mb-2">{award.organization}</p>
                <p className="text-slate-600 text-sm mb-3">{award.description}</p>
                <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full inline-block">
                  {award.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Security & Compliance
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityCompliance.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} size={20} color="white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.standard}</h4>
                  <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Compliant' || item.status === 'Certified'
                      ? 'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Work with a Trusted Partner?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Our certifications, partnerships, and industry recognition provide the foundation 
              for a secure and successful collaboration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="cta-button px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300">
                Start Your Project
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-all duration-300">
                View Our Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;