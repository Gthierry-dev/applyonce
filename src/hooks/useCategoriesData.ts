
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CategoryData } from '@/data/categories';

export interface CategoryState {
  enabled: Record<string, boolean>;
  configured: Record<string, boolean>;
}

export const useCategoriesData = (categories: CategoryData[]) => {
  const { toast } = useToast();
  
  // Initialize default states based on category data
  const createInitialState = (): Record<string, boolean> => {
    const initialState: Record<string, boolean> = {};
    categories.forEach((category, index) => {
      // Set first two categories as initially enabled as an example
      initialState[category.title] = index < 2;
    });
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
    enabledCategories,
    configuredCategories,
    handleToggle,
    setConfiguredCategories
  };
};

export default useCategoriesData;
