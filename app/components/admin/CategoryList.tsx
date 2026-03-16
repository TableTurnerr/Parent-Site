"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2, FolderOpen } from "lucide-react";

interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  post_count: { count: number }[];
}

export default function CategoryList({
  categories,
}: {
  categories: CategoryRow[];
}) {
  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Delete category "${name}"? Posts in this category will not be deleted.`
      )
    )
      return;

    const supabase = createClient();

    // Remove junction entries first
    await supabase
      .from("blog_post_categories")
      .delete()
      .eq("category_id", id);

    await supabase.from("categories").delete().eq("id", id);

    router.refresh();
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white">
      {categories.length > 0 ? (
        <ul className="divide-y divide-[var(--color-border)]">
          {categories.map((cat) => {
            const count = cat.post_count?.[0]?.count ?? 0;
            return (
              <li
                key={cat.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-4 w-4 text-[var(--color-warm-gray-light)]" />
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)]">
                      {cat.name}
                    </p>
                    <p className="text-xs text-[var(--color-warm-gray-light)]">
                      /{cat.slug} &middot;{" "}
                      {count} {count === 1 ? "post" : "posts"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="rounded-lg p-1.5 text-[var(--color-warm-gray-light)] transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Delete category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="px-6 py-12 text-center text-sm text-[var(--color-warm-gray)]">
          No categories yet.
        </div>
      )}
    </div>
  );
}
