import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        try {
            const res = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setErrors(data)
                return
            }

            setName('')
            setEmail('')
            setPassword('')
            navigate('/login')
        } catch {
            setErrors({ message: 'Could not connect to the server.' })
        }
    }

    return (
        <div className="mx-auto flex max-w-md flex-col gap-6">
            <div>
                <h1 className="text-3xl font-semibold">Register</h1>
                <p className="mt-2 text-sm text-slate-600">Create an account to start using the app.</p>
            </div>

            {
                errors.message &&
                (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {errors.message}
                    </p>
                )}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
                />
                {errors.name && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{errors.name}</p>}
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

                <button type='submit' className="rounded-lg bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-700">Register</button>
            </form>
        </div>
    )
}