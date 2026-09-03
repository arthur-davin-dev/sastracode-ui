import type { ApiNotification } from "@/types/notification";

/**
 * The existing frontend route that renders the signed-in user's badges.
 * `app/(achivement)/achivement/page.tsx` → `<Achievement />`, which loads them
 * from `GET /api/v1/users/me/badges` (`useGetMyBadgesQuery`) and lists each as
 * a `<BadgeCard />`. The `#earned-badges` hash targets the "មេដាយដែលទទួលបាន"
 * section so `<Achievement />` smooth-scrolls to it once it has rendered.
 */
export const BADGE_UI_ROUTE = "/achivement#earned-badges";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * The backend builds course deep links with the course UUID
 * (`/courses/{courseId}` and `/courses/{courseId}/learn/...`), but the frontend
 * course routes resolve by SLUG (`GET /v1/courses/{slug}`), so an id-based link
 * lands on the "not found" page. When we know the slug for that id (from the
 * viewer's enrollments), swap it in; otherwise leave the link untouched.
 */
function withCourseSlug(
  href: string,
  courseSlugById?: Record<string, string>,
): string {
  if (!courseSlugById) return href;

  const match = href.match(/^(\/courses\/)([^/?#]+)(.*)$/);
  if (!match) return href;

  const [, prefix, segment, rest] = match;
  if (!UUID_RE.test(segment)) return href;

  const slug = courseSlugById[segment.toLowerCase()];
  return slug ? `${prefix}${slug}${rest}` : href;
}

/**
 * Resolve the in-app URL a notification should open.
 *
 * The backend-provided `deepLink` is used verbatim for every notification type
 * — EXCEPT:
 *   - badge notifications, whose deep link points at `/profile/badges`, a route
 *     that does not exist in this app (the 404). The user's earned badges live
 *     on {@link BADGE_UI_ROUTE}, so badge notifications are redirected there.
 *   - course notifications (completion, enrollment, lecture added, …), whose
 *     deep link carries the course UUID — rewritten to the course slug when
 *     {@link ResolveNotificationHrefOptions.courseSlugById} maps that id.
 *
 * Frontend-only: the backend deepLink generation is not changed.
 */
export interface ResolveNotificationHrefOptions {
  /** Map of course UUID → course slug, e.g. built from the viewer's enrollments. */
  courseSlugById?: Record<string, string>;
  fallback?: string;
}

export function resolveNotificationHref(
  item: Pick<ApiNotification, "type" | "referenceType" | "deepLink">,
  options: ResolveNotificationHrefOptions = {},
): string {
  const { courseSlugById, fallback = "/notifications" } = options;
  const deepLinkPath = item.deepLink?.split(/[?#]/)[0].replace(/\/+$/, "");

  const isBadgeNotification =
    item.type === "BADGE" ||
    item.referenceType === "BADGE" ||
    deepLinkPath === "/profile/badges";

  if (isBadgeNotification) return BADGE_UI_ROUTE;

  return withCourseSlug(item.deepLink || fallback, courseSlugById);
}
