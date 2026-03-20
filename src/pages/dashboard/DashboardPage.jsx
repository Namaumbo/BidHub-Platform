import NewBidsComponent from "@/components/dashboard/NewBidsComponent";
import RequirementTable from "@/components/dashboard/RequirementTable";


const DashboardPage = () => {
    const sellers = [
        { name: "Elena Rodriguez", rating: "4.9 (124 reviews)", badge: "Top conversion" },
        { name: "Marcus Thorne", rating: "5.0 (82 reviews)", badge: "Fast delivery" },
        { name: "Lisa Wang", rating: "4.8 (210 reviews)", badge: "UI specialist" },
    ];

    return (
        <div className="w-full p-4 md:p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-6">
                    <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#0b4a74]/16 via-[#0d5b8f]/12 to-[#1172af]/10 p-6 text-[#0b4a74] ring-1 ring-[#0b4a74]/15 shadow-sm">
                        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#0b4a74]/10" />
                        <div className="pointer-events-none absolute -bottom-20 right-20 h-52 w-52 rounded-full bg-[#0b4a74]/5" />
                        <div className="relative flex flex-col gap-5">
                            <div>
                                <p className="inline-flex items-center rounded-full bg-[#0b4a74]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0b4a74]">
                                    Buyer Workspace
                                </p>
                                <h1 className="mt-3 text-3xl font-bold text-[#0b4a74] md:text-4xl">Welcome back, Alex</h1>
                                <p className="mt-2 max-w-xl text-sm text-[#0b4a74]/85">
                                    Prioritize bids that match your requirements and move faster with AI-assisted recommendations.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <button className="rounded-lg bg-[#0b4a74] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#083754]">
                                    Post New Requirement
                                </button>
                                <button className="rounded-lg border border-[#0b4a74]/25 bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#0b4a74] hover:bg-white">
                                    Open Marketplace
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="rounded-xl bg-white/75 px-4 py-3 ring-1 ring-[#0b4a74]/15 backdrop-blur-sm">
                                    <p className="text-xs text-[#0b4a74]/80">Active Projects</p>
                                    <p className="text-3xl font-extrabold text-[#0b4a74]">3</p>
                                </div>
                                <div className="rounded-xl bg-white px-4 py-3 text-[#0b4a74] ring-1 ring-white/30">
                                    <p className="text-xs font-semibold text-[#0b4a74]">New Bids</p>
                                    <p className="text-3xl font-extrabold text-[#0b4a74]">12</p>
                                    <p className="text-xs text-[#0b4a74]/80">5 need review today</p>
                                </div>
                                <div className="rounded-xl bg-white/75 px-4 py-3 ring-1 ring-[#0b4a74]/15 backdrop-blur-sm">
                                    <p className="text-xs text-[#0b4a74]/80">Total Spent</p>
                                    <p className="text-3xl font-extrabold text-[#0b4a74]">$4.5k</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <RequirementTable />
                    <NewBidsComponent />
                </div>

                <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
                    <section className="rounded-2xl bg-linear-to-br from-[#0b4a74]/10 to-[#0b4a74]/20 p-5 ring-1 ring-[#0b4a74]/20">
                        <p className="inline-flex rounded-full bg-[#0b4a74] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            Quick Win
                        </p>
                        <h3 className="mt-3 text-base font-bold text-[#0b4a74]">Use AI Matching First</h3>
                        <p className="mt-2 text-sm text-[#0b4a74]/90">
                            Sellers with an AI match score above 90% have completed at least 5 projects similar to your
                            "Enterprise UI Kit" requirement.
                        </p>
                        <button className="mt-4 w-full rounded-lg bg-[#0b4a74] px-3 py-2 text-sm font-semibold text-white hover:bg-[#083754]">
                            Prioritize Best Matches
                        </button>
                    </section>

                    <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                            <h3 className="font-semibold text-slate-900">Recommended Sellers</h3>
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                Available now
                            </span>
                        </div>
                        <div className="space-y-3 px-4 py-4">
                            {sellers.map((seller) => (
                                <div key={seller.name} className="rounded-xl border border-slate-100 p-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-slate-800">{seller.name}</p>
                                            <p className="text-xs text-amber-600">{seller.rating}</p>
                                        </div>
                                        <button className="rounded-md bg-[#0b4a74] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#083754]">
                                            Invite
                                        </button>
                                    </div>
                                    <p className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                                        {seller.badge}
                                    </p>
                                </div>
                            ))}
                            <button className="mt-2 w-full rounded-lg border border-[#0b4a74]/20 bg-[#0b4a74]/10 px-3 py-2 text-sm font-semibold text-[#0b4a74] hover:bg-[#0b4a74]/15">
                                Explore Top Sellers
                            </button>
                        </div>
                    </section>

                </aside>



            </div>





        </div>
    );
}
export default DashboardPage;