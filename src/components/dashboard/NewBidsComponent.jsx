import BidCard from "@/features/dashboard/components/BidCard";
import bids from "@/core/data/bids.json";


const NewBidsComponent = () => {
    return (
        <section className="mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">New Bids to Review</h2>
                    <p className="text-sm text-slate-500">Top matches ranked by quality, speed, and price</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                        3 need attention
                    </span>
                    <button className="cursor-pointer rounded-md bg-[#0b4a74] px-4 py-2 text-xs font-semibold text-white hover:bg-[#083754]">
                        View All
                    </button>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                {bids.map((bid, idx) => (
                    <div key={idx} style={{ minWidth: 0 }}>
                            <BidCard bid={bid} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewBidsComponent;