import httpClient from "@/core/api/httpClient"
import { normalizeApiError } from "@/core/api/apiErrors"
import { unwrapApiResponse } from "@/core/utils/unwrapApiResponse"

export async function fetchBids(params = {}) {
    try {
        const response = await httpClient.get("/bids/", { params })
        const data = unwrapApiResponse(response.data)
        return Array.isArray(data) ? data : []
    } catch (error) {
        throw normalizeApiError(error, "Unable to load bids")
    }
}

export async function acceptBid(bidId) {
    try {
        const response = await httpClient.put(`/bids/${bidId}/accept`)
        return unwrapApiResponse(response.data)
    } catch (error) {
        throw normalizeApiError(error, "Unable to accept bid")
    }
}

export async function rejectBid(bidId) {
    try {
        const response = await httpClient.put(`/bids/${bidId}/reject`)
        return unwrapApiResponse(response.data)
    } catch (error) {
        throw normalizeApiError(error, "Unable to reject bid")
    }
}

const BidService = {
    fetchBids,
    acceptBid,
    rejectBid,
}

export default BidService
