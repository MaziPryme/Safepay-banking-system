import  { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"

export default function LandingLayout() {
    return(
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}