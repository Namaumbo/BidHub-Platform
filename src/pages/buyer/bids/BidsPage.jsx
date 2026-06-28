import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    ShieldCheck, MapPin, CalendarDays, Package, ChevronRight,
    CheckCircle2, XCircle, HelpCircle, MessageSquare, X, Star,
    Truck, Check, SlidersHorizontal, ChevronDown, ChevronUp,
    ArrowLeft, Clock, Plus,
} from "lucide-react"
import { useBuyerRequirements } from "@/core/hooks/useBuyerRequirements"
import { useAcceptBid, useRejectBid } from "@/core/hooks/useBids"

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

function minDeliveryDays(str) {
    const m = str.match(/(\d+)/)
    return m ? parseInt(m[1]) : 99
}

function daysLeft(dateStr) {
    return Math.max(0, Math.ceil((new Date(dateStr) - new Date()) / 86_400_000))
}

// ── Stars ─────────────────────────────────────────────────────────────────────

function Stars({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className={cn(
                    "h-3 w-3",
                    n <= Math.round(rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                )} />
            ))}
        </div>
    )
}

// ── Requirement Card (top-level list) ─────────────────────────────────────────

function RequirementCard({ req, onClick }) {
    const awaiting = req.bids.filter((b) => b.status === "awaiting").length
    const accepted = req.bids.filter((b) => b.status === "accepted").length
    const remaining = daysLeft(req.deadline)
    const urgent = remaining <= 5

    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full text-left bg-white rounded-2xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
        >
            <div className="p-5 flex gap-4">
                {/* Thumbnail */}
                <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={req.thumbnail} alt={req.title} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2 flex-1">
                            {req.title}
                        </p>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide bg-[#0EA432]/10 text-[#0EA432] px-2.5 py-1 rounded-full border border-[#0EA432]/20">
                            Open
                        </span>
                    </div>

                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        {req.category}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[12px] text-slate-500">
                        <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            Posted {req.postedOn}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className={cn("h-3 w-3", urgent ? "text-amber-500" : "")} />
                            <span className={urgent ? "font-semibold text-amber-600" : ""}>
                                {remaining}d left
                            </span>
                        </span>
                        <span className="font-semibold text-slate-700">
                            Budget: MWK {req.budget.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-slate-300" />
                        <span className="text-[12px] text-slate-500 font-medium">{awaiting} awaiting</span>
                    </div>
                    {accepted > 0 && (
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#0EA432]" />
                            <span className="text-[12px] text-[#0EA432] font-semibold">{accepted} accepted</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700 group-hover:text-[#0EA432] transition-colors">
                    {req.bids.length} bids
                    <ChevronRight className="h-4 w-4" />
                </div>
            </div>
        </button>
    )
}

// ── Requirements List View ────────────────────────────────────────────────────

function RequirementsView({ requirements, isLoading, error, onSelect }) {
    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-slate-500">
                Loading your requirements...
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-red-600">
                {error.message || "Unable to load requirements."}
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-[22px] font-extrabold text-slate-900">My Requirements</h1>
                    <p className="text-[13px] text-slate-400 mt-0.5">
                        Select a requirement to view and compare all supplier bids
                    </p>
                </div>
                <Link
                    to="/buyer/post-requirement"
                    className="hidden sm:flex items-center gap-2 bg-[#0EA432] text-white px-4 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#0b8f2b] transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Post New
                </Link>
            </div>

            {/* Summary stat bar */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                    { label: "Requirements Posted", value: requirements.length, color: "text-slate-800" },
                    { label: "Total Bids Received", value: requirements.reduce((s, r) => s + r.bids.length, 0), color: "text-[#0EA432]" },
                    { label: "Awaiting Decision", value: requirements.reduce((s, r) => s + r.bids.filter(b => b.status === "awaiting").length, 0), color: "text-amber-600" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 px-4 py-3 text-center">
                        <p className={cn("text-[22px] font-extrabold tabular-nums leading-none", stat.color)}>
                            {stat.value}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-1 leading-tight">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Requirement cards */}
            <div className="space-y-3">
                {requirements.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                        <p className="text-sm text-slate-600">No requirements posted yet.</p>
                        <Link to="/buyer/post-requirement" className="mt-3 inline-block text-sm font-semibold text-[#0EA432]">
                            Post a requirement
                        </Link>
                    </div>
                ) : requirements.map((req) => (
                    <RequirementCard key={req.id} req={req} onClick={() => onSelect(req)} />
                ))}
            </div>
        </div>
    )
}

// ── Filter Sidebar ────────────────────────────────────────────────────────────

function FilterSection({ title, children }) {
    const [open, setOpen] = useState(true)
    return (
        <div className="border-b border-slate-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full mb-3"
            >
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</p>
                {open ? <ChevronUp className="h-3.5 w-3.5 text-slate-300" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-300" />}
            </button>
            {open && children}
        </div>
    )
}

function FilterSidebar({ bids, filters, onChange, className }) {
    const statusCounts = {
        awaiting: bids.filter((b) => b.status === "awaiting").length,
        accepted: bids.filter((b) => b.status === "accepted").length,
        rejected: bids.filter((b) => b.status === "rejected").length,
    }

    return (
        <aside className={cn("bg-white rounded-2xl border border-slate-200 p-5", className)}>
            <div className="flex items-center justify-between mb-5">
                <p className="text-[14px] font-bold text-slate-900">Filters</p>
                <button
                    type="button"
                    onClick={() => onChange(DEFAULT_FILTERS)}
                    className="text-[11px] font-semibold text-[#0EA432] hover:underline"
                >
                    Reset
                </button>
            </div>

            <FilterSection title="Max Price (MWK)">
                <input
                    type="number"
                    placeholder="e.g. 1,000,000"
                    value={filters.maxPrice ?? ""}
                    onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : null })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-[#0EA432] transition-colors"
                />
            </FilterSection>

            <FilterSection title="Bid Status">
                {[
                    { value: "awaiting", label: "Awaiting Review" },
                    { value: "accepted", label: "Accepted" },
                    { value: "rejected", label: "Rejected" },
                ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
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
                        <span className="text-[11px] text-slate-400">{statusCounts[opt.value]}</span>
                    </label>
                ))}
            </FilterSection>

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
                                onChange({ ...filters, delivery: filters.delivery === opt.value ? null : opt.value })
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

// ── Bid Card (supplier offer for a requirement) ───────────────────────────────

function BidCard({ bid, budget, inCompare, onToggleCompare, onView }) {
    const s = STATUS[bid.status]
    const StatusIcon = s.icon
    const savings = budget - bid.price
    const underBudget = savings > 0

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col">

            {/* Image */}
            <div
                className="relative bg-slate-50 h-[190px] sm:h-[210px] overflow-hidden cursor-pointer"
                onClick={onView}
            >
                <img
                    src={bid.thumbnail}
                    alt={bid.supplier.businessName}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />

                {/* Status badge */}
                <span className={cn(
                    "absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm",
                    s.pill
                )}>
                    <StatusIcon className="h-3 w-3" />
                    {s.short}
                </span>

                {/* Date */}
                <span className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm text-slate-500 text-[10px] font-semibold px-2 py-1 rounded-full border border-white/50 shadow-sm">
                    {bid.submittedOn}
                </span>

                {/* Budget tag */}
                {underBudget && (
                    <span className="absolute bottom-3 left-3 bg-[#0EA432] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        MWK {savings.toLocaleString()} under budget
                    </span>
                )}

                {/* Compare button */}
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
                    {inCompare ? <><Check className="h-3 w-3" /> Added</> : <>+ Compare</>}
                </button>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col flex-1 cursor-pointer" onClick={onView}>
                {/* Supplier name + verified */}
                <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-[13px] font-extrabold text-slate-900 truncate flex-1">
                        {bid.supplier.businessName}
                    </p>
                    {bid.supplier.verified && (
                        <ShieldCheck className="h-4 w-4 text-[#0EA432] shrink-0" />
                    )}
                </div>

                {/* Stars + reviews */}
                <div className="flex items-center gap-1.5 mb-3">
                    <Stars rating={bid.supplier.rating} />
                    <span className="text-[11px] font-bold text-slate-700">{bid.supplier.rating}</span>
                    <span className="text-[11px] text-slate-400">({bid.supplier.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <p className="text-[22px] font-extrabold text-[#0EA432] tabular-nums leading-none mb-1">
                    MWK {bid.price.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-400 mb-3">
                    {bid.qty} {bid.unit} · {bid.deliveryTime}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-3 flex-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {bid.location}
                </div>

                {/* CTA */}
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onView() }}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-[13px] font-bold transition-colors"
                >
                    View Bid
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}

// ── Compare Bar ───────────────────────────────────────────────────────────────

function CompareBar({ items, onRemove, onCompare, onClear }) {
    return (
        <div className="fixed bottom-14 md:bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                <div className="flex items-center gap-2.5 flex-1 overflow-x-auto [scrollbar-width:none] pb-1 -mb-1">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2.5 shrink-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                            <img src={item.thumbnail} alt="" className="h-9 w-9 object-cover rounded-lg shrink-0" />
                            <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-800 truncate max-w-[100px] leading-tight">
                                    {item.supplier.businessName}
                                </p>
                                <p className="text-[11px] font-bold text-[#0EA432]">
                                    MWK {item.price.toLocaleString()}
                                </p>
                            </div>
                            <button type="button" onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-slate-600 transition-colors ml-1">
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - items.length) }).map((_, i) => (
                        <div key={i} className="h-[56px] w-[130px] shrink-0 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                            <p className="text-[10px] text-slate-300 font-medium">+ Add bid</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                    <button type="button" onClick={onClear} className="text-[12px] text-slate-400 hover:text-slate-600 font-semibold hidden sm:block">
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

// ── Bid Detail Modal ──────────────────────────────────────────────────────────

function BidDetailModal({ bid, onClose, onAccept, onReject, isUpdating }) {
    const [activeImg, setActiveImg] = useState(0)
    const s = STATUS[bid.status]
    const StatusIcon = s.icon

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
            <div className="relative bg-white w-full sm:max-w-lg sm:mx-4 rounded-t-3xl sm:rounded-2xl max-h-[92dvh] overflow-y-auto flex flex-col">
                <div className="sm:hidden flex justify-center pt-3 shrink-0">
                    <div className="h-1 w-10 rounded-full bg-slate-200" />
                </div>
                <div className="flex items-center justify-between px-5 pt-4 pb-0 shrink-0">
                    <span className={cn("flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide", s.pill)}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {s.label}
                    </span>
                    <button type="button" onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
                    <div className="rounded-2xl overflow-hidden bg-slate-100 h-[210px]">
                        <img src={bid.images[activeImg]} alt="" className="w-full h-full object-cover" />
                    </div>
                    {bid.images.length > 1 && (
                        <div className="flex gap-2">
                            {bid.images.map((src, i) => (
                                <button key={i} type="button" onClick={() => setActiveImg(i)}
                                    className={cn("h-12 w-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all",
                                        i === activeImg ? "border-[#0EA432]" : "border-transparent opacity-50 hover:opacity-100")}>
                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Supplier</p>
                            {bid.supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-[#0EA432]" />}
                        </div>
                        <h2 className="text-[20px] font-extrabold text-slate-900 leading-tight">{bid.supplier.businessName}</h2>
                        <div className="flex items-center gap-1.5 mt-1">
                            <Stars rating={bid.supplier.rating} />
                            <span className="text-[13px] font-bold text-slate-800">{bid.supplier.rating}</span>
                            <span className="text-[12px] text-slate-400">({bid.supplier.reviewCount} reviews)</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-[26px] font-extrabold text-[#0EA432] tabular-nums leading-none">
                            MWK {bid.price.toLocaleString()}
                        </p>
                        <p className="text-[13px] text-slate-500">{bid.qty} {bid.unit}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { icon: Truck, label: "Delivery", value: bid.deliveryTime },
                            { icon: MapPin, label: "Location", value: bid.location.split(",")[0] },
                            { icon: CalendarDays, label: "Submitted", value: bid.submittedOn },
                            { icon: Package, label: "Quantity", value: `${bid.qty} ${bid.unit}` },
                        ].map((row) => (
                            <div key={row.label} className="bg-slate-50 rounded-xl p-3 flex items-center gap-2.5">
                                <row.icon className="h-4 w-4 text-slate-400 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{row.label}</p>
                                    <p className="text-[13px] font-bold text-slate-800 leading-tight mt-0.5">{row.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {bid.note && (
                        <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3.5">
                            <p className="text-[10px] font-bold text-[#0EA432] uppercase tracking-wide mb-1">Supplier's Note</p>
                            <p className="text-[13px] text-[#166534] leading-relaxed">{bid.note}</p>
                        </div>
                    )}

                    {bid.status === "awaiting" && (
                        <div className="space-y-2 pb-2">
                            <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => onAccept?.(bid.id)}
                                className="w-full flex items-center justify-center gap-2 bg-[#0EA432] hover:bg-[#0b8f2b] text-white py-3.5 rounded-2xl text-[15px] font-bold transition-colors disabled:opacity-50"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                Accept This Bid
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" className="flex items-center justify-center gap-1.5 border-2 border-[#0EA432] text-[#0EA432] py-3 rounded-2xl text-[13px] font-bold hover:bg-[#f0fdf4] transition-colors">
                                    <MessageSquare className="h-4 w-4" />
                                    Counter Offer
                                </button>
                                <button
                                    type="button"
                                    disabled={isUpdating}
                                    onClick={() => onReject?.(bid.id)}
                                    className="flex items-center justify-center gap-1.5 border-2 border-red-200 text-red-400 py-3 rounded-2xl text-[13px] font-bold hover:bg-red-50 transition-colors disabled:opacity-50"
                                >
                                    <X className="h-4 w-4" />
                                    Reject
                                </button>
                            </div>
                        </div>
                    )}
                    {bid.status === "accepted" && (
                        <button type="button" className="w-full flex items-center justify-center gap-2 border-2 border-[#0EA432] text-[#0EA432] py-3.5 rounded-2xl text-[15px] font-bold hover:bg-[#f0fdf4] transition-colors pb-2">
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
    const lowestIdx = items.reduce(
        (minIdx, b, i) => (b.price < items[minIdx].price ? i : minIdx), 0
    )
    const rows = [
        { label: "Bid Price", getValue: (b) => `MWK ${b.price.toLocaleString()}`, highlight: true },
        { label: "Quantity", getValue: (b) => `${b.qty} ${b.unit}` },
        { label: "Delivery Time", getValue: (b) => b.deliveryTime },
        { label: "Supplier Rating", getValue: (b) => `${b.supplier.rating}★ (${b.supplier.reviewCount})` },
        { label: "Location", getValue: (b) => b.location },
        { label: "Verified", getValue: (b) => b.supplier.verified ? "✓ Verified" : "Not verified" },
        { label: "Status", getValue: (b) => STATUS[b.status].label },
        { label: "Submitted", getValue: (b) => b.submittedOn },
    ]

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-[18px] font-extrabold text-slate-900">
                            Comparing {items.length} Supplier Bids
                        </h2>
                        <p className="text-[12px] text-slate-400 mt-0.5">
                            Side-by-side — lowest price highlighted
                        </p>
                    </div>
                    <button type="button" onClick={onClose} className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                {/* Supplier cards row */}
                <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `160px repeat(${items.length}, 1fr)` }}>
                    <div />
                    {items.map((bid, idx) => (
                        <div key={bid.id} className="text-center">
                            <div className={cn(
                                "rounded-2xl overflow-hidden h-[140px] mb-3 border",
                                idx === lowestIdx
                                    ? "border-[#0EA432] ring-2 ring-[#0EA432]/20"
                                    : "border-slate-200"
                            )}>
                                <img src={bid.thumbnail} alt="" className="w-full h-full object-cover" />
                            </div>
                            {idx === lowestIdx && (
                                <span className="inline-block mb-1.5 bg-[#0EA432] text-white text-[9px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
                                    Best Price
                                </span>
                            )}
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                                <p className="text-[13px] font-bold text-slate-900">{bid.supplier.businessName}</p>
                                {bid.supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-[#0EA432]" />}
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <Stars rating={bid.supplier.rating} />
                                <span className="text-[11px] font-bold text-slate-600">{bid.supplier.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison table */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                    {rows.map((row, rowIdx) => (
                        <div
                            key={row.label}
                            className="grid border-b border-slate-100 last:border-0"
                            style={{ gridTemplateColumns: `160px repeat(${items.length}, 1fr)` }}
                        >
                            <div className={cn("px-4 py-3.5 flex items-center border-r border-slate-100", rowIdx % 2 === 0 ? "bg-slate-50" : "bg-white")}>
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{row.label}</p>
                            </div>
                            {items.map((bid, bidIdx) => (
                                <div key={bid.id} className={cn("px-4 py-3.5 flex items-center border-r border-slate-100 last:border-r-0", rowIdx % 2 === 0 ? "bg-slate-50/50" : "bg-white")}>
                                    <p className={cn(
                                        "text-[13px] font-semibold",
                                        row.highlight && bidIdx === lowestIdx
                                            ? "text-[#0EA432] font-extrabold text-[16px]"
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
                <div className="mt-4 grid gap-4" style={{ gridTemplateColumns: `160px repeat(${items.length}, 1fr)` }}>
                    <div />
                    {items.map((bid) => (
                        <div key={bid.id}>
                            {bid.status === "awaiting" ? (
                                <button type="button" className="w-full flex items-center justify-center gap-2 bg-[#0EA432] hover:bg-[#0b8f2b] text-white py-3 rounded-xl text-[13px] font-bold transition-colors">
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

function MobileFilterSheet({ open, bids, onClose, filters, onChange }) {
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
                    <FilterSidebar bids={bids} filters={filters} onChange={onChange} className="border-0 p-0 shadow-none" />
                </div>
                <div className="px-5 pb-8 pt-2">
                    <button type="button" onClick={onClose} className="w-full bg-[#0EA432] text-white py-3.5 rounded-2xl text-[15px] font-bold">
                        Show Results
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Bids Grid View (for a selected requirement) ───────────────────────────────

function BidsView({ req, onBack, onAcceptBid, onRejectBid, isUpdating }) {
    const [filters, setFilters] = useState(DEFAULT_FILTERS)
    const [sortBy, setSortBy] = useState("price-asc")
    const [compareIds, setCompareIds] = useState(new Set())
    const [detailBid, setDetailBid] = useState(null)
    const [showCompare, setShowCompare] = useState(false)
    const [showFilterSheet, setShowFilterSheet] = useState(false)
    const [showSort, setShowSort] = useState(false)

    const toggleCompare = (id) => {
        setCompareIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else if (next.size < 3) next.add(id)
            return next
        })
    }

    const filtered = useMemo(() => {
        return req.bids
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
    }, [req.bids, filters, sortBy])

    const compareItems = req.bids.filter((b) => compareIds.has(b.id))
    const activeFilters = filters.status.length + (filters.minRating > 0 ? 1 : 0) + (filters.maxPrice ? 1 : 0) + (filters.delivery ? 1 : 0)
    const remaining = daysLeft(req.deadline)

    return (
        <div className="min-h-[calc(100dvh-56px)] bg-[#f4f5f4]">

            {/* Top bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
                    {/* Breadcrumb row */}
                    <div className="flex items-center gap-2 mb-2">
                        <button type="button" onClick={onBack}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-[#0EA432] transition-colors text-[13px] font-semibold">
                            <ArrowLeft className="h-4 w-4" />
                            My Requirements
                        </button>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                        <span className="text-[13px] font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-none">
                            {req.title}
                        </span>
                    </div>

                    {/* Requirement info + sort + filter */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Budget */}
                        <div className="flex items-center gap-2 flex-1 min-w-0 flex-wrap gap-y-1">
                            <span className="text-[12px] font-semibold text-slate-500">
                                Budget: <span className="text-slate-800">MWK {req.budget.toLocaleString()}</span>
                            </span>
                            <span className="text-slate-200">·</span>
                            <span className={cn("text-[12px] font-semibold", remaining <= 5 ? "text-amber-600" : "text-slate-500")}>
                                {remaining}d left to decide
                            </span>
                            <span className="text-slate-200">·</span>
                            <span className="text-[12px] text-slate-500">
                                <span className="font-bold text-slate-700">{filtered.length}</span> of {req.bids.length} bids shown
                            </span>
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <button type="button" onClick={() => setShowSort(!showSort)}
                                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg text-[12px] font-semibold transition-colors">
                                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                                <ChevronDown className="h-3.5 w-3.5" />
                            </button>
                            {showSort && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                                    <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden min-w-[180px]">
                                        {SORT_OPTIONS.map((opt) => (
                                            <button key={opt.value} type="button"
                                                onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                                                className={cn(
                                                    "w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors",
                                                    sortBy === opt.value ? "bg-[#f0fdf4] text-[#0EA432] font-semibold" : "text-slate-700 hover:bg-slate-50"
                                                )}>
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Filter (mobile) */}
                        <button type="button" onClick={() => setShowFilterSheet(true)}
                            className="lg:hidden relative flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg text-[12px] font-semibold transition-colors">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            Filters
                            {activeFilters > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#0EA432] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                    {activeFilters}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex gap-5 items-start">
                {/* Desktop sidebar */}
                <div className="hidden lg:block w-[220px] shrink-0 sticky top-[97px]">
                    <FilterSidebar bids={req.bids} filters={filters} onChange={setFilters} />
                </div>

                {/* Grid */}
                <main className="flex-1 min-w-0">
                    {filtered.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                <Package className="h-8 w-8 text-slate-300" />
                            </div>
                            <p className="text-[16px] font-bold text-slate-600">No bids match your filters</p>
                            <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)}
                                className="mt-4 text-[13px] font-semibold text-[#0EA432] hover:underline">
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-36 md:pb-24">
                            {filtered.map((bid) => (
                                <BidCard
                                    key={bid.id}
                                    bid={bid}
                                    budget={req.budget}
                                    inCompare={compareIds.has(bid.id)}
                                    onToggleCompare={() => toggleCompare(bid.id)}
                                    onView={() => setDetailBid(bid)}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {compareIds.size > 0 && (
                <CompareBar
                    items={compareItems}
                    onRemove={toggleCompare}
                    onCompare={() => setShowCompare(true)}
                    onClear={() => setCompareIds(new Set())}
                />
            )}

            <MobileFilterSheet
                open={showFilterSheet}
                bids={req.bids}
                onClose={() => setShowFilterSheet(false)}
                filters={filters}
                onChange={setFilters}
            />

            {detailBid && (
                <BidDetailModal
                    bid={detailBid}
                    onClose={() => setDetailBid(null)}
                    onAccept={onAcceptBid}
                    onReject={onRejectBid}
                    isUpdating={isUpdating}
                />
            )}

            {showCompare && compareItems.length >= 2 && (
                <CompareModal items={compareItems} onClose={() => setShowCompare(false)} />
            )}
        </div>
    )
}

// ── Page Root ─────────────────────────────────────────────────────────────────

export default function BidsPage() {
    const [selectedReq, setSelectedReq] = useState(null)
    const { requirements, isLoading, error, refetch } = useBuyerRequirements()
    const acceptBid = useAcceptBid()
    const rejectBid = useRejectBid()

    const isUpdating = acceptBid.isPending || rejectBid.isPending

    const handleAcceptBid = async (bidId) => {
        try {
            await acceptBid.mutateAsync(bidId)
            await refetch()
            setSelectedReq((current) =>
                current
                    ? {
                        ...current,
                        bids: current.bids.map((bid) =>
                            bid.id === bidId
                                ? { ...bid, status: "accepted" }
                                : bid.status === "awaiting"
                                    ? { ...bid, status: "rejected" }
                                    : bid,
                        ),
                    }
                    : current,
            )
        } catch (err) {
            window.alert(err?.message || "Unable to accept bid.")
        }
    }

    const handleRejectBid = async (bidId) => {
        try {
            await rejectBid.mutateAsync(bidId)
            await refetch()
            setSelectedReq((current) =>
                current
                    ? {
                        ...current,
                        bids: current.bids.map((bid) =>
                            bid.id === bidId ? { ...bid, status: "rejected" } : bid,
                        ),
                    }
                    : current,
            )
        } catch (err) {
            window.alert(err?.message || "Unable to reject bid.")
        }
    }

    if (selectedReq) {
        return (
            <BidsView
                req={selectedReq}
                onBack={() => setSelectedReq(null)}
                onAcceptBid={handleAcceptBid}
                onRejectBid={handleRejectBid}
                isUpdating={isUpdating}
            />
        )
    }

    return (
        <div className="min-h-[calc(100dvh-56px)] bg-[#f4f5f4]">
            <RequirementsView
                requirements={requirements}
                isLoading={isLoading}
                error={error}
                onSelect={setSelectedReq}
            />
        </div>
    )
}
