import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { hasRole } from "../../utils/roleHelper"


export default function RoleBasedRouter(allowedRoles =[]) {
    const { role } = useAuth()
   
    if (!hasRole(role, allowedRoles)) {
        return <Navigate to="/unauthorized"  replace />
    }
    return <Outlet />
}