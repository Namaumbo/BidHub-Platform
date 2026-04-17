import {
    BriefcaseBusiness,
    CalendarClock,
    FileCheck2,
    FileSearch,
    MessageSquare,
    Timer,
} from "lucide-react"

const overviewStats = [
    {
        label: "Open Tenders",
        value: "18",
        note: "3 new this week",
        icon: BriefcaseBusiness,
    },
    {
        label: "Submitted Bids",
        value: "41",
        note: "8 awaiting decision",
        icon: FileSearch,
    },
    {
        label: "Shortlisted",
        value: "9",
        note: "2 moved today",
        icon: FileCheck2,
    },
    {
        label: "Unread Messages",
        value: "6",
        note: "2 from procurement teams",
        icon: MessageSquare,
    },
]

const bidStatusRows = [
    { status: "Draft", count: 12 },
    { status: "Submitted", count: 41 },
    { status: "Under Evaluation", count: 14 },
    { status: "Shortlisted", count: 9 },
    { status: "Awarded", count: 4 },
]

const upcomingDeadlines = [
    { title: "Power Grid AMC Tender", due: "Today, 6:00 PM", step: "Final submission" },
    { title: "Public Hospital IT Upgrade", due: "Tomorrow, 11:00 AM", step: "Pricing sheet pending" },
    { title: "City CCTV Maintenance", due: "Apr 19, 4:00 PM", step: "Technical response review" },
]

const activityFeed = [
    { label: "Clarification answered for Metro Rail Electrical Works", time: "12 min ago" },
    { label: "Bid submitted for Smart Campus Fiber Upgrade", time: "1h ago" },
    { label: "Revised BOQ requested by procurement team", time: "3h ago" },
    { label: "NDA approved for State Data Center RFP", time: "Yesterday" },
]

const BidderDashboardPage = () => {
    return (
        <div className="w-full space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bidder Overview</p>
                        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Your Account Snapshot</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Quick view of tender activity, submissions, and account workload.
                        </p>
                    </div>
                    <button className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                        View Full Activity
                    </button>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {overviewStats.map((card) => {
                    const Icon = card.icon
                    return (
                        <article
                            key={card.label}
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-600">{card.label}</p>
                                <span className="rounded-md bg-slate-100 p-2">
                                    <Icon className="h-4 w-4 text-slate-600" />
                                </span>
                            </div>
                            <p className="mt-3 text-2xl font-semibold text-slate-900">{card.value}</p>
                            <p className="mt-1 text-xs text-slate-500">{card.note}</p>
                        </article>
                    )
                })}
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.45fr_1fr]">
                <div className="space-y-6">
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Bid Status Overview</h2>
                                <p className="text-sm text-slate-500">Current count by workflow stage</p>
                            </div>
                        </div>
                        <div className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100">
                            {bidStatusRows.map((row) => (
                                <div key={row.status} className="flex items-center justify-between px-4 py-3">
                                    <p className="text-sm text-slate-700">{row.status}</p>
                                    <p className="text-sm font-semibold text-slate-900">{row.count}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">Team Activity</h2>
                            <button className="rounded-lg bg-[#0b4a74]/10 px-3 py-1.5 text-xs font-semibold text-[#0b4a74] hover:bg-[#0b4a74]/15">
                                Sync Updates
                            </button>
                        </div>
                        <div className="mt-4 space-y-3">
                            {activityFeed.map((activity) => (
                                <div key={activity.label} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-400" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{activity.label}</p>
                                        <p className="text-xs text-slate-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>

                <aside className="space-y-6">
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">Priority Deadlines</h2>
                            <CalendarClock className="h-4 w-4 text-slate-500" />
                        </div>
                        <div className="mt-4 space-y-3">
                            {upcomingDeadlines.map((deadline) => (
                                <div key={deadline.title} className="rounded-xl border border-slate-100 p-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <p className="text-sm font-semibold text-slate-800">{deadline.title}</p>
                                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase text-slate-600">
                                            {deadline.due}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-slate-500">{deadline.step}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">Today</h2>
                            <Timer className="h-4 w-4 text-slate-500" />
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
                                <p className="text-sm font-medium text-slate-800">2 submissions due today</p>
                                <p className="mt-1 text-xs text-slate-500">Focus on final compliance checks first.</p>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
                                <p className="text-sm font-medium text-slate-800">1 message needs response</p>
                                <p className="mt-1 text-xs text-slate-500">Clarification request pending for 3 hours.</p>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
                                <p className="text-sm font-medium text-slate-800">Next review block at 4:00 PM</p>
                                <p className="mt-1 text-xs text-slate-500">Internal bid review with finance team.</p>
                            </div>
                        </div>
                    </article>
                </aside>
            </section>
        </div>
    )
}

export default BidderDashboardPage