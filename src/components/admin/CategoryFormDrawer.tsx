import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color: string;
  count: number;
  created_at: string;
  updated_at: string;
}

interface CategoryFormDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  isEditing?: boolean;
  initialData?: Category;
  onSuccess?: () => void;
}

const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({
  isOpen = false,
  onClose,
  isEditing = false,
  initialData,
  onSuccess
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    icon_name: string;
    color: string;
  }>({
    title: '',
    description: '',
    icon_name: 'folder',
    color: '#3b82f6'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        icon_name: initialData.icon_name || 'folder',
        color: initialData.color || '#3b82f6'
      });
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon_name: 'folder',
      color: '#3b82f6'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && initialData) {
        // Update existing category
        const { error } = await supabase
          .from('categories')
          .update({
            title: formData.title,
            description: formData.description,
            icon_name: formData.icon_name,
            color: formData.color,
            updated_at: new Date().toISOString()
          })
          .eq('id', initialData.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
      } else {
        // Create new category
        const { error } = await supabase
          .from('categories')
          .insert({
            title: formData.title,
            description: formData.description,
            icon_name: formData.icon_name,
            color: formData.color,
            count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Category created successfully',
        });
      }

      resetForm();
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save category',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</DrawerTitle>
          <DrawerDescription>
            {isEditing 
              ? 'Update category information below.' 
              : 'Fill in the information to create a new category.'}
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter category title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon_name">Icon Name</Label>
            <Input
              id="icon_name"
              name="icon_name"
              value={formData.icon_name}
              onChange={handleChange}
              placeholder="Enter icon name (e.g., folder, file, etc.)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="color"
                name="color"
                type="color"
                value={formData.color}
                onChange={handleChange}
                className="w-12 h-10 p-1"
              />
              <Input
                value={formData.color}
                onChange={handleChange}
                name="color"
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>

          <DrawerFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update Category' : 'Create Category'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryFormDrawer;
