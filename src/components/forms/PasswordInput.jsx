import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

// Same as Input, but with a show/hide toggle — used on login, signup, reset password.
const PasswordInput = forwardRef(({ label, error, className = "", ...rest }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          className={clsx("input pr-10", error && "input-error")}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";
export default PasswordInput;