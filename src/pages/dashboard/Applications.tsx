
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Applications = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          Manage and track all your applications in one place.
        </p>
        
        <div className="bg-card text-card-foreground rounded-lg border shadow p-6">
          <p className="text-center py-8 text-muted-foreground">
            You don't have any applications yet. Start by exploring opportunities.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
