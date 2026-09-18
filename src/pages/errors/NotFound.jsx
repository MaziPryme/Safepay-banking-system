import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Button from "../../components/buttons/Button";

export default function NotFound() {
    return(
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6
        text-center">
            <p className="text-7xl font-semibold ">404</p>
            <h1 className="text-3xl font-medium">Page not found</h1>
            <p className="text-2xl font-medium mt-2 max-w-sm text-slate-500">The page you are looking for doesn't exist or may have been moved</p>
            <Link to="/" className="mt-8">
                <Button variant="primary">
                    <Home size={18} /> Back to Home
                </Button>
            </Link>
        </div>
    )
}