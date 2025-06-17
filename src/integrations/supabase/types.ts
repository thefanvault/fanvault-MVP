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
      admin_audit_log: {
        Row: {
          action_type: string
          admin_user_id: string
          created_at: string
          details: Json | null
          id: string
          target_item_id: string | null
          target_user_id: string | null
        }
        Insert: {
          action_type: string
          admin_user_id: string
          created_at?: string
          details?: Json | null
          id?: string
          target_item_id?: string | null
          target_user_id?: string | null
        }
        Update: {
          action_type?: string
          admin_user_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          target_item_id?: string | null
          target_user_id?: string | null
        }
        Relationships: []
      }
      bids: {
        Row: {
          amount: number
          created_at: string
          id: string
          item_id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          item_id: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          item_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_settings: {
        Row: {
          created_at: string
          default_return_address: string | null
          default_shipping_cost: number | null
          id: string
          storefront_banner_url: string | null
          storefront_public: boolean | null
          stripe_connect_id: string | null
          stripe_connect_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_return_address?: string | null
          default_shipping_cost?: number | null
          id?: string
          storefront_banner_url?: string | null
          storefront_public?: boolean | null
          stripe_connect_id?: string | null
          stripe_connect_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_return_address?: string | null
          default_shipping_cost?: number | null
          id?: string
          storefront_banner_url?: string | null
          storefront_public?: boolean | null
          stripe_connect_id?: string | null
          stripe_connect_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      item_flags: {
        Row: {
          created_at: string
          details: string | null
          flagged_by: string
          id: string
          item_id: string
          reason: string
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          flagged_by: string
          id?: string
          item_id: string
          reason: string
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          details?: string | null
          flagged_by?: string
          id?: string
          item_id?: string
          reason?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_flags_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          auction_end: string
          auction_start: string
          condition: string | null
          content_url: string | null
          created_at: string
          creator_id: string
          current_bid: number | null
          current_bid_user: string | null
          description: string | null
          id: string
          images: string[]
          signed: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          auction_end: string
          auction_start: string
          condition?: string | null
          content_url?: string | null
          created_at?: string
          creator_id: string
          current_bid?: number | null
          current_bid_user?: string | null
          description?: string | null
          id?: string
          images?: string[]
          signed?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          auction_end?: string
          auction_start?: string
          condition?: string | null
          content_url?: string | null
          created_at?: string
          creator_id?: string
          current_bid?: number | null
          current_bid_user?: string | null
          description?: string | null
          id?: string
          images?: string[]
          signed?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          carrier: string | null
          created_at: string
          final_bid_amount: number
          id: string
          item_id: string
          shipping_address_id: string
          shipping_cost: number
          status: string
          total_amount: number
          tracking_number: string | null
          updated_at: string
          winner_id: string
        }
        Insert: {
          carrier?: string | null
          created_at?: string
          final_bid_amount: number
          id?: string
          item_id: string
          shipping_address_id: string
          shipping_cost?: number
          status?: string
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
          winner_id: string
        }
        Update: {
          carrier?: string | null
          created_at?: string
          final_bid_amount?: number
          id?: string
          item_id?: string
          shipping_address_id?: string
          shipping_cost?: number
          status?: string
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
          winner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_address_id_fkey"
            columns: ["shipping_address_id"]
            isOneToOne: false
            referencedRelation: "shipping_addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          brand: string
          created_at: string
          exp_month: number
          exp_year: number
          id: string
          is_default: boolean | null
          last_four: string
          stripe_payment_method_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          brand: string
          created_at?: string
          exp_month: number
          exp_year: number
          id?: string
          is_default?: boolean | null
          last_four: string
          stripe_payment_method_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          brand?: string
          created_at?: string
          exp_month?: number
          exp_year?: number
          id?: string
          is_default?: boolean | null
          last_four?: string
          stripe_payment_method_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          is_creator: boolean | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_creator?: boolean | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_creator?: boolean | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      shipping_addresses: {
        Row: {
          apartment: string | null
          city: string
          created_at: string
          full_name: string
          id: string
          is_default: boolean | null
          phone: string
          state: string
          street_address: string
          updated_at: string
          user_id: string
          zip_code: string
        }
        Insert: {
          apartment?: string | null
          city: string
          created_at?: string
          full_name: string
          id?: string
          is_default?: boolean | null
          phone: string
          state: string
          street_address: string
          updated_at?: string
          user_id: string
          zip_code: string
        }
        Update: {
          apartment?: string | null
          city?: string
          created_at?: string
          full_name?: string
          id?: string
          is_default?: boolean | null
          phone?: string
          state?: string
          street_address?: string
          updated_at?: string
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          email_auction_ending: boolean | null
          email_marketing: boolean | null
          email_new_items: boolean | null
          email_outbid_alerts: boolean | null
          email_win_notifications: boolean | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_auction_ending?: boolean | null
          email_marketing?: boolean | null
          email_new_items?: boolean | null
          email_outbid_alerts?: boolean | null
          email_win_notifications?: boolean | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_auction_ending?: boolean | null
          email_marketing?: boolean | null
          email_new_items?: boolean | null
          email_outbid_alerts?: boolean | null
          email_win_notifications?: boolean | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_staff: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "user" | "creator" | "moderator" | "admin"
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
    Enums: {
      user_role: ["user", "creator", "moderator", "admin"],
    },
  },
} as const
