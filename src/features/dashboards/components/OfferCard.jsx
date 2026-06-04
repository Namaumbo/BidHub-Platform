import { Star, MapPin, Clock, Heart } from "lucide-react"

export default function OfferCard({ offer }) {
    const { Icon, gradient, iconColor, isNew, title, price, rating, reviews, location, deliveryDays } = offer
    return (
        <article className="bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm active:scale-[0.98] transition-transform">
            {/* Image area */}
            <div className={`relative h-32 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <Icon className={`h-14 w-14 ${iconColor} opacity-50`} />
                <span
                    className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${isNew
                        ? "bg-[#0b4a74] text-white"
                        : "bg-amber-100 text-amber-700"
                        }`}
                >
                    {isNew ? "New" : "Used"}
                </span>
                <button className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Heart className="h-3.5 w-3.5 text-slate-400" />
                </button>
            </div>

            {/* Info */}
            <div className="p-3">
                <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2 min-h-[2.5rem]">
                    {title}
                </p>
                <p className="text-sm font-extrabold text-[#0b4a74] mt-1.5">
                    MWK {price.toLocaleString()}
                </p>
                <div className="mt-1.5 flex items-center gap-1 flex-wrap">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                    <span className="text-[11px] text-slate-500">{rating}</span>
                    <span className="text-slate-300 text-xs">·</span>
                    <MapPin className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
                    <span className="text-[11px] text-slate-500 truncate">{location}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-slate-400">
                    <Clock className="h-2.5 w-2.5 flex-shrink-0" />
                    <span className="text-[10px]">Delivers in {deliveryDays} {deliveryDays === 1 ? "day" : "days"}</span>
                </div>
            </div>
        </article>
    )
}
