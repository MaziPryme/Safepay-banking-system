import clsx from "clsx";
import Spinner from "../loader/Spinner";

// Generic, reusable data table.
// columns: [{ key: "name", header: "Name", render?: (row) => JSX }]
// This is intentionally simple — no built-in sorting/filtering magic. Pages control
// sorting/searching themselves and just pass the already-processed `data` array in.
export default function Table({ columns, data = [], isLoading = false, emptyMessage = "No records found", onRowClick }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!data.length) {
    return <div className="py-16 text-center text-sm text-slate-400">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              onClick={() => onRowClick?.(row)}
              className={clsx(
                "hover:bg-slate-50/60 transition-colors",
                onRowClick && "cursor-pointer"
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3.5 text-ink">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}