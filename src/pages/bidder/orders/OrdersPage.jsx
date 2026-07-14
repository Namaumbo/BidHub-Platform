import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    ArrowLeft,
    ChevronRight,
    Package,
    Truck,
    CheckCircle2,
    XCircle,
    Clock,
} from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const ORDERS = [
    { 
        id: "#BH2568", 
        buyer: "BuildPro Malawi", 
        item: "Office Chairs (20 Units)", 
        value: 550_000, 
        status: "In Progress", 
        deliveryDate: "18 May 2025",
        quantity: "20 Units"
    },
    { 
        id: "#BH2565", 
        buyer: "Lilongwe City Council", 
        item: "Dustbins (10 Units)", 
        value: 320_000, 
        status: "Preparing", 
        deliveryDate: "20 May 2025",
        quantity: "10 Units"
    },
    { 
        id: "#BH2561", 
        buyer: "Zomba University", 
        item: "Dell Laptops (10 Units)", 
        value: 1_200_000, 
        status: "Delivered", 
        deliveryDate: "14 May 2025",
        quantity: "10 Units"
    },
    { 
        id: "#BH2558", 
        buyer: "Ministry of Health", 
        item: "Medical Supplies", 
        value: 890_000, 
        status: "Delivered", 
        deliveryDate: "10 May 2025",
        quantity: "As per order"
    },
    { 
        id: "#BH2555", 
        buyer: "Schools Committee", 
        item: "School Furniture", 
        value: 450_000, 
        status: "Cancelled", 
        deliveryDate: "08 May 2025",
        quantity: "50 Units"
    },
    { 
        id: "#BH2550", 
        buyer: "RoadTech Ltd", 
        item: "Construction Materials", 
        value: 2_150_000, 
        status: "Delivered", 
        deliveryDate: "05 May 2025",
        quantity: "As per order"
    },
]

const TABS = ["Active", "Completed", "Cancelled"]

const STATUS_CONFIG = {
    "In Progress": { 
        bg: "bg-blue-50", 
        text: "text-blue-700", 
        border: "border-blue-200",
        icon: Truck,
        iconColor: "text-blue-600"
    },
    "Preparing": { 
        bg: "bg-amber-50", 
        text: "text-amber-700", 
        border: "border-amber-200",
        icon: Clock,
        iconColor: "text-amber-600"
    },
    "Delivered": { 
        bg: "bg-emerald-50", 
        text: "text-emerald-700", 
        border: "border-emerald-200",
        icon: CheckCircle2,
        iconColor: "text-emerald-600"
    },
    "Cancelled": { 
        bg: "bg-red-50", 
        text: "text-red-600", 
        border: "border-red-200",
        icon: XCircle,
        iconColor: "text-red-500"
    },
}

// ─── Mobile Order Card ────────────────────────────────────────────────────────

function MobileOrderCard({ order }) {
    const statusConfig = STATUS_CONFIG[order.status]
    const StatusIcon = statusConfig.icon
    
    return (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <Package className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-slate-500">{order.id}</p>
                        <h3 className="text-[14px] font-bold text-slate-900 leading-tight">{order.buyer}</h3>
                        <p className="mt-0.5 text-[12px] text-slate-500">{order.item}</p>
                    </div>
                </div>
                <span className={cn(
                    "shrink-0 flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold",
                    statusConfig.bg,
                    statusConfig.text,
                    statusConfig.border
                )}>
                    <StatusIcon className="h-3 w-3" />
                    {order.status}
                </span>
            </div>
            
            <div className="mt-3 space-y-1.5 text-[12px]">
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Amount:</span>
                    <span className="font-bold text-slate-900">MK {order.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Delivery:</span>
                    <span className="font-semibold text-slate-700">{order.deliveryDate}</span>
                </div>
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

const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("Active")

    const filtered = useMemo(() => {
        if (activeTab === "Active") {
            return ORDERS.filter((o) => o.status === "In Progress" || o.status === "Preparing")
        }
        if (activeTab === "Completed") {
            return ORDERS.filter((o) => o.status === "Delivered")
        }
        return ORDERS.filter((o) => o.status === "Cancelled")
    }, [activeTab])

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
                <h1 className="text-lg font-bold text-slate-900">Orders</h1>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-[26px]">Orders</h1>
                <p className="mt-1 text-[14px] text-slate-500">Track all your orders and deliveries.</p>
            </div>

            {/* Mobile Tabs - Pill style matching design */}
            <div className="md:hidden">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
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

            {/* Desktop Tabs */}
            <div className="hidden md:flex items-end justify-between gap-3">
                <div className="flex gap-1 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {TABS.map((tab) => {
                        let count = 0
                        if (tab === "Active") {
                            count = ORDERS.filter((o) => o.status === "In Progress" || o.status === "Preparing").length
                        } else if (tab === "Completed") {
                            count = ORDERS.filter((o) => o.status === "Delivered").length
                        } else {
                            count = ORDERS.filter((o) => o.status === "Cancelled").length
                        }
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
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
            </div>

            {/* Mobile Card List */}
            <div className="space-y-3 md:hidden">
                {filtered.map((order) => (
                    <MobileOrderCard key={order.id} order={order} />
                ))}
                {filtered.length === 0 && (
                    <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-100">
                        <p className="text-[14px] font-semibold text-slate-700">No {activeTab.toLowerCase()} orders</p>
                        <p className="mt-1 text-[12px] text-slate-400">Orders will appear here.</p>
                    </div>
                )}
            </div>

            {/* Desktop Table */}
            <section className="hidden md:block overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/80">
                                {["Order ID", "Buyer", "Item", "Value (MK)", "Status", "Delivery Date", "Action"].map((col) => (
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
                            {filtered.map((order) => {
                                const statusConfig = STATUS_CONFIG[order.status]
                                return (
                                    <tr key={order.id} className="transition-colors hover:bg-slate-50/50">
                                        <td className="px-5 py-4 text-[13px] font-semibold text-slate-800">{order.id}</td>
                                        <td className="px-5 py-4 text-[13px] text-slate-700">{order.buyer}</td>
                                        <td className="px-5 py-4 text-[13px] text-slate-700">{order.item}</td>
                                        <td className="px-5 py-4 text-[13px] font-semibold tabular-nums text-slate-800">
                                            {order.value.toLocaleString()}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={cn(
                                                "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                                                statusConfig.bg,
                                                statusConfig.text,
                                            )}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-[13px] text-slate-500">{order.deliveryDate}</td>
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

                {filtered.length === 0 && (
                    <div className="px-5 py-16 text-center">
                        <p className="text-[14px] font-semibold text-slate-700">No {activeTab.toLowerCase()} orders</p>
                        <p className="mt-1 text-[12px] text-slate-400">Orders will appear here.</p>
                    </div>
                )}
            </section>
        </div>
    )
}

export default OrdersPage
