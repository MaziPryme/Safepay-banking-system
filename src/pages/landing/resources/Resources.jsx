import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    HelpCircle,
    FileText,
    BookOpen,
    ShieldCheck,
    Lock,
    ScrollText,
    Headphones,
    Users,
    Newspaper,
    MessageCircleQuestion,
} from "lucide-react";

const RESOURCES = [
    {
        id: "help-center",
        title: "Help Center",
        description: "Find quick answers to common questions about your account, transfers, deposits, and everyday use of Safepay.",
        icon: HelpCircle,
    },
    {
        id: "documentation",
        title: "Documentation",
        description: "Technical guides for developers integrating with Safepay's APIs and tools.",
        icon: FileText,
    },
    {
        id: "guides",
        title: "Guides",
        description: "Step-by-step walkthroughs for getting the most out of your Safepay account, from opening an account to setting up recurring transfers.",
        icon: BookOpen,
    },
    {
        id: "security",
        title: "Security",
        description: "Learn how Safepay protects your money and personal information, including encryption, fraud monitoring, and account recovery.",
        icon: ShieldCheck,
    },
    {
        id: "privacy-policy",
        title: "Privacy Policy",
        description: "How we collect, use, and protect your personal data. Read the full policy to understand your rights.",
        icon: Lock,
    },
    {
        id: "terms",
        title: "Terms",
        description: "The terms and conditions that govern your use of Safepay's products and services.",
        icon: ScrollText,
    },
    {
        id: "contact-support",
        title: "Contact Support",
        description: "Reach our support team directly for help with your account, a transaction, or anything else.",
        icon: Headphones,
    },
    {
        id: "community",
        title: "Community",
        description: "Connect with other Safepay users, share tips, and ask questions in our community space.",
        icon: Users,
    },
    {
        id: "blog",
        title: "Blog",
        description: "News, product updates, and insights from the Safepay team.",
        icon: Newspaper,
    },
    {
        id: "faq",
        title: "FAQ",
        description: "Quick answers to the questions we hear most often from our customers.",
        icon: MessageCircleQuestion,
    },
];

export default function Resources() {
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
                    Resources
                </h1>
                <p className="text-mist-700/60 max-w-xl mx-auto">
                    Everything you need to know about using Safepay, all in one place.
                </p>
            </div>

            {/* Quick-jump chips */}
            <div className="mx-auto max-w-4xl px-6 pb-12">
                <div className="flex flex-wrap justify-center gap-2">
                    {RESOURCES.map((resource) => (
                        <a
                            key={resource.id}
                            href={`#${resource.id}`}
                            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm
                            text-mist-700/70 hover:border-primary hover:text-primary transition-colors"
                        >
                            {resource.title}
                        </a>
                    ))}
                </div>
            </div>

            {/* Resource cards */}
            <div className="mx-auto max-w-4xl px-6 pb-24">
                <div className="grid grid-cols-1 gap-4">
                    {RESOURCES.map((resource) => {
                        const Icon = resource.icon;
                        return (
                            <section
                                key={resource.id}
                                id={resource.id}
                                className="scroll-mt-24 rounded-2xl bg-white border border-slate-100 p-6 sm:p-8
                                shadow-card transition-shadow hover:shadow-lg flex gap-5"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                                    <Icon size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-mist-700 mb-2">{resource.title}</h2>
                                    <p className="text-mist-700/60 text-sm leading-relaxed">{resource.description}</p>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}