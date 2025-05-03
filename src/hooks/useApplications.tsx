
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
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        return [];
      }
      
      const { data: applications, error: appError } = await supabase
        .from('applications')
        .select(`
          id,
          user_id,
          opportunity_id,
          status,
          submitted_date,
          last_updated,
          notes,
          opportunity:opportunities(
            title,
            organization,
            category
          )
        `)
        .eq('user_id', session.session.user.id);

      if (appError) throw appError;

      if (!applications) return [];

      // Transform the data to match our ApplicationWithDetails interface
      return applications.map(app => ({
        id: app.id,
        user_id: app.user_id,
        opportunity_id: app.opportunity_id,
        title: app.opportunity?.title || 'Unknown Opportunity',
        organization: app.opportunity?.organization || 'Unknown Organization',
        category: app.opportunity?.category || 'Other',
        status: app.status as ApplicationStatus,
        submitted_date: app.submitted_date,
        last_updated: app.last_updated,
        notes: app.notes,
        responses: app.responses
      }));
    },
  });

  const createApplication = useMutation({
    mutationFn: async (data: { opportunity_id: string; responses?: Record<string, any> }) => {
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
          responses: data.responses || {},
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
