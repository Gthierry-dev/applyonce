
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import DynamicForm from '@/components/forms/DynamicForm';
import { categorySections } from './CategoryFormConfig';

interface CategoryFormContentProps {
  loading: boolean;
  isEditing: boolean;
  initialValues: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
}

const CategoryFormContent: React.FC<CategoryFormContentProps> = ({
  loading,
  isEditing,
  initialValues,
  onSubmit
}) => {
  // For the submit button content
  const getSubmitButtonContent = () => {
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
    <div className="py-6">
      <DynamicForm
        title={isEditing ? 'Edit Category' : 'New Category'}
        sections={categorySections}
        onSubmit={onSubmit}
        loading={loading}
        submitButtonText={getSubmitButtonContent()}
        initialValues={initialValues}
      />
    </div>
  );
};

export default CategoryFormContent;
