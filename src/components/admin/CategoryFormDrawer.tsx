
import React, { useEffect, useState } from 'react';
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
import { Plus } from 'lucide-react';

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
        id: 'iconName',
        type: 'select',
        label: 'Icon',
        required: true,
        options: [
          { label: 'Graduation Cap', value: 'graduationCap' },
          { label: 'Briefcase', value: 'briefcase' },
          { label: 'Award', value: 'award' },
          { label: 'Globe', value: 'globe' },
          { label: 'Banknote', value: 'banknote' },
          { label: 'Trophy', value: 'trophy' },
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
        ],
      },
    ],
  },
];

interface CategoryFormDrawerProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  isEditing?: boolean;
  initialData?: {
    id: number;
    title: string;
    description: string;
    iconName: string;
    color: string;
    count?: number;
  };
}

const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({ 
  trigger,
  isOpen,
  onClose,
  isEditing = false,
  initialData
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
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
        description: initialData.description,
        iconName: initialData.iconName,
        color: initialData.color,
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

  const handleSubmit = (formData: Record<string, any>) => {
    setLoading(true);
    
    // Process form data
    console.log('Submitted category:', formData);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: isEditing ? "Category Updated" : "Category Added",
        description: isEditing 
          ? "The category has been successfully updated" 
          : "The category has been successfully created",
      });
      
      handleClose();
    }, 1000);
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
            submitButtonText={isEditing ? 'Update Category' : 'Add Category'}
            initialValues={formValues}
          />
        </div>
        
        <SheetFooter className="pt-2">
          <SheetClose asChild>
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryFormDrawer;
