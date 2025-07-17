import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ConsultationBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const consultationTypes = [
    { value: 'discovery', label: 'Discovery Call (30 min)' },
    { value: 'technical', label: 'Technical Consultation (45 min)' },
    { value: 'strategy', label: 'Strategy Session (60 min)' },
    { value: 'proposal', label: 'Proposal Review (30 min)' }
  ];

  const availableDates = [
    { value: '2025-01-20', label: 'Monday, Jan 20' },
    { value: '2025-01-21', label: 'Tuesday, Jan 21' },
    { value: '2025-01-22', label: 'Wednesday, Jan 22' },
    { value: '2025-01-23', label: 'Thursday, Jan 23' },
    { value: '2025-01-24', label: 'Friday, Jan 24' }
  ];

  const availableTimes = [
    { value: '09:00', label: '9:00 AM EST' },
    { value: '10:00', label: '10:00 AM EST' },
    { value: '11:00', label: '11:00 AM EST' },
    { value: '14:00', label: '2:00 PM EST' },
    { value: '15:00', label: '3:00 PM EST' },
    { value: '16:00', label: '4:00 PM EST' }
  ];

  const handleBookConsultation = () => {
    if (!selectedDate || !selectedTime || !consultationType) {
      alert('Please select all required fields');
      return;
    }

    setIsBooking(true);
    
    setTimeout(() => {
      alert('Consultation booked successfully! You\'ll receive a calendar invite shortly.');
      setSelectedDate('');
      setSelectedTime('');
      setConsultationType('');
      setIsBooking(false);
    }, 2000);
  };

  const features = [
    {
      icon: 'Video',
      title: 'Video Call',
      description: 'Face-to-face discussion via Google Meet or Zoom'
    },
    {
      icon: 'FileText',
      title: 'Project Brief',
      description: 'Receive a detailed project outline after the call'
    },
    {
      icon: 'Users',
      title: 'Expert Team',
      description: 'Meet with our senior developers and designers'
    },
    {
      icon: 'Clock',
      title: 'Flexible Timing',
      description: 'Available across multiple time zones'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-brand p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-3">
          Book a Free Consultation
        </h3>
        <p className="text-text-secondary">
          Schedule a personalized consultation to discuss your project requirements and get expert advice.
        </p>
      </div>

      <div className="space-y-6">
        <Select
          label="Consultation Type"
          placeholder="Choose consultation type"
          options={consultationTypes}
          value={consultationType}
          onChange={setConsultationType}
          description="Select the type of consultation that best fits your needs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Preferred Date"
            placeholder="Select date"
            options={availableDates}
            value={selectedDate}
            onChange={setSelectedDate}
          />

          <Select
            label="Preferred Time"
            placeholder="Select time"
            options={availableTimes}
            value={selectedTime}
            onChange={setSelectedTime}
          />
        </div>

        <Button
          variant="default"
          fullWidth
          loading={isBooking}
          onClick={handleBookConsultation}
          iconName="Calendar"
          iconPosition="left"
          className="cta-button text-white font-medium"
        >
          {isBooking ? 'Booking...' : 'Book Free Consultation'}
        </Button>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-lg font-semibold text-text-primary mb-4">
          What to Expect
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={feature.icon} size={16} className="text-primary" />
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-text-primary">{feature.title}</h5>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-accent/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Gift" size={16} className="text-accent" />
          <span className="text-sm font-medium text-text-primary">
            Free consultation includes project roadmap and cost estimation
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConsultationBooking;