import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BlogManagement = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Technology' },
    { id: 'ecommerce', name: 'E-commerce Trends' },
    { id: 'strategy', name: 'Digital Strategy' },
    { id: 'case-studies', name: 'Case Studies' }
  ];

  // Mock blog data - in real app, this would come from API
  const mockBlogs = [
    {
      id: 1,
      title: "The Future of React: Server Components and Concurrent Features",
      excerpt: "Explore how React's latest innovations are revolutionizing web development...",
      category: "web-dev",
      categoryName: "Web Development",
      status: "published",
      author: "Sarah Chen",
      publishDate: "2024-07-14",
      views: "2.1K",
      likes: "89",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      readTime: 8,
      tags: ["React", "JavaScript", "Web Development"],
      featured: true
    },
    {
      id: 2,
      title: "Building Scalable E-commerce Platforms with Next.js 14",
      excerpt: "Learn how to leverage Next.js 14's app router and server actions...",
      category: "ecommerce",
      categoryName: "E-commerce Trends",
      status: "published",
      author: "Michael Rodriguez",
      publishDate: "2024-07-12",
      views: "1.8K",
      likes: "67",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?w=400&h=250&fit=crop",
      readTime: 6,
      tags: ["Next.js", "E-commerce", "React"],
      featured: false
    },
    {
      id: 3,
      title: "Mobile-First Design: Creating Responsive Experiences",
      excerpt: "Discover the principles and techniques for designing mobile-first applications...",
      category: "mobile",
      categoryName: "Mobile Technology",
      status: "draft",
      author: "Emily Johnson",
      publishDate: "2024-07-10",
      views: "0",
      likes: "0",
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/mobile-phone-1867510_1280.jpg?w=400&h=250&fit=crop",
      readTime: 5,
      tags: ["Mobile", "Design", "UX"],
      featured: false
    }
  ];

  useEffect(() => {
    // Authentication is handled by ProtectedRoute

    // Load blogs (in real app, fetch from API)
    setBlogs(mockBlogs);
    setFilteredBlogs(mockBlogs);
  }, [navigate]);

  useEffect(() => {
    // Filter blogs based on search and category
    let filtered = blogs;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory]);

  const handleSelectBlog = (blogId) => {
    setSelectedBlogs(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBlogs.length === filteredBlogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(filteredBlogs.map(blog => blog.id));
    }
  };

  const handleDeleteBlog = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      setBlogs(prev => prev.filter(blog => blog.id !== blogToDelete.id));
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setBlogs(prev => prev.filter(blog => !selectedBlogs.includes(blog.id)));
    setSelectedBlogs([]);
  };

  const toggleFeatured = (blogId) => {
    setBlogs(prev => prev.map(blog => 
      blog.id === blogId ? { ...blog, featured: !blog.featured } : blog
    ));
  };

  const toggleStatus = (blogId) => {
    setBlogs(prev => prev.map(blog => 
      blog.id === blogId 
        ? { ...blog, status: blog.status === 'published' ? 'draft' : 'published' }
        : blog
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                onClick={() => navigate('/admin')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-xl font-semibold text-slate-800">Blog Management</h1>
            </div>
            
            <Button
              variant="default"
              className="cta-button text-white font-medium"
              onClick={() => navigate('/admin/blogs/create')}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Create New Post
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedBlogs.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">
                  {selectedBlogs.length} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={14}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
              />
              <div className="ml-6 grid grid-cols-12 gap-4 w-full">
                <div className="col-span-5">
                  <span className="text-sm font-medium text-slate-700">Title</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-slate-700">Category</span>
                </div>
                <div className="col-span-1">
                  <span className="text-sm font-medium text-slate-700">Status</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-slate-700">Stats</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-slate-700">Actions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Items */}
          <div className="divide-y divide-slate-200">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="px-6 py-4 hover:bg-slate-50 transition-colors duration-200">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.includes(blog.id)}
                    onChange={() => handleSelectBlog(blog.id)}
                    className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
                  />
                  <div className="ml-6 grid grid-cols-12 gap-4 w-full items-center">
                    {/* Title & Image */}
                    <div className="col-span-5 flex items-center space-x-3">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-slate-800 line-clamp-1">
                            {blog.title}
                          </h3>
                          {blog.featured && (
                            <Icon name="Star" size={14} className="text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-slate-500">by {blog.author}</p>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {blog.categoryName}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Icon name="Eye" size={14} />
                          <span>{blog.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={14} />
                          <span>{blog.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(blog.id)}
                          className={blog.featured ? 'text-yellow-600' : 'text-slate-400'}
                        >
                          <Icon name="Star" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStatus(blog.id)}
                          className={blog.status === 'published' ? 'text-green-600' : 'text-yellow-600'}
                        >
                          <Icon name={blog.status === 'published' ? 'Eye' : 'EyeOff'} size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                          className="text-blue-600"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBlog(blog)}
                          className="text-red-600"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Icon name="FileText" size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">No blogs found</h3>
              <p className="text-slate-500 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first blog post.'
                }
              </p>
              <Button
                variant="default"
                className="cta-button text-white font-medium"
                onClick={() => navigate('/admin/blogs/create')}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Create New Post
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Delete Blog Post</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;