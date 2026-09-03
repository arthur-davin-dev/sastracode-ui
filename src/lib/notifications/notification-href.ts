import type { ApiNotification } from "@/types/notification";

/**
 * The existing frontend route that renders the signed-in user's badges.
 * `app/(achivement)/achivement/page.tsx` → `<Achievement />`, which loads them
 * from `GET /api/v1/users/me/badges` (`useGetMyBadgesQuery`) and lists each as
 * a `<BadgeCard />`. The `#earned-badges` hash targets the "មេដាយដែលទទួលបាន"
 * section so `<Achievement />` smooth-scrolls to it once it has rendered.
 */
export const BADGE_UI_ROUTE = "/achivement#earned-badges";

/**
 * Resolve the in-app URL a notification should open.
 *
 * The backend-provided `deepLink` is used verbatim for every notification type
 * — EXCEPT badge notifications, whose deep link points at `/profile/badges`,
 * a route that does not exist in this app (the 404). The user's earned badges
 * live on {@link BADGE_UI_ROUTE}, so badge notifications are redirected there.
 * Course and question/answer notifications are untouched.
 *
 * Frontend-only: the backend deepLink generation is not changed.
 */
export function resolveNotificationHref(
  item: Pick<ApiNotification, "type" | "referenceType" | "deepLink">,
  fallback = "/notifications",
): string {
  const deepLinkPath = item.deepLink?.split(/[?#]/)[0].replace(/\/+$/, "");

  const isBadgeNotification =
    item.type === "BADGE" ||
    item.referenceType === "BADGE" ||
    deepLinkPath === "/profile/badges";

  if (isBadgeNotification) return BADGE_UI_ROUTE;

  return item.deepLink || fallback;
}
