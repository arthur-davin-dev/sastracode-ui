/**
 * Lightweight domain-change events broadcast by the backend on the shared
 * STOMP destination `/topic/data-changes`.
 *
 * The backend publishes one of these after a create/update/delete of a
 * syncable entity commits. The payload intentionally carries no entity body —
 * only enough for the frontend to invalidate the right RTK Query cache tags
 * so any *currently mounted* query refetches (see `data-change-tags.ts`).
 *
 * `entity` / `action` are typed as plain strings on the wire because the
 * backend may broadcast entities this frontend version does not handle yet;
 * unknown values are ignored rather than treated as an error.
 */
export interface DataChangeEvent {
  type: "DATA_CHANGED";
  entity: string;
  action: string;
  id: string;
}

/** Entities this frontend version reacts to. */
export type KnownDataChangeEntity = "COURSE" | "TUTORIAL";

/** Actions the backend can report. */
export type DataChangeAction = "CREATED" | "UPDATED" | "DELETED";

/** Narrow an unknown parsed payload to a `DataChangeEvent`. */
export function isDataChangeEvent(value: unknown): value is DataChangeEvent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.type === "DATA_CHANGED" &&
    typeof candidate.entity === "string" &&
    typeof candidate.action === "string" &&
    typeof candidate.id === "string"
  );
}
