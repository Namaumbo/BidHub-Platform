import { SearchIcon, BellIcon, MessageCircle, SlidersHorizontal, Sun, Moon } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import { getDashboardPathByRole, normalizeRole } from "@/core/constants/roles"
import logo from "/logo.png"

const TopHeader = () => {
    const { role } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const dashboardPath = getDashboardPathByRole(normalizeRole(role))

    return (
        <>
            {/* ── Mobile header ── */}
            <header className="sticky top-0 z-40 shrink-0 border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <NavLink to={dashboardPath} className="flex items-center gap-2">
                        <img src={logo} alt="BidHub" className="h-8 w-auto object-contain" />
                    </NavLink>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                        >
                            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
                        </button>
                        <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                        >
                            <MessageCircle className="h-4.5 w-4.5" />
                        </button>
                        <button
                            type="button"
                            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                        >
                            <BellIcon className="h-4.5 w-4.5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 px-4 pb-3">
                    <label className="relative flex flex-1 items-center">
                        <SearchIcon className="absolute left-3 h-4 w-4 text-slate-400" />
                        <input
                            className="w-full rounded-xl bg-slate-100 py-2.5 pl-9 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b4a74]/30 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                            placeholder="Search suppliers, materials..."
                            type="text"
                        />
                    </label>
                    <button
                        type="button"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0EA432]"
                    >
                        <SlidersHorizontal className="h-4 w-4 text-white" />
                    </button>
                </div>
            </header>

            {/* ── Desktop header ── */}
            <header className="sticky top-0 z-40 hidden h-16 shrink-0 items-center gap-6 border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 px-6 lg:px-8 md:flex">
                <NavLink to={dashboardPath} className="shrink-0">
                    <img src={logo} alt="BidHub" className="h-10 w-auto object-contain" />
                </NavLink>

                <label className="relative flex min-w-0 flex-1 items-center">
                    <SearchIcon className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
                    <input
                        className="w-full max-w-xl rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0EA432]/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                        placeholder="Search suppliers, categories, locations..."
                        type="text"
                    />
                </label>

                <div className="flex shrink-0 items-center gap-3">
                    <button
                        type="button"
                        className="hidden items-center gap-2 rounded-xl bg-[#0EA432] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0b8f2b] lg:flex"
                    >
                        + Post Requirement
                    </button>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                    >
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <button
                        type="button"
                        className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                    >
                        <BellIcon className="h-4 w-4" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                    </button>
                    <div className="h-9 w-9 cursor-pointer overflow-hidden rounded-full ring-2 ring-[#0EA432]/25">
                        <img
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALw2V8slUgbFR7vy4iV909JrD2vrI-VzKIqrBW3UdYdFQbTsd94CYn2yGqJhsdUfyiTrQmacH6fL9tyxJeQB2wH1U0pDWSBeHZ9XHNoU9eFqqbkVpWdSHX3Ekm_TKpUqCIvicqKsu8aKryrJQA61_uX5qMlzqmZPW7bCZv1IbD4yp_bOPz0ibjXDLAuy-dXmx-EcPw4m4bgLTE2DdI3dz7ZzwHbGfSVGMFYfOPvdQd4T_gqHDY3PGh831-_25UFXNhxMaYdoKOYgk"
                            alt="Profile"
                        />
                    </div>
                </div>
            </header>
        </>
    )
}

export default TopHeader
