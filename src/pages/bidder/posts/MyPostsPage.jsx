import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    CalendarDays,
    ChevronRight,
    Clock,
    Edit3,
    Eye,
    MapPin,
    MessageCircle,
    Package,
    PackagePlus,
    PauseCircle,
    Plus,
    Search,
    Store,
    X,
    Zap,
} from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const MY_POSTS = [
    {
        id: "POST-3301",
        title: "Industrial Grade PVC Pipes – Full Range (DN25 – DN630)",
        category: "Construction Materials",
        price: 850_000,
        unit: "per metre",
        status: "active",
        postedAt: "2026-04-01",
        expiresAt: "2026-07-01",
        inquiries: 34,
        newInquiries: 5,
        location: "Lilongwe",
        coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=320&h=200&fit=crop",
    },
    {
        id: "POST-3302",
        title: "Solar PV Modules – Tier 1 Monocrystalline 550W–660W",
        category: "Renewable Energy",
        price: 780_000,
        unit: "per panel",
        status: "negotiating",
        postedAt: "2026-03-20",
        expiresAt: "2026-06-20",
        inquiries: 67,
        newInquiries: 11,
        location: "Blantyre",
        coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=320&h=200&fit=crop",
    },
    {
        id: "POST-3303",
        title: "Urea Fertilizer (46% N) – Prilled & Granular, Bulk FOB",
        category: "Agriculture & Inputs",
        price: 340_000,
        unit: "per tonne",
        status: "active",
        postedAt: "2026-04-08",
        expiresAt: "2026-07-08",
        inquiries: 19,
        newInquiries: 3,
        location: "Kasungu",
        coverImage: "https://images.unsplash.com/photo-1560493676-04071185765b?w=320&h=200&fit=crop",
    },
    {
        id: "POST-3304",
        title: "Hospital Beds – ICU & General Ward, Full Range",
        category: "Medical Equipment",
        price: 1_800_000,
        unit: "per unit",
        status: "active",
        postedAt: "2026-04-10",
        expiresAt: "2026-06-10",
        inquiries: 11,
        newInquiries: 2,
        location: "Mzuzu",
        coverImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=320&h=200&fit=crop",
    },
    {
        id: "POST-3305",
        title: "Branded Cement 42.5R – Bulk Supply (500 – 5,000 MT)",
        category: "Construction Materials",
        price: 112_000,
        unit: "per tonne",
        status: "paused",
        postedAt: "2026-03-15",
        expiresAt: "2026-06-15",
        inquiries: 43,
        newInquiries: 0,
        location: "Mombasa",
        coverImage: null,
    },
    {
        id: "POST-3306",
        title: "LV/MV Switchgear & Protection Panels – Custom Fabrication",
        category: "Electrical & Power",
        price: 8_500_000,
        unit: "per panel",
        status: "sold",
        postedAt: "2026-02-20",
        expiresAt: "2026-05-20",
        inquiries: 52,
        newInquiries: 0,
        location: "Johannesburg",
        coverImage: null,
    },
]

const STATUS_TABS = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Negotiating", value: "negotiating" },
    { label: "Paused", value: "paused" },
    { label: "Sold", value: "sold" },
]

const STATUS_STYLES = {
    active: "bg-emerald-100 text-emerald-700",
    negotiating: "bg-blue-100 text-blue-700",
    paused: "bg-amber-100 text-amber-700",
    sold: "bg-slate-100 text-slate-600",
}

const STATUS_LABELS = {
    active: "Active",
    negotiating: "Negotiating",
    paused: "Paused",
    sold: "Sold",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysLeft(dateStr) {
    const diff = Math.ceil((new Date(dateStr) - new Date()) / 86_400_000)
    if (diff < 0) return "Expired"
    if (diff === 0) return "Expires today"
    if (diff <= 7) return `${diff}d left`
    return `${diff} days left`
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post }) {
    const expires = daysLeft(post.expiresAt)
    const urgent = expires !== "Expired" && expires.includes("d left") && !expires.includes("days")

    return (
        <article className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-all hover:ring-2 hover:ring-[#0EA432]">
            <div className="flex gap-0">
                <div className="relative h-24 w-24 shrink-0 bg-slate-100 sm:h-28 sm:w-32">
                    {post.coverImage ? (
                        <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-8 w-8 text-slate-300" />
                        </div>
                    )}
                    {post.newInquiries > 0 && (
                        <span className="absolute left-2 top-2 rounded-full bg-[#0EA432] px-1.5 py-0.5 text-[9px] font-bold text-white">
                            {post.newInquiries} new
                        </span>
                    )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between p-3.5 sm:p-4">
                    <div>
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    {post.category}
                                </p>
                                <h3 className="mt-0.5 line-clamp-2 text-[14px] font-semibold leading-snug text-slate-900">
                                    {post.title}
                                </h3>
                            </div>
                            <span className={cn(
                                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                                STATUS_STYLES[post.status] ?? STATUS_STYLES.active,
                            )}>
                                {STATUS_LABELS[post.status] ?? post.status}
                            </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                                <MapPin className="h-3 w-3 text-[#0EA432]" />
                                {post.location}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                                <CalendarDays className="h-3 w-3 text-slate-400" />
                                {post.postedAt}
                            </span>
                            <span className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                                urgent ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500",
                            )}>
                                <Clock className="h-3 w-3" />
                                {expires}
                            </span>
                        </div>
                    </div>

                    <p className="mt-2 text-[15px] font-extrabold text-[#0EA432] tabular-nums">
                        MWK {post.price.toLocaleString()}
                        <span className="ml-1 text-[11px] font-medium text-slate-400">{post.unit}</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                    <MessageCircle className="h-3.5 w-3.5 text-[#0EA432]" />
                    {post.inquiries} inquiries
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                    <Eye className="h-3.5 w-3.5 text-slate-400" />
                    {post.id}
                </span>

                <div className="ml-auto flex items-center gap-2">
                    <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                        <Edit3 className="h-3 w-3" />
                        <span className="hidden sm:inline">Edit</span>
                    </button>
                    {post.status === "active" && (
                        <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 transition-colors hover:bg-amber-50 hover:text-amber-700"
                        >
                            <PauseCircle className="h-3 w-3" />
                            <span className="hidden sm:inline">Pause</span>
                        </button>
                    )}
                    {post.status === "paused" && (
                        <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                        >
                            <Zap className="h-3 w-3" />
                            <span className="hidden sm:inline">Resume</span>
                        </button>
                    )}
                    <Link
                        to="/seller/messages"
                        className="inline-flex items-center gap-1 rounded-lg bg-[#0EA432] px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#0b8f2b]"
                    >
                        View Inquiries
                        <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>
            </div>
        </article>
    )
}

// ─── Main page ────────────────────────────────────────────────────────────────

const SellerMyPostsPage = () => {
    const [activeTab, setActiveTab] = useState("all")
    const [search, setSearch] = useState("")

    const stats = useMemo(() => ({
        total: MY_POSTS.length,
        active: MY_POSTS.filter((p) => p.status === "active").length,
        inquiries: MY_POSTS.reduce((s, p) => s + p.inquiries, 0),
        newInquiries: MY_POSTS.reduce((s, p) => s + p.newInquiries, 0),
    }), [])

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        return MY_POSTS.filter((post) => {
            if (activeTab !== "all" && post.status !== activeTab) return false
            if (!q) return true
            return (
                post.title.toLowerCase().includes(q) ||
                post.category.toLowerCase().includes(q) ||
                post.location.toLowerCase().includes(q)
            )
        })
    }, [activeTab, search])

    return (
        <div className="mt-3 max-w-7xl p-5 md:m-5 md:mx-auto md:mt-8 md:p-0">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Store className="h-5 w-5 text-[#0EA432]" />
                        <h1 className="text-2xl font-bold leading-tight text-gray-900">My Listings</h1>
                    </div>
                    <p className="mt-1 hidden text-[13px] text-slate-500 md:block">
                        Manage your product listings and respond to buyer inquiries.
                    </p>
                </div>
                <Link
                    to="/seller/sell-requirement"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#0EA432] px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#0b8f2b]"
                >
                    <PackagePlus className="h-4 w-4" />
                    New Listing
                </Link>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-3 gap-3">
                {[
                    { label: "Total Listings", value: stats.total, color: "text-slate-800" },
                    { label: "Active", value: stats.active, color: "text-[#0EA432]" },
                    { label: "Inquiries", value: stats.inquiries, color: "text-amber-600" },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center">
                        <p className={cn("text-[22px] font-extrabold tabular-nums leading-none", stat.color)}>
                            {stat.value}
                        </p>
                        <p className="mt-1 text-[10px] font-semibold leading-tight text-slate-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">

                {/* Main list */}
                <section className="space-y-4">
                    {/* Filters */}
                    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                        <div className="flex flex-wrap gap-2">
                            {STATUS_TABS.map((tab) => {
                                const count = tab.value === "all"
                                    ? MY_POSTS.length
                                    : MY_POSTS.filter((p) => p.status === tab.value).length
                                return (
                                    <button
                                        key={tab.value}
                                        type="button"
                                        onClick={() => setActiveTab(tab.value)}
                                        className={cn(
                                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors",
                                            activeTab === tab.value
                                                ? "bg-[#0EA432] text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                                        )}
                                    >
                                        {tab.label}
                                        <span className={cn(
                                            "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                                            activeTab === tab.value ? "bg-white/20 text-white" : "bg-white text-slate-500",
                                        )}>
                                            {count}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="relative mt-3">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search listings…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-9 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#0EA432]/40 focus:bg-white focus:ring-2 focus:ring-[#0EA432]/10"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results */}
                    {filtered.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
                            <Package className="mx-auto h-8 w-8 text-slate-300" />
                            <p className="mt-3 text-sm font-medium text-slate-700">No listings found</p>
                            <p className="mt-1 text-sm text-slate-400">Try a different filter or create a new listing.</p>
                            <button
                                type="button"
                                onClick={() => { setActiveTab("all"); setSearch("") }}
                                className="mt-4 text-[13px] font-semibold text-[#0EA432] hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filtered.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Sidebar */}
                <aside className="mt-6 space-y-4 lg:mt-0 lg:sticky lg:top-4 lg:self-start">
                    {stats.newInquiries > 0 && (
                        <section className="rounded-2xl bg-[#0EA432]/5 p-4 ring-1 ring-[#0EA432]/20">
                            <p className="text-[13px] font-bold text-[#0EA432]">
                                {stats.newInquiries} new inquiries
                            </p>
                            <p className="mt-1 text-[12px] text-slate-600">
                                Buyers are waiting for your response.
                            </p>
                            <Link
                                to="/seller/messages"
                                className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0EA432] hover:underline"
                            >
                                Go to messages <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </section>
                    )}

                    <section className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                            <h3 className="text-[15px] font-medium text-slate-900">Active Listings</h3>
                            <span className="text-[12px] text-slate-400">{stats.active} live</span>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {MY_POSTS.filter((p) => p.status === "active" || p.status === "negotiating").map((post) => (
                                <div key={post.id} className="flex items-center gap-3 px-4 py-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[13px] font-medium leading-snug text-slate-800">
                                            {post.title}
                                        </p>
                                        <p className="mt-0.5 text-[12px] text-slate-400">
                                            <span className="font-semibold text-[#0EA432]">{post.inquiries}</span> inquiries
                                        </p>
                                    </div>
                                    <span className={cn(
                                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                                        STATUS_STYLES[post.status],
                                    )}>
                                        {STATUS_LABELS[post.status]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-100 px-4 py-3">
                            <Link to="/seller/sell-requirement">
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0EA432] py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#0b8f2b]"
                                >
                                    <Plus className="h-4 w-4" />
                                    Post New Listing
                                </button>
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                        <h3 className="mb-3 text-[15px] font-medium text-slate-900">Tips for More Inquiries</h3>
                        <div className="space-y-2.5">
                            {[
                                "Add clear photos — listings with images get more views.",
                                "Set a competitive price and include your delivery area.",
                                "Respond quickly to inquiries to build buyer trust.",
                            ].map((tip) => (
                                <div key={tip} className="flex items-start gap-2">
                                    <Store className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0EA432]" />
                                    <p className="text-[13px] text-slate-500">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    )
}

export default SellerMyPostsPage
