import clsx from "clsx";
import Spinner from "../loader/Spinner";


const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

export default function Button({
    children,
    variant = "primary",
    isLoading = false,
    disabled = false,
    type = "button",
    className = "",
    icon: Icon,
    ...rest
}) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={clsx(VARIANTS[variant], "inline-flex items-center gap-2", className)}
            {...rest}
        >
            {isLoading ? <Spinner size="sm" className="border-white/30 border-t-white" /> : Icon && <Icon size={18} />}
            {children}
        </button>
    )
}