const BidCard = ({ bid }) => {
    const amount = Number(bid.proposedsum).toLocaleString();
    const matchScore = Math.min(98, Math.round((Number(bid.rating) / 5) * 100 + 8));
    return (
        <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0b4a74]/30 hover:shadow-lg">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <img alt="Seller" className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-100"
                            src={bid.profilepic} />
                    <div>
                        <h4 className="font-bold text-slate-900">{bid.fullname}</h4>
                        <div className="flex items-center text-xs font-semibold text-amber-500">
                            <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                                <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <span className="ml-1">{bid.rating} (215 reviews)</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold text-[#0b4a74]">${amount}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Starting At</p>
                </div>
            </div>
            <div className="mb-4 flex items-center justify-between rounded-lg bg-[#0b4a74]/10 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b4a74]">AI Match Score</p>
                <p className="text-lg font-extrabold text-[#0b4a74]">{matchScore}%</p>
            </div>
            <p className="mb-4 line-clamp-2 text-sm italic text-slate-600">
                {bid.summary}
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-500">Delivery in {bid.deliverytime} days</span>
                <button className="rounded-md bg-[#0b4a74] px-3 py-2 text-sm font-semibold text-white hover:bg-[#083754]">
                    Shortlist Bid
                </button>
            </div>
        </article>
    )
}

export default BidCard