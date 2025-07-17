import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthorSpotlight = ({ author }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="User" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-slate-900">Author Spotlight</h3>
      </div>

      <div className="text-center">
        {/* Author Image */}
        <div className="relative inline-block mb-4">
          <Image
            src={author.avatar}
            alt={author.name}
            className="w-20 h-20 rounded-full object-cover mx-auto"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={14} className="text-white" />
          </div>
        </div>

        {/* Author Info */}
        <h4 className="text-lg font-semibold text-slate-900 mb-1">{author.name}</h4>
        <p className="text-sm text-slate-600 mb-3">{author.role}</p>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {author.bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">{author.articles}</div>
            <div className="text-xs text-slate-500">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">{author.followers}</div>
            <div className="text-xs text-slate-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">{author.experience}</div>
            <div className="text-xs text-slate-500">Years Exp</div>
          </div>
        </div>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {author.expertise.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-3 mb-6">
          <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
            <Icon name="Twitter" size={14} />
          </button>
          <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
            <Icon name="Linkedin" size={14} />
          </button>
          <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
            <Icon name="Github" size={14} />
          </button>
        </div>

        {/* Follow Button */}
        <Button
          variant="outline"
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
          iconSize={16}
        >
          Follow Author
        </Button>
      </div>
    </div>
  );
};

export default AuthorSpotlight;