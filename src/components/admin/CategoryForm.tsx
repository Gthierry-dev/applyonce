import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CategoryFormProps {
  categoryId?: string;
}

interface FormField {
  id?: string;
  category_id?: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  order: number;
  created_at?: string;
  updated_at?: string;
}

const fieldTypes = [
  'text',
  'textarea',
  'number',
  'select',
  'checkbox',
  'date',
  'file',
  'url'
] as const;

export default function CategoryForm({ categoryId }: CategoryFormProps) {
  const { toast } = useToast();
  const [fields, setFields] = useState<FormField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentField, setCurrentField] = useState<FormField>({
    label: '',
    name: '',
    type: 'text',
    placeholder: '',
    required: false,
    options: [],
    order: 0,
  });

  // Fetch existing fields when categoryId changes
  useEffect(() => {
    if (categoryId) {
      fetchFields();
    } else {
      setFields([]);
    }
  }, [categoryId]);

  const fetchFields = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('order');

      if (error) throw error;

      setFields(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch fields',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddField = async () => {
    if (!currentField.label || !currentField.type || !categoryId) return;

    try {
      setIsLoading(true);
      const newField = {
        ...currentField,
        category_id: categoryId,
        name: currentField.label.toLowerCase().replace(/\s+/g, '_'),
        order: fields.length,
      };

      const { data, error } = await supabase
        .from('category_fields')
        .insert([newField])
        .select()
        .single();

      if (error) throw error;

      setFields([...fields, data]);
      setCurrentField({
        label: '',
        name: '',
        type: 'text',
        placeholder: '',
        required: false,
        options: [],
        order: fields.length + 1,
      });

      toast({
        title: 'Success',
        description: 'Field added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add field',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteField = async (fieldId: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('category_fields')
        .delete()
        .eq('id', fieldId);

      if (error) throw error;

      setFields(fields.filter(field => field.id !== fieldId));
      toast({
        title: 'Success',
        description: 'Field deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete field',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorderFields = async (draggedId: string, targetId: string) => {
    const draggedIndex = fields.findIndex(field => field.id === draggedId);
    const targetIndex = fields.findIndex(field => field.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newFields = [...fields];
    const [draggedField] = newFields.splice(draggedIndex, 1);
    newFields.splice(targetIndex, 0, draggedField);

    // Update order property for all fields
    const updatedFields = newFields.map((field, index) => ({
      ...field,
      order: index,
    }));

    setFields(updatedFields);

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('category_fields')
        .upsert(
          updatedFields.map(({ 
            id, 
            category_id, 
            label, 
            name,
            type, 
            placeholder, 
            required,
            options,
            order 
          }) => ({
            id,
            category_id,
            label,
            name,
            type,
            placeholder,
            required,
            options,
            order,
          }))
        );

      if (error) throw error;
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to reorder fields',
        variant: 'destructive',
      });
      // Revert changes on error
      await fetchFields();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-muted/50">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={currentField.label}
              onChange={(e) => setCurrentField({
                ...currentField,
                label: e.target.value
              })}
              placeholder="Field name"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={currentField.type}
              onValueChange={(value) => setCurrentField({
                ...currentField,
                type: value
              })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                {fieldTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Example</Label>
            <Input
              value={currentField.placeholder}
              onChange={(e) => setCurrentField({
                ...currentField,
                placeholder: e.target.value
              })}
              placeholder="Placeholder text"
              disabled={isLoading}
            />
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={handleAddField}
            disabled={!currentField.label || !currentField.type || !categoryId || isLoading}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add field
          </Button>
        </CardContent>
      </Card>

      {fields.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Form Fields</h3>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <Card 
                key={field.id || index} 
                className="bg-card"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('fieldId', field.id!)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const draggedId = e.dataTransfer.getData('fieldId');
                  if (draggedId && field.id) {
                    handleReorderFields(draggedId, field.id);
                  }
                }}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      <div>
                        <p className="font-medium">{field.label}</p>
                        <p className="text-sm text-muted-foreground">
                          Type: {field.type}
                          {field.placeholder && ` • Example: ${field.placeholder}`}
                        </p>
                      </div>
                    </div>
                    {field.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteField(field.id!)}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 