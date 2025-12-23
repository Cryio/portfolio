interface RadarDataPoint {
  skill: string;
  value: number;
}

interface SkillRadarProps {
  data: RadarDataPoint[];
}

export function SkillRadar({ data }: SkillRadarProps) {
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  const levels = 5;
  const angleStep = (2 * Math.PI) / data.length;

  // Generate polygon points for each level
  const generateLevelPoints = (level: number) => {
    const radius = (maxRadius / levels) * level;
    return data
      .map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Generate data polygon
  const generateDataPoints = () => {
    return data
      .map((point, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const radius = (point.value / 100) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Generate label positions
  const getLabelPosition = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = maxRadius + 25;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="relative w-[320px] h-[320px]">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Grid levels */}
        {[1, 2, 3, 4, 5].map((level) => (
          <polygon
            key={level}
            points={generateLevelPoints(level)}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}

        {/* Axis lines */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + maxRadius * Math.cos(angle);
          const y = centerY + maxRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Data polygon with gradient */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <polygon
          points={generateDataPoints()}
          fill="url(#radarGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          opacity={0.8}
        />

        {/* Data points */}
        {data.map((point, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const radius = (point.value / 100) * maxRadius;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {data.map((point, i) => {
          const pos = getLabelPosition(i);
          return (
            <text
              key={i}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-xs font-medium"
            >
              {point.skill}
            </text>
          );
        })}
      </svg>
    </div>
  );
}