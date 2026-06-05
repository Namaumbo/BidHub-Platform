import { Star, MapPin, Clock, Heart } from "lucide-react"

export default function OfferCard({ offer }) {
    const { Icon, gradient, iconColor, isNew, title, price, rating, reviews, location, deliveryDays, image } = offer
    return (
        <article className="bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200 transition-all hover:ring-[#0EA432] hover:ring-2 active:scale-[0.98]">
            {/* Image area — 160px */}
            <div className={`relative h-40 bg-linear-to-br ${gradient} flex items-center justify-center`}>
                <img src={image} alt={title} className="h-full w-full object-cover" />
                <span
                    className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${isNew
                        ? "bg-[#0EA432] text-white"
                        : "bg-amber-100 text-amber-700"
                        }`}
                >
                    {isNew ? "New" : "Used"}
                </span>
                <button className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 flex items-center justify-center">
                    <Heart className="h-3.5 w-3.5 text-slate-400" />
                </button>
            </div>

            {/* Info */}
            <div className="p-3">
                <p className="text-[15px] font-medium text-slate-800 leading-snug line-clamp-2 min-h-10">
                    {title}
                </p>
                <p className="text-[18px] font-bold text-[#0EA432] mt-1.5 leading-none">
                    MWK {price.toLocaleString()}
                </p>
                {/* Star rating row */}
                <div className="mt-1.5 flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                        />
                    ))}
                    <span className="ml-0.5 text-[11px] text-slate-400">{rating}</span>
                </div>
                {/* Delivery + location */}
                <div className="mt-1.5 flex items-center gap-1 text-[12px] text-slate-400">
                    <Clock className="h-3 w-3 shrink-0" />
                    <span>Delivers in {deliveryDays} {deliveryDays === 1 ? "day" : "days"}</span>
                    <span className="mx-1 text-slate-300">·</span>
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{location}</span>
                </div>
            </div>
        </article>
    )
}
