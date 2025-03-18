
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Categories = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Browse different categories of opportunities.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card text-card-foreground rounded-lg border shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Scholarships</h3>
            <p className="text-muted-foreground">Educational funding opportunities</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg border shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Grants</h3>
            <p className="text-muted-foreground">Research and project funding</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg border shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Internships</h3>
            <p className="text-muted-foreground">Professional development opportunities</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
