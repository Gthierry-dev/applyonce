
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to simplify your application process?</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Join thousands of users who are saving time and increasing their success rate with ApplyOnce.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-medium shadow-sm"
          >
            <Link to="/signup">
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground font-medium"
          >
            <Link to="/explore">Browse Opportunities</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline" 
            className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground font-medium"
          >
            <Link to="/dashboard">Continue as Guest</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
