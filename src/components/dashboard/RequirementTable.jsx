



const RequirementTable = () => {
    const requirements = [
        { title: "Enterprise UI Kit Design", meta: "Posted 2 days ago • 8 Bids", status: "OPEN FOR BIDS", statusClass: "bg-emerald-100 text-emerald-700" },
        { title: "Mobile App Backend Architecture", meta: "Posted 1 week ago • 4 Milestones left", status: "IN PROGRESS", statusClass: "bg-blue-100 text-blue-700" },
        { title: "E-commerce Product Photography", meta: "Posted 3 days ago • 15 Bids", status: "OPEN FOR BIDS", statusClass: "bg-emerald-100 text-emerald-700" },
    ];

    return (
        <div>
            <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">Active Requirements</h2>
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                    {requirements.map((item) => (
                        <div key={item.title} className="flex items-center justify-between gap-3 px-5 py-4">
                            <div>
                                <p className="font-semibold text-slate-800">{item.title}</p>
                                <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.statusClass}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default RequirementTable;