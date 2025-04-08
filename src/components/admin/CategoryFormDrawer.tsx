
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CategoryFormHeader from './category-form/CategoryFormHeader';
import CategoryFormContent from './category-form/CategoryFormContent';
import CategoryFormFooter from './category-form/CategoryFormFooter';
import { useCategoryForm } from './category-form/useCategoryForm';
import { CategoryFormDrawerProps } from './category-form/CategoryFormTypes';

const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({ 
  trigger,
  isOpen,
  onClose,
  isEditing = false,
  initialData,
  onCategoryAdded,
  onCategoryUpdated
}) => {
  const [open, setOpen] = useState(false);

  // Control the drawer open state
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  // Handle drawer close
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const { loading, formValues, handleSubmit } = useCategoryForm(
    isEditing,
    initialData,
    onCategoryAdded,
    onCategoryUpdated,
    handleClose
  );

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
        <CategoryFormHeader isEditing={isEditing} />
        
        <CategoryFormContent 
          loading={loading}
          isEditing={isEditing}
          initialValues={formValues}
          onSubmit={handleSubmit}
        />
        
        <CategoryFormFooter loading={loading} onClose={handleClose} />
      </SheetContent>
    </Sheet>
  );
};

export default CategoryFormDrawer;
