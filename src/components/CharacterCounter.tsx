"use client";

interface CharacterCounterProps {
  current: number;
  max: number;
}

export default function CharacterCounter({ current, max }: CharacterCounterProps) {
  const remaining = max - current;
  const percentage = current / max;
  
  // Circle properties
  const size = 30;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);
  
  // Determine color based on remaining characters
  const getColor = () => {
    if (remaining < 0) return "#f4212e"; // Red
    if (remaining < 20) return "#ffd400"; // Yellow
    return "#1d9bf0"; // Blue (Twitter blue)
  };
  
  // Background color transitions from blue to black as characters are used
  const getBackgroundColor = () => {
    if (remaining <= 0) return "#2f3336";
    // Interpolate from a lighter gray to dark/black
    const lightness = Math.max(0, (remaining / max) * 30 + 10); // 10-40% lightness range
    return `hsl(0, 0%, ${lightness}%)`;
  };

  const color = getColor();
  const showNumber = remaining <= 20;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getBackgroundColor()}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s ease, stroke 0.2s ease" }}
        />
      </svg>
      {/* Number display */}
      {showNumber && (
        <span
          className="absolute text-xs font-medium"
          style={{ color: remaining <= 0 ? "#f4212e" : color }}
        >
          {remaining}
        </span>
      )}
    </div>
  );
}
