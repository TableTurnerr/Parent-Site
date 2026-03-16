"use client";

import { useState, useTransition, useEffect, useRef, useCallback } from "react";
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
  Sparkles,
  Copy,
  Check,
  ClipboardPaste,
  Code,
  Search,
  ExternalLink,
  Type,
  SquareArrowOutUpRight,
  ImageIcon,
  Upload,
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
  const [editorTab, setEditorTab] = useState<"code" | "visual">("code");
  const visualRef = useRef<HTMLDivElement>(null);
  const [imageSearchQuery, setImageSearchQuery] = useState("");
  const [imageMoreOpen, setImageMoreOpen] = useState(false);
  const imageMoreRef = useRef<HTMLDivElement>(null);
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashMenuPos, setSlashMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const savedRangeRef = useRef<Range | null>(null);
  const slashMenuRef = useRef<HTMLDivElement>(null);
  const slashNodeRef = useRef<Text | null>(null);
  const [inlineUploading, setInlineUploading] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiIncludeContent, setAiIncludeContent] = useState(true);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiCopyStatus, setAiCopyStatus] = useState<"idle" | "copied">("idle");
  const [aiApplyStatus, setAiApplyStatus] = useState<"idle" | "applied" | "error">("idle");
  const [aiApplyError, setAiApplyError] = useState("");
  const [aiVariables, setAiVariables] = useState<{ name: string; label: string; value: string }[]>([]);
  const [aiParsedJson, setAiParsedJson] = useState<string>("");

  // ── LocalStorage persistence ──
  const DRAFT_KEY = `post-draft-${post.id}`;
  const [hasDraft, setHasDraft] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getDraftSnapshot = useCallback(() => ({
    title, slug, contentHtml, excerpt, featuredImage, featuredImageAlt,
    metaTitle, metaDescription, metaKeywords, ogImage, visibility,
    selectedCategories, imageSearchQuery, savedAt: Date.now(),
  }), [title, slug, contentHtml, excerpt, featuredImage, featuredImageAlt,
    metaTitle, metaDescription, metaKeywords, ogImage, visibility,
    selectedCategories, imageSearchQuery]);

  // Restore draft on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      if (!stored) return;
      const draft = JSON.parse(stored);
      if (!draft.savedAt) return;
      setTitle(draft.title ?? post.title);
      setSlug(draft.slug ?? post.slug);
      setContentHtml(draft.contentHtml ?? post.contentHtml);
      setExcerpt(draft.excerpt ?? post.excerpt);
      setFeaturedImage(draft.featuredImage ?? post.featuredImage);
      setFeaturedImageAlt(draft.featuredImageAlt ?? post.featuredImageAlt);
      setMetaTitle(draft.metaTitle ?? post.metaTitle);
      setMetaDescription(draft.metaDescription ?? post.metaDescription);
      setMetaKeywords(draft.metaKeywords ?? post.metaKeywords);
      setOgImage(draft.ogImage ?? post.ogImage);
      setVisibility(draft.visibility ?? post.visibility);
      setSelectedCategories(draft.selectedCategories ?? post.selectedCategoryIds);
      if (draft.imageSearchQuery) setImageSearchQuery(draft.imageSearchQuery);
      setHasDraft(true);
    } catch { /* ignore corrupt data */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save draft on changes (debounced 500ms)
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(getDraftSnapshot()));
        setHasDraft(true);
      } catch { /* storage full — ignore */ }
    }, 500);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [DRAFT_KEY, getDraftSnapshot]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY);
    setHasDraft(false);
  }, [DRAFT_KEY]);

  // ── Undo / Redo ──
  type EditorSnapshot = {
    title: string; slug: string; contentHtml: string; excerpt: string;
    featuredImage: string; featuredImageAlt: string; metaTitle: string;
    metaDescription: string; metaKeywords: string; ogImage: string;
    visibility: string; selectedCategories: string[]; imageSearchQuery: string;
  };
  const undoStackRef = useRef<EditorSnapshot[]>([]);
  const redoStackRef = useRef<EditorSnapshot[]>([]);
  const isRestoringRef = useRef(false);

  const captureSnapshot = useCallback((): EditorSnapshot => ({
    title, slug, contentHtml, excerpt, featuredImage, featuredImageAlt,
    metaTitle, metaDescription, metaKeywords, ogImage, visibility,
    selectedCategories, imageSearchQuery,
  }), [title, slug, contentHtml, excerpt, featuredImage, featuredImageAlt,
    metaTitle, metaDescription, metaKeywords, ogImage, visibility,
    selectedCategories, imageSearchQuery]);

  const pushUndo = useCallback(() => {
    const snap = captureSnapshot();
    undoStackRef.current = [...undoStackRef.current.slice(-49), snap];
    redoStackRef.current = [];
  }, [captureSnapshot]);

  const restoreSnapshot = useCallback((snap: EditorSnapshot) => {
    isRestoringRef.current = true;
    setTitle(snap.title);
    setSlug(snap.slug);
    setContentHtml(snap.contentHtml);
    setExcerpt(snap.excerpt);
    setFeaturedImage(snap.featuredImage);
    setFeaturedImageAlt(snap.featuredImageAlt);
    setMetaTitle(snap.metaTitle);
    setMetaDescription(snap.metaDescription);
    setMetaKeywords(snap.metaKeywords);
    setOgImage(snap.ogImage);
    setVisibility(snap.visibility);
    setSelectedCategories(snap.selectedCategories);
    setImageSearchQuery(snap.imageSearchQuery);
    requestAnimationFrame(() => { isRestoringRef.current = false; });
  }, []);

  const handleUndo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    const current = captureSnapshot();
    redoStackRef.current = [...redoStackRef.current, current];
    const prev = undoStackRef.current[undoStackRef.current.length - 1];
    undoStackRef.current = undoStackRef.current.slice(0, -1);
    restoreSnapshot(prev);
  }, [captureSnapshot, restoreSnapshot]);

  const handleRedo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    const current = captureSnapshot();
    undoStackRef.current = [...undoStackRef.current, current];
    const next = redoStackRef.current[redoStackRef.current.length - 1];
    redoStackRef.current = redoStackRef.current.slice(0, -1);
    restoreSnapshot(next);
  }, [captureSnapshot, restoreSnapshot]);

  // Auto-snapshot on field changes (debounced, skip during restore)
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSnapshotRef = useRef<string>("");
  useEffect(() => {
    if (isRestoringRef.current) return;
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => {
      const snap = captureSnapshot();
      const key = JSON.stringify(snap);
      if (key !== lastSnapshotRef.current) {
        if (lastSnapshotRef.current) {
          // Push the *previous* state so undo goes back to it
          const prev: EditorSnapshot = JSON.parse(lastSnapshotRef.current);
          undoStackRef.current = [...undoStackRef.current.slice(-49), prev];
          redoStackRef.current = [];
        }
        lastSnapshotRef.current = key;
      }
    }, 1000);
    return () => { if (undoTimerRef.current) clearTimeout(undoTimerRef.current); };
  }, [captureSnapshot]);

  // Global Ctrl+Z / Ctrl+Shift+Z listener
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Only intercept when not focused in a native textarea/input (let browser handle those)
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (
        (e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey ||
        (e.ctrlKey || e.metaKey) && e.key === "y"
      ) {
        e.preventDefault();
        handleRedo();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleUndo, handleRedo]);

  // Close "More" dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (imageMoreRef.current && !imageMoreRef.current.contains(e.target as Node)) {
        setImageMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      formData.set("visibility", visibility);
      formData.set("categories", selectedCategories.join(","));

      await updatePost(post.id, formData);
      clearDraft();
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
      formData.set("visibility", visibility);
      formData.set("categories", selectedCategories.join(","));

      await updatePost(post.id, formData);
      await publishPost(post.id);
      clearDraft();
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

  const previewWinRef = useRef<Window | null>(null);

  const openPreviewTab = () => {
    // Reuse existing window if still open
    if (previewWinRef.current && !previewWinRef.current.closed) {
      previewWinRef.current.focus();
      return;
    }
    const win = window.open("", "_blank");
    if (!win) return;
    previewWinRef.current = win;
    win.document.write(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Preview</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:system-ui,-apple-system,sans-serif;color:#1A1A1A;background:#FAFAF8;padding:3rem 1.5rem;max-width:720px;margin:0 auto;line-height:1.7}
  h1#p-title{font-family:var(--font-satoshi),system-ui,sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;margin-bottom:0.5rem;line-height:1.1;letter-spacing:-0.025em}
  .meta{font-size:0.875rem;color:#6B6560;margin-bottom:2rem}
  #p-hero{max-width:100%;border-radius:0.75rem;margin:0 0 1.5rem 0;display:none}
  img{max-width:100%;border-radius:0.75rem;margin:1.5rem 0}
  h2{font-size:1.5rem;font-weight:700;margin:2rem 0 0.75rem}
  h3{font-size:1.25rem;font-weight:600;margin:1.5rem 0 0.5rem}
  p{margin-bottom:1rem}
  a{color:#C8553D}
  ul,ol{margin:0 0 1rem 1.5rem}
  li{margin-bottom:0.25rem}
  blockquote{border-left:3px solid #E8E5DF;padding-left:1rem;margin:1.5rem 0;color:#6B6560;font-style:italic}
  pre{background:#F2F0EB;padding:1rem;border-radius:0.5rem;overflow-x:auto;margin:1.5rem 0;font-size:0.875rem}
  code{font-size:0.875rem}
  hr{border:none;border-top:1px solid #E8E5DF;margin:2rem 0}
  .live-badge{position:fixed;top:12px;right:12px;background:#1A1A1A;color:#FAFAF8;font-size:11px;font-weight:600;padding:4px 10px;border-radius:999px;display:flex;align-items:center;gap:6px;z-index:99}
  .live-badge::before{content:"";width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulse-dot 2s ease-in-out infinite}
  @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.4}}
</style>
</head><body>
<div class="live-badge">Live Preview</div>
<img id="p-hero" src="" alt="">
<h1 id="p-title"></h1>
<p id="p-excerpt" class="meta"></p>
<hr>
<div id="p-content"></div>
<script>
window.addEventListener("message",function(e){
  if(!e.data||e.data.type!=="post-preview-update")return;
  var d=e.data;
  document.title=d.title||"Preview";
  document.getElementById("p-title").textContent=d.title||"Untitled";
  document.getElementById("p-excerpt").textContent=d.excerpt||"";
  document.getElementById("p-content").innerHTML=d.contentHtml||"<p>No content yet.</p>";
  var hero=document.getElementById("p-hero");
  if(d.featuredImage){hero.src=d.featuredImage;hero.alt=d.featuredImageAlt||d.title||"";hero.style.display="block"}
  else{hero.style.display="none"}
});
</script>
</body></html>`);
    win.document.close();
    // Send initial data after a tick so the listener is ready
    setTimeout(() => sendPreviewUpdate(win), 50);
  };

  const sendPreviewUpdate = useCallback((win?: Window | null) => {
    const target = win || previewWinRef.current;
    if (!target || target.closed) return;
    target.postMessage({
      type: "post-preview-update",
      title,
      excerpt,
      contentHtml,
      featuredImage,
      featuredImageAlt,
    }, "*");
  }, [title, excerpt, contentHtml, featuredImage, featuredImageAlt]);

  // Push live updates to preview window
  useEffect(() => {
    sendPreviewUpdate();
  }, [sendPreviewUpdate]);

  // --- /image slash command logic ---
  const handleVisualInput = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE) return;
    const text = node.textContent || "";
    const cursorOffset = range.startOffset;
    // Check if the text right before the cursor ends with "/image"
    const before = text.slice(0, cursorOffset);
    if (before.endsWith("/image")) {
      // Save cursor range & text node for later insertion
      savedRangeRef.current = range.cloneRange();
      slashNodeRef.current = node as Text;
      // Get position for popup
      const rect = range.getBoundingClientRect();
      const editorRect = visualRef.current?.getBoundingClientRect();
      if (editorRect) {
        setSlashMenuPos({
          top: rect.bottom - editorRect.top + 4,
          left: rect.left - editorRect.left,
        });
      }
      setSlashMenuOpen(true);
    } else if (slashMenuOpen) {
      setSlashMenuOpen(false);
    }
  }, [slashMenuOpen]);

  const insertImageAtCursor = useCallback((url: string) => {
    const editor = visualRef.current;
    if (!editor) return;

    const node = slashNodeRef.current;
    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    img.style.maxWidth = "100%";
    img.style.borderRadius = "0.75rem";
    img.style.margin = "1rem 0";
    img.style.display = "block";

    if (node && node.textContent) {
      const text = node.textContent;
      const idx = text.lastIndexOf("/image");
      if (idx !== -1) {
        // Split: text before "/image" | image element | text after "/image"
        const before = text.slice(0, idx);
        const after = text.slice(idx + 6);
        const parent = node.parentNode;
        if (parent) {
          // Replace the text node with: beforeText + <img> + afterText
          const beforeNode = document.createTextNode(before);
          const afterNode = document.createTextNode(after);
          parent.insertBefore(beforeNode, node);
          parent.insertBefore(img, node);
          parent.insertBefore(afterNode, node);
          parent.removeChild(node);
          // Place cursor after the image
          const sel = window.getSelection();
          if (sel) {
            const range = document.createRange();
            range.setStart(afterNode, 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
    } else {
      // Fallback: append to editor
      editor.appendChild(img);
    }

    setContentHtml(editor.innerHTML);
    setSlashMenuOpen(false);
    savedRangeRef.current = null;
    slashNodeRef.current = null;
  }, []);

  const handleInlineImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }
    setInlineUploading(true);
    try {
      const { createClient } = await import("@/app/lib/supabase/client");
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const filePath = `posts/${fileName}`;
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("blog-images").getPublicUrl(filePath);
      insertImageAtCursor(publicUrl);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image.");
    } finally {
      setInlineUploading(false);
    }
  }, [insertImageAtCursor]);

  // Close slash menu on click outside
  useEffect(() => {
    if (!slashMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(e.target as Node)) {
        setSlashMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [slashMenuOpen]);

  // Close slash menu on Escape
  useEffect(() => {
    if (!slashMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSlashMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [slashMenuOpen]);

  const handleEditorTabSwitch = (tab: "code" | "visual") => {
    // Sync visual editor content back to state when leaving visual mode
    if (editorTab === "visual" && visualRef.current) {
      setContentHtml(visualRef.current.innerHTML);
    }
    // When entering visual, set the innerHTML
    if (tab === "visual") {
      requestAnimationFrame(() => {
        if (visualRef.current) {
          visualRef.current.innerHTML = contentHtml;
        }
      });
    }
    setEditorTab(tab);
  };

  const buildAiPrompt = () => {
    const categoryNames = categories.map((c) => c.name);
    const selectedCatNames = categories
      .filter((c) => selectedCategories.includes(c.id))
      .map((c) => c.name);

    const contextBlock = aiIncludeContent
      ? `Here is the current state of the post:

---
CURRENT POST DATA:
- Title: ${title || "(empty)"}
- Slug: ${slug || "(empty)"}
- Excerpt: ${excerpt || "(empty)"}
- Content (HTML): ${contentHtml ? contentHtml.slice(0, 3000) + (contentHtml.length > 3000 ? "\n...(truncated)" : "") : "(empty)"}
- Featured Image Alt: ${featuredImageAlt || "(empty)"}
- Meta Title: ${metaTitle || "(empty)"}
- Meta Description: ${metaDescription || "(empty)"}
- Meta Keywords: ${metaKeywords || "(empty)"}
- OG Image URL: ${ogImage || "(empty)"}
- Visibility: ${visibility}
- Selected Categories: ${selectedCatNames.length > 0 ? selectedCatNames.join(", ") : "(none)"}
- Available Categories: ${categoryNames.join(", ")}
---`
      : `Available Categories: ${categoryNames.join(", ")}`;

    return `You are a blog post assistant for TableTurnerr, a restaurant marketing agency. I need help with a blog post. ${contextBlock}

MY REQUEST:
${aiPrompt}

---
INSTRUCTIONS:
Respond with ONLY a valid JSON object (no markdown, no code fences, no explanation). Only include fields you want to set or change. Use this exact schema:

{
  "title": "string — post title",
  "slug": "string — URL-safe slug",
  "excerpt": "string — 1-2 sentence summary for listing cards",
  "content_html": "string — full post body in valid HTML",
  "featured_image_alt": "string — descriptive alt text for the featured image",
  "meta_title": "string — SEO title, max 60 chars",
  "meta_description": "string — SEO description, max 160 chars",
  "meta_keywords": "string — comma-separated keywords",
  "og_image": "string — URL for social share image",
  "visibility": "public | unlisted | private",
  "categories": ["array of category names from the available list"],
  "image_search_query": "string — a short search query (2-5 words) to find a relevant featured image on stock photo sites like Unsplash or Pexels"
}

VARIABLE PLACEHOLDERS:
For any values that depend on context and should be customized — such as city names, business names, specific dates, phone numbers, addresses, or any location/client-specific detail — use curly brace placeholders like {city_name}, {business_name}, {phone_number}, {target_area}, etc. Use descriptive snake_case names so the user knows what to fill in. Do NOT hardcode these — always use placeholders so the content can be personalized.

IMPORTANT: Respond with ONLY the JSON object. No text before or after it. Only include fields you are changing or filling — omit fields you are leaving as-is.`;
  };

  const handleCopyPrompt = async () => {
    const prompt = buildAiPrompt();
    try {
      await navigator.clipboard.writeText(prompt);
      setAiCopyStatus("copied");
      setTimeout(() => setAiCopyStatus("idle"), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setAiCopyStatus("copied");
      setTimeout(() => setAiCopyStatus("idle"), 2000);
    }
  };

  const cleanAiJson = (raw: string): string => {
    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }
    return cleaned;
  };

  const extractVariables = (jsonStr: string): string[] => {
    const matches = jsonStr.match(/\{([a-z][a-z0-9_]*)\}/gi);
    if (!matches) return [];
    const unique = [...new Set(matches.map((m) => m.slice(1, -1)))];
    return unique;
  };

  const variableToLabel = (name: string): string => {
    return name
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const handleParseResponse = () => {
    setAiApplyError("");
    setAiApplyStatus("idle");
    setAiVariables([]);

    const cleaned = cleanAiJson(aiResponse);

    // Validate JSON first
    try {
      JSON.parse(cleaned);
    } catch {
      setAiApplyStatus("error");
      setAiApplyError("Invalid JSON. Make sure you pasted the AI's entire response.");
      return;
    }

    setAiParsedJson(cleaned);

    // Detect variables
    const vars = extractVariables(cleaned);
    if (vars.length > 0) {
      setAiVariables(vars.map((name) => ({ name, label: variableToLabel(name), value: "" })));
    } else {
      // No variables — apply directly
      applyJsonToFields(cleaned);
    }
  };

  const handleApplyWithVariables = () => {
    const unanswered = aiVariables.filter((v) => !v.value.trim());
    if (unanswered.length > 0) {
      setAiApplyError(`Please fill in all fields before applying.`);
      return;
    }
    setAiApplyError("");

    let substituted = aiParsedJson;
    for (const v of aiVariables) {
      // Escape regex special chars in variable name
      const escaped = v.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      substituted = substituted.replace(new RegExp(`\\{${escaped}\\}`, "g"), v.value);
    }

    applyJsonToFields(substituted);
  };

  const applyJsonToFields = (jsonStr: string) => {
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      setAiApplyStatus("error");
      setAiApplyError("Failed to parse JSON after variable substitution.");
      return;
    }

    // Snapshot before bulk AI changes so Ctrl+Z can undo the whole apply
    pushUndo();

    if (typeof parsed.title === "string") setTitle(parsed.title);
    if (typeof parsed.slug === "string") setSlug(parsed.slug);
    if (typeof parsed.excerpt === "string") setExcerpt(parsed.excerpt);
    if (typeof parsed.content_html === "string") setContentHtml(parsed.content_html);
    if (typeof parsed.featured_image_alt === "string") setFeaturedImageAlt(parsed.featured_image_alt);
    if (typeof parsed.meta_title === "string") setMetaTitle(parsed.meta_title);
    if (typeof parsed.meta_description === "string") setMetaDescription(parsed.meta_description);
    if (typeof parsed.meta_keywords === "string") setMetaKeywords(parsed.meta_keywords);
    if (typeof parsed.og_image === "string") setOgImage(parsed.og_image);
    if (typeof parsed.visibility === "string") setVisibility(parsed.visibility);
    if (typeof parsed.image_search_query === "string") setImageSearchQuery(parsed.image_search_query);

    if (Array.isArray(parsed.categories)) {
      const catNameToId = new Map(categories.map((c) => [c.name.toLowerCase(), c.id]));
      const matched = (parsed.categories as string[])
        .map((name) => catNameToId.get(name.toLowerCase()))
        .filter((id): id is string => !!id);
      if (matched.length > 0) setSelectedCategories(matched);
    }

    setAiVariables([]);
    setAiApplyStatus("applied");
    setTimeout(() => setAiApplyStatus("idle"), 3000);
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
          {!saveStatus && hasDraft && (
            <span className="text-xs text-[var(--color-warm-gray-light)]">
              Unsaved changes
            </span>
          )}
          {canEdit && (
            <button
              onClick={handleSave}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)] disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </button>
          )}
          {canPublish && post.status === "published" ? (
            <button
              onClick={handleUnpublish}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
            >
              <EyeOff className="h-4 w-4" />
              Unpublish
            </button>
          ) : canPublish ? (
            <button
              onClick={handlePublish}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Publish
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main editor */}
        <div className="space-y-4">
          {/* Title */}
          <textarea
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              // Auto-resize
              const el = e.target;
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }}
            onInput={(e) => {
              const el = e.target as HTMLTextAreaElement;
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }}
            ref={(el) => {
              if (el) {
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }
            }}
            placeholder="Post title..."
            rows={1}
            className="w-full resize-none overflow-hidden border-0 bg-transparent font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:outline-none"
          />

          {/* Content editor with preview */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <div className="flex items-center border-b border-[var(--color-border)] px-2 py-1.5">
              <div className="flex items-center gap-1">
                {([
                  { key: "code" as const, label: "HTML", icon: Code },
                  { key: "visual" as const, label: "Visual", icon: Type },
                ]).map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => handleEditorTabSwitch(tab.key)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        editorTab === tab.key
                          ? "bg-[var(--color-charcoal)] text-white"
                          : "text-[var(--color-warm-gray)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
                      }`}
                    >
                      <TabIcon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex-1" />
              <button
                onClick={openPreviewTab}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-[#9E9890] transition-colors hover:bg-[#F2F0EB] hover:text-[#1A1A1A]"
              >
                Live Preview
                <SquareArrowOutUpRight className="h-3 w-3" />
              </button>
            </div>

            {editorTab === "code" && (
              <textarea
                value={contentHtml}
                onChange={(e) => setContentHtml(e.target.value)}
                placeholder="Write your post content in HTML..."
                className="min-h-[500px] w-full resize-y bg-transparent px-4 py-3 font-mono text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:outline-none"
              />
            )}

            {editorTab === "visual" && (
              <div className="relative">
                <div
                  ref={visualRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleVisualInput}
                  onBlur={() => {
                    if (visualRef.current) setContentHtml(visualRef.current.innerHTML);
                  }}
                  className="prose prose-sm min-h-[500px] max-w-none px-4 py-3 text-[var(--color-charcoal)] prose-headings:text-[var(--color-charcoal)] prose-a:text-[var(--color-accent)] prose-strong:text-[var(--color-charcoal)] prose-img:rounded-lg focus:outline-none"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                {/* /image slash command popup */}
                {slashMenuOpen && (
                  <div
                    ref={slashMenuRef}
                    className="absolute z-50 w-64 rounded-lg border border-[var(--color-border)] bg-white shadow-lg"
                    style={{ top: slashMenuPos.top, left: slashMenuPos.left }}
                  >
                    <div className="border-b border-[var(--color-border)] px-3 py-2">
                      <p className="text-xs font-medium text-[var(--color-warm-gray)]">Insert</p>
                    </div>
                    {inlineUploading ? (
                      <div className="flex items-center justify-center gap-2 px-3 py-4">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-charcoal)] border-t-transparent" />
                        <span className="text-xs text-[var(--color-warm-gray)]">Uploading...</span>
                      </div>
                    ) : (
                      <div className="p-1.5">
                        <label className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream)]">
                          <Upload className="h-4 w-4 text-[var(--color-warm-gray)]" />
                          Upload image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleInlineImageUpload(file);
                            }}
                          />
                        </label>
                        <button
                          onClick={() => {
                            const url = prompt("Enter image URL:");
                            if (url?.trim()) {
                              insertImageAtCursor(url.trim());
                            }
                          }}
                          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream)]"
                        >
                          <ImageIcon className="h-4 w-4 text-[var(--color-warm-gray)]" />
                          Paste image URL
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Talk to AI */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <button
              onClick={() => setAiOpen(!aiOpen)}
              className="flex w-full items-center justify-between p-4 transition-colors hover:bg-[var(--color-cream)]"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--color-warm-gray)]" />
                <span className="text-sm font-medium text-[var(--color-charcoal)]">
                  Talk to AI
                </span>
              </div>
              {aiOpen ? (
                <ChevronUp className="h-4 w-4 text-[var(--color-warm-gray)]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[var(--color-warm-gray)]" />
              )}
            </button>

            {aiOpen && (
              <div className="space-y-4 border-t border-[var(--color-border)] p-4">
                <p className="text-xs text-[var(--color-warm-gray)]">
                  Write an instruction, copy the generated prompt, paste it into
                  any AI chat, then paste the AI&apos;s JSON response back here to
                  auto-fill fields.
                </p>

                {/* Step 1: User instruction */}
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-[var(--color-charcoal)]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[10px] font-bold text-white">
                      1
                    </span>
                    Your instruction
                  </label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. Write SEO metadata and an excerpt for this post..."
                    rows={3}
                    className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
                  />
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={handleCopyPrompt}
                      disabled={!aiPrompt.trim()}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)] disabled:opacity-20"
                    >
                      {aiCopyStatus === "copied" ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy Prompt
                        </>
                      )}
                    </button>
                    <label className="flex items-center gap-1.5 text-xs text-[var(--color-warm-gray)]">
                      <input
                        type="checkbox"
                        checked={aiIncludeContent}
                        onChange={(e) => setAiIncludeContent(e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-[var(--color-border)] accent-[var(--color-charcoal)]"
                      />
                      Include current content
                    </label>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[var(--color-border)]" />
                  <span className="text-xs text-[var(--color-warm-gray-light)]">
                    paste into any AI chat, then
                  </span>
                  <div className="h-px flex-1 bg-[var(--color-border)]" />
                </div>

                {/* Step 2: Paste response */}
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-[var(--color-charcoal)]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[10px] font-bold text-white">
                      2
                    </span>
                    Paste AI response
                  </label>
                  <textarea
                    value={aiResponse}
                    onChange={(e) => {
                      setAiResponse(e.target.value);
                      setAiApplyStatus("idle");
                      setAiApplyError("");
                      setAiVariables([]);
                    }}
                    placeholder='{"title": "...", "excerpt": "...", ...}'
                    rows={6}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 font-mono text-xs text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
                  />

                  {aiApplyError && (
                    <p className="mt-1 text-xs text-red-600">{aiApplyError}</p>
                  )}

                  {aiApplyStatus === "applied" && (
                    <p className="mt-1 text-xs text-green-600">
                      Fields updated successfully. Review and save when ready.
                    </p>
                  )}

                  {/* No variables detected yet — show parse button */}
                  {aiVariables.length === 0 && aiApplyStatus !== "applied" && (
                    <button
                      onClick={handleParseResponse}
                      disabled={!aiResponse.trim()}
                      className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)] disabled:opacity-40"
                    >
                      <ClipboardPaste className="h-3.5 w-3.5" />
                      Apply to Post
                    </button>
                  )}
                </div>

                {/* Step 3: Fill in variables (only shown when variables are detected) */}
                {aiVariables.length > 0 && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-[var(--color-border)]" />
                      <span className="text-xs text-[var(--color-warm-gray-light)]">
                        fill in the details
                      </span>
                      <div className="h-px flex-1 bg-[var(--color-border)]" />
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--color-charcoal)]">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[10px] font-bold text-white">
                          3
                        </span>
                        Customize variables
                      </label>
                      <p className="mb-3 text-xs text-[var(--color-warm-gray)]">
                        The AI used placeholders for context-specific details. Fill them in below.
                      </p>
                      <div className="space-y-2.5">
                        {aiVariables.map((variable, idx) => (
                          <div key={variable.name} className="flex items-center gap-2">
                            <label className="w-28 shrink-0 truncate text-right text-xs font-medium text-[var(--color-charcoal)]" title={variable.label}>
                              {variable.label}
                            </label>
                            <input
                              type="text"
                              value={variable.value}
                              onChange={(e) => {
                                setAiVariables((prev) =>
                                  prev.map((v, i) =>
                                    i === idx ? { ...v, value: e.target.value } : v
                                  )
                                );
                                setAiApplyError("");
                              }}
                              placeholder={`Enter ${variable.label.toLowerCase()}...`}
                              className="flex-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleApplyWithVariables}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Apply to Post
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
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
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
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
            {imageSearchQuery && !featuredImage && (
              <div className="mt-3 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-cream)] p-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[var(--color-charcoal)]">
                  <Sparkles className="h-3 w-3" />
                  AI recommended search
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(imageSearchQuery);
                      } catch {
                        const el = document.createElement("textarea");
                        el.value = imageSearchQuery;
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand("copy");
                        document.body.removeChild(el);
                      }
                    }}
                    className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[var(--color-border)] bg-white px-2.5 py-1.5 text-xs font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)]"
                    title="Copy search query"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </button>
                  <a
                    href={`https://unsplash.com/s/photos/${encodeURIComponent(imageSearchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[var(--color-charcoal)] px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
                  >
                    Unsplash
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                  <div className="relative" ref={imageMoreRef}>
                    <button
                      onClick={() => setImageMoreOpen(!imageMoreOpen)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[var(--color-border)] bg-white px-2.5 py-1.5 text-xs font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)]"
                    >
                      More
                      <ChevronDown className={`h-3 w-3 transition-transform ${imageMoreOpen ? "rotate-180" : ""}`} />
                    </button>
                    {imageMoreOpen && (
                      <div className="absolute right-0 top-full z-10 mt-1 w-36 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg">
                        {[
                          { label: "Pexels", url: `https://www.pexels.com/search/${encodeURIComponent(imageSearchQuery)}/` },
                          { label: "Freepik", url: `https://www.freepik.com/search?format=search&query=${encodeURIComponent(imageSearchQuery)}` },
                          { label: "Pixabay", url: `https://pixabay.com/images/search/${encodeURIComponent(imageSearchQuery)}/` },
                          { label: "Burst", url: `https://www.shopify.com/stock-photos/photos/${encodeURIComponent(imageSearchQuery.replace(/\s+/g, "-"))}` },
                          { label: "StockSnap", url: `https://stocksnap.io/search/${encodeURIComponent(imageSearchQuery)}` },
                        ].map((site) => (
                          <a
                            key={site.label}
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setImageMoreOpen(false)}
                            className="flex items-center justify-between px-3 py-2 text-xs text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream)]"
                          >
                            {site.label}
                            <ExternalLink className="h-2.5 w-2.5 text-[var(--color-warm-gray-light)]" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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

          {/* Visibility */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Visibility
            </label>
            <div className="space-y-2">
              {(Object.keys(VISIBILITY_LABELS) as Array<keyof typeof VISIBILITY_LABELS>).map((key) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                    visibility === key
                      ? "border-[var(--color-charcoal)] bg-[var(--color-cream)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-warm-gray)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value={key}
                    checked={visibility === key}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-charcoal)]">
                      {VISIBILITY_LABELS[key]}
                    </p>
                    <p className="text-xs text-[var(--color-warm-gray-light)]">
                      {VISIBILITY_DESCRIPTIONS[key]}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* SEO Settings */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <button
              onClick={() => setSeoOpen(!seoOpen)}
              className="flex w-full items-center justify-between p-4 transition-colors hover:bg-[var(--color-cream)]"
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
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
