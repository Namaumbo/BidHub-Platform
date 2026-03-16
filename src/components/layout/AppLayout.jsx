import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";



const AppLayout = () => {
    return (
        <div className="flex">
            <div>
                <Sidebar />
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout;