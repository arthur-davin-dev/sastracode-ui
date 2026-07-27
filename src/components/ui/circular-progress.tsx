// components/ui/circular-progress.tsx
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  gapDegrees?: number; // ← new: size of the gap at top/bottom
  children?: React.ReactNode;
}

export function CircularProgress({
  value,
  size = 64,
  strokeWidth = 6,
  gapDegrees = 40, // gap on each side
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // total arc excludes the gaps (top + bottom)
  const arcFraction = (180 - gapDegrees) / 360; // each side arc as fraction of full circle
  const arcLength = circumference * arcFraction;
  const gapLength = circumference - arcLength * 2;

  const filledLength = arcLength * (value / 100);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* background arcs (both sides, dim) */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          className="stroke-muted" strokeWidth={strokeWidth} fill="none"
          strokeDasharray={`${arcLength} ${gapLength / 2} ${arcLength} ${gapLength / 2}`}
          strokeLinecap="round"
        />
        {/* filled progress arcs */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          className="stroke-primary transition-all duration-500"
          strokeWidth={strokeWidth} fill="none"
          strokeDasharray={`${filledLength} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}