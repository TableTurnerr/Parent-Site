"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { Upload, X, ImageIcon } from "lucide-react";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (JPEG, PNG, WebP)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be under 5MB");
        return;
      }

      setUploading(true);
      try {
        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const filePath = `posts/${fileName}`;

        const { error } = await supabase.storage
          .from("blog-images")
          .upload(filePath, file, { upsert: true });

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from("blog-images").getPublicUrl(filePath);

        onChange(publicUrl);
      } catch (err) {
        console.error("Upload error:", err);
        alert("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  if (value) {
    return (
      <div className="relative">
        <img
          src={value}
          alt="Featured"
          className="w-full rounded-lg object-cover"
          style={{ maxHeight: 200 }}
        />
        <button
          onClick={() => onChange("")}
          className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black/80"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
        dragOver
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
          : "border-[var(--color-border)] hover:border-[var(--color-warm-gray)]"
      }`}
    >
      {uploading ? (
        <>
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-charcoal)] border-t-transparent" />
          <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
            Uploading...
          </p>
        </>
      ) : (
        <>
          <ImageIcon className="h-8 w-8 text-[var(--color-border)]" />
          <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
            Drag & drop or{" "}
            <label className="cursor-pointer font-medium text-[var(--color-accent)] hover:underline">
              browse
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </p>
          <p className="mt-1 text-xs text-[var(--color-warm-gray-light)]">
            JPEG, PNG, WebP up to 5MB
          </p>
        </>
      )}
    </div>
  );
}
