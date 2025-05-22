
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, FileText, Folder, Loader2, Plus } from 'lucide-react';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-main_color" />
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-main_color">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to the ApplyOnce admin panel. Manage opportunities, categories, and users.
            </p>
          </div>
          <div>
            <Button className="bg-main_color hover:bg-main_color_dark text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Opportunity
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card text-card-foreground rounded-lg border shadow hover:border-main_color/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-main_color" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-main_color">{stats?.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+21 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground rounded-lg border shadow hover:border-main_color/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-main_color" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-main_color">{stats?.totalApplications}</div>
              <p className="text-xs text-muted-foreground">+43 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground rounded-lg border shadow hover:border-main_color/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Folder className="h-4 w-4 text-main_color" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-main_color">{stats?.totalCategories}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground rounded-lg border shadow hover:border-main_color/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
              <BarChart className="h-4 w-4 text-main_color" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-main_color">{stats?.totalOpportunities}</div>
              <p className="text-xs text-muted-foreground">+7 from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader>
              <CardTitle className="text-main_color">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivities.length === 0 ? (
                  <div className="text-center p-6 text-muted-foreground border border-dashed rounded-lg">
                    No recent activities to display.
                  </div>
                ) : (
                  stats?.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="w-2 h-2 rounded-full bg-main_color"></div>
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader>
              <CardTitle className="text-main_color">Popular Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.popularOpportunities.length === 0 ? (
                  <div className="text-center p-6 text-muted-foreground border border-dashed rounded-lg">
                    No popular opportunities yet.
                  </div>
                ) : (
                  stats?.popularOpportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <p className="text-sm font-medium">{opportunity.title}</p>
                      <span className="text-xs font-medium bg-main_color/10 text-main_color px-2 py-1 rounded">
                        {opportunity.applicationCount} applications
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
