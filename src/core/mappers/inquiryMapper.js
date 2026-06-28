const FALLBACK_BID_IMAGE =
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop"

function resolveMediaUrl(url) {
    if (!url) return null
    if (url.startsWith("http")) return url
    const apiUrl = import.meta.env.VITE_API_URL || ""
    const origin = apiUrl.replace(/\/api\/v1\/?$/, "")
    return `${origin}${url.startsWith("/") ? url : `/${url}`}`
}

function parseImageUrls(imageUrls) {
    if (!imageUrls) return []
    try {
        const parsed = JSON.parse(imageUrls)
        const list = Array.isArray(parsed) ? parsed : [imageUrls]
        return list.map(resolveMediaUrl).filter(Boolean)
    } catch {
        return imageUrls
            .split(",")
            .map((url) => resolveMediaUrl(url.trim()))
            .filter(Boolean)
    }
}

function formatRelativeTime(isoDate) {
    if (!isoDate) return ""
    const date = new Date(isoDate)
    const diffMs = Date.now() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays <= 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
}

function formatBudgetRange(budgetMin, budgetMax) {
    const format = (value) => `MWK ${Number(value).toLocaleString()}`
    if (budgetMin != null && budgetMax != null) {
        return `${format(budgetMin)} - ${format(budgetMax)}`
    }
    if (budgetMin != null) return `From ${format(budgetMin)}`
    if (budgetMax != null) return `Up to ${format(budgetMax)}`
    return "Budget not set"
}

export function mapInquiryToPostCard(inquiry, categoryName = "") {
    const images = parseImageUrls(inquiry.image_urls)
    return {
        id: inquiry.id,
        title: inquiry.title,
        category: categoryName,
        categoryId: inquiry.category_id,
        location: inquiry.location,
        budgetRange: formatBudgetRange(inquiry.budget_min, inquiry.budget_max),
        status: inquiry.status === "in_progress" ? "reviewing" : inquiry.status,
        offersCount: inquiry.bids_count ?? 0,
        postedAt: formatRelativeTime(inquiry.created_at),
        expectedDelivery: inquiry.deadline
            ? new Date(inquiry.deadline).toLocaleDateString()
            : "Flexible",
        description: inquiry.description,
        image: images[0] || null,
        bidSources: { bidhub: inquiry.bids_count ?? 0, whatsapp: 0, facebook: 0 },
        raw: inquiry,
    }
}

export function mapInquiryFormToPayload({ itemName, description, budget, location, categoryId, userId }) {
    const numericBudget = Number(String(budget).replace(/[^\d.]/g, ""))
    return {
        title: itemName.trim(),
        description: description.trim(),
        location: location.trim(),
        category_id: categoryId,
        user_id: userId,
        budget_min: Number.isFinite(numericBudget) ? numericBudget : null,
        budget_max: Number.isFinite(numericBudget) ? numericBudget : null,
        image_urls: null,
        status: "open",
    }
}

export function mapBidToUi(bid) {
    const images = parseImageUrls(bid.portfolio_urls)
    const displayImages = images.length ? images : [FALLBACK_BID_IMAGE]
    return {
        id: bid.id,
        price: bid.proposed_price,
        qty: 1,
        unit: "lot",
        deliveryTime: bid.estimated_completion_time || "Not specified",
        location: "Malawi",
        submittedOn: bid.created_at ? new Date(bid.created_at).toLocaleDateString() : "",
        status: bid.status === "pending" ? "awaiting" : bid.status,
        note: bid.description,
        thumbnail: displayImages[0],
        images: displayImages,
        supplier: {
            businessName: `Bidder ${String(bid.bidder_id).slice(0, 8)}`,
            verified: false,
            rating: 0,
            reviewCount: 0,
        },
        raw: bid,
    }
}

export function mapInquiryWithBidsToRequirement(inquiry, bids = [], categoryName = "") {
    const images = parseImageUrls(inquiry.image_urls)
    const budget = inquiry.budget_max ?? inquiry.budget_min ?? 0
    return {
        id: inquiry.id,
        title: inquiry.title,
        description: inquiry.description,
        category: categoryName,
        budget,
        postedOn: inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString() : "",
        deadline: inquiry.deadline || "",
        thumbnail: images[0] || FALLBACK_BID_IMAGE,
        bids: bids.map(mapBidToUi),
        raw: inquiry,
    }
}
