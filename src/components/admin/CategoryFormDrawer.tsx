import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import CategoryFormBuilder from './CategoryFormBuilder';
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

const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
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

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{initialData ? 'Edit Category' : 'Create Category'}</DrawerTitle>
          <DrawerDescription>
            {initialData 
              ? 'Update the category details and form configuration'
              : 'Create a new category and configure its form fields'}
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="details">Category Details</TabsTrigger>
              {initialData && (
                <TabsTrigger value="form">Form Configuration</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="details">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                <Button type="submit" className="w-full">
                  {initialData ? 'Update Category' : 'Create Category'}
                </Button>
              </form>
            </TabsContent>

            {initialData && (
              <TabsContent value="form">
                <CategoryFormBuilder
                  categoryId={initialData.id}
                  categoryName={initialData.title}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryFormDrawer;
