
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Search, FileText, Zap, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Quick Application',
    description: 'Apply to multiple opportunities with a single profile, saving hours of repetitive form filling.',
    icon: <Zap className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Smart Form Builder',
    description: 'Administrators can create customized application forms with an intuitive drag-and-drop interface.',
    icon: <FileText className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Centralized Dashboard',
    description: 'Track all your applications in one place, with real-time status updates and notifications.',
    icon: <User className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Advanced Customization',
    description: 'Tailor your experience with powerful settings and personalization options.',
    icon: <Settings className="h-10 w-10 text-primary" />,
  },
];

const testimonialsData = [
  {
    quote: "ApplyOnce has transformed how our organization handles applications. The customizable forms and streamlined process have increased our application rates by 40%.",
    author: "Sarah Johnson",
    title: "Grants Director",
    company: "Tech Foundation",
  },
  {
    quote: "Before ApplyOnce, I spent hours copying and pasting the same information for different job applications. Now I can apply to multiple positions in minutes!",
    author: "Michael Chen",
    title: "Software Engineer",
    company: "",
  },
  {
    quote: "The intuitive dashboard makes it easy to track application statuses across dozens of opportunities. An essential tool for any job seeker.",
    author: "Aisha Patel",
    title: "Marketing Specialist",
    company: "",
  },
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
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

      {/* Search Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Find Your Next Opportunity</h2>
              <p className="text-muted-foreground">Browse thousands of opportunities across various categories</p>
            </div>
            <div className="flex gap-2 p-1.5 rounded-lg bg-secondary shadow-sm">
              <Input 
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" 
                placeholder="Search opportunities..." 
              />
              <Button className="shadow-sm">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Grants', 'Jobs', 'Scholarships', 'Competitions', 'Internships'].map((category) => (
                <Button key={category} variant="outline" size="sm" className="rounded-full">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Powerful Features for Everyone</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform streamlines the application process for both applicants and organizations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "flex flex-col p-6 rounded-xl border border-border bg-card transition-all duration-300",
                  "hover:shadow-md hover:border-primary/20"
                )}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How ApplyOnce Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our simple three-step process makes applications effortless
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((item, index) => (
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

      {/* Testimonials Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Trusted by Thousands</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear what our users say about their experience with ApplyOnce
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-xl bg-card border border-border p-8 shadow-sm overflow-hidden">
              <div 
                className="absolute transition-all duration-500"
                style={{ 
                  opacity: 1,
                }}
              >
                <div className="relative">
                  <div className="text-4xl text-primary/20 font-serif absolute -top-6 -left-4">"</div>
                  <p className="text-lg sm:text-xl mb-6 relative z-10">
                    {testimonialsData[currentTestimonial].quote}
                  </p>
                  <div className="flex items-center">
                    <div className="mr-4 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {testimonialsData[currentTestimonial].author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonialsData[currentTestimonial].author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonialsData[currentTestimonial].title}
                        {testimonialsData[currentTestimonial].company && `, ${testimonialsData[currentTestimonial].company}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-2 mt-6">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    i === currentTestimonial ? "bg-primary" : "bg-primary/20"
                  )}
                  aria-label={`View testimonial ${i + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
