import { LogOut } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { getNavItemsByRole } from "@/core/config/navigationByRole"
import { useAuth } from "@/context/AuthContext"
import { getDashboardPathByRole, normalizeRole } from "@/core/constants/roles"

const linkBase =
    "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors text-[13px]"
const linkInactive = "text-white/80 hover:bg-white/10 hover:text-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
const linkActive = "bg-white text-[#0f6e56] font-semibold dark:bg-slate-800 dark:text-white"

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
    const roleLabel = `${currentRole.charAt(0).toUpperCase()}${currentRole.slice(1)} Account`
    const initials = getInitials(username)

    const handleLogout = () => {
        logout()
        navigate("/login", { replace: true })
    }

    return (
        <aside
            className="sticky top-16 z-30 hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col self-start border-r border-[#0d5c47] bg-[#0f6e56] dark:border-slate-800 dark:bg-slate-900 md:flex"
            data-purpose="sidebar-navigation"
        >
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
                                <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                                    {item.badgeCount}
                                </span>
                            ) : null}
                        </NavLink>
                    )
                })}
            </nav>

            <div className="border-t border-white/10 dark:border-slate-800 px-4 py-4" data-purpose="user-footer-card">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 dark:bg-slate-800 text-[13px] font-bold text-white dark:text-slate-300">
                        {initials}
                    </div>
                    <div className="overflow-hidden">
                        <p className="truncate text-[13px] font-semibold text-white dark:text-slate-200">{username || "User"}</p>
                        <p className="truncate text-[11px] text-white/60 dark:text-slate-500">{roleLabel}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 dark:border-slate-700 px-3 py-2 text-[12px] font-semibold text-white/80 dark:text-slate-400 transition-colors hover:bg-white/10 dark:hover:bg-slate-800 hover:text-white dark:hover:text-slate-200"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
