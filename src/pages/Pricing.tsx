
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
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
          <Card className="border-primary relative">
            <div className="absolute top-0 right-0 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
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
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Subscribe Now</Button>
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
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
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
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
            {[
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing cycle."
              },
              {
                q: "Is there a discount for annual billing?",
                a: "Yes! You can save 20% by choosing annual billing on our Premium plan."
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Absolutely. You can change your plan at any time, and we'll prorate the difference."
              },
              {
                q: "Do you offer a free trial?",
                a: "Yes, we offer a 14-day free trial of our Premium plan with no credit card required."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b pb-4">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
