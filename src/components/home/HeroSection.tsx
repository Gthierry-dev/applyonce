import React from 'react';
import { 
  FaLinkedin,
  FaBriefcase,
  FaGraduationCap,
  FaBuilding
} from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-[2.75rem] leading-tight font-bold text-navy-900 mb-6">
              Get opportunities early,
              <br />
              apply for jobs, grants,
              <br />
              and scholarships.
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your gateway to success with simple application processes,
              powerful integrations, and comprehensive opportunity management tools.
            </p>
            
            {/* Email signup form */}
            <div className="flex gap-4 max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>

            {/* Trusted Partners - Grid Layout */}
            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-6">Trusted Partners</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <FaLinkedin className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">LinkedIn</span>
                    <span className="text-xs text-gray-500">Professional Network</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <FaBriefcase className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Indeed</span>
                    <span className="text-xs text-gray-500">Job Platform</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <FaGraduationCap className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">ALU</span>
                    <span className="text-xs text-gray-500">Education Partner</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <FaBuilding className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Andela</span>
                    <span className="text-xs text-gray-500">Tech Talent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 relative">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/icons/resume.svg" alt="" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Your Application</p>
                  <p className="font-semibold">Multiple Opportunities</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 bg-gray-100 rounded-full w-full">
                  <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm">
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
