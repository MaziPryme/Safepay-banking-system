import clsx from "clsx";


export default function StateCard({label, value, icon: Icon, trend, trendlabel, accent = "primary"}){
    const isPositive = trend >= 0
    const accentClasses = {
        primary: "bg-primary-50 text-primary-600",
        secondary: "bg-secondary-50 text-secondary-500",
        accent: "bg-sky-50 text-accent-500"
    }

    return(
        <div className="card flex items-start justify-between">
            <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
                {typeof trend === "number" && (
                    <p className={clsx(
                        "mt-2 text-sm font-medium", isPositive ? "text-emerald-500" : "text-red-600"
                    )}>
                        {isPositive ? "⬆" : "⬇"} {Math.abs(trend)}% {trendlabel}
                    </p>
                )}
            </div>
            {Icon && (
                <div className={clsx("rounded-xl p-3", accentClasses[accent])}>
                    <Icon size={22}/>
                </div>
            )}
        </div>
    )

}