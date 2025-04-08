
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Application } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'draft';

export interface ApplicationWithDetails extends Application {
  title: string;
  organization: string;
  category: string;
  logo?: string;
}

export const useApplications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['applications'],
    queryFn: async (): Promise<ApplicationWithDetails[]> => {
      // First, get the user's applications
      const { data: applications, error: appError } = await supabase
        .from('applications')
        .select('*, opportunities(title, organization, category)');

      if (appError) throw appError;

      if (!applications) return [];

      // Transform the data to match our Application interface
      return applications.map(app => ({
        id: app.id,
        user_id: app.user_id,
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
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error("You must be logged in to apply");
      }

      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: sessionData.session.user.id,
          opportunity_id: data.opportunity_id,
          status: 'pending',
          submitted_date: new Date().toISOString(),
          last_updated: new Date().toISOString()
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
