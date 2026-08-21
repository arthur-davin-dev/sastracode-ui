import type { SearchResultItem, SearchSort } from "@/redux/service/searchApi";

export type LevelFilterValue = "ALL" | "EASY" | "MEDIUM" | "HARD";

export const LEVEL_FILTER_OPTIONS: { label: string; value: LevelFilterValue }[] = [
  { label: "ទាំងអស់", value: "ALL" },
  { label: "កម្រិតមូលដ្ឋាន", value: "EASY" },
  { label: "កម្រិតមធ្យម", value: "MEDIUM" },
  { label: "កម្រិតខ្ពស់", value: "HARD" },
];

export type SortKey = "relevance" | "newest" | "popular" | "level";

export const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "ភាពពាក់ព័ន្ធ", value: "relevance" },
  { label: "ថ្មីបំផុត", value: "newest" },
  { label: "ពេញនិយមបំផុត", value: "popular" },
  { label: "កម្រិតងាយ → ពិបាក", value: "level" },
];

const LEVEL_RANK: Record<string, number> = { EASY: 0, MEDIUM: 1, HARD: 2 };

// Only "newest" and "popular" have a server-side equivalent — relevance and
// level ordering are applied client-side after the fetch below.
export function apiSortFor(sortKey: SortKey): SearchSort {
  return sortKey === "newest" ? "newest" : "popular";
}

export function filterByLevel<T extends { level?: string }>(
  items: T[],
  level: LevelFilterValue,
): T[] {
  if (level === "ALL") return items;
  return items.filter((item) => item.level === level);
}

export function sortResults(
  items: SearchResultItem[],
  sortKey: SortKey,
): SearchResultItem[] {
  if (sortKey !== "level") return items;
  return [...items].sort(
    (a, b) => (LEVEL_RANK[a.level ?? ""] ?? 99) - (LEVEL_RANK[b.level ?? ""] ?? 99),
  );
}
