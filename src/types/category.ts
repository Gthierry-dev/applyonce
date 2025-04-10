export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date' | 'file' | 'url';

export interface CategoryField {
  id: string;
  category_id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
} 