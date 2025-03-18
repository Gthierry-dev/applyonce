
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your ApplyOnce dashboard. Here you can manage all your applications and explore opportunities.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card text-card-foreground rounded-lg border shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Active Applications</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg border shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Saved Opportunities</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg border shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Completed Applications</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
