import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Calendar, Building2, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
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

  const renderApplications = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-8 w-[100px]" />
          </CardFooter>
        </Card>
      ));
    }

    if (!filteredApplications?.length) {
      return (
        <div className="text-center py-12 border rounded-lg bg-background">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">No applications found</h3>
            <p className="text-muted-foreground max-w-[500px] mx-auto">
              {searchQuery || statusFilter
                ? "We couldn't find any applications matching your filters. Try adjusting your search criteria."
                : "You haven't submitted any applications yet. Browse opportunities to get started!"}
            </p>
            {(searchQuery || statusFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
      );
    }

    return filteredApplications.map((application) => {
      const StatusIcon = statusConfig[application.status].icon;
      
      return (
        <Card key={application.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle>{application.opportunity.title}</CardTitle>
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
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
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
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your submitted applications
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renderApplications()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
