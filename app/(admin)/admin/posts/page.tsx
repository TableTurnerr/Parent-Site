import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { FilePlus, Search } from "lucide-react";
import PostActions from "@/app/components/admin/PostActions";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const statusFilter = params.status ?? "all";
  const searchQuery = params.q ?? "";

  let query = supabase
    .from("blog_posts")
    .select(
      `
      id, title, slug, status, published_at, updated_at, excerpt,
      author:profiles!blog_posts_author_id_fkey(full_name, avatar_url),
      categories:blog_post_categories(category:categories(name, slug))
    `
    )
    .order("updated_at", { ascending: false });

  if (statusFilter !== "all") {
    query = query.eq(
      "status",
      statusFilter as "draft" | "published" | "scheduled" | "archived"
    );
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data: posts } = await query;

  const statusTabs = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Drafts" },
    { key: "scheduled", label: "Scheduled" },
  ];

  const statusColors: Record<string, string> = {
    draft: "bg-amber-100 text-amber-700",
    published: "bg-green-100 text-green-700",
    scheduled: "bg-purple-100 text-purple-700",
    archived: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">
            Posts
          </h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            Manage and organize your blog content.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-charcoal)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)] w-full sm:w-auto"
        >
          <FilePlus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1 overflow-x-auto">
          {statusTabs.map((tab) => (
            <Link
              key={tab.key}
              href={`/admin/posts${tab.key === "all" ? "" : `?status=${tab.key}`}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === tab.key
                  ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                  : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <form className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-warm-gray-light)]" />
          <input
            type="search"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search posts..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2 pl-10 pr-4 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none sm:w-64"
          />
        </form>
      </div>

      {/* Posts table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-x-auto">
        {posts && posts.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Title
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] md:table-cell">
                  Author
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] sm:table-cell">
                  Status
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] lg:table-cell">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {posts.map((post) => {
                const author = Array.isArray(post.author)
                  ? post.author[0]
                  : post.author;
                return (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-[var(--color-cream)]"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-accent)]"
                      >
                        {post.title || "Untitled"}
                      </Link>
                      {post.excerpt && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-warm-gray-light)]">
                          {post.excerpt}
                        </p>
                      )}
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      <span className="text-sm text-[var(--color-warm-gray)]">
                        {author?.full_name ?? "Unknown"}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          statusColors[post.status] ?? statusColors.draft
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell">
                      <span className="text-sm text-[var(--color-warm-gray-light)]">
                        {new Date(
                          post.published_at ?? post.updated_at
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <PostActions postId={post.id} status={post.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-[var(--color-warm-gray)]">
              {searchQuery
                ? `No posts found matching "${searchQuery}"`
                : "No posts yet. Create your first one!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
