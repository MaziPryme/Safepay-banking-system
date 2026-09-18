import clsx from "clsx"


export default function Card({ children, className ="", noPadding= false}) {
    return(
        <div className={clsx("card", noPadding && "p-0", className)}>
            {children}

        </div>
    )
}