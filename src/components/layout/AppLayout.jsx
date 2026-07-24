import { Outlet } from "react-router-dom"
import Sidebar from "@/components/sidebar/Sidebar"
import TopHeader from "@/components/topheader/TopHeader"
import MobileBottomNav from "@/components/layout/MobileBottomNav"
import { useAuth } from "@/context/AuthContext"
import { normalizeRole, ROLES } from "@/core/constants/roles"

const AppLayout = () => {
    const { role } = useAuth()
    const isSeller = normalizeRole(role) === ROLES.SELLER

    /* Seller: light chrome — sidebar left, header above content */
    if (isSeller) {
        return (
            <div className="flex h-svh flex-col overflow-hidden bg-[#F8FAFC] dark:bg-slate-950">
                <div className="flex min-h-0 flex-1">
                    <Sidebar />
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                        <TopHeader />
                        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#F8FAFC] pb-20 dark:bg-slate-950 md:pb-6">
                            <Outlet />
                        </main>
                    </div>
                </div>
                <MobileBottomNav />
            </div>
        )
    }

    /* Buyer: brand-green frame with curved content panel */
    return (
        <div className="flex h-svh flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 md:bg-[#0f6e56] md:dark:bg-slate-900">
            <TopHeader />
            <div className="flex min-h-0 flex-1 bg-slate-50 dark:bg-slate-950 md:bg-[#0f6e56] md:dark:bg-slate-900">
                <Sidebar />
                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 pb-20 dark:bg-slate-950 md:rounded-tl-3xl md:pb-6">
                    <Outlet />
                </main>
            </div>
            <MobileBottomNav />
        </div>
    )
}

export default AppLayout
