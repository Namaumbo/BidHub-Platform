import httpClient from "@/core/api/httpClient"
import { normalizeApiError } from "@/core/api/apiErrors"

export default async function registerUser(payload) {
    if (!payload) {
        throw new Error("Registration payload is required")
    }

    try {
        const response = await httpClient.post("/users", payload)
        return response.data
    } catch (error) {
        throw normalizeApiError(error, "Unable to register user")
    }
}

export async function getUserById(userId) {
    if (!userId) {
        throw new Error("User id is required")
    }

    try {
        const response = await httpClient.get(`/users/${userId}`)
        return response.data
    } catch (error) {
        throw normalizeApiError(error, "Unable to fetch user")
    }
}

export async function updateUser(userId, payload) {
    if (!userId || !payload) {
        throw new Error("User id and update payload are required")
    }

    try {
        const response = await httpClient.put(`/users/${userId}`, payload)
        return response.data
    } catch (error) {
        throw normalizeApiError(error, "Unable to update user")
    }
}

export async function deleteUser(userId) {
    if (!userId) {
        throw new Error("User id is required")
    }

    try {
        const response = await httpClient.delete(`/users/${userId}`)
        return response.data
    } catch (error) {
        throw normalizeApiError(error, "Unable to delete user")
    }
}