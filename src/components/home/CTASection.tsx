
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="max-w-[1400px] px-14 max-lg:px-8 m-auto">
        <div className="bg-[#004D43] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Never Want to Miss Any Job News?
            </h2>
            <p className="text-white/80">
              Subscribe to stay up-to-date on insights, events and new solutions.
              You can unsubscribe at any time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Enter your address"
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button 
                className="bg-[#C1F963] hover:bg-[#B1E953] text-[#004D43] font-medium rounded-full px-8"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
