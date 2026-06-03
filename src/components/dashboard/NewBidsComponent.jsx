import BidCard from "@/features/dashboard/components/BidCard"
import bids from "@/core/data/bids.json"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const NewBidsComponent = () => {
    return (
        <section className="pb-4">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h2 className="text-base font-bold text-slate-900">Offers From Suppliers</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Verified sellers ready to supply
                    </p>
                </div>
                <Link
                    to="/buyer/bids"
                    className="flex items-center gap-0.5 text-sm font-semibold text-[#0b4a74] hover:underline flex-shrink-0"
                >
                    See All <ChevronRight className="h-3.5 w-3.5" />
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {bids.map((bid, idx) => (
                    <BidCard key={idx} bid={bid} />
                ))}
            </div>
        </section>
    )
}

export default NewBidsComponent
