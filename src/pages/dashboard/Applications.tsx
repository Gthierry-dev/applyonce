
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ApplicationCard from '@/components/cards/ApplicationCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Applications = () => {
  // Dummy application data
  const applications = [
    {
      id: "app1",
      title: "Software Engineering Internship",
      organization: "TechCorp",
      category: "Internship",
      submittedDate: "2023-10-15",
      status: "pending" as const,
      logo: "https://images.unsplash.com/photo-1534137667199-675a46e143f3?q=80&w=80&auto=format&fit=crop",
    },
    {
      id: "app2",
      title: "Research Grant Application",
      organization: "Science Foundation",
      category: "Grant",
      submittedDate: "2023-09-20",
      status: "approved" as const,
    },
    {
      id: "app3",
      title: "Graduate Scholarship",
      organization: "University of Technology",
      category: "Scholarship",
      submittedDate: "2023-11-05",
      status: "rejected" as const,
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=80&auto=format&fit=crop",
    },
    {
      id: "app4",
      title: "Product Design Fellowship",
      organization: "Design Institute",
      category: "Fellowship",
      submittedDate: "2023-12-01",
      status: "draft" as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground">
              Manage and track all your applications in one place.
            </p>
          </div>
          <Button asChild>
            <Link to="/opportunities">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Application
            </Link>
          </Button>
        </div>
        
        {applications.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                {...application}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card text-card-foreground rounded-lg border shadow p-6">
            <p className="text-center py-8 text-muted-foreground">
              You don't have any applications yet. Start by exploring opportunities.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Applications;
