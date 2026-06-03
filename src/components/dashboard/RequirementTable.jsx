import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const RequirementTable = () => {
    const myPosts = [
        { id: 1, title: "Cement Bags (50kg × 200)", category: "Building Materials", bids: 5, status: "open", posted: "2 days ago" },
        { id: 2, title: "Office Chairs × 10", category: "Office Supplies", bids: 3, status: "open", posted: "4 days ago" },
        { id: 3, title: "Transport — Lilongwe to Blantyre", category: "Transport", bids: 8, status: "reviewing", posted: "1 week ago" },
    ]

    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900">What You Are Buying</h2>
                <Link to="/buyer/my-posts" className="text-sm font-semibold text-[#0b4a74] hover:underline">
                    See All
                </Link>
            </div>

            <div className="space-y-2.5">
                {myPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl p-4 ring-1 ring-slate-200 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 text-sm leading-snug">
                                    {post.title}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {post.category} · {post.posted}
                                </p>
                            </div>
                            <span
                                className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                                    post.status === "open"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-amber-100 text-amber-700"
                                }`}
                            >
                                {post.status === "open" ? "Open" : "Reviewing"}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm font-bold text-[#0b4a74]">
                                {post.bids} {post.bids === 1 ? "offer" : "offers"} received
                            </span>
                            <Link to="/buyer/bids">
                                <button className="flex items-center gap-1 text-xs font-semibold text-[#0b4a74] bg-[#0b4a74]/10 px-3 py-2 rounded-xl hover:bg-[#0b4a74]/20 active:scale-95 transition-all">
                                    See Offers <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RequirementTable
