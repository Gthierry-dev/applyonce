
import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Create Your Profile',
    description: 'Fill out your personal information, education, work history, and other details just once.',
  },
  {
    step: '02',
    title: 'Browse Opportunities',
    description: 'Explore thousands of opportunities across different categories and organizations.',
  },
  {
    step: '03',
    title: 'Apply in One Click',
    description: 'Apply to multiple opportunities without re-entering the same information repeatedly.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How ApplyOnce Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our simple three-step process makes applications effortless
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center bg-card rounded-xl p-8 border border-border shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="font-semibold text-primary">{item.step}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
