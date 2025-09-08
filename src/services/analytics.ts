import { Business, Promo, Review } from "@/types";

// A detailed type defining all the events we want to track in our app.
// This ensures we always send consistent data.
type AnalyticsEvent =
  | { name: 'SEARCH_ATTEMPTED'; payload: { query: string } }
  | { name: 'PROFILE_VIEWED'; payload: { businessId: Business['id'] } }
  | { name: 'CONTACT_WHATSAPP'; payload: { businessId: Business['id'] } }
  | { name: 'CONTACT_CALL'; payload: { businessId: Business['id'] } }
  | { name: 'DIRECTIONS_REQUESTED'; payload: { businessId: Business['id'] } }
  | { name: 'REVIEW_SUBMITTED'; payload: { businessId: Business['id']; rating: Review['rating'] } }
  | { name: 'PROMO_VIEWED'; payload: { promoId: Promo['id'] } };

/**
 * A central function for posting analytics events.
 * @param event The event object containing the name and payload.
 */
export const postEvent = (event: AnalyticsEvent) => {
  // In a real app, this is where you'd send the event to your analytics provider.
  // For now, we just log it to the console for debugging.
  console.log(`[ANALYTICS] Event: ${event.name}`, event.payload);
};