"use client";

import { useState, useCallback, useEffect } from "react";
import { Pencil, X, Upload, Loader2 } from "lucide-react";
import { createClient } from "@/app/lib/supabase/client";
import UserAvatar from "@/app/components/ui/UserAvatar";

interface EditMemberDialogProps {
  userId: string;
  email: string;
  currentName: string | null;
  currentAvatarUrl: string | null;
  updateAction: (formData: FormData) => Promise<void>;
}

export default function EditMemberDialog({
  userId,
  email,
  currentName,
  currentAvatarUrl,
  updateAction,
}: EditMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentName ?? "");
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(currentName ?? "");
      setAvatarUrl(currentAvatarUrl ?? "");
      setError(null);
    }
  }, [open, currentName, currentAvatarUrl]);

  const uploadFile = useCallback(
    async (file: File) => {
      const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
      const ext = (file.name.split(".").pop() ?? "png").toLowerCase();
      const BLOCKED_EXTS = ["svg", "svgz", "xml", "html", "htm", "js", "php"];
      if (!ALLOWED_TYPES.includes(file.type) || BLOCKED_EXTS.includes(ext)) {
        setError("Please upload a JPEG, PNG, WebP, or AVIF image. SVG files are not allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be under 5MB.");
        return;
      }

      setUploading(true);
      setError(null);
      try {
        const supabase = createClient();
        const fileName = `${userId}-${Date.now()}.${ext}`;
        const filePath = `${userId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, { upsert: true });
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(filePath);

        setAvatarUrl(publicUrl);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed.";
        setError(msg);
      } finally {
        setUploading(false);
      }
    },
    [userId]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("user_id", userId);
      fd.set("full_name", name);
      fd.set("avatar_url", avatarUrl);
      await updateAction(fd);
      setOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Edit profile"
        className="flex cursor-pointer items-center justify-center rounded-full bg-gray-100 p-1.5 text-gray-600 transition-colors hover:bg-gray-200"
      >
        <Pencil className="h-3 w-3" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
          onClick={() => !saving && !uploading && setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-charcoal)]">
                  Edit profile
                </h3>
                <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">
                  {email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={saving || uploading}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <UserAvatar
                  src={avatarUrl || null}
                  name={name || email}
                  seed={userId}
                  size={64}
                />
                <div className="flex-1 space-y-2">
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-charcoal)] transition-colors hover:bg-gray-50">
                    {uploading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Upload className="h-3 w-3" />
                    )}
                    {uploading ? "Uploading..." : "Upload image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setAvatarUrl("")}
                      className="block text-xs text-red-600 hover:underline"
                    >
                      Remove avatar
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-warm-gray)]">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] outline-none focus:border-[var(--color-charcoal)]"
                  placeholder="User's display name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-warm-gray)]">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-xs text-[var(--color-charcoal)] outline-none focus:border-[var(--color-charcoal)]"
                  placeholder="https://..."
                />
                <p className="mt-1 text-[10px] text-[var(--color-warm-gray-light)]">
                  Leave blank to fall back to the generated avatar.
                </p>
              </div>

              {error && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={saving || uploading}
                className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex cursor-pointer items-center gap-1.5 rounded-md bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saving && <Loader2 className="h-3 w-3 animate-spin" />}
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
