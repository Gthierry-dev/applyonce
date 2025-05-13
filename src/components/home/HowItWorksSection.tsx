
import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: '1',
      title: 'Create Your Profile',
      description: 'Build your comprehensive profile once with all your qualifications, experience, and achievements. No need to repeat the process for each application.'
    },
    {
      number: '2',
      title: 'Browse Opportunities',
      description: 'Explore thousands of verified opportunities across different categories. Our smart matching system helps you find the perfect fit for your profile.'
    },
    {
      number: '3',
      title: 'Apply with One Click',
      description: 'Apply to multiple opportunities with a single click. Your profile automatically adapts to each application, saving you time and effort.'
    }
  ];

  return (
    <section className="py-20 bg-primary/5 rounded-3xl mx-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-white rounded-full text-sm font-medium mb-4">
            How it works
          </div>
          <h2 className="text-4xl font-bold">3 Easy steps to success</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your application process with our intuitive platform. 
            Apply to multiple opportunities efficiently and track your progress in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {step.number}
                  </div>
                  <div className="h-1 bg-primary/10 flex-1" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
