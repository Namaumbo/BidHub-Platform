import { useState } from "react"
import { Link } from "react-router-dom"
import { Building2, Clock, Mail, MapPin, PackageOpen, ShieldCheck, Star, User, X } from "lucide-react"

const orderItems = [
    {
        id: "1",
        name: "Sony PlayStation 5 Pro",
        meta: "Game console • 2 TB • Gray",
        price: 499.99,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=120&h=120&fit=crop",
        supplier: {
            businessName: "TechVault Supplies Ltd",
            contactName: "James Moyo",
            role: "Authorized reseller • Verified supplier",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDegW-SC6u55BUMHPwUHOtMbUqFqSvUwPC7FLwbQlXARRNmdt1nlo9mG4j2RZLUGnDnEd-0P8mEIIKXYYM2D0c3-IJ6-1__YViNsa2o0iZVLts8RL2JYFa_enUcII5vb9Vxg8aGtdMgh-P6z90fAkwnQshII_nX78wUHSqeimimqHUerrKiE6ECPmoOeWJ0AY-QsmCFoxVbSwzziSeGx1M1bc9-Lfr_Aas5AUHIuoafQcKaoKBtVvssM6jalh7BKCMVvUv240PRzVE",
            rating: 4.8,
            reviewsCount: 312,
            location: "Lilongwe, Malawi",
            email: "sales@techvault.mw",
            responseTime: "Usually replies in 2h",
            verified: true,
            yearsOnPlatform: 4,
            completedOrders: 890,
            proposal:
                "Genuine regional stock with manufacturer warranty. We ship insured within 48h and provide tracking plus after-sales support.",
            matchScore: 96,
        },
        images: [
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1621259182978-944fc31d3180?w=400&h=400&fit=crop",
        ],
    },
    {
        id: "2",
        name: "Sony PlayStation Portal Remote Player",
        meta: "Handheld • Graphics 1080p • Black",
        price: 199.99,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=120&h=120&fit=crop",
        supplier: {
            businessName: "GameLink Distributors",
            contactName: "Priya Nkosi",
            role: "Wholesale partner • Top-rated seller",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCDWKdeNfzHX7u-7rzKxrXEwIsd1VW4JxXph8xFiw00eBfvvkS1-usH6l27X8tKMaEIA_3M4dmkISwxcfHWwJE6g8KD9LRZcuR1wA24Z4eJhCQjDYr6Rue4izBXVSWQwWz6Xfsk2f-c1eY6RWNlhbANkyHjDxWh-KqaBoCDIHgv5jWv4LksiIFGE5Am43lSInUoO_rlhmyRDwRHGRnjjXsoTYrS1m8sN1YKfvdPaJCulym1aiMQsUEbOtyK8jmLoLk8e2yGW9csvnM",
            rating: 4.9,
            reviewsCount: 156,
            location: "Blantyre, Malawi",
            email: "orders@gamelink.mw",
            responseTime: "Usually replies in 4h",
            verified: true,
            yearsOnPlatform: 6,
            completedOrders: 1204,
            proposal:
                "Bulk import direct from distributor. All units sealed; we bundle screen protectors for Portal orders at no extra cost this month.",
            matchScore: 91,
        },
        images: [
            "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop",
        ],
    },
]

function formatMoney(n) {
    return n.toLocaleString("en-US", { style: "currency", currency: "MWK" })
}

/** Scrollable strip on small screens; wraps to grid on md+ */
function ProductImageGallery({ images, alt }) {
    if (!images?.length) {
        return (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
                No product images
            </p>
        )
    }

    return (
        <div className="w-full min-w-0">
            {/* Mobile / narrow: horizontal scroll, snap */}
            <div
                className="flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] sm:hidden"
                style={{ scrollbarGutter: "stable" }}
            >
                {images.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        className="w-[min(72vw,280px)] shrink-0 snap-start snap-always"
                    >
                        <img
                            src={src}
                            alt={alt ? `${alt} ${i + 1}` : `Product ${i + 1}`}
                            className="aspect-square w-full rounded-lg object-cover ring-1 ring-slate-200"
                            loading={i === 0 ? "eager" : "lazy"}
                        />
                    </div>
                ))}
            </div>

            {/* sm and up: responsive grid (more columns as width grows) */}
            <ul className="hidden min-w-0 grid-cols-2 gap-2 sm:grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {images.map((src, i) => (
                    <li key={`${src}-${i}`} className="min-w-0">
                        <img
                            src={src}
                            alt={alt ? `${alt} ${i + 1}` : `Product ${i + 1}`}
                            className="aspect-square w-full rounded-lg object-cover ring-1 ring-slate-200"
                            loading={i < 4 ? "eager" : "lazy"}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function SupplierDetailsSection({ supplier, bidPrice }) {
    if (!supplier) {
        return (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-6 text-center text-sm text-slate-500">
                No supplier information for this bid.
            </p>
        )
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                    src={supplier.avatar}
                    alt=""
                    className="mx-auto h-20 w-20 shrink-0 rounded-xl object-cover ring-2 ring-slate-100 sm:mx-0 sm:h-24 sm:w-24"
                />
                <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
                        <h4 className="text-lg font-bold text-slate-900">{supplier.businessName}</h4>
                        {supplier.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                                <ShieldCheck className="h-3 w-3" aria-hidden />
                                Verified
                            </span>
                        )}
                    </div>
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-600 sm:justify-start">
                        <User className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                        {supplier.contactName}
                        <span className="text-slate-400">·</span>
                        {supplier.role}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:justify-start">
                        <span className="inline-flex items-center gap-1 text-amber-600">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                            <span className="font-semibold">{supplier.rating}</span>
                            <span className="text-slate-500">({supplier.reviewsCount} reviews)</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-600">
                            <MapPin className="h-4 w-4 text-slate-400" aria-hidden />
                            {supplier.location}
                        </span>
                    </div>
                    <a
                        href={`mailto:${supplier.email}`}
                        className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#0b4a74] hover:underline sm:justify-start"
                    >
                        <Mail className="h-4 w-4 shrink-0" aria-hidden />
                        {supplier.email}
                    </a>
                    <p className="mt-1 inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 sm:justify-start">
                        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {supplier.responseTime}
                    </p>
                </div>
                <div className="flex w-full flex-col justify-center rounded-xl bg-[#0b4a74]/10 px-4 py-3 sm:w-auto sm:min-w-[160px]">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#0b4a74]">Their bid</p>
                    <p className="text-xl font-extrabold text-[#0b4a74]">{formatMoney(bidPrice)}</p>
                    {supplier.matchScore != null && (
                        <p className="mt-2 text-xs text-slate-600">
                            Match score{" "}
                            <span className="font-bold text-[#0b4a74]">{supplier.matchScore}%</span>
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-center sm:text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">On platform</p>
                    <p className="text-sm font-bold text-slate-900">{supplier.yearsOnPlatform} yrs</p>
                </div>
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-center sm:text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Orders done</p>
                    <p className="text-sm font-bold text-slate-900">{supplier.completedOrders.toLocaleString()}</p>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-2 sm:col-span-1">
                    <Building2 className="h-4 w-4 text-slate-400" aria-hidden />
                    <span className="text-xs font-medium text-slate-700">Registered business</span>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Supplier note</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{supplier.proposal}</p>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                    type="button"
                    className="rounded-lg bg-[#0b4a74] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#083754]"
                >
                    Message supplier
                </button>
                <button
                    type="button"
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                    View supplier profile
                </button>
            </div>
        </div>
    )
}

const BidsPage = () => {
    const [selectedId, setSelectedId] = useState(orderItems[0]?.id ?? null)
    const selected = orderItems.find((item) => item.id === selectedId)

    return (
        <div className="w-full px-4 py-6 md:px-6">
            <div className="mx-auto ">
                <nav className="mb-6 text-sm text-slate-500">
                    <Link to="/dashboard" className="hover:text-[#0b4a74]">
                        Dashboard
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span className="font-semibold text-slate-900">Bids</span>
                </nav>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-0">
                    <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:rounded-r-none lg:border-r-0 md:p-8">
                        <div className="mb-6 flex items-center gap-2">
                            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Bids</h1>
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                {orderItems.length} items
                            </span>
                        </div>

                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3">
                            <ul className="space-y-4">
                                {orderItems.map((item) => {
                                    const isSelected = item.id === selectedId
                                    return (
                                        <li key={item.id} className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedId(item.id)}
                                                className={`flex w-full gap-4 rounded-xl border p-3 pr-10 text-left ring-1 transition-all ${
                                                    isSelected
                                                        ? "border-[#0b4a74] bg-white shadow-md ring-[#0b4a74]/20"
                                                        : "border-slate-100 bg-white ring-slate-100 hover:border-[#0b4a74]/30 hover:shadow-sm"
                                                }`}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-semibold text-slate-900">{item.name}</p>
                                                    <p className="mt-0.5 flex w-fit items-center gap-2 rounded-md bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                                        {item.meta}
                                                    </p>
                                                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                                        <span className="text-xs font-medium text-slate-600">
                                                            Total Price
                                                        </span>
                                                        <p className="font-bold text-slate-900">
                                                            {formatMoney(item.price)}
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-[11px] text-slate-400">
                                                        {item.images?.length ?? 0} photos — tap to view in details
                                                    </p>
                                                    {item.supplier && (
                                                        <p className="mt-1 truncate text-[11px] text-slate-500">
                                                            Supplier: {item.supplier.businessName}
                                                        </p>
                                                    )}
                                                </div>
                                            </button>
                                            <button
                                                type="button"
                                                className="absolute right-2 top-2 z-10 rounded-md p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                                onClick={(e) => e.stopPropagation()}
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="mt-8">
                            <h2 className="mb-3 text-sm font-bold text-slate-900">Recommended for you</h2>
                            <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 sm:flex-row sm:items-center sm:gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=120&h=120&fit=crop"
                                    alt=""
                                    className="mx-auto h-16 w-16 shrink-0 rounded-lg object-cover sm:mx-0"
                                />
                                <div className="min-w-0 flex-1 text-center sm:text-left">
                                    <p className="font-semibold text-slate-900">Sony PlayStation VR2</p>
                                    <p className="mt-1 text-xs text-slate-500">Immersive VR for PS5</p>
                                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                        <span className="text-sm font-bold text-red-600">
                                            {formatMoney(449.99)}
                                        </span>
                                        <span className="text-xs text-slate-400 line-through">
                                            {formatMoney(549.99)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-[#0b4a74]/30 hover:text-[#0b4a74]"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 rounded-xl border border-slate-200 bg-linear-to-b from-[#0b4a74]/6 to-white p-6 shadow-sm ring-1 ring-slate-100 lg:rounded-l-none lg:border-l-0 md:p-8">
                        <div className="border-b border-slate-100 pb-4">
                            <h2 className="text-center text-2xl font-bold text-slate-900">Bid Details</h2>
                            {selected && (
                                <p className="mt-1 text-center text-sm text-slate-500">{selected.name}</p>
                            )}
                        </div>

                        <div className="mt-6 min-w-0 border-b border-slate-100 pb-6">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                                <PackageOpen className="h-7 w-7 shrink-0 text-[#0b4a74]" aria-hidden />
                                Product images
                                {selected && (
                                    <span className="ml-auto text-xs font-normal text-slate-500">
                                        {selected.images?.length ?? 0} total
                                    </span>
                                )}
                            </h3>
                            {selected ? (
                                <ProductImageGallery images={selected.images} alt={selected.name} />
                            ) : (
                                <p className="text-center text-sm text-slate-500">
                                    Select a bid on the left to see images.
                                </p>
                            )}
                        </div>

                        <div className="mt-6 min-w-0 pb-2">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                                <Building2 className="h-7 w-7 shrink-0 text-[#0b4a74]" aria-hidden />
                                Supplier details
                            </h3>
                            {selected ? (
                                <SupplierDetailsSection
                                    supplier={selected.supplier}
                                    bidPrice={selected.price}
                                />
                            ) : (
                                <p className="text-center text-sm text-slate-500">
                                    Select a bid to view the supplier behind this offer.
                                </p>
                            )}
                        </div>

                        <p className="mt-8 text-center text-xs text-slate-400">
                            Powered by Supplier ·{" "}
                            <a href="#" className="underline hover:text-[#0b4a74]">
                                Terms
                            </a>{" "}
                            ·{" "}
                            <a href="#" className="underline hover:text-[#0b4a74]">
                                Privacy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BidsPage
