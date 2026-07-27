// components/ui/xp-level-badge.tsx
interface XpLevelBadgeProps {
  level: number;
  size?: number;
}

export function XpLevelBadge({ level, size = 56 }: XpLevelBadgeProps) {
  const center = 28;
  const radius = 20;
  const arcs = [
    { start: -75, end: 0 },    // top-right
    { start: 15, end: 90 },    // bottom-right
    { start: 105, end: 180 },  // bottom-left
    { start: 195, end: 270 },  // top-left
  ];

  function polarToCartesian(angleDeg: number) {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    };
  }

  function describeArc(startAngle: number, endAngle: number) {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  }

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        {arcs.map((arc, i) => (
          <path
            key={i}
            d={describeArc(arc.start, arc.end)}
            stroke="#1e3a8a"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-red-600 leading-none">{level}</span>
        <span className="text-[8px] text-muted-foreground mt-0.5">កម្រិត</span>
      </div>
    </div>
  );
}