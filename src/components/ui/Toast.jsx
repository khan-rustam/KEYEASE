import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          icon: 'CheckCircle',
          iconColor: 'text-green-500'
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: 'AlertCircle',
          iconColor: 'text-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          icon: 'AlertTriangle',
          iconColor: 'text-yellow-500'
        };
      default:
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: 'Info',
          iconColor: 'text-blue-500'
        };
    }
  };

  const styles = getToastStyles();

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 w-60 transform transition-all duration-300 ${
      isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
    }`}>
      <div className={`max-w-sm w-full ${styles.bg} border rounded-lg shadow-lg p-2`}>
        <div className="flex items-start space-x-3">
          <Icon name={styles.icon} size={20} className={styles.iconColor} />
          <div className="flex-1">
            <p className={`text-sm font-medium ${styles.text}`}>
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => {
                setIsVisible(false);
                onClose?.();
              }, 300);
            }}
            className={`${styles.iconColor} hover:opacity-70 transition-opacity duration-200`}
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Manager Component
export const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const { message, type, duration } = event.detail;
      const id = Date.now();
      
      setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-2 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{ 
            transform: `translateY(${index * 80}px)`,
            zIndex: 50 - index
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

// Helper function to show toast
export const showToast = (message, type = 'info', duration = 4000) => {
  const event = new CustomEvent('show-toast', {
    detail: { message, type, duration }
  });
  window.dispatchEvent(event);
};

export default Toast;