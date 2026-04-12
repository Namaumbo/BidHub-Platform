export const ROLES = Object.freeze({
  ADMIN: "admin",
  BUYER: "buyer",
  SELLER: "seller",
})

export const DEFAULT_ROLE = ROLES.BUYER

/**
 * Normalize any raw role string coming from the API into a known ROLES value.
 * Treats "bidder" as an alias for "seller" since our db is not atomic.
 */
export function normalizeRole(rawRole) {
  const value = String(rawRole || "").toLowerCase().trim()
  if (value === ROLES.ADMIN) return ROLES.ADMIN
  if (value === ROLES.BUYER) return ROLES.BUYER
  if (value === ROLES.SELLER || value === "bidder") return ROLES.SELLER
  return DEFAULT_ROLE
}

export function getRoleBasePath(role) {
  const normalized = normalizeRole(role)
  if (normalized === ROLES.ADMIN) return "/admin"
  if (normalized === ROLES.SELLER) return "/seller"
  return "/buyer"
}

export function getPathForRole(role, leaf = "dashboard") {
  const normalizedLeaf = String(leaf || "dashboard").replace(/^\/+/, "")
  return `${getRoleBasePath(role)}/${normalizedLeaf}`
}

/** Returns the correct dashboard path for a given role. */
export function getDashboardPathByRole(role) {
  return getPathForRole(role, "dashboard")
}
