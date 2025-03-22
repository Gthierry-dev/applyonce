
import { LucideIcon, 
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
  iconName: string;
  color: string;
}

// Map of icon names to their components
export const iconMap: Record<string, LucideIcon> = {
  "GraduationCap": GraduationCap,
  "Award": Award,
  "Briefcase": Briefcase,
  "Building": Building,
  "Lightbulb": Lightbulb,
  "Users": Users,
  "Globe": Globe,
  "HeartHandshake": HeartHandshake,
  "PenTool": PenTool
};

export const categoryData: CategoryData[] = [
  {
    title: "Scholarships",
    description: "Educational funding opportunities",
    count: 42,
    iconName: "GraduationCap",
    color: "bg-blue-100"
  },
  {
    title: "Grants",
    description: "Research and project funding",
    count: 28,
    iconName: "Award",
    color: "bg-green-100"
  },
  {
    title: "Internships",
    description: "Professional development opportunities",
    count: 57,
    iconName: "Briefcase",
    color: "bg-orange-100"
  },
  {
    title: "Fellowships",
    description: "Academic and professional fellowships",
    count: 19,
    iconName: "Building",
    color: "bg-purple-100"
  },
  {
    title: "Competitions",
    description: "Contests and competitive events",
    count: 24,
    iconName: "Lightbulb",
    color: "bg-yellow-100"
  },
  {
    title: "Workshops",
    description: "Skill-building and educational workshops",
    count: 33,
    iconName: "Users",
    color: "bg-pink-100"
  },
  {
    title: "Study Abroad",
    description: "International education opportunities",
    count: 15,
    iconName: "Globe",
    color: "bg-indigo-100"
  },
  {
    title: "Volunteer",
    description: "Community service opportunities",
    count: 31,
    iconName: "HeartHandshake",
    color: "bg-red-100"
  },
  {
    title: "Creative Arts",
    description: "Opportunities for artists and creators",
    count: 22,
    iconName: "PenTool",
    color: "bg-teal-100"
  }
];
