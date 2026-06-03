import { Clock, MapPin, Star, Heart } from "lucide-react"

const BidCard = ({ bid }) => {
    const amount = Number(bid.proposedsum).toLocaleString()

    return (
        <article className="bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm active:scale-[0.98] transition-transform">
            {/* Image / visual area */}
            <div className="relative h-36 bg-gradient-to-br from-[#0b4a74]/10 to-[#0b4a74]/20 flex items-center justify-center">
                <img
                    alt={bid.fullname}
                    className="h-16 w-16 rounded-2xl object-cover ring-4 ring-white shadow-md"
                    src={bid.profilepic}
                />
                <span className="absolute top-2.5 left-2.5 bg-[#0b4a74] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Verified
                </span>
                <button className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Heart className="h-3.5 w-3.5 text-slate-400" />
                </button>
            </div>

            {/* Info */}
            <div className="p-3">
                <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 min-h-[2.5rem]">
                    {bid.fullname}
                </p>
                <p className="text-base font-extrabold text-[#0b4a74] mt-1.5">
                    MWK {amount}
                </p>

                <div className="mt-1.5 flex items-center gap-1 flex-wrap">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                    <span className="text-[11px] text-slate-600 font-medium">{bid.rating}</span>
                    {bid.location && (
                        <>
                            <span className="text-slate-300 text-xs">·</span>
                            <MapPin className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
                            <span className="text-[11px] text-slate-500">{bid.location}</span>
                        </>
                    )}
                </div>

                <div className="mt-1 flex items-center gap-1 text-slate-400">
                    <Clock className="h-2.5 w-2.5 flex-shrink-0" />
                    <span className="text-[10px]">
                        Delivers in {bid.deliverytime} {bid.deliverytime === 1 ? "day" : "days"}
                    </span>
                </div>

                {bid.summary && (
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {bid.summary}
                    </p>
                )}

                <div className="mt-3 flex gap-2">
                    <button className="flex-1 text-xs font-semibold text-[#0b4a74] border border-[#0b4a74]/30 py-2 rounded-xl hover:bg-[#0b4a74]/5 active:scale-95 transition-all">
                        Message
                    </button>
                    <button className="flex-1 text-xs font-bold text-white bg-[#0b4a74] py-2 rounded-xl hover:bg-[#083754] active:scale-95 transition-all">
                        Accept Offer
                    </button>
                </div>
            </div>
        </article>
    )
}

export default BidCard
