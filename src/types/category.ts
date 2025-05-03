
import { FieldType } from '@/types/supabase';

export interface Category {
  id: string;
  title: string;
  description?: string;
  icon_name: string;
  color: string;
  count?: number;
  created_at?: string;
  updated_at?: string;
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
  created_at?: string;
  updated_at?: string;
}
