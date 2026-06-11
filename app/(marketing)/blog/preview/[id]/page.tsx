import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { getPostById, getPublishedPosts } from "@/app/lib/blog";
import BlogPostView from "@/app/components/blog/BlogPostView";
import { isTeamRole, type UserRole } from "@/app/lib/supabase/types";

// Auth-gated, always dynamic: never cache or prerender a preview.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Post preview",
  robots: { index: false, follow: false },
};

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Only signed-in team members may preview unpublished posts.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !isTeamRole(profile.role as UserRole)) notFound();

  const post = await getPostById(id);
  if (!post) notFound();

  const related = (await getPublishedPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return <BlogPostView post={post} related={related} isPreview />;
}
