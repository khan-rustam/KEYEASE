import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'web-dev',
    tags: [],
    image: '',
    readTime: 5,
    status: 'draft',
    featured: false,
    author: {
      name: '',
      role: '',
      avatar: ''
    },
    publishDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const categories = [
    { id: 'web-dev', name: 'Web Development', icon: 'Code' },
    { id: 'mobile', name: 'Mobile Technology', icon: 'Smartphone' },
    { id: 'ecommerce', name: 'E-commerce Trends', icon: 'ShoppingCart' },
    { id: 'strategy', name: 'Digital Strategy', icon: 'Target' },
    { id: 'case-studies', name: 'Case Studies', icon: 'FileText' }
  ];

  const authors = [
    { name: 'Sarah Chen', role: 'Senior React Developer', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Michael Rodriguez', role: 'Full Stack Engineer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Emily Johnson', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
    { name: 'David Park', role: 'SEO Specialist', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { name: 'Alex Thompson', role: 'Mobile Developer', avatar: 'https://randomuser.me/api/portraits/men/38.jpg' }
  ];

  useEffect(() => {
    // Authentication is handled by ProtectedRoute

    // If editing, load blog data
    if (isEditing) {
      // Mock data for editing - in real app, fetch from API
      const mockBlog = {
        id: 1,
        title: "The Future of React: Server Components and Concurrent Features",
        excerpt: "Explore how React's latest innovations are revolutionizing web development. From Server Components to Concurrent Rendering, discover the tools that will shape the next generation of user experiences.",
        content: `# The Future of React: Server Components and Concurrent Features

React has been at the forefront of web development for years, and with the introduction of Server Components and Concurrent Features, it's set to revolutionize how we build web applications.

## What are Server Components?

Server Components represent a paradigm shift in how we think about React applications. Unlike traditional client-side components, Server Components run on the server and send their rendered output to the client.

### Key Benefits:

- **Reduced Bundle Size**: Server Components don't add to your JavaScript bundle
- **Direct Database Access**: Access your data layer directly without API routes
- **Improved Performance**: Faster initial page loads and better SEO

## Concurrent Features

React's Concurrent Features enable better user experiences through:

### Suspense for Data Fetching
\`\`\`jsx
function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetails />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}
\`\`\`

### Automatic Batching
React 18 automatically batches multiple state updates for better performance.

## Getting Started

To start using these features in your Next.js application:

1. Upgrade to Next.js 13+
2. Use the app directory
3. Create server components by default
4. Add 'use client' directive for client components

## Conclusion

The future of React is bright with these new features. They provide developers with powerful tools to create faster, more efficient applications while maintaining the developer experience we love.`,
        category: 'web-dev',
        tags: ['React', 'JavaScript', 'Web Development', 'Server Components'],
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        readTime: 8,
        status: 'published',
        featured: true,
        author: {
          name: 'Sarah Chen',
          role: 'Senior React Developer',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        publishDate: '2024-07-14'
      };

      setFormData(mockBlog);
    }
  }, [isEditing, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        author: {
          ...prev.author,
          [authorField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAuthorSelect = (author) => {
    setFormData(prev => ({
      ...prev,
      author: author
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Featured image URL is required';
    }

    if (!formData.author.name) {
      newErrors.author = 'Author is required';
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, make API call to save blog
      console.log('Saving blog:', formData);
      
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setFormData(prev => ({ ...prev, status: 'draft' }));
    handleSubmit();
  };

  const handlePublish = async () => {
    setFormData(prev => ({ ...prev, status: 'published' }));
    handleSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/blogs')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Blogs
              </Button>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-xl font-semibold text-slate-800">
                {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleSaveAsDraft}
                disabled={isLoading}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                Save as Draft
              </Button>
              <Button
                variant="default"
                className="cta-button text-white font-medium"
                onClick={handlePublish}
                disabled={isLoading}
                iconName={isLoading ? "Loader2" : "Eye"}
                iconPosition="left"
                iconSize={16}
              >
                {isLoading ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-slate-300'
                }`}
                placeholder="Enter blog title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-2">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                  errors.excerpt ? 'border-red-300 bg-red-50' : 'border-slate-300'
                }`}
                placeholder="Brief description of the blog post..."
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
                Content * (Markdown supported)
              </label>
              <textarea
                id="content"
                name="content"
                rows={20}
                value={formData.content}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 font-mono text-sm ${
                  errors.content ? 'border-red-300 bg-red-50' : 'border-slate-300'
                }`}
                placeholder="Write your blog content here... (Markdown supported)"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
              <div className="mt-2 text-xs text-slate-500">
                Supports Markdown formatting: **bold**, *italic*, # headings, ```code blocks```, etc.
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Publish Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="publishDate" className="block text-sm font-medium text-slate-700 mb-2">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    id="publishDate"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-slate-700">
                    Featured Post
                  </label>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Category</h3>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Tags *</h3>
              
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Add tag..."
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddTag}
                  iconName="Plus"
                  iconSize={14}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-primary/60 hover:text-primary"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                ))}
              </div>
              
              {errors.tags && (
                <p className="mt-2 text-sm text-red-600">{errors.tags}</p>
              )}
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Featured Image *</h3>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                  errors.image ? 'border-red-300 bg-red-50' : 'border-slate-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
              
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Author */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Author *</h3>
              
              <div className="space-y-3">
                {authors.map((author, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      formData.author.name === author.name
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleAuthorSelect(author)}
                  >
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-800">{author.name}</p>
                      <p className="text-sm text-slate-500">{author.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {errors.author && (
                <p className="mt-2 text-sm text-red-600">{errors.author}</p>
              )}
            </div>

            {/* Read Time */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Read Time</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  min="1"
                  max="60"
                  className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <span className="text-sm text-slate-600">minutes</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;