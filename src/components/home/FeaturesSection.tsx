
import React from 'react';
import { Zap, FileText, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Quick Application',
    description: 'Apply to multiple opportunities with a single profile, saving hours of repetitive form filling.',
    icon: <Zap className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Smart Form Builder',
    description: 'Administrators can create customized application forms with an intuitive drag-and-drop interface.',
    icon: <FileText className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Centralized Dashboard',
    description: 'Track all your applications in one place, with real-time status updates and notifications.',
    icon: <User className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Advanced Customization',
    description: 'Tailor your experience with powerful settings and personalization options.',
    icon: <Settings className="h-10 w-10 text-primary" />,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Powerful Features for Everyone</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform streamlines the application process for both applicants and organizations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center flex">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "flex flex-col p-6 rounded-xl border border-border bg-card transition-all duration-300",
                "hover:shadow-md hover:border-primary/20"
              )}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
