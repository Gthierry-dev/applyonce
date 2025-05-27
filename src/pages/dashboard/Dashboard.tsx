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
      
      <header className="flex items-center justify-between  pb-2 mb-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-main_color focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className="flex items-center justify-center h-5 w-8 text-xs text-gray-400 bg-gray-100 rounded">
                ⌘ K
              </div>
            </div>
          </div>
          <button className="relative p-2 border rounded-lg text-gray-400 hover:text-gray-500">
            <span className="sr-only">Notifications</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src="https://ui-avatars.com/api/?name=User&background=random" 
              alt="User avatar" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>


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
