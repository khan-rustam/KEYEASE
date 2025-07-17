import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RecentPosts = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Clock" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-slate-900">Recent Posts</h3>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="flex space-x-4 group cursor-pointer"
            onClick={() => navigate(`/blogs/${post.id}`)}
          >
            {/* Image */}
            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2">
                {post.title}
              </h4>
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{post.readTime} min</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <button className="w-full text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200">
          View All Recent Posts
        </button>
      </div>
    </div>
  );
};

export default RecentPosts;