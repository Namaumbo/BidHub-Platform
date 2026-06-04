import { LogOut } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { getNavItemsByRole } from "@/core/config/navigationByRole"
import { useAuth } from "@/context/AuthContext"
import { getDashboardPathByRole, normalizeRole } from "@/core/constants/roles"

const linkBase =
    "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors text-[13px]"
const linkInactive = "text-white/80 hover:bg-white/10 hover:text-white"
const linkActive = "bg-white text-[#0f6e56] font-semibold"

const getInitials = (name) => {
    if (!name) return "U"
    const parts = name.trim().split(" ")
    return parts.length >= 2
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : parts[0].slice(0, 2).toUpperCase()
}

const Sidebar = () => {
    const navigate = useNavigate()
    const { role, username, logout } = useAuth()
    const currentRole = normalizeRole(role)
    const navItems = getNavItemsByRole(currentRole)
    const dashboardPath = getDashboardPathByRole(currentRole)
    const roleLabel = `${currentRole.charAt(0).toUpperCase()}${currentRole.slice(1)} Account`
    const initials = getInitials(username)

    const handleLogout = () => {
        logout()
        navigate("/login", { replace: true })
    }

    return (
        <aside
            className="hidden h-screen w-60 flex-col bg-[#0f6e56] md:flex sticky top-0"
            data-purpose="sidebar-navigation"
        >
            {/* Logo */}
            <div className="px-5 py-5 border-b border-white/10">
                <NavLink to={dashboardPath} className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                        <span className="font-extrabold text-white text-sm">B</span>
                    </div>
                    <span className="text-[17px] font-extrabold tracking-tight text-white">BidHub</span>
                </NavLink>
            </div>

            {/* Nav items */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to.endsWith("dashboard") || item.to.endsWith("post-requirement")}
                            data-purpose="nav-link"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : linkInactive}`
                            }
                        >
                            <Icon className="h-[18px] w-[18px] shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            {item.badgeCount ? (
                                <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                                    {item.badgeCount}
                                </span>
                            ) : null}
                        </NavLink>
                    )
                })}
            </nav>

            {/* User footer */}
            <div className="border-t border-white/10 px-4 py-4" data-purpose="user-footer-card">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white text-[13px] font-bold">
                        {initials}
                    </div>
                    <div className="overflow-hidden">
                        <p className="truncate text-[13px] font-semibold text-white">{username || "User"}</p>
                        <p className="truncate text-[11px] text-white/60">{roleLabel}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-[12px] font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
