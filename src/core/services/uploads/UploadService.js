import httpClient from "@/core/api/httpClient"
import { normalizeApiError } from "@/core/api/apiErrors"
import { unwrapApiResponse } from "@/core/utils/unwrapApiResponse"

function resolveUploadUrl(path) {
    if (!path) return path
    if (path.startsWith("http")) return path
    const apiUrl = import.meta.env.VITE_API_URL || ""
    const origin = apiUrl.replace(/\/api\/v1\/?$/, "")
    return `${origin}${path.startsWith("/") ? path : `/${path}`}`
}

export async function uploadFile(file) {
    const formData = new FormData()
    formData.append("file", file)

    try {
        const response = await httpClient.post("/uploads/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        const data = unwrapApiResponse(response.data)
        return {
            ...data,
            url: resolveUploadUrl(data.url),
        }
    } catch (error) {
        throw normalizeApiError(error, "Unable to upload file")
    }
}

export async function uploadFiles(files = []) {
    const uploads = await Promise.all(files.map((file) => uploadFile(file)))
    return uploads
}

const UploadService = {
    uploadFile,
    uploadFiles,
}

export default UploadService
