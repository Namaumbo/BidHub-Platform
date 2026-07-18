import { Outlet } from "react-router-dom"
import Sidebar from "@/components/sidebar/Sidebar"
import TopHeader from "@/components/topheader/TopHeader"
import MobileBottomNav from "@/components/layout/MobileBottomNav"

const AppLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
            <TopHeader />
            <div className="flex min-h-0 flex-1">
                <Sidebar />
                <main className="min-w-0 flex-1 pb-20 md:pb-6">
                    <Outlet />
                </main>
            </div>
            <MobileBottomNav />
        </div>
    )
}

export default AppLayout
