import { forwardRef } from "react";

// <Radio label="Savings" value="savings" {...register("accountType")} />
const Radio = forwardRef(({ label, className = "", ...rest }, ref) => {
  return (
    <label className={`flex items-center gap-2 text-sm text-ink cursor-pointer select-none ${className}`}>
      <input
        ref={ref}
        type="radio"
        className="h-4 w-4 border-slate-300 text-primary focus:ring-primary-500"
        {...rest}
      />
      {label}
    </label>
  );
});
Radio.displayName = "Radio";
export default Radio;