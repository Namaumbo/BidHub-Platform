import {
  FileText,
  Gavel,
  MapPin,
  MessageSquare,
  Package,
  Star,
  Home
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
      icon: Home,
    },
    {
      to: "/seller/sell-requirement",
      label: "Sell Requirement",
      icon: Package,
    },
    {
      to: "/seller/my-posts",
      label: "My Posts",
      icon: FileText,
    },
    {
      to: "/seller/messages",
      label: "Messages",
      icon: MessageSquare,
      badgeCount: 3,
    },
  ],
  [ROLES.ADMIN]: [],
})

export const getNavItemsByRole = (role) => {
  const normalizedRole = normalizeRole(role)
  return ROLE_NAV_ITEMS[normalizedRole] || []
}
