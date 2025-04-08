
import React, { useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DynamicForm, { FormSection } from '@/components/forms/DynamicForm';
import { Plus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Form configuration for category creation
const categorySections: FormSection[] = [
  {
    id: 'basic',
    title: 'Category Information',
    description: 'Create a new opportunity category',
    fields: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter category title',
        required: true,
      },
      {
        id: 'description',
        type: 'textarea',
        label: 'Description',
        placeholder: 'Short description of this category',
        required: true,
      },
      {
        id: 'icon_name',
        type: 'select',
        label: 'Icon',
        required: true,
        options: [
          { label: 'Graduation Cap', value: 'GraduationCap' },
          { label: 'Briefcase', value: 'Briefcase' },
          { label: 'Award', value: 'Award' },
          { label: 'Globe', value: 'Globe' },
          { label: 'Banknote', value: 'banknote' },
          { label: 'Trophy', value: 'trophy' },
          { label: 'Building', value: 'Building' },
          { label: 'Lightbulb', value: 'Lightbulb' },
          { label: 'Users', value: 'Users' },
          { label: 'HeartHandshake', value: 'HeartHandshake' },
          { label: 'PenTool', value: 'PenTool' },
        ],
      },
      {
        id: 'color',
        type: 'select',
        label: 'Color',
        required: true,
        options: [
          { label: 'Blue', value: 'bg-blue-100' },
          { label: 'Green', value: 'bg-green-100' },
          { label: 'Purple', value: 'bg-purple-100' },
          { label: 'Yellow', value: 'bg-yellow-100' },
          { label: 'Red', value: 'bg-red-100' },
          { label: 'Indigo', value: 'bg-indigo-100' },
          { label: 'Orange', value: 'bg-orange-100' },
          { label: 'Pink', value: 'bg-pink-100' },
          { label: 'Teal', value: 'bg-teal-100' },
        ],
      },
      {
        id: 'count',
        type: 'number',
        label: 'Opportunity Count',
        placeholder: 'Number of opportunities',
        required: false,
      },
    ],
  },
];

interface Category {
  id: string;
  title: string;
  description: string | null;
  count: number | null;
  icon_name: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}

interface CategoryFormDrawerProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  isEditing?: boolean;
  initialData?: Category;
  onCategoryAdded?: (category: Category) => void;
  onCategoryUpdated?: (category: Category) => void;
}

const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({ 
  trigger,
  isOpen,
  onClose,
  isEditing = false,
  initialData,
  onCategoryAdded,
  onCategoryUpdated
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  // Control the drawer open state
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  // Set initial form values when editing
  useEffect(() => {
    if (isEditing && initialData) {
      setFormValues({
        title: initialData.title,
        description: initialData.description || '',
        icon_name: initialData.icon_name,
        color: initialData.color,
        count: initialData.count || 0,
      });
    }
  }, [isEditing, initialData]);

  // Handle drawer close
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    
    try {
      const categoryData = {
        title: formData.title,
        description: formData.description,
        icon_name: formData.icon_name,
        color: formData.color,
        count: formData.count || 0,
        updated_at: new Date().toISOString()
      };
      
      let result;
      
      if (isEditing && initialData) {
        // Update existing category
        const { data, error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', initialData.id)
          .select('*')
          .single();
        
        if (error) {
          throw error;
        }
        
        result = data;
        
        toast({
          title: "Category Updated",
          description: "The category has been successfully updated",
        });
        
        // Call the callback with the updated category
        if (onCategoryUpdated && result) {
          onCategoryUpdated(result);
        }
      } else {
        // Create new category
        const { data, error } = await supabase
          .from('categories')
          .insert(categoryData)
          .select('*')
          .single();
        
        if (error) {
          throw error;
        }
        
        result = data;
        
        toast({
          title: "Category Added",
          description: "The category has been successfully created",
        });
        
        // Call the callback with the new category
        if (onCategoryAdded && result) {
          onCategoryAdded(result);
        }
      }
      
      handleClose();
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} category: ${error.message || 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // For the submit button content
  const getSubmitButtonContent = (): ReactNode => {
    if (loading) {
      return (
        <span className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isEditing ? 'Updating...' : 'Adding...'}
        </span>
      );
    }
    return isEditing ? 'Update Category' : 'Add Category';
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</SheetTitle>
          <SheetDescription>
            {isEditing ? 'Update category details' : 'Create a new category for opportunities'}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <DynamicForm
            title={isEditing ? 'Edit Category' : 'New Category'}
            sections={categorySections}
            onSubmit={handleSubmit}
            loading={loading}
            submitButtonText={getSubmitButtonContent()}
            initialValues={formValues}
          />
        </div>
        
        <SheetFooter className="pt-2">
          <SheetClose asChild>
            <Button variant="outline" onClick={handleClose} disabled={loading}>Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryFormDrawer;
