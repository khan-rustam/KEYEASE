import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white mb-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <Icon name="Mail" size={32} className="text-white" />
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Stay Ahead of the Curve
        </h3>

        {/* Description */}
        <p className="text-lg text-white/90 mb-8 leading-relaxed">
          Get exclusive insights, early access to new articles, and industry trends delivered to your inbox weekly.
        </p>

        {/* Form */}
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder-white/70"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-medium"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
            >
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-lg">
            <Icon name="CheckCircle" size={24} className="text-accent" />
            <span>Thank you for subscribing!</span>
          </div>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Shield" size={16} className="text-white/80" />
            <span className="text-white/80">No spam, ever</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Clock" size={16} className="text-white/80" />
            <span className="text-white/80">Weekly updates</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="X" size={16} className="text-white/80" />
            <span className="text-white/80">Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;