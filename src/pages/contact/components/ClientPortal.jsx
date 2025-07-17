import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientPortal = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLogging, setIsLogging] = useState(false);

  // Mock credentials for demo
  const mockCredentials = {
    email: 'client@company.com',
    password: 'KeyEase2025!'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!loginData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLogging(true);

    setTimeout(() => {
      if (loginData.email === mockCredentials.email && loginData.password === mockCredentials.password) {
        alert('Login successful! Redirecting to your project dashboard...');
        setLoginData({ email: '', password: '' });
      } else {
        setErrors({
          email: 'Invalid credentials. Use: client@company.com',
          password: 'Invalid credentials. Use: KeyEase2025!'
        });
      }
      setIsLogging(false);
    }, 2000);
  };

  const portalFeatures = [
    {
      icon: 'BarChart3',
      title: 'Project Progress',
      description: 'Real-time updates on your project milestones and deliverables'
    },
    {
      icon: 'MessageSquare',
      title: 'Direct Communication',
      description: 'Chat directly with your project team and get instant responses'
    },
    {
      icon: 'FileText',
      title: 'Document Access',
      description: 'Download project files, contracts, and important documents'
    },
    {
      icon: 'Calendar',
      title: 'Meeting Scheduler',
      description: 'Book meetings and view upcoming project milestones'
    },
    {
      icon: 'CreditCard',
      title: 'Billing & Invoices',
      description: 'View payment history and download invoices'
    },
    {
      icon: 'Settings',
      title: 'Project Settings',
      description: 'Manage project preferences and notification settings'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-brand p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-3">
          Client Portal Access
        </h3>
        <p className="text-text-secondary">
          Existing clients can access their project dashboard, track progress, and communicate with the team.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6 mb-8">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="your@email.com"
          value={loginData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLogging}
          iconName="LogIn"
          iconPosition="right"
          className="cta-button text-white font-medium"
        >
          {isLogging ? 'Signing In...' : 'Access Portal'}
        </Button>
      </form>

      {/* Demo Credentials */}
      <div className="mb-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">Demo Credentials</p>
            <p className="text-xs text-text-secondary">
              Email: client@company.com<br />
              Password: KeyEase2025!
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h4 className="text-lg font-semibold text-text-primary">
          Portal Features
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portalFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={feature.icon} size={16} className="text-primary" />
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-text-primary text-sm">{feature.title}</h5>
                <p className="text-xs text-text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            iconName="HelpCircle"
            iconPosition="left"
            onClick={() => window.location.href = 'mailto:support@keyease.digital'}
          >
            Need Help?
          </Button>
          
          <Button
            variant="outline"
            iconName="Key"
            iconPosition="left"
            onClick={() => alert('Password reset link sent to your email!')}
          >
            Forgot Password?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;