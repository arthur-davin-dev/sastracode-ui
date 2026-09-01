/**
 * Emoji removal for user-facing titles.
 *
 * Video/lesson titles come straight from the backend and authors sometimes
 * prefix them with emoji ("🔥 Intro to CSS"). We render titles in tight,
 * truncated spaces (sidebar rows, up-next card, page heading) where the emoji
 * adds nothing and costs characters, so it is stripped at the display layer.
 * The stored value is never modified.
 */

/*
 * Keycap sequences ("1️⃣") are digit + optional VS16 + COMBINING ENCLOSING
 * KEYCAP. Handled first and as a whole, otherwise stripping the combining
 * marks alone would leave a bare, meaningless digit behind.
 */
const KEYCAP_SEQUENCE = /[#*0-9]️?⃣/gu;

/*
 * Flags are pairs of regional indicators. Matched as a pair so a lone
 * indicator (never valid on its own) is not left in place.
 */
const FLAG_SEQUENCE = /\p{Regional_Indicator}{2}/gu;

/*
 * Everything else pictographic, including ZWJ sequences ("👨‍💻") and skin-tone
 * modifiers ("👍🏽"), which must be consumed as one unit so the joiners and
 * modifiers don't survive as invisible garbage.
 */
const PICTOGRAPHIC_SEQUENCE =
  /\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?(?:‍\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?)*/gu;

/* Stray joiners / variation selectors left by unusual input. */
const ORPHAN_MODIFIERS = /[‍️]/g;

/**
 * Remove emoji from a title and tidy the whitespace they leave behind.
 *
 * Returns the input unchanged when it holds no emoji, so non-emoji titles are
 * not silently reformatted.
 */
export function stripEmoji(value: string): string {
  if (!value) {
    return value;
  }

  const stripped = value
    .replace(KEYCAP_SEQUENCE, "")
    .replace(FLAG_SEQUENCE, "")
    .replace(PICTOGRAPHIC_SEQUENCE, "")
    .replace(ORPHAN_MODIFIERS, "");

  if (stripped === value) {
    return value;
  }

  /*
   * Collapse the gap a removed emoji leaves ("🔥 Intro" -> "Intro") and drop
   * now-dangling separators ("Intro · 🔥" -> "Intro").
   */
  return stripped
    .replace(/\s{2,}/g, " ")
    .replace(/^[\s·|:\-–—]+|[\s·|:\-–—]+$/g, "")
    .trim();
}

/**
 * Title-safe variant for optional values, keeping call sites free of
 * null checks.
 */
export function stripEmojiFrom(
  value?: string | null,
): string {
  return value ? stripEmoji(value) : "";
}
