import axios from "axios"
import { clearAuthSession, getAccessToken } from "@/core/auth/authStorage"

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
    console.error("Missing VITE_API_URL. API requests may fail.")
}

const httpClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
})

httpClient.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearAuthSession()
            if (window.location.pathname !== "/login") {
                window.location.assign("/login")
            }
        }
        return Promise.reject(error)
    },
)

export default httpClient
