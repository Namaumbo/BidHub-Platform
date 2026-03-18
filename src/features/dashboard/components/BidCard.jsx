const BidCard = ({ bid }) => {

    console.log(bid);
    return (
        <>
            <div
                class="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <img alt="Seller" class="w-12 h-12 rounded-xl object-cover"
                            src={bid.profilepic} />
                        <div>
                            <h4 class="font-bold text-slate-900">{bid.fullname}</h4>
                            <div class="flex items-center text-amber-500 text-xs font-semibold">
                                <svg class="w-3 h-3 fill-current" viewbox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                <span class="ml-1">{bid.rating} (215 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xl font-bold text-blue-600">${bid.proposedsum}</p>
                        <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Starting At</p>
                    </div>
                </div>
                <p class="text-sm text-slate-600 line-clamp-2 mb-4 italic">
                    {bid.summary}
                </p>
                <div class="flex items-center justify-between border-t border-slate-50 pt-4">
                    <span class="text-xs text-slate-400">Delivery in {bid.deliverytime} days</span>
                    <button class="text-sm font-bold text-blue-600 group-hover:underline">View Proposal</button>
                </div>
            </div>

        </>
    )
}

export default BidCard