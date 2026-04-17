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

/** Returns the correct dashboard path for a given role. */
export function getDashboardPathByRole(role) {
  const normalized = normalizeRole(role)
  if (normalized === ROLES.ADMIN) return "/admin/dashboard"
  if (normalized === ROLES.SELLER) return "/seller/dashboard"
  return "/buyer/dashboard"
}
