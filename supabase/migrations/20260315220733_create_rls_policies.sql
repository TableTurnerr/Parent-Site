-- RLS: Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS: Categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS: Blog posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  TO anon
  USING (status = 'published' AND published_at <= now());

CREATE POLICY "Authenticated users can view all posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- RLS: Blog post categories
ALTER TABLE public.blog_post_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post categories viewable by everyone"
  ON public.blog_post_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage post categories"
  ON public.blog_post_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
