import { useState } from "react"
import { Link } from "react-router-dom"
import { Star, MapPin, Clock, Heart, Package } from "lucide-react"
import { cn } from "@/lib/utils"

export default function OfferCard({ offer, to }) {
    const { Icon, gradient, iconColor, isNew, title, price, rating, reviews, location, deliveryDays, image, supplier } = offer
    const [imageFailed, setImageFailed] = useState(false)
    const showImage = image && !imageFailed

    const content = (
        <article className="bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200 transition-all hover:ring-[#0EA432] hover:ring-2 active:scale-[0.98]">
            <div className={cn("relative h-40 flex items-center justify-center", gradient ? `bg-linear-to-br ${gradient}` : "bg-slate-100")}>
                {showImage ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                        onError={() => setImageFailed(true)}
                    />
                ) : Icon ? (
                    <Icon className={cn("h-16 w-16", iconColor || "text-slate-300")} strokeWidth={1.25} />
                ) : (
                    <Package className="h-16 w-16 text-slate-300" strokeWidth={1.25} />
                )}
                {isNew ? (
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0EA432] text-white">
                        New
                    </span>
                ) : null}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 flex items-center justify-center"
                >
                    <Heart className="h-3.5 w-3.5 text-slate-400" />
                </button>
            </div>

            {/* Info */}
            <div className="p-3">
                <p className="text-[15px] font-medium text-slate-800 leading-snug line-clamp-2 min-h-10">
                    {title}
                </p>
                {supplier ? (
                    <p className="mt-1 text-[12px] text-slate-500 truncate">{supplier}</p>
                ) : null}
                <p className="text-[18px] font-bold text-[#0EA432] mt-1.5 leading-none">
                    MWK {Number(price).toLocaleString()}
                </p>
                {rating > 0 ? (
                    <div className="mt-1.5 flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                            />
                        ))}
                        <span className="ml-0.5 text-[11px] text-slate-400">{rating}</span>
                    </div>
                ) : null}
                {/* Delivery + location */}
                {deliveryDays != null ? (
                    <div className="mt-1.5 flex items-center gap-1 text-[12px] text-slate-400">
                        <Clock className="h-3 w-3 shrink-0" />
                        <span>Delivers in {deliveryDays} {deliveryDays === 1 ? "day" : "days"}</span>
                        {location ? (
                            <>
                                <span className="mx-1 text-slate-300">·</span>
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">{location}</span>
                            </>
                        ) : null}
                    </div>
                ) : location ? (
                    <div className="mt-1.5 flex items-center gap-1 text-[12px] text-slate-400">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{location}</span>
                    </div>
                ) : null}
            </div>
        </article>
    )

    if (to) {
        return <Link to={to} className="block">{content}</Link>
    }

    return content
}
