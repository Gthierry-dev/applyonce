
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const ApplicationStatus = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Application Status</h1>
        <p className="text-muted-foreground">
          Check the status of your submitted applications.
        </p>
        
        <div className="bg-card text-card-foreground rounded-lg border shadow p-6">
          <p className="text-center py-8 text-muted-foreground">
            You haven't submitted any applications yet.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationStatus;
