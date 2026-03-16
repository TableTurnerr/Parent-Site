"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  updatePost,
  publishPost,
  unpublishPost,
  deletePost,
} from "@/app/(admin)/admin/posts/actions";
import {
  Save,
  Eye,
  Send,
  ArrowLeft,
  Trash2,
  ChevronDown,
  ChevronUp,
  Globe,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import ImageUploader from "./ImageUploader";

import { VISIBILITY_LABELS, VISIBILITY_DESCRIPTIONS, hasRole } from "@/app/lib/supabase/types";
import type { UserRole } from "@/app/lib/supabase/types";

interface PostData {
  id: string;
  title: string;
  slug: string;
  contentHtml: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  status: string;
  visibility: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  selectedCategoryIds: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function PostEditor({
  post,
  categories,
  userRole = "editor",
}: {
  post: PostData;
  categories: Category[];
  userRole?: UserRole;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [seoOpen, setSeoOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [contentHtml, setContentHtml] = useState(post.contentHtml);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [featuredImage, setFeaturedImage] = useState(post.featuredImage);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(
    post.featuredImageAlt
  );
  const [metaTitle, setMetaTitle] = useState(post.metaTitle);
  const [metaDescription, setMetaDescription] = useState(
    post.metaDescription
  );
  const [metaKeywords, setMetaKeywords] = useState(post.metaKeywords);
  const [ogImage, setOgImage] = useState(post.ogImage);
  const [visibility, setVisibility] = useState(post.visibility);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post.selectedCategoryIds
  );
  const [saveStatus, setSaveStatus] = useState<string>("");

  const canEdit = hasRole(userRole, "editor");
  const canPublish = hasRole(userRole, "manager");
  const canDelete = hasRole(userRole, "manager");

  const handleSave = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("slug", slug);
      formData.set("content_html", contentHtml);
      formData.set("excerpt", excerpt);
      formData.set("featured_image", featuredImage);
      formData.set("featured_image_alt", featuredImageAlt);
      formData.set("meta_title", metaTitle);
      formData.set("meta_description", metaDescription);
      formData.set("meta_keywords", metaKeywords);
      formData.set("og_image", ogImage);
      formData.set("categories", selectedCategories.join(","));

      await updatePost(post.id, formData);
      setSaveStatus("Saved!");
      setTimeout(() => setSaveStatus(""), 2000);
    });
  };

  const handlePublish = () => {
    startTransition(async () => {
      // Save first, then publish
      const formData = new FormData();
      formData.set("title", title);
      formData.set("slug", slug);
      formData.set("content_html", contentHtml);
      formData.set("excerpt", excerpt);
      formData.set("featured_image", featuredImage);
      formData.set("featured_image_alt", featuredImageAlt);
      formData.set("meta_title", metaTitle);
      formData.set("meta_description", metaDescription);
      formData.set("meta_keywords", metaKeywords);
      formData.set("og_image", ogImage);
      formData.set("categories", selectedCategories.join(","));

      await updatePost(post.id, formData);
      await publishPost(post.id);
      router.refresh();
    });
  };

  const handleUnpublish = () => {
    startTransition(async () => {
      await unpublishPost(post.id);
      router.refresh();
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    startTransition(async () => {
      await deletePost(post.id);
    });
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const autoSlug = () => {
    setSlug(
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80)
    );
  };

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="rounded-lg p-2 text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-[var(--color-charcoal)]">
              Edit Post
            </h1>
            <span
              className={`text-xs font-medium capitalize ${
                post.status === "published"
                  ? "text-green-600"
                  : post.status === "scheduled"
                    ? "text-purple-600"
                    : "text-amber-600"
              }`}
            >
              {post.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="text-sm text-green-600">{saveStatus}</span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </button>
          {post.status === "published" ? (
            <button
              onClick={handleUnpublish}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
            >
              <EyeOff className="h-4 w-4" />
              Unpublish
            </button>
          ) : (
            <button
              onClick={handlePublish}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Publish
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main editor */}
        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full border-0 bg-transparent text-3xl font-bold text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:outline-none"
          />

          {/* Content editor */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <div className="border-b border-[var(--color-border)] px-4 py-2">
              <span className="text-xs font-medium text-[var(--color-warm-gray)]">
                HTML Content
              </span>
            </div>
            <textarea
              value={contentHtml}
              onChange={(e) => setContentHtml(e.target.value)}
              placeholder="Write your post content in HTML..."
              className="min-h-[500px] w-full resize-y bg-transparent px-4 py-3 font-mono text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:outline-none"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Slug */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              URL Slug
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
              />
              <button
                onClick={autoSlug}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium text-[var(--color-warm-gray)] hover:bg-[var(--color-cream-dark)]"
                title="Generate from title"
              >
                Auto
              </button>
            </div>
            <p className="mt-1 text-xs text-[var(--color-warm-gray-light)]">
              /blog/{slug || "..."}
            </p>
          </div>

          {/* Excerpt */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary for listing cards..."
              rows={3}
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
            />
          </div>

          {/* Featured Image */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Featured Image
            </label>
            <ImageUploader
              value={featuredImage}
              onChange={setFeaturedImage}
            />
            {featuredImage && (
              <input
                type="text"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Alt text for image..."
                className="mt-2 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
              />
            )}
          </div>

          {/* Categories */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedCategories.includes(cat.id)
                      ? "bg-[var(--color-charcoal)] text-white"
                      : "border border-[var(--color-border)] text-[var(--color-warm-gray)] hover:border-[var(--color-charcoal)]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* SEO Settings */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <button
              onClick={() => setSeoOpen(!seoOpen)}
              className="flex w-full items-center justify-between p-4"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                SEO Settings
              </span>
              {seoOpen ? (
                <ChevronUp className="h-4 w-4 text-[var(--color-warm-gray)]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[var(--color-warm-gray)]" />
              )}
            </button>
            {seoOpen && (
              <div className="space-y-3 border-t border-[var(--color-border)] p-4">
                <div>
                  <label className="mb-1 block text-xs text-[var(--color-warm-gray)]">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO title override..."
                    className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
                  />
                  <p className="mt-0.5 text-xs text-[var(--color-warm-gray-light)]">
                    {(metaTitle || title).length}/60 characters
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-[var(--color-warm-gray)]">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="SEO description..."
                    rows={2}
                    className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
                  />
                  <p className="mt-0.5 text-xs text-[var(--color-warm-gray-light)]">
                    {metaDescription.length}/160 characters
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-[var(--color-warm-gray)]">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    placeholder="restaurant SEO, local SEO..."
                    className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-[var(--color-warm-gray)]">
                    OG Image URL
                  </label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder="Custom social share image..."
                    className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview link */}
          {post.status === "published" && slug && (
            <a
              href={`/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)]"
            >
              <Globe className="h-4 w-4" />
              View Published Post
            </a>
          )}

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}
