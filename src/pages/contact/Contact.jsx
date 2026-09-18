import { useState } from "react";
import { ChevronRight } from "lucide-react";
import countries from "world-countries";

const COUNTRIES = countries
    .map((c) => ({ name: c.name.common, code: c.cca2 }))
    .sort((a, b) => a.name.localeCompare(b.name));

const STEPS = ["Your email", "Your info", "Let's talk"];

export default function Contact() {
    const [activeStep] = useState(0); // step 0 = "Your email"
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState(COUNTRIES.find((c) => c.name === "United States")?.code ?? COUNTRIES[0].code);

    function handleSubmit(e) {
        e.preventDefault();
        console.log({ email, country });
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-2xl rounded-2xl border border-slate-100 bg-white p-10 shadow-card">
                    {/* step indicator tabs */}
                    <div className="flex gap-10 border-b border-slate-100 mb-10">
                        {STEPS.map((step, i) => (
                            <div key={step} className="flex items-center gap-2 pb-4 -mb-px">
                                <span
                                    className={`h-3.5 w-3.5 rounded-full border-2 ${
                                        i === activeStep ? "border-primary" : "border-slate-300"
                                    }`}
                                />
                                <span
                                    className={`text-[15px] ${
                                        i === activeStep ? "text-mist-700 font-medium" : "text-slate-400"
                                    }`}
                                >
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>

                    <h1 className="text-[32px] leading-[1.2] font-semibold tracking-tight text-mist-700 mb-3">
                        Let's get you to the right place
                    </h1>
                    <p className="text-mist-700/60 mb-10">
                        We just need a few quick details.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                            <label htmlFor="email" className="text-[15px] font-medium text-mist-700">
                                Work email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" mazi@gmail.com"
                                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-[15px]
                                text-mist-700 placeholder:text-slate-400 focus:outline-none focus:ring-2
                                focus:ring-primary/25 focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                            <label htmlFor="country" className="text-[15px] font-medium text-mist-700">
                                Country/Region
                            </label>
                            <div className="relative">
                                <select
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white
                                    px-4 py-3 text-[15px] text-mist-700 focus:outline-none focus:ring-2
                                    focus:ring-primary/25 focus:border-primary transition-colors"
                                >
                                    {COUNTRIES.map((c) => (
                                        <option key={c.code} value={c.code}>{c.name}</option>
                                    ))}
                                </select>
                                <ChevronRight
                                    size={16}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-3
                                text-[15px] font-semibold text-white transition-colors hover:bg-primary-600"
                            >
                                Continue
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="w-full leading-[0]">
                <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="block w-full h-auto">
                    <path d="M0,120 C240,200 480,40 720,90 C960,140 1200,60 1440,110 L1440,220 L0,220 Z" fill="#F6F9FC" />
                    <path d="M0,150 C240,90 480,190 720,140 C960,90 1200,170 1440,130 L1440,220 L0,220 Z" fill="#E6F5F3" />
                </svg>
            </div>

            <footer className=" px-4 gap-6 flex  py-5 font-semibold text-emerald-700 bg-[#F6F9FC]">
                <a href="/" className="hover:text-mist-700 transition-colors">Visit our full website</a>
                <a href="/privacy" className="hover:text-mist-700 transition-colors">Privacy &amp; terms</a>
                <span className="text-slate-400">© 2026 Safepay, Inc.</span>
            </footer>
        </div>
    );
}