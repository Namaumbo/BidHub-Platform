import { SearchIcon, BellIcon, MessageCircle, SlidersHorizontal, Sun, Moon, ChevronDown } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import { getDashboardPathByRole, normalizeRole, ROLES } from "@/core/constants/roles"
import logo from "/logo.png"
import { Button } from "@/components/ui/button"

const BRAND = "#0f6e56"

const getInitials = (name) => {
    if (!name) return "U"
    const parts = name.trim().split(" ")
    return parts.length >= 2
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : parts[0].slice(0, 2).toUpperCase()
}

const TopHeader = () => {
    const { role, username } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const currentRole = normalizeRole(role)
    const isSeller = currentRole === ROLES.SELLER
    const dashboardPath = getDashboardPathByRole(currentRole)
    const displayName = username || "Chikondi Banda"
    const initials = getInitials(displayName)

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
                            className="w-full rounded-xl bg-slate-100 py-2.5 pl-9 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                            style={{ ["--tw-ring-color"]: `${BRAND}4D` }}
                            placeholder={isSeller ? "Search requests, orders, buyers..." : "Search suppliers, materials..."}
                            type="text"
                        />
                    </label>
                    <button
                        type="button"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: BRAND }}
                    >
                        <SlidersHorizontal className="h-4 w-4 text-white" />
                    </button>
                </div>
            </header>

            {/* ── Desktop header — seller (light, design layout) ── */}
            {isSeller ? (
                <header className="sticky top-0 z-40 hidden h-16 shrink-0 items-center border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 md:flex">
                    <div className="flex min-w-0 flex-1 items-center gap-6 px-6 lg:px-8">
                        <h1 className="shrink-0 text-[18px] font-bold tracking-tight text-slate-900 dark:text-white">
                            Seller Dashboard
                        </h1>

                        <label className="relative mx-auto flex w-full max-w-xl min-w-0 items-center">
                            <SearchIcon className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                            <input
                                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                style={{ ["--tw-ring-color"]: `${BRAND}40` }}
                                placeholder="Search requests, orders, buyers..."
                                type="text"
                            />
                        </label>

                        <div className="flex shrink-0 items-center gap-3">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                            >
                                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>
                            <button
                                type="button"
                                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                            >
                                <BellIcon className="h-4 w-4" />
                                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                    3
                                </span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <div
                                    className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-[12px] font-bold text-white ring-2"
                                    style={{ backgroundColor: BRAND, ["--tw-ring-color"]: `${BRAND}33` }}
                                >
                                    {initials}
                                </div>
                                <div className="hidden text-left lg:block">
                                    <p className="text-[13px] font-semibold leading-tight text-slate-800 dark:text-slate-100">
                                        {displayName}
                                    </p>
                                    <p className="text-[11px] text-slate-400">Seller</p>
                                </div>
                                <ChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />
                            </button>
                        </div>
                    </div>
                </header>
            ) : (
                /* ── Desktop header — buyer (brand green chrome) ── */
                <header
                    className="sticky top-0 z-40 hidden h-16 shrink-0 items-center dark:bg-slate-900 md:flex"
                    style={{ backgroundColor: BRAND }}
                >
                    <div className="flex h-full w-60 shrink-0 items-center px-4">
                        <NavLink to={dashboardPath} className="shrink-0">
                            <img src={logo} alt="BidHub" className="h-10 w-auto object-contain brightness-0 invert" />
                        </NavLink>
                    </div>

                    <div className="flex min-w-0 flex-1 items-center gap-6 px-6 lg:px-8">
                        <label className="relative flex min-w-0 flex-1 items-center">
                            <SearchIcon className="pointer-events-none absolute left-3 h-4 w-4 text-white/50" />
                            <input
                                className="w-full max-w-xl rounded-full border border-white/25 bg-white/10 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 dark:border-slate-700 dark:bg-slate-800 dark:placeholder:text-slate-500"
                                placeholder="Search suppliers, categories, locations..."
                                type="text"
                            />
                        </label>

                        <div className="flex shrink-0 items-center gap-3">
                            <Button type="button" variant="pill" size="pill">
                                + Post Requirement
                            </Button>
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                            >
                                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>
                            <button
                                type="button"
                                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                            >
                                <BellIcon className="h-4 w-4" />
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                            </button>
                            <div className="h-9 w-9 cursor-pointer overflow-hidden rounded-full ring-2 ring-white/40">
                                <img
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALw2V8slUgbFR7vy4iV909JrD2vrI-VzKIqrBW3UdYdFQbTsd94CYn2yGqJhsdUfyiTrQmacH6fL9tyxJeQB2wH1U0pDWSBeHZ9XHNoU9eFqqbkVpWdSHX3Ekm_TKpUqCIvicqKsu8aKryrJQA61_uX5qMlzqmZPW7bCZv1IbD4yp_bOPz0ibjXDLAuy-dXmx-EcPw4m4bgLTE2DdI3dz7ZzwHbGfSVGMFYfOPvdQd4T_gqHDY3PGh831-_25UFXNhxMaYdoKOYgk"
                                    alt="Profile"
                                />
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </>
    )
}

export default TopHeader
