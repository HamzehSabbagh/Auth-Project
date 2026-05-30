import { createContext, useContext, useState } from "react"

type AuthContextType = {
    token: string | null
    isLoggedIn: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token")
    })

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    const value: AuthContextType = {
        token,
        isLoggedIn: Boolean(token),
        login,
        logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context
}