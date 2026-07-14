import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"
import {
    User,
    Building2,
    FileText,
    CreditCard,
    Bell,
    MessageSquare,
    Settings,
    HelpCircle,
    LogOut,
    ChevronRight,
} from "lucide-react"

// ─── Menu Items ───────────────────────────────────────────────────────────────

const MENU_ITEMS = [
    { 
        label: "My Company Profile", 
        icon: Building2, 
        to: "/seller/profile",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600"
    },
    { 
        label: "Documents", 
        icon: FileText, 
        to: "/seller/documents",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600"
    },
    { 
        label: "Bank Details", 
        icon: CreditCard, 
        to: "/seller/bank-details",
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600"
    },
    { 
        label: "Notifications", 
        icon: Bell, 
        to: "/seller/notifications",
        badge: 3,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600"
    },
    { 
        label: "Messages", 
        icon: MessageSquare, 
        to: "/seller/messages",
        badge: 2,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600"
    },
    { 
        label: "Settings", 
        icon: Settings, 
        to: "/seller/settings",
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600"
    },
    { 
        label: "Help & Support", 
        icon: HelpCircle, 
        to: "/seller/help",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600"
    },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

const MenuPage = () => {
    const { username, logout } = useAuth()
    const displayName = username || "Chikondi Traders"

    return (
        <div className="mx-auto max-w-lg space-y-4 px-4 py-5 pb-24 md:py-6 md:pb-8">

            {/* Header - Mobile only title */}
            <div className="md:hidden">
                <h1 className="text-lg font-bold text-slate-900">Menu</h1>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-slate-900">Account</h1>
                <p className="mt-1 text-[14px] text-slate-500">Manage your profile and settings.</p>
            </div>

            {/* Profile Card */}
            <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0EA432] text-lg font-bold text-white">
                        {displayName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-[16px] font-bold text-slate-900 truncate">{displayName}</h2>
                        <p className="text-[13px] text-slate-500">Seller</p>
                    </div>
                </div>
                <Link 
                    to="/seller/profile"
                    className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-[#0EA432] py-2.5 text-[13px] font-semibold text-[#0EA432] transition-colors hover:bg-emerald-50"
                >
                    View Profile
                </Link>
            </div>

            {/* Menu Items */}
            <div className="rounded-2xl bg-white ring-1 ring-slate-100 divide-y divide-slate-100">
                {MENU_ITEMS.map((item) => {
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-slate-50 first:rounded-t-2xl last:rounded-b-2xl"
                        >
                            <div className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                item.iconBg
                            )}>
                                <Icon className={cn("h-5 w-5", item.iconColor)} />
                            </div>
                            <span className="flex-1 text-[14px] font-medium text-slate-700">
                                {item.label}
                            </span>
                            <div className="flex items-center gap-2">
                                {item.badge && (
                                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                                        {item.badge}
                                    </span>
                                )}
                                <ChevronRight className="h-4 w-4 text-slate-400" />
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Logout Button */}
            <button
                onClick={logout}
                className="flex w-full items-center gap-4 rounded-2xl bg-white px-4 py-3.5 ring-1 ring-slate-100 transition-colors hover:bg-red-50"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <LogOut className="h-5 w-5 text-red-500" />
                </div>
                <span className="text-[14px] font-medium text-red-600">
                    Logout
                </span>
            </button>

            {/* App Version */}
            <p className="text-center text-[11px] text-slate-400">
                BidHub v1.0.0
            </p>
        </div>
    )
}

export default MenuPage
