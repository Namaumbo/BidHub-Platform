import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { getDashboardPathByRole, normalizeRole } from "@/core/constants/roles"

/**
 * Guards a set of routes to only the given allowedRoles.
 * If the current user's role is not allowed, they are redirected
 * to their own correct dashboard.
 */
export default function RoleRoute({ allowedRoles = [] }) {
  const { role } = useAuth()
  const currentRole = normalizeRole(role)

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to={getDashboardPathByRole(currentRole)} replace />
  }

  return <Outlet />
}
