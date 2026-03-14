import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    //TODO: to use sessision based auth, we can use the sessionStorage instead of localStorage
    const [username, setUsername] = useState(() => localStorage.getItem("username") || "")

    const login = (name) => {
        setUsername(name)
        localStorage.setItem("username", name)
    }

    const logout = () => {
        setUsername("")
        localStorage.removeItem("username")
    }

    return (
        <AuthContext.Provider value={{ username, login, logout, isAuthenticated: !!username }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
