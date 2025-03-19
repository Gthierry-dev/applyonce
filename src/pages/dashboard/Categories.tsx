
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Building, 
  Lightbulb, 
  Users, 
  Globe, 
  HeartHandshake, 
  PenTool,
  ArrowRight
} from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  count, 
  icon, 
  color 
}) => (
  <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-md ${color}`}>
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg flex items-center">
            {title}
            <Badge variant="outline" className="ml-2 text-xs">
              {count}
            </Badge>
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="p-6 pt-0">
      <Button asChild variant="ghost" size="sm" className="ml-auto">
        <Link to={`/opportunities?category=${encodeURIComponent(title)}`}>
          Browse
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const Categories = () => {
  // Dummy category data
  const categories = [
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Browse different categories of opportunities.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
