import clsx from "clsx";

// Renders the user's photo if present, otherwise their initials on a colored circle.
export default function Avatar({ name = "", src, size = "md" }) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg" };
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src) {
    return <img src={src} alt={name} className={clsx("rounded-full object-cover", sizes[size])} />;
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700",
        sizes[size]
      )}
    >
      {initials || "?"}
    </div>
  );
}