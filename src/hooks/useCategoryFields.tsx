
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, CategoryField, FieldType } from '@/integrations/supabase/client';
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
      
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as CategoryField[];
    },
    enabled: !!categoryId
  });

  const createField = useMutation({
    mutationFn: async (field: CategoryFieldForm) => {
      const { data, error } = await supabase
        .from('category_fields')
        .insert([field])
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
      const { id, ...updateData } = field;
      
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
      // Create batch updates for all fields with new order
      const updates = fields.map((field, index) => ({
        id: field.id,
        display_order: index
      }));

      // Use Promise.all to execute all updates in parallel
      await Promise.all(
        updates.map(update => 
          supabase
            .from('category_fields')
            .update({ display_order: update.display_order })
            .eq('id', update.id)
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryFields', categoryId] });
      toast.success('Fields reordered successfully');
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
