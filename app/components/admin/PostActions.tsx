"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import { Pencil, Trash2, Eye, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function PostActions({
  postId,
  status,
}: {
  postId: string;
  status: string;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    const supabase = createClient();

    // Delete junction table entries first
    await supabase
      .from("blog_post_categories")
      .delete()
      .eq("post_id", postId);

    await supabase.from("blog_posts").delete().eq("id", postId);

    router.refresh();
    setDeleting(false);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg">
          <Link
            href={`/admin/posts/${postId}/edit`}
            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-charcoal)] hover:bg-[var(--color-cream)]"
            onClick={() => setOpen(false)}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
          {status === "published" && (
            <a
              href={`/blog/${postId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-charcoal)] hover:bg-[var(--color-cream)]"
              onClick={() => setOpen(false)}
            >
              <Eye className="h-3.5 w-3.5" />
              View
            </a>
          )}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
