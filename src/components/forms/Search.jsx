import { Search } from "lucide-react";

// Controlled search input used above tables. Debouncing is left to the parent page
// (a simple setTimeout in a useEffect) to keep this component dumb and reusable.
export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full max-w-xs">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-9"
      />
    </div>
  );
}