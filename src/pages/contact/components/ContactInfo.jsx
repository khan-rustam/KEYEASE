import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'Mail',
      title: 'Email Us',
      primary: 'hello@keyease.digital',
      secondary: 'support@keyease.digital',
      description: 'Get a response within 24 hours',
      action: 'mailto:hello@keyease.digital',
      actionText: 'Send Email'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      primary: '+1 (555) 123-4567',
      secondary: '+1 (555) 987-6543',
      description: 'Mon-Fri, 9AM-6PM EST',
      action: 'tel:+15551234567',
      actionText: 'Call Now'
    },
    {
      icon: 'MapPin',
      title: 'Visit Us',
      primary: '123 Innovation Drive',
      secondary: 'San Francisco, CA 94105',
      description: 'Schedule an appointment',
      action: '#',
      actionText: 'Get Directions'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/keyease' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/keyease' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/keyease' },
    { name: 'GitHub', icon: 'Github', url: 'https://github.com/keyease' }
  ];

  const handleContactClick = (action) => {
    if (action.startsWith('mailto:') || action.startsWith('tel:')) {
      window.location.href = action;
    } else if (action === '#') {
      // Open Google Maps
      window.open('https://maps.google.com/?q=123+Innovation+Drive,+San+Francisco,+CA+94105', '_blank');
    }
  };

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-white rounded-2xl shadow-brand p-8">
        <h3 className="text-2xl font-bold text-text-primary mb-6">
          Get In Touch
        </h3>
        
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={method.icon} size={24} className="text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-text-primary mb-1">
                  {method.title}
                </h4>
                <p className="text-text-primary font-medium">{method.primary}</p>
                <p className="text-text-secondary text-sm">{method.secondary}</p>
                <p className="text-text-secondary text-sm mt-1">{method.description}</p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => handleContactClick(method.action)}
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={14}
                >
                  {method.actionText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Office Hours */}
      <div className="bg-white rounded-2xl shadow-brand p-8">
        <h3 className="text-xl font-bold text-text-primary mb-6">
          Office Hours
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">Monday - Friday</span>
            <span className="text-text-primary font-medium">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">Saturday</span>
            <span className="text-text-primary font-medium">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">Sunday</span>
            <span className="text-text-primary font-medium">Closed</span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-accent/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm font-medium text-text-primary">
              Emergency Support Available 24/7 for Existing Clients
            </span>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-2xl shadow-brand p-8">
        <h3 className="text-xl font-bold text-text-primary mb-6">
          Follow Us
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
            >
              <Icon 
                name={social.icon} 
                size={20} 
                className="text-text-secondary group-hover:text-primary transition-colors" 
              />
              <span className="text-text-secondary group-hover:text-primary transition-colors font-medium">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Response Time Guarantee */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={24} color="white" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              24-Hour Response Guarantee
            </h3>
            <p className="text-text-secondary mb-4">
              We respond to all project inquiries within 24 hours during business days. 
              For urgent matters, call us directly for immediate assistance.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-accent font-medium">
              <Icon name="CheckCircle" size={16} />
              <span>Trusted by 500+ clients worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;