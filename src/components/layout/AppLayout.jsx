import { Outlet } from "react-router-dom"
import Sidebar from "@/components/sidebar/Sidebar"
import TopHeader from "@/components/topheader/TopHeader"
import MobileBottomNav from "@/components/layout/MobileBottomNav"

const AppLayout = () => {
    return (
        <div className="flex h-svh flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 md:bg-[#0f6e56] md:dark:bg-slate-900">
            {/* Full-width top navbar; sidebar + content sit below it */}
            <TopHeader />
            <div className="flex min-h-0 flex-1 bg-slate-50 dark:bg-slate-950 md:bg-[#0f6e56] md:dark:bg-slate-900">
                <Sidebar />
                {/* Curve stays fixed; page content scrolls inside this panel */}
                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 pb-20 dark:bg-slate-950 md:rounded-tl-3xl md:pb-6">
                    <Outlet />
                </main>
            </div>
            <MobileBottomNav />
        </div>
    )
}

export default AppLayout
