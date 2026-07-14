import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    ChevronLeft,
    ChevronRight,
    Filter,
    Hammer,
    Laptop,
    Leaf,
    Printer,
    ShoppingCart,
    Truck,
    ArrowLeft,
} from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const MY_BIDS = [
    { id: "BID-018", requirement: "Supply of Office Chairs", buyer: "BuildPro Malawi", category: "Office Supplies", amount: 550_000, status: "Pending", updated: "20 May 2025", Icon: ShoppingCart, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { id: "BID-017", requirement: "Building Materials (Cement & Bricks)", buyer: "RoadTech Ltd", category: "Construction Materials", amount: 4_850_000, status: "Shortlisted", updated: "22 May 2025", Icon: Hammer, iconBg: "bg-slate-100", iconColor: "text-slate-700" },
    { id: "BID-016", requirement: "Supply of Laptops", buyer: "Zomba City Council", category: "ICT Equipment", amount: 1_180_000, status: "Pending", updated: "25 May 2025", Icon: Laptop, iconBg: "bg-violet-50", iconColor: "text-violet-600" },
    { id: "BID-015", requirement: "Printing Services", buyer: "Schools Committee", category: "Printing", amount: 95_000, status: "Lost", updated: "27 May 2025", Icon: Printer, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
    { id: "BID-014", requirement: "Supply of Office Desks", category: "Office Supplies", buyer: "Ministry of Education", amount: 720_000, status: "Won", updated: "08 May 2025", Icon: ShoppingCart, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { id: "BID-013", requirement: "Supply of Maize (50kg bags)", buyer: "ADMARC", category: "Agriculture", amount: 880_000, status: "Pending", updated: "07 May 2025", Icon: Leaf, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { id: "BID-012", requirement: "Truck Hire for Deliveries", buyer: "Lilongwe Transport", category: "Transport", amount: 1_450_000, status: "Shortlisted", updated: "06 May 2025", Icon: Truck, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { id: "BID-011", requirement: "Cement Supply (50kg bags)", buyer: "BuildPro Malawi", category: "Construction Materials", amount: 2_050_000, status: "Pending", updated: "05 May 2025", Icon: Hammer, iconBg: "bg-orange-50", iconColor: "text-orange-600" },
    { id: "BID-010", requirement: "Branding and T-shirt Printing", buyer: "Events Co.", category: "Printing", amount: 240_000, status: "Won", updated: "03 May 2025", Icon: Printer, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
    { id: "BID-009", requirement: "Supply of Desktop Computers", buyer: "University of Malawi", category: "ICT Equipment", amount: 1_480_000, status: "Pending", updated: "02 May 2025", Icon: Laptop, iconBg: "bg-violet-50", iconColor: "text-violet-600" },
    { id: "BID-008", requirement: "Supply of Sand and Stones", buyer: "RoadTech Ltd", category: "Construction Materials", amount: 2_700_000, status: "Lost", updated: "30 Apr 2025", Icon: Hammer, iconBg: "bg-slate-100", iconColor: "text-slate-700" },
    { id: "BID-007", requirement: "Office Stationery Package", buyer: "Ministry of Finance", category: "Office Supplies", amount: 180_000, status: "Pending", updated: "28 Apr 2025", Icon: ShoppingCart, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { id: "BID-006", requirement: "School Uniform Supply", buyer: "Schools Committee", category: "Textiles", amount: 950_000, status: "Shortlisted", updated: "26 Apr 2025", Icon: ShoppingCart, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { id: "BID-005", requirement: "Water Tank Installation", buyer: "Mzuzu Water Board", category: "Construction Materials", amount: 1_100_000, status: "Lost", updated: "24 Apr 2025", Icon: Hammer, iconBg: "bg-slate-100", iconColor: "text-slate-700" },
    { id: "BID-004", requirement: "Delivery of Fertilizer (NPK)", buyer: "ADMARC", category: "Agriculture", amount: 3_200_000, status: "Pending", updated: "22 Apr 2025", Icon: Leaf, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { id: "BID-003", requirement: "Networking & WiFi Setup", buyer: "Chancellor College", category: "ICT Equipment", amount: 640_000, status: "Won", updated: "20 Apr 2025", Icon: Laptop, iconBg: "bg-violet-50", iconColor: "text-violet-600" },
    { id: "BID-002", requirement: "Banner & Signage Printing", buyer: "Events Co.", category: "Printing", amount: 150_000, status: "Lost", updated: "18 Apr 2025", Icon: Printer, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
    { id: "BID-001", requirement: "Minibus Hire (Staff Transport)", buyer: "Ministry of Health", category: "Transport", amount: 780_000, status: "Won", updated: "15 Apr 2025", Icon: Truck, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
]

const TABS = ["All", "Pending", "Shortlisted", "Won", "Lost"]

const STATUS_STYLES = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
    Won: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Lost: "bg-red-50 text-red-600 border-red-200",
}

const PAGE_SIZE = 5

// ─── Mobile Bid Card ──────────────────────────────────────────────────────────

function MobileBidCard({ bid }) {
    const Icon = bid.Icon
    return (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", bid.iconBg)}>
                        <Icon className={cn("h-5 w-5", bid.iconColor)} />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-[14px] font-bold text-slate-900 leading-tight">{bid.requirement}</h3>
                        <p className="mt-0.5 text-[12px] text-slate-500">{bid.buyer}</p>
                    </div>
                </div>
                <span className={cn(
                    "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold",
                    STATUS_STYLES[bid.status],
                )}>
                    {bid.status}
                </span>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-[12px]">
                <div>
                    <span className="text-slate-500">My Price: </span>
                    <span className="font-bold text-slate-900">MK {bid.amount.toLocaleString()}</span>
                </div>
                <span className="text-slate-400">{bid.updated}</span>
            </div>
            
            <div className="mt-3 flex justify-end">
                <button className="text-[12px] font-semibold text-[#0EA432] flex items-center gap-0.5">
                    View Details
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const MyBidsPage = () => {
    const [activeTab, setActiveTab] = useState("All")
    const [page, setPage] = useState(1)

    const filtered = useMemo(
        () => (activeTab === "All" ? MY_BIDS : MY_BIDS.filter((bid) => bid.status === activeTab)),
        [activeTab],
    )

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, pageCount)
    const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    const rangeStart = (currentPage - 1) * PAGE_SIZE + 1
    const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length)

    const selectTab = (tab) => {
        setActiveTab(tab)
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
                <h1 className="text-lg font-bold text-slate-900">My Bids</h1>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-[26px]">My Bids</h1>
                <p className="mt-1 text-[14px] text-slate-500">Track all your bids and their status.</p>
            </div>

            {/* Mobile Tabs - Pill style matching design */}
            <div className="md:hidden">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => selectTab(tab)}
                            className={cn(
                                "shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
                                activeTab === tab
                                    ? "bg-[#0EA432] text-white"
                                    : "bg-white text-slate-600 ring-1 ring-slate-200",
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Tabs + filter */}
            <div className="hidden md:flex items-end justify-between gap-3">
                <div className="flex gap-1 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {TABS.map((tab) => {
                        const count = tab === "All" ? MY_BIDS.length : MY_BIDS.filter((bid) => bid.status === tab).length
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => selectTab(tab)}
                                className={cn(
                                    "whitespace-nowrap border-b-2 px-4 pb-2.5 pt-1 text-[13px] font-semibold transition-colors",
                                    activeTab === tab
                                        ? "border-[#0EA432] text-slate-900"
                                        : "border-transparent text-slate-500 hover:text-slate-700",
                                )}
                            >
                                {tab}
                                <span className={cn(
                                    "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                                    activeTab === tab ? "bg-[#0EA432]/10 text-[#0EA432]" : "bg-slate-100 text-slate-500",
                                )}>
                                    {count}
                                </span>
                            </button>
                        )
                    })}
                </div>
                <button
                    type="button"
                    className="mb-1 inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                </button>
            </div>

            {/* Mobile Card List */}
            <div className="space-y-3 md:hidden">
                {filtered.map((bid) => (
                    <MobileBidCard key={bid.id} bid={bid} />
                ))}
                {filtered.length === 0 && (
                    <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-100">
                        <p className="text-[14px] font-semibold text-slate-700">No {activeTab.toLowerCase()} bids</p>
                        <p className="mt-1 text-[12px] text-slate-400">Bids with this status will appear here.</p>
                    </div>
                )}
            </div>

            {/* Desktop Table */}
            <section className="hidden md:block overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/80">
                                {["Requirement", "Your Bid (MK)", "Status", "Last Updated", "Action"].map((col) => (
                                    <th
                                        key={col}
                                        className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {pageItems.map((bid) => {
                                const Icon = bid.Icon
                                return (
                                    <tr key={bid.id} className="transition-colors hover:bg-slate-50/50">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", bid.iconBg)}>
                                                    <Icon className={cn("h-5 w-5", bid.iconColor)} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-[13px] font-bold text-slate-900">{bid.requirement}</p>
                                                    <p className="mt-0.5 text-[12px] text-slate-500">{bid.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-[13px] font-semibold tabular-nums text-slate-800">
                                            {bid.amount.toLocaleString()}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={cn(
                                                "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                                                STATUS_STYLES[bid.status],
                                            )}>
                                                {bid.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-[13px] text-slate-500">{bid.updated}</td>
                                        <td className="px-5 py-4">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-[12px] font-bold text-slate-700 transition-colors hover:bg-slate-50"
                                            >
                                                View
                                                <ChevronRight className="h-3.5 w-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {pageItems.length === 0 && (
                    <div className="px-5 py-16 text-center">
                        <p className="text-[14px] font-semibold text-slate-700">No {activeTab.toLowerCase()} yet</p>
                        <p className="mt-1 text-[12px] text-slate-400">Bids with this status will appear here.</p>
                    </div>
                )}

                {/* Footer */}
                {filtered.length > 0 && (
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row">
                        <p className="text-[12px] text-slate-500">
                            Showing {rangeStart} to {rangeEnd} of {filtered.length} bid{filtered.length !== 1 ? "s" : ""}
                        </p>
                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPage(p)}
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-bold transition-colors",
                                        currentPage === p
                                            ? "bg-[#0EA432] text-white shadow-sm"
                                            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => setPage(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setPage(Math.min(currentPage + 1, pageCount))}
                                disabled={currentPage === pageCount}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default MyBidsPage
