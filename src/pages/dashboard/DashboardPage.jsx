import BidCard from "@/features/dashboard/components/BidCard";
import bids from "@/core/data/bids.json";


const DashboardPage = () => {
    const requirements = [
        { title: "Enterprise UI Kit Design", meta: "Posted 2 days ago • 8 Bids", status: "OPEN FOR BIDS", statusClass: "bg-emerald-100 text-emerald-700" },
        { title: "Mobile App Backend Architecture", meta: "Posted 1 week ago • 4 Milestones left", status: "IN PROGRESS", statusClass: "bg-blue-100 text-blue-700" },
        { title: "E-commerce Product Photography", meta: "Posted 3 days ago • 15 Bids", status: "OPEN FOR BIDS", statusClass: "bg-emerald-100 text-emerald-700" },
    ];

    const reviewBids = [
        {
            name: "Sarah Miller",
            role: "SR. PRODUCT DESIGNER",
            score: "88%",
            quote: "I've handled similar enterprise kits for Figma and Tailwind. My approach focuses on scalability and design systems.",
            price: "$1,200",
        },
        {
            name: "David Chen",
            role: "FULL STACK AGENCY",
            score: "85%",
            quote: "Our team of 3 can deliver this UI kit within 10 days including a documentation site using Storybook.",
            price: "$2,500",
        },
    ];

    const sellers = [
        { name: "Elena Rodriguez", rating: "4.9 (124 reviews)" },
        { name: "Marcus Thorne", rating: "5.0 (82 reviews)" },
        { name: "Lisa Wang", rating: "4.8 (210 reviews)" },
    ];

    return (
        <div className=" w-full p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Welcome back, Alex</h1>
                                <p className="mt-1 text-sm text-slate-500">Here is what is happening with your projects today.</p>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-lg bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                                    <p className="text-xs text-slate-500">Active Projects</p>
                                    <p className="text-2xl font-bold text-indigo-600">3</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                                    <p className="text-xs text-slate-500">New Bids</p>
                                    <p className="text-2xl font-bold text-indigo-600">12</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                                    <p className="text-xs text-slate-500">Total Spent</p>
                                    <p className="text-2xl font-bold text-indigo-600">$4.5k</p>
                                </div>
                            </div>
                        </div>
                    </section>

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

                <aside className="space-y-4">
                    <section className="rounded-xl bg-indigo-50 p-4 ring-1 ring-indigo-100">
                        <h3 className="text-sm font-bold text-indigo-700">Quick Tip</h3>
                        <p className="mt-2 text-sm text-indigo-800">
                            Sellers with an AI match score above 90% have completed at least 5 projects similar to your
                            "Enterprise UI Kit" requirement.
                        </p>
                    </section>

                    <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                        <div className="border-b border-slate-100 px-4 py-3">
                            <h3 className="font-semibold text-slate-900">Recommended Sellers</h3>
                        </div>
                        <div className="space-y-3 px-4 py-3">
                            {sellers.map((seller) => (
                                <div key={seller.name} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-slate-800">{seller.name}</p>
                                        <p className="text-xs text-amber-600">{seller.rating}</p>
                                    </div>
                                    <button className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100">
                                        View
                                    </button>
                                </div>
                            ))}
                            <button className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                Explore Marketplace
                            </button>
                        </div>
                    </section>

                </aside>

                <div className="mt-8 mb-4">
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

            </div>





        </div>
    );
}
export default DashboardPage;