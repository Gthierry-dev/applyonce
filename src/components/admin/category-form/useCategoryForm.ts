
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Category } from './CategoryFormTypes';

export const useCategoryForm = (
  isEditing: boolean,
  initialData: Category | undefined,
  onCategoryAdded?: (category: Category) => void,
  onCategoryUpdated?: (category: Category) => void,
  onClose?: () => void
) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>(
    isEditing && initialData
      ? {
          title: initialData.title,
          description: initialData.description || '',
          icon_name: initialData.icon_name,
          color: initialData.color,
          count: initialData.count || 0,
        }
      : {}
  );

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    
    try {
      const categoryData = {
        title: formData.title,
        description: formData.description,
        icon_name: formData.icon_name,
        color: formData.color,
        count: formData.count || 0,
        updated_at: new Date().toISOString()
      };
      
      let result;
      
      if (isEditing && initialData) {
        // Update existing category
        const { data, error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', initialData.id)
          .select('*')
          .single();
        
        if (error) {
          throw error;
        }
        
        result = data;
        
        toast({
          title: "Category Updated",
          description: "The category has been successfully updated",
        });
        
        // Call the callback with the updated category
        if (onCategoryUpdated && result) {
          onCategoryUpdated(result);
        }
      } else {
        // Create new category
        const { data, error } = await supabase
          .from('categories')
          .insert(categoryData)
          .select('*')
          .single();
        
        if (error) {
          throw error;
        }
        
        result = data;
        
        toast({
          title: "Category Added",
          description: "The category has been successfully created",
        });
        
        // Call the callback with the new category
        if (onCategoryAdded && result) {
          onCategoryAdded(result);
        }
      }
      
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} category: ${error.message || 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formValues,
    handleSubmit
  };
};
