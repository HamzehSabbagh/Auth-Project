import React, { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [message, setMessage] = useState('')
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setMessage('')

        try {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setErrors(data)
                return
            }

            setEmail('')
            setPassword('')
            setMessage(data.message || "Login successful")

        } catch {
            setErrors({ message: 'Could not connect to the server.' })
        }
    }


    return (
        <div className="mx-auto flex max-w-md flex-col gap-6">
            <div>
                <h1 className="text-3xl font-semibold">Login</h1>
                <p className="mt-2 text-sm text-slate-600">Log in your account to start using the app.</p>
            </div>

            {
                errors.message &&
                (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {errors.message}
                    </p>
                )}

            {message && <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{message}</p>}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
                />
                {errors.email && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{errors.email}</p>}
                <input
                    type='password'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
                />
                {errors.password && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{errors.password}</p>}

                <button type='submit' className="rounded-lg bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-700">Login</button>
            </form>
        </div>
    )
}