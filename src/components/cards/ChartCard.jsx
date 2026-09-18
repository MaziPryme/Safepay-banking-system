export default function ChartCard({title, subtitle, action, children}) {
    return(
        <div className="card">
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h3 className="text-base font-semibold text-ink">{title}</h3>
                    {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
                </div>
                {action}
            </div>
            <div className="h-72 w-full">{children}</div>
        </div>
    )
}