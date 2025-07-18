import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { logout, isAuthenticated } from '../../utils/auth';
import { showToast } from '../../components/ui/Toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    blogs: {
      total: 12,
      published: 8,
      drafts: 4,
      featured: 3,
      totalViews: '8.4K',
      totalLikes: '342',
      thisMonth: 3
    },
    careers: {
      total: 8,
      active: 6,
      paused: 1,
      closed: 1,
      totalApplications: 156,
      totalViews: '2.8K',
      thisMonth: 2
    },
    portfolio: {
      total: 24,
      completed: 18,
      inProgress: 4,
      onHold: 2,
      featured: 6,
      totalViews: '4.2K',
      thisMonth: 1
    },
    overview: {
      totalViews: '15.4K',
      totalUsers: '1.2K',
      conversionRate: '3.8%',
      avgSessionTime: '4m 32s'
    }
  });
  const [animatedElements, setAnimatedElements] = useState(new Set());

  useEffect(() => {
    // Get authenticated user data (ProtectedRoute ensures we're authenticated)
    const { user: authUser } = isAuthenticated();
    
    if (authUser) {
      setUser(authUser);
    }
    setIsLoading(false);

    // Animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const dashboardCards = [
    {
      id: 'blogs',
      title: 'Blog Management',
      description: 'Create, edit, and manage blog posts',
      icon: 'FileText',
      color: 'bg-blue-500',
      count: stats.blogs.total,
      route: '/admin/blogs',
      stats: stats.blogs
    },
    {
      id: 'careers',
      title: 'Career Management',
      description: 'Manage job openings and applications',
      icon: 'Users',
      color: 'bg-green-500',
      count: stats.careers.total,
      route: '/admin/careers',
      stats: stats.careers
    },
    {
      id: 'portfolio',
      title: 'Portfolio Management',
      description: 'Showcase and manage project portfolio',
      icon: 'Briefcase',
      color: 'bg-purple-500',
      count: stats.portfolio.total,
      route: '/admin/portfolio',
      stats: stats.portfolio
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Created new blog post',
      title: 'React Server Components Guide',
      time: '2 hours ago',
      icon: 'Plus',
      color: 'text-green-600'
    },
    {
      id: 2,
      action: 'Updated job posting',
      title: 'Senior Full Stack Developer',
      time: '4 hours ago',
      icon: 'Edit',
      color: 'text-blue-600'
    },
    {
      id: 3,
      action: 'Added new portfolio project',
      title: 'HealthCare Pro Dashboard',
      time: '1 day ago',
      icon: 'Briefcase',
      color: 'text-purple-600'
    },
    {
      id: 4,
      action: 'Published blog post',
      title: 'Mobile-First Design Principles',
      time: '2 days ago',
      icon: 'Eye',
      color: 'text-indigo-600'
    }
  ];

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img
                src="/Kayease-logo.png"
                alt="Kayease Logo"
                className="h-8"
              />
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-xl font-semibold text-slate-800">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-slate-700">{user.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="left"
                iconSize={14}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div 
          data-animate
          id="welcome-section"
          className={`mb-8 transition-all duration-700 ${
            animatedElements.has('welcome-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-slate-600">
            Manage your content and monitor your website's performance from this dashboard.
          </p>
        </div>

        {/* Overview Stats */}
        <div 
          data-animate
          id="overview-stats"
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-700 delay-100 ${
            animatedElements.has('overview-stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Views</p>
                <p className="text-2xl font-bold text-slate-800">{stats.overview.totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Icon name="TrendingUp" size={16} className="text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12.5%</span>
              <span className="text-slate-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-800">{stats.overview.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={24} className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Icon name="TrendingUp" size={16} className="text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+8.2%</span>
              <span className="text-slate-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-800">{stats.overview.conversionRate}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="Target" size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Icon name="TrendingUp" size={16} className="text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+2.1%</span>
              <span className="text-slate-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Session</p>
                <p className="text-2xl font-bold text-slate-800">{stats.overview.avgSessionTime}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={24} className="text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Icon name="TrendingUp" size={16} className="text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+15.3%</span>
              <span className="text-slate-500 ml-1">from last month</span>
            </div>
          </div>
        </div>

        {/* Content Statistics */}
        <div 
          data-animate
          id="content-stats"
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-700 delay-200 ${
            animatedElements.has('content-stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Blog Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Blog Posts</h3>
                  <p className="text-2xl font-bold text-slate-800">{stats.blogs.total}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/blogs')}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Published</span>
                </div>
                <span className="font-medium text-slate-800">{stats.blogs.published}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600">Drafts</span>
                </div>
                <span className="font-medium text-slate-800">{stats.blogs.drafts}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600">Featured</span>
                </div>
                <span className="font-medium text-slate-800">{stats.blogs.featured}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-slate-800">{stats.blogs.totalViews}</p>
                  <p className="text-xs text-slate-500">Total Views</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{stats.blogs.totalLikes}</p>
                  <p className="text-xs text-slate-500">Total Likes</p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center text-sm">
              <Icon name="Plus" size={14} className="text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{stats.blogs.thisMonth} new</span>
              <span className="text-slate-500 ml-1">this month</span>
            </div>
          </div>

          {/* Career Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Job Openings</h3>
                  <p className="text-2xl font-bold text-slate-800">{stats.careers.total}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/careers')}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Active</span>
                </div>
                <span className="font-medium text-slate-800">{stats.careers.active}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600">Paused</span>
                </div>
                <span className="font-medium text-slate-800">{stats.careers.paused}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-slate-600">Closed</span>
                </div>
                <span className="font-medium text-slate-800">{stats.careers.closed}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-slate-800">{stats.careers.totalApplications}</p>
                  <p className="text-xs text-slate-500">Applications</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{stats.careers.totalViews}</p>
                  <p className="text-xs text-slate-500">Total Views</p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center text-sm">
              <Icon name="Plus" size={14} className="text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{stats.careers.thisMonth} new</span>
              <span className="text-slate-500 ml-1">this month</span>
            </div>
          </div>

          {/* Portfolio Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="Briefcase" size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Portfolio Projects</h3>
                  <p className="text-2xl font-bold text-slate-800">{stats.portfolio.total}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/portfolio')}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Manage
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Completed</span>
                </div>
                <span className="font-medium text-slate-800">{stats.portfolio.completed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">In Progress</span>
                </div>
                <span className="font-medium text-slate-800">{stats.portfolio.inProgress}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600">On Hold</span>
                </div>
                <span className="font-medium text-slate-800">{stats.portfolio.onHold}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-slate-800">{stats.portfolio.featured}</p>
                  <p className="text-xs text-slate-500">Featured</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{stats.portfolio.totalViews}</p>
                  <p className="text-xs text-slate-500">Total Views</p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center text-sm">
              <Icon name="Plus" size={14} className="text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{stats.portfolio.thisMonth} new</span>
              <span className="text-slate-500 ml-1">this month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Analytics */}
          <div 
            data-animate
            id="performance-analytics"
            className={`lg:col-span-2 transition-all duration-700 delay-300 ${
              animatedElements.has('performance-analytics') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Performance Analytics</h3>
                <Icon name="BarChart3" size={20} className="text-slate-400" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Performance */}
                <div>
                  <h4 className="font-medium text-slate-700 mb-4">Content Performance</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon name="FileText" size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Blog Posts</p>
                          <p className="text-sm text-slate-500">{stats.blogs.totalViews} views</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{stats.blogs.total}</p>
                        <div className="flex items-center text-sm text-green-600">
                          <Icon name="TrendingUp" size={12} className="mr-1" />
                          <span>+{stats.blogs.thisMonth}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Icon name="Users" size={16} className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Job Openings</p>
                          <p className="text-sm text-slate-500">{stats.careers.totalApplications} applications</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{stats.careers.total}</p>
                        <div className="flex items-center text-sm text-green-600">
                          <Icon name="TrendingUp" size={12} className="mr-1" />
                          <span>+{stats.careers.thisMonth}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Icon name="Briefcase" size={16} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Portfolio</p>
                          <p className="text-sm text-slate-500">{stats.portfolio.totalViews} views</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{stats.portfolio.total}</p>
                        <div className="flex items-center text-sm text-green-600">
                          <Icon name="TrendingUp" size={12} className="mr-1" />
                          <span>+{stats.portfolio.thisMonth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div>
                  <h4 className="font-medium text-slate-700 mb-4">Engagement Metrics</h4>
                  <div className="space-y-4">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Blog Engagement</span>
                        <Icon name="Heart" size={16} className="text-red-500" />
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-slate-800">{stats.blogs.totalLikes}</span>
                        <span className="text-sm text-slate-500">total likes</span>
                      </div>
                      <div className="mt-2 bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Career Interest</span>
                        <Icon name="UserCheck" size={16} className="text-green-500" />
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-slate-800">{stats.careers.totalApplications}</span>
                        <span className="text-sm text-slate-500">applications</span>
                      </div>
                      <div className="mt-2 bg-slate-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Project Showcase</span>
                        <Icon name="Award" size={16} className="text-purple-500" />
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-slate-800">{stats.portfolio.featured}</span>
                        <span className="text-sm text-slate-500">featured</span>
                      </div>
                      <div className="mt-2 bg-slate-100 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Stats */}
          <div 
            data-animate
            id="recent-activity"
            className={`transition-all duration-700 delay-400 ${
              animatedElements.has('recent-activity') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
                  <Icon name="Activity" size={20} className="text-slate-400" />
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0`}>
                        <Icon name={activity.icon} size={14} className={activity.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                        <p className="text-sm text-slate-600 truncate">{activity.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    iconName="Clock"
                    iconPosition="left"
                    iconSize={14}
                  >
                    View All Activity
                  </Button>
                </div>
              </div>

              {/* Quick Stats Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="FileText" size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">Published Blogs</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{stats.blogs.published}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} className="text-green-600" />
                      <span className="text-sm font-medium text-slate-700">Active Jobs</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{stats.careers.active}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="Briefcase" size={16} className="text-purple-600" />
                      <span className="text-sm font-medium text-slate-700">Completed Projects</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">{stats.portfolio.completed}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-orange-600" />
                      <span className="text-sm font-medium text-slate-700">Featured Content</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">{stats.blogs.featured + stats.portfolio.featured}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Content Management */}
        <div 
          data-animate
          id="quick-actions"
          className={`mt-8 transition-all duration-700 delay-500 ${
            animatedElements.has('quick-actions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Button
                  variant="default"
                  className="cta-button text-white font-medium w-full"
                  onClick={() => navigate('/admin/blogs/create')}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Create New Blog Post
                </Button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/admin/careers/create')}
                    iconName="UserPlus"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full"
                  >
                    Add Job Opening
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/admin/portfolio/create')}
                    iconName="Briefcase"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full"
                  >
                    Add Project
                  </Button>
                </div>
              </div>
            </div>

            {/* Content Management Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Content Management</h3>
              <div className="space-y-4">
                {dashboardCards.map((card, index) => (
                  <div 
                    key={card.id}
                    className="group flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(card.route)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon name={card.icon} size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">{card.title}</h4>
                        <p className="text-sm text-slate-500">{card.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-bold text-slate-800">{card.count}</span>
                      <Icon name="ArrowRight" size={16} className="text-slate-400 group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;