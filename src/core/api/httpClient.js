import axios from "axios"

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

export default httpClient
