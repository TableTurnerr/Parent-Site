import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
        Create New Post
      </h1>

      <form action={createPost}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]"
            >
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a title for your post..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[var(--color-charcoal)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
          >
            Create & Start Editing
          </button>
        </div>
      </form>
    </div>
  );
}
