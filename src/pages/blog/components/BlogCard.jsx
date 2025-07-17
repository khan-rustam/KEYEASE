import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${post.id}`);
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-slate-700 backdrop-blur-sm">
            <Icon name={post.categoryIcon} size={10} className="mr-1" />
            {post.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
            {post.readTime} min
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Calendar" size={14} className="text-slate-400" />
          <span className="text-sm text-slate-500">{post.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author & Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium text-slate-900">{post.author.name}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-slate-500">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span className="text-xs">{post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span className="text-xs">{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;