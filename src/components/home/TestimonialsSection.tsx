
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

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

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
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
            {testimonialsData.map((testimonial, index) => (
              <div 
                key={index}
                className={cn(
                  "absolute inset-0 p-8 transition-opacity duration-500",
                  index === currentTestimonial ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <div className="relative">
                  <div className="text-4xl text-primary/20 font-serif absolute -top-6 -left-4">"</div>
                  <p className="text-lg sm:text-xl mb-6 relative z-10">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="mr-4 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                        {testimonial.company && `, ${testimonial.company}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
  );
};

export default TestimonialsSection;
