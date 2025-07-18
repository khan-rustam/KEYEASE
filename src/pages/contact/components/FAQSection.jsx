import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: `Project timelines vary based on complexity and scope:\n\n• Simple websites: 2-4 weeks\n• Complex web applications: 6-12 weeks\n• Mobile apps: 8-16 weeks\n• E-commerce platforms: 4-8 weeks\n\nWe provide detailed timelines during our initial consultation and keep you updated throughout the development process.`
    },
    {
      question: "How do you handle project pricing?",
      answer: `We offer transparent, value-based pricing:\n\n• Fixed-price projects for defined scopes\n• Hourly rates for ongoing maintenance\n• Retainer agreements for long-term partnerships\n• Custom packages for enterprise clients\n\nAll pricing includes detailed breakdowns with no hidden fees. We provide written estimates before starting any work.`
    },
    {
      question: "What is your development process?",
      answer: `Our proven 6-phase process ensures quality delivery:\n\n1. Discovery & Planning (1-2 weeks)\n2. Design & Prototyping (2-3 weeks)\n3. Development & Testing (4-8 weeks)\n4. Review & Refinement (1 week)\n5. Launch & Deployment (1 week)\n6. Support & Maintenance (Ongoing)\n\nYou'll have regular check-ins and can track progress through our client portal.`
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: `Yes, we offer comprehensive post-launch support:\n\n• 30-day warranty on all new projects\n• Monthly maintenance packages\n• 24/7 emergency support for critical issues\n• Regular updates and security patches\n• Performance monitoring and optimization\n\nOur support team is available via email, phone, and our client portal.`
    },
    {
      question: "What technologies do you work with?",
      answer: `We specialize in modern, scalable technologies:\n\n• Frontend: React, Next.js, Vue.js, TypeScript\n• Backend: Node.js, Python, PHP, .NET\n• Mobile: React Native, Flutter, Swift, Kotlin\n• Cloud: AWS, Google Cloud, Azure\n• Databases: PostgreSQL, MongoDB, MySQL\n\nWe choose the best technology stack for each project's specific requirements.`
    },
    {
      question: "How do you ensure project quality?",
      answer: `Quality is built into every step of our process:\n\n• Code reviews by senior developers\n• Automated testing and CI/CD pipelines\n• Regular client feedback and iterations\n• Performance and security audits\n• Cross-browser and device testing\n• Detailed documentation and training\n\nWe follow industry best practices and maintain high coding standards.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-brand p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-3">
          Frequently Asked Questions
        </h3>
        <p className="text-text-secondary">
          Get answers to common questions about our process, pricing, and services.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted transition-colors"
            >
              <span className="font-medium text-text-primary pr-4">
                {faq.question}
              </span>
              <Icon 
                name={openFAQ === index ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-text-secondary flex-shrink-0"
              />
            </button>
            
            {openFAQ === index && (
              <div className="px-6 pb-4">
                <div className="pt-2 border-t border-border">
                  <p className="text-text-secondary whitespace-pre-line leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="HelpCircle" size={20} color="white" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-text-primary mb-2">
              Still have questions?
            </h4>
            <p className="text-text-secondary mb-4">
              Can't find what you're looking for? Our team is here to help with any specific questions about your project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.href = 'mailto:hello@Kayease.digital'}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Icon name="Mail" size={16} />
                <span className="text-sm font-medium">Email Us</span>
              </button>
              
              <button
                onClick={() => window.location.href = 'tel:+15551234567'}
                className="flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Icon name="Phone" size={16} />
                <span className="text-sm font-medium">Call Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;