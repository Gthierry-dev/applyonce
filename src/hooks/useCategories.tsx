
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { supabase, Category } from '@/integrations/supabase/client';

export interface CategoryState {
  enabled: Record<string, boolean>;
  configured: Record<string, boolean>;
}

export const useCategories = () => {
  const { toast } = useToast();
  
  // Fetch categories from Supabase
  const { data, isLoading, error } = useQuery({
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

  // Initialize default states based on category data
  const createInitialState = (): Record<string, boolean> => {
    const initialState: Record<string, boolean> = {};
    if (data) {
      data.forEach((category, index) => {
        // Set first two categories as initially enabled as an example
        initialState[category.title] = index < 2;
      });
    }
    return initialState;
  };

  // State to track enabled categories
  const [enabledCategories, setEnabledCategories] = useState<Record<string, boolean>>(createInitialState());
  
  // State to track configured categories
  const [configuredCategories, setConfiguredCategories] = useState<Record<string, boolean>>(createInitialState());

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
    data,
    isLoading, 
    error,
    enabledCategories,
    configuredCategories,
    handleToggle,
    setConfiguredCategories
  };
};

export default useCategories;
