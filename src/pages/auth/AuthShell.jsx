import { Link } from "react-router-dom";
import { Landmark, ShieldCheck } from "lucide-react";

// Shared two-column shell for all auth pages: form on the left, brand panel on the right.
// Keeps Login/Signup/ForgotPassword/etc. from repeating this layout markup.
export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <Link to="/" className="mb-10 flex items-center gap-2 text-primary font-semibold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <Landmark size={18} />
          </span>
          SafePay
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-ink">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>

      <div className="hidden bg-linear-to-br from-primary to-primary-700 lg:flex lg:flex-col lg:justify-center lg:px-16">
        <ShieldCheck size={36} className="text-white/90" />
        <h2 className="mt-6 text-3xl font-semibold text-white">
          Your money, protected and always within reach.
        </h2>
        <p className="mt-4 text-white/70">
          Bank-grade encryption, real-time fraud monitoring, and 24/7 support — all included.
        </p>
      </div>
    </div>
  );
}