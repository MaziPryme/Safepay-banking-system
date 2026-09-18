import clsx from "clsx";

// Small square button that holds only an icon — used in table row actions, modal close, etc.
export default function IconButton({ icon: Icon, className = "", label, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={clsx(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500",
        "hover:bg-slate-100 hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
        className
      )}
      {...rest}
    >
      <Icon size={18} />
    </button>
  );
}