import {
  FileText,
  Gavel,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Package,
  Settings,
  Star,
  Users,
} from "lucide-react"
import { ROLES } from "@/core/constants/roles"

export const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.BUYER, ROLES.SELLER],
  },
  {
    to: "/post-requirement",
    label: "Post Requirement",
    icon: Package,
    roles: [ROLES.BUYER],
  },
  {
    to: "/my-posts",
    label: "My Posts",
    icon: FileText,
    roles: [ROLES.BUYER],
  },
  {
    to: "/bids",
    label: "Bids",
    icon: Gavel,
    roles: [ROLES.ADMIN, ROLES.BUYER, ROLES.SELLER],
  },
  {
    to: "/bids-map",
    label: "Bids Map",
    icon: MapPin,
    roles: [ROLES.ADMIN, ROLES.BUYER, ROLES.SELLER],
  },
  {
    to: "/reviews",
    label: "Reviews",
    icon: Star,
    roles: [ROLES.ADMIN, ROLES.BUYER, ROLES.SELLER],
  },
  {
    to: "/messages",
    label: "Messages",
    icon: MessageSquare,
    badgeCount: 3,
    roles: [ROLES.ADMIN, ROLES.BUYER, ROLES.SELLER],
  },
  {
    to: "/users",
    label: "Users",
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
    roles: [ROLES.ADMIN],
  },
]

export const getNavItemsByRole = (role) =>
  NAV_ITEMS.filter((item) => item.roles.includes(role))
