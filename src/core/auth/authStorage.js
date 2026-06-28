const ACCESS_TOKEN_KEY = "access_token"
const USER_ID_KEY = "user_id"
const USERNAME_KEY = "username"
const ROLE_KEY = "role"

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || ""
}

export function getUserId() {
    return localStorage.getItem(USER_ID_KEY) || ""
}

export function persistAuthSession({ accessToken, userId, username, role }) {
    if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    if (userId) localStorage.setItem(USER_ID_KEY, userId)
    if (username) localStorage.setItem(USERNAME_KEY, username)
    if (role) localStorage.setItem(ROLE_KEY, role)
}

export function clearAuthSession() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(ROLE_KEY)
}

export function readStoredAuth() {
    return {
        accessToken: getAccessToken(),
        userId: getUserId(),
        username: localStorage.getItem(USERNAME_KEY) || "",
        role: localStorage.getItem(ROLE_KEY) || "",
    }
}
