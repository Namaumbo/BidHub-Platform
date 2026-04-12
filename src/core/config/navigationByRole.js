import {
  ClipboardList,
  Gavel,
  LayoutDashboard,
  Star,
  Tags,
  FolderKanban,
  Package,
  Users,
} from "lucide-react"
import { ROLES } from "@/core/constants/roles"

export const NAV_ITEMS_BY_ROLE = {
  [ROLES.ADMIN]: [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/inquiries", label: "Inquiries", icon: ClipboardList },
    { to: "/admin/bids", label: "Bids", icon: Gavel },
    { to: "/admin/reviews", label: "Reviews", icon: Star },
    { to: "/admin/categories", label: "Categories", icon: Tags },
    { to: "/admin/activity", label: "Activity", icon: FolderKanban },
  ],
  [ROLES.BUYER]: [
    { to: "/buyer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/buyer/post-requirement", label: "Post Requirement", icon: Package },
    { to: "/buyer/my-posts", label: "My Posts", icon: ClipboardList },
    { to: "/buyer/bids", label: "Bids", icon: Gavel },
    { to: "/buyer/bids-map", label: "Bids Map", icon: FolderKanban },
    { to: "/buyer/reviews", label: "Reviews", icon: Star },
  ],
  [ROLES.SELLER]: [
    { to: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ],
}

export const getNavItemsByRole = (role) => NAV_ITEMS_BY_ROLE[role] ?? NAV_ITEMS_BY_ROLE[ROLES.BUYER]
