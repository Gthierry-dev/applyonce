
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface Application {
  id: string;
  opportunity_id: string;
  title: string;
  organization: string;
  category: string;
  submitted_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  logo?: string;
  user_id?: string;
  notes?: string;
  last_updated?: string;
}

// This hook will be used for real database interactions when we implement auth
// For now it uses mock data
export const useApplications = () => {
  const { toast } = useToast();

  const applicationsQuery = useQuery({
    queryKey: ['applications'],
    queryFn: async (): Promise<Application[]> => {
      // In a real implementation with auth, we would do:
      // const user = supabase.auth.getUser();
      // if (!user) throw new Error("User not authenticated");
      
      // Mock implementation for now
      return new Promise((resolve) => {
        setTimeout(() => {
          const dummyApplications = [
            {
              id: "app1",
              opportunity_id: "opp1",
              title: "Software Engineering Internship",
              organization: "TechCorp",
              category: "Internship",
              submitted_date: "2023-10-15",
              status: "pending" as const,
              logo: "https://images.unsplash.com/photo-1534137667199-675a46e143f3?q=80&w=80&auto=format&fit=crop",
              last_updated: "2023-10-15",
              notes: "Your application is being reviewed by the hiring team."
            },
            {
              id: "app2",
              opportunity_id: "opp2",
              title: "Research Grant Application",
              organization: "Science Foundation",
              category: "Grant",
              submitted_date: "2023-09-20",
              status: "approved" as const,
              last_updated: "2023-09-28",
              notes: "Congratulations! Your grant application has been approved."
            },
            {
              id: "app3",
              opportunity_id: "opp3",
              title: "Graduate Scholarship",
              organization: "University of Technology",
              category: "Scholarship",
              submitted_date: "2023-11-05",
              status: "rejected" as const,
              logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=80&auto=format&fit=crop",
              last_updated: "2023-11-15",
              notes: "We regret to inform you that your application has not been selected."
            },
            {
              id: "app4",
              opportunity_id: "opp4",
              title: "Product Design Fellowship",
              organization: "Design Institute",
              category: "Fellowship",
              submitted_date: "2023-12-01",
              status: "draft" as const,
              last_updated: "2023-12-01"
            },
          ];
          resolve(dummyApplications);
        }, 800);
      });
    }
  });

  const submitApplication = async (opportunityId: string, notes?: string) => {
    try {
      // In a real implementation with auth, we would fetch the opportunity details
      // and create an application linked to the user and opportunity
      
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully",
      });
      
      // Return true for success (in real implementation, we'd return the created application)
      return true;
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
      return false;
    }
  };

  return {
    applications: applicationsQuery.data || [],
    isLoading: applicationsQuery.isLoading,
    error: applicationsQuery.error,
    submitApplication,
  };
};

export default useApplications;
