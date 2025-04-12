import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Category } from '@/types/category';

const categorySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  icon_name: z.string().optional(),
  color: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Category;
  onSuccess?: () => void;
}

interface FormField {
  label: string;
  type: string;
  placeholder: string;
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

const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [currentField, setCurrentField] = useState<FormField>({
    label: '',
    type: 'text',
    placeholder: ''
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      icon_name: '',
      color: '',
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (initialData) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', initialData.id);
        
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([data]);
        
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Category created successfully',
        });
      }
      
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleAddField = () => {
    if (currentField.label && currentField.type) {
      setFormFields([...formFields, currentField]);
      setCurrentField({ label: '', type: 'text', placeholder: '' });
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-screen max-w-[600px] sm:w-[540px]">
        <DrawerHeader className="border-b">
          <DrawerTitle>{initialData ? 'Edit Category' : 'Create Category'}</DrawerTitle>
          <DrawerDescription>
            {initialData 
              ? 'Update the category details and form configuration'
              : 'Create a new category and configure its form fields'}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="details">Category Details</TabsTrigger>
              <TabsTrigger value="form">Form Builder</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter category title"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Enter category description"
                  />
                </div>

                <div>
                  <Label htmlFor="icon_name">Icon Name</Label>
                  <Input
                    id="icon_name"
                    {...register('icon_name')}
                    placeholder="Enter icon name (optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    {...register('color')}
                    placeholder="Enter color (optional)"
                  />
                </div>
              </form>
            </TabsContent>

            <TabsContent value="form" className="h-full">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <Label>Field Label</Label>
                      <Input
                        value={currentField.label}
                        onChange={(e) => setCurrentField({
                          ...currentField,
                          label: e.target.value
                        })}
                        placeholder="Enter field label"
                      />
                    </div>
                    <div>
                      <Label>Field Type</Label>
                      <Select
                        value={currentField.type}
                        onValueChange={(value) => setCurrentField({
                          ...currentField,
                          type: value
                        })}
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
                    <div>
                      <Label>Placeholder/Example</Label>
                      <Input
                        value={currentField.placeholder}
                        onChange={(e) => setCurrentField({
                          ...currentField,
                          placeholder: e.target.value
                        })}
                        placeholder="Enter placeholder text"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddField}
                      className="w-full"
                      disabled={!currentField.label || !currentField.type}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Field
                    </Button>
                  </CardContent>
                </Card>

                {formFields.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium">Added Fields</h3>
                    {formFields.map((field, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{field.label}</p>
                              <p className="text-sm text-muted-foreground">Type: {field.type}</p>
                              {field.placeholder && (
                                <p className="text-sm text-muted-foreground">
                                  Placeholder: {field.placeholder}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DrawerFooter className="border-t">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {activeTab === 'details' && (
              <Button type="submit" form="category-form">
                {initialData ? 'Update Category' : 'Create Category'}
              </Button>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryFormDrawer;
