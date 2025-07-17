import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectCard = ({ project, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onViewDetails(project)}
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay with metrics */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="grid grid-cols-3 gap-2 text-white text-sm">
              {project.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="font-bold text-lg">{metric.value}</div>
                  <div className="text-xs opacity-90">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
            {project.category}
          </span>
        </div>

        {/* Technology Stack */}
        <div className="absolute top-4 right-4">
          <div className="flex space-x-1">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center"
                title={tech.name}
              >
                <Icon name={tech.icon} size={16} className="text-gray-700" />
              </div>
            ))}
            {project.technologies.length > 3 && (
              <div className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center text-xs font-medium text-gray-700">
                +{project.technologies.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <Icon 
            name="ExternalLink" 
            size={20} 
            className="text-gray-400 group-hover:text-primary transition-colors duration-300" 
          />
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Client Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon name="Building" size={14} className="text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{project.client}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Icon name="Calendar" size={14} />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Project Type Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;