import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PortfolioManagement = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'saas', name: 'SaaS' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'fintech', name: 'Fintech' },
    { id: 'education', name: 'Education' }
  ];

  // Mock portfolio data - in real app, this would come from API
  const mockProjects = [
    {
      id: 1,
      title: "HealthCare Pro Dashboard",
      client: "MedTech Solutions",
      category: "healthcare",
      categoryName: "Healthcare",
      year: "2024",
      status: "completed",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center",
      description: "Comprehensive healthcare management platform with patient tracking, appointment scheduling, and medical records management.",
      fullDescription: "HealthCare Pro Dashboard is a comprehensive healthcare management platform designed to streamline medical practice operations. The system integrates patient management, appointment scheduling, medical records, billing, and reporting into a unified, user-friendly interface.",
      challenge: "The client needed a HIPAA-compliant platform that could handle complex medical workflows while maintaining ease of use for healthcare professionals with varying technical expertise.",
      tags: ["Web App", "Dashboard", "Healthcare"],
      technologies: [
        { name: "React", icon: "Code" },
        { name: "Node.js", icon: "Server" },
        { name: "PostgreSQL", icon: "Database" },
        { name: "AWS", icon: "Cloud" }
      ],
      metrics: [
        { value: "45%", label: "Efficiency Boost" },
        { value: "99.9%", label: "Uptime" },
        { value: "2.1s", label: "Load Time" }
      ],
      featured: true,
      projectUrl: "https://healthcare-pro.example.com",
      githubUrl: "https://github.com/example/healthcare-pro"
    },
    {
      id: 2,
      title: "E-Commerce Analytics Platform",
      client: "RetailTech Inc",
      category: "ecommerce",
      categoryName: "E-commerce",
      year: "2024",
      status: "completed",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
      description: "Advanced analytics dashboard for e-commerce businesses with real-time sales tracking, customer insights, and inventory management.",
      fullDescription: "A comprehensive analytics platform that helps e-commerce businesses make data-driven decisions. Features include real-time sales tracking, customer behavior analysis, inventory management, and predictive analytics.",
      challenge: "Creating a scalable solution that could handle millions of transactions while providing real-time insights and maintaining high performance.",
      tags: ["Analytics", "E-commerce", "Dashboard"],
      technologies: [
        { name: "Vue.js", icon: "Code" },
        { name: "Python", icon: "Server" },
        { name: "MongoDB", icon: "Database" },
        { name: "Docker", icon: "Container" }
      ],
      metrics: [
        { value: "60%", label: "Revenue Increase" },
        { value: "35%", label: "Cost Reduction" },
        { value: "1.8s", label: "Load Time" }
      ],
      featured: false,
      projectUrl: "https://analytics.example.com",
      githubUrl: ""
    },
    {
      id: 3,
      title: "FinTech Mobile App",
      client: "SecureBank",
      category: "fintech",
      categoryName: "Fintech",
      year: "2023",
      status: "in-progress",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
      description: "Secure mobile banking application with biometric authentication, real-time transactions, and investment tracking.",
      fullDescription: "A cutting-edge mobile banking application that provides users with secure access to their financial data, real-time transaction capabilities, and investment portfolio management.",
      challenge: "Implementing bank-level security while maintaining a smooth user experience across different mobile platforms.",
      tags: ["Mobile App", "Banking", "Security"],
      technologies: [
        { name: "React Native", icon: "Smartphone" },
        { name: "Node.js", icon: "Server" },
        { name: "PostgreSQL", icon: "Database" },
        { name: "Kubernetes", icon: "Container" }
      ],
      metrics: [
        { value: "50%", label: "User Adoption" },
        { value: "99.99%", label: "Security Score" },
        { value: "1.2s", label: "Transaction Time" }
      ],
      featured: false,
      projectUrl: "",
      githubUrl: ""
    }
  ];

  useEffect(() => {
    // Authentication is handled by ProtectedRoute

    // Load projects (in real app, fetch from API)
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, [navigate]);

  useEffect(() => {
    // Filter projects based on search and category
    let filtered = projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  const handleSelectProject = (projectId) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(project => project.id));
    }
  };

  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(prev => prev.filter(project => project.id !== projectToDelete.id));
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setProjects(prev => prev.filter(project => !selectedProjects.includes(project.id)));
    setSelectedProjects([]);
  };

  const toggleFeatured = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, featured: !project.featured } : project
    ));
  };

  const toggleStatus = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            status: project.status === 'completed' ? 'in-progress' : 'completed' 
          }
        : project
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
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
              <h1 className="text-xl font-semibold text-slate-800">Portfolio Management</h1>
            </div>
            
            <Button
              variant="default"
              className="cta-button text-white font-medium"
              onClick={() => navigate('/admin/portfolio/create')}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add New Project
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
                  placeholder="Search projects..."
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
            {selectedProjects.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">
                  {selectedProjects.length} selected
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

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => handleSelectProject(project.id)}
                    className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
                  />
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  {project.featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Icon name="Star" size={12} className="mr-1" />
                      Featured
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {project.categoryName}
                  </span>
                  <span className="text-sm text-slate-500">{project.year}</span>
                </div>

                <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-1">
                  {project.title}
                </h3>
                
                <p className="text-sm text-slate-600 mb-2">
                  Client: {project.client}
                </p>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-100 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(project.id)}
                      className={project.featured ? 'text-yellow-600' : 'text-slate-400'}
                    >
                      <Icon name="Star" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStatus(project.id)}
                      className={project.status === 'completed' ? 'text-green-600' : 'text-blue-600'}
                    >
                      <Icon name={project.status === 'completed' ? 'CheckCircle' : 'Clock'} size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/portfolio/edit/${project.id}`)}
                      className="text-blue-600"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProject(project)}
                      className="text-red-600"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-12 text-center">
            <Icon name="Briefcase" size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No projects found</h3>
            <p className="text-slate-500 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first portfolio project.'
              }
            </p>
            <Button
              variant="default"
              className="cta-button text-white font-medium"
              onClick={() => navigate('/admin/portfolio/create')}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add New Project
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Delete Project</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete "{projectToDelete?.title}"? This action cannot be undone.
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

export default PortfolioManagement;