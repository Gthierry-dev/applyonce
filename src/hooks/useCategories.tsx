
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { supabase, Category } from '@/integrations/supabase/client';

export const useCategories = () => {
  const { toast } = useToast();
  const [enabledCategories, setEnabledCategories] = useState<Record<string, boolean>>({});
  const [configuredCategories, setConfiguredCategories] = useState<Record<string, boolean>>({});

  // Query to fetch categories from the database
  const categoriesQuery = useQuery({
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

  // Initialize states when data is loaded
  useEffect(() => {
    if (categoriesQuery.data && categoriesQuery.data.length > 0) {
      const enabled: Record<string, boolean> = {};
      const configured: Record<string, boolean> = {};
      
      categoriesQuery.data.forEach((category, index) => {
        // Set first two categories as initially enabled as an example
        enabled[category.title] = index < 2;
        configured[category.title] = false;
      });
      
      setEnabledCategories(enabled);
      setConfiguredCategories(configured);
    }
  }, [categoriesQuery.data]);

  // Handle toggle change
  const handleToggle = (category: string, enabled: boolean) => {
    setEnabledCategories(prev => ({
      ...prev,
      [category]: enabled
    }));
    
    toast({
      title: enabled ? "Category enabled" : "Category disabled",
      description: `${category} has been ${enabled ? 'added to' : 'removed from'} your feed.`,
    });
    
    // If not configured and enabling, we should prompt user to configure
    if (enabled && !configuredCategories[category]) {
      toast({
        title: "Configuration needed",
        description: `Click on the ${category} card to configure your profile for this category.`,
      });
    }
  };

  return {
    data: categoriesQuery.data,
    isLoading: categoriesQuery.isLoading,
    error: categoriesQuery.error,
    enabledCategories,
    configuredCategories,
    handleToggle,
    setConfiguredCategories
  };
};

export default useCategories;
