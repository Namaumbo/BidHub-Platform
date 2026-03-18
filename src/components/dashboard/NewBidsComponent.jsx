import BidCard from "@/features/dashboard/components/BidCard";
import bids from "@/core/data/bids.json";


const NewBidsComponent = () => {
    return (
        <>

            <div className="mt-13 mb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">New Bids to Review - Top 3 bids</h2>
                    <button className=" cursor-pointer rounded-md bg-indigo-50 px-4 py-3 text-xs font-semibold text-indigo-600 hover:bg-indigo-100">
                        View All
                    </button>
                </div>
                <div className="flex flex-row gap-4 mt-4 mb-4 items-start"
                >

                    {bids.map((bid, idx) => (
                        <div key={idx} style={{ minWidth: 0 }}>
                            <BidCard bid={bid} />
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default NewBidsComponent;