import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CategoryList from "@/app/components/admin/CategoryList";

async function createCategory(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  if (!name) return;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  await supabase.from("categories").insert({ name, slug });
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select(
      `
      *,
      post_count:blog_post_categories(count)
    `
    )
    .order("name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Categories
        </h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Organize your blog posts by topic.
        </p>
      </div>

      {/* Add category form */}
      <form
        action={createCategory}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          name="name"
          placeholder="New category name..."
          className="flex-1 rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto rounded-full bg-[var(--color-charcoal)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
        >
          Add
        </button>
      </form>

      {/* Category list */}
      <CategoryList categories={categories ?? []} />
    </div>
  );
}
