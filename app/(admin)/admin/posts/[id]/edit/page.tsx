import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import PostEditor from "@/app/components/admin/PostEditor";
import type { UserRole } from "@/app/lib/supabase/types";

/** Convert a stored ISO timestamp to a value for <input type="datetime-local">. */
function toDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      categories:blog_post_categories(category_id)
    `
    )
    .eq("id", id)
    .single();

  if (!post) notFound();

  const { data: allCategories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  // Get current user's role
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user!.id)
    .single();

  const selectedCategoryIds = (post.categories as { category_id: string }[])?.map(
    (c) => c.category_id
  ) ?? [];

  return (
    <PostEditor
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        contentHtml: post.content_html ?? "",
        excerpt: post.excerpt ?? "",
        featuredImage: post.featured_image ?? "",
        featuredImageAlt: post.featured_image_alt ?? "",
        status: post.status,
        visibility: post.visibility,
        metaTitle: post.meta_title ?? "",
        metaDescription: post.meta_description ?? "",
        metaKeywords: post.meta_keywords?.join(", ") ?? "",
        ogImage: post.og_image ?? "",
        scheduledAt: post.scheduled_at
          ? toDatetimeLocal(post.scheduled_at)
          : "",
        selectedCategoryIds,
      }}
      categories={allCategories ?? []}
      userRole={(profile?.role as UserRole) ?? "viewer"}
    />
  );
}
