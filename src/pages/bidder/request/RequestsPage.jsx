import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    ArrowLeft,
    ChevronDown,
    ChevronRight,
    Filter,
    Hammer,
    Laptop,
    Leaf,
    MapPin,
    Printer,
    Search,
    ShoppingCart,
    SlidersHorizontal,
    Truck,
    User,
} from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const REQUIREMENTS = [
    {
        id: "REQ-001",
        title: "Supply of Office Chairs",
        category: "Office Supplies",
        location: "Lilongwe",
        postedBy: "BuildPro Malawi",
        description: "We are looking for comfortable office chairs with good back support. Should be durable and of good quality.",
        deadline: "20 May 2025",
        budget: 600_000,
        budgetLabel: "MK 600,000",
        quotes: 20,
        image: "/office.webp",
        Icon: ShoppingCart,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
    },
    {
        id: "REQ-002",
        title: "Building Materials (Cement & Bricks)",
        category: "Construction Materials",
        location: "Blantyre",
        postedBy: "Lilongwe City Council",
        description: "We need cement and bricks for our ongoing road construction project.",
        deadline: "22 May 2025",
        budget: 5_000_000,
        budgetLabel: "MK 5,000,000+",
        quotes: 15,
        image: "/brick.jpg",
        Icon: Hammer,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-700",
    },
    {
        id: "REQ-003",
        title: "Supply of Laptops",
        category: "ICT Equipment",
        location: "Zomba",
        postedBy: "Zomba University",
        description: "Laptops with at least i5 processor, 8GB RAM and 512GB SSD.",
        deadline: "25 May 2025",
        budget: 1_200_000,
        budgetLabel: "MK 1,200,000",
        quotes: 18,
        Icon: Laptop,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
    },
    {
        id: "REQ-004",
        title: "Printing Services",
        category: "Printing",
        location: "Mzuzu",
        postedBy: "Schools Committee",
        description: "We need printing of exercise books and brochures.",
        deadline: "27 May 2025",
        budget: 320_000,
        budgetLabel: "MK 320,000",
        quotes: 8,
        Icon: Printer,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600",
    },
    {
        id: "REQ-005",
        title: "Supply of Maize (50kg bags)",
        category: "Agriculture",
        location: "Lilongwe",
        postedBy: "Farmers Cooperative",
        description: "Looking for clean, well-dried maize in 50kg bags. Delivery to our Lilongwe warehouse.",
        deadline: "29 May 2025",
        budget: 900_000,
        budgetLabel: "MK 900,000",
        quotes: 12,
        image: "/maize.webp",
        Icon: Leaf,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
    },
    {
        id: "REQ-006",
        title: "Cement Supply (50kg bags)",
        category: "Construction Materials",
        location: "Blantyre",
        postedBy: "Dzuka Constructions",
        description: "We need 300 bags of 42.5R cement delivered to our Blantyre site in two batches.",
        deadline: "30 May 2025",
        budget: 2_100_000,
        budgetLabel: "MK 2,100,000",
        quotes: 9,
        image: "/cement.jpg",
        Icon: Hammer,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
    },
    {
        id: "REQ-007",
        title: "Truck Hire for Deliveries",
        category: "Transport",
        location: "Mzuzu",
        postedBy: "Northern Traders",
        description: "Monthly truck hire for goods deliveries between Mzuzu and Lilongwe. 5-10 tonne truck preferred.",
        deadline: "01 Jun 2025",
        budget: 1_500_000,
        budgetLabel: "MK 1,500,000",
        quotes: 6,
        image: "/truck.jpeg",
        Icon: Truck,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        id: "REQ-008",
        title: "Supply of Office Desks",
        category: "Office Supplies",
        location: "Lilongwe",
        postedBy: "Government of Malawi",
        description: "Executive office desks with drawers. Must be assembled and delivered to Capital Hill.",
        deadline: "03 Jun 2025",
        budget: 750_000,
        budgetLabel: "MK 750,000",
        quotes: 11,
        Icon: ShoppingCart,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
    },
    {
        id: "REQ-009",
        title: "Branding and T-shirt Printing",
        category: "Printing",
        location: "Zomba",
        postedBy: "Youth Organization",
        description: "Printing of 500 branded t-shirts and caps for our annual youth conference.",
        deadline: "05 Jun 2025",
        budget: 250_000,
        budgetLabel: "MK 250,000",
        quotes: 4,
        Icon: Printer,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
    },
]

const CATEGORIES = ["All", "Construction", "ICT", "Office Supplies", "Transport", "Others"]
const CATEGORY_MAP = {
    "All": null,
    "Construction": "Construction Materials",
    "ICT": "ICT Equipment",
    "Office Supplies": "Office Supplies",
    "Transport": "Transport",
    "Others": ["Printing", "Agriculture"],
}

const LOCATIONS = ["All Locations", "Lilongwe", "Blantyre", "Zomba", "Mzuzu"]

const BUDGETS = [
    { label: "All Budgets", min: 0, max: Infinity },
    { label: "Under MK 500,000", min: 0, max: 500_000 },
    { label: "MK 500,000 – 1,000,000", min: 500_000, max: 1_000_000 },
    { label: "MK 1,000,000 – 5,000,000", min: 1_000_000, max: 5_000_000 },
    { label: "Over MK 5,000,000", min: 5_000_000, max: Infinity },
]

const SORT_OPTIONS = ["Newest First", "Deadline (Soonest)", "Budget (High to Low)", "Most Quotes"]

const PAGE_SIZE = 4

// ─── Components ───────────────────────────────────────────────────────────────

function FilterSelect({ value, onChange, options }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-[13px] font-semibold text-slate-700 outline-none transition-colors focus:border-[#0EA432]/50 focus:ring-2 focus:ring-[#0EA432]/10"
            >
                {options.map((opt) => (
                    <option key={opt}>{opt}</option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
    )
}

function MobileRequirementCard({ req }) {
    const Icon = req.Icon
    return (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <div className="flex items-start gap-3">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", req.iconBg)}>
                    <Icon className={cn("h-5 w-5", req.iconColor)} />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-[14px] font-bold text-slate-900 leading-tight">{req.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                        <span>{req.location}</span>
                        <span className="text-slate-300">|</span>
                        <span>{req.category}</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-3 space-y-1.5 text-[12px]">
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="font-semibold text-slate-700">{req.quotes} Units</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Deadline:</span>
                    <span className="font-semibold text-red-600">{req.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Budget:</span>
                    <span className="font-bold text-slate-900">{req.budgetLabel}</span>
                </div>
            </div>
            
            <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-[#0EA432] py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0b8f2b] active:scale-[0.98]"
            >
                View Details
            </button>
        </div>
    )
}

function RequirementRow({ req }) {
    const Icon = req.Icon
    return (
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 last:border-0 lg:flex-row lg:items-center">
            {/* Left: image + details */}
            <div className="flex min-w-0 flex-1 items-start gap-4">
                {req.image ? (
                    <img
                        src={req.image}
                        alt={req.title}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                ) : (
                    <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ring-1 ring-slate-200/60", req.iconBg)}>
                        <Icon className={cn("h-7 w-7", req.iconColor)} />
                    </div>
                )}
                <div className="min-w-0">
                    <h3 className="text-[14px] font-bold text-slate-900">{req.title}</h3>
                    <p className="mt-0.5 text-[12px] text-slate-500">{req.category}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-slate-500">
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            {req.location}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="inline-flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            Posted by {req.postedBy}
                        </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-slate-400">{req.description}</p>
                </div>
            </div>

            {/* Middle: deadline + budget */}
            <div className="flex shrink-0 items-center gap-8 lg:w-64">
                <div>
                    <p className="text-[11px] text-slate-400">Deadline</p>
                    <p className="mt-0.5 text-[13px] font-semibold text-red-500">{req.deadline}</p>
                </div>
                <div>
                    <p className="text-[11px] text-slate-400">Budget</p>
                    <p className="mt-0.5 text-[13px] font-bold tabular-nums text-slate-900">{req.budgetLabel}</p>
                </div>
            </div>

            {/* Right: action */}
            <div className="flex shrink-0 flex-row items-center gap-3 lg:w-36 lg:flex-col lg:items-stretch lg:gap-1.5">
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0EA432] px-5 py-2.5 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-[#0b8f2b]"
                >
                    View Details
                </button>
                <p className="text-center text-[12px] font-medium text-slate-500">{req.quotes} Quotes</p>
            </div>
        </div>
    )
}

function Pagination({ page, pageCount, onChange }) {
    if (pageCount <= 1) return null
    return (
        <div className="flex items-center justify-center gap-1.5">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    type="button"
                    onClick={() => onChange(p)}
                    className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-bold transition-colors",
                        page === p
                            ? "bg-[#0EA432] text-white shadow-sm"
                            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
                    )}
                >
                    {p}
                </button>
            ))}
            <button
                type="button"
                onClick={() => onChange(Math.min(page + 1, pageCount))}
                disabled={page === pageCount}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const RequirementsPage = () => {
    const [search, setSearch] = useState("")
    const [mobileCategory, setMobileCategory] = useState("All")
    const [category, setCategory] = useState("All Categories")
    const [location, setLocation] = useState("All Locations")
    const [budget, setBudget] = useState("All Budgets")
    const [sortBy, setSortBy] = useState("Newest First")
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        const budgetRange = BUDGETS.find((b) => b.label === budget) ?? BUDGETS[0]
        let list = REQUIREMENTS.filter((req) => {
            if (search.trim()) {
                const q = search.toLowerCase()
                const hit =
                    req.title.toLowerCase().includes(q) ||
                    req.category.toLowerCase().includes(q) ||
                    req.location.toLowerCase().includes(q) ||
                    req.postedBy.toLowerCase().includes(q) ||
                    req.description.toLowerCase().includes(q)
                if (!hit) return false
            }
            
            const catFilter = CATEGORY_MAP[mobileCategory]
            if (catFilter !== null) {
                if (Array.isArray(catFilter)) {
                    if (!catFilter.includes(req.category)) return false
                } else {
                    if (req.category !== catFilter) return false
                }
            }
            
            if (location !== "All Locations" && req.location !== location) return false
            if (req.budget < budgetRange.min || req.budget > budgetRange.max) return false
            return true
        })

        list = [...list].sort((a, b) => {
            if (sortBy === "Budget (High to Low)") return b.budget - a.budget
            if (sortBy === "Most Quotes") return b.quotes - a.quotes
            if (sortBy === "Deadline (Soonest)") return new Date(a.deadline) - new Date(b.deadline)
            return 0
        })

        return list
    }, [search, mobileCategory, category, location, budget, sortBy])

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, pageCount)
    const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    const updateFilter = (setter) => (value) => {
        setter(value)
        setPage(1)
    }

    return (
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-5 pb-24 md:space-y-5 md:py-6 md:pb-8">

            {/* Mobile Header with back button */}
            <div className="flex items-center gap-3 md:hidden">
                <Link 
                    to="/seller/dashboard" 
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200"
                >
                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                </Link>
                <h1 className="text-lg font-bold text-slate-900">Browse Requirements</h1>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-[26px]">Browse Requirements</h1>
                <p className="mt-1 text-[14px] text-slate-500">Find and bid on requirements that match your business.</p>
            </div>

            {/* Mobile Search + Filter */}
            <div className="md:hidden flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search requirements..."
                        value={search}
                        onChange={(e) => updateFilter(setSearch)(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-[13px] text-slate-700 placeholder-slate-400 outline-none focus:border-[#0EA432]/50 focus:ring-2 focus:ring-[#0EA432]/10"
                    />
                </div>
                <button
                    type="button"
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white"
                >
                    <Filter className="h-4 w-4 text-slate-600" />
                </button>
            </div>

            {/* Mobile Category Tabs */}
            <div className="md:hidden">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => { setMobileCategory(cat); setPage(1) }}
                            className={cn(
                                "shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-colors",
                                mobileCategory === cat
                                    ? "bg-[#0EA432] text-white"
                                    : "bg-white text-slate-600 ring-1 ring-slate-200",
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Requirement Cards */}
            <div className="space-y-3 md:hidden">
                {filtered.map((req) => (
                    <MobileRequirementCard key={req.id} req={req} />
                ))}
                {filtered.length === 0 && (
                    <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-100">
                        <Search className="mx-auto h-8 w-8 text-slate-300" />
                        <p className="mt-3 text-[14px] font-semibold text-slate-700">No requirements found</p>
                        <p className="mt-1 text-[12px] text-slate-400">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {/* Desktop Main card */}
            <section className="hidden md:block overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">

                {/* Filter bar */}
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search requirements, e.g. cement, laptops, office chairs…"
                            value={search}
                            onChange={(e) => updateFilter(setSearch)(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-[13px] text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-[#0EA432]/50 focus:ring-2 focus:ring-[#0EA432]/10"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:shrink-0">
                        <FilterSelect value={category} onChange={updateFilter(setCategory)} options={["All Categories", "Office Supplies", "Construction Materials", "ICT Equipment", "Printing", "Agriculture", "Transport"]} />
                        <FilterSelect value={location} onChange={updateFilter(setLocation)} options={LOCATIONS} />
                        <FilterSelect value={budget} onChange={updateFilter(setBudget)} options={BUDGETS.map((b) => b.label)} />
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            More Filters
                        </button>
                    </div>
                </div>

                {/* Results meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
                    <p className="text-[13px] font-semibold text-slate-700">
                        {filtered.length} Requirement{filtered.length !== 1 ? "s" : ""} found
                    </p>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none rounded-full border border-slate-200 bg-white py-1.5 pl-3.5 pr-8 text-[12px] font-semibold text-slate-600 outline-none transition-colors focus:border-[#0EA432]/50"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt}>{`Sort by: ${opt}`}</option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>

                {/* Requirement list */}
                {pageItems.length === 0 ? (
                    <div className="px-5 py-16 text-center">
                        <Search className="mx-auto h-8 w-8 text-slate-300" />
                        <p className="mt-3 text-[14px] font-semibold text-slate-700">No requirements found</p>
                        <p className="mt-1 text-[12px] text-slate-400">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div>
                        {pageItems.map((req) => (
                            <RequirementRow key={req.id} req={req} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pageItems.length > 0 && (
                    <div className="border-t border-slate-100 px-5 py-4">
                        <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
                    </div>
                )}
            </section>
        </div>
    )
}

export default RequirementsPage
