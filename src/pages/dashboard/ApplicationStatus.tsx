import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, AlertCircle, Loader2, FileText, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Application {
  id: string;
  title: string;
  organization: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  submitted_date: string;
  last_updated: string;
  notes?: string;
}

interface OpportunityWithApplication {
  id: string;
  title: string;
  organization: string;
  applications: {
    id: string;
    status: 'pending' | 'approved' | 'rejected' | 'draft';
    submitted_date: string;
    last_updated: string;
    notes?: string;
  }[];
}

const statusConfig = {
  pending: {
    label: 'Under Review',
    color: 'bg-yellow-500/10 text-yellow-500',
    icon: Clock,
  },
  approved: {
    label: 'Approved',
    color: 'bg-green-500/10 text-green-500',
    icon: CheckCircle2,
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500/10 text-red-500',
    icon: XCircle,
  },
  draft: {
    label: 'Draft',
    color: 'bg-blue-500/10 text-blue-500',
    icon: AlertCircle,
  },
};

const ApplicationStatus = () => {
  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data: userId } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('opportunities')
        .select(`
          *,
          applications!inner(
            id,
            status,
            submitted_date,
            last_updated,
            notes
          )
        `)
        .eq('applications.user_id', userId.user?.id)
        .order('applications.submitted_date', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Application interface
      return (data as OpportunityWithApplication[]).map(opp => ({
        id: opp.applications[0].id,
        title: opp.title,
        organization: opp.organization,
        status: opp.applications[0].status,
        submitted_date: opp.applications[0].submitted_date,
        last_updated: opp.applications[0].last_updated,
        notes: opp.applications[0].notes
      }));
    },
  });

  const getStatusCount = (status: string) => {
    return applications?.filter(app => app.status === status).length || 0;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Application Status" />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Application Status</h1>
            <p className="text-muted-foreground">
              Track and manage the status of your applications.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications?.length || 0}</div>
              <p className="text-xs text-muted-foreground">All time applications</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('pending')}</div>
              <p className="text-xs text-muted-foreground">Active applications</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('approved')}</div>
              <p className="text-xs text-muted-foreground">Successful applications</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('rejected')}</div>
              <p className="text-xs text-muted-foreground">Unsuccessful applications</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card text-card-foreground rounded-lg border shadow">
          <CardHeader>
            <CardTitle>Application Status Details</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : applications?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No applications found</p>
                <p className="text-sm text-muted-foreground">
                  You haven't submitted any applications yet.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications?.map((app) => {
                    const StatusIcon = statusConfig[app.status].icon;
                    return (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{app.title}</div>
                            <div className="text-sm text-muted-foreground">{app.organization}</div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(app.submitted_date)}</TableCell>
                        <TableCell>{formatDate(app.last_updated)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={statusConfig[app.status].color}
                          >
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig[app.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[250px]">
                          {app.notes || '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationStatus;
