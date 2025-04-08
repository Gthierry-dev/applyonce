
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'draft';

export interface Application {
  id: string;
  opportunity_id: string;
  title: string;
  organization: string;
  category: string;
  submitted_date: string;
  status: ApplicationStatus;
  logo?: string;
  last_updated: string;
  notes?: string;
}

export const useApplications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['applications'],
    queryFn: async (): Promise<Application[]> => {
      // First, get the user's applications
      const { data: applications, error: appError } = await supabase
        .from('applications')
        .select('*, opportunities(title, organization, category)');

      if (appError) throw appError;

      if (!applications) return [];

      // Transform the data to match our Application interface
      return applications.map(app => ({
        id: app.id,
        opportunity_id: app.opportunity_id,
        title: app.opportunities?.title || 'Unknown Opportunity',
        organization: app.opportunities?.organization || 'Unknown Organization',
        category: app.opportunities?.category || 'Other',
        submitted_date: app.submitted_date,
        status: app.status as ApplicationStatus,
        last_updated: app.last_updated,
        notes: app.notes
      }));
    },
    enabled: !!supabase.auth.getSession
  });

  const createApplication = useMutation({
    mutationFn: async (data: { opportunity_id: string }) => {
      const { error } = await supabase
        .from('applications')
        .insert({
          opportunity_id: data.opportunity_id,
          status: 'pending'
        });

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to submit application: ${error.message}`,
      });
    }
  });

  return {
    applications: data || [],
    isLoading,
    error,
    createApplication
  };
};

export default useApplications;
