import Spinner from "./Spinner"


export default function PageLoader() {
    return(
        <div className="flex h-screen w-full items-center justify-center bg-surface">
            <Spinner size="lg"/>
        </div>
    )
}