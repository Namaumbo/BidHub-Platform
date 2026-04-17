import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
    ArrowUpRight,
    BadgeCheck,
    Bell,
    ChevronDown,
    Clock,
    Edit3,
    Eye,
    FileText,
    Flame,
    LayoutGrid,
    LayoutList,
    MessageCircle,
    MoreHorizontal,
    Package,
    PauseCircle,
    Plus,
    Search,
    TrendingUp,
    Users,
    X,
    Zap,
} from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const MY_POSTS = [
    {
        id: "POST-3301",
        title: "Industrial Grade PVC Pipes – Full Range (DN25 – DN630)",
        category: "Construction Materials",
        description:
            "High-pressure PVC-U and PVC-O pressure pipes manufactured to ISO 4422 and SANS 966 standards. Available in full DN range with fittings, couplings and pressure-rated valves. Ideal for municipal water reticulation, irrigation and industrial process pipelines.",
        askingPrice: { value: 42, unit: "USD/m", note: "Ex-works pricing" },
        status: "active",
        postedAt: "2026-04-01",
        expiresAt: "2026-07-01",
        views: 1_284,
        inquiries: 34,
        quotesRequested: 12,
        newInquiries: 5,
        isHot: true,
        location: "Durban, South Africa",
        tags: ["PVC Pipes", "Water Infrastructure", "ISO 4422", "Fittings"],
        recentActivity: [
            { buyer: "Nairobi City Water", action: "Requested a quote", time: "2h ago" },
            { buyer: "Zambia Water Corp", action: "Viewed your post", time: "5h ago" },
            { buyer: "Kigali Infra Ltd", action: "Sent an inquiry", time: "Yesterday" },
        ],
        engagementTrend: "+18%",
        coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=320&h=200&fit=crop",
    },
    {
        id: "POST-3302",
        title: "Solar PV Modules – Tier 1 Monocrystalline 550W–660W",
        category: "Renewable Energy",
        description:
            "IEC 61215 and IEC 61730 certified Tier-1 monocrystalline PERC modules with bifacial option. PID-resistant, salt-mist rated, full linear power warranty. Suitable for utility, C&I and mini-grid projects across Africa.",
        askingPrice: { value: 0.19, unit: "USD/Wp", note: "CIF main ports" },
        status: "negotiating",
        postedAt: "2026-03-20",
        expiresAt: "2026-06-20",
        views: 3_410,
        inquiries: 67,
        quotesRequested: 28,
        newInquiries: 11,
        isHot: true,
        location: "Shanghai, China (exports Africa)",
        tags: ["Solar Panels", "PERC", "Bifacial", "Tier 1"],
        recentActivity: [
            { buyer: "Kenya Power Corp", action: "Negotiating terms", time: "1h ago" },
            { buyer: "BRT Solar Ghana", action: "Requested bulk pricing", time: "3h ago" },
            { buyer: "SunVolt Tanzania", action: "Sent an inquiry", time: "6h ago" },
        ],
        engagementTrend: "+41%",
        coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=320&h=200&fit=crop",
    },
    {
        id: "POST-3303",
        title: "Urea Fertilizer (46% N) – Prilled & Granular, Bulk FOB",
        category: "Agriculture & Inputs",
        description:
            "Premium-grade nitrogen fertilizer available prilled or granular. SGS-certified with guaranteed 46% nitrogen content. Available in 50kg bags or bulk shipments from 500 MT. FOB Durban or CIF negotiable.",
        askingPrice: { value: 340, unit: "USD/MT", note: "FOB Durban" },
        status: "active",
        postedAt: "2026-04-08",
        expiresAt: "2026-07-08",
        views: 892,
        inquiries: 19,
        quotesRequested: 7,
        newInquiries: 3,
        isHot: false,
        location: "Durban, South Africa",
        tags: ["Urea", "Nitrogen Fertilizer", "46%N", "Bulk Supply"],
        recentActivity: [
            { buyer: "AgroCom Holdings", action: "Requested a quote", time: "4h ago" },
            { buyer: "Malawi Farm Inputs", action: "Sent an inquiry", time: "Yesterday" },
        ],
        engagementTrend: "+9%",
        coverImage: "https://images.unsplash.com/photo-1560493676-04071185765b?w=320&h=200&fit=crop",
    },
    {
        id: "POST-3304",
        title: "Hospital Beds – ICU & General Ward, Full Range",
        category: "Medical Equipment",
        description:
            "CE-marked motorised ICU beds (3-function & 5-function), fixed-height general ward beds and examination couches. Stainless steel or epoxy-coated frame options. Bulk pricing available for 50+ units.",
        askingPrice: { value: 1_800, unit: "USD/unit", note: "ICU beds, EXW" },
        status: "active",
        postedAt: "2026-04-10",
        expiresAt: "2026-06-10",
        views: 534,
        inquiries: 11,
        quotesRequested: 4,
        newInquiries: 2,
        isHot: false,
        location: "Nairobi, Kenya",
        tags: ["Medical Equipment", "Hospital Beds", "CE Mark", "ICU"],
        recentActivity: [
            { buyer: "Zambia Ministry of Health", action: "Sent an inquiry", time: "8h ago" },
            { buyer: "RiverView Hospital", action: "Viewed your post", time: "Yesterday" },
        ],
        engagementTrend: "+6%",
        coverImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=320&h=200&fit=crop",
    },
    {
        id: "POST-3305",
        title: "Branded Cement 42.5R – Bulk Supply (500 – 5,000 MT)",
        category: "Construction Materials",
        description:
            "Ordinary Portland Cement 42.5R conforming to EN 197-1. Consistent quality with COA provided per shipment. Bulk bags and 50 kg retail bags available. Ideal for large construction contractors and government procurement.",
        askingPrice: { value: 112, unit: "USD/MT", note: "Delivered Nairobi" },
        status: "paused",
        postedAt: "2026-03-15",
        expiresAt: "2026-06-15",
        views: 2_105,
        inquiries: 43,
        quotesRequested: 18,
        newInquiries: 0,
        isHot: false,
        location: "Mombasa, Kenya",
        tags: ["Cement", "42.5R", "OPC", "Bulk Supply"],
        recentActivity: [],
        engagementTrend: "-2%",
        coverImage: null,
    },
    {
        id: "POST-3306",
        title: "LV/MV Switchgear & Protection Panels – Custom Fabrication",
        category: "Electrical & Power",
        description:
            "IEC 61439-1/2 compliant low and medium voltage switchgear panels. Custom-engineered MCC, PCC, AMF/ATS panels with ABB, Schneider, or Siemens componentry. Type-tested assemblies with full test certificates available.",
        askingPrice: { value: 8_500, unit: "USD/panel", note: "Indicative" },
        status: "sold",
        postedAt: "2026-02-20",
        expiresAt: "2026-05-20",
        views: 1_670,
        inquiries: 52,
        quotesRequested: 23,
        newInquiries: 0,
        isHot: false,
        location: "Johannesburg, South Africa",
        tags: ["Switchgear", "MCC", "ATS Panel", "IEC 61439"],
        recentActivity: [],
        engagementTrend: "Closed",
        coverImage: null,
    },
]

const STATUS_TABS = [
    { label: "All Posts", value: "all" },
    { label: "Active", value: "active" },
    { label: "Negotiating", value: "negotiating" },
    { label: "Paused", value: "paused" },
    { label: "Sold / Closed", value: "sold" },
]

const SORT_OPTIONS = [
    { label: "Most recent", value: "newest" },
    { label: "Most inquiries", value: "inquiries" },
    { label: "Most views", value: "views" },
    { label: "Expiring soon", value: "expiry" },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
    const diff = Math.floor((new Date() - new Date(dateStr)) / 86_400_000)
    if (diff === 0) return "Today"
    if (diff === 1) return "Yesterday"
    return `${diff} days ago`
}

function daysLeft(dateStr) {
    const diff = Math.ceil((new Date(dateStr) - new Date()) / 86_400_000)
    if (diff < 0) return "Expired"
    if (diff === 0) return "Expires today"
    if (diff <= 7) return `${diff}d left`
    return `${diff} days left`
}

const STATUS_CONFIG = {
    active: {
        label: "Active",
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-800",
    },
    negotiating: {
        label: "Negotiating",
        dot: "bg-sky-500",
        badge: "bg-sky-100 text-sky-800",
    },
    paused: {
        label: "Paused",
        dot: "bg-amber-500",
        badge: "bg-amber-100 text-amber-800",
    },
    sold: {
        label: "Sold / Closed",
        dot: "bg-slate-400",
        badge: "bg-neutral-900 text-white",
    },
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post, view }) {
    const cfg = STATUS_CONFIG[post.status] ?? STATUS_CONFIG.active
    const expires = daysLeft(post.expiresAt)
    const expiresUrgent = expires !== "Expired" && !expires.includes("days") && !expires.includes("Expired")
    const trendUp = post.engagementTrend.startsWith("+")

    if (view === "grid") {
        return (
            <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                {post.coverImage ? (
                    <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                        <img src={post.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        {post.isHot && (
                            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                                <Flame className="h-3 w-3" />
                                HOT
                            </span>
                        )}
                        {post.newInquiries > 0 && (
                            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#0b4a74] px-2 py-0.5 text-[10px] font-bold text-white shadow">
                                <Bell className="h-3 w-3" />
                                {post.newInquiries} new
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="relative flex h-40 w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                        <Package className="h-10 w-10 text-slate-300" />
                        {post.isHot && (
                            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                                <Flame className="h-3 w-3" />
                                HOT
                            </span>
                        )}
                        {post.newInquiries > 0 && (
                            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#0b4a74] px-2 py-0.5 text-[10px] font-bold text-white shadow">
                                <Bell className="h-3 w-3" />
                                {post.newInquiries} new
                            </span>
                        )}
                    </div>
                )}

                <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between gap-2">
                        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", cfg.badge)}>
                            <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
                            {cfg.label}
                        </span>
                        <span className="text-[10px] text-slate-400">{post.id}</span>
                    </div>

                    <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900 line-clamp-2">{post.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">{post.description}</p>

                    <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3">
                        <div className="text-center">
                            <p className="text-[10px] font-semibold uppercase text-slate-400">Views</p>
                            <p className="text-sm font-bold text-slate-800">{post.views.toLocaleString()}</p>
                        </div>
                        <div className="text-center border-x border-slate-200">
                            <p className="text-[10px] font-semibold uppercase text-slate-400">Inquiries</p>
                            <p className="text-sm font-bold text-slate-800">{post.inquiries}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-semibold uppercase text-slate-400">Quotes</p>
                            <p className="text-sm font-bold text-slate-800">{post.quotesRequested}</p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className={cn(
                            "flex items-center gap-1 text-xs font-semibold",
                            trendUp ? "text-emerald-600" : post.engagementTrend === "Closed" ? "text-slate-400" : "text-red-500"
                        )}>
                            <TrendingUp className="h-3.5 w-3.5" />
                            {post.engagementTrend} this week
                        </span>
                        <span className={cn(
                            "text-[10px] font-semibold",
                            expiresUrgent ? "text-amber-600" : "text-slate-400"
                        )}>
                            {expires}
                        </span>
                    </div>

                    <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0b4a74] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#093d61]">
                            <MessageCircle className="h-3.5 w-3.5" />
                            View Inquiries
                        </button>
                        <button className="flex items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
                            <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="flex items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </article>
        )
    }

    // List view
    return (
        <article className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-stretch">
            {/* Thumbnail */}
            <div className="relative h-44 w-full shrink-0 overflow-hidden bg-slate-100 md:h-auto md:w-44 md:rounded-l-2xl">
                {post.coverImage ? (
                    <img src={post.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-10 w-10 text-slate-300" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />
                {post.isHot && (
                    <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                        <Flame className="h-3 w-3" />
                        HOT
                    </span>
                )}
                {post.newInquiries > 0 && (
                    <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-[#0b4a74] px-2 py-0.5 text-[10px] font-bold text-white shadow md:hidden">
                        <Bell className="h-3 w-3" />
                        {post.newInquiries} new
                    </span>
                )}
            </div>

            {/* Main content */}
            <div className="min-w-0 flex-1 p-5">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", cfg.badge)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
                        {cfg.label}
                    </span>
                    {post.newInquiries > 0 && (
                        <span className="hidden items-center gap-1 rounded-full bg-[#0b4a74]/10 px-2 py-0.5 text-[10px] font-bold text-[#0b4a74] md:inline-flex">
                            <Bell className="h-3 w-3" />
                            {post.newInquiries} new inquiries
                        </span>
                    )}
                    <span className="text-xs text-slate-400">#{post.id}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">Posted {timeAgo(post.postedAt)}</span>
                </div>

                <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 md:text-xl">{post.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 line-clamp-2">{post.description}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-4">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Asking Price</p>
                        <p className="mt-0.5 text-sm font-bold text-slate-900">
                            ${post.askingPrice.value.toLocaleString()} <span className="text-xs font-medium text-slate-500">/ {post.askingPrice.unit.split("/")[1]}</span>
                        </p>
                        <p className="text-[10px] text-slate-400">{post.askingPrice.note}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Total Views</p>
                        <p className="mt-0.5 flex items-center gap-1 text-sm font-bold text-slate-900">
                            <Eye className="h-3.5 w-3.5 text-slate-400" />
                            {post.views.toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Inquiries</p>
                        <p className="mt-0.5 flex items-center gap-1 text-sm font-bold text-slate-900">
                            <MessageCircle className="h-3.5 w-3.5 text-slate-400" />
                            {post.inquiries}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Quotes Sent</p>
                        <p className="mt-0.5 flex items-center gap-1 text-sm font-bold text-slate-900">
                            <FileText className="h-3.5 w-3.5 text-slate-400" />
                            {post.quotesRequested}
                        </p>
                    </div>
                </div>

                {/* Trend + Expiry */}
                <div className="mt-3 flex flex-wrap items-center gap-4">
                    <span className={cn(
                        "flex items-center gap-1 text-xs font-semibold",
                        trendUp ? "text-emerald-600" : post.engagementTrend === "Closed" ? "text-slate-400" : "text-red-500"
                    )}>
                        <TrendingUp className="h-3.5 w-3.5" />
                        {post.engagementTrend} engagement this week
                    </span>
                    <span className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        expiresUrgent ? "text-amber-600" : "text-slate-400"
                    )}>
                        <Clock className="h-3.5 w-3.5" />
                        {expires}
                    </span>
                </div>

                {/* Recent activity */}
                {post.recentActivity.length > 0 && (
                    <div className="mt-4 space-y-1.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">Recent Activity</p>
                        {post.recentActivity.slice(0, 2).map((a, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0b4a74]/10 text-[10px] font-bold text-[#0b4a74]">
                                    {a.buyer.charAt(0)}
                                </div>
                                <span className="font-semibold text-slate-700">{a.buyer}</span>
                                <span className="text-slate-400">{a.action}</span>
                                <span className="ml-auto shrink-0 text-slate-400">{a.time}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions panel */}
            <div className="flex shrink-0 flex-row items-center gap-2 border-t border-slate-100 p-4 md:w-48 md:flex-col md:items-stretch md:border-t-0 md:border-l md:py-5 md:pl-5 md:pr-5">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0b4a74] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#093d61] md:flex-none md:w-full">
                    <MessageCircle className="h-3.5 w-3.5" />
                    View Inquiries
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 md:flex-none md:w-full">
                    <Eye className="h-3.5 w-3.5" />
                    Preview Post
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 md:flex-none md:w-full">
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit
                </button>
                {post.status === "active" && (
                    <button className="flex flex-1 items-center justify-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-amber-600 md:flex-none md:w-full md:py-1">
                        <PauseCircle className="h-3.5 w-3.5" />
                        Pause
                    </button>
                )}
                {post.status === "paused" && (
                    <button className="flex flex-1 items-center justify-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-emerald-600 md:flex-none md:w-full md:py-1">
                        <Zap className="h-3.5 w-3.5" />
                        Reactivate
                    </button>
                )}
            </div>
        </article>
    )
}

// ─── Main page ────────────────────────────────────────────────────────────────

const SellerMyPostsPage = () => {
    const [activeTab, setActiveTab] = useState("all")
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [view, setView] = useState("list")

    const overviewStats = useMemo(() => ({
        total: MY_POSTS.length,
        active: MY_POSTS.filter((p) => p.status === "active").length,
        totalInquiries: MY_POSTS.reduce((s, p) => s + p.inquiries, 0),
        newInquiries: MY_POSTS.reduce((s, p) => s + p.newInquiries, 0),
        totalViews: MY_POSTS.reduce((s, p) => s + p.views, 0),
        quotesRequested: MY_POSTS.reduce((s, p) => s + p.quotesRequested, 0),
    }), [])

    const filtered = useMemo(() => {
        let list = MY_POSTS.filter((p) => {
            if (activeTab !== "all" && p.status !== activeTab) return false
            if (search.trim()) {
                const q = search.toLowerCase()
                const hit =
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q))
                if (!hit) return false
            }
            return true
        })

        list = [...list].sort((a, b) => {
            if (sortBy === "newest") return new Date(b.postedAt) - new Date(a.postedAt)
            if (sortBy === "inquiries") return b.inquiries - a.inquiries
            if (sortBy === "views") return b.views - a.views
            if (sortBy === "expiry") return new Date(a.expiresAt) - new Date(b.expiresAt)
            return 0
        })

        return list
    }, [activeTab, search, sortBy])

    const conversionRate = overviewStats.totalViews > 0
        ? ((overviewStats.totalInquiries / overviewStats.totalViews) * 100).toFixed(1)
        : "0.0"

    return (
        <div className="w-full space-y-5">

            {/* ── Header ─────────────────────────────────────────────────── */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Seller Portal</p>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900">My Posts</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Track buyer interest, manage inquiries and monitor the performance of your listings.
                        </p>
                    </div>
                    <button className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0b4a74] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#093d61] self-start">
                        <Plus className="h-4 w-4" />
                        New Listing
                    </button>
                </div>

                {/* Stats row */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    <StatCard
                        label="Total Listings"
                        value={overviewStats.total}
                        icon={<FileText className="h-4 w-4 text-slate-500" />}
                    />
                    <StatCard
                        label="Active"
                        value={overviewStats.active}
                        icon={<BadgeCheck className="h-4 w-4 text-emerald-500" />}
                        highlight="emerald"
                    />
                    <StatCard
                        label="Total Views"
                        value={overviewStats.totalViews.toLocaleString()}
                        icon={<Eye className="h-4 w-4 text-sky-500" />}
                        highlight="sky"
                    />
                    <StatCard
                        label="Inquiries"
                        value={overviewStats.totalInquiries}
                        icon={<MessageCircle className="h-4 w-4 text-[#0b4a74]" />}
                        highlight="blue"
                        badge={overviewStats.newInquiries > 0 ? `${overviewStats.newInquiries} new` : null}
                    />
                    <StatCard
                        label="Quotes Sent"
                        value={overviewStats.quotesRequested}
                        icon={<FileText className="h-4 w-4 text-violet-500" />}
                        highlight="violet"
                    />
                    <StatCard
                        label="Conversion"
                        value={`${conversionRate}%`}
                        icon={<TrendingUp className="h-4 w-4 text-amber-500" />}
                        highlight="amber"
                        note="views → inquiry"
                    />
                </div>
            </section>

            {/* ── Filters & tabs ─────────────────────────────────────────── */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Status tabs */}
                <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-100 px-4 pt-3 pb-0">
                    {STATUS_TABS.map((tab) => {
                        const count = tab.value === "all"
                            ? MY_POSTS.length
                            : MY_POSTS.filter((p) => p.status === tab.value).length
                        return (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={cn(
                                    "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-t-lg px-3.5 py-2.5 text-sm font-semibold transition-colors",
                                    activeTab === tab.value
                                        ? "border-b-2 border-[#0b4a74] text-[#0b4a74]"
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {tab.label}
                                <span className={cn(
                                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                                    activeTab === tab.value ? "bg-[#0b4a74]/10 text-[#0b4a74]" : "bg-slate-100 text-slate-500"
                                )}>
                                    {count}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Search + sort + view */}
                <div className="flex flex-wrap items-center gap-3 p-4">
                    <div className="relative min-w-56 flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search your listings…"
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

                    <div className="relative">
                        <ArrowUpRight className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/10"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <button
                            onClick={() => setView("list")}
                            className={cn("rounded-lg p-1.5 transition-colors", view === "list" ? "bg-white text-[#0b4a74] shadow-sm" : "text-slate-400 hover:text-slate-600")}
                        >
                            <LayoutList className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setView("grid")}
                            className={cn("rounded-lg p-1.5 transition-colors", view === "grid" ? "bg-white text-[#0b4a74] shadow-sm" : "text-slate-400 hover:text-slate-600")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Results count ──────────────────────────────────────────── */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of{" "}
                    <span className="font-semibold text-slate-800">{MY_POSTS.length}</span> listings
                </p>
                {overviewStats.newInquiries > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b4a74]/10 px-3 py-1 text-xs font-semibold text-[#0b4a74]">
                        <Bell className="h-3.5 w-3.5" />
                        {overviewStats.newInquiries} unread inquiries across your posts
                    </span>
                )}
            </div>

            {/* ── Post list/grid ─────────────────────────────────────────── */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
                    <div className="rounded-full bg-slate-100 p-4">
                        <Users className="h-8 w-8 text-slate-300" />
                    </div>
                    <p className="mt-4 text-base font-semibold text-slate-700">No listings found</p>
                    <p className="mt-1 text-sm text-slate-400">Try a different filter or create a new listing.</p>
                    <button
                        onClick={() => { setActiveTab("all"); setSearch("") }}
                        className="mt-4 rounded-xl bg-[#0b4a74] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#093d61]"
                    >
                        View all posts
                    </button>
                </div>
            ) : (
                <div className={cn(
                    view === "grid"
                        ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                        : "space-y-4"
                )}>
                    {filtered.map((post) => (
                        <PostCard key={post.id} post={post} view={view} />
                    ))}
                </div>
            )}

            {/* ── Footer hint ────────────────────────────────────────────── */}
            {filtered.length > 0 && (
                <div className="pb-4 text-center">
                    <p className="text-xs text-slate-400">
                        Listings refresh in real-time. New buyer inquiries notify you instantly.
                    </p>
                </div>
            )}
        </div>
    )
}

// ─── Stat card helper ─────────────────────────────────────────────────────────

function StatCard({ label, value, icon, highlight, badge, note }) {
    const highlights = {
        emerald: "border-emerald-100 bg-emerald-50/60",
        sky: "border-sky-100 bg-sky-50/60",
        blue: "border-[#0b4a74]/10 bg-[#0b4a74]/5",
        violet: "border-violet-100 bg-violet-50/60",
        amber: "border-amber-100 bg-amber-50/60",
    }

    return (
        <div className={cn(
            "rounded-xl border p-3.5",
            highlight ? highlights[highlight] : "border-slate-100 bg-slate-50"
        )}>
            <div className="flex items-center justify-between gap-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
                {icon}
            </div>
            <div className="mt-2 flex items-end justify-between gap-1">
                <p className="text-2xl font-extrabold tabular-nums text-slate-900">{value}</p>
                {badge && (
                    <span className="rounded-full bg-[#0b4a74] px-1.5 py-0.5 text-[9px] font-bold text-white">
                        {badge}
                    </span>
                )}
            </div>
            {note && <p className="mt-0.5 text-[10px] text-slate-400">{note}</p>}
        </div>
    )
}

export default SellerMyPostsPage
