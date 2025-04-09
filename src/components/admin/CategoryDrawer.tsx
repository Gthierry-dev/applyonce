
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CategoryForm from './CategoryForm';
import { Category } from '@/integrations/supabase/client';

interface CategoryDrawerProps {
  trigger: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  initialData?: Category;
  onSave: (category: Category) => void;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  trigger,
  isOpen,
  onOpenChange,
  isEditing,
  initialData,
  onSave
}) => {
  const handleSave = (category: Category) => {
    onSave(category);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</SheetTitle>
          <SheetDescription>
            {isEditing 
              ? 'Update the details of this category' 
              : 'Create a new category for opportunities'}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <CategoryForm
            isEditing={isEditing}
            initialData={initialData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryDrawer;
