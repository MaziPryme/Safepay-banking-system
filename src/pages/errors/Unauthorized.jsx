import { Link } from "react-router-dom"
import { ShieldAlert } from "lucide-react"
import Button from "../../components/buttons/Button"

export default function Unauthorized() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 
        text-center">
            <div className="rounded-full bg-amber-50 p-4 text-amber-500">
                <ShieldAlert size={32} />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-ink">Access Denied</h1>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
                You don't have permission to view this page with your current account role.
            </p>
            <Link to="/" className="mt-8">
               <Button variant="primary">Back to Home</Button>
            </Link>

        </div>

    )
}

