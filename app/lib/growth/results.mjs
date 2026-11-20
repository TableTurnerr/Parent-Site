// Client results. Only publish numbers you can show (screenshot of the Google profile
// before/after) and only with the client's OK to use their name.
export const results = [
  {
    slug: 'presidential-roofing',
    client: 'Presidential Roofing',
    person: 'Adrian',            // owner / contact who approved the case study
    trade: 'Roofing contractor',
    location: 'Syracuse, Utah',
    tradePath: '/marketing/roofing',
    // TODO: confirm against the live Google profile before publishing.
    // A screenshot shared on 2026-11-16 showed 29 reviews at 4.7 stars.
    reviewsBefore: 27,
    reviewsAfter: 43,
    days: 20,
    // Paste Adrian's own words here once he gives you a quote. Leave empty to hide the quote block.
    quote: '',
    // Confirm these match what was actually done for Presidential Roofing.
    whatWeDid: [
      ['Past-customer review campaign', 'A short, personal text to recent customers asking for a Google review, with one reminder for those who didn\'t respond.'],
      ['Automatic requests after every job', 'New customers get a request right after the final walkthrough, so the review flow keeps going without anyone remembering to ask.'],
      ['Every customer asked', 'Requests went to every customer, not just the ones expected to be happy, which keeps the profile within Google\'s review policy.'],
    ],
  },
].map((r) => ({
  ...r,
  path: `/results/${r.slug}`,
  added: r.reviewsAfter - r.reviewsBefore,
  pct: Math.round(((r.reviewsAfter - r.reviewsBefore) / r.reviewsBefore) * 100),
}));
