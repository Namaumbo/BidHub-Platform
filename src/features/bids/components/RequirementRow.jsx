export default function RequirementRow({ req, onClick }) {
    const awaiting = req.bids.filter((b) => b.status === "awaiting").length
    const remaining = daysLeft(req.deadline)
    const urgent = remaining <= 5
    const lowestBid = req.bids.length > 0
        ? Math.min(...req.bids.map((b) => b.price))
        : null

    return (
        <div
            role="button"

            onClick={onClick}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}
            className="group cursor-pointer border-b border-slate-100 px-5 py-5 transition-colors last:border-0 hover:bg-slate-50/60 md:grid md:items-center md:py-4"
            style={{ gridTemplateColumns: REQ_TABLE_COLS }}
        >
            {/* Requirement info */}
            <div className="flex gap-4 md:col-span-1">
                <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[#f0efec]">
                    <img src={req.thumbnail} alt={req.title} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold uppercase leading-snug tracking-wide text-slate-900 line-clamp-2">
                        {req.title}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500">
                        {req.category} · Posted {req.postedOn}
                    </p>
                    {lowestBid != null && (
                        <p className="mt-0.5 hidden text-[12px] sm:block">
                            Lowest bid <span className="font-semibold text-[#0EA432]">MWK {lowestBid.toLocaleString()}</span>
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onClick() }}
                        className={viewButtonClass}

                    >
                        <GrView className="h-4 w-4" />View bids
                    </button>
                </div>
            </div>

            {/* Mobile meta */}
            <div className="mt-3 flex flex-wrap items-center gap-4 pl-[88px] text-[13px] md:hidden">
                <span className="font-semibold text-slate-900">MWK {req.budget.toLocaleString()}</span>
                <span className="text-slate-600">{req.bids.length} bids</span>
                <span className={cn(urgent && "font-semibold text-amber-600")}>{remaining}d left</span>
            </div>

            {/* Desktop columns */}
            <p className="hidden text-[14px] font-semibold tabular-nums text-slate-900 md:block">
                MWK {req.budget.toLocaleString()}
            </p>
            <div className="hidden flex-col items-center justify-center text-center md:flex">
                <p className={bidsCountClass}>{req.bids.length}</p>
                {awaiting > 0 && (
                    <span className="mt-0.5 block text-[10px] font-normal text-amber-600">{awaiting} pending</span>
                )}
            </div>
            <p className={cn(
                "hidden text-center text-[14px] font-medium md:block",
                urgent ? "font-semibold text-amber-600" : "text-slate-700",
            )}>
                {remaining}d
            </p>
            <div className="hidden items-center justify-end md:flex">
                <ChevronRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-[#0EA432]" />
            </div>
        </div>
    )
}