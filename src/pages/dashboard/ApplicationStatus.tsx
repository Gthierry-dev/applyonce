import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, AlertCircle, Loader2, FileText, CheckCircle2, Filter, Calendar, ArrowUpDown, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';

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
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  approved: {
    label: 'Approved',
    color: 'bg-green-500/10 text-green-500',
    icon: CheckCircle2,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500/10 text-red-500',
    icon: XCircle,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  draft: {
    label: 'Draft',
    color: 'bg-blue-500/10 text-blue-500',
    icon: AlertCircle,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
};

const ApplicationStatus = () => {
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  // Filter applications based on selected filters
  const filteredApplications = applications?.filter(app => {
    // Status filter
    if (statusFilter !== 'all' && app.status !== statusFilter) {
      return false;
    }

    // Date filter
    if (dateFilter) {
      const appDate = new Date(app.submitted_date);
      const filterDate = new Date(dateFilter);
      if (appDate.toDateString() !== filterDate.toDateString()) {
        return false;
      }
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        app.title.toLowerCase().includes(query) ||
        app.organization.toLowerCase().includes(query) ||
        (app.notes && app.notes.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Sort applications
  const sortedApplications = filteredApplications?.sort((a, b) => {
    const dateA = new Date(a.submitted_date).getTime();
    const dateB = new Date(b.submitted_date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
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

  // Calculate statistics
  const totalApplications = applications?.length || 0;
  const pendingApplications = getStatusCount('pending');
  const approvedApplications = getStatusCount('approved');
  const rejectedApplications = getStatusCount('rejected');
  const draftApplications = getStatusCount('draft');

  // Calculate success rate
  const successRate = totalApplications > 0 
    ? Math.round((approvedApplications / totalApplications) * 100) 
    : 0;

  return (
    <DashboardLayout>
      <DashboardHeader title="Application Status" />
      
      <div className="space-y-6">
        {/* Welcome Banner */}
        {/* <div className="relative overflow-hidden rounded-xl mb-6">
          <div 
            className="absolute inset-0 bg-cover bg-left-bottom z-0" 
            style={{ 
              backgroundImage: `url('/green-bg.jpg')`,
              filter: 'brightness(0.7)'
            }}
          />
          
          <div className="relative z-20 px-6 py-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-white mb-2">Track Your Application Journey</h2>
              <p className="text-white/80">
                Monitor the status of all your applications, track progress, and get insights on your job search performance.
              </p>
            </div>
          </div>
        </div> */}

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Tabs
              defaultValue="all"
              className="w-full sm:w-auto"
              onValueChange={setStatusFilter}
              value={statusFilter}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Under Review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search applications..."
                className="pl-8 w-[200px] h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DatePicker onSelect={setDateFilter} defaultDate={dateFilter}>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
              </Button>
            </DatePicker>

            {(statusFilter !== "all" || dateFilter || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStatusFilter("all");
                  setDateFilter(undefined);
                  setSearchQuery('');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Total Applications Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Total Applications
                  </span>
                  <div className="text-xl font-bold text-gray-900">
                    {totalApplications}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-600 font-medium">{successRate}%</span>
              </div>
              <span className="text-gray-500">Success Rate</span>
            </div>
          </div>

          {/* Under Review Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Under Review
                  </span>
                  <div className="text-xl font-bold text-gray-900">
                    {pendingApplications}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-600 font-medium">
                  {totalApplications > 0 ? Math.round((pendingApplications / totalApplications) * 100) : 0}%
                </span>
              </div>
              <span className="text-gray-500">Of Total</span>
            </div>
          </div>

          {/* Approved Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Approved
                  </span>
                  <div className="text-xl font-bold text-gray-900">
                    {approvedApplications}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-green-600 font-medium">
                  {totalApplications > 0 ? Math.round((approvedApplications / totalApplications) * 100) : 0}%
                </span>
              </div>
              <span className="text-gray-500">Success Rate</span>
            </div>
          </div>

          {/* Rejected Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Rejected
                  </span>
                  <div className="text-xl font-bold text-gray-900">
                    {rejectedApplications}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-red-600 font-medium">
                  {totalApplications > 0 ? Math.round((rejectedApplications / totalApplications) * 100) : 0}%
                </span>
              </div>
              <span className="text-gray-500">Rejection Rate</span>
            </div>
          </div>

          {/* Draft Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Draft
                  </span>
                  <div className="text-xl font-bold text-gray-900">
                    {draftApplications}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-blue-600 font-medium">
                  {totalApplications > 0 ? Math.round((draftApplications / totalApplications) * 100) : 0}%
                </span>
              </div>
              <span className="text-gray-500">Completion Pending</span>
            </div>
          </div>
        </div>

        {/* Application Details Card */}
        <Card className="bg-card text-card-foreground rounded-lg border shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Application Status Details</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <ArrowUpDown className="h-3 w-3" />
              Sort by {sortOrder === 'asc' ? 'Newest' : 'Oldest'}
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : sortedApplications?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No applications found</p>
                <p className="text-sm text-muted-foreground">
                  {statusFilter !== 'all' || dateFilter || searchQuery 
                    ? 'Try adjusting your filters to see more results.'
                    : 'You haven\'t submitted any applications yet.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
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
                    {sortedApplications?.map((app) => {
                      const StatusIcon = statusConfig[app.status].icon;
                      return (
                        <TableRow key={app.id} className="hover:bg-gray-50/50">
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
                          <TableCell className="text-sm text-muted-foreground max-w-[250px] truncate">
                            {app.notes || '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Tips */}
        {!isLoading && applications && applications.length > 0 && (
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader>
              <CardTitle>Application Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Application Tips</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                    <li>Follow up on applications that have been under review for more than 2 weeks</li>
                    <li>Update your resume and cover letter based on feedback from previous applications</li>
                    <li>Consider applying to similar positions at companies that have approved your applications</li>
                  </ul>
                </div>

                {approvedApplications > 0 && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2">Success Patterns</h3>
                    <p className="text-sm text-green-700">
                      You've had success with {approvedApplications} application{approvedApplications !== 1 ? 's' : ''}. 
                      Consider what made these applications successful and apply those strategies to future applications.
                    </p>
                  </div>
                )}

                {rejectedApplications > 0 && (
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <h3 className="font-medium text-amber-800 mb-2">Areas for Improvement</h3>
                    <p className="text-sm text-amber-700">
                      Don't be discouraged by rejections. Each one is an opportunity to learn and improve your approach.
                      Consider requesting feedback from recruiters to understand how you can strengthen future applications.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationStatus;
