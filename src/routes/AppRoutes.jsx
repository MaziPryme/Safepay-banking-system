import { Routes, Route } from "react-router-dom"
import LandingLayout from "../layout/LandingLayout"
import Home from "../pages/landing/home"
import NotFound from "../pages/errors/NotFound"
import Contact from "../pages/contact/Contact"
import Pricing from "../pages/landing/pricing/Pricing"
import About from "../pages/landing/about/About"
import Products from "../pages/landing/products/Products"
import Resources from "../pages/landing/resources/Resources"
import PublicRoute from "./guards/PublicRoute"
import Login from "../pages/auth/Login"
import Unauthorized from "../pages/errors/Unauthorized"
import ProtectedRoute from "./guards/ProtectedRoute"
import RoleBasedRoute from "./guards/RoleBasedRoute"
import AdminDashboard from "../pages/admin/dashboard"
import { ROLES } from "../utils/constants"
import DashboardLayout from "../layout/DashboardLayout"
import Signup from "../pages/auth/Signup"
import AdminBanks from "../pages/admin/banks"
import AdminBranches from "../pages/admin/branches/Branches"
import AdminUsers from "../pages/admin/user/index"
import CustomerDashboard from "../pages/customer/dashboard"
import BankAdminDashboard from "../pages/bankAdmin/dashboard"



export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingLayout />}>
                <Route index element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="resources" element={<Resources />} />
            </Route>

            {/* Auth pages */}

            <Route element={<PublicRoute />} >
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Admin Routes */}

            <Route element={<ProtectedRoute />}>
                <Route element={<RoleBasedRoute />} allowedRoles={[ROLES.ADMIN]}>
                    <Route path="/admin" element={<DashboardLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="banks" element={<AdminBanks />} />
                        <Route path="branches" element={<AdminBranches />} />
                        <Route path="users" element={<AdminUsers />} />
                    </Route>
                </Route>
                <Route element={<RoleBasedRoute />} allowedRoles={[ROLES.CUSTOMER]}>
                    <Route path="/customer" element={<DashboardLayout />}>
                        <Route path="dashboard" element={<CustomerDashboard />} />

                    </Route>
                </Route>
                <Route element={<RoleBasedRoute />} allowedRoles={[ROLES.BANK_ADMIN]}>
                    <Route path="/bank-admin" element={<DashboardLayout />}>
                        <Route path="dashboard" element={<BankAdminDashboard />} />

                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    )
}