import React, { useState } from 'react';
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
import { Plus, Trash2, GripVertical, Settings } from 'lucide-react';
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
import { toast } from 'sonner';
import { CategoryField, FieldType } from '@/types/category';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface CategoryFormBuilderProps {
  categoryId: string;
  categoryName: string;
}

const CategoryFormBuilder: React.FC<CategoryFormBuilderProps> = ({ categoryId, categoryName }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<FieldFormData>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      required: false,
      placeholder: '',
    }
  });

  const [showOptions, setShowOptions] = useState(false);
  const [optionsText, setOptionsText] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  
  const fieldType = watch('type');

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
      setOptions([]);
      setOptionsText('');
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
      options: data.type === 'select' ? options : undefined,
      order: fields.length,
    };
    addFieldMutation.mutate(newField);
  };

  const handleAddOption = () => {
    if (optionsText.trim()) {
      setOptions([...options, optionsText.trim()]);
      setOptionsText('');
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
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
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Builder for {categoryName}</CardTitle>
        <CardDescription>
          Configure the fields that users will need to fill out when applying for opportunities in this category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="fields">
          <TabsList className="mb-4">
            <TabsTrigger value="fields">Form Fields</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fields">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    onValueChange={(value) => {
                      register('type').onChange({ target: { value } });
                      setShowOptions(value === 'select');
                    }}
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

              <div>
                <Label htmlFor="placeholder">Placeholder (optional)</Label>
                <Input
                  id="placeholder"
                  {...register('placeholder')}
                  placeholder="Enter placeholder text"
                />
              </div>

              {showOptions && (
                <div className="space-y-2">
                  <Label>Options (one per line)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={optionsText}
                      onChange={(e) => setOptionsText(e.target.value)}
                      placeholder="Enter option"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddOption();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddOption}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {options.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {options.map((option, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span>{option}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveOption(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="required"
                  {...register('required')}
                />
                <Label htmlFor="required">Required field</Label>
              </div>

              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </form>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Configured Fields</h3>
              {fields.length === 0 ? (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-muted-foreground">No fields configured yet</p>
                </div>
              ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="fields">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {fields.map((field, index) => (
                          <Draggable key={field.id} draggableId={field.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center space-x-2">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{field.label}</h4>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                      <span>{field.type}</span>
                                      {field.required && (
                                        <span className="text-red-500">Required</span>
                                      )}
                                    </div>
                                  </div>
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
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-medium">Form Preview</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This is how the form will appear to users when they apply for opportunities in this category
              </p>
              
              {fields.length === 0 ? (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-muted-foreground">No fields configured yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      
                      {field.type === 'text' && (
                        <Input placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`} />
                      )}
                      
                      {field.type === 'textarea' && (
                        <Textarea placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`} />
                      )}
                      
                      {field.type === 'number' && (
                        <Input type="number" placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`} />
                      )}
                      
                      {field.type === 'select' && (
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option, index) => (
                              <SelectItem key={index} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      {field.type === 'checkbox' && (
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`preview-${field.id}`} />
                          <Label htmlFor={`preview-${field.id}`}>{field.placeholder || field.label}</Label>
                        </div>
                      )}
                      
                      {field.type === 'date' && (
                        <Input type="date" />
                      )}
                      
                      {field.type === 'file' && (
                        <Input type="file" />
                      )}
                      
                      {field.type === 'url' && (
                        <Input type="url" placeholder={field.placeholder || "https://example.com"} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CategoryFormBuilder; 