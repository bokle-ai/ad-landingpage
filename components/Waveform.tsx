"use client";

export default function Waveform({
  bars = 14,
  className = "",
  color = "#00C60F",
}: {
  bars?: number;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`flex items-end gap-[3px] h-10 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="wave-bar inline-block w-[3px] rounded-full"
          style={{
            height: `${20 + ((i * 37) % 80)}%`,
            background: color,
            animationDelay: `${(i * 0.07).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}
