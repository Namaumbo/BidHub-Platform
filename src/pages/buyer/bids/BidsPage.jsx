import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    ShieldCheck, MapPin, CalendarDays, Package, ChevronRight,
    CheckCircle2, XCircle, HelpCircle, MessageSquare, X, Star,
    Truck, Check, SlidersHorizontal, ChevronDown, ChevronUp,
    ArrowLeft, Clock, PackagePlus, Store, Scale, Inbox, Sparkles,
} from "lucide-react"
import { useBuyerRequirements } from "@/core/hooks/useBuyerRequirements"
import { useAcceptBid, useRejectBid } from "@/core/hooks/useBids"

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS = {
    awaiting: {
        label: "Awaiting Review", short: "Awaiting", icon: HelpCircle,
        pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
        dot: "bg-amber-400",
        accent: "text-amber-600",
    },
    accepted: {
        label: "Accepted", short: "Accepted", icon: CheckCircle2,
        pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        dot: "bg-[#0EA432]",
        accent: "text-[#0EA432]",
    },
    rejected: {
        label: "Rejected", short: "Rejected", icon: XCircle,
        pill: "bg-red-50 text-red-500 ring-1 ring-red-100",
        dot: "bg-red-300",
        accent: "text-red-400",
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

function Stars({ rating, size = "sm" }) {
    const starClass = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className={cn(
                    starClass,
                    n <= Math.round(rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                )} />
            ))}
        </div>
    )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, valueColor = "text-slate-900", accent }) {
    return (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition-all hover:ring-[#0EA432]/30">
            <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", accent)}>
                    <Icon className="h-5 w-5 text-[#0EA432]" />
                </div>
                <div className="min-w-0">
                    <p className={cn("text-[22px] font-bold tabular-nums leading-none", valueColor)}>{value}</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-500 leading-tight">{label}</p>
                </div>
            </div>
        </div>
    )
}

// ── Table layout (cart-style) ─────────────────────────────────────────────────

const REQ_TABLE_COLS = "minmax(0,1fr) 110px 90px 100px 36px"
const BID_TABLE_COLS = "minmax(0,1fr) 120px 110px 100px 90px"

function TableHeader({ cols, children, className }) {
    return (
        <div
            className={cn(
                "hidden border-b border-slate-200 px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-slate-900 md:grid",
                className,
            )}
            style={{ gridTemplateColumns: cols }}
        >
            {children}
        </div>
    )
}

function TableHeaderCell({ children, align = "left" }) {
    return (
        <span className={cn(
            align === "center" && "text-center",
            align === "right" && "text-right",
        )}>
            {children}
        </span>
    )
}

// ── Requirement row (top-level list) ────────────────────────────────────────────

function RequirementRow({ req, onClick }) {
    const awaiting = req.bids.filter((b) => b.status === "awaiting").length
    const remaining = daysLeft(req.deadline)
    const urgent = remaining <= 5
    const lowestBid = req.bids.length > 0
        ? Math.min(...req.bids.map((b) => b.price))
        : null

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}
            className="group cursor-pointer border-b border-slate-100 px-5 py-5 transition-colors last:border-0 hover:bg-slate-50/60 md:grid md:items-center md:py-4"
            style={{ gridTemplateColumns: REQ_TABLE_COLS }}
        >
            {/* Requirement info */}
            <div className="flex gap-4 md:col-span-1">
                <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[#f0efec]">
                    <img src={req.thumbnail} alt={req.title} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold uppercase leading-snug tracking-wide text-slate-900 line-clamp-2">
                        {req.title}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500">
                        {req.category} · Posted {req.postedOn}
                    </p>
                    {lowestBid != null && (
                        <p className="mt-0.5 hidden text-[12px] sm:block">
                            Lowest bid <span className="font-semibold text-[#0EA432]">MWK {lowestBid.toLocaleString()}</span>
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onClick() }}
                        className="mt-2 text-[12px] font-semibold text-[#0EA432] underline underline-offset-2 transition-colors hover:text-[#0b8f2b]"
                    >
                        View bids
                    </button>
                </div>
            </div>

            {/* Mobile meta */}
            <div className="mt-3 flex flex-wrap items-center gap-4 pl-[88px] text-[13px] md:hidden">
                <span className="font-semibold text-slate-900">MWK {req.budget.toLocaleString()}</span>
                <span className="text-slate-600">{req.bids.length} bids</span>
                <span className={cn(urgent && "font-semibold text-amber-600")}>{remaining}d left</span>
            </div>

            {/* Desktop columns */}
            <p className="hidden text-[14px] font-semibold tabular-nums text-slate-900 md:block">
                MWK {req.budget.toLocaleString()}
            </p>
            <p className="hidden text-center text-[14px] font-semibold md:block text-[#0EA432]">
                {req.bids.length}
                {awaiting > 0 && (
                    <span className="mt-0.5 block text-[10px] font-normal text-amber-600">{awaiting} pending</span>
                )}
            </p>
            <p className={cn(
                "hidden text-center text-[14px] font-medium md:block",
                urgent ? "font-semibold text-amber-600" : "text-slate-700",
            )}>
                {remaining}d
            </p>
            <div className="hidden items-center justify-end md:flex">
                <ChevronRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-[#0EA432]" />
            </div>
        </div>
    )
}

// ── Requirements List View ────────────────────────────────────────────────────

function RequirementsView({ requirements, isLoading, error, onSelect }) {
    const totalBids = requirements.reduce((s, r) => s + r.bids.length, 0)
    const awaitingCount = requirements.reduce((s, r) => s + r.bids.filter(b => b.status === "awaiting").length, 0)

    if (isLoading) {
        return (
            <div className="mx-auto max-w-5xl bg-[#f4f5f4] px-4 py-12 sm:px-6">
                <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-20 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200" />
                    ))}
                </div>
                <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-4 border-b border-slate-100 px-5 py-5">
                            <div className="h-[72px] w-[72px] shrink-0 animate-pulse rounded-md bg-slate-100" />
                            <div className="flex-1 space-y-2 py-1">
                                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mx-auto max-w-5xl bg-[#f4f5f4] px-4 py-12 sm:px-6">
                <div className="rounded-2xl bg-red-50 p-8 text-center ring-1 ring-red-100">
                    <p className="text-sm font-medium text-red-600">{error.message || "Unable to load requirements."}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#0EA432]/10 px-3 py-1 text-[11px] font-semibold text-[#0EA432]">
                        <Scale className="h-3.5 w-3.5" />
                        Compare & decide
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-[28px] leading-tight">
                        Bids for Requirements
                    </h1>
                    <p className="mt-1.5 text-[13px] text-slate-500">
                        Review supplier offers, compare prices, and accept the best deal.
                    </p>
                </div>
                <Link
                    to="/buyer/post-requirement"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#0EA432] px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#0b8f2b]"
                >
                    <PackagePlus className="h-4 w-4" />
                    Post Requirement
                </Link>
            </div>

            {/* Summary stats */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <StatCard icon={Store} label="Requirements Posted" value={requirements.length} accent="bg-slate-100" />
                <StatCard icon={Inbox} label="Total Bids Received" value={totalBids} valueColor="text-[#0EA432]" accent="bg-[#0EA432]/10" />
                <StatCard icon={Sparkles} label="Awaiting Your Decision" value={awaitingCount} valueColor="text-amber-600" accent="bg-amber-50" />
            </div>

            {/* Table */}
            {requirements.length === 0 ? (
                <div className="rounded-lg bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0EA432]/10">
                        <Package className="h-7 w-7 text-[#0EA432]" />
                    </div>
                    <p className="text-[15px] font-semibold text-slate-700">No requirements posted yet</p>
                    <p className="mt-1 text-[13px] text-slate-500">Post what you need and suppliers will send bids.</p>
                    <Link
                        to="/buyer/post-requirement"
                        className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#0EA432] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#0b8f2b]"
                    >
                        <PackagePlus className="h-4 w-4" />
                        Post a requirement
                    </Link>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
                    <TableHeader cols={REQ_TABLE_COLS}>
                        <TableHeaderCell>Requirement</TableHeaderCell>
                        <TableHeaderCell align="center">Budget</TableHeaderCell>
                        <TableHeaderCell align="center">Bids</TableHeaderCell>
                        <TableHeaderCell align="center">Deadline</TableHeaderCell>
                        <span />
                    </TableHeader>
                    {requirements.map((req) => (
                        <RequirementRow key={req.id} req={req} onClick={() => onSelect(req)} />
                    ))}
                </div>
            )}
        </div>
    )
}

// ── Filter Sidebar ────────────────────────────────────────────────────────────

function FilterSection({ title, children }) {
    const [open, setOpen] = useState(true)
    return (
        <div className="border-b border-slate-100 pb-4 mb-4 last:mb-0 last:border-0 last:pb-0">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="mb-3 flex w-full items-center justify-between"
            >
                <p className="text-[12px] font-semibold text-slate-700">{title}</p>
                {open ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
            </button>
            {open && children}
        </div>
    )
}

function FilterChip({ active, onClick, label, count }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-medium transition-all",
                active
                    ? "bg-[#0EA432]/10 text-[#0EA432] ring-1 ring-[#0EA432]/30"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100",
            )}
        >
            <span>{label}</span>
            {count != null && (
                <span className={cn("text-[11px] tabular-nums", active ? "text-[#0EA432]" : "text-slate-400")}>
                    {count}
                </span>
            )}
        </button>
    )
}

function FilterSidebar({ bids, filters, onChange, className }) {
    const statusCounts = {
        awaiting: bids.filter((b) => b.status === "awaiting").length,
        accepted: bids.filter((b) => b.status === "accepted").length,
        rejected: bids.filter((b) => b.status === "rejected").length,
    }

    const toggleStatus = (value) => {
        const next = filters.status.includes(value)
            ? filters.status.filter((s) => s !== value)
            : [...filters.status, value]
        onChange({ ...filters, status: next })
    }

    return (
        <aside className={cn("rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200", className)}>
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-[#0EA432]" />
                    <p className="text-[14px] font-bold text-slate-900">Filters</p>
                </div>
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
                    className="w-full rounded-xl border-0 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-700 outline-none ring-1 ring-slate-200 transition-all focus:ring-2 focus:ring-[#0EA432]/40"
                />
            </FilterSection>

            <FilterSection title="Bid Status">
                <div className="space-y-1.5">
                    {[
                        { value: "awaiting", label: "Awaiting Review" },
                        { value: "accepted", label: "Accepted" },
                        { value: "rejected", label: "Rejected" },
                    ].map((opt) => (
                        <FilterChip
                            key={opt.value}
                            active={filters.status.includes(opt.value)}
                            onClick={() => toggleStatus(opt.value)}
                            label={opt.label}
                            count={statusCounts[opt.value]}
                        />
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Min. Supplier Rating">
                <div className="space-y-1.5">
                    {[
                        { value: 4.5, label: "4.5★ and above" },
                        { value: 4.0, label: "4.0★ and above" },
                        { value: 3.5, label: "3.5★ and above" },
                        { value: 0, label: "Any rating" },
                    ].map((opt) => (
                        <FilterChip
                            key={opt.value}
                            active={filters.minRating === opt.value}
                            onClick={() => onChange({ ...filters, minRating: opt.value })}
                            label={opt.label}
                        />
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Delivery Speed">
                <div className="space-y-1.5">
                    {[
                        { value: "fast", label: "Under 3 days" },
                        { value: "medium", label: "3–7 days" },
                        { value: "slow", label: "Over 7 days" },
                    ].map((opt) => (
                        <FilterChip
                            key={opt.value}
                            active={filters.delivery === opt.value}
                            onClick={() =>
                                onChange({ ...filters, delivery: filters.delivery === opt.value ? null : opt.value })
                            }
                            label={opt.label}
                        />
                    ))}
                </div>
            </FilterSection>
        </aside>
    )
}

// ── Bid row (supplier offer — table style) ────────────────────────────────────

function BidRow({ bid, budget, inCompare, onToggleCompare, onView }) {
    const s = STATUS[bid.status]
    const savings = budget - bid.price
    const underBudget = savings > 0

    return (
        <div
            className="group border-b border-slate-100 px-5 py-5 transition-colors last:border-0 hover:bg-slate-50/60 md:grid md:items-center md:py-4"
            style={{ gridTemplateColumns: BID_TABLE_COLS }}
        >
            {/* Supplier info */}
            <div className="flex gap-4">
                <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[#f0efec]">
                    <img src={bid.thumbnail} alt={bid.supplier.businessName} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                        <p className="truncate text-[13px] font-bold uppercase tracking-wide text-slate-900">
                            {bid.supplier.businessName}
                        </p>
                        {bid.supplier.verified && <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#0EA432]" />}
                    </div>
                    <p className="mt-1 text-[12px] text-slate-500">
                        {bid.qty} {bid.unit} · {bid.location}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                        <Stars rating={bid.supplier.rating} />
                        <span className="text-[11px] text-slate-400">{bid.supplier.rating} ({bid.supplier.reviewCount})</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onView}
                            className="text-[12px] font-medium text-slate-900 underline underline-offset-2 transition-colors hover:text-[#0EA432]"
                        >
                            View details
                        </button>
                        <button
                            type="button"
                            onClick={onToggleCompare}
                            className={cn(
                                "text-[12px] font-medium underline underline-offset-2 transition-colors",
                                inCompare ? "text-[#0EA432]" : "text-slate-400 hover:text-slate-700",
                            )}
                        >
                            {inCompare ? "Added to compare" : "Compare"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile columns */}
            <div className="mt-3 flex flex-wrap items-center gap-4 pl-[88px] text-[13px] md:hidden">
                <span className="font-bold text-[#0EA432]">MWK {bid.price.toLocaleString()}</span>
                <span className="text-slate-600">{bid.deliveryTime}</span>
                <span className={cn("text-[12px] font-medium", s.accent)}>{s.short}</span>
            </div>

            {/* Desktop columns */}
            <div className="hidden md:block">
                <p className="text-[14px] font-bold tabular-nums text-[#0EA432]">
                    MWK {bid.price.toLocaleString()}
                </p>
                {underBudget && (
                    <p className="mt-0.5 text-[10px] font-medium text-[#0EA432]">
                        −{savings.toLocaleString()} vs budget
                    </p>
                )}
            </div>
            <p className="hidden text-center text-[13px] text-slate-600 md:block">
                {bid.deliveryTime}
            </p>
            <p className={cn("hidden text-center text-[12px] font-semibold uppercase tracking-wide md:block", s.accent)}>
                {s.short}
            </p>
            <div className="hidden items-center justify-center md:flex">
                <button
                    type="button"
                    onClick={onToggleCompare}
                    className={cn(
                        "flex h-7 w-7 items-center justify-center rounded border text-[14px] font-light transition-colors",
                        inCompare
                            ? "border-[#0EA432] bg-[#0EA432] text-white"
                            : "border-slate-300 text-slate-400 hover:border-slate-500 hover:text-slate-600",
                    )}
                    aria-label={inCompare ? "Remove from compare" : "Add to compare"}
                >
                    {inCompare ? <Check className="h-3.5 w-3.5" /> : "+"}
                </button>
            </div>
        </div>
    )
}

// ── Compare Bar ───────────────────────────────────────────────────────────────

function CompareBar({ items, onRemove, onCompare, onClear }) {
    return (
        <div className="fixed bottom-14 left-0 right-0 z-40 border-t border-slate-200 bg-white md:bottom-0">
            <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3">
                <div className="flex flex-1 items-center gap-3 overflow-x-auto [scrollbar-width:none]">
                    {items.map((item) => (
                        <div key={item.id} className="flex shrink-0 items-center gap-2.5">
                            <img src={item.thumbnail} alt="" className="h-10 w-10 shrink-0 rounded-md object-cover bg-[#f0efec]" />
                            <div className="min-w-0">
                                <p className="max-w-[100px] truncate text-[11px] font-bold uppercase tracking-wide text-slate-900">
                                    {item.supplier.businessName}
                                </p>
                                <p className="text-[12px] font-bold text-[#0EA432]">
                                    MWK {item.price.toLocaleString()}
                                </p>
                            </div>
                            <button type="button" onClick={() => onRemove(item.id)} className="text-[11px] font-medium text-slate-400 underline underline-offset-2 hover:text-red-400">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex shrink-0 items-center gap-4">
                    <button type="button" onClick={onClear} className="hidden text-[12px] font-semibold text-[#0EA432] hover:underline sm:block">
                        Clear all
                    </button>
                    <button
                        type="button"
                        onClick={onCompare}
                        disabled={items.length < 2}
                        className="flex items-center gap-1.5 rounded-xl bg-[#0EA432] px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#0b8f2b] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Scale className="h-4 w-4" />
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
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative flex max-h-[92dvh] w-full flex-col overflow-y-auto rounded-t-3xl bg-white sm:mx-4 sm:max-w-lg sm:rounded-2xl">
                <div className="flex shrink-0 justify-center pt-3 sm:hidden">
                    <div className="h-1 w-10 rounded-full bg-slate-200" />
                </div>

                <div className="relative shrink-0">
                    <div className="h-[220px] overflow-hidden bg-slate-100 sm:rounded-t-2xl">
                        <img src={bid.images[activeImg]} alt="" className="h-full w-full object-cover" />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <span className={cn(
                        "absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
                        s.pill,
                    )}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {s.label}
                    </span>
                </div>

                {bid.images.length > 1 && (
                    <div className="flex shrink-0 gap-2 px-5 pt-3">
                        {bid.images.map((src, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveImg(i)}
                                className={cn(
                                    "h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                                    i === activeImg ? "border-[#0EA432]" : "border-transparent opacity-50 hover:opacity-100",
                                )}
                            >
                                <img src={src} alt="" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                    <div>
                        <div className="mb-0.5 flex items-center gap-1.5">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Supplier</p>
                            {bid.supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-[#0EA432]" />}
                        </div>
                        <h2 className="text-[20px] font-bold leading-tight text-slate-900">{bid.supplier.businessName}</h2>
                        <div className="mt-1.5 flex items-center gap-1.5">
                            <Stars rating={bid.supplier.rating} size="md" />
                            <span className="text-[13px] font-semibold text-slate-800">{bid.supplier.rating}</span>
                            <span className="text-[12px] text-slate-400">({bid.supplier.reviewCount} reviews)</span>
                        </div>
                    </div>

                    <div className="flex items-end justify-between rounded-2xl bg-[#0EA432]/5 p-4 ring-1 ring-[#0EA432]/15">
                        <div>
                            <p className="text-[11px] font-medium text-slate-500">Bid price</p>
                            <p className="text-[26px] font-bold tabular-nums leading-none text-[#0EA432]">
                                MWK {bid.price.toLocaleString()}
                            </p>
                        </div>
                        <p className="text-[13px] font-medium text-slate-600">{bid.qty} {bid.unit}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { icon: Truck, label: "Delivery", value: bid.deliveryTime },
                            { icon: MapPin, label: "Location", value: bid.location.split(",")[0] },
                            { icon: CalendarDays, label: "Submitted", value: bid.submittedOn },
                            { icon: Package, label: "Quantity", value: `${bid.qty} ${bid.unit}` },
                        ].map((row) => (
                            <div key={row.label} className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                                <row.icon className="h-4 w-4 shrink-0 text-[#0EA432]" />
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{row.label}</p>
                                    <p className="mt-0.5 text-[13px] font-semibold leading-tight text-slate-800">{row.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {bid.note && (
                        <div className="rounded-xl bg-emerald-50 p-3.5 ring-1 ring-emerald-100">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#0EA432]">Supplier's Note</p>
                            <p className="text-[13px] leading-relaxed text-emerald-800">{bid.note}</p>
                        </div>
                    )}

                    {bid.status === "awaiting" && (
                        <div className="space-y-2 pb-2">
                            <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => onAccept?.(bid.id)}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0EA432] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#0b8f2b] disabled:opacity-50"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                Accept This Bid
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" className="flex items-center justify-center gap-1.5 rounded-2xl border-2 border-[#0EA432] py-3 text-[13px] font-bold text-[#0EA432] transition-colors hover:bg-emerald-50">
                                    <MessageSquare className="h-4 w-4" />
                                    Counter Offer
                                </button>
                                <button
                                    type="button"
                                    disabled={isUpdating}
                                    onClick={() => onReject?.(bid.id)}
                                    className="flex items-center justify-center gap-1.5 rounded-2xl border-2 border-red-100 py-3 text-[13px] font-bold text-red-400 transition-colors hover:bg-red-50 disabled:opacity-50"
                                >
                                    <X className="h-4 w-4" />
                                    Reject
                                </button>
                            </div>
                        </div>
                    )}
                    {bid.status === "accepted" && (
                        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#0EA432] py-3.5 text-[15px] font-bold text-[#0EA432] transition-colors hover:bg-emerald-50 pb-2">
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <Scale className="h-4 w-4 text-[#0EA432]" />
                            <h2 className="text-[18px] font-bold text-slate-900">
                                Comparing {items.length} Bids
                            </h2>
                        </div>
                        <p className="text-[12px] text-slate-500">
                            Lowest price highlighted in green
                        </p>
                    </div>
                    <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
                {/* Supplier cards row */}
                <div className="mb-6 grid gap-4" style={{ gridTemplateColumns: `140px repeat(${items.length}, 1fr)` }}>
                    <div />
                    {items.map((bid, idx) => (
                        <div key={bid.id} className="text-center">
                            <div className={cn(
                                "mb-3 h-[130px] overflow-hidden rounded-2xl ring-1",
                                idx === lowestIdx
                                    ? "ring-2 ring-[#0EA432] shadow-md shadow-[#0EA432]/10"
                                    : "ring-slate-200",
                            )}>
                                <img src={bid.thumbnail} alt="" className="h-full w-full object-cover" />
                            </div>
                            {idx === lowestIdx && (
                                <span className="mb-1.5 inline-block rounded-full bg-[#0EA432] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                                    Best Price
                                </span>
                            )}
                            <div className="mb-0.5 flex items-center justify-center gap-1">
                                <p className="text-[13px] font-semibold text-slate-900">{bid.supplier.businessName}</p>
                                {bid.supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-[#0EA432]" />}
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <Stars rating={bid.supplier.rating} />
                                <span className="text-[11px] font-semibold text-slate-600">{bid.supplier.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison table */}
                <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                    {rows.map((row, rowIdx) => (
                        <div
                            key={row.label}
                            className="grid border-b border-slate-100 last:border-0"
                            style={{ gridTemplateColumns: `140px repeat(${items.length}, 1fr)` }}
                        >
                            <div className={cn("flex items-center border-r border-slate-100 px-4 py-3.5", rowIdx % 2 === 0 ? "bg-slate-50" : "bg-white")}>
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{row.label}</p>
                            </div>
                            {items.map((bid, bidIdx) => (
                                <div key={bid.id} className={cn("flex items-center border-r border-slate-100 px-4 py-3.5 last:border-r-0", rowIdx % 2 === 0 ? "bg-slate-50/50" : "bg-white")}>
                                    <p className={cn(
                                        "text-[13px] font-medium",
                                        row.highlight && bidIdx === lowestIdx
                                            ? "text-[16px] font-bold text-[#0EA432]"
                                            : "text-slate-800",
                                    )}>
                                        {row.getValue(bid)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Action row */}
                <div className="mt-4 grid gap-4" style={{ gridTemplateColumns: `140px repeat(${items.length}, 1fr)` }}>
                    <div />
                    {items.map((bid) => (
                        <div key={bid.id}>
                            {bid.status === "awaiting" ? (
                                <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0EA432] py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#0b8f2b]">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Accept
                                </button>
                            ) : (
                                <div className={cn(
                                    "w-full rounded-xl py-3 text-center text-[13px] font-bold ring-1",
                                    bid.status === "accepted"
                                        ? "bg-emerald-50 text-[#0EA432] ring-emerald-200"
                                        : "bg-red-50 text-red-400 ring-red-100",
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
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-white">
                <div className="mb-2 flex justify-center pt-3">
                    <div className="h-1 w-10 rounded-full bg-slate-200" />
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4 text-[#0EA432]" />
                        <p className="text-[16px] font-bold text-slate-900">Filters</p>
                    </div>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        <X className="h-4 w-4 text-slate-500" />
                    </button>
                </div>
                <div className="px-5 py-4">
                    <FilterSidebar bids={bids} filters={filters} onChange={onChange} className="border-0 p-0 shadow-none ring-0" />
                </div>
                <div className="px-5 pb-8 pt-2">
                    <button type="button" onClick={onClose} className="w-full rounded-2xl bg-[#0EA432] py-3.5 text-[15px] font-bold text-white">
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
    const urgent = remaining <= 5
    const lowestPrice = req.bids.length > 0 ? Math.min(...req.bids.map((b) => b.price)) : null

    return (
        <div className="min-h-[calc(100dvh-56px)] bg-[#f4f5f4]">

            {/* Requirement context */}
            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
                    <button
                        type="button"
                        onClick={onBack}
                        className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 transition-colors hover:text-[#0EA432]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to requirements
                    </button>

                    <div className="flex gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[#f0efec] ring-1 ring-slate-200 sm:h-[72px] sm:w-[72px]">
                            <img src={req.thumbnail} alt={req.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0EA432]">{req.category}</p>
                            <h1 className="mt-0.5 line-clamp-2 text-lg font-bold text-slate-900 sm:text-xl">
                                {req.title}
                            </h1>
                            <p className="mt-1.5 text-[13px] text-slate-500">
                                Budget <span className="font-semibold text-slate-800">MWK {req.budget.toLocaleString()}</span>
                                {lowestPrice != null && (
                                    <> · Lowest bid <span className="font-semibold text-[#0EA432]">MWK {lowestPrice.toLocaleString()}</span></>
                                )}
                                <span className={cn("ml-1 inline-flex items-center gap-1", urgent && "font-semibold text-amber-600")}>
                                    · <Clock className="h-3 w-3" /> {remaining}d to decide
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
                    <p className="text-[13px] text-slate-500">
                        <span className="font-semibold text-[#0EA432]">{filtered.length}</span>
                        {" "}of {req.bids.length} bids shown
                    </p>

                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowSort(!showSort)}
                                className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-[#0EA432]/10 hover:text-[#0EA432]"
                            >
                                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                                <ChevronDown className="h-3 w-3" />
                            </button>
                            {showSort && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                                    <div className="absolute right-0 top-full z-20 mt-2 min-w-[200px] overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-slate-200">
                                        {SORT_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                                                className={cn(
                                                    "w-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors",
                                                    sortBy === opt.value ? "bg-[#f0fdf4] font-semibold text-[#0EA432]" : "text-slate-700 hover:bg-slate-50",
                                                )}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilterSheet(true)}
                            className="relative flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-[#0EA432]/10 hover:text-[#0EA432] lg:hidden"
                        >
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            Filters
                            {activeFilters > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0EA432] text-[9px] font-bold text-white">
                                    {activeFilters}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="mx-auto flex max-w-5xl items-start gap-6 px-4 py-6 sm:px-6">
                <div className="sticky top-[49px] hidden w-[220px] shrink-0 lg:block">
                    <FilterSidebar bids={req.bids} filters={filters} onChange={setFilters} />
                </div>

                <main className="min-w-0 flex-1 pb-32">
                    {filtered.length === 0 ? (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                            <Package className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                            <p className="text-[14px] font-semibold text-slate-700">No bids match your filters</p>
                            <button
                                type="button"
                                onClick={() => setFilters(DEFAULT_FILTERS)}
                                className="mt-4 text-[13px] font-semibold text-[#0EA432] hover:underline"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                            <TableHeader cols={BID_TABLE_COLS}>
                                <TableHeaderCell>Supplier</TableHeaderCell>
                                <TableHeaderCell align="center">Bid Price</TableHeaderCell>
                                <TableHeaderCell align="center">Delivery</TableHeaderCell>
                                <TableHeaderCell align="center">Status</TableHeaderCell>
                                <TableHeaderCell align="center">Compare</TableHeaderCell>
                            </TableHeader>
                            {filtered.map((bid) => (
                                <BidRow
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
