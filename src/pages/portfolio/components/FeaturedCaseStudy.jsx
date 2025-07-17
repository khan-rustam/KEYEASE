import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedCaseStudy = () => {
  const caseStudy = {
    title: "E-commerce Platform Transformation",
    client: "TechMart Solutions",
    industry: "E-commerce",
    year: "2024",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
    challenge: `TechMart Solutions approached us with a legacy e-commerce platform that was struggling with performance issues, poor user experience, and declining conversion rates. Their existing system couldn't handle peak traffic loads and was losing customers to competitors with more modern, responsive platforms.`,
    solution: `We designed and developed a complete e-commerce transformation using modern technologies including React, Node.js, and cloud infrastructure. The new platform featured advanced search capabilities, personalized recommendations, streamlined checkout process, and mobile-first responsive design.`,
    results: [
      { metric: "Conversion Rate", before: "2.3%", after: "6.8%", improvement: "+195%" },
      { metric: "Page Load Time", before: "4.2s", after: "1.1s", improvement: "-74%" },
      { metric: "Mobile Traffic", before: "35%", after: "68%", improvement: "+94%" },
      { metric: "Revenue Growth", before: "Baseline", after: "$2.4M", improvement: "+340%" }
    ],
    technologies: [
      { name: "React", icon: "Code" },
      { name: "Node.js", icon: "Server" },
      { name: "MongoDB", icon: "Database" },
      { name: "AWS", icon: "Cloud" },
      { name: "Stripe", icon: "CreditCard" },
      { name: "Analytics", icon: "BarChart3" }
    ],
    timeline: "6 months",
    teamSize: "8 specialists"
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Featured Case Study
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Deep dive into how we transformed a struggling e-commerce platform into a market leader
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm font-medium mb-1">{caseStudy.client}</div>
                <div className="text-2xl font-bold">{caseStudy.title}</div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Icon name="Building" size={16} />
                <span>{caseStudy.industry}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>{caseStudy.year}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{caseStudy.timeline}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Challenge</h3>
              <p className="text-gray-600 leading-relaxed">{caseStudy.challenge}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Solution</h3>
              <p className="text-gray-600 leading-relaxed">{caseStudy.solution}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {caseStudy.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg"
                  >
                    <Icon name={tech.icon} size={16} className="text-primary" />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="default"
              className="cta-button"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View Full Case Study
            </Button>
          </motion.div>
        </div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Measurable Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-sm text-gray-600 mb-2">{result.metric}</div>
                
                <div className="space-y-2 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-500">Before: </span>
                    <span className="font-medium">{result.before}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">After: </span>
                    <span className="font-medium text-primary">{result.after}</span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-green-600">
                  {result.improvement}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;