-- Fix 1: Set search_path on update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix 2: Tighten blog_posts UPDATE policy — only author or admin can update
DROP POLICY "Authenticated users can update posts" ON public.blog_posts;
CREATE POLICY "Authors and admins can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (
    author_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    author_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Fix 3: Tighten blog_posts DELETE policy — only admin can delete
DROP POLICY "Authenticated users can delete posts" ON public.blog_posts;
CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Fix 4: Tighten categories management — only admin can create/update/delete
DROP POLICY "Authenticated users can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Fix 5: Tighten blog_post_categories — author of post or admin
DROP POLICY "Authenticated users can manage post categories" ON public.blog_post_categories;
CREATE POLICY "Authors and admins can manage post categories"
  ON public.blog_post_categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.blog_posts bp
      WHERE bp.id = post_id AND (bp.author_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.blog_posts bp
      WHERE bp.id = post_id AND (bp.author_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    )
  );
