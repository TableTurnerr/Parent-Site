import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6">
      <h1 className="font-display text-6xl md:text-8xl text-charcoal mb-4">404</h1>
      <p className="text-warm-gray text-lg mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="bg-charcoal text-cream rounded-full px-8 py-3.5 font-medium hover:bg-charcoal-light transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
