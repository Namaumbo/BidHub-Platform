import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    Building2,
    Truck,
    ShoppingBasket,
    Briefcase,
    Sprout,
    Zap,
    HeartPulse,
    Monitor,
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
    AlertCircle,
} from "lucide-react"

// ── Buyer Requests (what buyers in Malawi need) ───────────────────────────────

const buyerRequests = [
    {
        id: "REQ-001",
        what: "Portland Cement OPC 42.5",
        quantity: "200 Bags",
        buyer: "Dzuka Constructions",
        town: "Lilongwe",
        budget: 3_500_000,
        daysLeft: 5,
        isUrgent: false,
        otherSellers: 7,
        buyerVerified: true,
        buyerRating: 4.7,
        category: "Building",
        Icon: Building2,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        borderColor: "border-orange-200",
    },
    {
        id: "REQ-002",
        what: "Mesh Office Chairs",
        quantity: "10 Chairs",
        buyer: "Capital Bank Ltd",
        town: "Lilongwe",
        budget: 450_000,
        daysLeft: 2,
        isUrgent: true,
        otherSellers: 3,
        buyerVerified: true,
        buyerRating: 4.9,
        category: "Office",
        Icon: Briefcase,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        borderColor: "border-purple-200",
    },
    {
        id: "REQ-003",
        what: "Yellow Maize — 50kg Bags",
        quantity: "100 Bags",
        buyer: "Chikondi Supermarket",
        town: "Blantyre",
        budget: 130_000,
        daysLeft: 7,
        isUrgent: false,
        otherSellers: 12,
        buyerVerified: false,
        buyerRating: 4.2,
        category: "Groceries",
        Icon: ShoppingBasket,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        borderColor: "border-green-200",
    },
    {
        id: "REQ-004",
        what: "Solar Panels 300W",
        quantity: "20 Panels",
        buyer: "Zikomo Farm Ltd",
        town: "Kasungu",
        budget: 780_000,
        daysLeft: 10,
        isUrgent: false,
        otherSellers: 5,
        buyerVerified: true,
        buyerRating: 4.5,
        category: "Energy",
        Icon: Zap,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        borderColor: "border-yellow-200",
    },
    {
        id: "REQ-005",
        what: "Iron Sheets (28 Gauge)",
        quantity: "500 Sheets",
        buyer: "Mwai Hardware",
        town: "Mzuzu",
        budget: 2_200_000,
        daysLeft: 4,
        isUrgent: true,
        otherSellers: 2,
        buyerVerified: true,
        buyerRating: 4.6,
        category: "Building",
        Icon: Building2,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        borderColor: "border-orange-200",
    },
    {
        id: "REQ-006",
        what: "Fertilizer (CAN 23%N)",
        quantity: "200 × 50kg Bags",
        buyer: "Tikondwe Farmers Co-op",
        town: "Dedza",
        budget: 960_000,
        daysLeft: 12,
        isUrgent: false,
        otherSellers: 8,
        buyerVerified: true,
        buyerRating: 4.3,
        category: "Agriculture",
        Icon: Sprout,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        borderColor: "border-emerald-200",
    },
]

const categories = [
    { label: "Building", icon: Building2, bg: "bg-orange-100", color: "text-orange-600", count: 14 },
    { label: "Transport", icon: Truck, bg: "bg-blue-100", color: "text-blue-600", count: 6 },
    { label: "Groceries", icon: ShoppingBasket, bg: "bg-green-100", color: "text-green-600", count: 9 },
    { label: "Office", icon: Briefcase, bg: "bg-purple-100", color: "text-purple-600", count: 5 },
    { label: "Agriculture", icon: Sprout, bg: "bg-emerald-100", color: "text-emerald-600", count: 11 },
    { label: "Energy", icon: Zap, bg: "bg-yellow-100", color: "text-yellow-600", count: 4 },
    { label: "Medical", icon: HeartPulse, bg: "bg-red-100", color: "text-red-600", count: 3 },
    { label: "IT & Tech", icon: Monitor, bg: "bg-slate-100", color: "text-slate-600", count: 7 },
]

const myListings = [
    { id: 1, title: "Cement Bags (50kg × 500)", inquiries: 8, status: "active" },
    { id: 2, title: "Office Desks × 20", inquiries: 3, status: "active" },
    { id: 3, title: "5-Ton Delivery Truck", inquiries: 5, status: "negotiating" },
]

const recentActivity = [
    { icon: Bell, bg: "bg-[#0EA432]/10", color: "text-[#0EA432]", text: "A buyer in Lilongwe needs building materials — matches your listing", time: "2 hours ago" },
    { icon: CircleCheck, bg: "bg-emerald-50", color: "text-emerald-600", text: "Capital Bank confirmed your deal on office chairs", time: "Yesterday" },
    { icon: Star, bg: "bg-amber-50", color: "text-amber-500", text: "Dzuka Constructions gave you 5 stars", time: "2 days ago" },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function competitionLabel(count) {
    if (count <= 3) return { text: "Few sellers — good chance!", color: "text-emerald-600", bg: "bg-emerald-50" }
    if (count <= 8) return { text: "Some competition", color: "text-amber-600", bg: "bg-amber-50" }
    return { text: "Many sellers applied", color: "text-red-600", bg: "bg-red-50" }
}

// ── Request Card ──────────────────────────────────────────────────────────────

function RequestCard({ req }) {
    const comp = competitionLabel(req.otherSellers)
    const Icon = req.Icon
    const closing = req.daysLeft <= 3

    return (
        <article className={cn(
            "bg-white rounded-2xl border-2 overflow-hidden transition-shadow hover:shadow-md",
            closing ? "border-red-200" : req.borderColor
        )}>

            {/* Urgent ribbon */}
            {req.isUrgent && (
                <div className="flex items-center gap-2 bg-red-500 px-4 py-2">
                    <Flame className="h-3.5 w-3.5 text-white shrink-0" />
                    <p className="text-white text-[12px] font-bold">Closing soon — only {req.daysLeft} day{req.daysLeft !== 1 ? "s" : ""} left!</p>
                </div>
            )}

            <div className="p-4">

                {/* Category icon + what they need */}
                <div className="flex items-start gap-3 mb-3">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", req.iconBg)}>
                        <Icon className={cn("h-6 w-6", req.iconColor)} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">{req.category}</p>
                        <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{req.what}</h3>
                        <p className="text-[13px] text-slate-500 mt-0.5">Needs: <span className="font-semibold text-slate-700">{req.quantity}</span></p>
                    </div>
                </div>

                {/* Budget — the most important number, make it BIG */}
                <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-4 py-3 mb-3">
                    <p className="text-[11px] font-semibold text-[#166534] uppercase tracking-wide mb-0.5">They will pay up to</p>
                    <p className="text-[24px] font-extrabold text-[#0EA432] leading-none tabular-nums">
                        MWK {req.budget.toLocaleString()}
                    </p>
                </div>

                {/* Key facts — simple rows */}
                <div className="space-y-2 mb-3">

                    {/* Location */}
                    <div className="flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-[13px] text-slate-700">
                            Located in <span className="font-semibold">{req.town}</span>
                        </span>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-2.5">
                        <Clock className={cn("h-4 w-4 shrink-0", closing ? "text-red-500" : "text-slate-400")} />
                        <span className={cn("text-[13px] font-semibold", closing ? "text-red-600" : "text-slate-700")}>
                            {closing
                                ? `Closes in ${req.daysLeft} day${req.daysLeft !== 1 ? "s" : ""} — send your price now`
                                : `You have ${req.daysLeft} days to send your price`}
                        </span>
                    </div>

                    {/* Buyer */}
                    <div className="flex items-center gap-2.5">
                        {req.buyerVerified
                            ? <BadgeCheck className="h-4 w-4 text-[#0EA432] shrink-0" />
                            : <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                        }
                        <span className="text-[13px] text-slate-700">
                            Buyer: <span className="font-semibold">{req.buyer}</span>
                            {req.buyerVerified && <span className="ml-1 text-[#0EA432] text-[11px] font-bold">(Verified ✓)</span>}
                        </span>
                    </div>

                    {/* Competition */}
                    <div className="flex items-center gap-2.5">
                        <Users className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-[13px] text-slate-700">
                            <span className="font-semibold">{req.otherSellers} other seller{req.otherSellers !== 1 ? "s" : ""}</span> have applied
                        </span>
                        <span className={cn("ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0", comp.bg, comp.color)}>
                            {comp.text}
                        </span>
                    </div>
                </div>

                {/* Action button — big and obvious */}
                <Link to="/seller/requests">
                    <button className={cn(
                        "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-bold transition-all active:scale-[0.98]",
                        closing
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-[#0EA432] hover:bg-[#0b8f2b] text-white"
                    )}>
                        <Send className="h-4 w-4" />
                        Send Your Price
                    </button>
                </Link>
            </div>
        </article>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const BidderDashboardPage = () => {
    const urgentCount = buyerRequests.filter((r) => r.isUrgent).length
    const totalOpen = buyerRequests.length

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

            {/* ── Greeting ── */}
            <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-2xl px-5 py-5">
                <h1 className="text-[22px] font-extrabold text-[#0EA432] leading-snug">
                    Moni! Here is what buyers need today
                </h1>
                <p className="text-[14px] text-slate-600 mt-1">
                    There are <span className="font-bold text-slate-900">{totalOpen} buyer requests</span> open right now.
                    Send your price and win the job.
                </p>

                {/* At-a-glance strip */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-xl p-3 text-center border border-[#d1fae5]">
                        <p className="text-[22px] font-extrabold text-[#0EA432] tabular-nums">{totalOpen}</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-tight">Open Jobs</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-red-100">
                        <p className="text-[22px] font-extrabold text-red-500 tabular-nums">{urgentCount}</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-tight">Closing Soon</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                        <p className="text-[22px] font-extrabold text-slate-800 tabular-nums">16</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-tight">Buyers Viewed You</p>
                    </div>
                </div>
            </div>

            {/* ── Urgent alert ── */}
            {urgentCount > 0 && (
                <div className="flex items-start gap-3 bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3.5">
                    <Flame className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-red-700">
                            {urgentCount} request{urgentCount > 1 ? "s are" : " is"} closing very soon!
                        </p>
                        <p className="text-[12px] text-red-600 mt-0.5">
                            Send your price before time runs out — these are marked in red below.
                        </p>
                    </div>
                </div>
            )}

            {/* ── What type of goods do you sell? ── */}
            <section>
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="text-[17px] font-bold text-slate-900">What do you sell?</h2>
                        <p className="text-[12px] text-slate-500 mt-0.5">Tap a type to see matching buyer requests</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
                    {categories.map((cat) => {
                        const Icon = cat.icon
                        return (
                            <Link key={cat.label} to="/seller/requests">
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className={cn(
                                        "relative h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm",
                                        cat.bg
                                    )}>
                                        <Icon className={cn("h-6 w-6", cat.color)} />
                                        {/* request count badge */}
                                        <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-[#0EA432] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                                            {cat.count}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-semibold text-slate-600 text-center leading-tight">
                                        {cat.label}
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>

            {/* ── Main layout ── */}
            <div className="lg:grid lg:grid-cols-[1fr_290px] lg:gap-6">

                {/* ── LEFT: buyer requests ── */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-[17px] font-bold text-slate-900">Buyers Looking for Sellers</h2>
                            <p className="text-[12px] text-slate-500 mt-0.5">
                                These buyers posted what they need — you can send your price
                            </p>
                        </div>
                        <Link
                            to="/seller/requests"
                            className="flex items-center gap-1 text-[12px] font-bold text-[#0EA432] border border-[#0EA432]/30 bg-[#0EA432]/5 px-3 py-1.5 rounded-full hover:bg-[#0EA432]/10 transition-colors shrink-0"
                        >
                            See All <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {buyerRequests.map((req) => (
                            <RequestCard key={req.id} req={req} />
                        ))}
                    </div>
                </div>

                {/* ── RIGHT sidebar ── */}
                <aside className="mt-6 lg:mt-0 flex flex-col gap-4 self-start lg:sticky lg:top-4">

                    {/* My Listings */}
                    <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                            <h3 className="text-[15px] font-bold text-slate-900">My Listings</h3>
                            <Link to="/seller/my-posts" className="text-[11px] font-bold text-[#0EA432] hover:underline">
                                See All
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {myListings.map((listing) => (
                                <div key={listing.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-semibold text-slate-800 truncate leading-snug">
                                            {listing.title}
                                        </p>
                                        <p className="text-[12px] text-slate-500 mt-0.5">
                                            <span className="font-bold text-[#0EA432]">{listing.inquiries} buyers</span> enquired
                                        </p>
                                    </div>
                                    <span className={cn(
                                        "shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide",
                                        listing.status === "active"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-blue-100 text-blue-700"
                                    )}>
                                        {listing.status === "negotiating" ? "In talks" : "Active"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="px-4 py-3 border-t border-slate-100">
                            <Link to="/seller/sell-requirement">
                                <button className="w-full flex items-center justify-center gap-2 bg-[#0EA432] text-white text-[13px] font-bold py-3 rounded-xl hover:bg-[#0b8f2b] transition-colors">
                                    <Plus className="h-4 w-4" />
                                    Add a New Listing
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* What happened recently */}
                    <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-[15px] font-bold text-slate-900">Recent Updates</h3>
                            <span className="h-2 w-2 rounded-full bg-[#0EA432] animate-pulse" />
                        </div>
                        <div className="divide-y divide-slate-50">
                            {recentActivity.map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <div key={i} className="flex gap-3 px-4 py-3.5">
                                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", item.bg)}>
                                            <Icon className={cn("h-4 w-4", item.color)} />
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

                    {/* New to BidHub? */}
                    <div className="bg-[#f0fdf4] border-2 border-[#d1fae5] rounded-2xl p-4">
                        <h3 className="text-[15px] font-bold text-[#166534] mb-3">How does it work?</h3>
                        <div className="space-y-3">
                            {[
                                { n: "1", title: "List what you sell", body: "Tell buyers what you have — add photos and your price." },
                                { n: "2", title: "Buyer posts a request", body: "When a buyer needs something, they post it here for sellers to see." },
                                { n: "3", title: "You send your price", body: "If you can supply it, tap Send Your Price and the buyer will reply." },
                                { n: "4", title: "Close the deal", body: "Agree on price and delivery, then complete the order." },
                            ].map((step, i, arr) => (
                                <div key={step.n} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="h-7 w-7 rounded-full bg-[#0EA432] flex items-center justify-center shrink-0">
                                            <span className="text-white text-[11px] font-bold">{step.n}</span>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className="w-px flex-1 border-l-2 border-dashed border-[#0EA432]/30 my-1" style={{ minHeight: "20px" }} />
                                        )}
                                    </div>
                                    <div className={i < arr.length - 1 ? "pb-3" : ""}>
                                        <p className="text-[12px] font-bold text-[#166534]">{step.title}</p>
                                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{step.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Support contact */}
                        <div className="mt-4 flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 border border-[#d1fae5]">
                            <Phone className="h-4 w-4 text-[#0EA432] shrink-0" />
                            <div>
                                <p className="text-[11px] font-bold text-slate-800">Need help?</p>
                                <p className="text-[11px] text-slate-500">Call us: <span className="font-semibold">+265 999 000 000</span></p>
                            </div>
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default BidderDashboardPage
