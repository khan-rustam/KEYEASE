import React, { useState, useEffect } from 'react';
import BlogHero from './components/BlogHero';
import CategoryFilter from './components/CategoryFilter';
import FeaturedPost from './components/FeaturedPost';
import BlogCard from './components/BlogCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const postsPerPage = 9;

  // Mock data
  const categories = [
    { id: 'all', name: 'All Posts', icon: 'Grid', count: 48 },
    { id: 'web-dev', name: 'Web Development', icon: 'Code', count: 15 },
    { id: 'mobile', name: 'Mobile Technology', icon: 'Smartphone', count: 12 },
    { id: 'ecommerce', name: 'E-commerce Trends', icon: 'ShoppingCart', count: 8 },
    { id: 'strategy', name: 'Digital Strategy', icon: 'Target', count: 10 },
    { id: 'case-studies', name: 'Case Studies', icon: 'FileText', count: 3 }
  ];

  const featuredPost = {
    id: 1,
    title: "The Future of React: Server Components and Concurrent Features",
    excerpt: `Explore how React's latest innovations are revolutionizing web development. From Server Components to Concurrent Rendering, discover the tools that will shape the next generation of user experiences.`,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    category: "Web Development",
    categoryIcon: "Code",
    date: "July 14, 2025",
    readTime: 8,
    author: {
      name: "Sarah Chen",
      role: "Senior React Developer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  };

  const blogPosts = [
    {
      id: 2,
      title: "Building Scalable E-commerce Platforms with Next.js 14",
      excerpt: "Learn how to leverage Next.js 14\'s app router and server actions to create high-performance e-commerce solutions that scale with your business.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?w=400&h=250&fit=crop",
      category: "E-commerce Trends",
      categoryIcon: "ShoppingCart",
      date: "July 12, 2025",
      readTime: 6,
      views: "2.1K",
      likes: "89",
      author: {
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    },
    {
      id: 3,
      title: "Mobile-First Design: Creating Responsive Experiences",
      excerpt: "Discover the principles and techniques for designing mobile-first applications that provide seamless experiences across all devices.",
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/mobile-phone-1867510_1280.jpg?w=400&h=250&fit=crop",
      category: "Mobile Technology",
      categoryIcon: "Smartphone",
      date: "July 10, 2025",
      readTime: 5,
      views: "1.8K",
      likes: "67",
      author: {
        name: "Emily Johnson",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      }
    },
    {
      id: 4,
      title: "SEO Optimization Strategies for Modern Web Applications",
      excerpt: "Master the art of technical SEO with advanced strategies for single-page applications, Core Web Vitals optimization, and structured data implementation.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
      category: "Digital Strategy",
      categoryIcon: "Target",
      date: "July 8, 2025",
      readTime: 7,
      views: "3.2K",
      likes: "124",
      author: {
        name: "David Park",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      }
    },
    {
      id: 5,
      title: "React Native vs Flutter: A Comprehensive Comparison",
      excerpt: "An in-depth analysis of the two leading cross-platform mobile development frameworks, comparing performance, development experience, and ecosystem.",
      image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?w=400&h=250&fit=crop",
      category: "Mobile Technology",
      categoryIcon: "Smartphone",
      date: "July 6, 2025",
      readTime: 9,
      views: "2.7K",
      likes: "98",
      author: {
        name: "Alex Thompson",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg"
      }
    },
    {
      id: 6,
      title: "Case Study: Transforming a Legacy System with Modern Architecture",
      excerpt: "How we helped a Fortune 500 company modernize their legacy e-commerce platform, resulting in 40% faster load times and 25% increased conversions.",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=250&fit=crop",
      category: "Case Studies",
      categoryIcon: "FileText",
      date: "July 4, 2025",
      readTime: 12,
      views: "4.1K",
      likes: "156",
      author: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    },
    {
      id: 7,
      title: "Advanced TypeScript Patterns for React Applications",
      excerpt: "Explore advanced TypeScript techniques that will make your React applications more robust, maintainable, and developer-friendly.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
      category: "Web Development",
      categoryIcon: "Code",
      date: "July 2, 2025",
      readTime: 8,
      views: "1.9K",
      likes: "73",
      author: {
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    },
    {
      id: 8,
      title: "The Psychology of User Experience Design",
      excerpt: "Understanding cognitive principles and behavioral patterns that drive effective UX design decisions and improve user engagement.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=250&fit=crop",
      category: "Digital Strategy",
      categoryIcon: "Target",
      date: "June 30, 2025",
      readTime: 6,
      views: "2.3K",
      likes: "91",
      author: {
        name: "Emily Johnson",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      }
    },
    {
      id: 9,
      title: "Implementing Real-time Features with WebSockets",
      excerpt: "Learn how to build real-time applications using WebSockets, Socket.io, and modern JavaScript frameworks for instant user interactions.",
      image: "https://images.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_1280.jpg?w=400&h=250&fit=crop",
      category: "Web Development",
      categoryIcon: "Code",
      date: "June 28, 2025",
      readTime: 10,
      views: "1.6K",
      likes: "58",
      author: {
        name: "David Park",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      }
    }
  ];

  // Filter posts based on category and search term
  useEffect(() => {
    let filtered = blogPosts;

    if (activeCategory !== 'all') {
      const categoryName = categories.find(cat => cat.id === activeCategory)?.name;
      filtered = filtered.filter(post => post.category === categoryName);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid  gap-8">
          {/* Main Content Area */}
          <div >
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Category Filter */}
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Featured Post */}
            {!searchTerm && activeCategory === 'all' && (
              <FeaturedPost post={featuredPost} />
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 
                   activeCategory === 'all' ? 'Latest Articles' : 
                   categories.find(cat => cat.id === activeCategory)?.name}
                </h2>
                <p className="text-slate-600 mt-1">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <Icon name="SlidersHorizontal" size={16} className="text-slate-500" />
                <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white">
                  <option>Latest</option>
                  <option>Most Popular</option>
                  <option>Most Viewed</option>
                </select>
              </div>
            </div>

            {/* Blog Posts Grid */}
            {currentPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {currentPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No articles found</h3>
                <p className="text-slate-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;