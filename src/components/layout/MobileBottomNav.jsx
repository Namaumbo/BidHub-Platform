import { Home, Search, Plus, Bell, User } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { normalizeRole } from "@/core/constants/roles"
import { ROLES } from "@/core/constants/roles"

const buyerNav = [
    { to: "/buyer/dashboard", label: "Home", icon: Home },
    { to: "/buyer/bids", label: "Browse", icon: Search },
    { to: "/buyer/post-requirement", label: "Post", icon: Plus, highlight: true },
    { to: "/messages", label: "Alerts", icon: Bell, badge: 3 },
    { to: "/buyer/reviews", label: "Profile", icon: User },
]

const sellerNav = [
    { to: "/seller/dashboard", label: "Home", icon: Home },
    { to: "/seller/my-posts", label: "My Posts", icon: Search },
    { to: "/seller/sell-requirement", label: "Sell", icon: Plus, highlight: true },
    { to: "/seller/messages", label: "Messages", icon: Bell, badge: 3 },
    { to: "/seller/dashboard", label: "Profile", icon: User },
]

const MobileBottomNav = () => {
    const { role } = useAuth()
    const navItems = normalizeRole(role) === ROLES.SELLER ? sellerNav : buyerNav

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200">
            <div className="flex items-end justify-around px-2 pt-2 pb-3">
                {navItems.map((item) => {
                    const Icon = item.icon

                    if (item.highlight) {
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="flex flex-col items-center gap-1"
                            >
                                <div className="h-12 w-12 -mt-5 rounded-2xl bg-[#0b4a74] flex items-center justify-center shadow-lg shadow-[#0b4a74]/40">
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-[10px] font-semibold text-[#0b4a74]">
                                    {item.label}
                                </span>
                            </Link>
                        )
                    }

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to.endsWith("dashboard")}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 ${isActive ? "text-[#0b4a74]" : "text-slate-400"}`
                            }
                        >
                            <div className="relative">
                                <Icon className="h-5 w-5" />
                                {item.badge && (
                                    <span className="absolute -top-1 -right-1.5 h-3.5 w-3.5 rounded-full bg-red-500 flex items-center justify-center text-[8px] font-bold text-white">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-semibold">{item.label}</span>
                        </NavLink>
                    )
                })}
            </div>
        </nav>
    )
}

export default MobileBottomNav
