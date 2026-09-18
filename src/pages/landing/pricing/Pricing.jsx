import { ArrowRight } from "lucide-react";

const CUSTOM_FEATURES = [
    "IC+ pricing",
    "Volume discounts",
    "Multi-product discounts",
    "Country-specific rates",
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-mist-700 leading-[1.1] mb-16">
                    Pricing built for
                    <br />
                    businesses of all sizes
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    { }
                    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-card">
                        <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                            <div className="p-10">
                                <h2 className="text-2xl font-bold text-mist-700 mb-4">Standard</h2>
                                <p className="text-mist-700/70 leading-relaxed mb-8">
                                    Access a complete payments platform with simple, pay-as-you-go
                                    pricing. No setup fees, monthly fees, or hidden fees.
                                </p>
                                <button className="inline-flex items-center gap-1.5 rounded-full bg-primary
                                px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600">
                                    Get started
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-primary-50 p-10 text-center">
                                <p className="text-3xl font-extrabold text-mist-700 mb-2">2.9% + 30&cent;</p>
                                <p className="text-sm text-mist-700/60 leading-relaxed">
                                    per successful transaction
                                    <br />
                                    for domestic cards
                                </p>
                            </div>
                        </div>
                    </div>

                    { }
                    <div className="rounded-2xl overflow-hidden shadow-card bg-primary-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                            <div className="p-10">
                                <h2 className="text-2xl font-bold text-white mb-4">Custom</h2>
                                <p className="text-white/70 leading-relaxed mb-8">
                                    Design a custom package&mdash;available for businesses with
                                    large payments volume or unique business models.
                                </p>
                                <button className="inline-flex items-center gap-1.5 rounded-full bg-accent
                                px-5 py-2.5 text-sm font-semibold text-mist-700 transition-colors hover:opacity-90">
                                    Contact sales
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                            <div className="flex flex-col divide-y divide-white/10 bg-primary-600/40">
                                {CUSTOM_FEATURES.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex-1 flex items-center justify-center px-6 py-4 text-center text-white text-sm sm:text-base"
                                    >
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { }
            <div className="relative flex px-6 pb-10">
                <div className="mx-auto max-w-6xl">
                    <nav className="inline-flex items-center gap-8 rounded-full bg-white px-8 py-4 shadow-card">
                        <a href="#standard" className="text-sm font-semibold text-mist-700 hover:text-primary transition-colors">
                            Standard pricing
                        </a>
                        <a href="#custom" className="text-sm font-medium text-mist-700/60 hover:text-primary transition-colors">
                            Custom pricing
                        </a>
                        <a href="#faqs" className="text-sm font-medium text-mist-700/60 hover:text-primary transition-colors">
                            FAQs
                        </a>
                    </nav>
                </div>
            </div>

            { }
            <button className="fixed bottom-6 right-6 z-50 rounded-full bg-primary-700 px-6 py-3.5 text-sm
            font-semibold text-white transition-colors hover:bg-primary-600 shadow-card">
                Chat now
            </button>
        </div>
    );
}