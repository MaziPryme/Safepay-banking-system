import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageLoader from "../../components/loader/PageLoader"
import { getDashboardRouteForRole } from "../../utils/roleHelper";


export default function PublicRouter() {
    const { isAuthenticated, isLoading, role } = useAuth()
    if (isLoading) return <PageLoader />  
    if(isAuthenticated) {
        return <Navigate to={getDashboardRouteForRole(role)} replace />
    }
    return <Outlet />
}

