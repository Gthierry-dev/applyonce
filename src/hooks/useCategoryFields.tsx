
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CategoryField, FieldType } from '@/types/supabase';
import { toast } from 'sonner';

export interface CategoryFieldForm {
  id?: string;
  category_id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  placeholder?: string;
  display_order: number;
}

export const useCategoryFields = (categoryId?: string) => {
  const queryClient = useQueryClient();

  const { data: fields = [], isLoading, error } = useQuery({
    queryKey: ['categoryFields', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      
      console.log('Fetching fields for category:', categoryId);
      
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching category fields:', error);
        throw error;
      }
      
      console.log('Fetched fields:', data);
      return data as CategoryField[];
    },
    enabled: !!categoryId
  });

  const createField = useMutation({
    mutationFn: async (field: CategoryFieldForm) => {
      // Remove display_order from the field data as it doesn't exist in the database
      const { display_order, ...fieldWithoutOrder } = field;
      
      const { data, error } = await supabase
        .from('category_fields')
        .insert([fieldWithoutOrder])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryFields', categoryId] });
      toast.success('Field created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create field: ${error.message}`);
    }
  });

  const updateField = useMutation({
    mutationFn: async (field: CategoryFieldForm) => {
      const { id, display_order, ...updateData } = field;
      
      if (!id) throw new Error('Field ID is required for updates');

      const { data, error } = await supabase
        .from('category_fields')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryFields', categoryId] });
      toast.success('Field updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update field: ${error.message}`);
    }
  });

  const deleteField = useMutation({
    mutationFn: async (fieldId: string) => {
      const { error } = await supabase
        .from('category_fields')
        .delete()
        .eq('id', fieldId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryFields', categoryId] });
      toast.success('Field deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete field: ${error.message}`);
    }
  });

  const reorderFields = useMutation({
    mutationFn: async (fields: CategoryField[]) => {
      // Since there's no display_order column, we can't update it.
      // For now, we'll just refresh the data without actually reordering
      // In a real application, you might want to add the column to the database
      
      console.log('Reordering fields (note: actual DB reordering not implemented)');
      return fields;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryFields', categoryId] });
      toast.success('Fields list refreshed');
    },
    onError: (error) => {
      toast.error(`Failed to reorder fields: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  return {
    fields,
    isLoading,
    error,
    createField,
    updateField,
    deleteField,
    reorderFields
  };
};

export default useCategoryFields;
