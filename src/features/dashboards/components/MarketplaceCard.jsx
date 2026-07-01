import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, MapPin, Clock, Package, BadgeCheck, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import StarRating from "@/features/dashboards/components/StarRating"

export default function MarketplaceCard({ product, to = "/buyer/bids", compact = false }) {
    const {
        title,
        image,
        price,
        originalPrice,
        supplier,
        location,
        rating,
        reviews,
        badge,
        badgeStyle,
        deliveryDays,
        soldCount,
        verified,
        Icon,
    } = product

    const [imageFailed, setImageFailed] = useState(false)
    const [saved, setSaved] = useState(false)
    const showImage = image && !imageFailed
    const discount = originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null

    const content = (
        <article
            className={cn(
                "group relative overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-all",
                "hover:-translate-y-0.5 hover:shadow-lg hover:ring-[#0EA432]/40",
                compact ? "w-[168px] shrink-0 snap-start sm:w-[180px]" : "w-full",
            )}
        >
            <div className={cn("relative overflow-hidden bg-[#F2F3F7]", compact ? "aspect-square p-4" : "h-44")}>
                {showImage ? (
                    <img
                        src={image}
                        alt={title}
                        className={cn(
                            "transition-transform duration-300 group-hover:scale-105",
                            compact ? "mx-auto max-h-full max-w-full object-contain" : "h-full w-full object-cover",
                        )}
                        onError={() => setImageFailed(true)}
                    />
                ) : Icon ? (
                    <div className="flex h-full items-center justify-center">
                        <Icon className="h-16 w-16 text-slate-300" strokeWidth={1.25} />
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Package className="h-16 w-16 text-slate-300" strokeWidth={1.25} />
                    </div>
                )}

                {badge ? (
                    <span className={cn("absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold", badgeStyle)}>
                        {badge}
                    </span>
                ) : discount ? (
                    <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        -{discount}%
                    </span>
                ) : null}

                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSaved((v) => !v)
                    }}
                    className={cn(
                        "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors",
                        saved ? "bg-red-50" : "bg-white/90 hover:bg-white",
                    )}
                    aria-label={saved ? "Remove from saved" : "Save listing"}
                >
                    <Heart className={cn("h-4 w-4", saved ? "fill-red-500 text-red-500" : "text-slate-400")} />
                </button>
            </div>

            <div className={cn("p-3", compact && "pb-3.5")}>
                <div className="mb-1 flex items-center gap-1.5">
                    {verified ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#0EA432]">
                            <BadgeCheck className="h-3 w-3" />
                            Verified
                        </span>
                    ) : null}
                    {soldCount ? (
                        <span className="text-[10px] text-slate-400">{soldCount} sold</span>
                    ) : null}
                </div>

                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-800">
                    {title}
                </h3>

                {supplier ? (
                    <p className="mt-1 truncate text-[11px] text-slate-500">{supplier}</p>
                ) : null}

                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-slate-900">
                        {Number(price).toLocaleString()}
                    </span>
                    <span className="text-xs font-medium text-slate-500">MWK</span>
                    {originalPrice && originalPrice > price ? (
                        <span className="text-[11px] text-slate-400 line-through">
                            {Number(originalPrice).toLocaleString()}
                        </span>
                    ) : null}
                </div>

                <StarRating rating={rating} reviews={reviews} />

                {(deliveryDays != null || location) && (
                    <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                        {deliveryDays != null ? (
                            <>
                                <Clock className="h-3 w-3 shrink-0" />
                                <span>{deliveryDays}d delivery</span>
                            </>
                        ) : null}
                        {location ? (
                            <>
                                {deliveryDays != null ? <span className="mx-1 text-slate-300">·</span> : null}
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">{location}</span>
                            </>
                        ) : null}
                    </div>
                )}
            </div>
        </article>
    )

    return <Link to={to} className="block">{content}</Link>
}

export function FlashDealCard({ product, to = "/buyer/bids" }) {
    return (
        <Link
            to={to}
            className="group relative flex w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-linear-to-br from-orange-50 to-red-50 ring-1 ring-orange-200/60 transition-all hover:shadow-md sm:w-[300px]"
        >
            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        <Flame className="h-3 w-3" />
                        {product.badge || "Flash Deal"}
                    </span>
                    <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-slate-900">
                        {product.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-500">{product.supplier}</p>
                </div>
                <div className="mt-3">
                    <p className="text-xl font-extrabold text-[#0EA432]">
                        MWK {Number(product.price).toLocaleString()}
                    </p>
                    {product.originalPrice ? (
                        <p className="text-[11px] text-slate-400 line-through">
                            MWK {Number(product.originalPrice).toLocaleString()}
                        </p>
                    ) : null}
                </div>
            </div>
            <div className="relative w-28 shrink-0 bg-white/50 sm:w-32">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
        </Link>
    )
}
