"use server";

import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const MAX_SLUG_LENGTH = 80;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, MAX_SLUG_LENGTH);
}

function sanitizeSlug(slug: string): string {
  const cleaned = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, MAX_SLUG_LENGTH);

  if (!cleaned || !SLUG_PATTERN.test(cleaned)) {
    throw new Error("Invalid slug format. Use only lowercase letters, numbers, and hyphens.");
  }

  return cleaned;
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  return text.split(/\s+/).filter(Boolean).length;
}

async function verifyPostOwnership(postId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify the user owns this post
  const { data: post } = await supabase
    .from("blog_posts")
    .select("id, author_id")
    .eq("id", postId)
    .single();

  if (!post) throw new Error("Post not found");
  if (post.author_id !== user.id) throw new Error("Forbidden");

  return { supabase, user };
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const title = (formData.get("title") as string) || "Untitled";

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title,
      slug: generateSlug(title),
      content: {},
      author_id: user.id,
      status: "draft",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  redirect(`/admin/posts/${data.id}/edit`);
}

export async function updatePost(postId: string, formData: FormData) {
  const { supabase } = await verifyPostOwnership(postId);

  const title = formData.get("title") as string;
  const rawSlug = formData.get("slug") as string;
  const contentHtml = formData.get("content_html") as string;
  const excerpt = formData.get("excerpt") as string;
  const featuredImage = formData.get("featured_image") as string;
  const featuredImageAlt = formData.get("featured_image_alt") as string;
  const metaTitle = formData.get("meta_title") as string;
  const metaDescription = formData.get("meta_description") as string;
  const metaKeywordsStr = formData.get("meta_keywords") as string;
  const ogImage = formData.get("og_image") as string;
  const visibilityStr = formData.get("visibility") as string;
  const categoriesStr = formData.get("categories") as string;

  // Validate slug
  const slug = rawSlug ? sanitizeSlug(rawSlug) : generateSlug(title);

  // Validate image URLs if provided
  if (featuredImage && !isValidImageUrl(featuredImage)) {
    throw new Error("Invalid featured image URL");
  }
  if (ogImage && !isValidImageUrl(ogImage)) {
    throw new Error("Invalid OG image URL");
  }

  const metaKeywords = metaKeywordsStr
    ? metaKeywordsStr.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

  const validVisibility = ["public", "unlisted", "private"];
  const visibility = validVisibility.includes(visibilityStr) ? visibilityStr : "public";

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      content_html: contentHtml || null,
      excerpt: excerpt || null,
      featured_image: featuredImage || null,
      featured_image_alt: featuredImageAlt || null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      meta_keywords: metaKeywords,
      og_image: ogImage || null,
      visibility: visibility as "public" | "unlisted" | "private",
      reading_time: contentHtml ? estimateReadingTime(contentHtml) : null,
      word_count: contentHtml ? countWords(contentHtml) : null,
    })
    .eq("id", postId);

  if (error) throw new Error(error.message);

  // Update categories
  if (categoriesStr !== null) {
    const categoryIds = categoriesStr
      ? categoriesStr.split(",").filter(Boolean)
      : [];

    // Remove existing
    await supabase
      .from("blog_post_categories")
      .delete()
      .eq("post_id", postId);

    // Insert new
    if (categoryIds.length > 0) {
      await supabase.from("blog_post_categories").insert(
        categoryIds.map((categoryId) => ({
          post_id: postId,
          category_id: categoryId,
        }))
      );
    }
  }

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${postId}/edit`);
  revalidatePath("/blog");
}

export async function publishPost(postId: string) {
  const { supabase } = await verifyPostOwnership(postId);

  const { error } = await supabase
    .from("blog_posts")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", postId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${postId}/edit`);
  revalidatePath("/blog");
}

export async function unpublishPost(postId: string) {
  const { supabase } = await verifyPostOwnership(postId);

  const { error } = await supabase
    .from("blog_posts")
    .update({ status: "draft" })
    .eq("id", postId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${postId}/edit`);
  revalidatePath("/blog");
}

export async function deletePost(postId: string) {
  const { supabase } = await verifyPostOwnership(postId);

  // Remove categories first
  await supabase
    .from("blog_post_categories")
    .delete()
    .eq("post_id", postId);

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", postId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
