import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

// <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Keep the page-number list short: show up to 5 numbers around the current page.
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-ghost px-3 py-1.5 disabled:opacity-40"
      >
        <ChevronLeft size={16} /> Prev
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={clsx(
              "h-8 w-8 rounded-lg text-sm font-medium transition-colors",
              p === currentPage ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-100"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-ghost px-3 py-1.5 disabled:opacity-40"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}