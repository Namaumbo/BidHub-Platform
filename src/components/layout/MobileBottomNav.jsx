import { Home, FileText, ClipboardList, Package, Menu } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { normalizeRole } from "@/core/constants/roles"
import { ROLES } from "@/core/constants/roles"

const buyerNav = [
    { to: "/buyer/dashboard", label: "Home", icon: Home },
    { to: "/buyer/bids", label: "Requirements", icon: FileText },
    { to: "/buyer/my-bids", label: "My Bids", icon: ClipboardList },
    { to: "/buyer/orders", label: "Orders", icon: Package },
    { to: "/buyer/menu", label: "More", icon: Menu },
]

const sellerNav = [
    { to: "/seller/dashboard", label: "Home", icon: Home },
    { to: "/seller/requirements", label: "Requirements", icon: FileText },
    { to: "/seller/my-bids", label: "My Bids", icon: ClipboardList },
    { to: "/seller/orders", label: "Orders", icon: Package },
    { to: "/seller/menu", label: "More", icon: Menu },
]

const MobileBottomNav = () => {
    const { role } = useAuth()
    const navItems = normalizeRole(role) === ROLES.SELLER ? sellerNav : buyerNav

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 safe-area-bottom">
            <div className="flex items-center justify-around px-1 py-2">
                {navItems.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to.endsWith("dashboard")}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-0.5 min-w-[60px] py-1 ${
                                    isActive 
                                        ? "text-[#0EA432]" 
                                        : "text-slate-400"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`p-1.5 rounded-xl transition-colors ${
                                        isActive ? "bg-emerald-50" : ""
                                    }`}>
                                        <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    )
                })}
            </div>
        </nav>
    )
}

export default MobileBottomNav
