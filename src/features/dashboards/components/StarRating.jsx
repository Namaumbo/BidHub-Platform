import { Star } from "lucide-react"
import formatReviewCount from "@/core/utils/fomatReviewCount"

export default function StarRating({ rating, reviews }) {
    return (
        <div className="mt-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1
                const filled = rating >= starValue
                const half = !filled && rating >= starValue - 0.5

                return (
                    <span key={starValue} className="relative h-3.5 w-3.5 shrink-0">
                        <Star className="h-3.5 w-3.5 text-blue-400/35" />
                        <span
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: filled ? "100%" : half ? "50%" : "0%" }}
                        >
                            <Star className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
                        </span>
                    </span>
                )
            })}
            <span className="ml-1 text-[11px] text-slate-400">{formatReviewCount(reviews)}</span>
        </div>
    )
}