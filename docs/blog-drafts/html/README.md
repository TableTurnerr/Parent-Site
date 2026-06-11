# HTML versions (paste these, not the markdown)

These are the blog drafts converted to clean HTML, ready to paste into the post editor.

## Why these exist
The editor's content box takes **HTML**, not markdown. And if you copy from a *rendered* markdown preview, it drags the preview tool's styling (including washed-out gray text) into the editor as inline styles. That is what caused the gray body text. These files avoid both problems: clean HTML, zero inline styles.

## How to publish a post (the right way)
1. Open the matching `.html` file here and copy **all** of it.
2. In the editor, click the **HTML** tab (not Visual).
3. Paste. The whole body lands as clean HTML.
4. Switch to **Visual** to eyeball it if you like.
5. Fill the other fields from the original markdown draft's frontmatter (in `../`):
   - Title, URL slug
   - Excerpt
   - SEO: meta title, meta description, keywords
   - Categories (chips) — listed in `../README.md`
6. Generate the featured image from the draft's `featured_image_prompt` field (paste it into your AI image tool), then upload it and write alt text. These are editorial/conceptual images, not faked photos of your actual dishes.
7. Watch the **Content Check** panel go green, then Publish.

## Important
- Paste into the **HTML tab**, never into the Visual editor from a preview. Pasting rendered content is what injects foreign styles.
- The body text color comes from the live blog's own styles (the `prose` typography), so it will look correct on the published page even though the raw HTML has no color of its own. The gray you saw was the preview tool's styling, not the post.

## Regenerating
If a markdown draft changes, rebuild all HTML with:

```
node scripts/drafts-to-html.mjs
```
