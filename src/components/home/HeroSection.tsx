import React from "react";
import { FaFire } from "react-icons/fa";
import { RiChatSmileAiFill, RiChatSmileAiLine } from "react-icons/ri";
import { MdOutlineAutoMode } from "react-icons/md";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br bg-white py-12 sm:py-16 lg:py-20 z-10 relative overflow-clip">
      <FaFire className="text-[800px] absolute top-[10%] -left-[10%] max-lg:hidden -z-10 text-[#eaf0f067]" />
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-2xl w-full">
            <h1 className="text-6xl leading-[72px] max-lg:text-5xl max-md:text-4xl font-bold my-6 text-foreground/85 HubotSans">
              <span className="text-main_color">One</span> form <br />
              Endless <br />
              Opportunities
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
              Apply for jobs, scholarships, workshops, and more with one
              profile.
            </p>

            {/* Email signup form */}
            <div className="flex flex-col sm:flex-row gap-3 max-sm:gap-4 max-w-md w-full">
              {/* <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-main_color w-full"
              /> */}
              <button className="px-6 py-3 min-w-[200px] max-lg:min-w-fit font-medium bg-main_color text-white rounded-xl hover:bg-main_color transition-colors whitespace-nowrap">
                Get Started
              </button>
              <button className="px-6 py-3 min-w-[200px] max-lg:min-w-fit font-medium ring-1 text-foreground/90 ring-foreground/10 rounded-xl hover:bg-accent transition-colors whitespace-nowrap">
                See How it Works
              </button>
            </div>

            {/* Trusted Partners - Inline Layout */}
            <div className="mt-16">
              <p className="text-sm text-[#8B8B8B] mb-6">
                Built for everyday people, powered by smart opportunities
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <img
                    src="./linked in.png"
                    alt="LinkedIn"
                    className="h-4 sm:h-5 w-auto grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <img
                    src="./indeed-logo.webp"
                    alt="Indeed"
                    className="h-4 sm:h-5 w-auto grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <img
                    src="./irembo-300x83.png"
                    alt="Irembo"
                    className="h-4 sm:h-5 w-auto grayscale opacity-90 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <img
                    src="./alu.png"
                    alt="ALU"
                    className="h-4 sm:h-5 w-auto grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 bg-white rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full max-w-[640px] relative max-lg:max-w-none flex flex-col gap-4">
            {/* <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-main_color rounded-full flex items-center justify-center">
                  <img
                    src="/icons/resume.svg"
                    alt=""
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Your Application
                  </p>
                  <p className="text-sm sm:text-base font-semibold">
                    Multiple Opportunities
                  </p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-2 bg-gray-100 rounded-full w-full">
                  <div className="h-2 bg-main_color rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-main_color font-medium">
                    75% Complete
                  </span>
                  <span className="text-gray-500">25 applications</span>
                </div>
              </div>
            </div> */}

            <div className="w-full h-[180px] max-lg:h-fit flex max-lg:flex-col gap-4 text-text_color">
              <div className="w-[270px] h-[180px] max-lg:w-full bg-[#eaf0f0c0] flex rounded-3xl p-5 flex-col items-start justify-between">
                <h1 className="text-5xl font-bold text-main_color">50+</h1>
                <h1 className="pr-4 opacity-85">
                  Best-fit Opportunities for you
                </h1>
              </div>
              <div className="flex-1 h-[180px] bg-[#eaf0f0c0] flex rounded-3xl p-5 flex-col items-start justify-between overflow-clip">
                <div className="w-full h-fit flex items-center justify-between">
                  <h1 className="pr-4 text-main_color font-medium">
                    Ai Suggestions
                  </h1>
                  <RiChatSmileAiFill className="text-3xl text-main_color" />
                </div>
                <div className="w-full h-fit flex-1 flex flex-col gap-1 mt-3">
                  {[
                    "Use a clear and professional profile photo",
                    "Write a compelling headline that reflects your expertise",
                    "Highlight results in your project descriptions",
                    "Keep your bio concise and achievement-focused",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="w-full px-4 py-2.5 rounded-xl flex items-start justify-start gap-3 bg-white/80 "
                    >
                      <RiChatSmileAiLine className="text-sm min-w-[14px] text-main_color" />
                      <p className="line-clamp-2 text-xs">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full h-[380px] max-lg:h-fit flex max-lg:flex-col gap-4 text-text_color">
              <div className="h-full flex-1 bg-[#eaf0f0c0] max-lg:max-h-[320px] flex rounded-3xl overflow-hidden relative">
                <div className="w-full h-full absolute top-0 left-0 p-5 flex flex-col items-start justify-between text-white font-medium text-xl">
                  <p>
                    Feedback after <br /> rejections
                  </p>
                  <div className="w-full flex items-center justify-end">
                    <RiChatSmileAiFill className="text-3xl" />
                  </div>
                </div>
                <img
                  src="./woman1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-full w-[270px] max-lg:w-full flex lg:flex-col max-lg:flex-col gap-4">
                <div className="lg:h-1/2 max-lg:h-full w-full bg-[#eaf0f0c0] flex rounded-3xl p-5 flex-col items-start justify-between">
                  <div className="w-full h-fit flex items-center justify-between">
                    <h1 className="pr-4 font-medium text-main_color">
                      Auto Apply
                    </h1>
                    <MdOutlineAutoMode className="text-xl text-main_color" />
                  </div>
                  <h1 className="pr-4 opacity-85">
                    We’ll submit applications for you when you turn on
                    auto-apply
                  </h1>
                </div>
                <div className="lg:h-1/2 max-lg:h-full w-full bg-[#eaf0f0c0] flex rounded-3xl p-5 flex-col items-start justify-between">
                  <h1 className="text-main_color font-medium">Ad-Free</h1>
                  <h1 className="pr-4 opacity-85">
                    No pop-ups, no clutter <br /> just the opportunities that
                    matter
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
