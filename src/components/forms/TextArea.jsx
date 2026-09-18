import { forwardRef } from "react";
import clsx from "clsx";

const Textarea = forwardRef(({ label, error, rows = 4, className = "", ...rest }, ref) => {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <textarea ref={ref} rows={rows} className={clsx("input resize-none", error && "input-error")} {...rest} />
      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";
export default Textarea;