
import React from 'react';
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface CategoryFormHeaderProps {
  isEditing: boolean;
}

const CategoryFormHeader: React.FC<CategoryFormHeaderProps> = ({ isEditing }) => {
  return (
    <SheetHeader>
      <SheetTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</SheetTitle>
      <SheetDescription>
        {isEditing ? 'Update category details' : 'Create a new category for opportunities'}
      </SheetDescription>
    </SheetHeader>
  );
};

export default CategoryFormHeader;
