import { useEffect, useMemo, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import {
    Building2,
    Truck,
    ShoppingBasket,
    Briefcase,
    Sprout,
    Zap,
    MapPin,
    Clock,
    Send,
    Plus,
    Users,
    Star,
    BadgeCheck,
    ChevronRight,
    Flame,
    Bell,
    CircleCheck,
    Phone,
    Bookmark,
    BookmarkCheck,
    Search,
    SlidersHorizontal,
    X,
    BarChart3,
    Sparkles,
    TrendingUp,
    ShieldCheck,
    Zap as ZapIcon,
    Award,
    PackageSearch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GrView } from "react-icons/gr";


const LOCATIONS = ["All Locations", "Lilongwe", "Blantyre", "Mzuzu", "Kasungu", "Dedza"]
const BUDGET_FILTERS = [
    { label: "Any Budget", min: 0, max: Infinity },
    { label: "Under MWK 500K", min: 0, max: 500_000 },
    { label: "MWK 500K – 2M", min: 500_000, max: 2_000_000 },
    { label: "MWK 2M – 5M", min: 2_000_000, max: 5_000_000 },
    { label: "Over MWK 5M", min: 5_000_000, max: Infinity },
]

// ── Buyer Requests ────────────────────────────────────────────────────────────

const buyerRequests = [
    {
        id: "REQ-001",
        what: "Portland Cement OPC 42.5",
        quantity: "200 Bags",
        buyer: "Dzuka Constructions",
        town: "Lilongwe",
        budget: 3_500_000,
        deadlineMs: Date.now() + 5 * 86_400_000 + 14 * 3_600_000,
        isUrgent: false,
        otherSellers: 7,
        avgQuote: 2_400_000,
        buyerVerified: true,
        buyerRating: 4.7,
        topBuyer: true,
        fastPayment: true,
        fastResponse: false,
        preferred: false,
        category: "Building",
        matchScore: 92,
        Icon: Building2,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        borderColor: "border-orange-200",
        images: [
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=640&h=400&fit=crop",
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&h=400&fit=crop",
        ],
    },
    {
        id: "REQ-002",
        what: "Mesh Office Chairs",
        quantity: "10 Chairs",
        buyer: "Capital Bank Ltd",
        town: "Lilongwe",
        budget: 450_000,
        deadlineMs: Date.now() + 2 * 86_400_000 + 5 * 3_600_000,
        isUrgent: true,
        otherSellers: 3,
        avgQuote: 380_000,
        buyerVerified: true,
        buyerRating: 4.9,
        topBuyer: true,
        fastPayment: true,
        fastResponse: true,
        preferred: true,
        category: "Office",
        matchScore: 88,
        Icon: Briefcase,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        borderColor: "border-purple-200",
        images: [
            "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=640&h=400&fit=crop",
        ],
    },
    {
        id: "REQ-003",
        what: "Yellow Maize — 50kg Bags",
        quantity: "100 Bags",
        buyer: "Chikondi Supermarket",
        town: "Blantyre",
        budget: 130_000,
        deadlineMs: Date.now() + 7 * 86_400_000,
        isUrgent: false,
        otherSellers: 12,
        avgQuote: 115_000,
        buyerVerified: false,
        buyerRating: 4.2,
        topBuyer: false,
        fastPayment: false,
        fastResponse: false,
        preferred: false,
        category: "Groceries",
        matchScore: 65,
        Icon: ShoppingBasket,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        borderColor: "border-green-200",
        images: [
            "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=640&h=400&fit=crop",
            "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=640&h=400&fit=crop",
        ],
    },
    {
        id: "REQ-004",
        what: "Solar Panels 300W",
        quantity: "20 Panels",
        buyer: "Zikomo Farm Ltd",
        town: "Kasungu",
        budget: 780_000,
        deadlineMs: Date.now() + 10 * 86_400_000,
        isUrgent: false,
        otherSellers: 5,
        avgQuote: 690_000,
        buyerVerified: true,
        buyerRating: 4.5,
        topBuyer: false,
        fastPayment: true,
        fastResponse: false,
        preferred: false,
        category: "Energy",
        matchScore: 78,
        Icon: Zap,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        borderColor: "border-yellow-200",
        images: [
            "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=640&h=400&fit=crop",
        ],
    },
    {
        id: "REQ-005",
        what: "Iron Sheets (28 Gauge)",
        quantity: "500 Sheets",
        buyer: "Mwai Hardware",
        town: "Mzuzu",
        budget: 2_200_000,
        deadlineMs: Date.now() + 1 * 86_400_000 + 8 * 3_600_000,
        isUrgent: true,
        otherSellers: 2,
        avgQuote: 1_950_000,
        buyerVerified: true,
        buyerRating: 4.6,
        topBuyer: false,
        fastPayment: false,
        fastResponse: true,
        preferred: true,
        category: "Building",
        matchScore: 95,
        Icon: Building2,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        borderColor: "border-orange-200",
        images: [
            "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=640&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=400&fit=crop",
        ],
    },
    {
        id: "REQ-006",
        what: "Fertilizer (CAN 23%N)",
        quantity: "200 × 50kg Bags",
        buyer: "Tikondwe Farmers Co-op",
        town: "Dedza",
        budget: 960_000,
        deadlineMs: Date.now() + 12 * 86_400_000,
        isUrgent: false,
        otherSellers: 8,
        avgQuote: 870_000,
        buyerVerified: true,
        buyerRating: 4.3,
        topBuyer: false,
        fastPayment: true,
        fastResponse: false,
        preferred: false,
        category: "Agriculture",
        matchScore: 71,
        Icon: Sprout,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        borderColor: "border-emerald-200",
        images: [
            "https://images.unsplash.com/photo-1560493676-04071185765b?w=640&h=400&fit=crop",
        ],
    },
]

const myListings = [
    { id: 1, title: "Cement Bags (50kg × 500)", inquiries: 8, status: "active" },
    { id: 2, title: "Office Desks × 20", inquiries: 3, status: "active" },
    { id: 3, title: "5-Ton Delivery Truck", inquiries: 5, status: "negotiating" },
]

const recentActivity = [
    { icon: Bell, bg: "bg-[#0EA432]/10", color: "text-[#0EA432]", text: "Buyer viewed your cement listing", time: "12 min ago", live: true },
    { icon: CircleCheck, bg: "bg-emerald-50", color: "text-emerald-600", text: "Quote accepted — Capital Bank office chairs", time: "2 hours ago", live: false },
    { icon: Sparkles, bg: "bg-amber-50", color: "text-amber-500", text: "New request matches your Building category", time: "3 hours ago", live: true },
    { icon: Star, bg: "bg-amber-50", color: "text-amber-500", text: "Dzuka Constructions gave you 5 stars", time: "Yesterday", live: false },
]

const analytics = {
    responseRate: 87,
    quotesSent: 24,
    dealsWon: 6,
    avgDealValue: 1_850_000,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTimeRemaining(deadlineMs) {
    const diff = Math.max(0, deadlineMs - Date.now())
    const days = Math.floor(diff / 86_400_000)
    const hours = Math.floor((diff % 86_400_000) / 3_600_000)
    const minutes = Math.floor((diff % 3_600_000) / 60_000)
    return { days, hours, minutes, total: diff, isUrgent: days <= 3 }
}

function formatCountdown({ days, hours, minutes }) {
    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
}

function competitionLabel(count) {
    if (count <= 3) return { text: "Few sellers — good chance!", color: "text-emerald-600", bg: "bg-emerald-50" }
    if (count <= 8) return { text: "Some competition", color: "text-amber-600", bg: "bg-amber-50" }
    return { text: "Many sellers applied", color: "text-red-600", bg: "bg-red-50" }
}

function formatAvgQuote(value) {
    if (value >= 1_000_000) return `MWK ${(value / 1_000_000).toFixed(1)}M`
    return `MWK ${value.toLocaleString()}`
}

// ── Countdown Hook ──────────────────────────────────────────────────────────────

function useCountdown(deadlineMs) {
    const [remaining, setRemaining] = useState(() => getTimeRemaining(deadlineMs))

    useEffect(() => {
        const tick = () => setRemaining(getTimeRemaining(deadlineMs))
        tick()
        const id = setInterval(tick, 60_000)
        return () => clearInterval(id)
    }, [deadlineMs])

    return remaining
}


// ── Countdown Display ─────────────────────────────────────────────────────────

function CountdownDisplay({ deadlineMs, size = "md" }) {
    const remaining = useCountdown(deadlineMs)
    const urgent = remaining.isUrgent

    return (
        <div className={cn(
            "inline-flex items-center gap-1.5 font-semibold tabular-nums",
            size === "lg" ? "text-[15px]" : "text-[13px]",
            urgent ? "text-red-600" : "text-slate-700",
        )}>
            <Clock className={cn("shrink-0", size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5", urgent && "text-red-500")} />
            {urgent && remaining.days <= 1
                ? formatCountdown(remaining)
                : remaining.days > 0
                    ? `Closes in ${remaining.days} day${remaining.days !== 1 ? "s" : ""}`
                    : formatCountdown(remaining)}
        </div>
    )
}

// ── Recommended Card ──────────────────────────────────────────────────────────

function RecommendedCard({ req }) {
    const Icon = req.Icon
    const remaining = useCountdown(req.deadlineMs)

    return (
        <Link
            to="/seller/requirements"
            className={cn(
                "shrink-0 w-[260px] sm:w-[280px] bg-white rounded-2xl border-2 p-4 transition-all hover:shadow-md hover:-translate-y-0.5",
                remaining.isUrgent ? "border-red-200" : req.borderColor,
            )}
        >
            <div className="flex items-start gap-3">
                <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0", req.iconBg)}>
                    <Icon className={cn("h-5 w-5", req.iconColor)} />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{req.category}</p>
                    <h3 className="text-[14px] font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">{req.what}</h3>
                </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
                <p className="text-[16px] font-extrabold text-[#0EA432] tabular-nums">
                    MWK {req.budget.toLocaleString()}
                </p>
                <span className="text-[10px] font-bold text-[#0EA432] bg-[#0EA432]/10 px-2 py-0.5 rounded-full">
                    {req.matchScore}% match
                </span>
            </div>
            <div className="mt-2">
                <CountdownDisplay deadlineMs={req.deadlineMs} />
            </div>
        </Link>
    )
}

// ── Request Card ──────────────────────────────────────────────────────────────

function RequestCard({ req, saved, onToggleSave }) {
    const comp = competitionLabel(req.otherSellers)
    const Icon = req.Icon
    const remaining = useCountdown(req.deadlineMs)
    const closing = remaining.isUrgent
    const images = req.images ?? []
    const hasImages = images.length > 0
    const [activeImage, setActiveImage] = useState(0)
    const coverImage = hasImages ? images[activeImage] : null

    return (
        <article className={cn(
            "bg-white rounded-2xl border-2 overflow-hidden transition-shadow hover:shadow-md",
            closing ? "border-red-200" : req.borderColor,
        )}>
            {hasImages ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                        src={coverImage}
                        alt={req.what}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

                    {req.isUrgent && (
                        <div className="absolute top-0 inset-x-0 flex items-center justify-between gap-2 bg-red-500/95 px-4 py-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <Flame className="h-3.5 w-3.5 text-white shrink-0" />
                                <p className="text-white text-[12px] font-bold truncate">Closing soon!</p>
                            </div>
                            <span className="text-white text-[12px] font-bold tabular-nums shrink-0 bg-red-600/50 px-2 py-0.5 rounded-full">
                                {formatCountdown(remaining)}
                            </span>
                        </div>
                    )}

                    {req.matchScore >= 85 && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-[#0EA432] px-2 py-1 rounded-full shadow-sm">
                            Best Match
                        </span>
                    )}

                    {images.length > 1 && (
                        <div className="absolute bottom-2 right-2 flex gap-1">
                            {images.map((src, i) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setActiveImage(i)}
                                    className={cn(
                                        "h-8 w-8 rounded-md overflow-hidden ring-2 transition-all",
                                        i === activeImage ? "ring-white scale-105" : "ring-white/40 opacity-80 hover:opacity-100",
                                    )}
                                    aria-label={`View photo ${i + 1}`}
                                >
                                    <img src={src} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : req.isUrgent ? (
                <div className="flex items-center justify-between gap-2 bg-red-500 px-4 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <Flame className="h-3.5 w-3.5 text-white shrink-0" />
                        <p className="text-white text-[12px] font-bold truncate">Closing soon!</p>
                    </div>
                    <span className="text-white text-[12px] font-bold tabular-nums shrink-0 bg-red-600/50 px-2 py-0.5 rounded-full">
                        {formatCountdown(remaining)}
                    </span>
                </div>
            ) : null}

            <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                    {!hasImages && (
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", req.iconBg)}>
                            <Icon className={cn("h-6 w-6", req.iconColor)} />
                        </div>
                    )}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{req.what}</h3>
                            </div>
                            {req.matchScore >= 85 && !hasImages && (
                                <span className="shrink-0 text-[10px] font-bold text-[#0EA432] bg-[#0EA432]/10 px-2 py-1 rounded-full">
                                    Best Match
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-4 py-3 mb-3">
                    <p className="text-[11px] font-semibold text-[#166534] uppercase tracking-wide mb-0.5">They will pay up to</p>
                    <p className="text-[24px] font-extrabold text-[#0EA432] leading-none tabular-nums">
                        MWK {req.budget.toLocaleString()}
                    </p>
                    {req.avgQuote && (
                        <p className="text-[11px] text-slate-500 mt-1.5">
                            Average quote: <span className="font-semibold text-slate-700">{formatAvgQuote(req.avgQuote)}</span>
                        </p>
                    )}
                </div>

                <div className="space-y-2 mb-3">

                    <div className="flex items-center gap-2.5">
                        <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-[13px] text-slate-700">
                            Buyer: <span className="font-semibold">{req.buyer}</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Users className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-[13px] text-slate-700">
                            <span className="font-semibold">{req.otherSellers} seller{req.otherSellers !== 1 ? "s" : ""}</span> have submitted quotes
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link to="/seller/requirements" className="flex-1">
                        <button className={cn(
                            "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-bold transition-all active:scale-[0.98] shadow-sm",
                            closing
                                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-200"
                                : "bg-[#0EA432] hover:bg-[#0b8f2b] text-white shadow-[#0EA432]/20",
                        )}>
                            <Send className="h-4 w-4" />
                            Send Your Price
                        </button>
                    </Link>
                    <button
                        type="button"
                        onClick={() => onToggleSave(req.id)}
                        className={cn(
                            "flex items-center justify-center h-[46px] w-[46px] rounded-xl border-2 transition-colors shrink-0",
                            saved
                                ? "border-[#0EA432] bg-[#0EA432]/10 text-[#0EA432]"
                                : "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600",
                        )}
                        aria-label={saved ? "Remove from saved" : "Save for later"}
                    >
                        {saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </article>
    )
}

// ── Section Header ────────────────────────────────────────────────────────────

function RequestSection({ icon: Icon, title, emoji, requests, savedIds, onToggleSave }) {
    if (!requests.length) return null

    return (
        <section className="space-y-3">
            <div className="flex items-center gap-2 pt-2">
                {emoji ? (
                    <span className="text-lg">{emoji}</span>
                ) : Icon ? (
                    <Icon className="h-5 w-5 text-slate-600" />
                ) : null}
                <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
                <span className="text-[12px] font-semibold text-slate-400">({requests.length})</span>
            </div>
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                {requests.map((req) => (
                    <RequestCard
                        key={req.id}
                        req={req}
                        saved={savedIds.has(req.id)}
                        onToggleSave={onToggleSave}
                    />
                ))}
            </div>

        </section>
    )
}

// ── Filter Toolbar ────────────────────────────────────────────────────────────

function FilterToolbar({
    search, onSearchChange,
    location, onLocationChange,
    budgetIdx, onBudgetChange,
    closingSoon, onClosingSoonChange,
    verifiedOnly, onVerifiedChange,
    showMobileFilters, onToggleMobileFilters,
    activeFiltersCount,
    onClearFilters,
}) {
    return (
        <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search requests..."
                        className="w-full pl-9 pr-4 py-2.5 text-[13px] rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA432]/30 focus:border-[#0EA432]"
                    />
                </div>
                <button
                    type="button"
                    onClick={onToggleMobileFilters}
                    className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-[13px] font-semibold text-slate-700"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className="h-5 min-w-5 px-1 rounded-full bg-[#0EA432] text-white text-[10px] font-bold flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Desktop filters */}
            <div className="hidden sm:flex flex-wrap items-center gap-2">
                <select
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="text-[12px] font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0EA432]/30"
                >
                    {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>

                <select
                    value={budgetIdx}
                    onChange={(e) => onBudgetChange(Number(e.target.value))}
                    className="text-[12px] font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0EA432]/30"
                >
                    {BUDGET_FILTERS.map((b, i) => (
                        <option key={b.label} value={i}>{b.label}</option>
                    ))}
                </select>

                <FilterChip active={closingSoon} onClick={() => onClosingSoonChange(!closingSoon)} label="Closing Soon" />
                <FilterChip active={verifiedOnly} onClick={() => onVerifiedChange(!verifiedOnly)} label="Verified Buyers" />

                {activeFiltersCount > 0 && (
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="flex items-center gap-1 text-[12px] font-semibold text-red-500 hover:text-red-600 px-2"
                    >
                        <X className="h-3.5 w-3.5" /> Clear all
                    </button>
                )}
            </div>

            {/* Mobile filter drawer */}
            {showMobileFilters && (
                <div className="sm:hidden bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-[14px] font-bold text-slate-900">Filters</p>
                        <button type="button" onClick={onToggleMobileFilters}>
                            <X className="h-5 w-5 text-slate-400" />
                        </button>
                    </div>
                    <select
                        value={location}
                        onChange={(e) => onLocationChange(e.target.value)}
                        className="w-full text-[13px] font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                        {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                    <select
                        value={budgetIdx}
                        onChange={(e) => onBudgetChange(Number(e.target.value))}
                        className="w-full text-[13px] font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                        {BUDGET_FILTERS.map((b, i) => (
                            <option key={b.label} value={i}>{b.label}</option>
                        ))}
                    </select>
                    <div className="flex flex-wrap gap-2">
                        <FilterChip active={closingSoon} onClick={() => onClosingSoonChange(!closingSoon)} label="Closing Soon" />
                        <FilterChip active={verifiedOnly} onClick={() => onVerifiedChange(!verifiedOnly)} label="Verified Buyers" />
                    </div>
                    {activeFiltersCount > 0 && (
                        <button
                            type="button"
                            onClick={onClearFilters}
                            className="w-full text-[13px] font-semibold text-red-500 py-2"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

function FilterChip({ active, onClick, label }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "text-[12px] font-semibold px-3 py-2 rounded-xl border transition-colors",
                active
                    ? "border-[#0EA432] bg-[#0EA432]/10 text-[#0EA432]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
            )}
        >
            {label}
        </button>
    )
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ onClearFilters }) {
    return (
        <div className="text-center py-12 px-6 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <PackageSearch className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-[17px] font-bold text-slate-900">No matching opportunities right now</h3>
            <p className="text-[13px] text-slate-500 mt-1.5 max-w-sm mx-auto">
                Try adjusting your filters or expanding your categories to see more buyer requests.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={onClearFilters}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0EA432] text-white text-[13px] font-bold hover:bg-[#0b8f2b] transition-colors"
                >
                    Expand Categories
                </button>
                <Link
                    to="/seller/sell-requirement"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-slate-200 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    Update Seller Profile
                </Link>
                <Link
                    to="/seller/requirements"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-[#0EA432]/30 text-[#0EA432] text-[13px] font-bold hover:bg-[#0EA432]/5 transition-colors"
                >
                    Browse All Requests
                </Link>
            </div>
        </div>
    )
}

// ── Analytics Snapshot ────────────────────────────────────────────────────────

function AnalyticsSnapshot() {
    return (
        <div id="analytics" className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#0EA432]" />
                <h3 className="text-[15px] font-bold text-slate-900">Analytics Snapshot</h3>
            </div>
            <div className="grid grid-cols-2 gap-px bg-slate-100">
                {[
                    { label: "Response Rate", value: `${analytics.responseRate}%`, color: "text-[#0EA432]" },
                    { label: "Quotes Sent", value: analytics.quotesSent, color: "text-slate-900" },
                    { label: "Deals Won", value: analytics.dealsWon, color: "text-emerald-600" },
                    { label: "Avg Deal Value", value: formatAvgQuote(analytics.avgDealValue), color: "text-slate-900" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white px-4 py-3.5">
                        <p className={cn("text-[18px] font-extrabold tabular-nums leading-none", stat.color)}>{stat.value}</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const BidderDashboardPage = () => {
    const { username } = useAuth()
    const displayName = username || "Seller"

    const [activeCategory, setActiveCategory] = useState(null)
    const [search, setSearch] = useState("")
    const [location, setLocation] = useState("All Locations")
    const [budgetIdx, setBudgetIdx] = useState(0)
    const [closingSoon, setClosingSoon] = useState(false)
    const [verifiedOnly, setVerifiedOnly] = useState(false)
    const [showMobileFilters, setShowMobileFilters] = useState(false)
    const [savedIds, setSavedIds] = useState(new Set())

    const toggleSave = (id) => {
        setSavedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const clearFilters = () => {
        setActiveCategory(null)
        setSearch("")
        setLocation("All Locations")
        setBudgetIdx(0)
        setClosingSoon(false)
        setVerifiedOnly(false)
    }

    const activeFiltersCount = [
        activeCategory,
        search,
        location !== "All Locations",
        budgetIdx !== 0,
        closingSoon,
        verifiedOnly,
    ].filter(Boolean).length

    const filtered = useMemo(() => {
        const budget = BUDGET_FILTERS[budgetIdx]
        return buyerRequests.filter((req) => {
            if (activeCategory && req.category !== activeCategory) return false
            if (search && !req.what.toLowerCase().includes(search.toLowerCase()) && !req.buyer.toLowerCase().includes(search.toLowerCase())) return false
            if (location !== "All Locations" && req.town !== location) return false
            if (req.budget < budget.min || req.budget > budget.max) return false
            if (closingSoon && !getTimeRemaining(req.deadlineMs).isUrgent) return false
            if (verifiedOnly && !req.buyerVerified) return false
            return true
        })
    }, [activeCategory, search, location, budgetIdx, closingSoon, verifiedOnly])

    const closingSoonRequests = useMemo(
        () => filtered.filter((r) => getTimeRemaining(r.deadlineMs).isUrgent || r.isUrgent),
        [filtered],
    )
    const bestMatches = useMemo(
        () => filtered.filter((r) => r.matchScore >= 85 && !closingSoonRequests.some((c) => c.id === r.id)),
        [filtered, closingSoonRequests],
    )
    const moreOpportunities = useMemo(
        () => filtered.filter((r) => !closingSoonRequests.some((c) => c.id === r.id) && !bestMatches.some((b) => b.id === r.id)),
        [filtered, closingSoonRequests, bestMatches],
    )

    const recommended = useMemo(
        () => [...buyerRequests].sort((a, b) => b.matchScore - a.matchScore).slice(0, 4),
        [],
    )

    const urgentCount = buyerRequests.filter((r) => r.isUrgent || getTimeRemaining(r.deadlineMs).isUrgent).length
    const matchCount = buyerRequests.filter((r) => r.matchScore >= 70).length
    const nearestUrgent = useMemo(
        () => [...buyerRequests]
            .filter((r) => r.isUrgent || getTimeRemaining(r.deadlineMs).isUrgent)
            .sort((a, b) => a.deadlineMs - b.deadlineMs)[0],
        [],
    )

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 pb-24 md:pb-6">


            {/* ── Hero ── */}
            <div className="bg-linear-to-br from-[#f0fdf4] to-white border border-[#d1fae5] rounded-2xl px-5 py-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <p className="text-[13px] font-semibold text-[#0EA432] uppercase tracking-wide">Seller Dashboard</p>
                        <h1 className="text-[24px] font-extrabold text-slate-900 leading-snug mt-1">
                            Welcome back, {displayName}!
                        </h1>
                        <p className="text-[14px] text-slate-600 mt-1.5">
                            <span className="font-bold text-[#0EA432]">{matchCount} new opportunities</span> match your profile.
                            Send your price and win the job.
                        </p>
                    </div>
                    <Link to="/seller/sell-requirement" className="shrink-0">
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0EA432] text-white text-[13px] font-bold px-5 py-3 rounded-xl hover:bg-[#0b8f2b] transition-colors shadow-md shadow-[#0EA432]/20">
                            <Plus className="h-4 w-4" />
                            Add New Listing
                        </button>
                    </Link>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-xl p-3 text-center border border-[#d1fae5] shadow-sm">
                        <p className="text-[22px] font-extrabold text-[#0EA432] tabular-nums">{buyerRequests.length}</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-tight">Open Jobs</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-red-100 shadow-sm">
                        <p className="text-[22px] font-extrabold text-red-500 tabular-nums">{urgentCount}</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-tight">Closing Soon</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                        <p className="text-[22px] font-extrabold text-slate-800 tabular-nums">{matchCount}</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-tight">Best Matches</p>
                    </div>
                </div>
            </div>

            {/* ── Prominent Closing Soon alert ── */}
            {urgentCount > 0 && nearestUrgent && (
                <div className="bg-red-500 rounded-2xl px-5 py-4 shadow-lg shadow-red-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="h-10 w-10 rounded-xl bg-red-600/50 flex items-center justify-center shrink-0">
                                <Flame className="h-5 w-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[15px] font-bold text-white">
                                    {urgentCount} request{urgentCount > 1 ? "s" : ""} closing very soon!
                                </p>
                                <p className="text-[12px] text-red-100 mt-0.5">
                                    {nearestUrgent.what} — send your price before time runs out.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="bg-red-600/60 rounded-xl px-4 py-2 text-center">
                                <p className="text-[10px] font-bold text-red-100 uppercase tracking-wide">Time left</p>
                                <p className="text-[16px] font-extrabold text-white tabular-nums mt-0.5">
                                    {formatCountdown(getTimeRemaining(nearestUrgent.deadlineMs))}
                                </p>
                            </div>
                            <Link to="/seller/requirements">
                                <button className="bg-white text-red-600 text-[13px] font-bold px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors whitespace-nowrap">
                                    Send Price Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Recommended for You ── */}
            <section>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-[#0EA432]" />
                        <h2 className="text-[17px] font-bold text-slate-900">Recommended for You</h2>
                    </div>
                    <Link
                        to="/seller/requirements"
                        className="flex items-center gap-1 text-[12px] font-bold text-[#0EA432] hover:underline"
                    >
                        See All <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {recommended.map((req) => (
                        <RecommendedCard key={req.id} req={req} />
                    ))}
                </div>
            </section>


            {/* ── Main layout ── */}
            <div className="lg:grid lg:grid-cols-[1fr_290px] lg:gap-6">

                {/* LEFT: buyer requests */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-[17px] font-bold text-slate-900">Buyer Requests</h2>
                            <p className="text-[12px] text-slate-500 mt-0.5">
                                {filtered.length} request{filtered.length !== 1 ? "s" : ""} found
                                {activeCategory ? ` in ${activeCategory}` : ""}
                            </p>
                        </div>
                        <Link
                            to="/seller/requirements"
                            className="flex items-center gap-1 text-[12px] font-bold text-[#0EA432] border border-[#0EA432]/30 bg-[#0EA432]/5 px-3 py-1.5 rounded-full hover:bg-[#0EA432]/10 transition-colors shrink-0"
                        >
                            See All <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {filtered.length === 0 ? (
                        <EmptyState onClearFilters={clearFilters} />
                    ) : (
                        <div className="space-y-6">
                            <RequestSection
                                emoji="📦"
                                title="More Opportunities"
                                requests={moreOpportunities}
                                savedIds={savedIds}
                                onToggleSave={toggleSave}
                            />
                        </div>
                    )}
                </div>

                {/* RIGHT sidebar */}
                <aside className="mt-6 lg:mt-0 flex flex-col gap-4 self-start lg:sticky lg:top-4">

                    <AnalyticsSnapshot />

                    <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[15px] font-bold text-slate-900">Recent Updates</h3>
                                <span className="h-2 w-2 rounded-full bg-[#0EA432] animate-pulse" />
                            </div>
                            <span className="text-[10px] font-bold text-[#0EA432] bg-[#0EA432]/10 px-2 py-0.5 rounded-full uppercase">Live</span>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {recentActivity.map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <div key={i} className="flex gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors">
                                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 relative", item.bg)}>
                                            <Icon className={cn("h-4 w-4", item.color)} />
                                            {item.live && (
                                                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#0EA432] border border-white" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[12px] text-slate-700 leading-snug">{item.text}</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">{item.time}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default BidderDashboardPage
