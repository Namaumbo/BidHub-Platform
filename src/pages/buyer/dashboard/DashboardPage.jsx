import { Fragment, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    ChevronRight,
    Package,
    Scale,
    ShieldCheck,
    PackagePlus,
    Bell,
    AlertCircle,
    Flame,
    TrendingUp,
    Sparkles,
    Store,
} from "lucide-react"
import useAuthCarousel from "@/features/auth/hooks/useAuthCarousel"
import OfferCard from "@/features/dashboards/components/OfferCard"
import MarketplaceCard, { FlashDealCard } from "@/features/dashboards/components/MarketplaceCard"
import { flashDeals, trendingProducts, marketFilters } from "@/features/dashboards/data/marketplaceCatalog"
import { useAuth } from "@/context/AuthContext"
import { useCategories } from "@/core/hooks/useCategories"
import { useMyInquiries } from "@/core/hooks/useInquiries"
import { useBuyerRequirements } from "@/core/hooks/useBuyerRequirements"
import { mapInquiryToPostCard } from "@/core/mappers/inquiryMapper"
import { getCategoryUi } from "@/core/constants/categoryUi"

const heroSlides = [
    {
        id: "post",
        badge: "Free listing",
        titleLines: ["Post what you need", "Get Free Listing"],
        description: "Tell suppliers exactly what you want — listing is free.",
        cta: "Post requirement",
        ctaTo: "/buyer/post-requirement",
        icon: Package,
        image: "/Bag.png",
    },
    {
        id: "compare",
        badge: "Fast response",
        titleLines: ["Connect Faster,", "Close Better Deals"],
        description: "Reach more suppliers and compare offers side by side.",
        cta: "Compare offers",
        ctaTo: "/buyer/bids",
        icon: Scale,
        image: "/hand.webp",
    },
    {
        id: "verified",
        badge: "Trusted delivery",
        titleLines: ["Find Reliable", "Transport Options"],
        description: "Get better deals with verified local suppliers.",
        cta: "Browse market",
        ctaTo: "/buyer/bids",
        icon: ShieldCheck,
        image: "/car.png",
    },
]

const statusStyles = {
    open: "bg-emerald-100 text-emerald-700",
    reviewing: "bg-blue-100 text-blue-700",
    completed: "bg-slate-100 text-slate-600",
}

function statusLabel(status) {
    if (status === "reviewing") return "Reviewed"
    return status
}

function minDeliveryDays(str) {
    if (!str) return null
    const match = String(str).match(/(\d+)/)
    return match ? parseInt(match[1], 10) : null
}

function SectionHeader({ icon: Icon, title, subtitle, actionTo, actionLabel, accent = "text-[#0EA432]" }) {
    return (
        <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
                {Icon ? (
                    <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0EA432]/10", accent)}>
                        <Icon className="h-4 w-4 text-[#0EA432]" />
                    </div>
                ) : null}
                <div className="min-w-0">
                    <h2 className="text-[17px] font-bold text-slate-900">{title}</h2>
                    {subtitle ? <p className="text-[12px] text-slate-500 mt-0.5">{subtitle}</p> : null}
                </div>
            </div>
            {actionTo ? (
                <Link
                    to={actionTo}
                    className="flex shrink-0 items-center gap-0.5 text-[13px] font-semibold text-[#0EA432] hover:underline"
                >
                    {actionLabel || "See All"} <ChevronRight className="h-3.5 w-3.5" />
                </Link>
            ) : null}
        </div>
    )
}

function PostRow({ post, compact = false }) {
    return (
        <Link
            to="/buyer/bids"
            className={cn(
                "flex items-center gap-3 transition-colors hover:bg-slate-50",
                compact ? "px-4 py-3" : "rounded-2xl bg-white p-4 ring-1 ring-slate-200",
            )}
        >
            <div className="flex-1 min-w-0">
                <p className={cn("font-medium text-slate-800 truncate", compact ? "text-[13px] leading-snug" : "text-[15px]")}>
                    {post.title}
                </p>
                <p className="text-[12px] text-slate-400 mt-0.5">
                    <span className={post.offersCount > 0 ? "font-semibold text-[#0EA432]" : ""}>
                        {post.offersCount}
                    </span>
                    {" "}offer{post.offersCount !== 1 ? "s" : ""}
                    {post.category ? ` · ${post.category}` : ""}
                </p>
            </div>
            <span
                className={cn(
                    "shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                    statusStyles[post.status] || statusStyles.open,
                )}
            >
                {statusLabel(post.status)}
            </span>
            {!compact && <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />}
        </Link>
    )
}

function CategorySkeleton() {
    return (
        <div className="grid grid-cols-4 gap-2.5 md:grid-cols-8">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="h-14 w-14 rounded-2xl bg-slate-100 animate-pulse" />
                    <div className="h-3 w-12 rounded bg-slate-100 animate-pulse" />
                </div>
            ))}
        </div>
    )
}

function OfferCardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200">
            <div className="h-40 bg-slate-100 animate-pulse" />
            <div className="p-3 space-y-2">
                <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
                <div className="h-5 w-24 rounded bg-slate-100 animate-pulse" />
            </div>
        </div>
    )
}

const BuyerDashboardPage = () => {
    const { userId, username } = useAuth()
    const [marketFilter, setMarketFilter] = useState("All")
    const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories()
    const { data: inquiries = [], isLoading: inquiriesLoading, error: inquiriesError } = useMyInquiries(userId)
    const { requirements, isLoading: requirementsLoading } = useBuyerRequirements()

    const categoryMap = useMemo(
        () => Object.fromEntries(categories.map((category) => [category.id, category.name])),
        [categories],
    )

    const myPosts = useMemo(
        () => inquiries.map((inquiry) => mapInquiryToPostCard(inquiry, categoryMap[inquiry.category_id] || "")),
        [inquiries, categoryMap],
    )

    const dashboardStats = useMemo(() => ({
        posts: myPosts.length,
        offers: myPosts.reduce((sum, post) => sum + post.offersCount, 0),
        open: myPosts.filter((post) => post.status === "open").length,
    }), [myPosts])

    const postsWithOffers = useMemo(
        () => myPosts.filter((post) => post.offersCount > 0 && post.status === "open"),
        [myPosts],
    )

    const recentOffers = useMemo(() => {
        const items = []
        for (const req of requirements) {
            for (const bid of req.bids) {
                items.push({
                    id: `${req.id}-${bid.id}`,
                    title: req.title,
                    supplier: bid.supplier.businessName,
                    location: req.raw?.location || "Malawi",
                    price: bid.price,
                    rating: bid.supplier.rating || 0,
                    reviews: bid.supplier.reviewCount || 0,
                    isNew: bid.status === "awaiting",
                    image: bid.thumbnail,
                    deliveryDays: minDeliveryDays(bid.deliveryTime),
                    to: "/buyer/bids",
                })
            }
        }
        return items
            .sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
            .slice(0, 4)
    }, [requirements])

    const filteredTrending = useMemo(() => {
        if (marketFilter === "All") return trendingProducts
        return trendingProducts.filter((p) => p.category === marketFilter)
    }, [marketFilter])

    const { activeSlide, setActiveSlide } = useAuthCarousel(heroSlides.length, 6000)
    const slide = heroSlides[activeSlide]
    const SlideIcon = slide.icon
    const isLoading = inquiriesLoading || requirementsLoading
    const displayName = username?.split("@")[0] || username

    return (
        <div className="max-w-7xl mx-auto m-5 mt-4 p-5 md:mt-6 md:p-0">

            {/* ── Market header strip ── */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Store className="h-5 w-5 text-[#0EA432]" />
                        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                            {displayName ? `Hi ${displayName},` : "Welcome to"} BidHub Market
                        </h1>
                    </div>
                    <p className="mt-1 text-[13px] text-slate-500">
                        Shop local suppliers · Compare prices · Post what you need
                    </p>
                </div>
                <div className="flex shrink-0 gap-2">
                    <Link
                        to="/buyer/bids"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        <Store className="h-4 w-4 text-[#0EA432]" />
                        Browse Market
                    </Link>
                    <Link
                        to="/buyer/post-requirement"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#0EA432] px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#0b8f2b]"
                    >
                        <PackagePlus className="h-4 w-4" />
                        Post Need
                    </Link>
                </div>
            </div>

            {/* ── Personal offers alert (compact) ── */}
            {!isLoading && postsWithOffers.length > 0 && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#0EA432]/25 bg-linear-to-r from-[#0EA432]/10 to-emerald-50 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0EA432] text-white">
                        <Bell className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-[#129a2f]">
                            {dashboardStats.offers} supplier offer{dashboardStats.offers !== 1 ? "s" : ""} on your posts
                        </p>
                        <p className="text-[11px] text-slate-600">Compare quotes and pick the best deal</p>
                    </div>
                    <Link
                        to="/buyer/bids"
                        className="shrink-0 rounded-full bg-[#0EA432] px-3.5 py-1.5 text-[11px] font-bold text-white hover:bg-[#0b8f2b]"
                    >
                        Review
                    </Link>
                </div>
            )}

            {/* ── Hero carousel ── */}
            <div className="relative -mx-4 mb-6 overflow-hidden border border-[#e5f2dd] bg-[#f9fff6] px-5 py-6 md:mx-0 md:rounded-2xl rounded-2xl">
                <div className="pointer-events-none absolute -right-14 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#ebf9e5]" />
                <div className="pointer-events-none absolute right-16 top-8 h-24 w-24 rounded-full bg-[#f1fbe8]" />

                <div className="relative flex items-center justify-between gap-4">
                    <div className="flex-1 min-h-[140px] sm:min-h-[132px]" aria-live="polite" aria-atomic="true">
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
                                <button className="mt-3 rounded-full bg-[#0EA432] px-5 py-2 text-sm font-bold text-white transition-all hover:bg-[#0b8f2b] active:scale-95">
                                    {slide.cta}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex">
                        <div key={slide.id} className="relative flex h-36 w-[200px] items-center justify-center animate-in fade-in duration-500">
                            {slide.image ? (
                                <img src={slide.image} alt={slide.titleLines.join(" ")} className="relative z-10 h-full w-full object-contain" />
                            ) : (
                                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#ddf3d1]">
                                    <SlideIcon className="h-10 w-10 text-[#149330]" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex gap-1.5" role="tablist" aria-label="Hero carousel">
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

            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">

                <div className="space-y-7">

                    {/* ── Flash Deals ── */}
                    <section>
                        <SectionHeader
                            icon={Flame}
                            title="Flash Deals"
                            subtitle="Limited-time prices from verified suppliers"
                            actionTo="/buyer/bids"
                            actionLabel="All deals"
                        />
                        <div
                            className={cn(
                                "flex gap-3 overflow-x-auto pb-1",
                                "snap-x snap-mandatory scroll-smooth",
                                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                            )}
                        >
                            {flashDeals.map((deal) => (
                                <FlashDealCard key={deal.id} product={deal} />
                            ))}
                        </div>
                    </section>

                    {/* ── Categories ── */}
                    <section>
                        <SectionHeader
                            icon={Sparkles}
                            title="Shop by Category"
                            subtitle="Tap a category to explore listings"
                            actionTo="/buyer/bids"
                        />
                        {categoriesLoading ? (
                            <CategorySkeleton />
                        ) : categoriesError ? (
                            <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700 ring-1 ring-amber-200">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                Unable to load categories.
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="grid grid-cols-4 gap-2.5 md:grid-cols-8">
                                {marketFilters.filter((f) => f !== "All").map((label) => {
                                    const ui = getCategoryUi(label)
                                    const Icon = ui.icon
                                    return (
                                        <button
                                            key={label}
                                            type="button"
                                            onClick={() => setMarketFilter(label)}
                                            className="flex flex-col items-center gap-1.5 group"
                                        >
                                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm", ui.bg)}>
                                                <Icon className={cn("h-6 w-6", ui.color)} />
                                            </div>
                                            <span className="text-[11px] font-semibold text-slate-600 text-center leading-tight line-clamp-2">
                                                {label}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 gap-2.5 md:grid-cols-8">
                                {categories.map((cat) => {
                                    const ui = getCategoryUi(cat.name)
                                    const Icon = ui.icon
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setMarketFilter(cat.name)}
                                            className="flex flex-col items-center gap-1.5 group"
                                        >
                                            <div className={cn(
                                                "h-14 w-14 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm",
                                                ui.bg,
                                                marketFilter === cat.name && "ring-2 ring-[#0EA432] ring-offset-1",
                                            )}>
                                                <Icon className={cn("h-6 w-6", ui.color)} />
                                            </div>
                                            <span className="text-[11px] font-semibold text-slate-600 text-center leading-tight line-clamp-2">
                                                {cat.name}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </section>

                    {/* ── Trending Marketplace ── */}
                    <section>
                        <SectionHeader
                            icon={TrendingUp}
                            title="Trending in Malawi"
                            subtitle="Popular listings buyers are shopping right now"
                            actionTo="/buyer/bids"
                        />

                        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {marketFilters.map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setMarketFilter(filter)}
                                    className={cn(
                                        "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors",
                                        marketFilter === filter
                                            ? "bg-[#0EA432] text-white shadow-sm"
                                            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
                                    )}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                            {filteredTrending.map((product) => (
                                <MarketplaceCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredTrending.length === 0 && (
                            <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
                                <p className="text-sm text-slate-500">No listings in this category yet.</p>
                                <button
                                    type="button"
                                    onClick={() => setMarketFilter("All")}
                                    className="mt-2 text-[13px] font-semibold text-[#0EA432] hover:underline"
                                >
                                    View all listings
                                </button>
                            </div>
                        )}
                    </section>

                    {/* ── More to explore (horizontal rail) ── */}
                    <section>
                        <SectionHeader
                            title="More to Explore"
                            subtitle="Electronics, bikes & gadgets from local sellers"
                            actionTo="/buyer/bids"
                        />
                        <div
                            className={cn(
                                "flex gap-4 overflow-x-auto pb-2",
                                "snap-x snap-mandatory scroll-smooth",
                                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                            )}
                        >
                            {trendingProducts.slice(4).map((product) => (
                                <MarketplaceCard key={product.id} product={product} compact />
                            ))}
                        </div>
                    </section>

                    {/* ── Your supplier offers (only when you have them) ── */}
                    {recentOffers.length > 0 && (
                        <section className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                            <SectionHeader
                                icon={Scale}
                                title="Offers on Your Posts"
                                subtitle="Quotes suppliers sent for your requirements"
                                actionTo="/buyer/bids"
                            />
                            {isLoading ? (
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <OfferCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                    {recentOffers.map((offer) => (
                                        <OfferCard key={offer.id} offer={offer} to={offer.to} />
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {/* ── My Active Posts — mobile ── */}
                    <section className="lg:hidden">
                        <SectionHeader
                            title="My Active Posts"
                            subtitle="Requirements you've posted"
                            actionTo="/buyer/my-posts"
                            actionLabel="See All"
                        />
                        {inquiriesLoading ? (
                            <div className="space-y-2.5">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="h-16 rounded-2xl bg-slate-100 animate-pulse" />
                                ))}
                            </div>
                        ) : inquiriesError ? (
                            <div className="rounded-2xl bg-red-50 p-4 text-center text-sm text-red-600 ring-1 ring-red-200">
                                Unable to load your posts.
                            </div>
                        ) : myPosts.length === 0 ? (
                            <div className="rounded-2xl bg-white p-5 text-center ring-1 ring-slate-200">
                                <Package className="mx-auto h-8 w-8 text-slate-300" />
                                <p className="mt-2 text-sm font-medium text-slate-700">No posts yet</p>
                                <Link
                                    to="/buyer/post-requirement"
                                    className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0EA432] hover:underline"
                                >
                                    Post what you need <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {myPosts.slice(0, 3).map((post) => (
                                    <PostRow key={post.id} post={post} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* ── Sidebar ── */}
                <aside className="hidden lg:flex flex-col gap-4 self-start lg:sticky lg:top-4">

                    {/* Live market stats */}
                    <div className="overflow-hidden rounded-2xl bg-linear-to-br from-[#0EA432] to-emerald-700 p-4 text-white shadow-md">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">Live Market</p>
                        <p className="mt-1 text-2xl font-extrabold tabular-nums">{trendingProducts.length + flashDeals.length}+</p>
                        <p className="text-[12px] text-white/90">active listings across Malawi</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="rounded-xl bg-white/15 px-3 py-2">
                                <p className="text-lg font-bold tabular-nums">{dashboardStats.offers}</p>
                                <p className="text-[10px] text-white/80">Your offers</p>
                            </div>
                            <div className="rounded-xl bg-white/15 px-3 py-2">
                                <p className="text-lg font-bold tabular-nums">{dashboardStats.posts}</p>
                                <p className="text-[10px] text-white/80">Your posts</p>
                            </div>
                        </div>
                        <Link
                            to="/buyer/bids"
                            className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-white py-2.5 text-[13px] font-bold text-[#0EA432] hover:bg-white/95"
                        >
                            Explore Market <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                            <h3 className="text-[15px] font-bold text-slate-900">My Active Posts</h3>
                            <Link to="/buyer/my-posts" className="text-[12px] font-semibold text-[#0EA432] hover:underline">
                                See All
                            </Link>
                        </div>
                        {inquiriesLoading ? (
                            <div className="divide-y divide-slate-50">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="px-4 py-3">
                                        <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
                                        <div className="mt-2 h-3 w-20 rounded bg-slate-100 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        ) : myPosts.length === 0 ? (
                            <div className="px-4 py-6 text-center">
                                <Package className="mx-auto h-8 w-8 text-slate-300" />
                                <p className="mt-2 text-[13px] font-medium text-slate-700">No posts yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {myPosts.slice(0, 5).map((post) => (
                                    <PostRow key={post.id} post={post} compact />
                                ))}
                            </div>
                        )}
                        <div className="px-4 py-3 border-t border-slate-100">
                            <Link to="/buyer/post-requirement">
                                <button className="w-full flex items-center justify-center gap-1.5 bg-[#0EA432] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#0b8f2b] transition-colors">
                                    <PackagePlus className="h-4 w-4" />
                                    Post New Requirement
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 ring-1 ring-slate-200">
                        <h3 className="text-[15px] font-bold text-slate-900 mb-4">How BidHub Works</h3>
                        <div>
                            {[
                                { n: "1", t: "Browse or post", d: "Shop the market or tell us what you need." },
                                { n: "2", t: "Get offers", d: "Suppliers compete with their best prices." },
                                { n: "3", t: "Pick & buy", d: "Compare and choose the best deal." },
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
