import { Link } from "react-router-dom"
import {
    Building2,
    Truck,
    ShoppingBasket,
    Briefcase,
    Sprout,
    Zap,
    HeartPulse,
    Monitor,
    ChevronRight,
    Heart,
    MapPin,
    Star,
    Clock,
    Package,
} from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const categories = [
    { label: "Building", icon: Building2, bg: "bg-orange-50", color: "text-orange-500", to: "/buyer/bids" },
    { label: "Transport", icon: Truck, bg: "bg-blue-50", color: "text-blue-500", to: "/buyer/bids" },
    { label: "Groceries", icon: ShoppingBasket, bg: "bg-green-50", color: "text-green-500", to: "/buyer/bids" },
    { label: "Office", icon: Briefcase, bg: "bg-purple-50", color: "text-purple-500", to: "/buyer/bids" },
    { label: "Agriculture", icon: Sprout, bg: "bg-emerald-50", color: "text-emerald-500", to: "/buyer/bids" },
    { label: "Energy", icon: Zap, bg: "bg-yellow-50", color: "text-yellow-500", to: "/buyer/bids" },
    { label: "Medical", icon: HeartPulse, bg: "bg-red-50", color: "text-red-500", to: "/buyer/bids" },
    { label: "IT & Tech", icon: Monitor, bg: "bg-slate-100", color: "text-slate-500", to: "/buyer/bids" },
]

const latestOffers = [
    {
        id: 1,
        title: "Portland Cement OPC 42.5 — 200 Bags",
        supplier: "Chisomo Hardware",
        location: "Lilongwe",
        price: 850000,
        rating: 4.5,
        reviews: 42,
        isNew: true,
        icon: Building2,
        gradient: "from-orange-100 to-orange-200",
        iconColor: "text-orange-400",
        deliveryDays: 3,
    },
    {
        id: 2,
        title: "Office Chairs — Mesh Back × 10 Units",
        supplier: "Mzuzu Office Co.",
        location: "Mzuzu",
        price: 320000,
        rating: 4.8,
        reviews: 67,
        isNew: true,
        icon: Briefcase,
        gradient: "from-purple-100 to-purple-200",
        iconColor: "text-purple-400",
        deliveryDays: 5,
    },
    {
        id: 3,
        title: "5-Ton Truck — Lilongwe to Blantyre",
        supplier: "Banda Transport",
        location: "Blantyre",
        price: 45000,
        rating: 4.2,
        reviews: 28,
        isNew: false,
        icon: Truck,
        gradient: "from-blue-100 to-blue-200",
        iconColor: "text-blue-400",
        deliveryDays: 1,
    },
    {
        id: 4,
        title: "Maize Flour (Ufa) — 50kg Bags × 100",
        supplier: "Kasungu Millers Ltd",
        location: "Kasungu",
        price: 420000,
        rating: 4.6,
        reviews: 91,
        isNew: true,
        icon: ShoppingBasket,
        gradient: "from-green-100 to-green-200",
        iconColor: "text-green-400",
        deliveryDays: 2,
    },
]

const myPosts = [
    { id: 1, title: "Cement Bags (50kg × 200)", offers: 5, status: "open", category: "Building" },
    { id: 2, title: "Office Chairs × 10", offers: 3, status: "open", category: "Office" },
    { id: 3, title: "Transport — LLW to BT", offers: 8, status: "reviewing", category: "Transport" },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

const OfferCard = ({ offer }) => {
    const Icon = offer.icon
    return (
        <article className="bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm active:scale-[0.98] transition-transform">
            {/* Image area */}
            <div className={`relative h-32 bg-gradient-to-br ${offer.gradient} flex items-center justify-center`}>
                <Icon className={`h-14 w-14 ${offer.iconColor} opacity-50`} />
                <span
                    className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        offer.isNew
                            ? "bg-[#0b4a74] text-white"
                            : "bg-amber-100 text-amber-700"
                    }`}
                >
                    {offer.isNew ? "New" : "Used"}
                </span>
                <button className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Heart className="h-3.5 w-3.5 text-slate-400" />
                </button>
            </div>

            {/* Info */}
            <div className="p-3">
                <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2 min-h-[2.5rem]">
                    {offer.title}
                </p>
                <p className="text-sm font-extrabold text-[#0b4a74] mt-1.5">
                    MWK {offer.price.toLocaleString()}
                </p>
                <div className="mt-1.5 flex items-center gap-1 flex-wrap">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                    <span className="text-[11px] text-slate-500">{offer.rating}</span>
                    <span className="text-slate-300 text-xs">·</span>
                    <MapPin className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
                    <span className="text-[11px] text-slate-500 truncate">{offer.location}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-slate-400">
                    <Clock className="h-2.5 w-2.5 flex-shrink-0" />
                    <span className="text-[10px]">Delivers in {offer.deliveryDays} {offer.deliveryDays === 1 ? "day" : "days"}</span>
                </div>
            </div>
        </article>
    )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const DashboardPage = () => {
    return (
        <div className="max-w-7xl mx-auto">

            {/* ── Hero Banner — full bleed on mobile ── */}
            <div className="relative -mx-4 md:mx-0 md:rounded-2xl overflow-hidden bg-[#0b4a74] px-5 py-7 md:p-8 mb-5">
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute -right-2 bottom-0 h-24 w-24 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute right-20 top-4 h-12 w-12 rounded-full bg-white/8" />

                <div className="relative flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <span className="inline-block bg-white/15 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide mb-2">
                            Free to post
                        </span>
                        <h2 className="text-white text-xl font-extrabold leading-snug md:text-2xl">
                            Post What You Need,<br />
                            Get the Best Price
                        </h2>
                        <p className="text-[#a8d4ef] text-sm mt-1.5 leading-relaxed max-w-xs">
                            Suppliers across Malawi will send you their best offers.
                        </p>
                        <Link to="/buyer/post-requirement">
                            <button className="mt-4 bg-white text-[#0b4a74] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-slate-100 active:scale-95 transition-all shadow-sm">
                                Post Now — It's Free
                            </button>
                        </Link>
                    </div>
                    {/* Visual block (web) */}
                    <div className="hidden sm:flex flex-col items-center justify-center flex-shrink-0">
                        <div className="h-24 w-24 rounded-3xl bg-white/10 flex items-center justify-center">
                            <Package className="h-12 w-12 text-white/80" />
                        </div>
                    </div>
                </div>

                {/* Dot indicators (carousel feel) */}
                <div className="flex gap-1.5 mt-4">
                    <div className="h-1.5 w-5 rounded-full bg-white" />
                    <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
                </div>
            </div>

            {/* ── Main layout: single col mobile, 2-col on lg+ ── */}
            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">

                {/* ── LEFT: main content ── */}
                <div>

                    {/* ── Categories ── */}
                    <section className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-bold text-slate-900">Browse by Category</h2>
                            <Link to="/buyer/bids" className="flex items-center gap-0.5 text-sm font-semibold text-[#0b4a74] hover:underline">
                                See All <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        {/* Mobile: 4-col icon grid */}
                        <div className="grid grid-cols-4 gap-2.5 md:grid-cols-8">
                            {categories.map((cat) => {
                                const Icon = cat.icon
                                return (
                                    <Link key={cat.label} to={cat.to}>
                                        <div className="flex flex-col items-center gap-1.5 group">
                                            <div className={`h-14 w-14 rounded-2xl ${cat.bg} flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm`}>
                                                <Icon className={`h-6 w-6 ${cat.color}`} />
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

                    {/* ── Latest Offers ── */}
                    <section className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-base font-bold text-slate-900">Latest Offers For You</h2>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Suppliers ready to deliver in Malawi
                                </p>
                            </div>
                            <Link
                                to="/buyer/bids"
                                className="flex items-center gap-0.5 text-sm font-semibold text-[#0b4a74] hover:underline flex-shrink-0"
                            >
                                See All <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                            {latestOffers.map((offer) => (
                                <OfferCard key={offer.id} offer={offer} />
                            ))}
                        </div>
                    </section>

                    {/* ── My Active Posts — mobile only (short) ── */}
                    <section className="mb-6 lg:hidden">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-bold text-slate-900">My Active Posts</h2>
                            <Link
                                to="/buyer/my-posts"
                                className="text-sm font-semibold text-[#0b4a74] hover:underline"
                            >
                                See All
                            </Link>
                        </div>
                        <div className="space-y-2.5">
                            {myPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-2xl p-4 ring-1 ring-slate-200 shadow-sm flex items-center justify-between gap-3"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 truncate">{post.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            <span className="font-bold text-[#0b4a74]">{post.offers}</span> offers · {post.category}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span
                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                                                post.status === "open"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-amber-100 text-amber-700"
                                            }`}
                                        >
                                            {post.status}
                                        </span>
                                        <Link to="/buyer/bids">
                                            <ChevronRight className="h-4 w-4 text-slate-400" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ── RIGHT: desktop sidebar ── */}
                <aside className="hidden lg:flex flex-col gap-4 self-start lg:sticky lg:top-4">

                    {/* My Active Posts */}
                    <div className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-sm">My Active Posts</h3>
                            <Link to="/buyer/my-posts" className="text-xs font-semibold text-[#0b4a74] hover:underline">
                                See All
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {myPosts.map((post) => (
                                <div key={post.id} className="flex items-center gap-3 px-4 py-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 leading-snug truncate">
                                            {post.title}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            <span className="font-bold text-[#0b4a74]">{post.offers}</span> offers received
                                        </p>
                                    </div>
                                    <span
                                        className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                            post.status === "open"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-amber-100 text-amber-700"
                                        }`}
                                    >
                                        {post.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="px-4 py-3 border-t border-slate-100">
                            <Link to="/buyer/post-requirement">
                                <button className="w-full flex items-center justify-center gap-1.5 bg-[#0b4a74] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#083754] transition-colors">
                                    + Post New Requirement
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: "My Posts", value: "3" },
                            { label: "Offers", value: "16" },
                            { label: "MWK Saved", value: "1.2M" },
                        ].map((s) => (
                            <div key={s.label} className="bg-white rounded-2xl p-3 text-center ring-1 ring-slate-200 shadow-sm">
                                <p className="text-lg font-extrabold text-[#0b4a74]">{s.value}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* How it works */}
                    <div className="bg-white rounded-2xl p-4 ring-1 ring-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 text-sm mb-3">How BidHub Works</h3>
                        <div className="space-y-3.5">
                            {[
                                { n: "1", t: "Post what you need", d: "Tell us what to buy — we send it to suppliers." },
                                { n: "2", t: "Suppliers send offers", d: "Receive price quotes from verified local sellers." },
                                { n: "3", t: "Pick the best price", d: "Compare and choose who to buy from." },
                            ].map((s) => (
                                <div key={s.n} className="flex gap-3">
                                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-[#0b4a74] flex items-center justify-center">
                                        <span className="text-white text-[11px] font-bold">{s.n}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800 text-xs">{s.t}</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{s.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tip */}
                    <div className="bg-[#0b4a74]/8 rounded-2xl p-4 ring-1 ring-[#0b4a74]/15">
                        <p className="text-[11px] font-bold text-[#0b4a74] uppercase tracking-wide">Tip</p>
                        <p className="mt-1.5 text-sm text-[#0b4a74]/90 leading-relaxed">
                            Add photos and detailed measurements when posting — you will get faster and better offers from suppliers.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default DashboardPage
