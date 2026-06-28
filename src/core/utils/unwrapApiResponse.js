export function unwrapApiResponse(payload) {
    if (payload && typeof payload === "object" && "data" in payload) {
        return payload.data
    }
    return payload
}
