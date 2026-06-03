import { SearchIcon, BellIcon, MessageCircle, SlidersHorizontal } from "lucide-react"

const TopHeader = () => {
    return (
        <>
            {/* ── Mobile header ── */}
            <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-100">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-[#0b4a74] flex items-center justify-center">
                            <span className="font-extrabold text-white text-sm">B</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-800">BidHub</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <MessageCircle className="h-4.5 w-4.5" />
                        </button>
                        <button className="relative h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <BellIcon className="h-4.5 w-4.5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                    </div>
                </div>

                {/* Search + filter */}
                <div className="px-4 pb-3 flex gap-2">
                    <label className="relative flex-1 flex items-center">
                        <SearchIcon className="absolute left-3 text-slate-400 h-4 w-4" />
                        <input
                            className="w-full rounded-xl bg-slate-100 py-2.5 pl-9 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b4a74]/30"
                            placeholder="Search suppliers, materials..."
                            type="text"
                        />
                    </label>
                    <button className="h-10 w-10 rounded-xl bg-[#0b4a74] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <SlidersHorizontal className="h-4 w-4 text-white" />
                    </button>
                </div>
            </header>

            {/* ── Desktop header ── */}
            <header className="hidden md:flex sticky top-0 z-40 w-full items-center justify-between border-b border-slate-200 bg-white px-6 py-3 lg:px-8">
                <label className="relative flex items-center">
                    <SearchIcon className="absolute left-3 text-slate-400 h-4 w-4" />
                    <input
                        className="w-64 lg:w-96 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b4a74]/30 transition-all"
                        placeholder="Search suppliers, categories, locations..."
                        type="text"
                    />
                </label>

                <div className="flex items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 rounded-xl bg-[#0b4a74] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#083754] transition-colors shadow-sm">
                        + Post Requirement
                    </button>
                    <button className="relative h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                        <BellIcon className="h-4.5 w-4.5" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                    </button>
                    <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-[#0b4a74]/20 cursor-pointer">
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
