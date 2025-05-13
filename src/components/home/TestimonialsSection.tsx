import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "I can't thank JobSearchPro enough for connecting me with the perfect software engineering job. The job matching algorithm is spot on, and the job alerts kept me updated on new opportunities. It's a game-changer for anyone in the tech industry.",
    author: "Ibrahim Hamza",
    role: "Product Designer",
    company: {
      name: "Mailchimp",
      logo: "🌟"
    }
  },
  {
    id: 2,
    content: "I can't thank JobSearchPro enough for connecting me with the perfect software engineering job. The job matching algorithm is spot on, and the job alerts kept me updated on new opportunities. It's a game-changer for anyone in the tech industry.",
    author: "Ibrahim Hamza",
    role: "Product Designer",
    company: {
      name: "Mailchimp",
      logo: "🌟"
    }
  }
];

const TestimonialsSection = () => {
  return (
    <section className="pt-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Title Section */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Review of People Who Have Found Jobs</h2>
            <div className="flex gap-3 mt-6">
              <button className="h-10 w-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <button className="h-10 w-10 rounded-full border-2 border-gray-800 bg-gray-800 flex items-center justify-center">
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="lg:w-2/3">
            <div className="flex gap-6 overflow-x-none">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-1/2 flex-none bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-yellow-200 p-1 rounded-md">
                        <span className="text-xl">{testimonial.company.logo}</span>
                      </div>
                      <span className="font-medium">{testimonial.company.name}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm flex-grow mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img src="/api/placeholder/40/40" alt={testimonial.author} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{testimonial.author}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
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