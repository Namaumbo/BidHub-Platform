import httpClient from "@/core/api/httpClient"
import {
  normalizeActivity,
  normalizeBid,
  normalizeCategory,
  normalizeInquiry,
  normalizePaginatedResponse,
  normalizeReview,
  normalizeUser,
} from "@/core/adapters/admin/normalizers"
import {
  mockActivity,
  mockBids,
  mockCategories,
  mockInquiries,
  mockReviews,
  mockUsers,
} from "@/core/mocks/admin/data"

const useAdminMocks = import.meta.env.VITE_USE_ADMIN_MOCKS !== "false"

function matchesSearch(values, search) {
  if (!search) return true
  const needle = search.toLowerCase()
  return values.some((value) => String(value ?? "").toLowerCase().includes(needle))
}

function sortByNewest(a, b, key) {
  return new Date(b[key]).getTime() - new Date(a[key]).getTime()
}

async function safeGet(url, params, fallback) {
  if (useAdminMocks) return fallback()
  try {
    const response = await httpClient.get(url, { params })
    return response.data
  } catch {
    return fallback()
  }
}

async function safePatch(url, payload, fallback) {
  if (useAdminMocks) return fallback()
  try {
    const response = await httpClient.patch(url, payload)
    return response.data
  } catch {
    return fallback()
  }
}

export async function getAdminDashboardSummary() {
  return safeGet("/admin/dashboard/summary", {}, async () => {
    const pendingModerationCount =
      mockReviews.filter((item) => item.flagged).length +
      mockBids.filter((item) => item.flagged).length +
      mockInquiries.filter((item) => item.flagged).length

    return {
      stats: [
        { label: "Total users", 
          value: mockUsers.length, 
          tone: "primary", 
          to: "/admin/users" 
        },
        { label: "Open inquiries", 
          value: mockInquiries.filter((item) => item.status === "open").length, 
          tone: "accent",
          to: "/admin/inquiries",
        },
        { label: "Active bids", 
          value: mockBids.filter((item) => item.status === "active").length, 
          tone: "accent",
          to: "/admin/bids"
        },
        { label: "Flagged reviews", 
          value: mockReviews.filter((item) => item.flagged).length, 
          tone: "warning",
          to: "/admin/reviews", 
        },
        { label: "Pending moderation", 
          value: pendingModerationCount, 
          tone: "danger",
          to: "/admin/moderate/pages"
        },
        { label: "Categories", 
          value: mockCategories.length, 
          tone: "primary",
          to: "/admin/categories"
        },
      ],
      alerts: [
        { id: "alert-1", title: "Review queue needs action", body: "2 flagged reviews and bids still need moderation." },
        { id: "alert-2", title: "Seller verification backlog", body: "1 seller account is under review and awaiting verification." },
      ],
      recentActivity: mockActivity.map(normalizeActivity),
    }
  })
}

export async function listAdminUsers(filters = {}) {
  return safeGet("/admin/users", filters, async () => {
    const filtered = mockUsers
      .filter((item) => !filters.role || item.role === filters.role)
      .filter((item) => !filters.status || item.status === filters.status)
      .filter((item) => matchesSearch([item.fullName, item.email, item.location], filters.search))
      .sort((a, b) => sortByNewest(a, b, "joinedAt"))

    return normalizePaginatedResponse(filtered, normalizeUser, Number(filters.page || 1), Number(filters.pageSize || 10), {
      active: mockUsers.filter((item) => item.status === "active").length,
      suspended: mockUsers.filter((item) => item.status === "suspended").length,
      verified: mockUsers.filter((item) => item.verified).length,
    })
  })
}

export async function getAdminUserById(userId) {
  return safeGet(`/admin/users/${userId}`, {}, async () => normalizeUser(mockUsers.find((item) => item.id === userId) || mockUsers[0]))
}

export async function updateAdminUserStatus(userId, payload) {
  return safePatch(`/admin/users/${userId}/status`, payload, async () => ({
    ...normalizeUser(mockUsers.find((item) => item.id === userId) || mockUsers[0]),
    status: payload.status,
    updatedAt: new Date().toISOString(),
    updatedBy: "admin@bidit.io",
  }))
}

export async function listAdminInquiries(filters = {}) {
  return safeGet("/admin/inquiries", filters, async () => {
    const filtered = mockInquiries
      .filter((item) => !filters.status || item.status === filters.status)
      .filter((item) => !filters.categoryId || item.categoryId === filters.categoryId)
      .filter((item) => matchesSearch([item.title, item.buyerName, item.location], filters.search))
      .sort((a, b) => sortByNewest(a, b, "createdAt"))

    return normalizePaginatedResponse(filtered, normalizeInquiry, Number(filters.page || 1), Number(filters.pageSize || 10), {
      visible: mockInquiries.filter((item) => item.visibility === "visible").length,
      hidden: mockInquiries.filter((item) => item.visibility === "hidden").length,
      flagged: mockInquiries.filter((item) => item.flagged).length,
    })
  })
}

export async function getAdminInquiryById(inquiryId) {
  return safeGet(`/admin/inquiries/${inquiryId}`, {}, async () => normalizeInquiry(mockInquiries.find((item) => item.id === inquiryId) || mockInquiries[0]))
}

export async function updateAdminInquiryStatus(inquiryId, payload) {
  return safePatch(`/admin/inquiries/${inquiryId}/status`, payload, async () => ({
    ...normalizeInquiry(mockInquiries.find((item) => item.id === inquiryId) || mockInquiries[0]),
    status: payload.status,
    updatedAt: new Date().toISOString(),
    updatedBy: "admin@bidit.io",
  }))
}

export async function listAdminBids(filters = {}) {
  return safeGet("/admin/bids", filters, async () => {
    const filtered = mockBids
      .filter((item) => !filters.status || item.status === filters.status)
      .filter((item) => matchesSearch([item.inquiryTitle, item.sellerName], filters.search))
      .sort((a, b) => sortByNewest(a, b, "submittedAt"))

    return normalizePaginatedResponse(filtered, normalizeBid, Number(filters.page || 1), Number(filters.pageSize || 10), {
      active: mockBids.filter((item) => item.status === "active").length,
      flagged: mockBids.filter((item) => item.flagged).length,
      rejected: mockBids.filter((item) => item.status === "rejected").length,
    })
  })
}

export async function getAdminBidById(bidId) {
  return safeGet(`/admin/bids/${bidId}`, {}, async () => normalizeBid(mockBids.find((item) => item.id === bidId) || mockBids[0]))
}

export async function updateAdminBidStatus(bidId, payload) {
  return safePatch(`/admin/bids/${bidId}/status`, payload, async () => ({
    ...normalizeBid(mockBids.find((item) => item.id === bidId) || mockBids[0]),
    status: payload.status,
    updatedAt: new Date().toISOString(),
    updatedBy: "admin@bidit.io",
  }))
}

export async function listAdminReviews(filters = {}) {
  return safeGet("/admin/reviews", filters, async () => {
    const filtered = mockReviews
      .filter((item) => !filters.status || item.status === filters.status)
      .filter((item) => !filters.flagged || String(item.flagged) === filters.flagged)
      .filter((item) => matchesSearch([item.subjectName, item.authorName, item.excerpt], filters.search))
      .sort((a, b) => sortByNewest(a, b, "createdAt"))

    return normalizePaginatedResponse(filtered, normalizeReview, Number(filters.page || 1), Number(filters.pageSize || 10), {
      published: mockReviews.filter((item) => item.status === "published").length,
      flagged: mockReviews.filter((item) => item.flagged).length,
      hidden: mockReviews.filter((item) => item.status === "hidden").length,
    })
  })
}

export async function getAdminReviewById(reviewId) {
  return safeGet(`/admin/reviews/${reviewId}`, {}, async () => normalizeReview(mockReviews.find((item) => item.id === reviewId) || mockReviews[0]))
}

export async function updateAdminReviewStatus(reviewId, payload) {
  return safePatch(`/admin/reviews/${reviewId}/status`, payload, async () => ({
    ...normalizeReview(mockReviews.find((item) => item.id === reviewId) || mockReviews[0]),
    status: payload.status,
    updatedAt: new Date().toISOString(),
    updatedBy: "admin@bidit.io",
  }))
}

export async function listAdminCategories(filters = {}) {
  return safeGet("/admin/categories", filters, async () => {
    const filtered = mockCategories
      .filter((item) => !filters.status || item.status === filters.status)
      .filter((item) => matchesSearch([item.name], filters.search))
      .sort((a, b) => a.order - b.order)

    return normalizePaginatedResponse(filtered, normalizeCategory, Number(filters.page || 1), Number(filters.pageSize || 10), {
      active: mockCategories.filter((item) => item.status === "active").length,
      inactive: mockCategories.filter((item) => item.status === "inactive").length,
    })
  })
}

export async function getAdminCategoryById(categoryId) {
  return safeGet(`/admin/categories/${categoryId}`, {}, async () => normalizeCategory(mockCategories.find((item) => item.id === categoryId) || mockCategories[0]))
}

export async function updateAdminCategoryStatus(categoryId, payload) {
  return safePatch(`/admin/categories/${categoryId}/status`, payload, async () => ({
    ...normalizeCategory(mockCategories.find((item) => item.id === categoryId) || mockCategories[0]),
    status: payload.status,
    updatedAt: new Date().toISOString(),
    updatedBy: "admin@bidit.io",
  }))
}

export async function createAdminCategory(payload) {
  const category = {
    id: `cat-${String(mockCategories.length + 1).padStart(3, "0")}`,
    name: payload.name,
    status: payload.status || "active",
    order: mockCategories.length + 1,
    usageCount: 0,
    createdAt: new Date().toISOString(),
  }

  if (useAdminMocks) {
    return normalizeCategory(category)
  }

  try {
    const response = await httpClient.post("/admin/categories", payload)
    return response.data
  } catch {
    return normalizeCategory(category)
  }
}

export async function listAdminActivity(filters = {}) {
  return safeGet("/admin/activity", filters, async () => {
    const filtered = mockActivity
      .filter((item) => !filters.action || item.action === filters.action)
      .filter((item) => matchesSearch([item.action, item.targetLabel, item.actorName], filters.search))
      .sort((a, b) => sortByNewest(a, b, "createdAt"))

    return normalizePaginatedResponse(filtered, normalizeActivity, Number(filters.page || 1), Number(filters.pageSize || 10), {
      today: 2,
      total: mockActivity.length,
    })
  })
}
