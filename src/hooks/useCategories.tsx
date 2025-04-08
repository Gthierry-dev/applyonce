
import { useQuery } from '@tanstack/react-query';
import { supabase, Category } from '@/integrations/supabase/client';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title');
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });
};

export default useCategories;
