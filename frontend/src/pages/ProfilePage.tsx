import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const { token, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    useEffect(() => {
        if (!token) {
            return
        }

        fetch("http://localhost:8080/me", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Unauthorized")

                }
                return res.json()
            })
            .then((data) => {
                setEmail(data.email)
            })
            .catch(() => {
                setError("Could not load profile.")
                logout()
                navigate('/login')
            })
    }, [token, logout, navigate])

    if (!token) {
        return <Navigate to='/login' replace />
    }

    return (
        <div className="mx-auto flex max-w-md flex-col gap-4">
            <h1 className="text-3xl font-semibold">Profile</h1>

            {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </p>
            )}

            {email && (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    Logged in as {email}
                </p>
            )}

            <button onClick={handleLogout} className="rounded-lg bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-700">
                Logout
            </button>
        </div>
    )
}