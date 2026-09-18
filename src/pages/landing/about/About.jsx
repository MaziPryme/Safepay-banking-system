import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import RadialBurst from "../../../components/graphics/RadialBurst"; // adjust path to wherever you place it

/* ---------- fade/slide an element in once it scrolls into view ---------- */
function useRevealOnScroll() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

/* ---------- count a number up once it scrolls into view ---------- */
function useCountUp(target, duration = 1500) {
    const ref = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                const start = performance.now();
                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    setCount(Math.floor(progress * target));
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [target, duration]);

    return [ref, count];
}

function Reveal({ children, delay = 0, className = "" }) {
    const [ref, visible] = useRevealOnScroll();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

const VALUES = [
    {
        title: "Licensed & secure",
        body: "Safepay is built on licensed, regulated banking infrastructure — your money is protected the way a bank's should be, not just labeled that way.",
    },
    {
        title: "Moves as fast as you do",
        body: "Open an account in minutes, send money anywhere, and manage your finances from one clean dashboard — no branch visits, no waiting days for a transfer to clear.",
    },
    {
        title: "No hidden fees",
        body: "No setup fees, no monthly fees, no surprise charges buried in fine print. What you see when you open an account is what you get.",
    },
];

const STATS = [
    { target: 2019, label: "Founded", suffix: "" },
    { target: 1200000, label: "Active accounts", suffix: "+" },
    { target: 50, label: "Countries supported", suffix: "+" },
    { target: 99, label: "Platform uptime", suffix: ".99%" },
];

export default function About() {
    return (
        <div className="bg-background">
            {/* Hero */}
            <section className="mx-auto max-w-4xl px-6 pt-28 pb-20 text-center">
                <Reveal>
                    <div className="inline-flex items-center gap-2 rounded-full border
                     border-primary-100 bg-primary-50 px-4 py-1.5
                      text-sm text-primary mb-6">
                        <ShieldCheck size={15} />
                        Licensed Secure Banking
                    </div>
                </Reveal>
                <Reveal delay={100}>
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight
                     text-mist-700 leading-[1.1] mb-6">
                        Banking that moves
                        <br />
                        as fast as your life does
                    </h1>
                </Reveal>
                <Reveal delay={200}>
                    <p className="text-lg text-mist-700/60 max-w-2xl mx-auto leading-relaxed">
                        Safepay gives individuals and businesses one clean dashboard to open an
                        account, send money anywhere, and manage their finances — without the
                        friction traditional banking still runs on.
                    </p>
                </Reveal>
            </section>

            {/* Story */}
            <section className="mx-auto max-w-4xl px-6 py-16">
                <Reveal>
                    <h2 className="text-3xl font-bold text-mist-700 mb-6">Why we built Safepay</h2>
                </Reveal>
                <Reveal delay={100}>
                    <p className="text-mist-700/70 leading-relaxed mb-4">
                        Too many banking products force a trade-off: move fast, or stay secure.
                        Safepay was built to remove that trade-off entirely. Every transfer,
                        every deposit, every withdrawal runs through the same licensed,
                        regulated infrastructure a traditional bank uses — just without the
                        paperwork and the waiting.
                    </p>
                </Reveal>
                <Reveal delay={200}>
                    <p className="text-mist-700/70 leading-relaxed">
                        Whether you're an individual managing everyday spending or a business
                        moving payments at scale, Safepay is designed to be the one dashboard
                        that keeps up with how you actually work.
                    </p>
                </Reveal>
            </section>

            {/* Values */}
            <section className="bg-primary-50 py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-mist-700 text-center mb-14">
                            What Safepay stands for
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {VALUES.map((value, i) => (
                            <Reveal key={value.title} delay={i * 150}>
                                <div className="rounded-2xl bg-white p-8 shadow-card h-full">
                                    <h3 className="text-lg font-semibold text-mist-700 mb-3">{value.title}</h3>
                                    <p className="text-mist-700/60 text-sm leading-relaxed">{value.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats with count-up */}
            <section className="mx-auto max-w-5xl px-6 py-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    {STATS.map((stat) => {
                        const [ref, count] = useCountUp(stat.target);
                        return (
                            <div key={stat.label} ref={ref}>
                                <p className="text-4xl font-extrabold text-primary mb-2">
                                    {count.toLocaleString()}
                                    {stat.suffix}
                                </p>
                                <p className="text-mist-700/60 text-sm">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Radial burst — exists on its own, nothing layered on top of it */}
            <section className="relative overflow-hidden bg-primary-700 py-10">
                <RadialBurst color="#ffffff" showGlow={false} className="h-[520px] w-full" />
            </section>

            {/* Closing CTA — separate block below the graphic */}
            <section className="bg-primary-700 pb-24 pt-4">
                <div className="mx-auto max-w-2xl px-6 text-center">
                    <Reveal>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Ready to bank differently?
                        </h2>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="text-white/60 mb-8">
                            Open an account in minutes. No hidden fees, cancel anytime.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <button className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5
                        text-sm font-semibold text-primary-700 transition-transform hover:scale-105">
                            Open an Account
                            <ArrowRight size={16} />
                        </button>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}