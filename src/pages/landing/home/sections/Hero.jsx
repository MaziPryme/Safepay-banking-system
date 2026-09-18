import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../../../components/buttons/Button";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-50/60 to-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-primary shadow-soft">
            <ShieldCheck size={14} /> Licensed Secure Banking
          </span>
          <h1 className="mt-5 text-3xl font-semibold leading-tight text-mist-700 sm:text-5xl">
            Banking that moves as fast as your life does
          </h1>
          <p className="mt-5 max-w-lg text-slate-500">
            Open an account in minutes, send money anywhere, and manage your finances from one clean dashboard.
            Built for individuals and businesses alike.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/signup">
              <Button variant="primary" className="px-6 py-3">
                Open an Account <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary" className="px-6 py-3">
                Explore Products <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-2 text-slate-400">
            <Zap size={16} /> No hidden fees. Cancel anytime
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <div className="rounded-2xl bg-linear-to-br from-primary-700 p-6 text-white">
              <p className="text-xs text-white/70">Available Balance</p>
              <p className="mt-2 text-3xl font-semibold">$2,450,000.00</p>
              <div className="mt-6 flex items-center justify-between text-xs text-white/70">
                <span>**** **** **** 4852</span>
                <span className="text-white/70">12/30</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {["Transfer", "Deposit", "Withdraw"].map((action) => (
                <div
                  key={action}
                  className="flex-1 cursor-pointer rounded-xl py-3 px-6 text-center text-xs font-medium text-mist-700 hover:bg-emerald-700 hover:text-white"
                >
                  {action}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}