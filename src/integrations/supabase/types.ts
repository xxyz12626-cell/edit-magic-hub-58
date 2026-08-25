export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      imported_events: {
        Row: {
          about: string;
          attendees: number;
          audience: string;
          category: string;
          city: string;
          coverage: number;
          created_at: string;
          date_text: string;
          event_date: string | null;
          external_id: string;
          from_egp: number;
          governorate: string;
          id: string;
          image_url: string;
          in_kind: boolean;
          organizer: string;
          slug: string;
          source: string;
          source_url: string;
          tiers: Json;
          title: string;
          updated_at: string;
        };
        Insert: {
          about?: string;
          attendees?: number;
          audience?: string;
          category: string;
          city: string;
          coverage?: number;
          created_at?: string;
          date_text?: string;
          event_date?: string | null;
          external_id: string;
          from_egp?: number;
          governorate: string;
          id?: string;
          image_url?: string;
          in_kind?: boolean;
          organizer?: string;
          slug: string;
          source: string;
          source_url?: string;
          tiers?: Json;
          title: string;
          updated_at?: string;
        };
        Update: {
          about?: string;
          attendees?: number;
          audience?: string;
          category?: string;
          city?: string;
          coverage?: number;
          created_at?: string;
          date_text?: string;
          event_date?: string | null;
          external_id?: string;
          from_egp?: number;
          governorate?: string;
          id?: string;
          image_url?: string;
          in_kind?: boolean;
          organizer?: string;
          slug?: string;
          source?: string;
          source_url?: string;
          tiers?: Json;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ingest_config: {
        Row: {
          created_at: string;
          id: boolean;
          ingest_secret: string;
          ingest_url: string;
        };
        Insert: {
          created_at?: string;
          id?: boolean;
          ingest_secret?: string;
          ingest_url: string;
        };
        Update: {
          created_at?: string;
          id?: boolean;
          ingest_secret?: string;
          ingest_url?: string;
        };
        Relationships: [];
      };
      ingest_runs: {
        Row: {
          created_at: string;
          error: string | null;
          fetched: number;
          id: string;
          inserted: number;
          source: string;
          updated: number;
        };
        Insert: {
          created_at?: string;
          error?: string | null;
          fetched?: number;
          id?: string;
          inserted?: number;
          source?: string;
          updated?: number;
        };
        Update: {
          created_at?: string;
          error?: string | null;
          fetched?: number;
          id?: string;
          inserted?: number;
          source?: string;
          updated?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          full_name: string | null;
          id: string;
          org_name: string | null;
          updated_at: string;
          whatsapp: string | null;
        };
        Insert: {
          created_at?: string;
          full_name?: string | null;
          id: string;
          org_name?: string | null;
          updated_at?: string;
          whatsapp?: string | null;
        };
        Update: {
          created_at?: string;
          full_name?: string | null;
          id?: string;
          org_name?: string | null;
          updated_at?: string;
          whatsapp?: string | null;
        };
        Relationships: [];
      };
      sponsorships: {
        Row: {
          amount_egp: number;
          created_at: string;
          event_slug: string;
          event_title: string;
          id: string;
          status: string;
          tier_name: string;
          user_id: string;
        };
        Insert: {
          amount_egp?: number;
          created_at?: string;
          event_slug: string;
          event_title: string;
          id?: string;
          status?: string;
          tier_name: string;
          user_id: string;
        };
        Update: {
          amount_egp?: number;
          created_at?: string;
          event_slug?: string;
          event_title?: string;
          id?: string;
          status?: string;
          tier_name?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_events: {
        Row: {
          attendees: number;
          audience: string;
          category: string;
          city: string;
          created_at: string;
          description: string;
          email: string;
          event_date: string | null;
          governorate: string;
          id: string;
          in_kind: boolean;
          organizer: string;
          status: string;
          tiers: Json;
          title: string;
          user_id: string;
          whatsapp: string;
        };
        Insert: {
          attendees?: number;
          audience?: string;
          category: string;
          city: string;
          created_at?: string;
          description?: string;
          email?: string;
          event_date?: string | null;
          governorate: string;
          id?: string;
          in_kind?: boolean;
          organizer?: string;
          status?: string;
          tiers?: Json;
          title: string;
          user_id: string;
          whatsapp?: string;
        };
        Update: {
          attendees?: number;
          audience?: string;
          category?: string;
          city?: string;
          created_at?: string;
          description?: string;
          email?: string;
          event_date?: string | null;
          governorate?: string;
          id?: string;
          in_kind?: boolean;
          organizer?: string;
          status?: string;
          tiers?: Json;
          title?: string;
          user_id?: string;
          whatsapp?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
