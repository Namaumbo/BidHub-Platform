import httpClient from "@/core/api/httpClient"
import { normalizeApiError } from "@/core/api/apiErrors"
import { unwrapApiResponse } from "@/core/utils/unwrapApiResponse"

export async function signIn(credentials) {
    if (!credentials?.username || !credentials?.password) {
        throw new Error("username and password are required")
    }
    try {
        const response = await httpClient.post("/auth/login", credentials)
        return unwrapApiResponse(response.data)
    } catch (error) {
        throw normalizeApiError(error, "Unable to sign in")
    }
}

export async function signUp(payload) {
    if (!payload?.username || !payload?.password || !payload?.full_name) {
        throw new Error("Full name, username, and password are required")
    }

    try {
        const response = await httpClient.post("/user/register", payload)
        return unwrapApiResponse(response.data)
    } catch (error) {
        throw normalizeApiError(error, "Unable to create account")
    }
}

const AuthService = {
    signIn,
    signUp,
}

export default AuthService
