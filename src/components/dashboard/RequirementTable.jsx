



const RequirementTable = () => {
    const requirements = [
        { title: "Enterprise UI Kit Design", meta: "Posted 2 days ago • 8 Bids", status: "OPEN FOR BIDS", statusClass: "bg-emerald-100 text-emerald-700 ring-emerald-200", priority: "High" },
        { title: "Mobile App Backend Architecture", meta: "Posted 1 week ago • 4 Milestones left", status: "IN PROGRESS", statusClass: "bg-[#0b4a74]/10 text-[#0b4a74] ring-[#0b4a74]/25", priority: "Medium" },
        { title: "E-commerce Product Photography", meta: "Posted 3 days ago • 15 Bids", status: "OPEN FOR BIDS", statusClass: "bg-emerald-100 text-emerald-700 ring-emerald-200", priority: "High" },
    ];

    return (
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Active Requirements</h2>
                    <p className="text-xs text-slate-500">Sorted by urgency and response quality</p>
                </div>
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    View All
                </button>
            </div>
            <div className="divide-y divide-slate-100">
                {requirements.map((item) => (
                    <div key={item.title} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-2 w-2 rounded-full ${item.priority === "High" ? "bg-rose-500" : "bg-amber-500"}`}
                                />
                                <p className="truncate font-semibold text-slate-800">{item.title}</p>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`rounded-full px-3 py-1 text-[11px] font-bold ring-1 ${item.statusClass}`}>
                                {item.status}
                            </span>
                            <button className="rounded-lg bg-[#0b4a74] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#083754]">
                                Review
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RequirementTable;