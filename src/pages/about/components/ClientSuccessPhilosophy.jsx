import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ClientSuccessPhilosophy = () => {
  const [activeApproach, setActiveApproach] = useState(0);

  const successFramework = [
    {
      phase: "Discovery & Strategy",
      title: "Understanding Your Vision",
      description: "We begin every partnership by deeply understanding your business goals, challenges, and vision for the future.",
      icon: "Search",
      color: "from-blue-500 to-blue-600",
      steps: [
        "Comprehensive business analysis",
        "Stakeholder interviews and workshops",
        "Market research and competitive analysis",
        "Technical requirements assessment"
      ],
      outcome: "Clear roadmap aligned with business objectives"
    },
    {
      phase: "Collaborative Planning",
      title: "Building Together",
      description: "We work as an extension of your team, ensuring every decision is made collaboratively and transparently.",
      icon: "Users",
      color: "from-purple-500 to-purple-600",
      steps: [
        "Joint project planning sessions",
        "Regular stakeholder check-ins",
        "Transparent progress reporting",
        "Continuous feedback integration"
      ],
      outcome: "Shared ownership and aligned expectations"
    },
    {
      phase: "Agile Execution",
      title: "Delivering Excellence",
      description: "Our agile approach ensures rapid delivery while maintaining the highest quality standards and flexibility.",
      icon: "Zap",
      color: "from-green-500 to-green-600",
      steps: [
        "Sprint-based development cycles",
        "Regular demo and feedback sessions",
        "Continuous integration and testing",
        "Iterative improvements"
      ],
      outcome: "High-quality solutions delivered on time"
    },
    {
      phase: "Long-term Partnership",
      title: "Growing Together",
      description: "Success doesn't end at launch. We provide ongoing support and strategic guidance for continued growth.",
      icon: "TrendingUp",
      color: "from-orange-500 to-orange-600",
      steps: [
        "Ongoing maintenance and support",
        "Performance monitoring and optimization",
        "Strategic growth planning",
        "Technology evolution guidance"
      ],
      outcome: "Sustainable long-term success and growth"
    }
  ];

  const partnershipPrinciples = [
    {
      title: "Transparency First",
      description: "Open communication about progress, challenges, and opportunities ensures no surprises and builds trust.",
      icon: "Eye",
      benefits: ["Real-time project visibility", "Honest progress reporting", "Proactive issue communication", "Clear budget tracking"]
    },
    {
      title: "Shared Success Metrics",
      description: "We align our success with yours, focusing on business outcomes rather than just project deliverables.",
      icon: "Target",
      benefits: ["Business-focused KPIs", "ROI measurement", "Performance benchmarking", "Continuous optimization"]
    },
    {
      title: "Flexible Adaptation",
      description: "Markets change, requirements evolve. Our flexible approach ensures your solution adapts with your business.",
      icon: "RefreshCw",
      benefits: ["Agile methodology", "Scope flexibility", "Technology updates", "Market responsiveness"]
    },
    {
      title: "Knowledge Transfer",
      description: "We empower your team with the knowledge and tools needed to maintain and grow your digital solutions.",
      icon: "BookOpen",
      benefits: ["Comprehensive documentation", "Team training sessions", "Best practices sharing", "Ongoing education"]
    }
  ];

  const successStories = [
    {
      client: "TechStart Inc.",
      industry: "SaaS",
      challenge: "Scaling from startup to enterprise",
      solution: "Complete digital transformation with scalable architecture",
      results: [
        "500% user growth in 18 months",
        "99.9% uptime maintained",
        "40% reduction in operational costs"
      ],
      testimonial: "KEYEASE didn\'t just build our platform—they became our strategic technology partner. Their long-term thinking and collaborative approach have been instrumental in our growth.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      name: "Marcus Johnson",
      role: "CEO, TechStart Inc."
    },
    {
      client: "RetailMax",
      industry: "E-commerce",
      challenge: "Modernizing legacy systems",
      solution: "Phased migration to modern e-commerce platform",
      results: [
        "60% increase in online sales",
        "50% faster page load times",
        "35% improvement in conversion rate"
      ],
      testimonial: "The partnership approach made all the difference. KEYEASE understood our business constraints and delivered a solution that exceeded our expectations while staying within budget.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      name: "Sarah Mitchell",
      role: "CTO, RetailMax"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 mb-6 shadow-lg">
            <Icon name="Handshake" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Client Success Philosophy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="brand-gradient-text">Partnership</span>
            {' '}Over Transactions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We don't just deliver projects—we build lasting partnerships that drive continuous growth and success. 
            Discover our proven framework for creating long-term value.
          </p>
        </div>

        {/* Success Framework */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Our Partnership Framework
          </h3>
          
          {/* Framework Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {successFramework.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActiveApproach(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeApproach === index
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-md'
                }`}
              >
                <Icon name={phase.icon} size={16} />
                <span className="hidden sm:inline">{phase.phase}</span>
                <span className="sm:hidden">{index + 1}</span>
              </button>
            ))}
          </div>

          {/* Active Framework Content */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${successFramework[activeApproach].color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon name={successFramework[activeApproach].icon} size={24} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">
                      {successFramework[activeApproach].phase}
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">
                      {successFramework[activeApproach].title}
                    </h4>
                  </div>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {successFramework[activeApproach].description}
                </p>

                <div className="space-y-4 mb-8">
                  <h5 className="font-semibold text-slate-800">Key Activities:</h5>
                  {successFramework[activeApproach].steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-600">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <h5 className="font-semibold text-primary mb-2">Expected Outcome:</h5>
                  <p className="text-slate-700">{successFramework[activeApproach].outcome}</p>
                </div>
              </div>

              {/* Visual Side */}
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-8 lg:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-32 h-32 bg-gradient-to-r ${successFramework[activeApproach].color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                    <Icon name={successFramework[activeApproach].icon} size={48} color="white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">
                    Phase {activeApproach + 1} of {successFramework.length}
                  </h4>
                  <div className="flex justify-center space-x-2">
                    {successFramework.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index <= activeApproach ? 'bg-primary w-8' : 'bg-slate-200 w-2'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Principles */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Our Partnership Principles
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {partnershipPrinciples.map((principle, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={principle.icon} size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                      {principle.title}
                    </h4>
                    <p className="text-slate-600 mb-4">
                      {principle.description}
                    </p>
                    <ul className="space-y-2">
                      {principle.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <Icon name="Check" size={14} className="text-green-500 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div>
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Partnership Success Stories
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{story.client}</h4>
                      <p className="text-primary font-medium">{story.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Challenge</div>
                      <div className="font-medium text-slate-700">{story.challenge}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-semibold text-slate-800 mb-2">Solution:</h5>
                    <p className="text-slate-600">{story.solution}</p>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-semibold text-slate-800 mb-3">Results:</h5>
                    <div className="space-y-2">
                      {story.results.map((result, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Icon name="TrendingUp" size={14} className="text-green-500" />
                          <span className="text-sm text-slate-600">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <p className="text-slate-600 italic mb-4">"{story.testimonial}"</p>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={story.avatar}
                        alt={story.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">{story.name}</div>
                        <div className="text-sm text-slate-500">{story.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready for a True Partnership?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Experience the difference of working with a team that's genuinely invested in your success. Let's build something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="cta-button px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300">
                Start Our Partnership
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-all duration-300">
                View More Success Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSuccessPhilosophy;