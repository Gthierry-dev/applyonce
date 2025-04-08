
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ApplicationCard from '@/components/cards/ApplicationCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: string;
  opportunity_id: string;
  title: string;
  organization: string;
  category: string;
  submitted_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  logo?: string;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, this would fetch from a 'applications' table
      // For now, using dummy data
      
      // Mock implementation
      setTimeout(() => {
        const dummyApplications = [
          {
            id: "app1",
            opportunity_id: "opp1",
            title: "Software Engineering Internship",
            organization: "TechCorp",
            category: "Internship",
            submitted_date: "2023-10-15",
            status: "pending" as const,
            logo: "https://images.unsplash.com/photo-1534137667199-675a46e143f3?q=80&w=80&auto=format&fit=crop",
          },
          {
            id: "app2",
            opportunity_id: "opp2",
            title: "Research Grant Application",
            organization: "Science Foundation",
            category: "Grant",
            submitted_date: "2023-09-20",
            status: "approved" as const,
          },
          {
            id: "app3",
            opportunity_id: "opp3",
            title: "Graduate Scholarship",
            organization: "University of Technology",
            category: "Scholarship",
            submitted_date: "2023-11-05",
            status: "rejected" as const,
            logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=80&auto=format&fit=crop",
          },
          {
            id: "app4",
            opportunity_id: "opp4",
            title: "Product Design Fellowship",
            organization: "Design Institute",
            category: "Fellowship",
            submitted_date: "2023-12-01",
            status: "draft" as const,
          },
        ];
        
        setApplications(dummyApplications);
        setLoading(false);
      }, 800);
      
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load applications",
      });
      setLoading(false);
    }
  };

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
        
        {loading ? (
          <div className="flex justify-center py-8">
            <p>Loading applications...</p>
          </div>
        ) : applications.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                id={application.id}
                title={application.title}
                organization={application.organization}
                category={application.category}
                submittedDate={application.submitted_date}
                status={application.status}
                logo={application.logo}
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
