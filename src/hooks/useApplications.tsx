
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Application {
  id: string;
  user_id: string;
  opportunity_id: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  submitted_date: string;
  notes?: string;
  // Joined fields from opportunities
  title?: string;
  organization?: string;
  category?: string;
  logo?: string;
}

export const useApplications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch user's applications
  const applicationsQuery = useQuery({
    queryKey: ['applications', user?.id],
    queryFn: async (): Promise<Application[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          opportunities(title, organization, category)
        `)
        .eq('user_id', user.id)
        .order('submitted_date', { ascending: false });
        
      if (error) {
        throw new Error(error.message);
      }
      
      // Format the data to flatten the structure
      return data.map(app => ({
        ...app,
        title: app.opportunities?.title,
        organization: app.opportunities?.organization,
        category: app.opportunities?.category,
        logo: null // Placeholder for future logo implementation
      })) || [];
    },
    enabled: !!user
  });

  // Submit a new application
  const submitApplicationMutation = useMutation({
    mutationFn: async (opportunityId: string) => {
      if (!user) throw new Error("User must be logged in to apply");
      
      const applicationData = {
        user_id: user.id,
        opportunity_id: opportunityId,
        status: 'pending',
        submitted_date: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('applications')
        .insert(applicationData)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
      
      // Refresh applications list
      queryClient.invalidateQueries({ queryKey: ['applications', user?.id] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to submit application: ${error.message}`,
      });
    }
  });

  // Withdraw an application
  const withdrawApplicationMutation = useMutation({
    mutationFn: async (applicationId: string) => {
      if (!user) throw new Error("User must be logged in to withdraw an application");
      
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId)
        .eq('user_id', user.id); // Safety check to ensure users can only delete their own applications
        
      if (error) throw error;
      return applicationId;
    },
    onSuccess: (applicationId) => {
      toast({
        title: "Application Withdrawn",
        description: "Your application has been withdrawn.",
      });
      
      // Refresh applications list
      queryClient.invalidateQueries({ queryKey: ['applications', user?.id] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to withdraw application: ${error.message}`,
      });
    }
  });

  // Check if a user has already applied to an opportunity
  const checkApplicationStatus = async (opportunityId: string): Promise<string | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('status')
        .eq('opportunity_id', opportunityId)
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "row not found" error
        console.error("Error checking application status:", error);
        return null;
      }
      
      return data?.status || null;
    } catch (error) {
      console.error("Error in checkApplicationStatus:", error);
      return null;
    }
  };

  return {
    applications: applicationsQuery.data || [],
    isLoading: applicationsQuery.isLoading,
    error: applicationsQuery.error,
    submitApplication: submitApplicationMutation.mutate,
    withdrawApplication: withdrawApplicationMutation.mutate,
    checkApplicationStatus,
    isSubmitting: submitApplicationMutation.isPending,
    isWithdrawing: withdrawApplicationMutation.isPending
  };
};

export default useApplications;
