
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://adncztqbllxpnowasxwo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbmN6dHFibGx4cG5vd2FzeHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMzQ5ODksImV4cCI6MjA1OTYxMDk4OX0.R2holNq9GTuiNbz4hSCUYSGqO_zwAT_VDg_GqOK7nws';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'supabase-auth',
  }
});

// Type definitions for your tables
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

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  category: string;
  categories?: string[];
  deadline: string;
  website_url?: string | null;
  location?: string | null;
  type?: string | null;
  salary?: string | null;
  is_active: boolean;
  featured?: boolean;
  requirements?: string[];
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  opportunity_id: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  submitted_date: string;
  notes?: string | null;
  updated_at?: string;
}

export interface Profile {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  updated_at: string;
  created_at: string;
}

// Add more table interfaces as needed
