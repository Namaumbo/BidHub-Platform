import { createContext, useContext, useState } from "react"
import { DEFAULT_ROLE, normalizeRole } from "@/core/constants/roles"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    // later to use the session storage
    const [username, setUsername] = useState(() => localStorage.getItem("username") || "")
    const [role, setRole] = useState(() => normalizeRole(localStorage.getItem("role")))

    /**
     * Called after a successful sign-in.
     * The role MUST come from the API response — never from user input.
     */
    const login = (name, apiRole) => {
        console.log("apiRole", apiRole)
        const normalized = normalizeRole(apiRole)
        setUsername(name)
        setRole(normalized)
        localStorage.setItem("username", name)
        localStorage.setItem("role", normalized)
    }

    const logout = () => {
        setUsername("")
        setRole(DEFAULT_ROLE)
        localStorage.removeItem("username")
        localStorage.removeItem("role")
    }

    return (
        <AuthContext.Provider value={{ username, role, login, logout, isAuthenticated: !!username }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
