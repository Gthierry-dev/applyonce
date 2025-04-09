
import { useState, useEffect } from 'react';
import { supabase, Category } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCategories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [enabledCategories, setEnabledCategories] = useState<Record<string, boolean>>({});
  const [configuredCategories, setConfiguredCategories] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('title');

        if (error) {
          throw error;
        }

        setData(data || []);
        
        // Initialize enabled categories
        const initialEnabledCategories: Record<string, boolean> = {};
        data?.forEach(category => {
          initialEnabledCategories[category.title] = true;
        });
        
        setEnabledCategories(initialEnabledCategories);
        
        // Simulate configured categories (this would come from user preferences in a real app)
        const initialConfiguredCategories: Record<string, boolean> = {};
        data?.forEach(category => {
          initialConfiguredCategories[category.title] = Math.random() > 0.5;
        });
        
        setConfiguredCategories(initialConfiguredCategories);
      } catch (err) {
        setError(err as Error);
        toast({
          variant: "destructive",
          title: "Error fetching categories",
          description: (err as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  // Handle category toggle
  const handleToggle = (category: string, enabled: boolean) => {
    setEnabledCategories(prev => ({
      ...prev,
      [category]: enabled
    }));
    
    toast({
      title: enabled ? "Category enabled" : "Category disabled",
      description: `${category} has been ${enabled ? 'enabled' : 'disabled'}.`
    });
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
