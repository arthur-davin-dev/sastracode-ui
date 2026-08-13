type DotGridProps = {
  rows?: number;
  cols?: number;
  dotSize?: number;
  gap?: number;
  color?: string;
  className?: string;
};

/**
 * Small grid-of-dots decoration, used a few times around the section
 * (next to the "ABOUT US" eyebrow, in the navy corner cut, etc).
 */
export default function DotGrid({
  rows = 3,
  cols = 4,
  dotSize = 4,
  gap = 10,
  color = "currentColor",
  className = "",
}: DotGridProps) {
  const dots = Array.from({ length: rows * cols });

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${dotSize}px)`,
        gap,
      }}
      aria-hidden="true"
    >
      {dots.map((_, i) => (
        <span
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "9999px",
            backgroundColor: color,
            display: "block",
          }}
        />
      ))}
    </div>
  );
}