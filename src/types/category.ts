
import { FieldType } from '@/components/admin/CategoryFieldConfig';

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
}

export interface CategoryField {
  id: string;
  category_id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  display_order: number;
  created_at?: string;
  updated_at?: string;
}
