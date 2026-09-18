import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageLoader from "../../components/loader/PageLoader"



export default function ProtectedRouter() {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()
    if (isLoading) return <PageLoader />  
    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return <Outlet />
}
