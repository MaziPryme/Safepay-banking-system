import { useMemo } from "react";

/**
 * Recreates Stripe's radiating dot/line burst graphic.
 * Lines fan out from a single origin point, each tipped with a dot.
 * A soft staggered opacity pulse gives it a gentle "floating" feel.
 */
export default function RadialBurst({ lineCount = 48, className = "" }) {
    const lines = useMemo(() => {
        return Array.from({ length: lineCount }).map((_, i) => {
            const angle = -180 + (200 / lineCount) * i - 10;
            const rad = (angle * Math.PI) / 180;
            const length = 140 + Math.random() * 260;
            const x2 = Math.cos(rad) * length;
            const y2 = Math.sin(rad) * length;
            return {
                id: i,
                x2,
                y2,
                delay: Math.random() * 3,
                duration: 2.5 + Math.random() * 2,
                opacity: 0.35 + Math.random() * 0.5,
            };
        });
    }, [lineCount]);

    return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-100 via-primary-50 to-transparent" />

            <svg
                viewBox="-300 -300 600 320"
                className="relative w-full h-full"
                style={{ overflow: "visible" }}
            >
                {lines.map((line) => (
                    <g key={line.id} style={{ animationDelay: `${line.delay}s` }} className="burst-line">
                        <line
                            x1={0}
                            y1={0}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="var(--color-primary)"
                            strokeWidth="1"
                            opacity={line.opacity * 0.6}
                        />
                        <circle
                            cx={line.x2}
                            cy={line.y2}
                            r="3.5"
                            fill="var(--color-primary)"
                            opacity={line.opacity}
                        />
                    </g>
                ))}
            </svg>

            <style>{`
                .burst-line {
                    animation: burst-pulse 3s ease-in-out infinite;
                    transform-origin: 0px 0px;
                }
                @keyframes burst-pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.03); }
                }
            `}</style>
        </div>
    );
}