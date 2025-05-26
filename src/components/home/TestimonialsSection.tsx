import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  LucideArrowLeft,
  LucideArrowRight,
} from "lucide-react";
// Import Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    content:
      "JobSearchPro helped me land my dream role in under two weeks. The alerts, filters, and matching were on point. Easily the best job platform I've used so far.",
    author: "Ibrahim Hamza",
    role: "Product Designer",
  },
  {
    id: 2,
    content:
      "Finding the right job was effortless. The smart matching and constant updates made everything smoother. I now recommend it to all my friends in tech and design.",
    author: "Lisa Njoroge",
    role: "Software Engineer",
  },
  {
    id: 3,
    content:
      "I was impressed by how accurate the job recommendations were. I didn’t waste time applying randomly. Within a week, I had three solid interviews lined up.",
    author: "Kevin Otieno",
    role: "Frontend Developer",
  },
  {
    id: 4,
    content:
      "From sign-up to interview, the whole process felt seamless. I especially loved the personalized alerts. No fluff—just real opportunities that matched my actual skills and goals.",
    author: "Fatima Suleiman",
    role: "UX Researcher",
  },
  {
    id: 5,
    content:
      "After months of frustration, this platform finally made job hunting easier. Clear listings, great UX, and helpful suggestions. I found a position that suits me perfectly.",
    author: "James Mwangi",
    role: "DevOps Engineer",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="pt-24 max-lg:pt-0 bg-white">
      <div className="max-w-[1400px]  px-14 max-lg:px-8 m-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Title Section */}
          <div className="lg:w-1/3 flex flex-col justify-between gap-3 pb-4">
            <h1 className="text-sm mb-0 text-main_color">SUCCESS STORIES</h1>
            <h2 className="text-3xl max-lg:text-xl pr-5 font-semibold text-gray-800">
             Review from our satisfied users 
            </h2>
            
            <div className="w-full flex items-end justify-start gap-1 flex-1">
              <div className="swiper-button-prev2 testimonials max-md:hidden">
                <LucideArrowLeft />
              </div>
              <div className="swiper-button-next2 testimonials max-md:hidden">
                <LucideArrowRight />
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="lg:w-2/3">
            <div className="flex gap-6 overflow-x-none">
              <Swiper
                slidesPerView={2}
                spaceBetween={16}
                speed={1000}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                loop={true}
                navigation={{
                  nextEl: ".swiper-button-next2",
                  prevEl: ".swiper-button-prev2",
                }}
                className="mySwiper"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 12,
                  },
                  640: {
                    slidesPerView: 1.2,
                    spaceBetween: 14,
                  },
                  768: {
                    slidesPerView: 1.5,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1280: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div
                      key={testimonial.id}
                      className="w-full h-full min-h-full flex-none bg-white rounded-3xl select-none cursor-grab active:cursor-grabbing p-6 border border-gray-200 shadow-sm"
                    >
                      <div className="flex flex-col h-full">
                        <p className="text-gray-600 leading-relaxed text-sm text-left flex-grow mb-4">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                              alt={testimonial.author}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-left text-gray-800">
                              {testimonial.author}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
