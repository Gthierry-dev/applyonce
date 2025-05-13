import React from 'react';
import { 
  FaLinkedin,
  FaBriefcase,
  FaGraduationCap,
  FaBuilding
} from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-2xl w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-bold text-navy-900 mb-4 sm:mb-6">
              Get opportunities early,
              <br className="hidden sm:block" />
              apply for jobs, grants,
              <br className="hidden sm:block" />
              and scholarships.
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
              Your gateway to success with simple application processes,
              powerful integrations, and comprehensive opportunity management tools.
            </p>
            
            {/* Email signup form */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 w-full"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Get Started
              </button>
            </div>

            {/* Trusted Partners - Inline Layout */}
            <div className="mt-8 sm:mt-12">
              <p className="text-sm text-[#8B8B8B] mb-3">Built for everyday people, powered by smart opportunities</p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <img 
                    src="./linked in.png" 
                    alt="LinkedIn" 
                    className="h-4 sm:h-5 w-auto grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <img 
                    src="./indeed-logo.webp" 
                    alt="Indeed" 
                    className="h-4 sm:h-5 w-auto grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <img 
                    src="./irembo-300x83.png" 
                    alt="Irembo" 
                    className="h-4 sm:h-5 w-auto grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
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
          <div className="flex-1 relative w-full max-w-md lg:max-w-none">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/icons/resume.svg" alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Your Application</p>
                  <p className="text-sm sm:text-base font-semibold">Multiple Opportunities</p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-2 bg-gray-100 rounded-full w-full">
                  <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-blue-600 font-medium">75% Complete</span>
                  <span className="text-gray-500">25 applications</span>
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
