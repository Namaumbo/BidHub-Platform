import httpClient from "@/core/api/httpClient"
import { normalizeApiError } from "@/core/api/apiErrors"
import { unwrapApiResponse } from "@/core/utils/unwrapApiResponse"

export async function fetchInquiries(params = {}) {
    try {
        const response = await httpClient.get("/inquiries/", { params })
        const data = unwrapApiResponse(response.data)
        return Array.isArray(data) ? data : []
    } catch (error) {
        throw normalizeApiError(error, "Unable to load inquiries")
    }
}

export async function createInquiry(payload) {
    try {
        const response = await httpClient.post("/inquiries/", payload)
        return unwrapApiResponse(response.data)
    } catch (error) {
        throw normalizeApiError(error, "Unable to create inquiry")
    }
}

export async function deleteInquiry(inquiryId) {
    try {
        const response = await httpClient.delete(`/inquiries/${inquiryId}`)
        return unwrapApiResponse(response.data)
    } catch (error) {
        throw normalizeApiError(error, "Unable to delete inquiry")
    }
}

const InquiryService = {
    fetchInquiries,
    createInquiry,
    deleteInquiry,
}

export default InquiryService
