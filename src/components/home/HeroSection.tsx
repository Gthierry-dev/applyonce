
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background z-0"></div>
      <div className="container mx-auto px-4 py-20 sm:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
              Introducing ApplyOnce
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground">
              Apply to multiple opportunities <span className="text-primary">effortlessly</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
              Streamline your application process. Create one profile, apply to multiple opportunities, and track everything in a single dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="px-6 shadow-sm">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6">
                <Link to="/explore">
                  Explore Opportunities 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center animate-slide-in">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full"></div>
              
              <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border border-border/50">
                <div className="p-1 bg-secondary border-b border-border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/20"></div>
                    <div className="w-2 h-2 rounded-full bg-foreground/20"></div>
                    <div className="w-2 h-2 rounded-full bg-foreground/20"></div>
                  </div>
                </div>
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-2 mb-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <div className="h-6 w-full bg-secondary rounded-md"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="h-5 w-2/3 bg-secondary rounded-md"></div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex gap-3 items-center">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex-shrink-0"></div>
                          <div className="space-y-1 w-full">
                            <div className="h-3 bg-secondary rounded-md w-full"></div>
                            <div className="h-3 bg-secondary rounded-md w-4/5"></div>
                          </div>
                          <div className="h-7 w-16 rounded-md bg-primary flex items-center justify-center">
                            <div className="h-2 w-8 bg-primary-foreground rounded-sm"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
