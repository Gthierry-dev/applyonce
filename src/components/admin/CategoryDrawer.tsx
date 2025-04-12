import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CategoryForm from './CategoryForm';

const categorySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  icon_name: z.string().optional(),
  color: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess?: () => void;
}

export function CategoryDrawer({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: CategoryDrawerProps) {
  const { toast } = useToast();
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
          .update({
            title: data.title,
            description: data.description,
            icon_name: data.icon_name,
            color: data.color,
          })
          .eq('id', initialData.id);
        
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([{
            title: data.title,
            description: data.description,
            icon_name: data.icon_name,
            color: data.color,
          }]);
        
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-4 pb-4 border-b">
          <SheetTitle>
            {initialData ? 'Edit Category' : 'Create Category'}
          </SheetTitle>
          <SheetDescription>
            {initialData 
              ? 'Update category details and form fields'
              : 'Create a new category and configure its form fields'}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="form">Form Fields</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 space-y-4">
            <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Enter category title"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter category description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon_name">Icon Name</Label>
                <Input
                  id="icon_name"
                  {...register('icon_name')}
                  placeholder="Enter icon name (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="color"
                  {...register('color')}
                  className="h-10 px-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {initialData ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="form" className="mt-4">
            <CategoryForm categoryId={initialData?.id} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
} 