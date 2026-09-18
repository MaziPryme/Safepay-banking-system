import clsx from "clsx"


export default function Spinner({ size = "mid", className = ""}) {
    const sizes = { 
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-2",
        lg: "h-12 w-12 border-3",
    };

    return(
        <div role="status" aria-label="Loading" 
        className={clsx("animate-spin rounded-full border-primary/20 border-t-primary", sizes[size], className)} />
    )
}