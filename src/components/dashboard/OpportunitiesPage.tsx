import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Filter,
  SortAsc,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
  Star,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FilterHeader = ({ children, activeTab, setActiveTab }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedTags, setSelectedTags] = useState([]);
  const scrollRef = useRef(null);

  const tabs = [
    { id: 'recommended', label: 'Recommended', count: null },
    { id: 'liked', label: 'Liked', count: 2 },
    { id: 'applied', label: 'Applied', count: 1 },
    { id: 'external', label: 'External', count: 1 }
  ];

  const tags = ['Remote', 'JavaScript', 'React', 'Python', 'Full-Time', 'Part-Time', 'Internship', 'Marketing', 'Analytics', 'Frontend', 'Backend', 'UI/UX'];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div className="flex border-b items-center justify-between px-5 pb-5">
        <div className="flex items-center gap-4">
          <p className="font-bold text-2xl text-gray-900">JOBS</p>
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className="ml-1 bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters 
                ? 'bg-[#E7F0F0] border-[#306C6A] text-[#306C6A]' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            <span className="text-sm font-medium">Filter</span>
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#306C6A] focus:border-[#306C6A]"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="alphabetical">A-Z</option>
              <option value="salary">Salary</option>
              <option value="location">Location</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="border-b bg-gray-50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Filter by tags</h3>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-sm text-[#306C6A] hover:text-[#285856] font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="relative flex items-center">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto mx-10 py-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-teal-50 text-[#306C6A] border border-[#306C6A]'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <X size={14} className="ml-2 text-[#306C6A] hover:text-[#285856]" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>

          {selectedTags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

const OpportunityCard = ({ opportunity, isHovered, onHover, onLeave }) => {
  return (
    <div 
      className="relative bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-6"
      onMouseEnter={() => onHover(opportunity.id)}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start gap-4 flex-1">
        <div className={`w-16 h-16 ${opportunity.avatarBg} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
          {opportunity.avatar}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-500">{opportunity.postedTime}</span>
            <span className="text-sm text-blue-600 font-medium">{opportunity.applicationStatus || 'Be an early applicant'}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
          <p className="text-gray-600 mb-4">{opportunity.company} / {opportunity.industry || 'Technology'}</p>

          <div className="grid grid-cols-3 gap-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{opportunity.workType}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{opportunity.salary}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Less than 25 applicants</span>
            <div className="flex gap-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                APPLY WITH AUTOFILL
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 text-center min-w-[140px]">
        <div className="w-16 h-16 mx-auto mb-2 rounded-full border-4 border-teal-400 flex items-center justify-center relative">
          <span className="text-white font-bold text-lg">{opportunity.matchScore || '98'}%</span>
        </div>
        <div className="text-white font-bold text-sm mb-2">STRONG MATCH</div>
        <div className="text-green-400 text-xs">✓ Growth Opportunities</div>
        <div className="text-white text-xs">• No H1B</div>
      </div>

      {/* Match Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-white rounded-lg border-2 border-blue-200 p-6 shadow-xl z-10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Why This Job Is A Match</h4>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{opportunity.matchScore || '98'}%</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            {opportunity.matchDescription || `${opportunity.company} is a global leader in technology, dedicated to innovation with their advanced platform. As a ${opportunity.title}...`}
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-teal-500 flex items-center justify-center mx-auto mb-2">
                <span className="text-teal-600 font-bold">{opportunity.experienceMatch || '100'}%</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Experience Level</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-teal-500 flex items-center justify-center mx-auto mb-2">
                <span className="text-teal-600 font-bold">{opportunity.skillsMatch || '97'}%</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Skills</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-teal-500 flex items-center justify-center mx-auto mb-2">
                <span className="text-teal-600 font-bold">{opportunity.industryMatch || '89'}%</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Industry Experience</p>
            </div>
          </div>

          <div className="bg-teal-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-teal-700">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">STRONG MATCH</span>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex items-center gap-2 text-teal-600">
                <span>✓ Growth Opportunities</span>
              </div>
              <div className="flex items-center gap-2 text-teal-600">
                <span>• No H1B</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OpportunitiesPage = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const opportunities = [
    {
      id: "1",
      title: "Frontend Engineer Intern - Fall 2025 (Remote)",
      company: "CrowdStrike",
      industry: "Artificial Intelligence (AI) • Cloud Data Services • Public Company",
      location: "Sunnyvale, CA",
      workType: "Internship",
      salary: "CAD$38/hr - CAD$45/hr",
      postedTime: "54 minutes ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Remote", "JavaScript", "React"],
      avatar: "CS",
      avatarBg: "bg-red-500",
      matchScore: 98,
      experienceMatch: 100,
      skillsMatch: 97,
      industryMatch: 89
    },
    {
      id: "2",
      title: "Front-End Engineer - US Remote Contractor",
      company: "Bold+Beyond",
      industry: "Advertising • Consulting • Early Stage",
      location: "United States",
      workType: "Full-time, Contract",
      salary: "2+ years exp",
      postedTime: "1 hour ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Frontend", "Vue.js", "CSS"],
      avatar: "BB",
      avatarBg: "bg-orange-500",
      matchScore: 96,
      experienceMatch: 95,
      skillsMatch: 98,
      industryMatch: 85
    },
    {
      id: "3",
      title: "Website Developer",
      company: "Plumber Marketing USA",
      industry: "Marketing & Advertising • Early Stage",
      location: "Texas, United States",
      workType: "Full-time",
      salary: "",
      postedTime: "2 days ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Analytics", "Business", "Data"],
      avatar: "PM",
      avatarBg: "bg-blue-600",
      matchScore: 92,
      experienceMatch: 88,
      skillsMatch: 94,
      industryMatch: 90
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <div className="relative rounded-3xl px-6 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/green-bg.jpg')] bg-cover bg-center bg-no-repeat rounded-3xl"
          style={{filter: 'brightness(0.7)'}}
        ></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Explore Opportunities Across Careers,
              <br />
              Scholarships, Hackathons & More
            </h1>
            <p className="text-teal-100">
              Find and apply to the best opportunities for your skills and aspirations.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-2 flex gap-2">
              <div className="flex-1 relative">
                <input
                  placeholder="Job title, keyword, or company"
                  className="w-full text-text_color border-0 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#306C6A]"
                />
              </div>
              <div className="w-[1px] h-full my-auto min-h-[32px] bg-gray-300"></div>
              <div className="relative text-text_color flex-1">
                <select className="w-full h-full appearance-none bg-white rounded-lg px-4 py-2.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#306C6A]">
                  <option value="All">All</option>
                  <option value="Jobs">Jobs</option>
                  <option value="Scholarships">Scholarships</option>
                  <option value="internships">internships</option>
                  <option value="grants">grants</option>
                  <option value="Hackthons">Hackthons</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 px-6 py-2.5 rounded-lg text-white font-medium flex items-center transition-colors">
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          <FilterHeader activeTab={activeTab} setActiveTab={setActiveTab}>
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  isHovered={hoveredCard === opportunity.id}
                  onHover={setHoveredCard}
                  onLeave={() => setHoveredCard(null)}
                />
              ))}
            </div>
          </FilterHeader>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Orion</h3>
                <p className="text-sm text-gray-600">Your AI Copilot</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 mb-2">
                Welcome back, Gusenga Thierry!
              </p>
              <p className="text-sm text-gray-600">
                It's great to see you again. Let's resume your journey towards your dream job.
              </p>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="any jobs in rwanda?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-900 mb-2">📍 Update Preferences</h4>
              <p className="text-sm text-red-700 mb-3">
                You've requested to update your job preferences, including 1 revision, 1 deletion.
              </p>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">✏️ Revise</span>
                  <p className="text-red-600 ml-4">Revised 'Work Model' from 'Onsite,Remote,Hybrid' to 'Remote'.</p>
                </div>
                <div>
                  <span className="font-medium">❌ Delete</span>
                  <p className="text-red-600 ml-4">Deleted 'Within US' from 'Preferred Locations'.</p>
                </div>
              </div>
              
              <button className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                GO
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">
                Success! I have found <strong>600 jobs</strong> that match your criteria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Chat */}
      <div className={`fixed bottom-4 right-4 transition-all duration-300 ${chatOpen ? 'w-80 h-96' : 'w-12 h-12'}`}>
        {chatOpen ? (
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <div className="text-sm text-gray-600">
                Ask me anything about jobs, applications, or career advice!
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesPage;