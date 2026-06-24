import { useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    ArrowLeft,
    Building2,
    ShieldCheck,
    MapPin,
    Clock,
    CalendarDays,
    Package,
    ChevronRight,
    CheckCircle2,
    XCircle,
    HelpCircle,
    MessageSquare,
    X,
    Star,
    Truck,
} from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const bids = [
    {
        id: "1",
        name: "Portland Cement OPC 42.5",
        specs: ["Building", "50 kg bags", "Grade OPC 42.5"],
        price: 3_500_000,
        qty: 200,
        unit: "bags",
        status: "awaiting",
        deliveryTime: "3–5 business days",
        location: "Lilongwe, Malawi",
        submittedOn: "2 Jun 2026",
        note: "We can deliver all 200 bags in one trip to your site. Price includes loading and offloading.",
        thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&h=120&fit=crop",
        supplier: { businessName: "Dzuka Building Supplies", verified: true, rating: 4.7, reviewCount: 83 },
        images: [
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=560&fit=crop",
            "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=900&h=560&fit=crop",
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=560&fit=crop",
        ],
    },
    {
        id: "2",
        name: "Mesh Office Chairs × 10",
        specs: ["Office", "Ergonomic", "With armrests"],
        price: 450_000,
        qty: 10,
        unit: "chairs",
        status: "accepted",
        deliveryTime: "5–7 business days",
        location: "Blantyre, Malawi",
        submittedOn: "1 Jun 2026",
        note: "Chairs are in stock and ready. We will deliver within Blantyre CBD free of charge.",
        thumbnail: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=120&h=120&fit=crop",
        supplier: { businessName: "Capital Office Interiors", verified: true, rating: 4.9, reviewCount: 127 },
        images: [
            "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=900&h=560&fit=crop",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&h=560&fit=crop",
        ],
    },
    {
        id: "3",
        name: "Yellow Maize — 50kg Bags × 100",
        specs: ["Agriculture", "Grade No.1", "50 kg bags"],
        price: 130_000,
        qty: 100,
        unit: "bags",
        status: "rejected",
        deliveryTime: "2–3 business days",
        location: "Kasungu, Malawi",
        submittedOn: "30 May 2026",
        note: "Maize sourced directly from our farm in Kasungu. All bags are quality tested.",
        thumbnail: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=120&h=120&fit=crop",
        supplier: { businessName: "Chikondi Agro Ltd", verified: false, rating: 4.1, reviewCount: 22 },
        images: [
            "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=900&h=560&fit=crop",
            "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=900&h=560&fit=crop",
        ],
    },
    {
        id: "4",
        name: "Solar Panels 300W × 20 Units",
        specs: ["Energy", "Monocrystalline", "300W"],
        price: 780_000,
        qty: 20,
        unit: "panels",
        status: "awaiting",
        deliveryTime: "7–10 business days",
        location: "Lilongwe, Malawi",
        submittedOn: "4 Jun 2026",
        note: "Panels come with 25-year performance warranty. Mounting kits included at no extra cost.",
        thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=120&h=120&fit=crop",
        supplier: { businessName: "SunPower Malawi", verified: true, rating: 4.8, reviewCount: 56 },
        images: [
            "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&h=560&fit=crop",
            "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&h=560&fit=crop",
        ],
    },
]

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS = {
    awaiting: {
        label: "Awaiting Review",
        short: "Awaiting",
        icon: HelpCircle,
        pill: "bg-slate-100 text-slate-600 border border-slate-200",
        banner: "bg-slate-50 border-slate-200 text-slate-700",
        bannerIcon: "text-slate-400",
        dot: "bg-slate-300",
    },
    accepted: {
        label: "Accepted",
        short: "Accepted",
        icon: CheckCircle2,
        pill: "bg-[#0EA432]/10 text-[#0EA432] border border-[#0EA432]/20",
        banner: "bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]",
        bannerIcon: "text-[#0EA432]",
        dot: "bg-[#0EA432]",
    },
    rejected: {
        label: "Rejected",
        short: "Rejected",
        icon: XCircle,
        pill: "bg-red-50 text-red-400 border border-red-200",
        banner: "bg-red-50 border-red-200 text-red-500",
        bannerIcon: "text-red-400",
        dot: "bg-red-300",
    },
}

const TABS = [
    { value: "all", label: "All" },
    { value: "awaiting", label: "Awaiting" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
]

// ── Bid List Card ─────────────────────────────────────────────────────────────

function BidListCard({ bid, isSelected, onClick }) {
    const s = STATUS[bid.status]
    const StatusIcon = s.icon

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "w-full text-left rounded-2xl border-2 transition-all overflow-hidden",
                isSelected
                    ? "border-[#0EA432] shadow-md shadow-[#0EA432]/10"
                    : bid.status === "rejected"
                        ? "border-red-200 hover:border-red-300 hover:shadow-sm"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
            )}
        >
            {/* Status top stripe */}
            <div className={cn("h-1 w-full", s.dot)} />

            <div className="flex gap-3 p-3.5 bg-white">
                {/* Thumbnail */}
                <img
                    src={bid.thumbnail}
                    alt={bid.name}
                    className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                    {/* Name */}
                    <p className="text-[14px] font-bold text-slate-900 leading-snug line-clamp-2">
                        {bid.name}
                    </p>

                    {/* Supplier */}
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Building2 className="h-3 w-3 shrink-0" />
                        <span className="truncate">{bid.supplier.businessName}</span>
                        {bid.supplier.verified && (
                            <ShieldCheck className="h-3 w-3 text-[#0EA432] shrink-0" />
                        )}
                    </div>

                    {/* Bottom: price + status */}
                    <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="text-[16px] font-extrabold text-[#0EA432] tabular-nums">
                            MWK {bid.price.toLocaleString()}
                        </p>
                        <span className={cn(
                            "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shrink-0",
                            s.pill
                        )}>
                            <StatusIcon className="h-3 w-3" />
                            {s.short}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    )
}

// ── Bid Detail Panel ──────────────────────────────────────────────────────────

function BidDetail({ bid, onBack }) {
    const [activeImg, setActiveImg] = useState(0)
    const s = STATUS[bid.status]
    const StatusIcon = s.icon
    const initials = bid.supplier.businessName.split(" ").slice(0, 2).map((w) => w[0]).join("")

    return (
        <div className="flex flex-col h-full bg-slate-50">

            {/* ── Top bar ── */}
            <div className="bg-white border-b border-slate-200 px-4 py-4 flex items-center gap-3 shrink-0">
                {/* Back button — mobile only */}
                <button
                    type="button"
                    onClick={onBack}
                    className="lg:hidden h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 shrink-0"
                >
                    <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="min-w-0 flex-1">
                    <h2 className="text-[16px] font-bold text-slate-900 leading-snug truncate">{bid.name}</h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="text-[12px] text-slate-500 truncate">{bid.supplier.businessName}</span>
                        {bid.supplier.verified && (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#0EA432] bg-[#0EA432]/10 px-2 py-0.5 rounded-full shrink-0">
                                <ShieldCheck className="h-3 w-3" />
                                Verified
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

                {/* Status banner */}
                <div className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 px-4 py-3",
                    s.banner
                )}>
                    <StatusIcon className={cn("h-5 w-5 shrink-0", s.bannerIcon)} />
                    <div>
                        <p className="text-[13px] font-bold">{s.label}</p>
                        <p className="text-[12px] mt-0.5 opacity-80">
                            {bid.status === "awaiting" && "This bid is waiting for your decision."}
                            {bid.status === "accepted" && "You accepted this bid. The supplier has been notified."}
                            {bid.status === "rejected" && "You rejected this bid."}
                        </p>
                    </div>
                </div>

                {/* Image gallery */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    {/* Main image — taller on desktop to use the panel space */}
                    <div className="relative w-full h-[220px] md:h-[300px] lg:h-[380px] bg-slate-100">
                        <img
                            key={activeImg}
                            src={bid.images[activeImg]}
                            alt={bid.name}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                        />
                    </div>

                    {/* Thumbnail strip */}
                    {bid.images.length > 1 && (
                        <div className="flex gap-2.5 p-3 bg-white border-t border-slate-100">
                            {bid.images.map((src, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImg(i)}
                                    className={cn(
                                        "h-16 w-16 lg:h-20 lg:w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                                        i === activeImg
                                            ? "border-[#0EA432] shadow-sm ring-2 ring-[#0EA432]/20"
                                            : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                                    )}
                                >
                                    <img src={src} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price highlight */}
                <div className="bg-[#0EA432] rounded-2xl px-5 py-4 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-1">Total Bid Price</p>
                    <p className="text-[32px] font-extrabold tabular-nums leading-none">
                        MWK {bid.price.toLocaleString()}
                    </p>
                    <p className="text-[12px] text-white/70 mt-1">
                        {bid.qty} {bid.unit} × included
                    </p>
                </div>

                {/* Details grid */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    {[
                        { icon: Package, label: "Quantity", value: `${bid.qty} ${bid.unit}` },
                        { icon: Truck, label: "Delivery Time", value: bid.deliveryTime },
                        { icon: MapPin, label: "Supplier Location", value: bid.location },
                        { icon: CalendarDays, label: "Submitted On", value: bid.submittedOn },
                    ].map((row, i, arr) => {
                        const Icon = row.icon
                        return (
                            <div
                                key={row.label}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3.5",
                                    i < arr.length - 1 ? "border-b border-slate-100" : ""
                                )}
                            >
                                <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                    <Icon className="h-4 w-4 text-slate-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{row.label}</p>
                                    <p className="text-[13px] font-semibold text-slate-800 mt-0.5">{row.value}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Supplier card */}
                <div className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-3">About the Supplier</p>
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-[#0EA432] flex items-center justify-center shrink-0">
                            <span className="text-white text-[13px] font-extrabold">{initials}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-[14px] font-bold text-slate-900">{bid.supplier.businessName}</p>
                                {bid.supplier.verified && (
                                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#0EA432] bg-[#0EA432]/10 px-2 py-0.5 rounded-full">
                                        <ShieldCheck className="h-3 w-3" />
                                        Verified
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <Star
                                        key={n}
                                        className={cn(
                                            "h-3.5 w-3.5",
                                            n <= Math.round(bid.supplier.rating)
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-slate-200 fill-slate-200"
                                        )}
                                    />
                                ))}
                                <span className="text-[12px] font-semibold text-slate-700">{bid.supplier.rating}</span>
                                <span className="text-[11px] text-slate-400">({bid.supplier.reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Supplier note */}
                    {bid.note && (
                        <div className="mt-3 bg-slate-50 rounded-xl px-3.5 py-3 border border-slate-100">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Message from Supplier</p>
                            <p className="text-[13px] text-slate-700 leading-relaxed">{bid.note}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Sticky actions ── */}
            {bid.status === "awaiting" && (
                <div className="shrink-0 bg-white border-t border-slate-200 px-4 py-4 space-y-2.5">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0EA432] py-4 text-[15px] font-bold text-white hover:bg-[#0b8f2b] active:scale-[0.98] transition-all shadow-sm shadow-[#0b4a74]/20"
                    >
                        <CheckCircle2 className="h-5 w-5" />
                        Accept This Bid
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-1.5 rounded-2xl border-2 border-slate-200 py-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Message
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-1.5 rounded-2xl border-2 border-red-200 py-3 text-[13px] font-semibold text-red-600 hover:bg-red-50 active:scale-[0.98] transition-all"
                        >
                            <X className="h-4 w-4" />
                            Reject
                        </button>
                    </div>
                </div>
            )}

            {bid.status === "accepted" && (
                <div className="shrink-0 bg-white border-t border-slate-200 px-4 py-4">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-[#0b4a74] py-4 text-[14px] font-bold text-[#0EA432] hover:bg-[#f0fdf4] active:scale-[0.98] transition-all"
                    >
                        <MessageSquare className="h-4 w-4" />
                        Message Supplier
                    </button>
                </div>
            )}
        </div>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BidsPage() {
    const [selectedId, setSelectedId] = useState(null)
    const [activeTab, setActiveTab] = useState("all")

    const filtered = activeTab === "all" ? bids : bids.filter((b) => b.status === activeTab)
    const selected = bids.find((b) => b.id === selectedId)
    const showDetail = !!selected

    const countFor = (tab) => (tab === "all" ? bids.length : bids.filter((b) => b.status === tab).length)

    const handleSelect = (id) => setSelectedId(id)
    const handleBack = () => setSelectedId(null)

    return (
        // Fills the main content area below TopHeader; pb-20 for mobile bottom nav
        <div className="flex h-[calc(100dvh-56px)] overflow-hidden max-w-7xl mx-auto">

            {/* ════ LEFT PANEL — list ════ */}
            <div className={cn(
                "flex flex-col bg-white border-r border-slate-200",
                // Mobile: full width unless detail is open
                "w-full lg:w-[380px] xl:w-[420px] shrink-0",
                showDetail ? "hidden lg:flex" : "flex"
            )}>

                {/* Header */}
                <div className="border-b border-slate-100 px-4 pt-5 pb-4 shrink-0">
                    <nav className="mb-2.5 flex items-center gap-1 text-[12px] text-slate-400">
                        <Link to="/buyer/dashboard" className="hover:text-[#0EA432] transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-slate-600 font-medium">Bids</span>
                    </nav>

                    <div className="flex items-center justify-between">
                        <h1 className="text-[22px] font-extrabold text-slate-900">My Bids</h1>
                        <span className="rounded-full bg-[#0EA432]/10 px-3 py-1 text-[12px] font-bold text-[#0EA432]">
                            {bids.length} total
                        </span>
                    </div>

                    {/* Summary stat row */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                            { label: "Awaiting", count: countFor("awaiting"), color: "text-slate-700", bg: "bg-slate-50 border-slate-200" },
                            { label: "Accepted", count: countFor("accepted"), color: "text-[#0EA432]", bg: "bg-[#f0fdf4] border-[#bbf7d0]" },
                            { label: "Rejected", count: countFor("rejected"), color: "text-red-400", bg: "bg-red-50 border-red-200" },
                        ].map((s) => (
                            <div key={s.label} className={cn("rounded-xl border px-2 py-2 text-center", s.bg)}>
                                <p className={cn("text-[18px] font-extrabold tabular-nums leading-none", s.color)}>{s.count}</p>
                                <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-0.5 px-4 pt-3 pb-1 shrink-0 overflow-x-auto [scrollbar-width:none]">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => setActiveTab(tab.value)}
                            className={cn(
                                "whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-bold transition-all shrink-0",
                                activeTab === tab.value
                                    ? "bg-[#0EA432] text-white shadow-sm"
                                    : "text-slate-500 hover:bg-slate-100"
                            )}
                        >
                            {tab.label}
                            {tab.value !== "all" && (
                                <span className={cn(
                                    "ml-1.5 text-[10px]",
                                    activeTab === tab.value ? "text-white/70" : "text-slate-400"
                                )}>
                                    {countFor(tab.value)}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Scrollable list */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 pb-24 lg:pb-4">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                <Package className="h-8 w-8 text-slate-300" />
                            </div>
                            <p className="text-[15px] font-semibold text-slate-600">No bids here</p>
                            <p className="text-[13px] text-slate-400 mt-1">Try a different filter above</p>
                        </div>
                    ) : (
                        filtered.map((bid) => (
                            <BidListCard
                                key={bid.id}
                                bid={bid}
                                isSelected={bid.id === selectedId}
                                onClick={() => handleSelect(bid.id)}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* ════ RIGHT PANEL — detail ════ */}
            <div className={cn(
                "flex-1 overflow-hidden",
                // Mobile: show when a bid is selected, full screen
                showDetail ? "flex flex-col" : "hidden lg:flex lg:flex-col"
            )}>
                {selected ? (
                    <BidDetail bid={selected} onBack={handleBack} />
                ) : (
                    // Desktop empty state
                    <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 text-center px-6">
                        <div className="h-20 w-20 rounded-full bg-[#0EA432]/10 flex items-center justify-center mb-4">
                            <Clock className="h-9 w-9 text-[#0EA432]/40" />
                        </div>
                        <p className="text-[16px] font-bold text-slate-700">Select a bid to review</p>
                        <p className="text-[13px] text-slate-400 mt-1 max-w-xs">
                            Tap any bid on the left to see the full details, supplier info, and take action.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
