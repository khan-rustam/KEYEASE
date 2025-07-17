import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PricingCalculator = () => {
  const [projectType, setProjectType] = useState('');
  const [complexity, setComplexity] = useState('');
  const [features, setFeatures] = useState([]);
  const [timeline, setTimeline] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const projectTypes = [
    { value: 'website', label: 'Business Website', basePrice: 5000 },
    { value: 'ecommerce', label: 'E-commerce Store', basePrice: 10000 },
    { value: 'webapp', label: 'Web Application', basePrice: 15000 },
    { value: 'mobile', label: 'Mobile App', basePrice: 20000 },
    { value: 'custom', label: 'Custom Solution', basePrice: 25000 }
  ];

  const complexityLevels = [
    { value: 'basic', label: 'Basic', multiplier: 1 },
    { value: 'intermediate', label: 'Intermediate', multiplier: 1.5 },
    { value: 'advanced', label: 'Advanced', multiplier: 2 },
    { value: 'enterprise', label: 'Enterprise', multiplier: 3 }
  ];

  const availableFeatures = [
    { id: 'cms', label: 'Content Management System', price: 2000 },
    { id: 'auth', label: 'User Authentication', price: 1500 },
    { id: 'payment', label: 'Payment Integration', price: 2500 },
    { id: 'api', label: 'API Development', price: 3000 },
    { id: 'analytics', label: 'Advanced Analytics', price: 1000 },
    { id: 'seo', label: 'SEO Optimization', price: 1500 },
    { id: 'multilang', label: 'Multi-language Support', price: 2000 },
    { id: 'mobile', label: 'Mobile App Companion', price: 8000 },
    { id: 'admin', label: 'Admin Dashboard', price: 3500 },
    { id: 'integrations', label: 'Third-party Integrations', price: 2500 }
  ];

  const timelineOptions = [
    { value: 'rush', label: 'Rush (2-4 weeks)', multiplier: 1.5 },
    { value: 'standard', label: 'Standard (4-8 weeks)', multiplier: 1 },
    { value: 'extended', label: 'Extended (8-12 weeks)', multiplier: 0.9 }
  ];

  useEffect(() => {
    calculatePrice();
  }, [projectType, complexity, features, timeline]);

  const calculatePrice = () => {
    if (!projectType || !complexity) {
      setEstimatedPrice(0);
      setShowResults(false);
      return;
    }

    const selectedProject = projectTypes.find(p => p.value === projectType);
    const selectedComplexity = complexityLevels.find(c => c.value === complexity);
    const selectedTimeline = timelineOptions.find(t => t.value === timeline);

    let basePrice = selectedProject.basePrice;
    let complexityMultiplier = selectedComplexity.multiplier;
    let timelineMultiplier = selectedTimeline ? selectedTimeline.multiplier : 1;

    // Add feature costs
    let featureCosts = features.reduce((total, featureId) => {
      const feature = availableFeatures.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);

    let totalPrice = (basePrice + featureCosts) * complexityMultiplier * timelineMultiplier;
    
    setEstimatedPrice(Math.round(totalPrice));
    setShowResults(true);
  };

  const handleFeatureChange = (featureId, checked) => {
    if (checked) {
      setFeatures([...features, featureId]);
    } else {
      setFeatures(features.filter(id => id !== featureId));
    }
  };

  const resetCalculator = () => {
    setProjectType('');
    setComplexity('');
    setFeatures([]);
    setTimeline('');
    setEstimatedPrice(0);
    setShowResults(false);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Project <span className="brand-gradient-text">Calculator</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Get an instant estimate for your project. This calculator provides 
            a rough estimate based on your requirements.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Project Details</h3>

            {/* Project Type */}
            <div className="mb-6">
              <Select
                label="Project Type"
                placeholder="Select project type"
                options={projectTypes.map(type => ({
                  value: type.value,
                  label: type.label
                }))}
                value={projectType}
                onChange={setProjectType}
                className="mb-4"
              />
            </div>

            {/* Complexity Level */}
            <div className="mb-6">
              <Select
                label="Complexity Level"
                placeholder="Select complexity"
                options={complexityLevels.map(level => ({
                  value: level.value,
                  label: level.label
                }))}
                value={complexity}
                onChange={setComplexity}
                className="mb-4"
              />
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <Select
                label="Preferred Timeline"
                placeholder="Select timeline"
                options={timelineOptions.map(option => ({
                  value: option.value,
                  label: option.label
                }))}
                value={timeline}
                onChange={setTimeline}
                className="mb-4"
              />
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="font-semibold text-slate-900 mb-4">Additional Features</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {availableFeatures.map((feature) => (
                  <Checkbox
                    key={feature.id}
                    label={`${feature.label} (+$${feature.price.toLocaleString()})`}
                    checked={features.includes(feature.id)}
                    onChange={(e) => handleFeatureChange(feature.id, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={resetCalculator}
              className="w-full border-slate-300 hover:border-blue-500"
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset Calculator
            </Button>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Estimated Cost</h3>

            {showResults ? (
              <div>
                {/* Price Display */}
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold brand-gradient-text mb-2">
                    ${estimatedPrice.toLocaleString()}
                  </div>
                  <p className="text-slate-600">Estimated project cost</p>
                </div>

                {/* Breakdown */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Base Price</span>
                    <span className="font-semibold">
                      ${projectTypes.find(p => p.value === projectType)?.basePrice.toLocaleString()}
                    </span>
                  </div>
                  
                  {features.length > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Additional Features</span>
                      <span className="font-semibold">
                        +${features.reduce((total, featureId) => {
                          const feature = availableFeatures.find(f => f.id === featureId);
                          return total + (feature ? feature.price : 0);
                        }, 0).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Complexity Multiplier</span>
                    <span className="font-semibold">
                      {complexityLevels.find(c => c.value === complexity)?.multiplier}x
                    </span>
                  </div>

                  {timeline && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Timeline Adjustment</span>
                      <span className="font-semibold">
                        {timelineOptions.find(t => t.value === timeline)?.multiplier}x
                      </span>
                    </div>
                  )}
                </div>

                {/* What's Included */}
                <div className="mb-8">
                  <h4 className="font-semibold text-slate-900 mb-4">What's Included:</h4>
                  <ul className="space-y-2">
                    {[
                      'Complete project development',
                      'Quality assurance testing',
                      'Deployment and launch',
                      '3 months post-launch support',
                      'Documentation and training'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-slate-600">
                        <Icon name="Check" size={16} className="text-green-500 mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="space-y-4">
                  <Button
                    variant="default"
                    fullWidth
                    className="cta-button text-white font-semibold"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Book Free Consultation
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="border-slate-300 hover:border-blue-500"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download Detailed Quote
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Calculator" size={40} color="white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-4">
                  Ready to Calculate?
                </h4>
                <p className="text-slate-600">
                  Fill out the project details on the left to get your 
                  personalized estimate.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Important Note</h4>
              <p className="text-yellow-700 text-sm">
                This calculator provides rough estimates based on typical project requirements. 
                Final pricing may vary based on specific needs, integrations, and custom features. 
                Contact us for a detailed quote and project consultation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCalculator;