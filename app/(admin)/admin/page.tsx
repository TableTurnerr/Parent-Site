import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { FileText, FilePlus, Eye, Clock } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch post counts by status
  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: draftPosts },
    { count: scheduledPosts },
  ] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "scheduled"),
  ]);

  // Fetch recent drafts
  const { data: recentDrafts } = await supabase
    .from("blog_posts")
    .select("id, title, updated_at, status")
    .order("updated_at", { ascending: false })
    .limit(5);

  const stats = [
    {
      label: "Total Posts",
      value: totalPosts ?? 0,
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Published",
      value: publishedPosts ?? 0,
      icon: Eye,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Drafts",
      value: draftPosts ?? 0,
      icon: FilePlus,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Scheduled",
      value: scheduledPosts ?? 0,
      icon: Clock,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const statusColors: Record<string, string> = {
    draft: "bg-amber-100 text-amber-700",
    published: "bg-green-100 text-green-700",
    scheduled: "bg-purple-100 text-purple-700",
    archived: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            Welcome back. Here&apos;s what&apos;s happening with your blog.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
        >
          <FilePlus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[var(--color-border)] bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-[var(--color-warm-gray)]">
                  {stat.label}
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold text-[var(--color-charcoal)]">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent posts */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
            Recent Posts
          </h2>
          <Link
            href="/admin/posts"
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            View all
          </Link>
        </div>
        {recentDrafts && recentDrafts.length > 0 ? (
          <ul className="divide-y divide-[var(--color-border)]">
            {recentDrafts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-[var(--color-cream)]"
                >
                  <div className="flex-1">
                    <p className="font-medium text-[var(--color-charcoal)]">
                      {post.title || "Untitled"}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-warm-gray-light)]">
                      Updated{" "}
                      {new Date(post.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                      statusColors[post.status] ?? statusColors.draft
                    }`}
                  >
                    {post.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-[var(--color-border)]" />
            <p className="mt-3 text-sm text-[var(--color-warm-gray)]">
              No posts yet. Create your first post to get started.
            </p>
            <Link
              href="/admin/posts/new"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              <FilePlus className="h-4 w-4" />
              Create a post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
