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
    User,
    Wallet,
    X,
} from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const KPI_STATS = [
    { label: "Open Requirements", value: 24, icon: FileText, cardBg: "bg-emerald-50/60", cardRing: "ring-emerald-100", iconBg: "bg-emerald-600", link: "/seller/requirements" },
    { label: "My Bids", value: 18, icon: ClipboardList, cardBg: "bg-blue-50/60", cardRing: "ring-blue-100", iconBg: "bg-blue-600", link: "/seller/requirements" },
    { label: "Shortlisted", value: 6, icon: Star, cardBg: "bg-amber-50/60", cardRing: "ring-amber-100", iconBg: "bg-amber-400", link: "/seller/requirements" },
    { label: "Won Orders", value: 4, icon: Briefcase, cardBg: "bg-violet-50/60", cardRing: "ring-violet-100", iconBg: "bg-violet-500", link: "/seller/requirements" },
    { label: "Total Earnings", value: "MK 2,450,000", sub: "This month", icon: Wallet, cardBg: "bg-red-50/60", cardRing: "ring-red-100", iconBg: "bg-red-500", link: null },
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", requirement.iconBg)}>
                            <Icon className={cn("h-5 w-5", requirement.iconColor)} />
                        </div>
                        <div>
                            <h2 className="text-[17px] font-bold text-slate-900">{requirement.title}</h2>
                            <p className="text-[12px] text-slate-500">{requirement.id} • Posted {requirement.postedDate}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100 bg-slate-50/50 px-6">
                    {[
                        { id: "details", label: "Requirement Details" },
                        { id: "bid", label: "Submit Bid" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "relative px-4 py-3 text-[13px] font-semibold transition-colors",
                                activeTab === tab.id 
                                    ? "text-[#0EA432]" 
                                    : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0EA432] rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    {activeTab === "details" ? (
                        <div className="p-6 space-y-6">
                            {/* Image and Quick Info */}
                            <div className="flex flex-col gap-5 sm:flex-row">
                                {requirement.image ? (
                                    <img
                                        src={requirement.image}
                                        alt={requirement.title}
                                        className="h-48 w-full sm:w-64 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
                                    />
                                ) : (
                                    <div className={cn("flex h-48 w-full sm:w-64 shrink-0 items-center justify-center rounded-xl ring-1 ring-slate-200", requirement.iconBg)}>
                                        <Icon className={cn("h-16 w-16", requirement.iconColor)} />
                                    </div>
                                )}
                                <div className="flex-1 space-y-4">
                                    {/* Status badges */}
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
                                            <p className="mt-1 text-[13px] font-semibold text-slate-800">{requirement.deadline}</p>
                                        </div>
                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Tag className="h-4 w-4" />
                                                <span className="text-[11px] font-medium uppercase tracking-wide">Budget</span>
                                            </div>
                                            <p className="mt-1 text-[13px] font-semibold text-slate-800">{requirement.budget}</p>
                                        </div>
                                    </div>
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

                            {/* Specifications */}
                            <div>
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

                            {/* Delivery Location */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[14px] font-bold text-slate-900">
                                    <Truck className="h-4 w-4 text-slate-400" />
                                    Delivery Location
                                </h3>
                                <p className="mt-2 text-[13px] text-slate-600">
                                    {requirement.deliveryLocation}
                                </p>
                            </div>

                            {/* Buyer Info */}
                            <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 ring-1 ring-slate-200">
                                <h3 className="flex items-center gap-2 text-[14px] font-bold text-slate-900">
                                    <Building2 className="h-4 w-4 text-slate-400" />
                                    Buyer Information
                                </h3>
                                <div className="mt-3 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0EA432] text-[14px] font-bold text-white">
                                        {requirement.buyer?.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[14px] font-semibold text-slate-900">{requirement.buyer?.name}</p>
                                        <div className="mt-1 flex items-center gap-3 text-[12px] text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                                {requirement.buyer?.rating} rating
                                            </span>
                                            <span>•</span>
                                            <span>{requirement.buyer?.totalOrders} orders completed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA to go to bid tab */}
                            <div className="flex justify-center pt-2">
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
                        <div className="p-6">
                            {submitSuccess ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                        <CheckCircle2 className="h-10 w-10 text-[#0EA432]" />
                                    </div>
                                    <h3 className="mt-4 text-[18px] font-bold text-slate-900">Bid Submitted Successfully!</h3>
                                    <p className="mt-2 text-[14px] text-slate-500">Your bid has been sent to the buyer.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitBid} className="space-y-5">
                                    {/* Requirement Summary */}
                                    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                        <div className="flex items-center gap-3">
                                            {requirement.image ? (
                                                <img
                                                    src={requirement.image}
                                                    alt={requirement.title}
                                                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-lg", requirement.iconBg)}>
                                                    <Icon className={cn("h-6 w-6", requirement.iconColor)} />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-[14px] font-bold text-slate-900">{requirement.title}</p>
                                                <p className="text-[12px] text-slate-500">Budget: {requirement.budget}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bid Amount */}
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Your Bid Amount <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative mt-1.5">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-slate-400">MK</span>
                                            <input
                                                type="text"
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(e.target.value)}
                                                placeholder="0.00"
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0EA432] focus:outline-none focus:ring-2 focus:ring-[#0EA432]/20 transition-all"
                                            />
                                        </div>
                                        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-500">
                                            <AlertCircle className="h-3 w-3" />
                                            Enter your competitive price for this requirement
                                        </p>
                                    </div>

                                    {/* Delivery Days */}
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Delivery Timeline <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative mt-1.5">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="number"
                                                value={deliveryDays}
                                                onChange={(e) => setDeliveryDays(e.target.value)}
                                                placeholder="Number of days"
                                                min="1"
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-16 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-[#0EA432] focus:outline-none focus:ring-2 focus:ring-[#0EA432]/20 transition-all"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-slate-500">days</span>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Add any additional information, terms, or clarifications for your bid..."
                                            rows={4}
                                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-[#0EA432] focus:outline-none focus:ring-2 focus:ring-[#0EA432]/20 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Attachments */}
                                    <div>
                                        <label className="block text-[13px] font-semibold text-slate-700">
                                            Attachments
                                        </label>
                                        <div className="mt-1.5 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-colors hover:border-[#0EA432]/50 hover:bg-emerald-50/30 cursor-pointer">
                                            <div className="text-center">
                                                <Paperclip className="mx-auto h-8 w-8 text-slate-400" />
                                                <p className="mt-2 text-[13px] font-medium text-slate-600">
                                                    Drop files here or <span className="text-[#0EA432]">browse</span>
                                                </p>
                                                <p className="mt-1 text-[11px] text-slate-400">
                                                    PDF, Images, Documents (max 10MB)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
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
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-[14px] font-semibold text-slate-700 transition-all hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0EA432] py-3 text-[14px] font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-[#0b8f2b] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" />
                                                    Submit Bid
                                                </>
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
        <div className={cn("rounded-2xl p-4 ring-1 transition-all hover:shadow-sm", stat.cardBg, stat.cardRing)}>
            <div className="flex items-center gap-3">
                <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm", stat.iconBg)}>
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-[13px] font-medium text-slate-600">{stat.label}</p>
            </div>
            <p className="mt-2.5 text-[22px] font-extrabold leading-none tabular-nums text-slate-900">
                {stat.value}
            </p>
            {stat.link ? (
                <p className="mt-2 text-[12px] font-semibold text-[#0EA432]">View all</p>
            ) : null}
            {stat.sub ? <p className="mt-2 text-[12px] text-slate-500">{stat.sub}</p> : null}
        </div>
    )

    if (stat.link) {
        return <Link to={stat.link} className="block">{content}</Link>
    }
    return content
}

function RequirementRow({ req }) {
    const Icon = req.Icon
    return (
        <div className="group flex flex-col gap-3 border-b border-slate-100 px-5 py-4 transition-colors last:border-0 hover:bg-slate-50/60 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3.5">
                {req.image ? (
                    <img
                        src={req.image}
                        alt={req.title}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-slate-200 transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ring-1 ring-slate-200/60", req.iconBg)}>
                        <Icon className={cn("h-7 w-7", req.iconColor)} />
                    </div>
                )}
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-[14px] font-bold text-slate-900">{req.title}</h3>
                        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", req.categoryStyle)}>
                            {req.category}
                        </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-slate-500">
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            {req.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Package className="h-3.5 w-3.5 text-slate-400" />
                            {req.quantity}
                        </span>
                        <span
                            className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                                req.urgent ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600",
                            )}
                        >
                            <CalendarDays className="h-3 w-3" />
                            Due {req.deadline}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex shrink-0 items-center justify-end">
                <Link
                    to="/seller/requirements"
                    className="inline-flex items-center gap-1 rounded-lg bg-[#0EA432] px-4 py-2 text-[12px] font-bold text-white shadow-sm transition-all hover:bg-[#0b8f2b] hover:shadow group-hover:translate-x-0.5"
                >
                    View & Bid
                    <ChevronRight className="h-3.5 w-3.5" />
                </Link>
            </div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const BidderDashboardPage = () => {
    const { username } = useAuth()
    const displayName = username || "Chikondi"

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 pb-24 md:pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-[28px]">
                    {getGreeting()}, {displayName}! 👋
                </h1>
                <p className="mt-1 text-[14px] text-slate-500">
                    Here&apos;s what&apos;s happening with your business today.
                </p>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {KPI_STATS.map((stat) => (
                    <KpiCard key={stat.label} stat={stat} />
                ))}
            </div>

            {/* Main layout */}
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px]">

                {/* Left column */}
                <div className="space-y-6">
                    <SectionCard title="Latest Requirements" actionTo="/seller/requirements">
                        <div>
                            {LATEST_REQUIREMENTS.map((req) => (
                                <RequirementRow key={req.id} req={req} />
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Active Orders" actionTo="/seller/requirements">
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
                    <SectionCard title="My Bid Status" actionTo="/seller/requirements">
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

            {/* Footer */}
            <footer className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
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
