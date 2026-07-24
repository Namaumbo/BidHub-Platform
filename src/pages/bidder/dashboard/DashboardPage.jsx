import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    Facebook,
    FileText,
    Gavel,
    Info,
    Laptop,
    Lightbulb,
    Loader2,
    MapPin,
    MessageSquare,
    Package,
    Printer,
    Send,
    ShoppingCart,
    Star,
    Tag,
    Trophy,
    Wallet,
    Hammer,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/** BidHub brand green — same as nav */
const BRAND = "#0f6e56"

// ─── Mock data ────────────────────────────────────────────────────────────────

const KPI_STATS = [
    {
        label: "Open Requests",
        value: "28",
        hint: "New opportunities",
        icon: FileText,
        iconBg: "bg-emerald-50",
        iconColor: "text-[#0f6e56]",
        link: "/seller/requirements",
    },
    {
        label: "Active Bids",
        value: "14",
        hint: "Bids in progress",
        icon: Gavel,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        link: "/seller/my-bids",
    },
    {
        label: "Won Bids",
        value: "6",
        hint: "Awaiting orders",
        icon: Trophy,
        iconBg: "bg-teal-50",
        iconColor: "text-teal-700",
        link: "/seller/orders",
    },
    {
        label: "Pending Payments",
        value: "MWK 1,245,000",
        hint: "From 4 orders",
        icon: Wallet,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-700",
        link: "/seller/orders",
        valueSize: "text-[18px]",
    },
]

const LATEST_REQUIREMENTS = [
    {
        id: "REQ-001",
        title: "Ergonomic office chairs",
        location: "Lilongwe",
        category: "Furniture",
        categoryStyle: "bg-emerald-50 text-[#0f6e56]",
        quantity: "20 units",
        deadline: "20 May 2025",
        daysLeft: 5,
        urgent: true,
        image: "/office.webp",
        Icon: ShoppingCart,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        description:
            "We require high-quality ergonomic office chairs for our new headquarters. Chairs should have adjustable height, lumbar support, and armrests.",
        buyer: { name: "Ministry of Finance", avatar: "MF", rating: 4.8, totalOrders: 156 },
        budget: "MWK 850,000",
        budgetRaw: "850000",
        deliveryLocation: "Ministry of Finance HQ, Capital Hill, Lilongwe",
        postedDate: "10 May 2025",
        specifications: [
            "Ergonomic design with lumbar support",
            "Adjustable height (40-50cm)",
            "360° swivel base",
            "Weight capacity: 120kg minimum",
        ],
        bidsReceived: 8,
    },
    {
        id: "REQ-002",
        title: "Logo & branding design",
        location: "Blantyre",
        category: "Design",
        categoryStyle: "bg-violet-50 text-violet-700",
        quantity: "1 package",
        deadline: "22 May 2025",
        daysLeft: 7,
        urgent: true,
        image: "/brick.jpg",
        Icon: Hammer,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        description: "Full brand identity package including logo, color palette, and brand guidelines for a retail business.",
        buyer: { name: "BuildPro Malawi", avatar: "BP", rating: 4.5, totalOrders: 89 },
        budget: "MWK 350,000",
        deliveryLocation: "Blantyre CBD",
        postedDate: "12 May 2025",
        specifications: ["Logo in vector formats", "Brand guidelines PDF", "Social media kit"],
        bidsReceived: 12,
    },
    {
        id: "REQ-003",
        title: "Supply of Laptops",
        location: "Zomba",
        category: "ICT",
        categoryStyle: "bg-sky-50 text-sky-700",
        quantity: "10 units",
        deadline: "25 May 2025",
        daysLeft: 10,
        urgent: false,
        Icon: Laptop,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
        description: "10 laptops for research department. Intel Core i5, 16GB RAM, 512GB SSD.",
        buyer: { name: "University of Malawi", avatar: "UM", rating: 4.9, totalOrders: 234 },
        budget: "MWK 4,500,000",
        deliveryLocation: "Chancellor College, Zomba Campus",
        postedDate: "15 May 2025",
        specifications: ["Intel Core i5 12th Gen or higher", "16GB DDR4 RAM", "512GB NVMe SSD"],
        bidsReceived: 5,
    },
    {
        id: "REQ-004",
        title: "Printing Services",
        location: "Mzuzu",
        category: "Printing",
        categoryStyle: "bg-slate-100 text-slate-600",
        quantity: "500 copies",
        deadline: "27 May 2025",
        daysLeft: 12,
        urgent: false,
        Icon: Printer,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600",
        description: "Annual report printing — 500 copies of 60-page full-color booklets.",
        buyer: { name: "Mzuzu City Council", avatar: "MC", rating: 4.6, totalOrders: 67 },
        budget: "MWK 480,000",
        deliveryLocation: "City Hall, Mzuzu",
        postedDate: "18 May 2025",
        specifications: ["500 copies, 60 pages each", "Full color printing", "Perfect binding"],
        bidsReceived: 3,
    },
]

const RECENT_ACTIVITY = [
    {
        title: "You won a bid",
        detail: "Office chairs — Lilongwe",
        time: "2h ago",
        icon: Trophy,
        iconBg: "bg-emerald-50",
        iconColor: "text-[#0f6e56]",
    },
    {
        title: "New message received",
        detail: "BuildPro Malawi",
        time: "5h ago",
        icon: MessageSquare,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
    },
    {
        title: "Your bid was submitted",
        detail: "Laptop supply — Zomba",
        time: "1d ago",
        icon: Gavel,
        iconBg: "bg-sky-50",
        iconColor: "text-sky-600",
    },
    {
        title: "Payment received",
        detail: "MWK 320,000",
        time: "2d ago",
        icon: Wallet,
        iconBg: "bg-emerald-50",
        iconColor: "text-[#0f6e56]",
    },
]

// ─── View & Bid Dialog ────────────────────────────────────────────────────────

function ViewBidDialog({ requirement, isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState("details")
    const [bidAmount, setBidAmount] = useState("")
    const [deliveryDays, setDeliveryDays] = useState("")
    const [notes, setNotes] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    if (!isOpen || !requirement) return null

    const Icon = requirement.Icon

    const handleSubmitBid = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setSubmitSuccess(true)
        setTimeout(() => {
            setSubmitSuccess(false)
            setBidAmount("")
            setDeliveryDays("")
            setNotes("")
            onClose()
        }, 2000)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 md:items-center md:p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="relative max-h-[95vh] w-full overflow-hidden rounded-t-2xl bg-white shadow-2xl animate-in slide-in-from-bottom-4 duration-300 md:max-h-[90vh] md:max-w-4xl md:rounded-2xl md:zoom-in-95">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 md:px-6 md:py-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl md:h-10 md:w-10", requirement.iconBg)}>
                            <Icon className={cn("h-4 w-4 md:h-5 md:w-5", requirement.iconColor)} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="truncate text-[15px] font-bold text-slate-900 md:text-[17px]">{requirement.title}</h2>
                            <p className="text-[11px] text-slate-500 md:text-[12px]">
                                {requirement.id} • Posted {requirement.postedDate}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 md:h-9 md:w-9"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex border-b border-slate-100 bg-slate-50/50 px-4 md:px-6">
                    {[
                        { id: "details", label: "Details", fullLabel: "Requirement Details" },
                        { id: "bid", label: "Place Bid", fullLabel: "Submit Bid" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "relative px-3 py-3 text-[13px] font-semibold transition-colors md:px-4",
                                activeTab === tab.id ? "text-[#0f6e56]" : "text-slate-500 hover:text-slate-700",
                            )}
                        >
                            <span className="md:hidden">{tab.label}</span>
                            <span className="hidden md:inline">{tab.fullLabel}</span>
                            {activeTab === tab.id && (
                                <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-[#0f6e56]" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="max-h-[calc(95vh-120px)] overflow-y-auto md:max-h-[calc(90vh-140px)]">
                    {activeTab === "details" ? (
                        <div className="space-y-5 p-4 md:space-y-6 md:p-6">
                            <div className="flex flex-wrap gap-2">
                                <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide", requirement.categoryStyle)}>
                                    {requirement.category}
                                </span>
                                {requirement.urgent && (
                                    <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-red-600">
                                        Urgent
                                    </span>
                                )}
                            </div>

                            {requirement.image ? (
                                <img src={requirement.image} alt={requirement.title} className="h-40 w-full rounded-xl object-cover ring-1 ring-slate-200 md:h-48" />
                            ) : (
                                <div className={cn("flex h-40 w-full items-center justify-center rounded-xl ring-1 ring-slate-200 md:h-48", requirement.iconBg)}>
                                    <Icon className={cn("h-14 w-14 md:h-16 md:w-16", requirement.iconColor)} />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: MapPin, label: "Location", value: requirement.location },
                                    { icon: Package, label: "Quantity", value: requirement.quantity },
                                    { icon: CalendarDays, label: "Deadline", value: requirement.deadline, urgent: requirement.urgent },
                                    { icon: Tag, label: "Budget", value: requirement.budget },
                                ].map((item) => (
                                    <div key={item.label} className="rounded-lg bg-slate-50 p-3">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <item.icon className="h-4 w-4" />
                                            <span className="text-[11px] font-medium uppercase tracking-wide">{item.label}</span>
                                        </div>
                                        <p className={cn("mt-1 text-[13px] font-semibold", item.urgent ? "text-red-600" : "text-slate-800")}>
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h3 className="flex items-center gap-2 text-[14px] font-bold text-slate-900">
                                    <Info className="h-4 w-4 text-slate-400" />
                                    Description
                                </h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{requirement.description}</p>
                            </div>

                            <div className="hidden md:block">
                                <h3 className="flex items-center gap-2 text-[14px] font-bold text-slate-900">
                                    <ClipboardList className="h-4 w-4 text-slate-400" />
                                    Specifications
                                </h3>
                                <ul className="mt-3 space-y-2">
                                    {requirement.specifications?.map((spec) => (
                                        <li key={spec} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6e56]" />
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 md:p-4">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-bold text-white md:h-12 md:w-12 md:text-[14px]" style={{ backgroundColor: BRAND }}>
                                        {requirement.buyer?.avatar}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate text-[13px] font-semibold text-slate-900 md:text-[14px]">{requirement.buyer?.name}</p>
                                            <span className="shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">Verified</span>
                                        </div>
                                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500 md:text-[12px]">
                                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                            {requirement.buyer?.rating}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("bid")}
                                    className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-[14px] font-bold text-white shadow-lg transition-all hover:opacity-90"
                                    style={{ backgroundColor: BRAND }}
                                >
                                    <Send className="h-4 w-4" />
                                    Submit Your Bid
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 md:p-6">
                            {submitSuccess ? (
                                <div className="flex flex-col items-center justify-center py-10 md:py-12">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 md:h-20 md:w-20">
                                        <CheckCircle2 className="h-8 w-8 text-[#0f6e56] md:h-10 md:w-10" />
                                    </div>
                                    <h3 className="mt-4 text-[16px] font-bold text-slate-900 md:text-[18px]">Bid Submitted!</h3>
                                    <p className="mt-2 text-[13px] text-slate-500">Your bid has been sent to the buyer.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitBid} className="space-y-4 md:space-y-5">
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">Your Price (MWK)</label>
                                        <input
                                            type="text"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            placeholder="550000"
                                            required
                                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2"
                                            style={{ ["--tw-ring-color"]: `${BRAND}33` }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">Delivery Time</label>
                                        <input
                                            type="text"
                                            value={deliveryDays}
                                            onChange={(e) => setDeliveryDays(e.target.value)}
                                            placeholder="7 - 10 days"
                                            required
                                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2"
                                            style={{ ["--tw-ring-color"]: `${BRAND}33` }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Note to Buyer <span className="font-normal text-slate-400">(Optional)</span>
                                        </label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="We can deliver high quality chairs within the delivery time."
                                            rows={3}
                                            className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 md:p-4 md:text-[14px]"
                                            style={{ ["--tw-ring-color"]: `${BRAND}33` }}
                                        />
                                    </div>
                                    <div className="hidden rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200 md:block">
                                        <div className="flex gap-3">
                                            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                                            <div className="text-[12px] text-amber-800">
                                                <p className="font-semibold">Important Notice</p>
                                                <p className="mt-1">
                                                    By submitting this bid, you confirm you can deliver as specified.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                                        style={{ backgroundColor: BRAND }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit Bid"
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── UI pieces ────────────────────────────────────────────────────────────────

function KpiCard({ stat }) {
    const Icon = stat.icon
    const content = (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
            <div className="flex items-start gap-3">
                <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", stat.iconBg)}>
                    <Icon className={cn("h-5 w-5", stat.iconColor)} />
                </div>
                <div className="min-w-0">
                    <p className="text-[12px] font-medium text-slate-500">{stat.label}</p>
                    <p className={cn("mt-0.5 font-extrabold leading-tight tabular-nums text-slate-900", stat.valueSize || "text-[22px]")}>
                        {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">{stat.hint}</p>
                </div>
            </div>
        </div>
    )
    return stat.link ? <Link to={stat.link} className="block">{content}</Link> : content
}

function RequestCard({ req, onViewBid }) {
    const Icon = req.Icon
    return (
        <article className="flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:w-[280px]">
            <div className="relative h-36 bg-slate-100">
                {req.image ? (
                    <img src={req.image} alt={req.title} className="h-full w-full object-cover" />
                ) : (
                    <div className={cn("flex h-full w-full items-center justify-center", req.iconBg)}>
                        <Icon className={cn("h-12 w-12", req.iconColor)} />
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[14px] font-bold leading-snug text-slate-900">{req.title}</h3>
                <p className={cn("mt-1.5 inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold", req.categoryStyle)}>
                    {req.category}
                </p>
                <div className="mt-3 space-y-1.5 text-[12px] text-slate-500">
                    <p className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {req.location}
                    </p>
                    <p className="font-semibold text-slate-800">{req.budget}</p>
                    <p>
                        Deadline: {req.deadline}{" "}
                        <span className="font-medium text-[#0f6e56]">({req.daysLeft} days left)</span>
                    </p>
                </div>
                <Button
                    type="button"
                    onClick={() => onViewBid(req)}
                    className="mt-4 w-full rounded-xl py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: BRAND }}
                >
                    View & Bid
                </Button>
            </div>
        </article>
    )
}

function RequestsCarousel({ items, onViewBid }) {
    const scrollerRef = useRef(null)

    const scroll = (dir) => {
        const el = scrollerRef.current
        if (!el) return
        el.scrollBy({ left: dir * 300, behavior: "smooth" })
    }

    return (
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-5">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-slate-900">Recent Buyer Requests</h2>
                <Link to="/seller/requirements" className="text-[13px] font-semibold text-[#0f6e56] hover:underline">
                    View all requests →
                </Link>
            </div>
            <div className="relative">
                <button
                    type="button"
                    aria-label="Previous"
                    onClick={() => scroll(-1)}
                    className="absolute top-1/2 left-0 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 hover:bg-slate-50 lg:flex"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <div
                    ref={scrollerRef}
                    className="flex gap-4 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {items.map((req) => (
                        <RequestCard key={req.id} req={req} onViewBid={onViewBid} />
                    ))}
                </div>
                <button
                    type="button"
                    aria-label="Next"
                    onClick={() => scroll(1)}
                    className="absolute top-1/2 right-0 z-10 hidden h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 hover:bg-slate-50 lg:flex"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </section>
    )
}

function RightSidebar() {
    return (
        <aside className="space-y-4">
            {/* Account verification */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <h2 className="text-[14px] font-bold text-slate-900">Account Verification</h2>
                <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50">
                        <CheckCircle2 className="h-6 w-6 text-[#0f6e56]" />
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-slate-900">Verified Seller</p>
                        <p className="text-[11px] text-slate-400">Your account is fully verified</p>
                    </div>
                </div>
                <Link
                    to="/seller/menu"
                    className="mt-4 flex w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                    View Profile
                </Link>
            </section>

            {/* Recent activity */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <h2 className="text-[14px] font-bold text-slate-900">Recent Activity</h2>
                <ul className="mt-4 space-y-4">
                    {RECENT_ACTIVITY.map((item) => {
                        const Icon = item.icon
                        return (
                            <li key={item.title + item.time} className="flex gap-3">
                                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", item.iconBg)}>
                                    <Icon className={cn("h-4 w-4", item.iconColor)} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[13px] font-semibold text-slate-800">{item.title}</p>
                                    <p className="truncate text-[11px] text-slate-400">{item.detail}</p>
                                </div>
                                <span className="shrink-0 text-[11px] text-slate-400">{item.time}</span>
                            </li>
                        )
                    })}
                </ul>
            </section>

            {/* Quick tip */}
            <section className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
                <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
                        <Lightbulb className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="text-[13px] font-bold text-amber-900">Quick Tip</h2>
                        <p className="mt-1 text-[12px] leading-relaxed text-amber-800/80">
                            Sellers with complete profiles and clear delivery terms win up to 40% more bids. Keep your catalog updated.
                        </p>
                    </div>
                </div>
            </section>
        </aside>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const BidderDashboardPage = () => {
    const [selectedRequirement, setSelectedRequirement] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleViewBid = (req) => {
        setSelectedRequirement(req)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setTimeout(() => setSelectedRequirement(null), 200)
    }

    return (
        <div className="mx-auto max-w-[1400px] space-y-5 px-4 py-5 pb-24 md:space-y-6 md:px-6 md:py-6 md:pb-8 lg:px-8">
            <ViewBidDialog requirement={selectedRequirement} isOpen={isDialogOpen} onClose={handleCloseDialog} />

            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {KPI_STATS.map((stat) => (
                    <KpiCard key={stat.label} stat={stat} />
                ))}
            </div>

            {/* Main + right column */}
            <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
                <div className="space-y-6">
                    <RequestsCarousel items={LATEST_REQUIREMENTS} onViewBid={handleViewBid} />

                    {/* Latest table */}
                    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                            <h2 className="text-[15px] font-bold text-slate-900">Latest Buyer Requests</h2>
                            <Link to="/seller/requirements" className="text-[13px] font-semibold text-[#0f6e56] hover:underline">
                                View all requests →
                            </Link>
                        </div>

                        {/* Mobile cards */}
                        <div className="space-y-3 p-4 md:hidden">
                            {LATEST_REQUIREMENTS.map((req) => (
                                <div key={req.id} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                                    <div className="flex gap-3">
                                        {req.image ? (
                                            <img src={req.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                                        ) : (
                                            <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", req.iconBg)}>
                                                <req.Icon className={cn("h-5 w-5", req.iconColor)} />
                                            </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[13px] font-bold text-slate-900">{req.title}</p>
                                            <p className="text-[11px] text-slate-500">{req.location} · {req.budget}</p>
                                            <p className="text-[11px] text-[#0f6e56]">{req.daysLeft} days left</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleViewBid(req)}
                                        className="mt-3 w-full rounded-xl py-2 text-[12px] font-bold text-white"
                                        style={{ backgroundColor: BRAND }}
                                    >
                                        View & Bid
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Desktop table */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full min-w-[720px] text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/80">
                                        {["Request", "Category", "Location", "Budget", "Deadline", "Action"].map((col) => (
                                            <th key={col} className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {LATEST_REQUIREMENTS.map((req) => {
                                        const Icon = req.Icon
                                        return (
                                            <tr key={req.id} className="hover:bg-slate-50/50">
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        {req.image ? (
                                                            <img src={req.image} alt="" className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200" />
                                                        ) : (
                                                            <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", req.iconBg)}>
                                                                <Icon className={cn("h-5 w-5", req.iconColor)} />
                                                            </div>
                                                        )}
                                                        <span className="text-[13px] font-semibold text-slate-800">{req.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", req.categoryStyle)}>
                                                        {req.category}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-[13px] text-slate-600">{req.location}</td>
                                                <td className="px-5 py-3.5 text-[13px] font-semibold tabular-nums text-slate-800">{req.budget}</td>
                                                <td className="px-5 py-3.5 text-[13px] text-slate-600">
                                                    {req.deadline}{" "}
                                                    <span className="font-medium text-[#0f6e56]">({req.daysLeft} days left)</span>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleViewBid(req)}
                                                        className="rounded-lg px-3.5 py-2 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
                                                        style={{ backgroundColor: BRAND }}
                                                    >
                                                        View & Bid
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                <div className="hidden xl:block">
                    <RightSidebar />
                </div>
            </div>

            {/* Right sidebar on tablet */}
            <div className="xl:hidden">
                <RightSidebar />
            </div>

            {/* Footer */}
            <footer className="hidden items-center justify-between gap-4 border-t border-slate-200 pt-5 md:flex">
                <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden>🇲🇼</span>
                    <p className="text-[12px] text-slate-400">Need help? support@bidhub.mw</p>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                    <a href="#" className="hover:text-[#0f6e56]" aria-label="Facebook">
                        <Facebook className="h-4 w-4" />
                    </a>
                    <a href="#" className="hover:text-[#0f6e56]" aria-label="WhatsApp">
                        <MessageSquare className="h-4 w-4" />
                    </a>
                    <span className="text-[12px]">© 2026 BidHub Malawi</span>
                </div>
            </footer>
        </div>
    )
}

export default BidderDashboardPage
