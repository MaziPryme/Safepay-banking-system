import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export default function Dropdown({ trigger, children, align = "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking anywhere outside the dropdown.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen((v) => !v)}>{trigger}</div>
      {isOpen && (
        <div
          className={clsx(
            "absolute z-30 mt-2 min-w-50 rounded-xl border border-slate-100 bg-white py-2 shadow-card",
            align === "right" ? "right-0" : "left-0"
          )}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}