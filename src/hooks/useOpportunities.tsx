import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Opportunity } from '@/types/opportunity';

export const useOpportunities = (options?: {
  limit?: number;
  categoryId?: string;
  searchQuery?: string;
  userId?: string;
}) => {
  const queryClient = useQueryClient();

  const { data: opportunities = [], isLoading, error } = useQuery({
    queryKey: ['opportunities', options],
    queryFn: async () => {
      let query = supabase
        .from('opportunities')
        .select(`
          *,
          category:categories(id, name),
          applications:applications(count)
        `)
        .order('created_at', { ascending: false });

      if (options?.categoryId) {
        query = query.eq('category_id', options.categoryId);
      }

      if (options?.searchQuery) {
        query = query.or(`title.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%`);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Opportunity[];
    },
  });

  const createOpportunity = useMutation({
    mutationFn: async (newOpportunity: Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('opportunities')
        .insert([newOpportunity])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Opportunity created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create opportunity: ' + error.message);
    },
  });

  const updateOpportunity = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Opportunity> & { id: string }) => {
      const { data, error } = await supabase
        .from('opportunities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Opportunity updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update opportunity: ' + error.message);
    },
  });

  const deleteOpportunity = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Opportunity deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete opportunity: ' + error.message);
    },
  });

  const applyToOpportunity = useMutation({
    mutationFn: async (opportunityId: string) => {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error('You must be logged in to apply');
      }

      const { data, error } = await supabase
        .from('applications')
        .insert([{
          user_id: session.session.user.id,
          opportunity_id: opportunityId,
          status: 'pending',
          submitted_date: new Date().toISOString(),
          last_updated: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Application submitted successfully');
    },
    onError: (error) => {
      toast.error('Failed to submit application: ' + error.message);
    },
  });

  return {
    opportunities,
    isLoading,
    error,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    applyToOpportunity,
  };
}; 