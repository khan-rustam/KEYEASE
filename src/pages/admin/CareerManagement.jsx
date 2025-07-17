import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CareerManagement = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'hr', name: 'Human Resources' }
  ];

  // Mock job data - in real app, this would come from API
  const mockJobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "engineering",
      departmentName: "Engineering",
      location: "Remote / Bangalore",
      type: "Full-time",
      experience: "3-5 years",
      salary: "$80,000 - $120,000",
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
      description: "Join our engineering team to build scalable web applications and innovative digital solutions.",
      requirements: [
        "3+ years of experience in full-stack development",
        "Proficiency in React, Node.js, and modern JavaScript",
        "Experience with cloud platforms (AWS/Azure)",
        "Strong problem-solving and communication skills"
      ],
      responsibilities: [
        "Develop and maintain web applications using React and Node.js",
        "Collaborate with cross-functional teams to define and implement new features",
        "Write clean, maintainable, and well-documented code",
        "Participate in code reviews and technical discussions"
      ],
      benefits: [
        "Competitive salary and equity package",
        "Health, dental, and vision insurance",
        "Flexible working hours and remote work options",
        "Professional development budget"
      ],
      status: "active",
      posted: "2024-07-12",
      applications: 24,
      views: 156
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "design",
      departmentName: "Design",
      location: "Hybrid / Mumbai",
      type: "Full-time",
      experience: "2-4 years",
      salary: "$60,000 - $90,000",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      description: "Create beautiful and intuitive user experiences for our digital products and client projects.",
      requirements: [
        "2+ years of UI/UX design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio showcasing web and mobile designs",
        "Understanding of user-centered design principles"
      ],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and design systems",
        "Collaborate with developers to ensure design implementation"
      ],
      benefits: [
        "Creative and collaborative work environment",
        "Latest design tools and software",
        "Conference and workshop attendance",
        "Flexible work arrangements"
      ],
      status: "active",
      posted: "2024-07-10",
      applications: 18,
      views: 89
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      department: "marketing",
      departmentName: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "1-3 years",
      salary: "$50,000 - $70,000",
      skills: ["SEO", "Google Ads", "Social Media", "Analytics", "Content Marketing"],
      description: "Drive digital marketing strategies and help our clients achieve their online growth goals.",
      requirements: [
        "1+ years of digital marketing experience",
        "Knowledge of SEO, SEM, and social media marketing",
        "Experience with Google Analytics and marketing tools",
        "Strong analytical and communication skills"
      ],
      responsibilities: [
        "Develop and execute digital marketing campaigns",
        "Manage social media accounts and content creation",
        "Analyze campaign performance and optimize for ROI",
        "Collaborate with clients to understand their marketing needs"
      ],
      benefits: [
        "Performance-based bonuses",
        "Marketing tools and software access",
        "Professional certification support",
        "Remote work flexibility"
      ],
      status: "paused",
      posted: "2024-07-08",
      applications: 12,
      views: 67
    }
  ];

  useEffect(() => {
    // Authentication is handled by ProtectedRoute

    // Load jobs (in real app, fetch from API)
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, [navigate]);

  useEffect(() => {
    // Filter jobs based on search and department
    let filtered = jobs;

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedDepartment]);

  const handleSelectJob = (jobId) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(job => job.id));
    }
  };

  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs(prev => prev.filter(job => job.id !== jobToDelete.id));
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setJobs(prev => prev.filter(job => !selectedJobs.includes(job.id)));
    setSelectedJobs([]);
  };

  const toggleStatus = (jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'active' ? 'paused' : 'active' }
        : job
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Full-time': return 'bg-blue-100 text-blue-800';
      case 'Part-time': return 'bg-purple-100 text-purple-800';
      case 'Contract': return 'bg-orange-100 text-orange-800';
      case 'Internship': return 'bg-pink-100 text-pink-800';
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
              <h1 className="text-xl font-semibold text-slate-800">Career Management</h1>
            </div>
            
            <Button
              variant="default"
              className="cta-button text-white font-medium"
              onClick={() => navigate('/admin/careers/create')}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add Job Opening
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
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Department Filter */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedJobs.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">
                  {selectedJobs.length} selected
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

        {/* Job List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
              />
              <div className="ml-6 grid grid-cols-12 gap-4 w-full">
                <div className="col-span-4">
                  <span className="text-sm font-medium text-slate-700">Job Title</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-slate-700">Department</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-slate-700">Location</span>
                </div>
                <div className="col-span-1">
                  <span className="text-sm font-medium text-slate-700">Status</span>
                </div>
                <div className="col-span-1">
                  <span className="text-sm font-medium text-slate-700">Applications</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-slate-700">Actions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Items */}
          <div className="divide-y divide-slate-200">
            {filteredJobs.map((job) => (
              <div key={job.id} className="px-6 py-4 hover:bg-slate-50 transition-colors duration-200">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => handleSelectJob(job.id)}
                    className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
                  />
                  <div className="ml-6 grid grid-cols-12 gap-4 w-full items-center">
                    {/* Job Title */}
                    <div className="col-span-4">
                      <div>
                        <h3 className="font-medium text-slate-800 line-clamp-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                            {job.type}
                          </span>
                          <span className="text-sm text-slate-500">{job.experience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Department */}
                    <div className="col-span-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {job.departmentName}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Icon name="MapPin" size={14} />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>

                    {/* Applications */}
                    <div className="col-span-1">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-slate-800">{job.applications}</div>
                        <div className="text-xs text-slate-500">{job.views} views</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStatus(job.id)}
                          className={job.status === 'active' ? 'text-green-600' : 'text-yellow-600'}
                        >
                          <Icon name={job.status === 'active' ? 'Pause' : 'Play'} size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/careers/edit/${job.id}`)}
                          className="text-blue-600"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/careers/applications/${job.id}`)}
                          className="text-purple-600"
                        >
                          <Icon name="Users" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteJob(job)}
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

          {filteredJobs.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Icon name="Users" size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">No job openings found</h3>
              <p className="text-slate-500 mb-6">
                {searchTerm || selectedDepartment !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first job opening.'
                }
              </p>
              <Button
                variant="default"
                className="cta-button text-white font-medium"
                onClick={() => navigate('/admin/careers/create')}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Add Job Opening
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
              <h3 className="text-lg font-semibold text-slate-800">Delete Job Opening</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete "{jobToDelete?.title}"? This action cannot be undone and will remove all associated applications.
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

export default CareerManagement;