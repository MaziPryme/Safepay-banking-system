export default function PageHeader({ title, subtitle, action, breadcrumb }) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2">
                {breadcrumb}
                <h1 className="text-2xl font-semibold text-ink">{title}</h1>
            </div>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
            {action && <div>{action}</div>}
        </div>
    );
}
