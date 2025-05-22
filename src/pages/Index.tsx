
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      
      {/* Development Access Section */}
      <section className="py-8 bg-secondary_color border-t">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-medium text-center text-main_color mb-6">Development Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            <Link to="/dashboard">
              <Button variant="outline" className="w-full border-main_color text-main_color hover:bg-main_color hover:text-white">
                User Dashboard
              </Button>
            </Link>
            <Link to="/company/dashboard">
              <Button variant="outline" className="w-full border-main_color text-main_color hover:bg-main_color hover:text-white">
                Company Dashboard
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button variant="outline" className="w-full border-main_color text-main_color hover:bg-main_color hover:text-white">
                Admin Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full border-main_color text-main_color hover:bg-main_color hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="w-full border-main_color text-main_color hover:bg-main_color hover:text-white">
                Signup
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
