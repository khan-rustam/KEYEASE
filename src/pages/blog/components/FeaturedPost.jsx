import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedPost = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${post.id}`);
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 mb-12 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-64 lg:h-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-white">
              <Icon name="Star" size={12} className="mr-1" />
              Featured
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
              {post.readTime} min read
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          {/* Category & Date */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              <Icon name={post.categoryIcon} size={12} className="mr-1" />
              {post.category}
            </span>
            <span className="text-sm text-slate-500">{post.date}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-slate-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author & CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-slate-900">{post.author.name}</div>
                <div className="text-sm text-slate-500">{post.author.role}</div>
              </div>
            </div>
            
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;