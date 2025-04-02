
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OpportunityCard from '@/components/cards/OpportunityCard';
import { Button } from '@/components/ui/button';

// Sample opportunity data
const opportunities = [
  {
    id: '1',
    title: 'Frontend Developer Internship',
    organization: 'TechCorp',
    category: 'Technology',
    type: 'Internship',
    deadline: '2023-12-31',
    description: 'Join our team as a Frontend Developer Intern and work on exciting projects using React, TypeScript, and modern web technologies. This is a 3-month paid internship with possibility of extension.',
    requirements: [
      'Knowledge of HTML, CSS, and JavaScript',
      'Familiarity with React or similar frameworks',
      'Currently pursuing a degree in Computer Science or related field'
    ],
    location: 'Remote',
    salary: '$20/hour'
  },
  {
    id: '2',
    title: 'UI/UX Design Fellowship',
    organization: 'CreativeStudios',
    category: 'Design',
    type: 'Fellowship',
    deadline: '2023-11-15', 
    description: 'A 6-month fellowship program for aspiring UI/UX designers. Work alongside our creative team to design user interfaces for web and mobile applications. Gain valuable industry experience and build your portfolio.',
    requirements: [
      'Basic understanding of design principles',
      'Familiarity with Figma or Adobe XD',
      'Strong visual communication skills'
    ],
    location: 'New York, NY',
    salary: '$2500/month'
  },
  {
    id: '3',
    title: 'Research Grant in AI',
    organization: 'Global Science Foundation',
    category: 'Research',
    type: 'Grant',
    deadline: '2024-01-15',
    description: 'Apply for a research grant to conduct innovative research in artificial intelligence and machine learning. The grant covers research expenses and stipends for a period of 12 months.',
    requirements: [
      'PhD in Computer Science, Mathematics, or related field',
      'Published research in AI/ML',
      'Clear research proposal'
    ],
    location: 'Various',
    salary: '$45,000 total'
  },
  {
    id: '4',
    title: 'Marketing Coordinator Scholarship',
    organization: 'BrandBoost Agency',
    category: 'Marketing',
    type: 'Scholarship',
    deadline: '2023-10-30',
    description: 'Full scholarship for marketing students interested in digital marketing. Includes mentorship and part-time work opportunities in our agency while completing your degree.',
    requirements: [
      'Currently enrolled in a Marketing or Business program',
      'Strong written and verbal communication skills',
      'Passion for digital marketing'
    ],
    location: 'Chicago, IL',
    salary: 'Full tuition + $1000/month stipend'
  }
];

const Opportunities = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
            <p className="text-muted-foreground">
              Discover and apply for internships, jobs, scholarships, and more
            </p>
          </div>
          <Button>Filter Opportunities</Button>
        </div>
        
        <div className="grid gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard 
              key={opportunity.id}
              id={opportunity.id}
              title={opportunity.title}
              organization={opportunity.organization}
              category={opportunity.category}
              deadline={opportunity.deadline}
              description={opportunity.description}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Opportunities;
