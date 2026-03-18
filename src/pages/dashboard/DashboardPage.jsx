import BidCard from "@/features/dashboard/components/BidCard";
import bids from "@/core/data/bids.json";
import NewBidsComponent from "@/components/dashboard/NewBidsComponent";
import RequirementTable from "@/components/dashboard/RequirementTable";


const DashboardPage = () => {
   

    const sellers = [
        { name: "Elena Rodriguez", rating: "4.9 (124 reviews)" },
        { name: "Marcus Thorne", rating: "5.0 (82 reviews)" },
        { name: "Lisa Wang", rating: "4.8 (210 reviews)" },
    ];

    return (
        <div className=" w-full p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                    <section className="mb-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Welcome back, Alex</h1>
                                <p className="mt-1 text-sm text-slate-500">Here is what is happening with your projects today.</p>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-lg bg-white px-4 py-3 ring-1 ring-slate-200">
                                    <p className="text-xs text-slate-500">Active Projects</p>
                                    <p className="text-2xl font-bold text-indigo-600">3</p>
                                </div>
                                <div className="rounded-lg bg-white px-4 py-3 ring-1 ring-slate-200">
                                    <p className="text-xs text-slate-500">New Bids</p>
                                    <p className="text-2xl font-bold text-indigo-600">12</p>
                                </div>
                                <div className="rounded-lg bg-white px-4 py-3 ring-1 ring-slate-200">
                                    <p className="text-xs text-slate-500">Total Spent</p>
                                    <p className="text-2xl font-bold text-indigo-600">$4.5k</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <RequirementTable />
                    <NewBidsComponent />
                </div>

                <aside className="space-y-4 mt-26">
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



            </div>





        </div>
    );
}
export default DashboardPage;