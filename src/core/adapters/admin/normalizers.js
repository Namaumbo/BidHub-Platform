function toDateLabel(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

export function normalizeUser(user) {
  return {
    ...user,
    joinedLabel: toDateLabel(user.joinedAt),
    lastActiveLabel: toDateLabel(user.lastActiveAt),
  }
}

export function normalizeCategory(category) {
  return {
    ...category,
    createdLabel: toDateLabel(category.createdAt),
  }
}

export function normalizeInquiry(inquiry) {
  return {
    ...inquiry,
    createdLabel: toDateLabel(inquiry.createdAt),
  }
}

export function normalizeBid(bid) {
  return {
    ...bid,
    submittedLabel: toDateLabel(bid.submittedAt),
    amountLabel: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: bid.currency || "MWK",
      maximumFractionDigits: 0,
    }).format(bid.amount),
  }
}

export function normalizeReview(review) {
  return {
    ...review,
    createdLabel: toDateLabel(review.createdAt),
  }
}

export function normalizeActivity(activity) {
  return {
    ...activity,
    createdLabel: toDateLabel(activity.createdAt),
  }
}

export function normalizePaginatedResponse(items, normalizer, page = 1, pageSize = 10, summary) {
  const start = (page - 1) * pageSize
  const pageItems = items.slice(start, start + pageSize).map(normalizer)
  return {
    items: pageItems,
    page,
    pageSize,
    total: items.length,
    summary,
  }
}
