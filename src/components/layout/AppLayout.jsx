import { Outlet } from "react-router-dom"
import Sidebar from "@/components/sidebar/Sidebar"
import TopHeader from "@/components/topheader/TopHeader"
import { useAuth } from "@/context/AuthContext"
import { ROLES } from "@/core/constants/roles"

const AppLayout = () => {
    const { role } = useAuth()
    const isAdmin = role === ROLES.ADMIN

    return (
        <div className={`flex min-h-screen bg-slate-50 ${isAdmin ? "admin-theme" : ""}`}>
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <TopHeader />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AppLayout
