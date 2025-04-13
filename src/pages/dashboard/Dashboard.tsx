import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookmarkIcon, CheckCircle, Loader2, Clock, AlertCircle, XCircle, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Application {
  id: string;
  opportunity: {
    title: string;
    organization: string;
  };
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
}

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  category: {
    name: string;
  };
  expiry_date: string;
}

const Dashboard = () => {
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data: userId } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          opportunity:opportunities(
            title,
            organization
          )
        `)
        .eq('user_id', userId.user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Application[];
    },
  });

  const { data: opportunities, isLoading: opportunitiesLoading } = useQuery({
    queryKey: ['opportunities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('opportunities')
        .select(`
          *,
          category:categories(name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Opportunity[];
    },
  });

  const statusConfig = {
    pending: {
      label: 'Under Review',
      color: 'bg-yellow-500/10 text-yellow-500',
      icon: Clock,
    },
    accepted: {
      label: 'Accepted',
      color: 'bg-green-500/10 text-green-500',
      icon: CheckCircle,
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-red-500/10 text-red-500',
      icon: XCircle,
    },
    withdrawn: {
      label: 'Withdrawn',
      color: 'bg-gray-500/10 text-gray-500',
      icon: XCircle,
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your ApplyOnce dashboard. Here you can manage all your applications and explore opportunities.
        </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/opportunities">
                <Search className="mr-2 h-4 w-4" />
                Browse Opportunities
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications?.filter(app => app.status === 'pending').length || 0}
          </div>
              <p className="text-xs text-muted-foreground">Applications in progress</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Opportunities</CardTitle>
              <BookmarkIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Opportunities bookmarked</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Applications</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications?.filter(app => ['accepted', 'rejected', 'withdrawn'].includes(app.status)).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Successfully submitted</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {applicationsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : applications?.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No recent applications to display.
                </div>
              ) : (
                <div className="space-y-4">
                  {applications?.map((application) => {
                    const StatusIcon = statusConfig[application.status].icon;
                    return (
                      <div key={application.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{application.opportunity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {application.opportunity.organization}
                          </p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={statusConfig[application.status].color}
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig[application.status].label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader>
              <CardTitle>Recommended Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {opportunitiesLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : opportunities?.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No recommended opportunities yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {opportunities?.map((opportunity) => (
                    <div key={opportunity.id} className="space-y-1">
                      <p className="font-medium">{opportunity.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {opportunity.organization}
                        </p>
                        <Badge variant="outline">
                          {opportunity.category.name}
                        </Badge>
                      </div>
                    </div>
                  ))}
          </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
