
import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Building, 
  Lightbulb, 
  Users, 
  Globe, 
  HeartHandshake, 
  PenTool
} from 'lucide-react';

export interface CategoryData {
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export const categoryData: CategoryData[] = [
  {
    title: "Scholarships",
    description: "Educational funding opportunities",
    count: 42,
    icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
    color: "bg-blue-100"
  },
  {
    title: "Grants",
    description: "Research and project funding",
    count: 28,
    icon: <Award className="h-5 w-5 text-green-600" />,
    color: "bg-green-100"
  },
  {
    title: "Internships",
    description: "Professional development opportunities",
    count: 57,
    icon: <Briefcase className="h-5 w-5 text-orange-600" />,
    color: "bg-orange-100"
  },
  {
    title: "Fellowships",
    description: "Academic and professional fellowships",
    count: 19,
    icon: <Building className="h-5 w-5 text-purple-600" />,
    color: "bg-purple-100"
  },
  {
    title: "Competitions",
    description: "Contests and competitive events",
    count: 24,
    icon: <Lightbulb className="h-5 w-5 text-yellow-600" />,
    color: "bg-yellow-100"
  },
  {
    title: "Workshops",
    description: "Skill-building and educational workshops",
    count: 33,
    icon: <Users className="h-5 w-5 text-pink-600" />,
    color: "bg-pink-100"
  },
  {
    title: "Study Abroad",
    description: "International education opportunities",
    count: 15,
    icon: <Globe className="h-5 w-5 text-indigo-600" />,
    color: "bg-indigo-100"
  },
  {
    title: "Volunteer",
    description: "Community service opportunities",
    count: 31,
    icon: <HeartHandshake className="h-5 w-5 text-red-600" />,
    color: "bg-red-100"
  },
  {
    title: "Creative Arts",
    description: "Opportunities for artists and creators",
    count: 22,
    icon: <PenTool className="h-5 w-5 text-teal-600" />,
    color: "bg-teal-100"
  },
];
