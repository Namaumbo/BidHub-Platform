import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
    BookmarkPlus,
    Briefcase,
    Building2,
    CalendarDays,
    ChevronDown,
    Clock,
    DollarSign,
    Filter,
    Flame,
    LayoutGrid,
    LayoutList,
    MapPin,
    Search,
    Send,
    SlidersHorizontal,
    Star,
    Tag,
    TrendingUp,
    Users,
    X,
    Zap,
} from "lucide-react"

// ─── Static mock data ────────────────────────────────────────────────────────

const REQUIREMENTS = [
    {
        id: "REQ-1041",
        title: "100 MW Solar Power Plant – EPC Contract",
        category: "Energy & Utilities",
        status: "open",
        description:
            "Procurement of a full EPC contract for a 100 MW grid-tied photovoltaic solar power facility. Includes civil, structural, electrical works, SCADA integration, and 25-year O&M provisions.",
        budget: { min: 50_000_000, max: 80_000_000, currency: "USD" },
        location: { city: "Nairobi", country: "Kenya", region: "East Africa" },
        deadline: "2026-05-30",
        postedAt: "2026-04-08",
        bidsCount: 9,
        isUrgent: false,
        tags: ["Solar", "EPC", "Renewable Energy", "SCADA"],
        buyerName: "Kenya Power Corp",
        buyerRating: 4.7,
        buyerVerified: true,
    },
    {
        id: "REQ-1042",
        title: "Bulk Supply of Urea Fertilizer (5,000 MT)",
        category: "Agriculture & Inputs",
        status: "open",
        description:
            "Seeking certified suppliers for prilled or granular urea (46% N) with standard bagging. Delivery CIF Beira Port. All shipments must include SGS quality certificates.",
        budget: { min: 1_800_000, max: 2_400_000, currency: "USD" },
        location: { city: "Beira", country: "Mozambique", region: "Southern Africa" },
        deadline: "2026-05-05",
        postedAt: "2026-04-10",
        bidsCount: 14,
        isUrgent: true,
        tags: ["Fertilizer", "Urea", "Agriculture", "Bulk Supply"],
        buyerName: "AgroCom Holdings",
        buyerRating: 4.4,
        buyerVerified: true,
    },
    {
        id: "REQ-1043",
        title: "Enterprise Hospital Management Information System",
        category: "Healthcare IT",
        status: "open",
        description:
            "Development and deployment of a fully integrated HMIS covering patient records, billing, pharmacy, lab, radiology, and telemedicine modules across 12 district hospitals.",
        budget: { min: 2_500_000, max: 5_000_000, currency: "USD" },
        location: { city: "Lusaka", country: "Zambia", region: "Southern Africa" },
        deadline: "2026-06-15",
        postedAt: "2026-04-12",
        bidsCount: 6,
        isUrgent: false,
        tags: ["HMIS", "HealthTech", "EMR", "Software"],
        buyerName: "Ministry of Health Zambia",
        buyerRating: 4.9,
        buyerVerified: true,
    },
    {
        id: "REQ-1044",
        title: "Heavy Duty Road Construction Equipment Fleet",
        category: "Construction & Infrastructure",
        status: "shortlisted",
        description:
            "Procurement of 15 motor graders, 10 bulldozers, 20 tippers and 8 vibro-compactors for national road rehabilitation programme. Full warranty and spare parts support required.",
        budget: { min: 12_000_000, max: 18_000_000, currency: "USD" },
        location: { city: "Lilongwe", country: "Malawi", region: "Southern Africa" },
        deadline: "2026-04-25",
        postedAt: "2026-04-01",
        bidsCount: 5,
        isUrgent: true,
        tags: ["Heavy Equipment", "Road Works", "Construction"],
        buyerName: "Roads Authority Malawi",
        buyerRating: 4.2,
        buyerVerified: false,
    },
    {
        id: "REQ-1045",
        title: "Petroleum Storage Terminal Design & Build",
        category: "Oil & Gas",
        status: "open",
        description:
            "Tender for design and construction of a 50,000 m³ petroleum storage terminal including tank farm, truck loading bay, pipeline interface, fire suppression and metering systems.",
        budget: { min: 30_000_000, max: 45_000_000, currency: "USD" },
        location: { city: "Dar es Salaam", country: "Tanzania", region: "East Africa" },
        deadline: "2026-07-01",
        postedAt: "2026-04-14",
        bidsCount: 3,
        isUrgent: false,
        tags: ["Oil & Gas", "Storage Terminal", "EPC"],
        buyerName: "TanzPetro Ltd",
        buyerRating: 4.6,
        buyerVerified: true,
    },
    {
        id: "REQ-1046",
        title: "National Fibre Optic Backbone Expansion",
        category: "Telecommunications",
        status: "awarded",
        description:
            "Extension of the national broadband backbone by 2,400 km using OPGW and buried HDPE conduit. Includes PoP construction, network management system and 3-year SLA.",
        budget: { min: 60_000_000, max: 90_000_000, currency: "USD" },
        location: { city: "Kampala", country: "Uganda", region: "East Africa" },
        deadline: "2026-04-10",
        postedAt: "2026-03-18",
        bidsCount: 11,
        isUrgent: false,
        tags: ["Fibre Optic", "ICT", "Telecommunications", "OPGW"],
        buyerName: "Uganda Communications Commission",
        buyerRating: 4.8,
        buyerVerified: true,
    },
    {
        id: "REQ-1047",
        title: "Medical Oxygen Plant – 500 Cylinders/Day Capacity",
        category: "Healthcare Equipment",
        status: "open",
        description:
            "Turnkey supply and installation of a PSA medical oxygen generation plant capable of 500 cylinders per day with cylinder filling station, testing equipment and operator training.",
        budget: { min: 800_000, max: 1_400_000, currency: "USD" },
        location: { city: "Accra", country: "Ghana", region: "West Africa" },
        deadline: "2026-05-20",
        postedAt: "2026-04-11",
        bidsCount: 8,
        isUrgent: true,
        tags: ["Medical Oxygen", "PSA Plant", "Healthcare"],
        buyerName: "Ghana Health Service",
        buyerRating: 4.5,
        buyerVerified: true,
    },
    {
        id: "REQ-1048",
        title: "Smart Water Meter Rollout – 200,000 Units",
        category: "Water & Utilities",
        status: "open",
        description:
            "Supply and installation of 200,000 NB-IoT enabled smart water meters with an AMI data management platform, API integration to billing systems and a 5-year managed service contract.",
        budget: { min: 22_000_000, max: 30_000_000, currency: "USD" },
        location: { city: "Lagos", country: "Nigeria", region: "West Africa" },
        deadline: "2026-06-30",
        postedAt: "2026-04-13",
        bidsCount: 7,
        isUrgent: false,
        tags: ["Smart Meter", "IoT", "Water Utility", "AMI"],
        buyerName: "Lagos Water Corporation",
        buyerRating: 4.3,
        buyerVerified: true,
    },
]

const CATEGORIES = [
    "All Categories",
    "Agriculture & Inputs",
    "Construction & Infrastructure",
    "Energy & Utilities",
    "Healthcare Equipment",
    "Healthcare IT",
    "Oil & Gas",
    "Telecommunications",
    "Water & Utilities",
]

const REGIONS = [
    "All Regions",
    "East Africa",
    "Southern Africa",
    "West Africa",
    "Central Africa",
    "North Africa",
]

const BUDGET_RANGES = [
    { label: "Any Budget", min: 0, max: Infinity },
    { label: "Under $1M", min: 0, max: 1_000_000 },
    { label: "$1M – $5M", min: 1_000_000, max: 5_000_000 },
    { label: "$5M – $20M", min: 5_000_000, max: 20_000_000 },
    { label: "$20M – $50M", min: 20_000_000, max: 50_000_000 },
    { label: "Over $50M", min: 50_000_000, max: Infinity },
]

const SORT_OPTIONS = [
    { label: "Newest first", value: "newest" },
    { label: "Deadline (soonest)", value: "deadline" },
    { label: "Budget (high to low)", value: "budget_desc" },
    { label: "Most bids", value: "bids_desc" },
]

const STATUS_TABS = [
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
    { label: "Shortlisted", value: "shortlisted" },
    { label: "Awarded", value: "awarded" },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBudget(value) {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
    return `$${value}`
}

function daysUntil(dateStr) {
    const diff = Math.ceil((new Date(dateStr) - new Date()) / 86_400_000)
    if (diff < 0) return "Closed"
    if (diff === 0) return "Today"
    if (diff === 1) return "1 day left"
    return `${diff} days left`
}

function timeAgo(dateStr) {
    const diff = Math.floor((new Date() - new Date(dateStr)) / 86_400_000)
    if (diff === 0) return "Today"
    if (diff === 1) return "Yesterday"
    return `${diff} days ago`
}

const STATUS_CONFIG = {
    open: { label: "Open", className: "bg-emerald-100 text-emerald-800" },
    shortlisted: { label: "Shortlisted", className: "bg-sky-100 text-sky-800" },
    awarded: { label: "Awarded", className: "bg-neutral-900 text-white" },
    closed: { label: "Closed", className: "bg-slate-100 text-slate-600" },
}

// ─── Requirement Card ─────────────────────────────────────────────────────────

function RequirementCard({ req, view }) {
    const status = STATUS_CONFIG[req.status] ?? STATUS_CONFIG.closed
    const deadline = daysUntil(req.deadline)
    const deadlineUrgent = deadline !== "Closed" && parseInt(deadline) <= 7

    if (view === "grid") {
        return (
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                    <span className={cn("inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide", status.className)}>
                        {status.label}
                    </span>
                    {req.isUrgent && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600">
                            <Flame className="h-3 w-3" />
                            Urgent
                        </span>
                    )}
                </div>

                <h3 className="mt-3 text-base font-bold leading-snug text-slate-900 line-clamp-2">{req.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">{req.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {req.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="font-medium">{req.location.city}, {req.location.country}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-400">{req.location.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <DollarSign className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="font-semibold text-slate-800">{formatBudget(req.budget.min)} – {formatBudget(req.budget.max)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock className={cn("h-3.5 w-3.5 shrink-0", deadlineUrgent ? "text-red-500" : "text-slate-400")} />
                            <span className={deadlineUrgent ? "font-semibold text-red-600" : ""}>{deadline}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Users className="h-3.5 w-3.5 text-slate-400" />
                            <span>{req.bidsCount} bids</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0b4a74] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#093d61]">
                        <Send className="h-3.5 w-3.5" />
                        Submit Bid
                    </button>
                    <button className="flex items-center justify-center rounded-xl border border-slate-200 p-2.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
                        <BookmarkPlus className="h-4 w-4" />
                    </button>
                </div>
            </article>
        )
    }

    return (
        <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-start md:gap-6 lg:p-6">
            {/* Left: main info */}
            <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide", status.className)}>
                        {status.label}
                    </span>
                    {req.isUrgent && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600">
                            <Flame className="h-3 w-3" />
                            Urgent
                        </span>
                    )}
                    <span className="text-xs text-slate-400">#{req.id}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400">Posted {timeAgo(req.postedAt)}</span>
                </div>

                <div>
                    <h3 className="text-lg font-bold leading-snug text-slate-900 md:text-xl">{req.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-2">{req.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {req.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 sm:grid-cols-4">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Budget Range</p>
                        <p className="mt-0.5 text-sm font-bold text-slate-800">
                            {formatBudget(req.budget.min)} – {formatBudget(req.budget.max)}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Location</p>
                        <p className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-slate-800">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            {req.location.city}, {req.location.country}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Deadline</p>
                        <p className={cn(
                            "mt-0.5 flex items-center gap-1 text-sm font-semibold",
                            deadlineUrgent ? "text-red-600" : "text-slate-800"
                        )}>
                            <Clock className={cn("h-3.5 w-3.5", deadlineUrgent ? "text-red-500" : "text-slate-400")} />
                            {deadline}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Bids Received</p>
                        <p className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-slate-800">
                            <Users className="h-3.5 w-3.5 text-slate-400" />
                            {req.bidsCount} bids
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: buyer info + actions */}
            <div className="flex shrink-0 flex-row items-center gap-3 border-t border-slate-100 pt-4 md:w-52 md:flex-col md:items-stretch md:border-t-0 md:border-l md:pl-6 md:pt-0">
                <div className="flex-1 md:flex-none">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b4a74]/10 text-xs font-bold text-[#0b4a74]">
                            {req.buyerName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-slate-800">{req.buyerName}</p>
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-[10px] font-medium text-slate-500">{req.buyerRating}</span>
                                {req.buyerVerified && (
                                    <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                        <Tag className="h-3 w-3" />
                        {req.category}
                    </p>
                </div>

                <div className="flex flex-col gap-2 md:mt-3">
                    <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0b4a74] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#093d61]">
                        <Send className="h-3.5 w-3.5" />
                        Submit Bid
                    </button>
                    <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50">
                        View Details
                    </button>
                    <button className="flex w-full items-center justify-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600">
                        <BookmarkPlus className="h-3.5 w-3.5" />
                        Save
                    </button>
                </div>
            </div>
        </article>
    )
}

// ─── Main page ────────────────────────────────────────────────────────────────

const RequirementsPage = () => {
    const [search, setSearch] = useState("")
    const [activeStatus, setActiveStatus] = useState("all")
    const [category, setCategory] = useState("All Categories")
    const [region, setRegion] = useState("All Regions")
    const [budgetRange, setBudgetRange] = useState(0) // index into BUDGET_RANGES
    const [urgentOnly, setUrgentOnly] = useState(false)
    const [sortBy, setSortBy] = useState("newest")
    const [view, setView] = useState("list")
    const [showFilters, setShowFilters] = useState(false)

    const selectedBudget = BUDGET_RANGES[budgetRange]

    const activeFiltersCount = [
        activeStatus !== "all",
        category !== "All Categories",
        region !== "All Regions",
        budgetRange !== 0,
        urgentOnly,
    ].filter(Boolean).length

    const filtered = useMemo(() => {
        let list = REQUIREMENTS.filter((r) => {
            if (search.trim()) {
                const q = search.toLowerCase()
                const hit =
                    r.title.toLowerCase().includes(q) ||
                    r.description.toLowerCase().includes(q) ||
                    r.category.toLowerCase().includes(q) ||
                    r.tags.some((t) => t.toLowerCase().includes(q)) ||
                    r.location.city.toLowerCase().includes(q) ||
                    r.location.country.toLowerCase().includes(q)
                if (!hit) return false
            }
            if (activeStatus !== "all" && r.status !== activeStatus) return false
            if (category !== "All Categories" && r.category !== category) return false
            if (region !== "All Regions" && r.location.region !== region) return false
            if (r.budget.max < selectedBudget.min || r.budget.min > selectedBudget.max) return false
            if (urgentOnly && !r.isUrgent) return false
            return true
        })

        list = [...list].sort((a, b) => {
            if (sortBy === "newest") return new Date(b.postedAt) - new Date(a.postedAt)
            if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline)
            if (sortBy === "budget_desc") return b.budget.max - a.budget.max
            if (sortBy === "bids_desc") return b.bidsCount - a.bidsCount
            return 0
        })

        return list
    }, [search, activeStatus, category, region, selectedBudget, urgentOnly, sortBy])

    const totalBudget = REQUIREMENTS.reduce((sum, r) => sum + r.budget.max, 0)
    const openCount = REQUIREMENTS.filter((r) => r.status === "open").length
    const urgentCount = REQUIREMENTS.filter((r) => r.isUrgent).length

    const clearFilters = () => {
        setSearch("")
        setActiveStatus("all")
        setCategory("All Categories")
        setRegion("All Regions")
        setBudgetRange(0)
        setUrgentOnly(false)
        setSortBy("newest")
    }

    return (
        <div className="w-full space-y-5">

            {/* ── Header ─────────────────────────────────────────────────── */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Seller Portal</p>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900">Live Requirements</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Browse active procurement requirements from verified buyers. Filter by category, region, and budget to find the best match.
                        </p>
                    </div>
                    <div className="grid shrink-0 grid-cols-3 gap-3">
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Open</p>
                            <p className="mt-1 text-2xl font-extrabold tabular-nums text-[#0b4a74]">{openCount}</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Urgent</p>
                            <p className="mt-1 text-2xl font-extrabold tabular-nums text-red-600">{urgentCount}</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Total Value</p>
                            <p className="mt-1 text-xl font-extrabold tabular-nums text-slate-800">{formatBudget(totalBudget)}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Status tabs + search bar ────────────────────────────────── */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 pt-4">
                    <div className="flex gap-1 overflow-x-auto pb-px">
                        {STATUS_TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveStatus(tab.value)}
                                className={cn(
                                    "whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                                    activeStatus === tab.value
                                        ? "border-b-2 border-[#0b4a74] text-[#0b4a74]"
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {tab.label}
                                {tab.value !== "all" && (
                                    <span className={cn(
                                        "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                                        activeStatus === tab.value ? "bg-[#0b4a74]/10 text-[#0b4a74]" : "bg-slate-100 text-slate-500"
                                    )}>
                                        {REQUIREMENTS.filter((r) => r.status === tab.value).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 p-4">
                    {/* Search */}
                    <div className="relative flex-1 min-w-56">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search requirements, tags, locations…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-[#0b4a74]/40 focus:bg-white focus:ring-2 focus:ring-[#0b4a74]/10"
                        />
                        {search && (
                            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <TrendingUp className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/10"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    </div>

                    {/* Filter toggle */}
                    <button
                        onClick={() => setShowFilters((v) => !v)}
                        className={cn(
                            "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
                            showFilters || activeFiltersCount > 0
                                ? "border-[#0b4a74]/30 bg-[#0b4a74]/5 text-[#0b4a74]"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                        )}
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0b4a74] text-[10px] font-bold text-white">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    {/* View toggle */}
                    <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <button
                            onClick={() => setView("list")}
                            className={cn(
                                "rounded-lg p-1.5 transition-colors",
                                view === "list" ? "bg-white text-[#0b4a74] shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <LayoutList className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setView("grid")}
                            className={cn(
                                "rounded-lg p-1.5 transition-colors",
                                view === "grid" ? "bg-white text-[#0b4a74] shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* ── Expanded filter panel ────────────────────────────────── */}
                {showFilters && (
                    <div className="border-t border-slate-100 px-4 py-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            {/* Category */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                    <Briefcase className="h-3 w-3" />
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/10"
                                    >
                                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>

                            {/* Region */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                    <MapPin className="h-3 w-3" />
                                    Region
                                </label>
                                <div className="relative">
                                    <select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/10"
                                    >
                                        {REGIONS.map((r) => <option key={r}>{r}</option>)}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                    <DollarSign className="h-3 w-3" />
                                    Budget Range
                                </label>
                                <div className="relative">
                                    <select
                                        value={budgetRange}
                                        onChange={(e) => setBudgetRange(Number(e.target.value))}
                                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/10"
                                    >
                                        {BUDGET_RANGES.map((b, i) => (
                                            <option key={b.label} value={i}>{b.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>

                            {/* Urgent + clear */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                    <Filter className="h-3 w-3" />
                                    Quick filters
                                </label>
                                <div className="flex flex-col gap-2">
                                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 transition-colors hover:bg-slate-50">
                                        <input
                                            type="checkbox"
                                            checked={urgentOnly}
                                            onChange={(e) => setUrgentOnly(e.target.checked)}
                                            className="h-4 w-4 rounded accent-[#0b4a74]"
                                        />
                                        <Zap className="h-3.5 w-3.5 text-red-500" />
                                        <span className="text-sm font-medium text-slate-700">Urgent only</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {activeFiltersCount > 0 && (
                            <div className="mt-3 flex justify-end">
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                >
                                    <X className="h-3.5 w-3.5" />
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Results ─────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of{" "}
                    <span className="font-semibold text-slate-800">{REQUIREMENTS.length}</span> requirements
                </p>
                {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                        {activeStatus !== "all" && (
                            <ActiveFilterChip label={`Status: ${activeStatus}`} onRemove={() => setActiveStatus("all")} />
                        )}
                        {category !== "All Categories" && (
                            <ActiveFilterChip label={category} onRemove={() => setCategory("All Categories")} />
                        )}
                        {region !== "All Regions" && (
                            <ActiveFilterChip label={region} onRemove={() => setRegion("All Regions")} />
                        )}
                        {budgetRange !== 0 && (
                            <ActiveFilterChip label={selectedBudget.label} onRemove={() => setBudgetRange(0)} />
                        )}
                        {urgentOnly && (
                            <ActiveFilterChip label="Urgent only" onRemove={() => setUrgentOnly(false)} />
                        )}
                    </div>
                )}
            </div>

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
                    <div className="rounded-full bg-slate-100 p-4">
                        <Building2 className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="mt-4 text-base font-semibold text-slate-700">No requirements found</p>
                    <p className="mt-1 text-sm text-slate-400">Try adjusting your filters or search query.</p>
                    <button
                        onClick={clearFilters}
                        className="mt-4 rounded-xl bg-[#0b4a74] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#093d61]"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className={cn(
                    view === "grid"
                        ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                        : "space-y-4"
                )}>
                    {filtered.map((req) => (
                        <RequirementCard key={req.id} req={req} view={view} />
                    ))}
                </div>
            )}

            {/* ── Load more hint ───────────────────────────────────────────── */}
            {filtered.length > 0 && (
                <div className="pb-4 text-center">
                    <p className="text-xs text-slate-400">
                        <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                        Requirements update in real-time. New postings appear automatically.
                    </p>
                </div>
            )}
        </div>
    )
}

// ─── Small helper ─────────────────────────────────────────────────────────────

function ActiveFilterChip({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#0b4a74]/8 px-2.5 py-1 text-[11px] font-semibold text-[#0b4a74]">
            {label}
            <button onClick={onRemove} className="ml-0.5 transition-opacity hover:opacity-70">
                <X className="h-3 w-3" />
            </button>
        </span>
    )
}

export default RequirementsPage
