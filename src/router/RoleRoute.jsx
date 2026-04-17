import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { getDashboardPathByRole, normalizeRole } from "@/core/constants/roles"


export default function RoleRoute({ allowedRoles = [] }) {
  const { role } = useAuth()
  const currentRole = normalizeRole(role)

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to={getDashboardPathByRole(currentRole)} replace />
  }

  return <Outlet />
}
