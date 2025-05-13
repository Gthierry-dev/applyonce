
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "I can't thank JobSearchPro enough for connecting me with the perfect software engineering job. The job matching algorithm is spot on, and the job alerts kept me updated on new opportunities. It's a game-changer for anyone in the tech industry.",
    author: "Ibrahim Hamza",
    role: "Product Designer",
    company: {
      name: "Mailchimp",
      logo: "🌟" // Replace with actual Mailchimp logo
    }
  },
  {
    id: 2,
    content: "I can't thank JobSearchPro enough for connecting me with the perfect software engineering job. The job matching algorithm is spot on, and the job alerts kept me updated on new opportunities. It's a game-changer for anyone in the tech industry.",
    author: "Ibrahim Hamza",
    role: "Product Designer",
    company: {
      name: "Mailchimp",
      logo: "🌟" // Replace with actual Mailchimp logo
    }
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Title Section */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <h2 className="text-3xl font-bold text-[#0A2942]">Review of People Who Have Found Jobs</h2>
            <div className="flex gap-2 mt-8">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-2">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-2">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Testimonials Scroll Section */}
          <div className="lg:w-2/3 overflow-hidden">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-[400px] flex-none snap-start bg-white rounded-xl p-6 border shadow-sm"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{testimonial.company.logo}</span>
                      <span className="font-medium">{testimonial.company.name}</span>
                    </div>
                    <p className="text-[#4A5567] leading-relaxed">{testimonial.content}</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                        {/* Replace with actual avatar image */}
                        <img 
                          src="/placeholder-avatar.jpg" 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0A2942]">{testimonial.author}</h3>
                        <p className="text-sm text-[#4A5567]">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
