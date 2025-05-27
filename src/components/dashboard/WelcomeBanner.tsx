import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeBannerProps {
  title?: string;
  subtitle?: string;
  imagePath?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  title = 'Empowering Your Career Growth!',
  subtitle = 'Explore job listings, track applications, and advance your professional journey.',
  imagePath = '/presentation.jpg'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden rounded-xl mb-6">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url(${imagePath})`,
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Purple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/60 z-10" />
      
      {/* Content */}
      <div className="relative z-20 px-6 py-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-white/80">{subtitle}</p>
        </div>
      </div>
      
      {/* Close Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 z-30 text-white hover:bg-white/20 rounded-full"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close banner</span>
      </Button>
    </div>
  );
};

export default WelcomeBanner;