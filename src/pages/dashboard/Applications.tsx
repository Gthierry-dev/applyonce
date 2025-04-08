
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ApplicationCard from '@/components/cards/ApplicationCard';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApplications } from '@/hooks/useApplications';

const Applications = () => {
  const { applications, isLoading } = useApplications();

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
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
