export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      alert_state: {
        Row: {
          alert_key: string
          last_notified_at: string | null
          last_value: Json
          since: string
          state: string
          updated_at: string
        }
        Insert: {
          alert_key: string
          last_notified_at?: string | null
          last_value?: Json
          since?: string
          state: string
          updated_at?: string
        }
        Update: {
          alert_key?: string
          last_notified_at?: string | null
          last_value?: Json
          since?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      monitored_services: {
        Row: {
          created_at: string
          degraded_latency_ms: number
          enabled: boolean
          expected_interval_seconds: number | null
          health_url: string | null
          id: string
          key: string
          kind: Database["public"]["Enums"]["service_kind"]
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          degraded_latency_ms?: number
          enabled?: boolean
          expected_interval_seconds?: number | null
          health_url?: string | null
          id?: string
          key: string
          kind: Database["public"]["Enums"]["service_kind"]
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          degraded_latency_ms?: number
          enabled?: boolean
          expected_interval_seconds?: number | null
          health_url?: string | null
          id?: string
          key?: string
          kind?: Database["public"]["Enums"]["service_kind"]
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_heartbeats: {
        Row: {
          last_beat_at: string
          meta: Json
          service_id: string
          service_key: string
          status: string | null
          updated_at: string
          version: string | null
        }
        Insert: {
          last_beat_at?: string
          meta?: Json
          service_id: string
          service_key: string
          status?: string | null
          updated_at?: string
          version?: string | null
        }
        Update: {
          last_beat_at?: string
          meta?: Json
          service_id?: string
          service_key?: string
          status?: string | null
          updated_at?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_heartbeats_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: true
            referencedRelation: "monitored_services"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          context: Json
          created_at: string
          event: string | null
          id: number
          level: Database["public"]["Enums"]["log_level"]
          message: string
          service_key: string
        }
        Insert: {
          context?: Json
          created_at?: string
          event?: string | null
          id?: never
          level?: Database["public"]["Enums"]["log_level"]
          message: string
          service_key: string
        }
        Update: {
          context?: Json
          created_at?: string
          event?: string | null
          id?: never
          level?: Database["public"]["Enums"]["log_level"]
          message?: string
          service_key?: string
        }
        Relationships: []
      }
      uptime_checks: {
        Row: {
          checked_at: string
          error: string | null
          id: number
          latency_ms: number | null
          service_id: string
          service_key: string
          status: Database["public"]["Enums"]["uptime_status"]
          status_code: number | null
        }
        Insert: {
          checked_at?: string
          error?: string | null
          id?: never
          latency_ms?: number | null
          service_id: string
          service_key: string
          status: Database["public"]["Enums"]["uptime_status"]
          status_code?: number | null
        }
        Update: {
          checked_at?: string
          error?: string | null
          id?: never
          latency_ms?: number | null
          service_id?: string
          service_key?: string
          status?: Database["public"]["Enums"]["uptime_status"]
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "uptime_checks_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "monitored_services"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_leads: {
        Row: {
          id: string
          name: string
          email: string
          business_name: string | null
          phone: string | null
          service: string | null
          message: string
          source_path: string | null
          user_agent: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          business_name?: string | null
          phone?: string | null
          service?: string | null
          message: string
          source_path?: string | null
          user_agent?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          business_name?: string | null
          phone?: string | null
          service?: string | null
          message?: string
          source_path?: string | null
          user_agent?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string
          content: Json
          content_html: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          featured_image_alt: string | null
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          og_image: string | null
          published_at: string | null
          reading_time: number | null
          scheduled_at: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at: string
          visibility: Database["public"]["Enums"]["post_visibility"]
          word_count: number | null
        }
        Insert: {
          author_id: string
          content?: Json
          content_html?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          og_image?: string | null
          published_at?: string | null
          reading_time?: number | null
          scheduled_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["post_visibility"]
          word_count?: number | null
        }
        Update: {
          author_id?: string
          content?: Json
          content_html?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          og_image?: string | null
          published_at?: string | null
          reading_time?: number | null
          scheduled_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["post_visibility"]
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      client_access: {
        Row: {
          accepted_at: string | null
          client_id: string
          email: string
          id: string
          invited_at: string
          invited_by: string | null
          profile_id: string | null
          revoked_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          client_id: string
          email: string
          id?: string
          invited_at?: string
          invited_by?: string | null
          profile_id?: string | null
          revoked_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          client_id?: string
          email?: string
          id?: string
          invited_at?: string
          invited_by?: string | null
          profile_id?: string | null
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_access_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_access_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_access_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_api_keys: {
        Row: {
          client_id: string
          created_at: string
          created_by: string | null
          id: string
          key_hash: string
          key_prefix: string
          label: string
          last_used_at: string | null
          revoked_at: string | null
          revoked_by: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          label: string
          last_used_at?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          label?: string
          last_used_at?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_api_keys_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_api_keys_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_api_keys_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_reports: {
        Row: {
          client_content_html: string | null
          client_content_json: Json | null
          client_content_md: string | null
          client_id: string
          client_name: string
          client_slug: string
          client_url: string
          created_at: string
          created_by: string | null
          grader_data: Json | null
          id: string
          internal_content_html: string | null
          internal_content_json: Json | null
          internal_content_md: string | null
          location_id: string
          published_at: string | null
          report_month: string
          status: string
          updated_at: string
          visibility: string
        }
        Insert: {
          client_content_html?: string | null
          client_content_json?: Json | null
          client_content_md?: string | null
          client_id: string
          client_name: string
          client_slug: string
          client_url: string
          created_at?: string
          created_by?: string | null
          grader_data?: Json | null
          id?: string
          internal_content_html?: string | null
          internal_content_json?: Json | null
          internal_content_md?: string | null
          location_id: string
          published_at?: string | null
          report_month: string
          status?: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          client_content_html?: string | null
          client_content_json?: Json | null
          client_content_md?: string | null
          client_id?: string
          client_name?: string
          client_slug?: string
          client_url?: string
          created_at?: string
          created_by?: string | null
          grader_data?: Json | null
          id?: string
          internal_content_html?: string | null
          internal_content_json?: Json | null
          internal_content_md?: string | null
          location_id?: string
          published_at?: string | null
          report_month?: string
          status?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_reports_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_reports_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      client_site_origins: {
        Row: {
          client_id: string
          created_at: string
          created_by: string | null
          id: string
          label: string | null
          origin: string
        }
        Insert: {
          client_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          label?: string | null
          origin: string
        }
        Update: {
          client_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          label?: string | null
          origin?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_site_origins_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_site_origins_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
          notes: string | null
          primary_contact_email: string | null
          slug: string
          status: Database["public"]["Enums"]["client_status"]
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          notes?: string | null
          primary_contact_email?: string | null
          slug: string
          status?: Database["public"]["Enums"]["client_status"]
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          notes?: string | null
          primary_contact_email?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["client_status"]
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_leads: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          restaurant: string | null
          service: string | null
          source_path: string | null
          status: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          restaurant?: string | null
          service?: string | null
          source_path?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          restaurant?: string | null
          service?: string | null
          source_path?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      ingest_rate_events: {
        Row: {
          created_at: string
          id: number
          ip: string
          route: string
        }
        Insert: {
          created_at?: string
          id?: number
          ip: string
          route: string
        }
        Update: {
          created_at?: string
          id?: number
          ip?: string
          route?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          address: string | null
          client_id: string
          created_at: string
          id: string
          is_primary: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          client_id: string
          created_at?: string
          id?: string
          is_primary?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          client_id?: string
          created_at?: string
          id?: string
          is_primary?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      monitored_services: {
        Row: {
          created_at: string
          degraded_latency_ms: number
          enabled: boolean
          expected_interval_seconds: number | null
          health_url: string | null
          id: string
          key: string
          kind: Database["public"]["Enums"]["service_kind"]
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          degraded_latency_ms?: number
          enabled?: boolean
          expected_interval_seconds?: number | null
          health_url?: string | null
          id?: string
          key: string
          kind: Database["public"]["Enums"]["service_kind"]
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          degraded_latency_ms?: number
          enabled?: boolean
          expected_interval_seconds?: number | null
          health_url?: string | null
          id?: string
          key?: string
          kind?: Database["public"]["Enums"]["service_kind"]
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["profile_status"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
        }
        Relationships: []
      }
      report_notifications: {
        Row: {
          client_access_id: string
          delivery_id: string | null
          delivery_status: string
          email: string
          error_message: string | null
          id: string
          notification_type: string
          report_id: string | null
          sent_at: string
        }
        Insert: {
          client_access_id: string
          delivery_id?: string | null
          delivery_status?: string
          email: string
          error_message?: string | null
          id?: string
          notification_type: string
          report_id?: string | null
          sent_at?: string
        }
        Update: {
          client_access_id?: string
          delivery_id?: string | null
          delivery_status?: string
          email?: string
          error_message?: string | null
          id?: string
          notification_type?: string
          report_id?: string | null
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_notifications_client_access_id_fkey"
            columns: ["client_access_id"]
            isOneToOne: false
            referencedRelation: "client_access"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_notifications_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "client_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      service_heartbeats: {
        Row: {
          last_beat_at: string
          meta: Json
          service_id: string
          service_key: string
          status: string | null
          updated_at: string
          version: string | null
        }
        Insert: {
          last_beat_at?: string
          meta?: Json
          service_id: string
          service_key: string
          status?: string | null
          updated_at?: string
          version?: string | null
        }
        Update: {
          last_beat_at?: string
          meta?: Json
          service_id?: string
          service_key?: string
          status?: string | null
          updated_at?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_heartbeats_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: true
            referencedRelation: "monitored_services"
            referencedColumns: ["id"]
          },
        ]
      }
      site_form_submissions: {
        Row: {
          api_key_id: string | null
          client_id: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          form_type: string
          id: string
          ip: unknown
          location_id: string | null
          payload: Json
          read_at: string | null
          read_by: string | null
          source: string
          status: Database["public"]["Enums"]["site_submission_status"]
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          api_key_id?: string | null
          client_id: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          form_type: string
          id?: string
          ip?: unknown
          location_id?: string | null
          payload: Json
          read_at?: string | null
          read_by?: string | null
          source: string
          status?: Database["public"]["Enums"]["site_submission_status"]
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          api_key_id?: string | null
          client_id?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          form_type?: string
          id?: string
          ip?: unknown
          location_id?: string | null
          payload?: Json
          read_at?: string | null
          read_by?: string | null
          source?: string
          status?: Database["public"]["Enums"]["site_submission_status"]
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_form_submissions_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "client_api_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_form_submissions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_form_submissions_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_form_submissions_read_by_fkey"
            columns: ["read_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      site_reviews: {
        Row: {
          api_key_id: string | null
          client_id: string
          created_at: string
          feedback: string
          id: string
          ip: unknown
          location_id: string | null
          rating: number
          read_at: string | null
          read_by: string | null
          reviewer_email: string | null
          reviewer_name: string
          reviewer_phone: string | null
          source: string
          status: Database["public"]["Enums"]["site_review_status"]
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          api_key_id?: string | null
          client_id: string
          created_at?: string
          feedback: string
          id?: string
          ip?: unknown
          location_id?: string | null
          rating: number
          read_at?: string | null
          read_by?: string | null
          reviewer_email?: string | null
          reviewer_name: string
          reviewer_phone?: string | null
          source: string
          status?: Database["public"]["Enums"]["site_review_status"]
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          api_key_id?: string | null
          client_id?: string
          created_at?: string
          feedback?: string
          id?: string
          ip?: unknown
          location_id?: string | null
          rating?: number
          read_at?: string | null
          read_by?: string | null
          reviewer_email?: string | null
          reviewer_name?: string
          reviewer_phone?: string | null
          source?: string
          status?: Database["public"]["Enums"]["site_review_status"]
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_reviews_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "client_api_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_reviews_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_reviews_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_reviews_read_by_fkey"
            columns: ["read_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          context: Json
          created_at: string
          event: string | null
          id: number
          level: Database["public"]["Enums"]["log_level"]
          message: string
          service_key: string
        }
        Insert: {
          context?: Json
          created_at?: string
          event?: string | null
          id?: never
          level?: Database["public"]["Enums"]["log_level"]
          message: string
          service_key: string
        }
        Update: {
          context?: Json
          created_at?: string
          event?: string | null
          id?: never
          level?: Database["public"]["Enums"]["log_level"]
          message?: string
          service_key?: string
        }
        Relationships: []
      }
      uptime_checks: {
        Row: {
          checked_at: string
          error: string | null
          id: number
          latency_ms: number | null
          service_id: string
          service_key: string
          status: Database["public"]["Enums"]["uptime_status"]
          status_code: number | null
        }
        Insert: {
          checked_at?: string
          error?: string | null
          id?: never
          latency_ms?: number | null
          service_id: string
          service_key: string
          status: Database["public"]["Enums"]["uptime_status"]
          status_code?: number | null
        }
        Update: {
          checked_at?: string
          error?: string | null
          id?: never
          latency_ms?: number | null
          service_id?: string
          service_key?: string
          status?: Database["public"]["Enums"]["uptime_status"]
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "uptime_checks_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "monitored_services"
            referencedColumns: ["id"]
          },
        ]
      }
      wireframe_content: {
        Row: {
          client_id: string
          content: Json
          id: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          client_id: string
          content?: Json
          id?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          client_id?: string
          content?: Json
          id?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "wireframe_content_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wireframe_content_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wireframe_edit_locks: {
        Row: {
          acquired_at: string
          client_id: string
          display_name: string | null
          last_heartbeat_at: string
          profile_id: string
        }
        Insert: {
          acquired_at?: string
          client_id: string
          display_name?: string | null
          last_heartbeat_at?: string
          profile_id: string
        }
        Update: {
          acquired_at?: string
          client_id?: string
          display_name?: string | null
          last_heartbeat_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wireframe_edit_locks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wireframe_edit_locks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wireframe_mcp_keys: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          key_hash: string
          key_prefix: string
          label: string
          last_used_at: string | null
          revoked_at: string | null
          revoked_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          label: string
          last_used_at?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          label?: string
          last_used_at?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      acquire_wireframe_lock: {
        Args: { p_client_id: string; p_display_name?: string }
        Returns: {
          acquired_at: string
          client_id: string
          display_name: string | null
          last_heartbeat_at: string
          profile_id: string
        }
        SetofOptions: {
          from: "*"
          to: "wireframe_edit_locks"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      heartbeat_wireframe_lock: {
        Args: { p_client_id: string }
        Returns: {
          acquired_at: string
          client_id: string
          display_name: string | null
          last_heartbeat_at: string
          profile_id: string
        }
        SetofOptions: {
          from: "*"
          to: "wireframe_edit_locks"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      mint_wireframe_mcp_key: { Args: { p_label: string }; Returns: Json }
      release_wireframe_lock: {
        Args: { p_client_id: string }
        Returns: boolean
      }
      revoke_wireframe_mcp_key: { Args: { p_id: string }; Returns: undefined }
    }
    Enums: {
      client_status: "prospect" | "client" | "template"
      log_level: "debug" | "info" | "warn" | "error" | "fatal"
      post_status: "draft" | "published" | "scheduled" | "archived"
      post_visibility: "public" | "unlisted" | "private" | "client_only"
      profile_status: "pending" | "approved" | "denied"
      service_kind: "http" | "push"
      site_review_status: "new" | "read" | "archived"
      site_submission_status: "new" | "read" | "archived"
      uptime_status: "up" | "down" | "degraded"
      user_role:
        | "admin"
        | "author"
        | "viewer"
        | "commenter"
        | "editor"
        | "manager"
        | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      client_status: ["prospect", "client", "template"],
      log_level: ["debug", "info", "warn", "error", "fatal"],
      post_status: ["draft", "published", "scheduled", "archived"],
      post_visibility: ["public", "unlisted", "private", "client_only"],
      profile_status: ["pending", "approved", "denied"],
      service_kind: ["http", "push"],
      site_review_status: ["new", "read", "archived"],
      site_submission_status: ["new", "read", "archived"],
      uptime_status: ["up", "down", "degraded"],
      user_role: [
        "admin",
        "author",
        "viewer",
        "commenter",
        "editor",
        "manager",
        "client",
      ],
    },
  },
} as const

// Role hierarchy helpers.
// `client` is a separate plane (restaurant owners). It is NOT part of the team
// hierarchy and must be checked explicitly via isClientRole / isTeamRole.
export const ROLE_LEVELS: Record<Enums<"user_role">, number> = {
  client: -1,
  viewer: 0,
  commenter: 1,
  author: 2,
  editor: 3,
  manager: 4,
  admin: 5,
} as const;

export type UserRole = Enums<"user_role">;

export const TEAM_ROLES: readonly UserRole[] = [
  "viewer", "commenter", "author", "editor", "manager", "admin",
] as const;

export function isTeamRole(role: UserRole): boolean {
  return role !== "client";
}

export function isClientRole(role: UserRole): boolean {
  return role === "client";
}

export function isTeamWriter(role: UserRole): boolean {
  return role === "author" || role === "editor" || role === "manager" || role === "admin";
}

export function hasRole(userRole: UserRole, minRole: UserRole): boolean {
  if (userRole === "client" || minRole === "client") {
    return userRole === minRole;
  }
  return ROLE_LEVELS[userRole] >= ROLE_LEVELS[minRole];
}

export const ROLE_LABELS: Record<UserRole, string> = {
  client: "Client",
  viewer: "Viewer",
  commenter: "Commenter",
  author: "Author",
  editor: "Editor",
  manager: "Manager",
  admin: "Admin",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  client: "Restaurant owner — sees only published reports for their company",
  viewer: "Can view private posts only",
  commenter: "Can view and comment on posts",
  author: "Can create and edit own posts and reports",
  editor: "Can create and edit own posts",
  manager: "Can manage all posts, categories, and users",
  admin: "Full access to everything",
};

export const VISIBILITY_LABELS: Record<Enums<"post_visibility">, string> = {
  public: "Public",
  unlisted: "Unlisted",
  private: "Private",
  client_only: "Client Only",
};

export const VISIBILITY_DESCRIPTIONS: Record<Enums<"post_visibility">, string> = {
  public: "Visible to everyone, indexed by search engines",
  unlisted: "Accessible via direct link only, not listed or indexed",
  private: "Only visible to approved team members",
  client_only: "Only team members and clients with email-granted access can view",
};
