
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';

const Pricing = () => {
  return (
    <Layout>
      <div className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle>Free</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Up to 5 active applications",
                    "Basic application tracking",
                    "Limited opportunity search",
                    "Community access",
                    "Basic resources"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-[#004D43] mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className="border-[#004D43] relative">
              <div className="absolute top-0 right-0 -translate-y-1/2 bg-[#004D43] text-white px-3 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
              <CardHeader className="text-center">
                <CardTitle>Premium</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription>For serious applicants</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Unlimited active applications",
                    "Advanced application tracking",
                    "Full opportunity search",
                    "AI-powered document analysis",
                    "Priority community support",
                    "All resources & guides",
                    "Template library"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-[#004D43] mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#004D43] hover:bg-[#003D33]">Subscribe Now</Button>
              </CardFooter>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <CardDescription>For organizations & institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Everything in Premium",
                    "Dedicated account manager",
                    "Custom branding options",
                    "API access",
                    "Advanced analytics & reporting",
                    "Bulk application management",
                    "Integration with existing systems",
                    "Training & onboarding"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-[#004D43] mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <FAQSection />
      <div className='mb-12'>

      </div>
    </Layout>
  );
};

export default Pricing;
