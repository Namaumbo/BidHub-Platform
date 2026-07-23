import { useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import {
    AlertCircle,
    Briefcase,
    Building2,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock,
    ClipboardList,
    FileText,
    Hammer,
    Info,
    Laptop,
    Loader2,
    MapPin,
    Package,
    Paperclip,
    Printer,
    Send,
    ShoppingCart,
    Star,
    Tag,
    Target,
    TrendingUp,
    Truck,
    Wallet,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Mock data ────────────────────────────────────────────────────────────────

const KPI_STATS = [
    { label: "Open Requirements", value: 24, icon: FileText, cardBg: "bg-white", iconBg: "bg-emerald-50", iconColor: "text-emerald-600", link: "/seller/requirements" },
    { label: "My Bids", value: 18, icon: ClipboardList, cardBg: "bg-white", iconBg: "bg-blue-50", iconColor: "text-blue-600", link: "/seller/my-bids" },
    { label: "Shortlisted", value: 6, icon: Star, cardBg: "bg-white", iconBg: "bg-amber-50", iconColor: "text-amber-500", link: "/seller/my-bids" },
    { label: "Won Orders", value: 4, icon: Briefcase, cardBg: "bg-white", iconBg: "bg-emerald-50", iconColor: "text-emerald-600", link: "/seller/orders" },
]



const LATEST_REQUIREMENTS = [
    {
        id: "REQ-001",
        title: "Supply of Office Chairs",
        location: "Lilongwe",
        category: "Office Supplies",
        categoryStyle: "bg-blue-50 text-blue-700",
        quantity: "20 units",
        deadline: "20 May 2025",
        urgent: true,
        image: "/office.webp",
        Icon: ShoppingCart,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        description: "We require high-quality ergonomic office chairs for our new headquarters. Chairs should have adjustable height, lumbar support, and armrests. Preferred colors: black or grey. Must meet international ergonomic standards.",
        buyer: { name: "Ministry of Finance", avatar: "MF", rating: 4.8, totalOrders: 156 },
        budget: "MK 800,000 - 1,200,000",
        deliveryLocation: "Ministry of Finance HQ, Capital Hill, Lilongwe",
        postedDate: "10 May 2025",
        specifications: ["Ergonomic design with lumbar support", "Adjustable height (40-50cm)", "360° swivel base", "Weight capacity: 120kg minimum", "5-year warranty required"],
        bidsReceived: 8,
    },
    {
        id: "REQ-002",
        title: "Building Materials (Cement & Bricks)",
        location: "Blantyre",
        category: "Construction",
        categoryStyle: "bg-orange-50 text-orange-700",
        quantity: "As per request",
        deadline: "22 May 2025",
        urgent: true,
        image: "/brick.jpg",
        Icon: Hammer,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        description: "Urgent requirement for building materials for school construction project. We need cement (500 bags of 50kg each) and standard building bricks (50,000 units). Materials must be delivered in batches as per construction schedule.",
        buyer: { name: "BuildPro Malawi", avatar: "BP", rating: 4.5, totalOrders: 89 },
        budget: "MK 2,500,000 - 3,000,000",
        deliveryLocation: "Construction Site, Ndirande, Blantyre",
        postedDate: "12 May 2025",
        specifications: ["Cement: Portland Type I, 50kg bags", "Bricks: Standard red clay, 230x110x75mm", "Phased delivery over 4 weeks", "Quality certificates required", "Must include offloading at site"],
        bidsReceived: 12,
    },
    {
        id: "REQ-003",
        title: "Supply of Laptops",
        location: "Zomba",
        category: "ICT Equipment",
        categoryStyle: "bg-violet-50 text-violet-700",
        quantity: "10 units",
        deadline: "25 May 2025",
        urgent: false,
        Icon: Laptop,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
        description: "We need 10 laptops for our research department. Minimum specifications: Intel Core i5 or equivalent, 16GB RAM, 512GB SSD, 14-inch display. Brand preference: Dell, HP, or Lenovo. Must include 2-year warranty.",
        buyer: { name: "University of Malawi", avatar: "UM", rating: 4.9, totalOrders: 234 },
        budget: "MK 4,000,000 - 5,000,000",
        deliveryLocation: "Chancellor College, Zomba Campus",
        postedDate: "15 May 2025",
        specifications: ["Intel Core i5 12th Gen or higher", "16GB DDR4 RAM (expandable)", "512GB NVMe SSD", "14-inch FHD IPS display", "Windows 11 Pro pre-installed", "2-year on-site warranty"],
        bidsReceived: 5,
    },
    {
        id: "REQ-004",
        title: "Printing Services",
        location: "Mzuzu",
        category: "Printing",
        categoryStyle: "bg-slate-100 text-slate-600",
        quantity: "As per request",
        deadline: "27 May 2025",
        urgent: false,
        Icon: Printer,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600",
        description: "Annual report printing services needed. Approximately 500 copies of 60-page full-color booklets, A4 size, perfect binding with glossy cover. Design files will be provided in PDF format.",
        buyer: { name: "Mzuzu City Council", avatar: "MC", rating: 4.6, totalOrders: 67 },
        budget: "MK 400,000 - 600,000",
        deliveryLocation: "City Hall, Mzuzu",
        postedDate: "18 May 2025",
        specifications: ["500 copies, 60 pages each", "Full color printing (CMYK)", "A4 size (210x297mm)", "Perfect binding with 250gsm glossy cover", "80gsm inner pages", "Delivery in branded boxes"],
        bidsReceived: 3,
    },
]

const ACTIVE_ORDERS = [
    { id: "#BH2568", buyer: "BuildPro Malawi", item: "Cement 50kg", value: 450_000, status: "In Progress", deliveryDate: "18 May 2025" },
    { id: "#BH2565", buyer: "Lilongwe City Council", item: "Dustbins", value: 320_000, status: "Preparing", deliveryDate: "20 May 2025" },
    { id: "#BH2561", buyer: "Zomba University", item: "Dell Laptops", value: 1_200_000, status: "Delivered", deliveryDate: "14 May 2025" },
]

const BID_STATUS = [
    { label: "Pending", count: 10, dot: "bg-amber-400" },
    { label: "Shortlisted", count: 6, dot: "bg-blue-500" },
    { label: "Under Review", count: 2, dot: "bg-violet-500" },
    { label: "Accepted", count: 2, dot: "bg-emerald-500" },
    { label: "Not Selected", count: 8, dot: "bg-red-400" },
]

const RECENT_MESSAGES = [
    { initials: "BP", name: "BuildPro Malawi", snippet: "Kindly confirm your delivery period.", time: "10:30 AM", unread: 1, avatarBg: "bg-emerald-100", avatarText: "text-emerald-700" },
    { initials: "GO", name: "Govt. of Malawi", snippet: "Your bid has been shortlisted.", time: "Yesterday", unread: 0, avatarBg: "bg-violet-100", avatarText: "text-violet-700" },
    { initials: "SC", name: "Schools Committee", snippet: "Please send your latest catalog.", time: "2 days ago", unread: 0, avatarBg: "bg-amber-100", avatarText: "text-amber-700" },
]

const PERFORMANCE = [
    { label: "Bids Sent", value: "18", icon: TrendingUp, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Orders Won", value: "4", icon: Star, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
    { label: "Earnings", value: "MK 2.45M", icon: Wallet, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Success Rate", value: "22%", icon: Target, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
]

const ORDER_STATUS_STYLES = {
    "In Progress": "bg-blue-50 text-blue-700",
    Preparing: "bg-amber-50 text-amber-700",
    Delivered: "bg-emerald-50 text-emerald-700",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
}

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

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm md:p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full md:max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-hidden rounded-t-2xl md:rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom-4 md:zoom-in-95 duration-300">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className={cn("flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl", requirement.iconBg)}>
                            <Icon className={cn("h-4 w-4 md:h-5 md:w-5", requirement.iconColor)} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[15px] md:text-[17px] font-bold text-slate-900 truncate">{requirement.title}</h2>
                            <p className="text-[11px] md:text-[12px] text-slate-500">{requirement.id} • Posted {requirement.postedDate}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100 bg-slate-50/50 px-4 md:px-6">
                    {[
                        { id: "details", label: "Details", fullLabel: "Requirement Details" },
                        { id: "bid", label: "Place Bid", fullLabel: "Submit Bid" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "relative px-3 md:px-4 py-3 text-[13px] font-semibold transition-colors",
                                activeTab === tab.id 
                                    ? "text-[#0EA432]" 
                                    : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            <span className="md:hidden">{tab.label}</span>
                            <span className="hidden md:inline">{tab.fullLabel}</span>
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0EA432] rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-120px)] md:max-h-[calc(90vh-140px)]">
                    {activeTab === "details" ? (
                        <div className="p-4 md:p-6 space-y-5 md:space-y-6">
                            {/* Status badges - Mobile shows at top */}
                            <div className="flex flex-wrap gap-2">
                                <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide", requirement.categoryStyle)}>
                                    {requirement.category}
                                </span>
                                {requirement.urgent && (
                                    <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-red-600">
                                        Urgent
                                    </span>
                                )}
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                                    {requirement.bidsReceived} bids received
                                </span>
                            </div>

                            {/* Image */}
                            {requirement.image ? (
                                <img
                                    src={requirement.image}
                                    alt={requirement.title}
                                    className="h-40 w-full md:h-48 rounded-xl object-cover ring-1 ring-slate-200"
                                />
                            ) : (
                                <div className={cn("flex h-40 w-full md:h-48 items-center justify-center rounded-xl ring-1 ring-slate-200", requirement.iconBg)}>
                                    <Icon className={cn("h-14 w-14 md:h-16 md:w-16", requirement.iconColor)} />
                                </div>
                            )}

                            {/* Quick info grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg bg-slate-50 p-3">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-[11px] font-medium uppercase tracking-wide">Location</span>
                                    </div>
                                    <p className="mt-1 text-[13px] font-semibold text-slate-800">{requirement.location}</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-3">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Package className="h-4 w-4" />
                                        <span className="text-[11px] font-medium uppercase tracking-wide">Quantity</span>
                                    </div>
                                    <p className="mt-1 text-[13px] font-semibold text-slate-800">{requirement.quantity}</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-3">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <CalendarDays className="h-4 w-4" />
                                        <span className="text-[11px] font-medium uppercase tracking-wide">Deadline</span>
                                    </div>
                                    <p className={cn("mt-1 text-[13px] font-semibold", requirement.urgent ? "text-red-600" : "text-slate-800")}>
                                        {requirement.deadline}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-3">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Tag className="h-4 w-4" />
                                        <span className="text-[11px] font-medium uppercase tracking-wide">Budget</span>
                                    </div>
                                    <p className="mt-1 text-[13px] font-semibold text-slate-800">{requirement.budget}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[14px] font-bold text-slate-900">
                                    <Info className="h-4 w-4 text-slate-400" />
                                    Description
                                </h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                                    {requirement.description}
                                </p>
                            </div>

                            {/* Attachments - Mobile specific section */}
                            <div className="md:hidden rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                        <Paperclip className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-semibold text-slate-700 truncate">specification.pdf</p>
                                        <p className="text-[11px] text-slate-400">245 KB</p>
                                    </div>
                                    <button className="text-[12px] font-semibold text-[#0EA432]">Download</button>
                                </div>
                            </div>

                            {/* Specifications - Hidden on mobile for cleaner view */}
                            <div className="hidden md:block">
                                <h3 className="flex items-center gap-2 text-[14px] font-bold text-slate-900">
                                    <ClipboardList className="h-4 w-4 text-slate-400" />
                                    Specifications & Requirements
                                </h3>
                                <ul className="mt-3 space-y-2">
                                    {requirement.specifications?.map((spec, index) => (
                                        <li key={index} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0EA432]" />
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Delivery Location - Desktop only */}
                            <div className="hidden md:block">
                                <h3 className="flex items-center gap-2 text-[14px] font-bold text-slate-900">
                                    <Truck className="h-4 w-4 text-slate-400" />
                                    Delivery Location
                                </h3>
                                <p className="mt-2 text-[13px] text-slate-600">
                                    {requirement.deliveryLocation}
                                </p>
                            </div>

                            {/* Buyer Info */}
                            <div className="rounded-xl bg-slate-50 p-3 md:p-4 ring-1 ring-slate-200">
                                <h3 className="hidden md:flex items-center gap-2 text-[14px] font-bold text-slate-900 mb-3">
                                    <Building2 className="h-4 w-4 text-slate-400" />
                                    Buyer Information
                                </h3>
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#0EA432] text-[12px] md:text-[14px] font-bold text-white">
                                        {requirement.buyer?.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[13px] md:text-[14px] font-semibold text-slate-900 truncate">{requirement.buyer?.name}</p>
                                            <span className="shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">Verified Buyer</span>
                                        </div>
                                        <div className="mt-0.5 md:mt-1 flex items-center gap-2 md:gap-3 text-[11px] md:text-[12px] text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-amber-400 text-amber-400" />
                                                {requirement.buyer?.rating}
                                            </span>
                                            <span className="hidden md:inline">•</span>
                                            <span className="hidden md:inline">{requirement.buyer?.totalOrders} orders</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile CTA - Fixed bottom buttons */}
                            <div className="md:hidden flex gap-3 pt-2">
                                <button
                                    type="button"
                                    className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-[14px] font-semibold text-slate-700"
                                >
                                    Ask a Question
                                </button>
                                <button
                                    onClick={() => setActiveTab("bid")}
                                    className="flex-1 rounded-xl bg-[#0EA432] py-3 text-[14px] font-bold text-white"
                                >
                                    Place a Bid
                                </button>
                            </div>

                            {/* Desktop CTA */}
                            <div className="hidden md:flex justify-center pt-2">
                                <button
                                    onClick={() => setActiveTab("bid")}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#0EA432] px-8 py-3 text-[14px] font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-[#0b8f2b] hover:shadow-xl hover:shadow-emerald-500/30"
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
                                    <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-emerald-100">
                                        <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-[#0EA432]" />
                                    </div>
                                    <h3 className="mt-4 text-[16px] md:text-[18px] font-bold text-slate-900">Bid Submitted!</h3>
                                    <p className="mt-2 text-[13px] md:text-[14px] text-slate-500">Your bid has been sent to the buyer.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitBid} className="space-y-4 md:space-y-5">
                                    {/* Requirement Summary */}
                                    <div className="rounded-xl bg-slate-50 p-3 md:p-4 ring-1 ring-slate-200">
                                        <div className="flex items-center gap-3">
                                            {requirement.image ? (
                                                <img
                                                    src={requirement.image}
                                                    alt={requirement.title}
                                                    className="h-10 w-10 md:h-14 md:w-14 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
                                                />
                                            ) : (
                                                <div className={cn("flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg", requirement.iconBg)}>
                                                    <Icon className={cn("h-5 w-5 md:h-6 md:w-6", requirement.iconColor)} />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-[13px] md:text-[14px] font-bold text-slate-900 truncate">{requirement.title}</p>
                                                <p className="text-[11px] md:text-[12px] text-slate-500">Deadline: {requirement.deadline}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bid Amount */}
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Your Price (MWK)
                                        </label>
                                        <div className="relative mt-1.5">
                                            <input
                                                type="text"
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(e.target.value)}
                                                placeholder="550000"
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0EA432] focus:outline-none focus:ring-2 focus:ring-[#0EA432]/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Delivery Time */}
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Delivery Time
                                        </label>
                                        <div className="relative mt-1.5">
                                            <input
                                                type="text"
                                                value={deliveryDays}
                                                onChange={(e) => setDeliveryDays(e.target.value)}
                                                placeholder="7 - 10 days"
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-[#0EA432] focus:outline-none focus:ring-2 focus:ring-[#0EA432]/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Note to Buyer <span className="text-slate-400 font-normal">(Optional)</span>
                                        </label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="We can deliver high quality chairs within the delivery time."
                                            rows={3}
                                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 md:p-4 text-[13px] md:text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-[#0EA432] focus:outline-none focus:ring-2 focus:ring-[#0EA432]/20 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Attachments */}
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Attach Quotation / Catalog <span className="text-slate-400 font-normal">(Optional)</span>
                                        </label>
                                        <div className="mt-1.5 rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                                                    <Paperclip className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[12px] font-medium text-slate-600">quotation.pdf</p>
                                                    <p className="text-[11px] text-slate-400">120 KB</p>
                                                </div>
                                                <button type="button" className="text-slate-400 hover:text-slate-600">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <button type="button" className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-[#0EA432]">
                                            <Paperclip className="h-3.5 w-3.5" />
                                            Add another file
                                        </button>
                                    </div>

                                    {/* Terms - Desktop only */}
                                    <div className="hidden md:block rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
                                        <div className="flex gap-3">
                                            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                                            <div className="text-[12px] text-amber-800">
                                                <p className="font-semibold">Important Notice</p>
                                                <p className="mt-1">
                                                    By submitting this bid, you confirm that you can deliver the items/services as specified. 
                                                    Withdrawal after acceptance may affect your seller rating.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0EA432] py-3.5 text-[14px] font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-[#0b8f2b] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── Components ───────────────────────────────────────────────────────────────

function SectionCard({ title, actionTo, actionLabel = "View all", children, className }) {
    return (
        <section className={cn("overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200", className)}>
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
                {actionTo ? (
                    <Link to={actionTo} className="text-[13px] font-semibold text-[#0EA432] hover:underline">
                        {actionLabel}
                    </Link>
                ) : null}
            </div>
            {children}
        </section>
    )
}

function KpiCard({ stat }) {
    const Icon = stat.icon
    const content = (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", stat.iconBg)}>
                    <Icon className={cn("h-5 w-5", stat.iconColor)} />
                </div>
                <div>
                    <p className="text-[12px] font-medium text-slate-500">{stat.label}</p>
                    <p className="text-[22px] font-extrabold leading-tight tabular-nums text-slate-900">
                        {stat.value}
                    </p>
                </div>
            </div>
        </div>
    )

    if (stat.link) {
        return <Link to={stat.link} className="block">{content}</Link>
    }
    return content
}

function EarningsCard() {
    return (
        <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600">
                    <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-[12px] font-medium text-emerald-700">Total Earnings</p>
                    <p className="text-[22px] font-extrabold leading-tight tabular-nums text-emerald-800">
                        MK 2,450,000
                    </p>
                </div>
            </div>
        </div>
    )
}

function MobileRequirementCard({ req, onViewBid }) {
    const Icon = req.Icon
    return (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100 transition-all hover:shadow-sm">
            <div className="flex items-start gap-3">
                {req.image ? (
                    <img
                        src={req.image}
                        alt={req.title}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                ) : (
                    <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ring-1 ring-slate-200/60", req.iconBg)}>
                        <Icon className={cn("h-6 w-6", req.iconColor)} />
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="text-[14px] font-bold text-slate-900 leading-tight">{req.title}</h3>
                        {req.urgent && (
                            <span className="shrink-0 rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-red-600">
                                Urgent
                            </span>
                        )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            {req.location}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span>{req.category}</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-3 space-y-1.5 text-[12px]">
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="font-semibold text-slate-700">{req.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Deadline:</span>
                    <span className={cn("font-semibold", req.urgent ? "text-red-600" : "text-slate-700")}>
                        {req.deadline}
                    </span>
                </div>
            </div>
            
            <Button
                type="button"
                variant="pill"
                size="pill"
                onClick={() => onViewBid(req)}
                className="mt-3 w-full"
            >
                <Send className="size-4" />
                View & Bid
            </Button>
        </div>
    )
}

function MobileOrderCard({ order }) {
    return (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-900">{order.id}</p>
                    <p className="mt-0.5 truncate text-[12px] text-slate-500">{order.buyer}</p>
                </div>
                <span className={cn(
                    "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    ORDER_STATUS_STYLES[order.status],
                )}>
                    {order.status}
                </span>
            </div>
            <div className="mt-3 space-y-1.5 text-[12px]">
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Item</span>
                    <span className="font-semibold text-slate-700">{order.item}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Value</span>
                    <span className="font-bold tabular-nums text-slate-900">
                        MK {order.value.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Delivery</span>
                    <span className="font-semibold text-slate-700">{order.deliveryDate}</span>
                </div>
            </div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const BidderDashboardPage = () => {
    const { username } = useAuth()
    const displayName = username || "Chikondi"
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
        <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 pb-24 md:space-y-6 md:py-6 md:pb-8">
            {/* View & Bid Dialog */}
            <ViewBidDialog
                requirement={selectedRequirement}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
            />

            {/* Header - Mobile optimized */}
            <div>
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-[28px]">
                    {getGreeting()}, {displayName}! 👋
                </h1>
                <p className="mt-0.5 text-[13px] text-slate-500 md:mt-1 md:text-[14px]">
                    Here&apos;s what&apos;s happening today.
                </p>
            </div>

            {/* Mobile KPI Grid - 2x2 layout matching design */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
                {KPI_STATS.map((stat) => (
                    <KpiCard key={stat.label} stat={stat} />
                ))}
            </div>

            {/* Mobile Earnings Card */}
            <div className="md:hidden">
                <EarningsCard />
            </div>

            {/* Desktop KPI row */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-3">
                {KPI_STATS.map((stat) => (
                    <KpiCard key={stat.label} stat={stat} />
                ))}
                <div className="md:col-span-3 lg:col-span-1">
                    <EarningsCard />
                </div>
            </div>

            {/* Mobile Latest Requirements - Card layout */}
            <div className="md:hidden space-y-5">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-[15px] font-bold text-slate-900">Latest Requirements</h2>
                        <Link to="/seller/requirements" className="text-[13px] font-semibold text-[#0EA432]">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {LATEST_REQUIREMENTS.map((req) => (
                            <MobileRequirementCard key={req.id} req={req} onViewBid={handleViewBid} />
                        ))}
                    </div>
                </div>

                <SectionCard title="My Bid Status" actionTo="/seller/my-bids">
                    <div className="divide-y divide-slate-50 px-5">
                        {BID_STATUS.map((item) => (
                            <div key={item.label} className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-2.5">
                                    <span className={cn("h-2.5 w-2.5 rounded-full", item.dot)} />
                                    <span className="text-[13px] font-medium text-slate-700">{item.label}</span>
                                </div>
                                <span className="text-[14px] font-bold tabular-nums text-slate-900">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-[15px] font-bold text-slate-900">Active Orders</h2>
                        <Link to="/seller/orders" className="text-[13px] font-semibold text-[#0EA432]">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {ACTIVE_ORDERS.map((order) => (
                            <MobileOrderCard key={order.id} order={order} />
                        ))}
                    </div>
                </div>

                <SectionCard title="Recent Messages" actionTo="/seller/messages">
                    <div className="divide-y divide-slate-50">
                        {RECENT_MESSAGES.map((msg) => (
                            <div key={msg.name} className="flex gap-3 px-5 py-3.5">
                                <div className={cn(
                                    "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                                    msg.avatarBg,
                                    msg.avatarText,
                                )}>
                                    {msg.initials}
                                    {msg.unread > 0 && (
                                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0EA432] text-[9px] font-bold text-white">
                                            {msg.unread}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="truncate text-[13px] font-semibold text-slate-800">{msg.name}</p>
                                        <span className="shrink-0 text-[11px] text-slate-400">{msg.time}</span>
                                    </div>
                                    <p className="mt-0.5 truncate text-[12px] text-slate-500">{msg.snippet}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-100 px-5 py-3">
                        <Link
                            to="/seller/messages"
                            className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0EA432] hover:underline"
                        >
                            Go to Messages
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </SectionCard>

                <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                    <h2 className="text-[15px] font-bold text-slate-900">
                        Performance Summary{" "}
                        <span className="text-[12px] font-semibold text-slate-500">(This Month)</span>
                    </h2>
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                        {PERFORMANCE.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.label} className="rounded-xl px-3 py-3 ring-1 ring-slate-200">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", item.iconBg)}>
                                            <Icon className={cn("h-4 w-4", item.iconColor)} />
                                        </div>
                                        <p className="text-[16px] font-extrabold tabular-nums leading-none text-slate-900">
                                            {item.value}
                                        </p>
                                    </div>
                                    <p className="mt-1.5 text-[11px] font-medium text-slate-500">{item.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>

            {/* Desktop Main layout */}
            <div className="hidden md:grid gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px]">

                {/* Left column */}
                <div className="space-y-6">
                    <SectionCard title="Latest Requirements" actionTo="/seller/requirements">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/80">
                                        {["Requirement", "Location", "Quantity", "Deadline", "Action"].map((col) => (
                                            <th
                                                key={col}
                                                className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400"
                                            >
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
                                                            <img
                                                                src={req.image}
                                                                alt={req.title}
                                                                className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
                                                            />
                                                        ) : (
                                                            <div className={cn(
                                                                "flex h-15 w-15 shrink-0 items-center justify-center rounded-xl ring-1 ring-slate-200/60",
                                                                req.iconBg,
                                                            )}>
                                                                <Icon className={cn("h-6 w-6", req.iconColor)} />
                                                            </div>
                                                        )}
                                                        <span className="text-[13px] font-semibold text-slate-800">
                                                            {req.title}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-[13px] text-slate-700">{req.location}</td>
                                               
                                                <td className="px-5 py-3.5 text-[13px] text-slate-700">{req.quantity}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className={cn(
                                                        "text-[13px] font-semibold",
                                                        req.urgent ? "text-red-500" : "text-slate-700",
                                                    )}>
                                                        {req.deadline}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <Button
                                                        type="button"
                                                        variant="pill"
                                                        size="pill-sm"
                                                        onClick={() => handleViewBid(req)}
                                                    >
                                                        <Send className="size-3.5" />
                                                        View & Bid
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>

                    <SectionCard title="Active Orders" actionTo="/seller/orders">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/80">
                                        {["Order ID", "Buyer", "Item", "Value", "Status", "Delivery Date"].map((col) => (
                                            <th
                                                key={col}
                                                className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400"
                                            >
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {ACTIVE_ORDERS.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50/50">
                                            <td className="px-5 py-3.5 text-[13px] font-semibold text-slate-800">{order.id}</td>
                                            <td className="px-5 py-3.5 text-[13px] text-slate-700">{order.buyer}</td>
                                            <td className="px-5 py-3.5 text-[13px] text-slate-700">{order.item}</td>
                                            <td className="px-5 py-3.5 text-[13px] font-semibold tabular-nums text-slate-800">
                                                MK {order.value.toLocaleString()}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={cn(
                                                    "inline-flex rounded-full px-2.5 py-0.5 text-[11px]",
                                                    ORDER_STATUS_STYLES[order.status],
                                                )}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-[13px] text-slate-500">{order.deliveryDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>
                </div>

                {/* Right sidebar */}
                <aside className="space-y-5">
                    <SectionCard title="My Bid Status" actionTo="/seller/my-bids">
                        <div className="divide-y divide-slate-50 px-5">
                            {BID_STATUS.map((item) => (
                                <div key={item.label} className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-2.5">
                                        <span className={cn("h-2.5 w-2.5 rounded-full", item.dot)} />
                                        <span className="text-[13px] font-medium text-slate-700">{item.label}</span>
                                    </div>
                                    <span className="text-[14px] font-bold tabular-nums text-slate-900">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Recent Messages" actionTo="/seller/messages">
                        <div className="divide-y divide-slate-50">
                            {RECENT_MESSAGES.map((msg) => (
                                <div key={msg.name} className="flex gap-3 px-5 py-3.5">
                                    <div className={cn(
                                        "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                                        msg.avatarBg,
                                        msg.avatarText,
                                    )}>
                                        {msg.initials}
                                        {msg.unread > 0 && (
                                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0EA432] text-[9px] font-bold text-white">
                                                {msg.unread}
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="truncate text-[13px] font-semibold text-slate-800">{msg.name}</p>
                                            <span className="shrink-0 text-[11px] text-slate-400">{msg.time}</span>
                                        </div>
                                        <p className="mt-0.5 truncate text-[12px] text-slate-500">{msg.snippet}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-100 px-5 py-3">
                            <Link
                                to="/seller/messages"
                                className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0EA432] hover:underline"
                            >
                                Go to Messages
                                <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </SectionCard>

                    <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                        <h2 className="text-[15px] font-bold text-slate-900">
                            Performance Summary{" "}
                            <span className="text-[12px] font-semibold text-slate-500">(This Month)</span>
                        </h2>
                        <div className="mt-4 grid grid-cols-2 gap-2.5">
                            {PERFORMANCE.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.label} className="rounded-xl px-3 py-3 ring-1 ring-slate-200">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", item.iconBg)}>
                                                <Icon className={cn("h-4 w-4", item.iconColor)} />
                                            </div>
                                            <p className="text-[16px] font-extrabold tabular-nums leading-none text-slate-900">
                                                {item.value}
                                            </p>
                                        </div>
                                        <p className="mt-1.5 text-[11px] font-medium text-slate-500">{item.label}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </aside>
            </div>

            {/* Footer - Hidden on mobile */}
            <footer className="hidden md:flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                <p className="text-[12px] text-slate-400">© 2025 BidHub Malawi. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <button type="button" className="text-[12px] font-medium text-slate-500 hover:text-[#0EA432]">
                        Help Center
                    </button>
                    <button type="button" className="text-[12px] font-medium text-slate-500 hover:text-[#0EA432]">
                        Contact Us
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default BidderDashboardPage
