"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/(admin)/admin/posts/actions";
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
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    try {
      // Goes through the server action: it authorizes the delete and uses the
      // service role to actually remove the row (the table's RLS only lets
      // admins DELETE, which otherwise silently no-ops for authors).
      await deletePost(postId);
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the post.");
    } finally {
      setDeleting(false);
    }
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
          {error && (
            <p className="px-3 py-2 text-xs text-red-600">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
