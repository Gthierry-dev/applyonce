import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Import Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import { LucideArrowLeft, LucideArrowRight, LucideCheckCircle2 } from "lucide-react";

const AboutSection = () => {
  const WhatwedoImages = [
    "./about_us_1.jpg",
    "./about_us_2.jpg",
    "./about_us_3.jpg",
  ];

  return (
    <section className="py-20 max-md:pb-0 bg-accent/10">
      <div className="w-full h-fit pt-12 z-10 relative overflowx-x-clip">
        <div className="w-full h-fit max-w-[1300px] mx-auto grid grid-cols-2 max-lg:flex max-lg:flex-col gap-14 max-lg:gap-5 px-14 max-lg:px-8">
          <div className="w-full h-full max-h-[650px] max-lg:h-[300px] relative shadow-xl rounded-3xl">
            <div className="w-full h-full max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-5">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                speed={1000}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                loop={true}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                className="mySwiper rounded-3xl"
              >
                {WhatwedoImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={src}
                      className="h-full w-full object-cover rounded-3xl"
                    />
                  </SwiperSlide>
                ))}
                <div className="swiper-button-next aboutUs max-md:hidden">
                  <LucideArrowRight />
                </div>
                <div className="swiper-button-prev aboutUs max-md:hidden">
                  <LucideArrowLeft />
                </div>
              </Swiper>
            </div>
          </div>
          <div className="w-full h-full max-h-[650px] py-10 flex flex-col">
            <h1 className="text-sm mb-0 text-main_color">
              OUR MISSION
            </h1>
            <h1 className="text-6xl max-lg:text-5xl max-md:text-4xl font-bold my-6 text-foreground/85">
              Revolutionizing how you apply
            </h1>
            <h1 className="mb-0 font-normal text-[20px] max-md:text-sm max-w-[480px] max-lg:max-w-full text-text_color/80">
              ApplyOnce eliminates the frustration of repetitive applications. We're on a mission to give you back hours of your life while connecting you with more opportunities than ever before.
            </h1>
            <div className="w-full flex flex-col gap-6 mt-6">
              <div className="w-full flex items-start justify-start gap-2">
                <LucideCheckCircle2 className="fill-main_color text-white size-7" />
                <p className="flex flex-col">
                  <span className="max-md:text-sm">One Profile, Unlimited Applications</span>
                  <span className="text-sm text-foreground/50">Say goodbye to filling out the same information over and over again</span>
                </p>
              </div>
              <div className="w-full flex items-start justify-start gap-2">
                <LucideCheckCircle2 className="fill-main_color text-white size-7" />
                <p className="flex flex-col">
                  <span className="max-md:text-sm">AI-Powered Opportunity Matching</span>
                  <span className="text-sm text-foreground/50">Discover opportunities you'd never find on traditional platforms</span>
                </p>
              </div>
              <div className="w-full flex items-start justify-start gap-2">
                <LucideCheckCircle2 className="fill-main_color text-white size-7" />
                <p className="flex flex-col">
                  <span className="max-md:text-sm">Real-Time Application Tracking</span>
                  <span className="text-sm text-foreground/50">Know exactly where you stand with every opportunity</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
