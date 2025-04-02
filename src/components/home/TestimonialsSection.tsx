
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahjohnson",
    avatar: "",
    role: "Grants Director",
    quote: "ApplyOnce has transformed how our organization handles applications. The customizable forms and streamlined process have increased our application rates by 40%.",
  },
  {
    id: 2,
    name: "Michael Chen",
    handle: "@michaelchen",
    avatar: "",
    role: "Software Engineer",
    quote: "Before ApplyOnce, I spent hours copying and pasting the same information for different job applications. Now I can apply to multiple positions in minutes!",
  },
  {
    id: 3,
    name: "Aisha Patel",
    handle: "@aishapatel",
    avatar: "",
    role: "Marketing Specialist",
    quote: "The intuitive dashboard makes it easy to track application statuses across dozens of opportunities. An essential tool for any job seeker.",
  },
  {
    id: 4,
    name: "James Wilson",
    handle: "@jameswilson",
    avatar: "",
    role: "Academic Advisor",
    quote: "My students have seen a 30% increase in scholarship applications since using ApplyOnce. The platform simplifies the entire process from discovery to submission.",
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    handle: "@elenarodriguez",
    avatar: "",
    role: "HR Manager",
    quote: "ApplyOnce has revolutionized our recruitment workflow. We receive higher quality applications and candidates appreciate the streamlined experience.",
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-50 opacity-80" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 bg-white/50 backdrop-blur-sm rounded-full border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Public Cheers for Us!</h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            Find out how our users are spreading the word!
          </p>
        </div>
        
        <div className="flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    {testimonial.avatar ? (
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.handle}</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.quote}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
