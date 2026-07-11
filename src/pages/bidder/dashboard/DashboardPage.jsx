import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import {
    Briefcase,
    ChevronRight,
    ClipboardList,
    FileText,
    Hammer,
    Laptop,
    Printer,
    ShoppingCart,
    Star,
    Target,
    TrendingUp,
    Wallet,
} from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const KPI_STATS = [
    { label: "Open Requirements", value: 24, icon: FileText, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", link: "/seller/requirements" },
    { label: "My Bids", value: 18, icon: ClipboardList, iconBg: "bg-blue-50", iconColor: "text-blue-600", link: "/seller/requirements" },
    { label: "Shortlisted", value: 6, icon: Star, iconBg: "bg-amber-50", iconColor: "text-amber-600", link: "/seller/requirements" },
    { label: "Won Orders", value: 4, icon: Briefcase, iconBg: "bg-violet-50", iconColor: "text-violet-600", link: "/seller/requirements" },
    { label: "Total Earnings", value: "MK 2,450,000", sub: "This month", icon: Wallet, iconBg: "bg-red-50", iconColor: "text-red-500", link: null },
]

const LATEST_REQUIREMENTS = [
    {
        id: "REQ-001",
        title: "Supply of Office Chairs",
        location: "Lilongwe",
        category: "Office Supplies",
        quantity: "50 units",
        deadline: "20 May 2025",
        Icon: ShoppingCart,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        id: "REQ-002",
        title: "Cement Supply (50kg bags)",
        location: "Blantyre",
        category: "Construction",
        quantity: "200 bags",
        deadline: "22 May 2025",
        Icon: Hammer,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
    },
    {
        id: "REQ-003",
        title: "Laptops for School",
        location: "Mzuzu",
        category: "Electronics",
        quantity: "30 units",
        deadline: "25 May 2025",
        Icon: Laptop,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
    },
    {
        id: "REQ-004",
        title: "Printer Cartridges",
        location: "Zomba",
        category: "Office Supplies",
        quantity: "100 units",
        deadline: "28 May 2025",
        Icon: Printer,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600",
    },
]

const ACTIVE_ORDERS = [
    { id: "#BH2568", buyer: "Capital Bank", item: "Office Chairs", value: 450_000, status: "In Progress", deliveryDate: "15 May 2025" },
    { id: "#BH2567", buyer: "Dzuka Constructions", item: "Cement Bags", value: 1_200_000, status: "Preparing", deliveryDate: "18 May 2025" },
    { id: "#BH2566", buyer: "Chikondi Supermarket", item: "Maize Bags", value: 320_000, status: "Delivered", deliveryDate: "10 May 2025" },
]

const BID_STATUS = [
    { label: "Pending", count: 10, dot: "bg-amber-400" },
    { label: "Shortlisted", count: 6, dot: "bg-blue-500" },
    { label: "Under Review", count: 2, dot: "bg-violet-500" },
    { label: "Accepted", count: 2, dot: "bg-emerald-500" },
    { label: "Not Selected", count: 8, dot: "bg-red-400" },
]

const RECENT_MESSAGES = [
    { initials: "BP", name: "Blantyre Procurement", snippet: "Can you deliver by Friday?", time: "10:30 AM", unread: 1 },
    { initials: "GO", name: "Government Office", snippet: "We need a revised quote for the laptops.", time: "Yesterday", unread: 0 },
    { initials: "CS", name: "Chikondi Supermarket", snippet: "Order confirmed. Please prepare shipment.", time: "Yesterday", unread: 0 },
]

const PERFORMANCE = [
    { label: "Bids Sent", value: "18", icon: TrendingUp, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Orders Won", value: "4", icon: Star, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
    { label: "Earnings", value: "MK 2.45M", icon: Wallet, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Success Rate", value: "22%", icon: Target, iconBg: "bg-violet-50", iconColor: "text-violet-600" },
]

const ORDER_STATUS_STYLES = {
    "In Progress": "bg-blue-50 text-blue-700",
    Preparing: "bg-amber-50 text-amber-700",
    Delivered: "bg-emerald-50 text-emerald-700",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
}

// ─── Components ───────────────────────────────────────────────────────────────

function SectionCard({ title, actionTo, actionLabel = "View all", children, className }) {
    return (
        <section className={cn("overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200", className)}>
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
                {actionTo ? (
                    <Link to={actionTo} className="text-[13px] font-semibold text-[#0EA432] hover:underline">
                        {actionLabel}
                    </Link>
                ) : null}
            </div>
            {children}
        </section>
    )
}

function KpiCard({ stat }) {
    const Icon = stat.icon
    const content = (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition-all hover:shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", stat.iconBg)}>
                    <Icon className={cn("h-5 w-5", stat.iconColor)} />
                </div>
                {stat.link ? (
                    <span className="text-[11px] font-semibold text-[#0EA432]">View all</span>
                ) : null}
            </div>
            <p className="mt-3 text-[12px] font-medium text-slate-500">{stat.label}</p>
            <p className="mt-0.5 text-[22px] font-extrabold leading-none tabular-nums text-slate-900">
                {stat.value}
            </p>
            {stat.sub ? <p className="mt-1 text-[11px] text-slate-400">{stat.sub}</p> : null}
        </div>
    )

    if (stat.link) {
        return <Link to={stat.link} className="block">{content}</Link>
    }
    return content
}

function RequirementRow({ req }) {
    const Icon = req.Icon
    return (
        <div className="flex flex-col gap-3 border-b border-slate-50 px-5 py-4 last:border-0 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-start gap-3">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", req.iconBg)}>
                    <Icon className={cn("h-5 w-5", req.iconColor)} />
                </div>
                <div className="min-w-0">
                    <h3 className="text-[14px] font-bold text-slate-900">{req.title}</h3>
                    <p className="mt-0.5 text-[12px] text-slate-500">
                        {req.location} | {req.category}
                    </p>
                    <p className="mt-0.5 text-[12px] text-slate-400">{req.quantity}</p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                <p className="text-[12px] font-semibold text-red-500">{req.deadline}</p>
                <Link
                    to="/seller/requirements"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0EA432] px-4 py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#0b8f2b]"
                >
                    View & Bid
                </Link>
            </div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const BidderDashboardPage = () => {
    const { username } = useAuth()
    const displayName = username || "Chikondi"

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 pb-24 md:pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-[28px]">
                    {getGreeting()}, {displayName}! 👋
                </h1>
                <p className="mt-1 text-[14px] text-slate-500">
                    Here&apos;s what&apos;s happening with your business today.
                </p>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {KPI_STATS.map((stat) => (
                    <KpiCard key={stat.label} stat={stat} />
                ))}
            </div>

            {/* Main layout */}
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px]">

                {/* Left column */}
                <div className="space-y-6">
                    <SectionCard title="Latest Requirements" actionTo="/seller/requirements">
                        <div>
                            {LATEST_REQUIREMENTS.map((req) => (
                                <RequirementRow key={req.id} req={req} />
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Active Orders" actionTo="/seller/requirements">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/80">
                                        {["Order ID", "Buyer", "Item", "Value", "Status", "Delivery Date"].map((col) => (
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
                                    {ACTIVE_ORDERS.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50/50">
                                            <td className="px-5 py-3.5 text-[13px] font-semibold text-slate-800">{order.id}</td>
                                            <td className="px-5 py-3.5 text-[13px] text-slate-700">{order.buyer}</td>
                                            <td className="px-5 py-3.5 text-[13px] text-slate-700">{order.item}</td>
                                            <td className="px-5 py-3.5 text-[13px] font-semibold tabular-nums text-slate-800">
                                                MK {order.value.toLocaleString()}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={cn(
                                                    "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                                                    ORDER_STATUS_STYLES[order.status],
                                                )}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-[13px] text-slate-500">{order.deliveryDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>
                </div>

                {/* Right sidebar */}
                <aside className="space-y-5">
                    <SectionCard title="My Bid Status" actionTo="/seller/requirements">
                        <div className="divide-y divide-slate-50 px-5">
                            {BID_STATUS.map((item) => (
                                <div key={item.label} className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-2.5">
                                        <span className={cn("h-2.5 w-2.5 rounded-full", item.dot)} />
                                        <span className="text-[13px] font-medium text-slate-700">{item.label}</span>
                                    </div>
                                    <span className="text-[14px] font-bold tabular-nums text-slate-900">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Recent Messages" actionTo="/seller/messages">
                        <div className="divide-y divide-slate-50">
                            {RECENT_MESSAGES.map((msg) => (
                                <div key={msg.name} className="flex gap-3 px-5 py-3.5">
                                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0EA432]/10 text-[11px] font-bold text-[#0EA432]">
                                        {msg.initials}
                                        {msg.unread > 0 && (
                                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0EA432] text-[9px] font-bold text-white">
                                                {msg.unread}
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="truncate text-[13px] font-semibold text-slate-800">{msg.name}</p>
                                            <span className="shrink-0 text-[11px] text-slate-400">{msg.time}</span>
                                        </div>
                                        <p className="mt-0.5 truncate text-[12px] text-slate-500">{msg.snippet}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-100 px-5 py-3">
                            <Link
                                to="/seller/messages"
                                className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0EA432] hover:underline"
                            >
                                Go to Messages
                                <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </SectionCard>

                    <section className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                        <div className="border-b border-slate-100 px-5 py-4">
                            <h2 className="text-[15px] font-bold text-slate-900">Performance Summary</h2>
                            <p className="mt-0.5 text-[12px] text-slate-400">This month</p>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-slate-100">
                            {PERFORMANCE.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.label} className="bg-white px-4 py-4">
                                        <div className={cn("mb-2 flex h-8 w-8 items-center justify-center rounded-lg", item.iconBg)}>
                                            <Icon className={cn("h-4 w-4", item.iconColor)} />
                                        </div>
                                        <p className="text-[18px] font-extrabold tabular-nums leading-none text-slate-900">
                                            {item.value}
                                        </p>
                                        <p className="mt-1 text-[11px] font-medium text-slate-500">{item.label}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </aside>
            </div>

            {/* Footer */}
            <footer className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                <p className="text-[12px] text-slate-400">© 2025 BidHub Malawi. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <button type="button" className="text-[12px] font-medium text-slate-500 hover:text-[#0EA432]">
                        Help Center
                    </button>
                    <button type="button" className="text-[12px] font-medium text-slate-500 hover:text-[#0EA432]">
                        Contact Us
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default BidderDashboardPage
