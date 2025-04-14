import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'];

export const useCategories = () => {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });

  return {
    categories,
    isLoading,
    error,
  };
};

export default useCategories;
