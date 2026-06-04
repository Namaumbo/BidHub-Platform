import { useState } from "react"
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
    Heart,
    Package,
    Search,
} from "lucide-react"
import StarRating from "@/features/dashboards/components/StarRating"
import OfferCard from "@/features/dashboards/components/OfferCard"

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
        Icon: Building2,
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
        Icon: Briefcase,
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
        Icon: Truck,
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
        Icon: ShoppingBasket,
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

const heroCategories = [
    { label: "Building", to: "/buyer/bids" },
    { label: "Transport", to: "/buyer/bids" },
    { label: "Groceries", to: "/buyer/bids" },
    { label: "Office", to: "/buyer/bids" },
    { label: "Agriculture", to: "/buyer/bids" },
    { label: "Medical", to: "/buyer/bids" },
]

const followerProducts = [
    {
        id: 1,
        title: "Mountain Bike Pro 29\" — Matte Black Limited Edition...",
        image: "/Bike.png",
        price: 450000,
        rating: 4.5,
        reviews: 1200,
    },
    {
        id: 2,
        title: "Iphone 15 Pro Max — 256GB — Matte Black...",
        image: "/iphone.png",
        price: 320000,
        rating: 4.8,
        reviews: 670, 
    },
    {
        id: 3,
        title: "Portland Cement OPC 42.5 — 200 Bags Bulk Pack...",
        image: null,
        icon: Building2,
        price: 850000,
        rating: 4.5,
        reviews: 420,
    },
    {
        id: 4,
        title: "Maize Flour (Ufa) — 50kg Bags × 100 Wholesale...",
        image: null,
        icon: ShoppingBasket,
        price: 420000,
        rating: 4.6,
        reviews: 910,
    },
]

const ProductListingCard = ({ product }) => {
    const [imageFailed, setImageFailed] = useState(false)
    const FallbackIcon = product.icon
    const showImage = product.image && !imageFailed

    return (
        <article className="w-[168px] shrink-0 snap-start sm:w-[180px]">
            <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-[#F2F3F7] p-5">
                {showImage ? (
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                        onError={() => setImageFailed(true)}
                    />
                ) : FallbackIcon ? (
                    <FallbackIcon className="h-20 w-20 text-slate-300" strokeWidth={1.25} />
                ) : (
                    <Package className="h-20 w-20 text-slate-300" strokeWidth={1.25} />
                )}
                <button
                    type="button"
                    aria-label="Add to favourites"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#E4E6EC] shadow-sm transition-colors hover:bg-[#d8dbe3]"
                >
                    <Heart className="h-4 w-4 text-white" strokeWidth={2} />
                </button>
            </div>

            <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-slate-700">
                {product.title}
            </h3>


            <StarRating rating={product.rating} reviews={product.reviews} />

            <p className="mt-2 leading-none">
                <span className="text-lg font-bold text-slate-900">
                    {product.price.toLocaleString()}
                </span>
                <span className="ml-1 text-sm font-medium text-slate-600">MWK</span>
            </p>
        </article>
    )
}


const BuyerDashboardPage = () => {
    return (
        <div className="max-w-7xl mx-auto m-5 mt-8">

            {/* ── Hero — Search Section ── */}
            <section className="mb-8 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-10 text-center">
                <h1 className="text-[26px] font-bold text-slate-900 leading-tight mb-6">
                    Find what you need, fast.
                </h1>

                {/* Search bar — 52px pill */}
                <div className="relative max-w-2xl mx-auto mb-6 flex items-center">
                    <Search className="absolute left-5 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                    <input
                        className="w-full h-[52px] rounded-full border border-slate-200 bg-white pl-12 pr-36 text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f6e56]/25 transition-all"
                        placeholder="Search suppliers, categories, locations..."
                        type="text"
                    />
                    <button className="absolute right-1.5 h-[40px] rounded-full bg-[#0f6e56] px-6 text-[13px] font-bold text-white hover:bg-[#0b5a47] transition-colors">
                        Search
                    </button>
                </div>

                {/* Category quick-link pills — outlined teal */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {heroCategories.map((cat) => (
                        <Link key={cat.label} to={cat.to}>
                            <span className="inline-block rounded-full border border-[#0f6e56] px-4 py-1.5 text-[13px] font-medium text-[#0f6e56] bg-white hover:bg-[#0f6e56] hover:text-white transition-colors cursor-pointer">
                                {cat.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Main layout: single col mobile, 2-col on lg+ ── */}
            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">

                {/* ── LEFT: main content ── */}
                <div>

                    {/* ── Categories ── */}
                    <section className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-[20px] font-medium text-slate-900">Browse by Category</h2>
                            <Link to="/buyer/bids" className="flex items-center gap-0.5 text-[13px] font-semibold text-[#0EA432] hover:underline">
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
                                <h2 className="text-[20px] font-medium text-slate-900">Latest Offers For You</h2>
                                <p className="text-[13px] text-slate-500 mt-0.5">
                                    Suppliers ready to deliver in Malawi
                                </p>
                            </div>
                            <Link
                                to="/buyer/bids"
                                className="flex items-center gap-0.5 text-[13px] font-semibold text-[#0EA432] hover:underline shrink-0"
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
                            <h2 className="text-[20px] font-medium text-slate-900">My Active Posts</h2>
                            <Link
                                to="/buyer/my-posts"
                                className="text-[13px] font-semibold text-[#0EA432] hover:underline"
                            >
                                See All
                            </Link>
                        </div>
                        <div className="space-y-2.5">
                            {myPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-2xl p-4 ring-1 ring-slate-200 flex items-center justify-between gap-3"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[15px] font-medium text-slate-800 truncate">{post.title}</p>
                                        <p className="text-[12px] text-slate-400 mt-0.5">
                                            <span className="font-semibold text-[#0EA432]">{post.offers}</span> offers · {post.category}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span
                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${post.status === "open"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {post.status === "reviewing" ? "Reviewed" : post.status}
                                        </span>
                                        <Link to="/buyer/bids">
                                            <ChevronRight className="h-4 w-4 text-slate-400" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </section>
                    <section className="mb-6 mt-8">
                        <div className="mb-3">
                            <h2 className="text-[20px] font-medium text-slate-900">Followers posts</h2>
                            <p className="mt-0.5 text-[13px] text-slate-500">
                                Your favourites are selling — shop their listings
                            </p>
                        </div>

                        <div
                            className={cn(
                                "flex gap-4 overflow-x-auto pb-2",
                                "snap-x snap-mandatory scroll-smooth",
                                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            )}
                        >
                            {followerProducts.map((product) => (
                                <ProductListingCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* ── RIGHT: desktop sidebar ── */}
                <aside className="hidden lg:flex flex-col gap-4 self-start lg:sticky lg:top-4">

                    {/* My Active Posts */}
                    <div className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                            <h3 className="text-[15px] font-medium text-slate-900">My Active Posts</h3>
                            <Link to="/buyer/my-posts" className="text-[12px] font-semibold text-[#0EA432] hover:underline">
                                See All
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {myPosts.map((post) => (
                                <div key={post.id} className="flex items-center gap-3 px-4 py-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-slate-800 leading-snug truncate">
                                            {post.title}
                                        </p>
                                        <p className="text-[12px] text-slate-400 mt-0.5">
                                            <span className="font-semibold text-[#0EA432]">{post.offers}</span> offers received
                                        </p>
                                    </div>
                                    <span
                                        className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${post.status === "open"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {post.status === "reviewing" ? "Reviewed" : post.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="px-4 py-3 border-t border-slate-100">
                            <Link to="/buyer/post-requirement">
                                <button className="w-full flex items-center justify-center gap-1.5 bg-[#0EA432] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#0b8f2b] transition-colors">
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
                            <div key={s.label} className="bg-white rounded-xl p-3 text-center ring-1 ring-slate-200">
                                <p className="text-[15px] font-bold text-[#0EA432]">{s.value}</p>
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* How BidHub Works */}
                    <div className="bg-white rounded-2xl p-4 ring-1 ring-slate-200">
                        <h3 className="text-[15px] font-medium text-slate-900 mb-4">How BidHub Works</h3>
                        <div>
                            {[
                                { n: "1", t: "Post what you need", d: "Tell us what to buy — we send it to suppliers." },
                                { n: "2", t: "Suppliers send offers", d: "Receive price quotes from verified local sellers." },
                                { n: "3", t: "Pick the best price", d: "Compare and choose who to buy from." },
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

export default BuyerDashboardPage
