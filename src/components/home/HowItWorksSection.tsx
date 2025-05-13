import React from 'react';
import { Play } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Create Your Profile',
    description: 'Build your comprehensive profile once with all your qualifications, experience, and achievements. No need to repeat the process for each application.',
    image: (
      <div className="relative">
        <div className="bg-white/20 p-4 rounded-xl relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
              <img src="/api/placeholder/24/24" alt="avatar" className="w-5 h-5 rounded-full" />
            </div>
            <span className="text-white text-sm">Adam</span>
          </div>
          <div className="h-20 bg-white/10 rounded-lg flex items-center justify-center">
            <div className="w-full px-2">
              <div className="h-8 flex items-center">
                <div className="h-3 bg-white/40 rounded-full w-1/4 mx-1"></div>
                <div className="h-5 bg-white/40 rounded-full w-1/6 mx-1"></div>
                <div className="h-4 bg-white/40 rounded-full w-1/5 mx-1"></div>
                <div className="h-6 bg-white/40 rounded-full w-1/4 mx-1"></div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 transform translate-x-1/4 -translate-y-1/2">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <div className="text-xs font-semibold mb-1">Record Track List</div>
              <div className="space-y-2">
                {['Teresa', 'Emily', 'Terry'].map((name, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200"></div>
                    <span className="text-xs">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
    {
      number: '2',
      title: 'Browse Opportunities',
      description: 'Explore thousands of verified opportunities across different categories. Our smart matching system helps you find the perfect fit for your profile.',
      image: (
        <div className="relative flex justify-center">
          <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <img src="/api/placeholder/24/24" alt="avatar" className="w-5 h-5 rounded-full" />
              </div>
              <span className="text-sm">Adam</span>
            </div>
            <div className="text-center text-lg font-medium mb-1">Screening...</div>
            <div className="h-6 flex items-center justify-center gap-1">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="h-4 bg-purple-400 rounded-full w-1" style={{ height: `${Math.random() * 16 + 4}px` }}></div>
              ))}
            </div>
            <div className="text-xs text-center mt-1 text-gray-500">in 15s your sound ready</div>
          </div>
        </div>
      )
    },
    {
      number: '3',
      title: 'Apply with One Click',
      description: 'Apply to multiple opportunities with a single click. Your profile automatically adapts to each application, saving you time and effort.',
      image: (
        <div className="relative">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <img src="/api/placeholder/24/24" alt="avatar" className="w-5 h-5 rounded-full" />
              </div>
              <div className="flex justify-between w-full">
                <span className="text-sm">Adam</span>
                <span className="text-sm">04:00</span>
              </div>
            </div>
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Play size={16} className="text-purple-500 ml-1" />
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-1">AI <span className="font-medium">Abram</span></div>
            <button className="w-full bg-purple-100 text-purple-600 text-xs py-1 rounded-lg">
              Add to workspace
            </button>
          </div>
          <div className="absolute -bottom-6 right-8">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-white/40 flex items-center justify-center">
                <div className="w-3 h-3 bg-white/80 rounded-full"></div>
              </div>
              <span className="text-white text-sm">Your Voice</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const HowItWorksSection = () => {
    return (
      <section className="py-20 mx-8 rounded-3xl" style={{ background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-white rounded-full text-sm font-medium mb-6">
              How it works
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">3 Easy steps to success</h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Get started with ApplyOnce in just three simple steps. 
              Our streamlined process makes it easy to find and apply for opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm mb-6">{step.description}</p>
                  <div className="h-48 flex items-center justify-center">
                    {step.image}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default HowItWorksSection;