import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'Eye' },
    { id: 'process', name: 'Process', icon: 'GitBranch' },
    { id: 'results', name: 'Results', icon: 'TrendingUp' },
    { id: 'testimonial', name: 'Testimonial', icon: 'MessageSquare' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                <p className="text-gray-600">{project.client} • {project.year}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Icon name="X" size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-120px)]">
              {/* Left Panel - Image Gallery */}
              <div className="w-1/2 relative bg-gray-50">
                <div className="relative h-full">
                  <Image
                    src={project.gallery[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {project.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      >
                        <Icon name="ChevronLeft" size={20} className="text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      >
                        <Icon name="ChevronRight" size={20} className="text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {project.gallery.length}
                  </div>
                </div>
              </div>

              {/* Right Panel - Details */}
              <div className="w-1/2 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Icon name={tab.icon} size={16} />
                        <span>{tab.name}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                        <p className="text-gray-600 leading-relaxed">{project.fullDescription}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Challenge</h4>
                        <p className="text-gray-600">{project.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg"
                            >
                              <Icon name={tech.icon} size={16} className="text-gray-600" />
                              <span className="text-sm font-medium">{tech.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'process' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Development Process</h3>
                      {project.process.map((step, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{step.title}</h4>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                            <span className="text-xs text-gray-500">{step.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'results' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Project Results</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {project.detailedMetrics.map((metric, index) => (
                          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {metric.value}
                            </div>
                            <div className="text-sm text-gray-600">{metric.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {project.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5" />
                              <span className="text-gray-600 text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'testimonial' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Client Testimonial</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-gray-700 italic mb-4">
                          "{project.testimonial.content}"
                        </blockquote>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <Icon name="User" size={20} className="text-gray-500" />
                          </div>
                          <div>
                            <div className="font-semibold">{project.testimonial.author}</div>
                            <div className="text-sm text-gray-600">{project.testimonial.position}</div>
                            <div className="text-sm text-gray-500">{project.testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        iconName="ExternalLink"
                        iconPosition="right"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        View Live Site
                      </Button>
                      {project.caseStudyUrl && (
                        <Button
                          variant="ghost"
                          iconName="FileText"
                          iconPosition="left"
                          onClick={() => window.open(project.caseStudyUrl, '_blank')}
                        >
                          Full Case Study
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Icon name="Clock" size={14} />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;