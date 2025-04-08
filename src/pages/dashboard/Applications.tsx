
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ApplicationCard from '@/components/cards/ApplicationCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApplications } from '@/hooks/useApplications';
import { Skeleton } from '@/components/ui/skeleton';

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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="border rounded-md p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
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
