import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CompanyTimeline = () => {
  const [activeYear, setActiveYear] = useState(2024);

  const timelineData = [
    {
      year: 2019,
      title: "The Foundation",
      description: "KEYEASE was born from a simple belief: digital transformation should unlock potential, not create complexity.",
      achievements: [
        "Founded by three passionate developers",
        "First client: Local restaurant chain",
        "Established core values and mission"
      ],
      icon: "Rocket",
      color: "bg-blue-500"
    },
    {
      year: 2020,
      title: "Rapid Growth",
      description: "Despite global challenges, we adapted quickly and helped businesses pivot to digital-first strategies.",
      achievements: [
        "Expanded team to 8 members",
        "Launched 25+ projects",
        "Specialized in e-commerce solutions"
      ],
      icon: "TrendingUp",
      color: "bg-green-500"
    },
    {
      year: 2021,
      title: "Innovation Focus",
      description: "We invested heavily in emerging technologies and established our reputation for cutting-edge solutions.",
      achievements: [
        "Introduced AI-powered features",
        "Won \'Best Digital Agency\' award",
        "Reached 50+ completed projects"
      ],
      icon: "Lightbulb",
      color: "bg-yellow-500"
    },
    {
      year: 2022,
      title: "Strategic Partnerships",
      description: "Formed key partnerships with major platforms and expanded our service offerings significantly.",
      achievements: [
        "Became Shopify Plus partner",
        "AWS certified team",
        "Launched mobile app division"
      ],
      icon: "Handshake",
      color: "bg-purple-500"
    },
    {
      year: 2023,
      title: "Scale & Excellence",
      description: "Focused on scaling operations while maintaining our commitment to quality and client satisfaction.",
      achievements: [
        "Team grew to 15+ experts",
        "Launched enterprise solutions",
        "Achieved 98% client retention rate"
      ],
      icon: "Award",
      color: "bg-orange-500"
    },
    {
      year: 2024,
      title: "Future Forward",
      description: "Continuing to push boundaries with AI integration, advanced analytics, and next-generation web technologies.",
      achievements: [
        "AI-powered development tools",
        "150+ projects completed",
        "Expanding to international markets"
      ],
      icon: "Zap",
      color: "bg-primary"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-6 py-3 mb-6">
            <Icon name="Clock" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Our Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Building the Future,{' '}
            <span className="brand-gradient-text">One Milestone at a Time</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From a small startup to a trusted digital transformation partner, 
            discover the key moments that shaped KEYEASE into who we are today.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {timelineData.map((item) => (
            <button
              key={item.year}
              onClick={() => setActiveYear(item.year)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeYear === item.year
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-16">
            {timelineData.map((item, index) => {
              const isActive = activeYear === item.year;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`relative flex items-center ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } ${isActive ? 'opacity-100' : 'opacity-50'} transition-all duration-500`}
                >
                  {/* Timeline Icon */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center shadow-lg ${
                      isActive ? 'scale-110' : 'scale-100'
                    } transition-transform duration-300`}>
                      <Icon name={item.icon} size={24} color="white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className={`bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 ${
                      isActive ? 'transform scale-105' : ''
                    }`}>
                      {/* Mobile Icon */}
                      <div className="lg:hidden flex items-center space-x-4 mb-6">
                        <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center`}>
                          <Icon name={item.icon} size={20} color="white" />
                        </div>
                        <div className="text-2xl font-bold text-primary">{item.year}</div>
                      </div>

                      {/* Desktop Year */}
                      <div className="hidden lg:block text-2xl font-bold text-primary mb-4">
                        {item.year}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-800 mb-3">Key Achievements:</h4>
                        {item.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Icon name="CheckCircle" size={16} className="text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-slate-600 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Be Part of Our Next Chapter?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join us as we continue to push the boundaries of digital innovation and help businesses unlock their full potential.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="cta-button px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300">
                Start Your Project
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-all duration-300">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;