import { forwardRef } from "react";
import clsx from "clsx";

// Thin wrapper over the native date input — keeps the dependency list small,
// as requested (no extra UI library just for a calendar widget).
const DatePicker = forwardRef(({ label, error, className = "", ...rest }, ref) => {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <input ref={ref} type="date" className={clsx("input", error && "input-error")} {...rest} />
      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
});
DatePicker.displayName = "DatePicker";
export default DatePicker;