export interface Opportunity {
  id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  salary?: string;
  application_url: string;
  is_remote: boolean;
  posted_date: string;
  expiry_date: string;
  category_id: string;
  category?: {
    id: string;
    name: string;
  };
  applications?: {
    count: number;
  };
  custom_fields?: Record<string, any>;
  created_at: string;
  updated_at: string;
} 