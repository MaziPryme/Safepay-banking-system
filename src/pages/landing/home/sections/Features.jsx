import { motion } from "framer-motion";
import { Send, ShieldCheck, Smartphone, PiggyBank, CreditCard, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Instant Transfers",
    desc: "Move money between banks in seconds not days",
  },
  {
    icon: ShieldCheck,
    title: "Bank Grade Security",
    desc: "Multi-factor authentication and end-end encryption.",
  },
  {
    icon: Smartphone,
    title: "Mobile first",
    desc: "Manage every action from your phone, anywhere",
  },
  {
    icon: PiggyBank,
    title: "Smart Savings",
    desc: "Save smarter",
  },
  {
    icon: CreditCard,
    title: "Virtual & Physical Cards",
    desc: "Issue cards instantly, freeze them just as fast",
  },
  {
    icon: BarChart3,
    title: "Real-time Insights",
    desc: "Track spending and income with live dashboard",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold">Everything you need, nothing you don't</h2>
        <p className="mt-3 text-slate-500">
          A focused set of tools that make everyday Banking effortless
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="card"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <feature.icon size={20} />
            </div>
            <h3 className="mt-4 font-semibold text-mist-700">{feature.title}</h3>
            <p className="mt-1.5 text-sm text-slate-500">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}