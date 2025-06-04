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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FilterHeader = ({ children }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedTags, setSelectedTags] = useState([]);
  const scrollRef = useRef(null);

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
        <p className="font-bold text-2xl text-gray-900">Opportunites Result</p>

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

const OpportunitiesPage = () => {
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const opportunities = [
    {
      id: "1",
      title: "Software Engineer",
      company: "Tech Innovations Ltd.",
      location: "United States",
      workType: "Full-Time",
      salary: "$90,000 - $120,000",
      postedTime: "3d ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Remote", "JavaScript", "React"],
      avatar: "TI",
      avatarBg: "bg-teal-600",
    },
    {
      id: "2",
      title: "Marketing Manager",
      company: "Creative Minds Co.",
      location: "UK, London",
      workType: "Full-Time",
      salary: "£45,000 - £60,000",
      postedTime: "3d ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Marketing", "Strategy", "Digital"],
      avatar: "CM",
      avatarBg: "bg-orange-500",
    },
    {
      id: "3",
      title: "Business Analyst",
      company: "Global Solutions Inc.",
      location: "Australia",
      workType: "Internship",
      salary: "AUD 80,000 - AUD 100,000",
      postedTime: "3d ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Analytics", "Business", "Data"],
      avatar: "GS",
      avatarBg: "bg-red-500",
    },
    {
      id: "4",
      title: "Frontend Developer",
      company: "WebCraft Technologies",
      location: "Bangalore",
      workType: "Part-Time",
      salary: "₹10,00,000 - ₹15,00,000",
      postedTime: "2d ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Frontend", "Vue.js", "CSS"],
      avatar: "WC",
      avatarBg: "bg-teal-600",
    },
    {
      id: "5",
      title: "Customer Support Specialist",
      company: "Service Solutions",
      location: "Manila",
      workType: "Internship",
      salary: "PHP 350,000 - PHP 500,000",
      postedTime: "3d ago",
      status: "Closing Soon",
      statusColor: "text-orange-600",
      skills: ["HR", "Management", "People"],
      avatar: "PF",
      avatarBg: "bg-red-500",
    },
    {
      id: "6",
      title: "Human Resources Manager",
      company: "PeopleFirst HR",
      location: "Singapore",
      workType: "Full-Time",
      salary: "SGD 70,000 - SGD 90,000",
      postedTime: "3d ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Python", "Machine Learning", "AI"],
      avatar: "DS",
      avatarBg: "bg-blue-600",
    },
  ];

  const OpportunityCard = ({ opportunity }) => {
    const isApplied = appliedJobs.has(opportunity.id);
    const isSaved = opportunity.id === "2" || opportunity.id === "6";

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 ${opportunity.avatarBg} rounded-lg flex items-center justify-center text-white font-semibold`}>
              {opportunity.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{opportunity.title}</h3>
              <p className="text-gray-600">{opportunity.company}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${opportunity.statusColor}`}>{opportunity.status}</p>
            <p className="text-gray-500 text-sm">{opportunity.postedTime}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {opportunity.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {opportunity.workType}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <DollarSign className="w-4 h-4" />
          {opportunity.salary}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {opportunity.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">Apply</Button>
          <Button variant="outline" size="icon" className={isSaved ? "bg-teal-50 border-teal-200" : ""}>
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-teal-600 text-teal-600" : ""}`} />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="relative rounded-3xl px-6 text-white overflow-hidden">
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
      </div>

      <div className="w-full mx-auto px-0 py-6">
        

        <FilterHeader> 
        </FilterHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;