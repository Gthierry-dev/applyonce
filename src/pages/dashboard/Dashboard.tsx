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
      <WelcomeBanner />
      <div className="space-y-6">
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-10 px-2 rounded-lg">
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
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-78">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Total Applications</span>
                  <div className="text-xl font-bold text-gray-900">{filteredApplications?.length || 0}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-600 font-medium">28%</span>
              </div>
              <span className="text-gray-500">From The Last Month</span>
            </div>
          </div>
          
          {/* Active Applications Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-78">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Active Applications</span>
                  <div className="text-xl font-bold text-gray-900">{activeApplications}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-600 font-medium">28%</span>
              </div>
              <span className="text-gray-500">From The Last Month</span>
            </div>
          </div>
          
          {/* Completed Applications Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-78">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Completed Applications</span>
                  <div className="text-xl font-bold text-gray-900">{completedApplications}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-600 font-medium">28%</span>
              </div>
              <span className="text-gray-500">From The Last Month</span>
            </div>
          </div>
          
          {/* Available Opportunities Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-78">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-12">
                  <div className="border border-gray-300 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookmarkIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Available Opportunities</span>
                  <div className="text-xl font-bold text-gray-900">{filteredOpportunities?.length || 0}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center border-t border-[#b6b3b37c] px-4 py-2 bg-gray-200/30 justify-between text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-600 font-medium">28%</span>
              </div>
              <span className="text-gray-500">From The Last Month</span>
            </div>
          </div>
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
