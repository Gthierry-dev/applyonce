import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, Trash, GripVertical } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { CategoryField, FieldType } from '@/types/category';

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Select' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
  { value: 'file', label: 'File Upload' },
  { value: 'url', label: 'URL' },
];

const fieldSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  type: z.enum(['text', 'textarea', 'number', 'select', 'checkbox', 'date', 'file', 'url'] as const),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
});

type FieldFormData = z.infer<typeof fieldSchema>;

interface CategoryFieldConfigProps {
  categoryId: string;
}

export function CategoryFieldConfig({ categoryId }: CategoryFieldConfigProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldFormData>({
    resolver: zodResolver(fieldSchema),
  });

  const { data: fields = [], isLoading } = useQuery<CategoryField[]>({
    queryKey: ['categoryFields', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('order');
      
      if (error) throw error;
      return data;
    },
  });

  const addFieldMutation = useMutation({
    mutationFn: async (newField: Omit<CategoryField, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('category_fields')
        .insert([newField])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryFields', categoryId] });
      toast.success('Field added successfully');
      reset();
    },
    onError: (error) => {
      toast.error('Failed to add field: ' + error.message);
    },
  });

  const deleteFieldMutation = useMutation({
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
      toast.error('Failed to delete field: ' + error.message);
    },
  });

  const reorderFieldsMutation = useMutation({
    mutationFn: async (updates: { id: string; order: number }[]) => {
      const { error } = await supabase
        .from('category_fields')
        .upsert(updates);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryFields', categoryId] });
    },
    onError: (error) => {
      toast.error('Failed to reorder fields: ' + error.message);
    },
  });

  const onSubmit = (data: FieldFormData) => {
    const newField = {
      category_id: categoryId,
      label: data.label,
      type: data.type,
      required: data.required,
      placeholder: data.placeholder,
      options: data.options,
      order: fields.length,
    };
    addFieldMutation.mutate(newField);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updates = items.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    reorderFieldsMutation.mutate(updates);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Fields</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="label">Field Label</Label>
              <Input
                id="label"
                {...register('label')}
                placeholder="Enter field label"
              />
              {errors.label && (
                <p className="text-sm text-red-500">{errors.label.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="type">Field Type</Label>
              <Select
                onValueChange={(value) => register('type').onChange({ target: { value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="required"
              {...register('required')}
            />
            <Label htmlFor="required">Required field</Label>
          </div>

          <Button type="submit">Add Field</Button>
        </form>

        <div className="mt-6">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{field.label}</h4>
                            <p className="text-sm text-gray-500">{field.type}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFieldMutation.mutate(field.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </CardContent>
    </Card>
  );
}
