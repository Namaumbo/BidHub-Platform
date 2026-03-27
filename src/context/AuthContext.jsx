import { createContext, useContext, useState } from "react"
import { DEFAULT_ROLE } from "@/core/constants/roles"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    //TODO: to use sessision based auth, we can use the sessionStorage instead of localStorage
    const [username, setUsername] = useState(() => localStorage.getItem("username") || "")
    const [role, setRole] = useState(() => localStorage.getItem("role") || DEFAULT_ROLE)

    const login = (name, userRole = DEFAULT_ROLE) => {
        setUsername(name)
        setRole(userRole)
        localStorage.setItem("username", name)
        localStorage.setItem("role", userRole)
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
