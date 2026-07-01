import {
    Building2,
    Truck,
    ShoppingBasket,
    Briefcase,
    Sprout,
    Zap,
    HeartPulse,
    Monitor,
    Package,
} from "lucide-react"

const CATEGORY_UI_BY_NAME = {
    Building: { icon: Building2, bg: "bg-orange-100", color: "text-orange-600" },
    "Construction Materials": { icon: Building2, bg: "bg-orange-100", color: "text-orange-600" },
    Transport: { icon: Truck, bg: "bg-blue-100", color: "text-blue-600" },
    "Transport & Logistics": { icon: Truck, bg: "bg-blue-100", color: "text-blue-600" },
    Groceries: { icon: ShoppingBasket, bg: "bg-green-100", color: "text-green-600" },
    "Grains & Cereals": { icon: ShoppingBasket, bg: "bg-green-100", color: "text-green-600" },
    "Cooking Oil": { icon: ShoppingBasket, bg: "bg-lime-100", color: "text-lime-600" },
    Office: { icon: Briefcase, bg: "bg-purple-100", color: "text-purple-600" },
    "Office Supplies": { icon: Briefcase, bg: "bg-purple-100", color: "text-purple-600" },
    Agriculture: { icon: Sprout, bg: "bg-emerald-100", color: "text-emerald-600" },
    Fertilizer: { icon: Sprout, bg: "bg-emerald-100", color: "text-emerald-600" },
    Energy: { icon: Zap, bg: "bg-yellow-100", color: "text-yellow-600" },
    Medical: { icon: HeartPulse, bg: "bg-red-100", color: "text-red-600" },
    "Medical Supplies": { icon: HeartPulse, bg: "bg-red-100", color: "text-red-600" },
    "IT & Tech": { icon: Monitor, bg: "bg-slate-100", color: "text-slate-600" },
    Electronics: { icon: Monitor, bg: "bg-slate-100", color: "text-slate-600" },
}

const DEFAULT_CATEGORY_UI = { icon: Package, bg: "bg-slate-100", color: "text-slate-600" }

export function getCategoryUi(name = "") {
    return CATEGORY_UI_BY_NAME[name] || DEFAULT_CATEGORY_UI
}
