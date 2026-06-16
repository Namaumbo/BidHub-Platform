import { Fragment } from "react"
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
    ChevronRight,
    Package,
    Scale,
    ShieldCheck,
    MapPin,
    Clock,
    Send,
    Plus,
    TrendingUp,
} from "lucide-react"
import useAuthCarousel from "@/features/auth/hooks/useAuthCarousel"

// ── Data ──────────────────────────────────────────────────────────────────────

const categories = [
    { label: "Building", icon: Building2, bg: "bg-orange-50", color: "text-orange-500", to: "/seller/sell-requirement" },
    { label: "Transport", icon: Truck, bg: "bg-blue-50", color: "text-blue-500", to: "/seller/sell-requirement" },
    { label: "Groceries", icon: ShoppingBasket, bg: "bg-green-50", color: "text-green-500", to: "/seller/sell-requirement" },
    { label: "Office", icon: Briefcase, bg: "bg-purple-50", color: "text-purple-500", to: "/seller/sell-requirement" },
    { label: "Agriculture", icon: Sprout, bg: "bg-emerald-50", color: "text-emerald-500", to: "/seller/sell-requirement" },
    { label: "Energy", icon: Zap, bg: "bg-yellow-50", color: "text-yellow-500", to: "/seller/sell-requirement" },
    { label: "Medical", icon: HeartPulse, bg: "bg-red-50", color: "text-red-500", to: "/seller/sell-requirement" },
    { label: "IT & Tech", icon: Monitor, bg: "bg-slate-100", color: "text-slate-500", to: "/seller/sell-requirement" },
]

const latestRequirements = [
    {
        id: 1,
        title: "Portland Cement OPC 42.5 — 200 Bags",
        buyer: "Dzuka Constructions",
        location: "Lilongwe",
        budget: 3_500_000,
        daysLeft: 5,
        isUrgent: false,
        Icon: Building2,
        gradient: "from-orange-100 to-orange-200",
        iconColor: "text-orange-400",
        bidsCount: 7,
    },
    {
        id: 2,
        title: "Mesh Office Chairs × 10 Units",
        buyer: "Capital Bank Ltd",
        location: "Lilongwe",
        budget: 450_000,
        daysLeft: 3,
        isUrgent: true,
        Icon: Briefcase,
        gradient: "from-purple-100 to-purple-200",
        iconColor: "text-purple-400",
        bidsCount: 3,
    },
    {
        id: 3,
        title: "Yellow Maize 50kg Bags × 100",
        buyer: "Chikondi Supermarket",
        location: "Blantyre",
        budget: 130_000,
        daysLeft: 7,
        isUrgent: false,
        Icon: ShoppingBasket,
        gradient: "from-green-100 to-green-200",
        iconColor: "text-green-400",
        bidsCount: 12,
    },
    {
        id: 4,
        title: "Solar Panels 300W × 20 Units",
        buyer: "Zikomo Farm Ltd",
        location: "Kasungu",
        budget: 780_000,
        daysLeft: 10,
        isUrgent: false,
        Icon: Zap,
        gradient: "from-yellow-100 to-yellow-200",
        iconColor: "text-yellow-500",
        bidsCount: 5,
    },
]

const myListings = [
    { id: 1, title: "Cement Bags (50kg × 500)", inquiries: 8, status: "active", category: "Building" },
    { id: 2, title: "Office Desks × 20", inquiries: 3, status: "active", category: "Office" },
    { id: 3, title: "5-Ton Delivery Truck", inquiries: 5, status: "negotiating", category: "Transport" },
]

const heroSlides = [
    {
        id: "post",
        badge: "Free listing",
        titleLines: ["List What You Sell", "Reach More Buyers"],
        description: "Post your products and services — buyers come directly to you.",
        cta: "Post a Listing",
        ctaTo: "/seller/sell-requirement",
        icon: Package,
        image: "/cement.jpg",
    },
    {
        id: "respond",
        badge: "Live tenders",
        titleLines: ["Browse Open", "Requirements Now"],
        description: "See what buyers need and submit your most competitive bid.",
        cta: "Browse Requirements",
        ctaTo: "/seller/my-posts",
        icon: Scale,
        image: "/hand.webp",
    },
    {
        id: "verified",
        badge: "Trusted platform",
        titleLines: ["Get Verified,", "Close More Deals"],
        description: "Verified sellers get 3× more inquiries from buyers on BidHub.",
        cta: "Learn More",
        ctaTo: "/seller/sell-requirement",
        icon: ShieldCheck,
        image: "/car.png",
    },
]

// ── Requirement Card ──────────────────────────────────────────────────────────

const RequirementCard = ({ req }) => {
    const Icon = req.Icon
    return (
        <article className="bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200 transition-all hover:ring-[#0EA432] hover:ring-2 active:scale-[0.98]">
            <div className={`relative h-32 bg-gradient-to-br ${req.gradient} flex items-center justify-center`}>
                <Icon className={`h-12 w-12 ${req.iconColor}`} strokeWidth={1.25} />
                {req.isUrgent && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
                        Urgent
                    </span>
                )}
                <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-slate-600">
                    {req.bidsCount} bids
                </span>
            </div>

            <div className="p-3">
                <p className="text-[14px] font-semibold text-slate-800 leading-snug line-clamp-2 min-h-[40px]">
                    {req.title}
                </p>
                <p className="text-[17px] font-bold text-[#0EA432] mt-1.5 leading-none">
                    MWK {req.budget.toLocaleString()}
                </p>
                <div className="mt-1.5 flex items-center gap-1 text-[12px] text-slate-400">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{req.location}</span>
                    <span className="mx-1 text-slate-300">·</span>
                    <Clock className="h-3 w-3 shrink-0" />
                    <span>{req.daysLeft}d left</span>
                </div>
                <button className="mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#0EA432]/10 text-[#0EA432] text-[12px] font-bold py-2 hover:bg-[#0EA432] hover:text-white transition-colors">
                    <Send className="h-3 w-3" />
                    Submit Bid
                </button>
            </div>
        </article>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const BidderDashboardPage = () => {
    const { activeSlide, setActiveSlide } = useAuthCarousel(heroSlides.length, 6000)
    const slide = heroSlides[activeSlide]
    const SlideIcon = slide.icon

    return (
        <div className="max-w-7xl mx-auto m-5 mt-8">

            {/* ── Hero Banner carousel ── */}
            <div className="relative -mx-4 mb-6 overflow-hidden border border-[#e5f2dd] bg-[#f9fff6] px-5 py-7 md:mx-0 md:rounded-2xl md:p-8">
                <div className="pointer-events-none absolute -right-14 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#ebf9e5]" />
                <div className="pointer-events-none absolute right-16 top-8 h-24 w-24 rounded-full bg-[#f1fbe8]" />
                <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#f3fee8]" />

                <div className="relative flex items-center justify-between gap-4">
                    <div className="flex-1 min-h-[168px] sm:min-h-[152px]" aria-live="polite" aria-atomic="true">
                        <div key={slide.id} className="animate-in fade-in duration-500">
                            <span className="mb-2 inline-block rounded-full bg-[#e7f8dd] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#149330]">
                                {slide.badge}
                            </span>
                            <h2 className="text-xl font-extrabold leading-snug text-[#129a2f] md:text-2xl">
                                {slide.titleLines.map((line, index) => (
                                    <Fragment key={line}>
                                        {index > 0 && <br />}
                                        {line}
                                    </Fragment>
                                ))}
                            </h2>
                            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate-700">
                                {slide.description}
                            </p>
                            <Link to={slide.ctaTo}>
                                <button className="mt-4 rounded-full bg-[#0EA432] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#0b8f2b] active:scale-95">
                                    {slide.cta}
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden shrink-0 sm:flex">
                        <div key={slide.id} className="relative flex h-44 w-[220px] items-center justify-center animate-in fade-in duration-500">
                            {slide.image ? (
                                <img
                                    src={slide.image}
                                    alt={slide.titleLines.join(" ")}
                                    className="relative z-10 h-full w-full object-contain"
                                />
                            ) : (
                                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#ddf3d1]">
                                    <SlideIcon className="h-12 w-12 text-[#149330]" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex gap-1.5" role="tablist" aria-label="Hero carousel">
                    {heroSlides.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={activeSlide === index}
                            aria-label={`Slide ${index + 1}: ${item.titleLines.join(" ")}`}
                            onClick={() => setActiveSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeSlide === index ? "w-6 bg-[#129a2f]" : "w-2 bg-[#cfd8cb] hover:bg-[#b8c5b2]"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* ── Main layout ── */}
            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">

                {/* ── LEFT ── */}
                <div>

                    {/* ── Categories ── */}
                    <section className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-[20px] font-medium text-slate-900">Browse by Category</h2>
                            <Link to="/seller/sell-requirement" className="flex items-center gap-0.5 text-[13px] font-semibold text-[#0EA432] hover:underline">
                                See All <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
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

                    {/* ── Open Requirements ── */}
                    <section className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-[20px] font-medium text-slate-900">Open Requirements For You</h2>
                                <p className="text-[13px] text-slate-500 mt-0.5">
                                    Buyers in Malawi waiting for your offer
                                </p>
                            </div>
                            <Link
                                to="/seller/my-posts"
                                className="flex items-center gap-0.5 text-[13px] font-semibold text-[#0EA432] hover:underline shrink-0"
                            >
                                See All <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                            {latestRequirements.map((req) => (
                                <RequirementCard key={req.id} req={req} />
                            ))}
                        </div>
                    </section>

                    {/* ── My Active Listings — mobile only ── */}
                    <section className="mb-6 lg:hidden">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-[20px] font-medium text-slate-900">My Active Listings</h2>
                            <Link to="/seller/my-posts" className="text-[13px] font-semibold text-[#0EA432] hover:underline">
                                See All
                            </Link>
                        </div>
                        <div className="space-y-2.5">
                            {myListings.map((listing) => (
                                <div
                                    key={listing.id}
                                    className="bg-white rounded-2xl p-4 ring-1 ring-slate-200 flex items-center justify-between gap-3"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[15px] font-medium text-slate-800 truncate">{listing.title}</p>
                                        <p className="text-[12px] text-slate-400 mt-0.5">
                                            <span className="font-semibold text-[#0EA432]">{listing.inquiries}</span> inquiries · {listing.category}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span
                                            className={cn(
                                                "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide",
                                                listing.status === "active"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-blue-100 text-blue-700"
                                            )}
                                        >
                                            {listing.status === "negotiating" ? "Negotiating" : listing.status}
                                        </span>
                                        <Link to="/seller/my-posts">
                                            <ChevronRight className="h-4 w-4 text-slate-400" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Engagement tip strip ── */}
                    <section className="mb-6 mt-2">
                        <div className="mb-3">
                            <h2 className="text-[20px] font-medium text-slate-900">Boost Your Visibility</h2>
                            <p className="mt-0.5 text-[13px] text-slate-500">
                                Tips to get more inquiries from serious buyers
                            </p>
                        </div>
                        <div className={cn(
                            "flex gap-4 overflow-x-auto pb-2",
                            "snap-x snap-mandatory scroll-smooth",
                            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        )}>
                            {[
                                { icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50", tip: "Add clear photos to your listings — posts with images get 4× more views." },
                                { icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50", tip: "Complete your profile and get verified to build buyer trust instantly." },
                                { icon: Clock, color: "text-amber-500", bg: "bg-amber-50", tip: "Respond to inquiries within 1 hour to increase your acceptance rate." },
                            ].map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <div key={i} className="w-[220px] shrink-0 snap-start rounded-2xl bg-white ring-1 ring-slate-200 p-4">
                                        <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                                            <Icon className={`h-5 w-5 ${item.color}`} />
                                        </div>
                                        <p className="text-[13px] font-medium text-slate-700 leading-relaxed">{item.tip}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>

                {/* ── RIGHT: desktop sidebar ── */}
                <aside className="hidden lg:flex flex-col gap-4 self-start lg:sticky lg:top-4">

                    {/* My Active Listings */}
                    <div className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                            <h3 className="text-[15px] font-medium text-slate-900">My Active Listings</h3>
                            <Link to="/seller/my-posts" className="text-[12px] font-semibold text-[#0EA432] hover:underline">
                                See All
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {myListings.map((listing) => (
                                <div key={listing.id} className="flex items-center gap-3 px-4 py-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-slate-800 leading-snug truncate">
                                            {listing.title}
                                        </p>
                                        <p className="text-[12px] text-slate-400 mt-0.5">
                                            <span className="font-semibold text-[#0EA432]">{listing.inquiries}</span> inquiries received
                                        </p>
                                    </div>
                                    <span
                                        className={cn(
                                            "shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                                            listing.status === "active"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-blue-100 text-blue-700"
                                        )}
                                    >
                                        {listing.status === "negotiating" ? "Negotiating" : listing.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="px-4 py-3 border-t border-slate-100">
                            <Link to="/seller/sell-requirement">
                                <button className="w-full flex items-center justify-center gap-1.5 bg-[#0EA432] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#0b8f2b] transition-colors">
                                    <Plus className="h-4 w-4" />
                                    Post New Listing
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: "Listings", value: "3" },
                            { label: "Inquiries", value: "16" },
                            { label: "MWK Earned", value: "2.4M" },
                        ].map((s) => (
                            <div key={s.label} className="bg-white rounded-xl p-3 text-center ring-1 ring-slate-200">
                                <p className="text-[15px] font-bold text-[#0EA432]">{s.value}</p>
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* How BidHub Works for Sellers */}
                    <div className="bg-white rounded-2xl p-4 ring-1 ring-slate-200">
                        <h3 className="text-[15px] font-medium text-slate-900 mb-4">How BidHub Works</h3>
                        <div>
                            {[
                                { n: "1", t: "Post your product", d: "List what you sell — buyers searching for it will find you." },
                                { n: "2", t: "Buyers contact you", d: "Receive inquiries and quote requests directly from buyers." },
                                { n: "3", t: "Close the deal", d: "Negotiate and finalise with verified buyers on the platform." },
                            ].map((s, i, arr) => (
                                <div key={s.n} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="shrink-0 h-7 w-7 rounded-full bg-[#0EA432] flex items-center justify-center">
                                            <span className="text-white text-[11px] font-bold">{s.n}</span>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className="w-px flex-1 border-l-2 border-dashed border-[#0EA432]/25 my-1" style={{ minHeight: "28px" }} />
                                        )}
                                    </div>
                                    <div className={i < arr.length - 1 ? "pb-4" : ""}>
                                        <p className="text-[13px] font-medium text-slate-800">{s.t}</p>
                                        <p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">{s.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default BidderDashboardPage
