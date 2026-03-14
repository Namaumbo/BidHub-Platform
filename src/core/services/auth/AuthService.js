import httpClient from "@/core/api/httpClient"
import { normalizeApiError } from "@/core/api/apiErrors"

export async function signIn(credentials) {
    if (!credentials?.username || !credentials?.password) {
        throw new Error("username and password are required")
    }
    try {
        const response = await httpClient.post("/auth/login", credentials)
        return response.data
    } catch (error) {
        throw normalizeApiError(error, "Unable to sign in")
    }
}

export async function signUp(payload) {
    if (!payload?.username || !payload?.password || !payload?.fullName) {
        throw new Error("Full name, email, and password are required")
    }

    try {
        const response = await httpClient.post("/auth/register", payload)
        return response.data
    } catch (error) {
        throw normalizeApiError(error, "Unable to create account")
    }
}

const AuthService = {
    signIn,
    signUp,
}

export default AuthService