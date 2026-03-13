export function normalizeApiError(error, fallbackMessage) {
    const status = error?.response?.status ?? null
    const responseMessage = error?.response?.data?.message
    const message = responseMessage || error?.message || fallbackMessage

    return {
        status,
        message,
        originalError: error,
    }
}
