import {
  FileText,
  Gavel,
  MapPin,
  MessageSquare,
  Package,
  Star,
  Home,
  Search,
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  User,
  Settings,
} from "lucide-react"
import { ROLES } from "@/core/constants/roles"
import { normalizeRole } from "@/core/constants/roles"

const ROLE_NAV_ITEMS = Object.freeze({
  [ROLES.BUYER]: [
    {
      to: "/buyer/dashboard",
      label: "Home",
      icon: Home,
    },
    {
      to: "/buyer/post-requirement",
      label: "Post Requirement",
      icon: Package,
    },
    {
      to: "/buyer/my-posts",
      label: "My Posts",
      icon: FileText,
    },
    {
      to: "/buyer/bids",
      label: "Bids",
      icon: Gavel,
    },
    {
      to: "/buyer/bids-map",
      label: "Bids Map",
      icon: MapPin,
    },
    {
      to: "/buyer/reviews",
      label: "Reviews",
      icon: Star,
    },
    {
      to: "/messages",
      label: "Messages",
      icon: MessageSquare,
      badgeCount: 3,
    },
  ],
  [ROLES.SELLER]: [
    {
      to: "/seller/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/seller/requirements",
      label: "Buyer Requests",
      icon: Search,
    },
    {
      to: "/seller/my-bids",
      label: "My Bids",
      icon: Gavel,
    },
    {
      to: "/seller/messages",
      label: "Messages",
      icon: MessageSquare,
      badgeCount: 3,
      showDot: true,
    },
    {
      to: "/seller/orders",
      label: "Orders",
      icon: ShoppingBag,
    },
    {
      to: "/seller/my-posts",
      label: "Payments",
      icon: Wallet,
    },
    {
      to: "/seller/menu",
      label: "Profile",
      icon: User,
    },
    {
      to: "/seller/sell-requirement",
      label: "Settings",
      icon: Settings,
    },
  ],
  [ROLES.ADMIN]: [],
})

export const getNavItemsByRole = (role) => {
  const normalizedRole = normalizeRole(role)
  return ROLE_NAV_ITEMS[normalizedRole] || []
}
