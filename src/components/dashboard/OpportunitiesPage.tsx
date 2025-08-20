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
  Star,
  Building2,
  Calendar,
  Users,
  Award,
  GraduationCap,
  Briefcase,
  Globe,
  Mail,
  Linkedin,
  ExternalLink,
  Heart,
  Share2,
  Eye,
  CheckCircle,
  AlertCircle,
  Info,
  MessageCircle,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PercentageCard from "@/components/cards/PercentageCard";
import OttoChatBox from "@/components/chat/OttoChatBox";
import OpportunityDetailPanel from "@/components/dashboard/OpportunityDetailPanel";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsTablet } from "@/hooks/useIsTablet";

const FilterHeader = ({ children, activeTab, setActiveTab }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedTags, setSelectedTags] = useState([]);
  const scrollRef = useRef(null);

  const tabs = [
    { id: 'recommended', label: 'Recommended', count: null },
    { id: 'liked', label: 'Liked', count: 2 },
    { id: 'external', label: 'Add', count: 1 }
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
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
      <div className="flex border-b items-center justify-between px-5 pb-5">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
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
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-5 py-5">
        {children}
        </ScrollArea>
      </div>
    </div>
  );
};

const OpportunityCard = ({ opportunity, isHovered, onHover, onLeave, onClick, isFavorite, onFavorite }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'job':
        return <Briefcase className="w-4 h-4" />;
      case 'scholarship':
        return <Award className="w-4 h-4" />;
      case 'internship':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type) => {
    const badges = {
      job: { label: 'Job', color: 'bg-blue-100 text-blue-800' },
      scholarship: { label: 'Scholarship', color: 'bg-green-100 text-green-800' },
      internship: { label: 'Internship', color: 'bg-purple-100 text-purple-800' }
    };
    return badges[type] || badges.job;
  };

  // Handle action button clicks without triggering the card click
  const handleActionClick = (e, action) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the card
    
    // Handle different actions
    switch(action) {
      case 'notInterested':
        console.log('Not interested in:', opportunity.id);
        // Add your not interested logic here
        break;
      case 'favorite':
        onFavorite(e);
        break;
      case 'askOtto':
        console.log('Ask Otto about:', opportunity.id);
        // Add your ask Otto logic here
        break;
      case 'apply':
        console.log('Apply to:', opportunity.id);
        // Add your apply logic here
        break;
      default:
        break;
    }
  };

  return (
    <div 
      className="relative rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-6"
      onMouseEnter={() => onHover(opportunity.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(opportunity)}
    >
      <div className="px-6 py-4 bg-red-00 flex items-start gap-4 flex-1">
        
        
        <div className="bg-red-00 flex-1"> 
          <div className=" flex items-center gap-2 mb-3">
            {/* campany avatar */}
            <div className={`w-[100px] h-[100px] ${opportunity.avatarBg} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
          {opportunity.avatar}
        </div>
        
            {/* first info */}
            
            
            <div className=" gap-2">
              
              <div className="flex items-center gap-2">
                <span className="text-sm bg-gray-100 rounded-full px-4 py-1 text-gray-500">{opportunity.postedTime}</span>
              
                <Badge className={`${getTypeBadge(opportunity.type).color} text-xs`}>
                  {getTypeIcon(opportunity.type)}
                  <span className="ml-1 rounded-full px-1 py-1">{getTypeBadge(opportunity.type).label}</span>
                </Badge>
              </div>
              
              <div className="bg-blue-0">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{opportunity.company} / {opportunity.industry || 'Technology'}</p>
              </div>
            </div>
          </div>
          
          

          <div className="bg-red-00 pt-3 border-t border-gray-100 grid grid-cols-3 gap-6 text-sm text-gray-600 mb-4">
            {/* location */}
            <div> 
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{opportunity.location}</span>
            </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {/* this should be remote or onsite */}
                <span>{opportunity.location}</span> 
              </div> 
            </div>


            <div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{opportunity.workType}</span>
              </div>
              {/* this should have job or position entry level in (Mid, Senior Level) */}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{opportunity.workType}</span>
              </div>
            </div>

            <div>
            <div className="flex items-center gap-1">
                {opportunity.type === 'scholarship' ? (
                  <Award className="w-4 h-4" />
                ) : (
              <DollarSign className="w-4 h-4" />
                )}
                <span>{opportunity.salary || opportunity.amount}</span>
              </div>
            
              <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{opportunity.workType}</span>
                </div>

            </div>
            
          </div>

          <div className=" bg-red-00 pt-2.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">25 applicants</span>
            <div className="flex gap-3">
              {/* Not Interested Button (X icon) with tooltip */}
              <div className="relative group">
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full" 
                  onClick={(e) => handleActionClick(e, 'notInterested')}
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Not Interested
                </div>
              </div>
              
              {/* Favorite Button with tooltip */}
              <div className="relative group">
                <button 
                  className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} rounded-full`}
                  onClick={(e) => handleActionClick(e, 'favorite')}
                >
                  <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </div>
              </div>
              
              {/* Ask Otto Button */}
              <button 
                className="px-6 py-1 bg-[#F2F4F5] text-black rounded-full hover:bg-green-600 font-medium"
                onClick={(e) => handleActionClick(e, 'askOtto')}
              >
                Ask Otto
              </button>
              
              {/* Apply Button - conditional based on opportunity type */}
              <button 
                className="px-6 py-1 bg-[#306C6A] text-white rounded-full hover:bg-green-600 font-medium"
                onClick={(e) => handleActionClick(e, 'apply')}
              >
                {opportunity.hasAutofill ? 'Apply with autofill' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mr-2">
        <PercentageCard
          percentage={opportunity.matchScore || 98}
          title="STRONG MATCH"
          features={["Growth Opportunities", "No H1B"]}
          glowColor="teal"
          size="md"
        />
      </div>
    </div>
  );
};

const OpportunitiesPage = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  // Add these missing state declarations
  const [likedOpportunities, setLikedOpportunities] = useState(new Set());
  const [addedOpportunities, setAddedOpportunities] = useState([]);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  // Chat is collapsed by default on mobile and tablet
  const isSmallScreen = isMobile || isTablet;

  // Add the missing filteredOpportunities function
  const filteredOpportunities = () => {
    switch (activeTab) {
      case 'liked':
        return allOpportunities.filter(opp => likedOpportunities.has(opp.id));
      case 'external':
        return addedOpportunities;
      case 'recommended':
      default:
        return allOpportunities;
    }
  };

  // Sample opportunities data - in a real app, this would come from an API
  const allOpportunities = [
    {
      id: "1",
      type: "job",
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
      industryMatch: 89,
      startDate: "Fall 2025",
      companyDescription: "CrowdStrike is a global leader in cybersecurity, dedicated to innovation with their advanced threat detection platform.",
      tags: ["Automotive", "Service Industry"],
      responsibilities: [
        "Design and develop web and mobile applications",
        "Collaborate with cross-functional teams",
        "Create prototypes and wireframes",
        "Build enterprise-level services",
        "Work with RESTful APIs and microservices"
      ],
      requiredSkills: ["React", "JavaScript", "RESTful APIs", "SQL Server", "React Native"],
      preferredSkills: ["Django", "Python", "CSS3", "HTML5", "DevOps"],
      benefits: ["Medical", "Dental", "Vision", "401k", "Referral Bonus"],
      founded: "2011",
      employees: "5000+",
      headquarters: "Sunnyvale, California, USA",
      website: "www.crowdstrike.com",
      h1bInfo: true
    },
    {
      id: "2",
      type: "scholarship",
      title: "Google Generation Scholarship 2025",
      company: "Google",
      industry: "Technology • Education • Public Company",
      location: "United States",
      workType: "Scholarship",
      amount: "$10,000 USD",
      postedTime: "2 hours ago",
      status: "Open for Applications",
      statusColor: "text-green-600",
      skills: ["Computer Science", "Engineering", "Leadership"],
      avatar: "G",
      avatarBg: "bg-blue-500",
      matchScore: 96,
      experienceMatch: 95,
      skillsMatch: 98,
      industryMatch: 85,
      startDate: "Fall 2025",
      companyDescription: "Google is committed to increasing the representation of underrepresented groups in computer science and technology.",
      tags: ["Computer Science", "Engineering", "Diversity"],
      responsibilities: [
        "Must be enrolled in a computer science or engineering program",
        "Demonstrate academic excellence",
        "Show leadership potential",
        "Be from an underrepresented group in tech"
      ],
      requiredSkills: ["Computer Science", "Engineering", "Leadership", "Academic Excellence"],
      benefits: ["$10,000 Scholarship", "Google Conference Attendance", "Mentorship Program"],
      founded: "1998",
      employees: "150,000+",
      headquarters: "Mountain View, California, USA",
      website: "www.google.com"
    },
    {
      id: "3",
      type: "internship",
      title: "Software Development Intern",
      company: "Microsoft",
      industry: "Technology • Software • Public Company",
      location: "Redmond, WA",
      workType: "Internship",
      salary: "$7,500/month",
      postedTime: "1 day ago",
      status: "Still Hiring",
      statusColor: "text-green-600",
      skills: ["Software Development", "C#", "Azure"],
      avatar: "M",
      avatarBg: "bg-green-500",
      matchScore: 92,
      experienceMatch: 88,
      skillsMatch: 94,
      industryMatch: 90,
      startDate: "Summer 2025",
      companyDescription: "Microsoft is a global technology company that develops, manufactures, licenses, supports, and sells computer software.",
      tags: ["Technology", "Software", "Cloud Computing"],
      responsibilities: [
        "Develop software applications and features",
        "Collaborate with senior developers",
        "Participate in code reviews",
        "Learn Microsoft technologies and tools",
        "Contribute to team projects"
      ],
      requiredSkills: ["C#", ".NET", "JavaScript", "SQL", "Git"],
      preferredSkills: ["Azure", "React", "TypeScript", "Docker"],
      benefits: ["Competitive Salary", "Housing Allowance", "Relocation Support", "Mentorship"],
      founded: "1975",
      employees: "200,000+",
      headquarters: "Redmond, Washington, USA",
      website: "www.microsoft.com",
      h1bInfo: true
    },
  ];

  const handleCardClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle adding to favorites
  const handleFavorite = (e, opportunityId) => {
    e.stopPropagation(); // Prevent card click
    
    setLikedOpportunities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(opportunityId)) {
        newSet.delete(opportunityId);
      } else {
        newSet.add(opportunityId);
      }
      return newSet;
    });
  };

  // Handle adding a new opportunity
  const handleAddOpportunity = (formData) => {
    // In a real app, you would send this to your backend
    const newOpportunity = {
      id: `added-${Date.now()}`,
      type: "job", // Default type
      title: formData.title,
      company: formData.company_name || "Your Company",
      industry: formData.industry || "Technology",
      location: formData.location || "Remote",
      workType: formData.workType || "Full-time",
      salary: formData.salary || "Competitive",
      postedTime: "Just now",
      status: "Open",
      statusColor: "text-green-600",
      skills: [],
      avatar: formData.company_name?.[0] || "A",
      avatarBg: "bg-[#306C6A]",
      matchScore: 100,
      description: formData.description,
      hasAutofill: false
    };
    
    setAddedOpportunities(prev => [newOpportunity, ...prev]);
    setIsAddDrawerOpen(false);
    setActiveTab('external'); // Switch to the "Added" tab
  };

  return (
    <div className="h-[84vh] flex bg-gray-50 rounded-lg overflow-hidden relative">
      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${isSmallScreen ? 'w-full' : 'w-4/6'} overflow-hidden`}>
        <FilterHeader activeTab={activeTab} setActiveTab={setActiveTab}>
          {selectedOpportunity ? (
            <OpportunityDetailPanel opportunity={selectedOpportunity} onClose={() => setSelectedOpportunity(null)} />
          ) : (
            <div className="space-y-4">
              {filteredOpportunities().map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  isHovered={hoveredCard === opportunity.id}
                  onHover={setHoveredCard}
                  onLeave={() => setHoveredCard(null)}
                  onClick={handleCardClick}
                  isFavorite={likedOpportunities.has(opportunity.id)}
                  onFavorite={(e) => handleFavorite(e, opportunity.id)}
                />
              ))}
              
              {activeTab === 'external' && filteredOpportunities().length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">You haven't added any opportunities yet</p>
                  <Button 
                    onClick={() => setIsAddDrawerOpen(true)}
                    className="bg-[#306C6A] hover:bg-[#1e4140] text-white"
                  >
                    Add Your First Opportunity
                  </Button>
                </div>
              )}
            </div>
          )}
        </FilterHeader>
      </div>

      {/* Add Opportunity Button - visible when on "Add" tab */}
      {activeTab === 'external' && filteredOpportunities().length > 0 && (
        <Button
          onClick={() => setIsAddDrawerOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-[#306C6A] hover:bg-[#1e4140] text-white rounded-full px-6 py-6 shadow-lg"
        >
          + Add Opportunity
        </Button>
      )}

      {/* Collapsible Chat Button for mobile and tablet */}
      {isSmallScreen && (
        <button 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#306C6A] rounded-full flex items-center justify-center shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Sidebar: Otto Chat */}
      {isSmallScreen ? (
        <div 
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${isChatOpen ? 'translate-y-0' : 'translate-y-full'}`}
          style={{ height: '80vh', top: 'auto' }}
        >
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Otto Chat</h3>
              <button onClick={toggleChat} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <OttoChatBox />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-2/6 bg-white border-l border-gray-200 flex-shrink-0 overflow-hidden">
          <OttoChatBox />
        </div>
      )}
    </div>
  );
};

export default OpportunitiesPage;