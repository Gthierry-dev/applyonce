export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          last_updated: string | null
          notes: string | null
          opportunity_id: string | null
          responses: Json | null
          status: string | null
          submitted_date: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          last_updated?: string | null
          notes?: string | null
          opportunity_id?: string | null
          responses?: Json | null
          status?: string | null
          submitted_date?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          last_updated?: string | null
          notes?: string | null
          opportunity_id?: string | null
          responses?: Json | null
          status?: string | null
          submitted_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string
          count: number | null
          created_at: string | null
          description: string | null
          icon_name: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          color?: string
          count?: number | null
          created_at?: string | null
          description?: string | null
          icon_name: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          color?: string
          count?: number | null
          created_at?: string | null
          description?: string | null
          icon_name?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      category_fields: {
        Row: {
          category_id: string
          created_at: string
          id: string
          label: string
          name: string
          options: string[] | null
          placeholder: string | null
          required: boolean
          type: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          label: string
          name: string
          options?: string[] | null
          placeholder?: string | null
          required?: boolean
          type: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          label?: string
          name?: string
          options?: string[] | null
          placeholder?: string | null
          required?: boolean
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_fields_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      category_responses: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          responses: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          responses: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          responses?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_responses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          categories: string[] | null
          category: string
          category_id: string | null
          created_at: string
          deadline: string
          description: string
          featured: boolean | null
          id: string
          is_active: boolean | null
          location: string | null
          organization: string
          requirements: string[] | null
          salary: string | null
          title: string
          type: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          categories?: string[] | null
          category: string
          category_id?: string | null
          created_at?: string
          deadline: string
          description: string
          featured?: boolean | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          organization: string
          requirements?: string[] | null
          salary?: string | null
          title: string
          type?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          categories?: string[] | null
          category?: string
          category_id?: string | null
          created_at?: string
          deadline?: string
          description?: string
          featured?: boolean | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          organization?: string
          requirements?: string[] | null
          salary?: string | null
          title?: string
          type?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunity_fields: {
        Row: {
          created_at: string | null
          field_id: string | null
          id: string
          is_enabled: boolean | null
          opportunity_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          field_id?: string | null
          id?: string
          is_enabled?: boolean | null
          opportunity_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          field_id?: string | null
          id?: string
          is_enabled?: boolean | null
          opportunity_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_fields_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "category_fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunity_fields_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_login: {
        Args: { email: string; password: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
