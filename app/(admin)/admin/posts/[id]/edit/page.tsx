import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import PostEditor from "@/app/components/admin/PostEditor";

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
        metaTitle: post.meta_title ?? "",
        metaDescription: post.meta_description ?? "",
        metaKeywords: post.meta_keywords?.join(", ") ?? "",
        ogImage: post.og_image ?? "",
        selectedCategoryIds,
      }}
      categories={allCategories ?? []}
    />
  );
}
