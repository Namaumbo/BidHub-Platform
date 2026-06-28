import httpClient from "@/core/api/httpClient"
import { normalizeApiError } from "@/core/api/apiErrors"
import { unwrapApiResponse } from "@/core/utils/unwrapApiResponse"

export async function fetchCategories() {
    try {
        const response = await httpClient.get("/categories/")
        const data = unwrapApiResponse(response.data)
        return Array.isArray(data) ? data : []
    } catch (error) {
        throw normalizeApiError(error, "Unable to load categories")
    }
}

const CategoryService = {
    fetchCategories,
}

export default CategoryService
