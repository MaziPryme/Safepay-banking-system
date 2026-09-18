import { forwardRef } from "react";
import clsx from "clsx";

// <Select label="Role" options={[{value:"admin",label:"Admin"}]} {...register("role")} />
const Select = forwardRef(({ label, error, options = [], placeholder = "Select...", className = "", ...rest }, ref) => {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <select ref={ref} className={clsx("input", error && "input-error")} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
});
Select.displayName = "Select";
export default Select;