import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CompanyLayout from '@/components/company/CompanyLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Users, FileText, Folder, ArrowUpRight } from 'lucide-react';

interface DashboardStats {
  total_applications: number;
  pending_applications: number;
  total_categories: number;
  recent_applications: Array<{
    id: string;
    user_id: string;
    opportunity_id: string;
    status: string;
    created_at: string;
    user: {
      full_name: string;
    };
    opportunity: {
      title: string;
    };
  }>;
}

export default function CompanyDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total applications
      const { data: applications, error: applicationsError } = await supabase
        .from('applications')
        .select('id, status')
        .eq('company_id', user?.id);

      if (applicationsError) throw applicationsError;

      // Fetch recent applications with user and opportunity details
      const { data: recentApplications, error: recentError } = await supabase
        .from('applications')
        .select(`
          id,
          user_id,
          opportunity_id,
          status,
          created_at,
          user:profiles(full_name),
          opportunity:opportunities(title)
        `)
        .eq('company_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      // Fetch total categories
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('id')
        .eq('company_id', user?.id);

      if (categoriesError) throw categoriesError;

      setStats({
        total_applications: applications?.length || 0,
        pending_applications: applications?.filter(app => app.status === 'pending').length || 0,
        total_categories: categories?.length || 0,
        recent_applications: recentApplications || [],
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch dashboard statistics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CompanyLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={fetchDashboardStats}>
            <Loader2 className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_applications}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.pending_applications} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_categories}</div>
              <p className="text-xs text-muted-foreground">
                Active categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.recent_applications.length}</div>
              <p className="text-xs text-muted-foreground">
                New applications this week
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recent_applications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{application.opportunity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {application.user.full_name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      application.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : application.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyLayout>
  );
} 