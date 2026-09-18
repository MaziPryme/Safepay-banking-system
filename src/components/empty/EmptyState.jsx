import { Inbox } from "lucide-react";

// Shown instead of a table/list when there's no data yet.
export default function EmptyState({ icon: Icon = Inbox, title = "Nothing here yet", description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">
        <Icon size={24} />
      </div>
      <p className="font-medium text-ink">{title}</p>
      {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
    </div>
  );
}