
import { Database } from '@/integrations/supabase/types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type Category = Tables<'categories'>;
export type CategoryField = Tables<'category_fields'>;
export type Opportunity = Tables<'opportunities'>;
export type OpportunityField = Tables<'opportunity_fields'>;
export type Application = Tables<'applications'>;
export type Profile = Tables<'profiles'>;

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date' | 'file' | 'url';
export type UserRole = 'user' | 'admin' | 'company';
