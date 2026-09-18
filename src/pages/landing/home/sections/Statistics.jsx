import { useState, useRef, useEffect } from "react";

const STATS = [
    { value: "50+", label: "countries and currencies supported" },
    { value: "$820M", label: "in transactions processed in 2025" },
    { value: "99.99%", label: "platform uptime" },
    { value: "1.2M+", label: "active accounts on Safepay" },
];

export default function Statistics() {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

    function showIndicatorFor(index) {
        const container = containerRef.current;
        const item = itemRefs.current[index];
        if (!container || !item) return;

        const containerBox = container.getBoundingClientRect();
        const itemBox = item.getBoundingClientRect();

        setHoveredIndex(index);
        setIndicator({
            left: itemBox.left - containerBox.left,
            top: itemBox.top - containerBox.top,
            width: itemBox.width,
            height: itemBox.height,
            opacity: 0.4,
        });
    }

    function hideIndicator() {
        setHoveredIndex(null);
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }

    // if the window resizes while a box is hovered, the old pixel position
    // is stale, so just hide the ring rather than show it in the wrong spot
    useEffect(() => {
        window.addEventListener("resize", hideIndicator);
        return () => window.removeEventListener("resize", hideIndicator);
    }, []);

    return (
        <section className="bg-primary-50">
            <div className="mx-auto max-w-6xl px-6 py-24 text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-mist-700">
                    The backbone
                    <br />
                    of everyday banking
                </h2>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-16">
                <div
                    ref={containerRef}
                    className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
                    onMouseLeave={hideIndicator}
                >
                    <div
                        className="pointer-events-none absolute rounded-none border-t-2 border-b-2 border-primary/50
                        transition-all duration-300 ease-out"
                        style={{
                            left: indicator.left,
                            top: indicator.top,
                            width: indicator.width,
                            height: indicator.height,
                            opacity: indicator.opacity,
                        }}
                    />

                    {STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            ref={(el) => (itemRefs.current[i] = el)}
                            onMouseEnter={() => showIndicatorFor(i)}
                            className="relative z-10 rounded-2xl px-6 py-8"
                        >
                            <p
                                className={`text-4xl sm:text-5xl font-extrabold mb-3 transition-colors duration-300 ${
                                    hoveredIndex === i ? "text-primary" : "text-mist-700/40"
                                }`}
                            >
                                {stat.value}
                            </p>
                            <p className="text-mist-700/60 text-sm sm:text-base leading-relaxed">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}