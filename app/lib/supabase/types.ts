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
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_reports: {
        Row: {
          id: string
          client_id: string
          location_id: string
          report_month: string
          client_name: string
          client_slug: string
          client_url: string
          client_content_md: string | null
          client_content_html: string | null
          client_content_json: Json | null
          internal_content_md: string | null
          internal_content_html: string | null
          internal_content_json: Json | null
          grader_data: Json | null
          status: "draft" | "published" | "archived"
          visibility: "public" | "unlisted" | "private" | "client_only"
          created_at: string
          updated_at: string
          published_at: string | null
          created_by: string | null
        }
        Insert: {
          id?: string
          client_id: string
          location_id: string
          report_month: string
          client_name: string
          client_slug: string
          client_url: string
          client_content_md?: string | null
          client_content_html?: string | null
          client_content_json?: Json | null
          internal_content_md?: string | null
          internal_content_html?: string | null
          internal_content_json?: Json | null
          grader_data?: Json | null
          status?: "draft" | "published" | "archived"
          visibility?: "public" | "unlisted" | "private" | "client_only"
          created_at?: string
          updated_at?: string
          published_at?: string | null
          created_by?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          location_id?: string
          report_month?: string
          client_name?: string
          client_slug?: string
          client_url?: string
          client_content_md?: string | null
          client_content_html?: string | null
          client_content_json?: Json | null
          internal_content_md?: string | null
          internal_content_html?: string | null
          internal_content_json?: Json | null
          grader_data?: Json | null
          status?: "draft" | "published" | "archived"
          visibility?: "public" | "unlisted" | "private" | "client_only"
          created_at?: string
          updated_at?: string
          published_at?: string | null
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_reports_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_reports_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_reports_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          id: string
          client_id: string
          name: string
          slug: string
          address: string | null
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          name: string
          slug: string
          address?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          name?: string
          slug?: string
          address?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          id: string
          name: string
          slug: string
          url: string
          primary_contact_email: string | null
          notes: string | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          url: string
          primary_contact_email?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          url?: string
          primary_contact_email?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_access: {
        Row: {
          id: string
          client_id: string
          email: string
          profile_id: string | null
          invited_by: string | null
          invited_at: string
          accepted_at: string | null
          revoked_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          email: string
          profile_id?: string | null
          invited_by?: string | null
          invited_at?: string
          accepted_at?: string | null
          revoked_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          email?: string
          profile_id?: string | null
          invited_by?: string | null
          invited_at?: string
          accepted_at?: string | null
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_access_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_access_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_access_invited_by_fkey"
            columns: ["invited_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      report_notifications: {
        Row: {
          id: string
          report_id: string | null
          client_access_id: string
          notification_type: "share" | "published"
          email: string
          delivery_id: string | null
          delivery_status: "sent" | "failed" | "pending"
          error_message: string | null
          sent_at: string
        }
        Insert: {
          id?: string
          report_id?: string | null
          client_access_id: string
          notification_type: "share" | "published"
          email: string
          delivery_id?: string | null
          delivery_status?: "sent" | "failed" | "pending"
          error_message?: string | null
          sent_at?: string
        }
        Update: {
          id?: string
          report_id?: string | null
          client_access_id?: string
          notification_type?: "share" | "published"
          email?: string
          delivery_id?: string | null
          delivery_status?: "sent" | "failed" | "pending"
          error_message?: string | null
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_notifications_report_id_fkey"
            columns: ["report_id"]
            referencedRelation: "client_reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_notifications_client_access_id_fkey"
            columns: ["client_access_id"]
            referencedRelation: "client_access"
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      post_status: "draft" | "published" | "scheduled" | "archived"
      post_visibility: "public" | "unlisted" | "private" | "client_only"
      profile_status: "pending" | "approved" | "denied"
      user_role: "viewer" | "commenter" | "editor" | "manager" | "admin" | "author" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  TableName extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][TableName]["Row"]

export type TablesInsert<
  TableName extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][TableName]["Insert"]

export type TablesUpdate<
  TableName extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][TableName]["Update"]

export type Enums<
  EnumName extends keyof DefaultSchema["Enums"],
> = DefaultSchema["Enums"][EnumName]

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
