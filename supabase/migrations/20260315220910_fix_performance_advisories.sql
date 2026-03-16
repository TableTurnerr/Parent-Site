-- Fix 1: Add missing index on blog_post_categories.category_id
CREATE INDEX idx_blog_post_categories_category ON public.blog_post_categories(category_id);

-- Fix 2: Optimize all RLS policies to use (select auth.uid()) instead of auth.uid()
-- This prevents per-row re-evaluation

-- profiles
DROP POLICY "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- blog_posts INSERT
DROP POLICY "Authenticated users can create posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can create posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = author_id);

-- blog_posts UPDATE
DROP POLICY "Authors and admins can update posts" ON public.blog_posts;
CREATE POLICY "Authors and admins can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (
    author_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin')
  )
  WITH CHECK (
    author_id = (select auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin')
  );

-- blog_posts DELETE
DROP POLICY "Admins can delete posts" ON public.blog_posts;
CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin')
  );

-- Fix 3: Consolidate categories policies (remove overlap for authenticated SELECT)
DROP POLICY "Categories are viewable by everyone" ON public.categories;
DROP POLICY "Admins can manage categories" ON public.categories;

-- Anon can read categories
CREATE POLICY "Anon can read categories"
  ON public.categories FOR SELECT
  TO anon
  USING (true);

-- Authenticated can read categories
CREATE POLICY "Authenticated can read categories"
  ON public.categories FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert/update/delete categories
CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin')
  );

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin')
  );

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin')
  );

-- Fix 4: Consolidate blog_post_categories policies (remove overlap for authenticated SELECT)
DROP POLICY "Post categories viewable by everyone" ON public.blog_post_categories;
DROP POLICY "Authors and admins can manage post categories" ON public.blog_post_categories;

-- Anon can read post categories
CREATE POLICY "Anon can read post categories"
  ON public.blog_post_categories FOR SELECT
  TO anon
  USING (true);

-- Authenticated can read post categories
CREATE POLICY "Authenticated can read post categories"
  ON public.blog_post_categories FOR SELECT
  TO authenticated
  USING (true);

-- Authors/admins can insert post categories
CREATE POLICY "Authors and admins can insert post categories"
  ON public.blog_post_categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.blog_posts bp
      WHERE bp.id = post_id AND (bp.author_id = (select auth.uid())
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin'))
    )
  );

-- Authors/admins can delete post categories
CREATE POLICY "Authors and admins can delete post categories"
  ON public.blog_post_categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.blog_posts bp
      WHERE bp.id = post_id AND (bp.author_id = (select auth.uid())
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'admin'))
    )
  );
