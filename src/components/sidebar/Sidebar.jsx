import { LogOut } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { getNavItemsByRole } from "@/core/config/navigationByRole"
import { useAuth } from "@/context/AuthContext"
import { getDashboardPathByRole, normalizeRole } from "@/core/constants/roles"


const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors"
const linkInactive = "text-slate-600 hover:bg-slate-50 hover:text-[#0b4a74]"
const linkActive = "text-[#0b4a74] bg-[#0b4a74]/10"

const Sidebar = () => {
    const navigate = useNavigate()
    const { role, username, logout } = useAuth()
    const currentRole = normalizeRole(role)
    const navItems = getNavItemsByRole(currentRole)
    const dashboardPath = getDashboardPathByRole(currentRole)
    const roleLabel = `${currentRole.charAt(0).toUpperCase()}${currentRole.slice(1)} Account`

    const handleLogout = () => {
        logout()
        navigate("/login", { replace: true })
    }

    return (
        <aside
            className="hidden h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex"
            data-purpose="sidebar-navigation"
        >
            <div className="border-b border-slate-100 p-6">
                <NavLink to={dashboardPath} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0b4a74]">
                        <span className="font-bold text-white">B</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-800">BidMarket</span>
                </NavLink>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
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
                            <Icon className="h-5 w-5" />
                            {item.label}
                            {item.badgeCount ? (
                                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                                    {item.badgeCount}
                                </span>
                            ) : null}
                        </NavLink>
                    )
                })}
            </nav>
            <div className="border-t border-slate-100 p-4">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-2" data-purpose="user-footer-card">
                    <img
                        alt="User"
                        className="h-10 w-10 rounded-full border border-white"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE2t6-f_lulDXFiMNUCaJELRZgrsQBzDRKxDBN7TDEhpZPird4fxjoJ5jZFmu9cLteikIDlj-iKIKgsMlpKRwiJV0l4bNn2f4ISIG5gQBXuNj83T37zu99TSK_ySwUQraeGsq6XXRlU9FiUcunu-oisTiXPIwlQ2OSQdqSpgjTlPWhlrlI_zYUVidgnuFsaq_5l4GhR23cBccC7uawZzSbDxnIVKAl4knlW4fzC1Ok3RjVPTRkscV0xENlmdsYPi7DXExb6pzUJVQ"
                    />
                    <div className="overflow-hidden">
                        <p className="truncate text-sm font-semibold">{username || "User"}</p>
                        <p className="truncate text-xs text-slate-500">{roleLabel}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
