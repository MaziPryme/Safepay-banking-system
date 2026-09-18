
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    PiggyBank,
    Wallet,
    LockKeyhole,
    Repeat,
    HandCoins,
    CreditCard,
    Umbrella,
    ArrowRight,
} from "lucide-react";

const PRODUCTS = [
    {
        id: "savings",
        title: "Savings Account",
        description:
            "Grow your money with a flexible account that earns interest on every deposit. No minimum balance, no lock-in period — withdraw whenever you need to.",
        icon: PiggyBank,
    },
    {
        id: "current",
        title: "Current Account",
        description:
            "Everyday banking built for individuals and businesses that move money often. Instant transfers, no limits on transaction volume.",
        icon: Wallet,
    },
    {
        id: "fixed-deposit",
        title: "Fixed Deposit",
        description:
            "Lock in a lump sum for a fixed term and earn a guaranteed, higher interest rate than a regular savings account.",
        icon: LockKeyhole,
    },
    {
        id: "reocurring-deposit",
        title: "Reoccuring Deposit",
        description:
            "Commit to saving a fixed amount every month and build consistent savings habits, with interest that compounds over time.",
        icon: Repeat,
    },
    {
        id: "loan-products",
        title: "Loan Products",
        description:
            "Personal and business loans with transparent interest rates, clear repayment terms, and no hidden fees buried in the fine print.",
        icon: HandCoins,
    },
    {
        id: "create-cards",
        title: "Create Cards",
        description:
            "Instantly generate virtual cards for online spending, or request a physical debit card delivered to your door.",
        icon: CreditCard,
    },
    {
        id: "insurance-products",
        title: "Insurance Products",
        description:
            "Protect your savings and assets with insurance coverage that integrates directly into your Safepay account.",
        icon: Umbrella,
    },
];

export default function Products() {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;

        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return;

        setTimeout(() => {
            const yOffset = -80;
            const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }, 50);
    }, [location]);

    return (
        <div className="bg-background">
            {/* Header */}
            <div className="mx-auto max-w-3xl px-6 pt-24 pb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-mist-700 mb-4">
                    Our Products
                </h1>
                <p className="text-mist-700/60 max-w-xl mx-auto">
                    Everything you need to manage your money, in one place.
                </p>
            </div>

            {/* Quick-jump chips */}
            <div className="mx-auto max-w-4xl px-6 pb-12">
                <div className="flex flex-wrap justify-center gap-2">
                    {PRODUCTS.map((product) => {
                        const chipHref = "#" + product.id;
                        return (
                            <a
                                key={product.id}
                                href={chipHref}
                                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm
                                text-mist-700/70 hover:border-primary hover:text-primary transition-colors"
                            >
                                {product.title}
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Product cards */}
            <div className="mx-auto max-w-4xl px-6 pb-24">
                <div className="grid grid-cols-1 gap-4">
                    {PRODUCTS.map((product) => {
                        const Icon = product.icon;
                        return (
                            <section
                                key={product.id}
                                id={product.id}
                                className="scroll-mt-24 rounded-2xl bg-white border border-slate-100 p-6 sm:p-8
                                shadow-card transition-shadow hover:shadow-lg flex flex-col sm:flex-row gap-5"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                                    <Icon size={22} />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-bold text-mist-700 mb-2">{product.title}</h2>
                                    <p className="text-mist-700/60 text-sm leading-relaxed mb-4">
                                        {product.description}
                                    </p>
                                    <button className="inline-flex items-center gap-1.5 rounded-full bg-primary
                                    px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600">
                                        Get started
                                        <ArrowRight size={15} />
                                    </button>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
