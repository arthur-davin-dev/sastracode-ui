const KHMER_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"] as const;

export function toKhmerNumerals(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => KHMER_DIGITS[Number(digit)]);
}
