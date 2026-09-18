import { forwardRef } from "react";
import clsx from "clsx";

// Reusable text input wired for React Hook Form: <Input label="Email" error={errors.email} {...register("email")} />
// forwardRef is required so react-hook-form can attach its own ref for validation/focus.
const Input = forwardRef(({ label, error, hint, className = "", ...rest }, ref) => {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <input ref={ref} className={clsx("input", error && "input-error")} {...rest} />
      {error && <p className="error-text">{error.message}</p>}
      {!error && hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
});
Input.displayName = "Input";
export default Input;