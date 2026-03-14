import {
    Bell,
    BriefcaseBusiness,
    ChevronRight,
    ClipboardList,
    FileClock,
    Gavel,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Plus,
    Search,
    ShieldCheck,
    Star,
    Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import DarkerDotsGradient from "@/components/custom/DarkerDotsGradient"
export default function WelcomePage({ username, onLogout }) {
    const buyerTasks = [
        { title: "Review electrical repair bids", due: "Due today", status: "high" },
        { title: "Approve milestone payment - office painting", due: "Due in 2 days", status: "medium" },
        { title: "Finalize shortlist for website redesign", due: "Due in 3 days", status: "low" },
    ]

    const activeProjects = [
        { name: "Warehouse CCTV Setup", progress: 70, vendor: "SecureVision Ltd" },
        { name: "Mobile App UI Refresh", progress: 45, vendor: "PixelCraft Studio" },
        { name: "Office Network Upgrade", progress: 82, vendor: "NetPro Systems" },
    ]

    const latestUpdates = [
        "2 new bids received for Plumbing Installation.",
        "Milestone delivered: Product Catalog Design.",
        "Vendor Q&A updated on Security Guard contract.",
        "Price revision submitted for HVAC maintenance.",
    ]

    return (
        <DarkerDotsGradient>
            <main className=" p-3 md:p-6">
                <section className=" flex w-full overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-lg md:min-h-[calc(100vh-3rem)]">
                    <aside className="hidden w-[230px] flex-col bg-amber-50/70 p-4 lg:flex">
                        <div className="mb-8 flex items-center gap-2 text-slate-800">
                            <ShieldCheck className="size-5 text-amber-500" />
                            <span className="text-lg font-semibold">BidHub Buyer</span>
                        </div>

                        <nav className="space-y-1">
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg bg-amber-400 px-3 py-2 text-left text-sm font-medium text-slate-900">
                                <LayoutDashboard className="size-4" />
                                Dashboard
                            </button>
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-amber-100">
                                <BriefcaseBusiness className="size-4" />
                                My Requirements
                            </button>
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-amber-100">
                                <Gavel className="size-4" />
                                Bids Received
                            </button>
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-amber-100">
                                <MessageSquare className="size-4" />
                                Negotiations
                            </button>
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-amber-100">
                                <Wallet className="size-4" />
                                Payments
                            </button>
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-amber-100">
                                <Star className="size-4" />
                                Reviews
                            </button>
                        </nav>

                        <div className="mt-auto rounded-xl border border-amber-200 bg-white p-3">
                            <p className="text-sm font-semibold text-slate-800">
                                {username ? `Welcome back, ${username}` : "Welcome back"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">Manage sourcing, compare offers, and close better deals.</p>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onLogout}
                                className="mt-3 h-8 w-full justify-start gap-2 border-slate-300"
                            >
                                <LogOut className="size-4" />
                                Logout
                            </Button>
                        </div>
                    </aside>

                    <div className="flex min-w-0 flex-1 flex-col bg-slate-50">
                        <header className="flex flex-col gap-3 border-b border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between md:px-6">
                            <div>
                                <h1 className="text-2xl font-semibold text-slate-900">
                                    {username ? `Welcome Back, ${username}` : "Welcome Back"}
                                </h1>
                                <p className="text-sm text-slate-500">Track bids, projects, and payouts from one place.</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
                                    <Search className="size-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search requirements, bids..."
                                        className="w-44 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                    />
                                </div>
                                <button type="button" className="relative rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50">
                                    <Bell className="size-4" />
                                    <span className="absolute -right-1 -top-1 size-2 rounded-full bg-rose-500" />
                                </button>
                            </div>
                        </header>

                        <div className="grid flex-1 gap-4 p-4 md:p-6 lg:grid-cols-[1.65fr_1fr]">
                            <div className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <article className="rounded-xl bg-slate-900 p-4 text-white">
                                        <p className="text-xs text-slate-300">Open Requirements</p>
                                        <p className="mt-1 text-2xl font-semibold">12</p>
                                        <p className="mt-3 text-xs text-slate-300">3 awaiting buyer decision</p>
                                    </article>
                                    <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                                        <p className="text-xs text-slate-500">New Bids (24h)</p>
                                        <p className="mt-1 text-2xl font-semibold text-slate-900">38</p>
                                        <p className="mt-3 text-xs text-emerald-600">+12% from yesterday</p>
                                    </article>
                                    <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                                        <p className="text-xs text-slate-500">Escrow Balance</p>
                                        <p className="mt-1 text-2xl font-semibold text-slate-900">$14,520</p>
                                        <p className="mt-3 text-xs text-slate-500">Secured for active contracts</p>
                                    </article>
                                </div>

                                <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h2 className="text-sm font-semibold text-slate-900">Buyer Focus</h2>
                                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                            This Week
                                        </span>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        {buyerTasks.map((task) => (
                                            <div key={task.title} className="rounded-lg border border-slate-200 p-3">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <FileClock className="size-4 text-slate-400" />
                                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${task.status === "high"
                                                        ? "bg-rose-100 text-rose-700"
                                                        : task.status === "medium"
                                                            ? "bg-amber-100 text-amber-700"
                                                            : "bg-emerald-100 text-emerald-700"
                                                        }`}>
                                                        {task.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-slate-800">{task.title}</p>
                                                <p className="mt-2 text-xs text-slate-500">{task.due}</p>
                                            </div>
                                        ))}
                                    </div>
                                </article>

                                <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h2 className="text-sm font-semibold text-slate-900">Submitted Projects</h2>
                                        <button type="button" className="text-xs font-medium text-teal-600 hover:text-teal-700">
                                            View all
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {activeProjects.map((project) => (
                                            <div key={project.name} className="rounded-lg border border-slate-200 p-3">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <p className="text-sm font-medium text-slate-800">{project.name}</p>
                                                    <span className="text-xs text-slate-500">{project.progress}%</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-slate-100">
                                                    <div
                                                        className="h-2 rounded-full bg-teal-500"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                                <p className="mt-2 text-xs text-slate-500">Assigned to {project.vendor}</p>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            </div>

                            <aside className="space-y-4">
                                <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                                    <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
                                    <div className="mt-3 grid gap-2">
                                        <Button type="button" className="h-9 justify-between bg-amber-400 text-slate-900 hover:bg-amber-300">
                                            <span className="inline-flex items-center gap-2">
                                                <Plus className="size-4" />
                                                Post New Requirement
                                            </span>
                                            <ChevronRight className="size-4" />
                                        </Button>
                                        <Button type="button" variant="outline" className="h-9 justify-between">
                                            <span className="inline-flex items-center gap-2">
                                                <ClipboardList className="size-4" />
                                                Compare Bid Shortlist
                                            </span>
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    </div>
                                </article>

                                <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                                    <h3 className="text-sm font-semibold text-slate-900">Latest Updates</h3>
                                    <ul className="mt-3 space-y-3">
                                        {latestUpdates.map((update) => (
                                            <li key={update} className="flex gap-2 text-sm text-slate-600">
                                                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-teal-500" />
                                                <span>{update}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>

                                <article className="rounded-xl bg-linear-to-br from-slate-900 via-slate-800 to-teal-900 p-4 text-white shadow-sm">
                                    <p className="text-xs text-teal-200">Buyer Tip</p>
                                    <h3 className="mt-1 text-sm font-semibold">Boost bid quality by clarifying scope.</h3>
                                    <p className="mt-2 text-xs text-slate-200">
                                        Add expected timeline, budget range, and acceptance criteria to receive better offers.
                                    </p>
                                </article>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
        </DarkerDotsGradient>

    )
}
