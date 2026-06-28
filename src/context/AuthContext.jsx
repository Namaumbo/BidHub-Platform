import { createContext, useContext, useState } from "react"
import { DEFAULT_ROLE, normalizeRole } from "@/core/constants/roles"
import { clearAuthSession, persistAuthSession, readStoredAuth } from "@/core/auth/authStorage"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const stored = readStoredAuth()
    const [username, setUsername] = useState(stored.username)
    const [role, setRole] = useState(() => normalizeRole(stored.role))
    const [userId, setUserId] = useState(stored.userId)
    const [accessToken, setAccessToken] = useState(stored.accessToken)

    const login = ({ username: name, role: apiRole, userId: id, accessToken: token }) => {
        const normalized = normalizeRole(apiRole)
        setUsername(name)
        setRole(normalized)
        setUserId(id || "")
        setAccessToken(token || "")
        persistAuthSession({
            username: name,
            role: normalized,
            userId: id,
            accessToken: token,
        })
    }

    const logout = () => {
        setUsername("")
        setRole(DEFAULT_ROLE)
        setUserId("")
        setAccessToken("")
        clearAuthSession()
    }

    return (
        <AuthContext.Provider
            value={{
                username,
                role,
                userId,
                accessToken,
                login,
                logout,
                isAuthenticated: !!accessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
