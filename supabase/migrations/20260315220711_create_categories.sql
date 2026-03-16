-- Categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default categories from SEO Report
INSERT INTO public.categories (name, slug) VALUES
  ('Restaurant SEO', 'restaurant-seo'),
  ('Restaurant Website Design', 'restaurant-website-design'),
  ('Direct Ordering', 'direct-ordering'),
  ('Restaurant Branding', 'restaurant-branding'),
  ('Restaurant Marketing', 'restaurant-marketing'),
  ('Platform Reviews', 'platform-reviews'),
  ('Industry Insights', 'industry-insights');
