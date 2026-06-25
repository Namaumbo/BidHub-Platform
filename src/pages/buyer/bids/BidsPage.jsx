import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    ShieldCheck, MapPin, CalendarDays, Package, ChevronRight,
    CheckCircle2, XCircle, HelpCircle, MessageSquare, X, Star,
    Truck, Check, SlidersHorizontal, ChevronDown, ChevronUp,
    Building2,
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
        thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
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
        thumbnail: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop",
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
        thumbnail: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop",
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
        thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop",
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
        label: "Awaiting Review", short: "Awaiting", icon: HelpCircle,
        pill: "bg-slate-100 text-slate-600 border border-slate-200",
        dot: "bg-slate-300",
    },
    accepted: {
        label: "Accepted", short: "Accepted", icon: CheckCircle2,
        pill: "bg-[#0EA432]/10 text-[#0EA432] border border-[#0EA432]/20",
        dot: "bg-[#0EA432]",
    },
    rejected: {
        label: "Rejected", short: "Rejected", icon: XCircle,
        pill: "bg-red-50 text-red-400 border border-red-200",
        dot: "bg-red-300",
    },
}

const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
]

const DEFAULT_FILTERS = { status: [], minRating: 0, maxPrice: null, delivery: null }

// ── Helpers ───────────────────────────────────────────────────────────────────

function countByStatus(s) {
    return bids.filter((b) => b.status === s).length
}

function minDeliveryDays(str) {
    const m = str.match(/(\d+)/)
    return m ? parseInt(m[1]) : 99
}

// ── Stars ─────────────────────────────────────────────────────────────────────

function Stars({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
                <Star
                    key={n}
                    className={cn(
                        "h-3 w-3",
                        n <= Math.round(rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                    )}
                />
            ))}
        </div>
    )
}

// ── Filter Sidebar ────────────────────────────────────────────────────────────

function FilterSection({ title, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="border-b border-slate-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full mb-3"
            >
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</p>
                {open ? (
                    <ChevronUp className="h-3.5 w-3.5 text-slate-300" />
                ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-slate-300" />
                )}
            </button>
            {open && children}
        </div>
    )
}

function FilterSidebar({ filters, onChange, className }) {
    return (
        <aside className={cn("bg-white rounded-2xl border border-slate-200 p-5", className)}>
            <div className="flex items-center justify-between mb-5">
                <p className="text-[14px] font-bold text-slate-900">Filters</p>
                <button
                    type="button"
                    onClick={() => onChange(DEFAULT_FILTERS)}
                    className="text-[11px] font-semibold text-[#0EA432] hover:underline"
                >
                    Reset all
                </button>
            </div>

            {/* Price */}
            <FilterSection title="Max Price (MWK)">
                <input
                    type="number"
                    placeholder="e.g. 1000000"
                    value={filters.maxPrice ?? ""}
                    onChange={(e) =>
                        onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-[#0EA432] transition-colors"
                />
            </FilterSection>

            {/* Status */}
            <FilterSection title="Bid Status">
                {[
                    { value: "awaiting", label: "Awaiting Review", count: countByStatus("awaiting") },
                    { value: "accepted", label: "Accepted", count: countByStatus("accepted") },
                    { value: "rejected", label: "Rejected", count: countByStatus("rejected") },
                ].map((opt) => (
                    <label
                        key={opt.value}
                        className="flex items-center gap-2.5 py-1.5 cursor-pointer group"
                    >
                        <input
                            type="checkbox"
                            checked={filters.status.includes(opt.value)}
                            onChange={() => {
                                const next = filters.status.includes(opt.value)
                                    ? filters.status.filter((s) => s !== opt.value)
                                    : [...filters.status, opt.value]
                                onChange({ ...filters, status: next })
                            }}
                            className="h-4 w-4 rounded accent-[#0EA432] cursor-pointer"
                        />
                        <span className="text-[13px] text-slate-600 group-hover:text-slate-900 flex-1 transition-colors">
                            {opt.label}
                        </span>
                        <span className="text-[11px] text-slate-400">{opt.count}</span>
                    </label>
                ))}
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Min. Supplier Rating">
                {[
                    { value: 4.5, label: "4.5★ and above" },
                    { value: 4.0, label: "4.0★ and above" },
                    { value: 3.5, label: "3.5★ and above" },
                    { value: 0, label: "Any rating" },
                ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                        <input
                            type="radio"
                            name="rating"
                            checked={filters.minRating === opt.value}
                            onChange={() => onChange({ ...filters, minRating: opt.value })}
                            className="h-4 w-4 accent-[#0EA432] cursor-pointer"
                        />
                        <span className="text-[13px] text-slate-600">{opt.label}</span>
                    </label>
                ))}
            </FilterSection>

            {/* Delivery */}
            <FilterSection title="Delivery Speed">
                {[
                    { value: "fast", label: "Under 3 days" },
                    { value: "medium", label: "3–7 days" },
                    { value: "slow", label: "Over 7 days" },
                ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                        <input
                            type="radio"
                            name="delivery"
                            checked={filters.delivery === opt.value}
                            onChange={() =>
                                onChange({
                                    ...filters,
                                    delivery: filters.delivery === opt.value ? null : opt.value,
                                })
                            }
                            className="h-4 w-4 accent-[#0EA432] cursor-pointer"
                        />
                        <span className="text-[13px] text-slate-600">{opt.label}</span>
                    </label>
                ))}
            </FilterSection>
        </aside>
    )
}

// ── Bid Card ──────────────────────────────────────────────────────────────────

function BidCard({ bid, inCompare, onToggleCompare, onView }) {
    const s = STATUS[bid.status]
    const StatusIcon = s.icon

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col">

            {/* Image area */}
            <div
                className="relative bg-slate-50 h-[200px] sm:h-[220px] overflow-hidden cursor-pointer flex items-center justify-center"
                onClick={onView}
            >
                <img
                    src={bid.thumbnail}
                    alt={bid.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Status badge top-left */}
                <span className={cn(
                    "absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm",
                    s.pill
                )}>
                    <StatusIcon className="h-3 w-3" />
                    {s.short}
                </span>

                {/* Date badge top-right */}
                <span className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm text-slate-500 text-[10px] font-semibold px-2 py-1 rounded-full border border-white/60 shadow-sm">
                    {bid.submittedOn}
                </span>

                {/* Compare button — always visible if in compare, else appears on hover */}
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onToggleCompare() }}
                    className={cn(
                        "absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all duration-150",
                        inCompare
                            ? "bg-[#0EA432] text-white border-[#0EA432] shadow-sm"
                            : "bg-white/85 backdrop-blur-sm text-slate-600 border-white/60 shadow-sm opacity-0 group-hover:opacity-100"
                    )}
                >
                    {inCompare ? (
                        <><Check className="h-3 w-3" /> Added</>
                    ) : (
                        <>+ Compare</>
                    )}
                </button>
            </div>

            {/* Card body */}
            <div className="p-4 flex flex-col flex-1 cursor-pointer" onClick={onView}>
                {/* Supplier name */}
                <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate">
                        {bid.supplier.businessName}
                    </p>
                    {bid.supplier.verified && (
                        <ShieldCheck className="h-3 w-3 text-[#0EA432] shrink-0" />
                    )}
                </div>

                {/* Product name */}
                <p className="text-[14px] font-bold text-slate-900 leading-snug line-clamp-2 mb-2 flex-1">
                    {bid.name}
                </p>

                {/* Spec pills */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {bid.specs.slice(0, 2).map((spec) => (
                        <span
                            key={spec}
                            className="bg-slate-100 text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded-full"
                        >
                            {spec}
                        </span>
                    ))}
                </div>

                {/* Price + rating */}
                <div className="flex items-end justify-between gap-2 mb-3">
                    <p className="text-[20px] font-extrabold text-[#0EA432] tabular-nums leading-none">
                        MWK {bid.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mb-0.5">
                        <Stars rating={bid.supplier.rating} />
                        <span className="text-[11px] font-bold text-slate-600 ml-0.5">
                            {bid.supplier.rating}
                        </span>
                    </div>
                </div>

                {/* View button */}
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onView() }}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white py-2.5 rounded-xl text-[13px] font-bold transition-colors"
                >
                    View Bid
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}

// ── Compare Bar (bottom sticky) ───────────────────────────────────────────────

function CompareBar({ items, onRemove, onCompare, onClear }) {
    return (
        <div className="fixed bottom-14 md:bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
                {/* Selected item thumbnails */}
                <div className="flex items-center gap-2.5 flex-1 overflow-x-auto [scrollbar-width:none] pb-1 -mb-1">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2.5 shrink-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.name}
                                className="h-9 w-9 object-cover rounded-lg shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="text-[12px] font-semibold text-slate-800 truncate max-w-[90px] leading-tight">
                                    {item.name}
                                </p>
                                <p className="text-[11px] font-bold text-[#0EA432]">
                                    MWK {item.price.toLocaleString()}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => onRemove(item.id)}
                                className="text-slate-300 hover:text-slate-600 transition-colors ml-1"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: Math.max(0, 3 - items.length) }).map((_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="h-[56px] w-[130px] shrink-0 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center"
                        >
                            <p className="text-[10px] text-slate-300 font-medium">+ Add bid</p>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 shrink-0">
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-[12px] text-slate-400 hover:text-slate-600 font-semibold transition-colors hidden sm:block"
                    >
                        Clear all
                    </button>
                    <button
                        type="button"
                        onClick={onCompare}
                        disabled={items.length < 2}
                        className="flex items-center gap-2 bg-[#0EA432] hover:bg-[#0b8f2b] disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap"
                    >
                        Compare ({items.length})
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Bid Detail Modal / Bottom Sheet ───────────────────────────────────────────

function BidDetailModal({ bid, onClose }) {
    const [activeImg, setActiveImg] = useState(0)
    const s = STATUS[bid.status]
    const StatusIcon = s.icon

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Sheet */}
            <div className="relative bg-white w-full sm:max-w-lg sm:mx-4 rounded-t-3xl sm:rounded-2xl max-h-[92dvh] overflow-y-auto flex flex-col">
                {/* Pull handle (mobile) */}
                <div className="sm:hidden flex justify-center pt-3 shrink-0">
                    <div className="h-1 w-10 rounded-full bg-slate-200" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-4 pb-0 shrink-0">
                    <span className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
                        s.pill
                    )}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {s.label}
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
                    {/* Image gallery */}
                    <div className="rounded-2xl overflow-hidden bg-slate-100 h-[210px]">
                        <img
                            src={bid.images[activeImg]}
                            alt={bid.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {bid.images.length > 1 && (
                        <div className="flex gap-2">
                            {bid.images.map((src, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImg(i)}
                                    className={cn(
                                        "h-12 w-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all",
                                        i === activeImg
                                            ? "border-[#0EA432]"
                                            : "border-transparent opacity-50 hover:opacity-100"
                                    )}
                                >
                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Supplier + name */}
                    <div>
                        <div className="flex items-center gap-1.5 mb-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                {bid.supplier.businessName}
                            </p>
                            {bid.supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-[#0EA432]" />}
                        </div>
                        <h2 className="text-[20px] font-extrabold text-slate-900 leading-tight">{bid.name}</h2>
                    </div>

                    {/* Price + rating */}
                    <div className="flex items-center justify-between">
                        <p className="text-[26px] font-extrabold text-[#0EA432] tabular-nums leading-none">
                            MWK {bid.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1.5">
                            <Stars rating={bid.supplier.rating} />
                            <span className="text-[13px] font-bold text-slate-800">{bid.supplier.rating}</span>
                            <span className="text-[12px] text-slate-400">({bid.supplier.reviewCount})</span>
                        </div>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { icon: Package, label: "Quantity", value: `${bid.qty} ${bid.unit}` },
                            { icon: Truck, label: "Delivery", value: bid.deliveryTime },
                            { icon: MapPin, label: "Location", value: bid.location.split(",")[0] },
                            { icon: CalendarDays, label: "Submitted", value: bid.submittedOn },
                        ].map((row) => (
                            <div key={row.label} className="bg-slate-50 rounded-xl p-3 flex items-center gap-2.5">
                                <row.icon className="h-4 w-4 text-slate-400 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                                        {row.label}
                                    </p>
                                    <p className="text-[13px] font-bold text-slate-800 leading-tight mt-0.5">
                                        {row.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Supplier note */}
                    {bid.note && (
                        <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3.5">
                            <p className="text-[10px] font-bold text-[#0EA432] uppercase tracking-wide mb-1">
                                Supplier's Note
                            </p>
                            <p className="text-[13px] text-[#166534] leading-relaxed">{bid.note}</p>
                        </div>
                    )}

                    {/* Action buttons */}
                    {bid.status === "awaiting" && (
                        <div className="space-y-2 pb-2">
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 bg-[#0EA432] hover:bg-[#0b8f2b] text-white py-3.5 rounded-2xl text-[15px] font-bold transition-colors"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                Accept This Bid
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-1.5 border-2 border-[#0EA432] text-[#0EA432] py-3 rounded-2xl text-[13px] font-bold hover:bg-[#f0fdf4] transition-colors"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Counter Offer
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-1.5 border-2 border-red-200 text-red-400 py-3 rounded-2xl text-[13px] font-bold hover:bg-red-50 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                    Reject
                                </button>
                            </div>
                        </div>
                    )}
                    {bid.status === "accepted" && (
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border-2 border-[#0EA432] text-[#0EA432] py-3.5 rounded-2xl text-[15px] font-bold hover:bg-[#f0fdf4] transition-colors pb-2"
                        >
                            <MessageSquare className="h-5 w-5" />
                            Message Supplier
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

// ── Compare Full-Screen Modal ─────────────────────────────────────────────────

function CompareModal({ items, onClose }) {
    const rows = [
        { label: "Bid Price", getValue: (b) => `MWK ${b.price.toLocaleString()}`, highlight: true },
        { label: "Quantity", getValue: (b) => `${b.qty} ${b.unit}` },
        { label: "Delivery Time", getValue: (b) => b.deliveryTime },
        { label: "Supplier Rating", getValue: (b) => `${b.supplier.rating}★ (${b.supplier.reviewCount} reviews)` },
        { label: "Location", getValue: (b) => b.location },
        { label: "Bid Status", getValue: (b) => STATUS[b.status].label },
        { label: "Date Submitted", getValue: (b) => b.submittedOn },
    ]

    // Index with lowest price for highlighting
    const lowestPriceIdx = items.reduce(
        (minIdx, b, i) => (b.price < items[minIdx].price ? i : minIdx),
        0
    )

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            {/* Sticky header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-[18px] font-extrabold text-slate-900">
                            Comparing {items.length} Bids
                        </h2>
                        <p className="text-[12px] text-slate-400 mt-0.5">
                            Side-by-side comparison to help you decide
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                {/* Item cards header */}
                <div
                    className="grid gap-4 mb-6"
                    style={{ gridTemplateColumns: `180px repeat(${items.length}, 1fr)` }}
                >
                    <div /> {/* spacer */}
                    {items.map((bid, idx) => (
                        <div key={bid.id} className="text-center">
                            <div
                                className={cn(
                                    "rounded-2xl overflow-hidden h-[140px] sm:h-[160px] mb-3 border",
                                    idx === lowestPriceIdx
                                        ? "border-[#0EA432] ring-2 ring-[#0EA432]/20"
                                        : "border-slate-200"
                                )}
                            >
                                <img
                                    src={bid.thumbnail}
                                    alt={bid.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {idx === lowestPriceIdx && (
                                <span className="inline-block mb-1.5 bg-[#0EA432] text-white text-[9px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
                                    Best Price
                                </span>
                            )}
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                                {bid.supplier.businessName}
                            </p>
                            <p className="text-[13px] font-bold text-slate-900 leading-snug">
                                {bid.name}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Comparison rows */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                    {rows.map((row, rowIdx) => (
                        <div
                            key={row.label}
                            className={cn(
                                "grid gap-0 border-b border-slate-100 last:border-0",
                            )}
                            style={{ gridTemplateColumns: `180px repeat(${items.length}, 1fr)` }}
                        >
                            {/* Label cell */}
                            <div className={cn(
                                "px-4 py-3.5 flex items-center border-r border-slate-100",
                                rowIdx % 2 === 0 ? "bg-slate-50" : "bg-white"
                            )}>
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                                    {row.label}
                                </p>
                            </div>

                            {/* Value cells */}
                            {items.map((bid, bidIdx) => (
                                <div
                                    key={bid.id}
                                    className={cn(
                                        "px-4 py-3.5 flex items-center border-r border-slate-100 last:border-r-0",
                                        rowIdx % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                                    )}
                                >
                                    <p className={cn(
                                        "text-[13px] font-semibold",
                                        row.highlight && bidIdx === lowestPriceIdx
                                            ? "text-[#0EA432] font-extrabold text-[15px]"
                                            : "text-slate-800"
                                    )}>
                                        {row.getValue(bid)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Action row */}
                <div
                    className="mt-4 grid gap-4"
                    style={{ gridTemplateColumns: `180px repeat(${items.length}, 1fr)` }}
                >
                    <div />
                    {items.map((bid) => (
                        <div key={bid.id}>
                            {bid.status === "awaiting" ? (
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2 bg-[#0EA432] hover:bg-[#0b8f2b] text-white py-3 rounded-xl text-[13px] font-bold transition-colors"
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Accept
                                </button>
                            ) : (
                                <div className={cn(
                                    "w-full text-center py-3 rounded-xl text-[13px] font-bold border",
                                    bid.status === "accepted"
                                        ? "border-[#0EA432]/30 text-[#0EA432] bg-[#f0fdf4]"
                                        : "border-red-100 text-red-400 bg-red-50"
                                )}>
                                    {STATUS[bid.status].short}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ── Mobile Filter Sheet ────────────────────────────────────────────────────────

function MobileFilterSheet({ open, onClose, filters, onChange }) {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white w-full rounded-t-3xl max-h-[85dvh] overflow-y-auto">
                <div className="flex justify-center pt-3 mb-2">
                    <div className="h-1 w-10 rounded-full bg-slate-200" />
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                    <p className="text-[16px] font-bold text-slate-900">Filters</p>
                    <button type="button" onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100">
                        <X className="h-4 w-4 text-slate-500" />
                    </button>
                </div>
                <div className="px-5 py-4">
                    <FilterSidebar filters={filters} onChange={onChange} className="border-0 p-0 rounded-none shadow-none" />
                </div>
                <div className="px-5 pb-8 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full bg-[#0EA432] text-white py-3.5 rounded-2xl text-[15px] font-bold"
                    >
                        Show Results
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BidsPage() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS)
    const [sortBy, setSortBy] = useState("newest")
    const [compareIds, setCompareIds] = useState(new Set())
    const [detailBid, setDetailBid] = useState(null)
    const [showCompare, setShowCompare] = useState(false)
    const [showFilterSheet, setShowFilterSheet] = useState(false)
    const [showSort, setShowSort] = useState(false)

    const toggleCompare = (id) => {
        setCompareIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else if (next.size < 3) {
                next.add(id)
            }
            return next
        })
    }

    const filtered = useMemo(() => {
        return bids
            .filter((b) => filters.status.length === 0 || filters.status.includes(b.status))
            .filter((b) => b.supplier.rating >= filters.minRating)
            .filter((b) => !filters.maxPrice || b.price <= filters.maxPrice)
            .filter((b) => {
                if (!filters.delivery) return true
                const days = minDeliveryDays(b.deliveryTime)
                if (filters.delivery === "fast") return days <= 2
                if (filters.delivery === "medium") return days >= 3 && days <= 7
                if (filters.delivery === "slow") return days > 7
                return true
            })
            .sort((a, b) => {
                if (sortBy === "price-asc") return a.price - b.price
                if (sortBy === "price-desc") return b.price - a.price
                if (sortBy === "rating") return b.supplier.rating - a.supplier.rating
                return 0
            })
    }, [filters, sortBy])

    const compareItems = bids.filter((b) => compareIds.has(b.id))

    const activeFilterCount =
        filters.status.length +
        (filters.minRating > 0 ? 1 : 0) +
        (filters.maxPrice ? 1 : 0) +
        (filters.delivery ? 1 : 0)

    return (
        <div className="min-h-[calc(100dvh-56px)] bg-[#f4f5f4]">

            {/* ── Top bar ── */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-3">
                    {/* Breadcrumb */}
                    <nav className="hidden sm:flex items-center gap-1 text-[12px] text-slate-400 mr-2">
                        <Link to="/buyer/dashboard" className="hover:text-[#0EA432] transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-slate-700 font-semibold">My Bids</span>
                    </nav>

                    <h1 className="text-[16px] font-extrabold text-slate-900 sm:hidden">My Bids</h1>

                    <div className="flex-1" />

                    {/* Result count */}
                    <p className="text-[12px] text-slate-400 hidden sm:block">
                        <span className="font-bold text-slate-700">{filtered.length}</span> bids
                    </p>

                    {/* Sort dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowSort(!showSort)}
                            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg text-[12px] font-semibold transition-colors"
                        >
                            {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                            <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                        {showSort && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                                <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden min-w-[180px]">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors",
                                                sortBy === opt.value
                                                    ? "bg-[#f0fdf4] text-[#0EA432] font-semibold"
                                                    : "text-slate-700 hover:bg-slate-50"
                                            )}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Filter button (mobile) */}
                    <button
                        type="button"
                        onClick={() => setShowFilterSheet(true)}
                        className="lg:hidden flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg text-[12px] font-semibold transition-colors relative"
                    >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#0EA432] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex gap-5 items-start">

                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-[230px] shrink-0 sticky top-[57px]">
                    <FilterSidebar filters={filters} onChange={setFilters} />
                </div>

                {/* Product Grid */}
                <main className="flex-1 min-w-0">
                    {filtered.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                <Package className="h-8 w-8 text-slate-300" />
                            </div>
                            <p className="text-[16px] font-bold text-slate-600">No bids match your filters</p>
                            <p className="text-[13px] text-slate-400 mt-1">Try adjusting or resetting your filters</p>
                            <button
                                type="button"
                                onClick={() => setFilters(DEFAULT_FILTERS)}
                                className="mt-4 text-[13px] font-semibold text-[#0EA432] hover:underline"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-32 md:pb-20">
                            {filtered.map((bid) => (
                                <BidCard
                                    key={bid.id}
                                    bid={bid}
                                    inCompare={compareIds.has(bid.id)}
                                    onToggleCompare={() => toggleCompare(bid.id)}
                                    onView={() => setDetailBid(bid)}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* ── Compare bar ── */}
            {compareIds.size > 0 && (
                <CompareBar
                    items={compareItems}
                    onRemove={toggleCompare}
                    onCompare={() => setShowCompare(true)}
                    onClear={() => setCompareIds(new Set())}
                />
            )}

            {/* ── Mobile filter sheet ── */}
            <MobileFilterSheet
                open={showFilterSheet}
                onClose={() => setShowFilterSheet(false)}
                filters={filters}
                onChange={setFilters}
            />

            {/* ── Detail modal ── */}
            {detailBid && (
                <BidDetailModal bid={detailBid} onClose={() => setDetailBid(null)} />
            )}

            {/* ── Compare modal ── */}
            {showCompare && compareItems.length >= 2 && (
                <CompareModal items={compareItems} onClose={() => setShowCompare(false)} />
            )}
        </div>
    )
}
