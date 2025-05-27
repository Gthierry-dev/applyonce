import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Calendar, Building2, CheckCircle2, XCircle, Clock, Loader2, FileText, BookmarkIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Application {
  id: string;
  opportunity: {
    title: string;
    company_name: string;
    category: {
      name: string;
    };
  };
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}

const statusConfig = {
  pending: {
    label: 'Under Review',
    color: 'bg-yellow-500/10 text-yellow-500',
    icon: Clock,
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-green-500/10 text-green-500',
    icon: CheckCircle2,
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

const Applications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data: userId } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          opportunity:opportunities(
            title,
            company_name,
            category:categories(name)
          )
        `)
        .eq('user_id', userId.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Application[];
    },
  });

  const filteredApplications = applications?.filter(application => {
    const matchesSearch = searchQuery === '' || 
      application.opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.opportunity.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    return applications?.filter(app => app.status === status).length || 0;
  };

      return (
    <DashboardLayout>
      <DashboardHeader title="Applications" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground">
              Track and manage all your job applications in one place.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/opportunities">
                <FileText className="mr-2 h-4 w-4" />
                Browse Opportunities
              </Link>
              </Button>
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
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('accepted')}</div>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>All Applications</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="pending">Under Review</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : filteredApplications?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No applications found</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || statusFilter
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start by browsing and applying to opportunities'}
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/opportunities">Browse Opportunities</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications?.map((application) => {
                  const StatusIcon = statusConfig[application.status].icon;
                  return (
                    <Card key={application.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                            <CardTitle className="text-lg">{application.opportunity.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {application.opportunity.company_name}
                </CardDescription>
              </div>
              <Badge 
                variant="secondary" 
                className={statusConfig[application.status].color}
              >
                <StatusIcon className="mr-1 h-3 w-3" />
                {statusConfig[application.status].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Applied on {new Date(application.created_at).toLocaleDateString()}
              </div>
              {application.opportunity.category && (
                <Badge variant="outline">
                  {application.opportunity.category.name}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      );
                })}
        </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
