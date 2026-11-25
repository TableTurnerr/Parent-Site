// First-10-reviews offer. Mentioned only in the popup (components/growth/OfferPopup.tsx), nowhere else on the site.
// Runs through the end of December 15, 2026, US Eastern time; popup and server both stop on their own after that.
export const REVIEW_OFFER_ENDS_AT = Date.parse("2026-12-16T00:00:00-05:00");
export const REVIEW_OFFER_SOURCE = "/offer/first-10-reviews";
export const reviewOfferActive = (now = Date.now()) => now < REVIEW_OFFER_ENDS_AT;
