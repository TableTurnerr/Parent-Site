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
      post_visibility: "public" | "unlisted" | "private"
      profile_status: "pending" | "approved" | "denied"
      user_role: "viewer" | "commenter" | "editor" | "manager" | "admin"
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

// Role hierarchy helpers
export const ROLE_LEVELS = {
  viewer: 0,
  commenter: 1,
  editor: 2,
  manager: 3,
  admin: 4,
} as const;

export type UserRole = Enums<"user_role">;

export function hasRole(userRole: UserRole, minRole: UserRole): boolean {
  return ROLE_LEVELS[userRole] >= ROLE_LEVELS[minRole];
}

export const ROLE_LABELS: Record<UserRole, string> = {
  viewer: "Viewer",
  commenter: "Commenter",
  editor: "Editor",
  manager: "Manager",
  admin: "Admin",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  viewer: "Can view private posts only",
  commenter: "Can view and comment on posts",
  editor: "Can create and edit own posts",
  manager: "Can manage all posts, categories, and users",
  admin: "Full access to everything",
};

export const VISIBILITY_LABELS: Record<Enums<"post_visibility">, string> = {
  public: "Public",
  unlisted: "Unlisted",
  private: "Private",
};

export const VISIBILITY_DESCRIPTIONS: Record<Enums<"post_visibility">, string> = {
  public: "Visible to everyone, indexed by search engines",
  unlisted: "Accessible via direct link only, not listed or indexed",
  private: "Only visible to approved team members",
};
