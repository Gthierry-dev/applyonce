import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookmarkIcon, CheckCircle, Loader2, Clock, AlertCircle, XCircle, Plus, Search, Filter, Calendar, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';

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
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

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
        .order('created_at', { ascending: false });

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
        .order('created_at', { ascending: false });

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

  <WelcomeBanner />
  // Filter applications based on selected filters
  const filteredApplications = applications?.filter(app => {
    // Status filter
    if (statusFilter !== 'all' && app.status !== statusFilter) {
      return false;
    }
    
    // Date filter
    if (dateFilter) {
      const appDate = new Date(app.created_at);
      const filterDate = new Date(dateFilter);
      if (appDate.toDateString() !== filterDate.toDateString()) {
        return false;
      }
    }
    
    return true;
  });

  // Get unique categories from opportunities
  const categories = opportunities ? [...new Set(opportunities.map(opp => opp.category.name))] : [];

  // Filter opportunities based on selected category
  const filteredOpportunities = opportunities?.filter(opp => {
    if (categoryFilter !== 'all' && opp.category.name !== categoryFilter) {
      return false;
    }
    return true;
  });

  // Calculate statistics
  const activeApplications = filteredApplications?.filter(app => app.status === 'pending').length || 0;
  const completedApplications = filteredApplications?.filter(app => ['accepted', 'rejected', 'withdrawn'].includes(app.status)).length || 0;
  const savedOpportunities = 0; // This would be dynamic if you had a saved/bookmarked feature

  return (
    <DashboardLayout>
      <DashboardHeader title="Dashboard" />
      
      <div className="space-y-6">
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setStatusFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <DatePicker 
              onSelect={setDateFilter} 
              defaultDate={dateFilter}
            >
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                {dateFilter ? format(dateFilter, 'PPP') : 'Filter by date'}
              </Button>
            </DatePicker>
            
            {(statusFilter !== 'all' || categoryFilter !== 'all' || dateFilter) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setStatusFilter('all');
                  setCategoryFilter('all');
                  setDateFilter(undefined);
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredApplications?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">All applications</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activeApplications}
              </div>
              <p className="text-xs text-muted-foreground">Applications in progress</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Applications</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedApplications}
              </div>
              <p className="text-xs text-muted-foreground">Successfully submitted</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Opportunities</CardTitle>
              <BookmarkIcon className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredOpportunities?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Opportunities available</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card text-card-foreground rounded-lg border shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {applicationsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : filteredApplications?.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No applications match your filters.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications?.slice(0, 5).map((application) => {
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recommended Opportunities</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowUpDown className="h-3 w-3" />
                Sort
              </Button>
            </CardHeader>
            <CardContent>
              {opportunitiesLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : filteredOpportunities?.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No opportunities match your filters.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOpportunities?.slice(0, 5).map((opportunity) => (
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
