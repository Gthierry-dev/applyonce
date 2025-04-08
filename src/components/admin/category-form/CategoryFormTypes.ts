
// Define Category type
export interface Category {
  id: string;
  title: string;
  description: string | null;
  count: number | null;
  icon_name: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}

// Props for the CategoryFormDrawer
export interface CategoryFormDrawerProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  isEditing?: boolean;
  initialData?: Category;
  onCategoryAdded?: (category: Category) => void;
  onCategoryUpdated?: (category: Category) => void;
}
