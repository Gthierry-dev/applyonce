import React, { useState } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CategoryForm from './CategoryForm';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'details' | 'form'>('details');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      icon_name: '',
      color: '',
    },
  });

  const handleDetailsSubmit = async (data: CategoryFormData) => {
    try {
      setIsSubmitting(true);
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
        setCategoryId(initialData.id);
        setActiveTab('form');
      } else {
        const { data: newCategory, error } = await supabase
          .from('categories')
          .insert([{
            title: data.title,
            description: data.description,
            icon_name: data.icon_name,
            color: data.color,
          }])
          .select()
          .single();
        
        if (error) throw error;
        setCategoryId(newCategory.id);
        setActiveTab('form');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      toast({
        title: 'Success',
        description: 'Category and form fields saved successfully',
      });
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
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
            {activeTab === 'details' 
              ? 'Enter category details'
              : 'Configure form fields'}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          {activeTab === 'details' ? (
            <form id="category-form" onSubmit={handleSubmit(handleDetailsSubmit)} className="space-y-4">
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Next: Form Fields'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <CategoryForm categoryId={categoryId || initialData?.id} />
              
              <div className="flex justify-between space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('details')}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Details
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Complete'}
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
} 