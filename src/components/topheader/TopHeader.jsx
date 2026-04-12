import { BellIcon, PlusIcon, SearchIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { ROLES, getPathForRole } from "@/core/constants/roles"

const SEARCH_PLACEHOLDER_BY_ROLE = {
    [ROLES.ADMIN]: "Search users, inquiries, bids, or reviews...",
    [ROLES.BUYER]: "Search requirements or sellers...",
    [ROLES.SELLER]: "Search buyer requests or categories...",
}

const TopHeader = () => {
    const { role } = useAuth()
    const placeholder = SEARCH_PLACEHOLDER_BY_ROLE[role] ?? SEARCH_PLACEHOLDER_BY_ROLE[ROLES.BUYER]
    const showBuyerCta = role === ROLES.BUYER

    return (
        <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white px-6 py-3 md:px-8 lg:px-10">
            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center">
                    <label className="relative flex items-center">
                        <SearchIcon className="absolute left-3 size-4 text-slate-400" />
                        <input
                            className="w-64 rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm transition-all placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 lg:w-80"
                            placeholder={placeholder}
                            type="text"
                        />
                    </label>
                </div>
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
                {showBuyerCta ? (
                    <Link
                        to={getPathForRole(role, "post-requirement")}
                        className="hidden items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary/90 sm:flex"
                    >
                        <PlusIcon className="size-4" />
                        <span>Post a Requirement</span>
                    </Link>
                ) : null}
                <div className="flex items-center gap-2">
                    <button className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200">
                        <BellIcon className="size-4" />
                        <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-slate-200">
                        <img
                            className="h-full w-full object-cover"
                            data-alt="User profile photo"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALw2V8slUgbFR7vy4iV909JrD2vrI-VzKIqrBW3UdYdFQbTsd94CYn2yGqJhsdUfyiTrQmacH6fL9tyxJeQB2wH1U0pDWSBeHZ9XHNoU9eFqqbkVpWdSHX3Ekm_TKpUqCIvicqKsu8aKryrJQA61_uX5qMlzqmZPW7bCZv1IbD4yp_bOPz0ibjXDLAuy-dXmx-EcPw4m4bgLTE2DdI3dz7ZzwHbGfSVGMFYfOPvdQd4T_gqHDY3PGh831-_25UFXNhxMaYdoKOYgk"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopHeader
