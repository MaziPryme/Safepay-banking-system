import { forwardRef } from "react";

const Checkbox = forwardRef(({ label, error, className = "", ...rest }, ref) => {
  return (
    <div className={className}>
      <label className="flex items-center gap-2 text-sm text-ink cursor-pointer select-none">
        <input
          ref={ref}
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary-500"
          {...rest}
        />
        {label}
      </label>
      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
});
Checkbox.displayName = "Checkbox";
export default Checkbox;