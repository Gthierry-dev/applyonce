
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-[#1D4ED8] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Never Want to Miss Any Opportunity?
            </h2>
            <p className="text-white/80">
              Subscribe to stay up-to-date on latest opportunities, events, and career insights. 
              Get personalized job alerts and application tips delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button 
                className="bg-[#C1F963] hover:bg-[#B1E953] text-[#004D43] font-medium rounded-full"
              >
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-white/60">
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
