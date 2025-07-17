import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CareerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    department: 'engineering',
    location: '',
    type: 'Full-time',
    experience: '',
    salary: '',
    skills: [],
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const departments = [
    { id: 'engineering', name: 'Engineering', icon: 'Code' },
    { id: 'design', name: 'Design', icon: 'Palette' },
    { id: 'marketing', name: 'Marketing', icon: 'Megaphone' },
    { id: 'sales', name: 'Sales', icon: 'TrendingUp' },
    { id: 'hr', name: 'Human Resources', icon: 'Users' },
    { id: 'finance', name: 'Finance', icon: 'DollarSign' }
  ];

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Freelance'
  ];

  const experienceLevels = [
    'Entry Level (0-1 years)',
    '1-3 years',
    '3-5 years',
    '5-8 years',
    '8+ years',
    'Senior Level (10+ years)'
  ];

  useEffect(() => {
    // Authentication is handled by ProtectedRoute

    // If editing, load job data
    if (isEditing) {
      // Mock data for editing - in real app, fetch from API
      const mockJob = {
        id: 1,
        title: "Senior Full Stack Developer",
        department: "engineering",
        location: "Remote / Bangalore",
        type: "Full-time",
        experience: "3-5 years",
        salary: "$80,000 - $120,000",
        skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
        description: "Join our engineering team to build scalable web applications and innovative digital solutions. You'll work with cutting-edge technologies and collaborate with a talented team of developers, designers, and product managers.",
        requirements: [
          "3+ years of experience in full-stack development",
          "Proficiency in React, Node.js, and modern JavaScript",
          "Experience with cloud platforms (AWS/Azure)",
          "Strong problem-solving and communication skills",
          "Bachelor's degree in Computer Science or related field"
        ],
        responsibilities: [
          "Develop and maintain web applications using React and Node.js",
          "Collaborate with cross-functional teams to define and implement new features",
          "Write clean, maintainable, and well-documented code",
          "Participate in code reviews and technical discussions",
          "Mentor junior developers and contribute to team growth"
        ],
        benefits: [
          "Competitive salary and equity package",
          "Health, dental, and vision insurance",
          "Flexible working hours and remote work options",
          "Professional development budget",
          "Annual team retreats and company events"
        ],
        status: "active"
      };

      setFormData(mockJob);
    }
  }, [isEditing, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    if (formData.requirements.filter(req => req.trim()).length === 0) {
      newErrors.requirements = 'At least one requirement is required';
    }

    if (formData.responsibilities.filter(resp => resp.trim()).length === 0) {
      newErrors.responsibilities = 'At least one responsibility is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Clean up array fields (remove empty strings)
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        responsibilities: formData.responsibilities.filter(resp => resp.trim()),
        benefits: formData.benefits.filter(benefit => benefit.trim())
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, make API call to save job
      console.log('Saving job:', cleanedData);
      
      navigate('/admin/careers');
    } catch (error) {
      console.error('Error saving job:', error);
    } finally {
      setIsLoading(false);
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
                onClick={() => navigate('/admin/careers')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Careers
              </Button>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-xl font-semibold text-slate-800">
                {isEditing ? 'Edit Job Opening' : 'Create New Job Opening'}
              </h1>
            </div>
            
            <Button
              variant="default"
              className="cta-button text-white font-medium"
              onClick={handleSubmit}
              disabled={isLoading}
              iconName={isLoading ? "Loader2" : "Save"}
              iconPosition="left"
              iconSize={16}
            >
              {isLoading ? 'Saving...' : 'Save Job Opening'}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                    Job Title *
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
                    placeholder="e.g. Senior Full Stack Developer"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-2">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="e.g. Remote / Bangalore"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
                    Job Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-slate-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-slate-700 mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. $80,000 - $120,000"
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Job Description</h3>
              <textarea
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-slate-300'
                }`}
                placeholder="Describe the role, team, and what the candidate will be working on..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Requirements *</h3>
              <div className="space-y-3">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter requirement..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveArrayField('requirements', index)}
                      iconName="X"
                      iconSize={14}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddArrayField('requirements')}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                >
                  Add Requirement
                </Button>
              </div>
              {errors.requirements && (
                <p className="mt-2 text-sm text-red-600">{errors.requirements}</p>
              )}
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Responsibilities *</h3>
              <div className="space-y-3">
                {formData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={responsibility}
                      onChange={(e) => handleArrayFieldChange('responsibilities', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter responsibility..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveArrayField('responsibilities', index)}
                      iconName="X"
                      iconSize={14}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddArrayField('responsibilities')}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                >
                  Add Responsibility
                </Button>
              </div>
              {errors.responsibilities && (
                <p className="mt-2 text-sm text-red-600">{errors.responsibilities}</p>
              )}
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Benefits</h3>
              <div className="space-y-3">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter benefit..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveArrayField('benefits', index)}
                      iconName="X"
                      iconSize={14}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddArrayField('benefits')}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                >
                  Add Benefit
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Status</h3>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Required Skills *</h3>
              
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Add skill..."
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSkill}
                  iconName="Plus"
                  iconSize={14}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-primary/60 hover:text-primary"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                ))}
              </div>
              
              {errors.skills && (
                <p className="mt-2 text-sm text-red-600">{errors.skills}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerForm;