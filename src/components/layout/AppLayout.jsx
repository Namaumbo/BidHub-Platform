import { Outlet } from "react-router-dom"
import Sidebar from "@/components/sidebar/Sidebar"
import TopHeader from "@/components/topheader/TopHeader"
import MobileBottomNav from "@/components/layout/MobileBottomNav"

const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <TopHeader />
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                    <Outlet />
                </main>
                <MobileBottomNav />
            </div>
        </div>
    )
}

export default AppLayout
