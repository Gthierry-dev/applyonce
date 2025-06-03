import React, { useState } from "react";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dropdown } from "../forms/Dropdown";

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
            <div
              className={`w-12 h-12 ${opportunity.avatarBg} rounded-lg flex items-center justify-center text-white font-semibold`}
            >
              {opportunity.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {opportunity.title}
              </h3>
              <p className="text-gray-600">{opportunity.company}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${opportunity.statusColor}`}>
              {opportunity.status}
            </p>
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
            <Badge
              key={skill}
              variant="secondary"
              className="bg-gray-100 text-gray-700 text-xs"
            >
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
            Apply
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={isSaved ? "bg-teal-50 border-teal-200" : ""}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved ? "fill-teal-600 text-teal-600" : ""
              }`}
            />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen ">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl px-6 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Explore Opportunities Across Careers,
              <br />
              Scholarships, Hackathons & More
            </h1>
            <p className="text-teal-100">
              Find and apply to the best opportunities for your skills and
              aspirations.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-2 flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Job title, keyword, or company"
                  className="border-0 focus:ring-green-500 pl-4"
                />
              </div>
              <div className="w-[1px] h-full my-auto min-h-[32px] bg-foreground/40"></div>
              <div className="flex-1">
                <Dropdown
                  options={[
                    { label: "Last 7 Days", value: "7" },
                    { label: "Last 30 Days", value: "30" },
                  ]}
                  label=""
                  placeholder="Location or Category"
                  value={""}
                  size="large"
                  onChange={(e) => null}
                />
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700 px-6">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-0 py-6">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {[
            "For You",
            "Trending",
            "New",
            "Nearby",
            "Urgent",
            "Scholarships",
            "Hackathons",
            "Jobs",
            "Internships",
            "Remote",
          ].map((tab) => (
            <Button
              key={tab}
              variant={tab === "For You" ? "default" : "outline"}
              size="sm"
              className={
                tab === "For You"
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "hover:bg-teal-50 hover:text-teal-700"
              }
            >
              {tab}
            </Button>
          ))}
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm">
              <SortAsc className="w-4 h-4 mr-1" />
              Sort By
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-4">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;
