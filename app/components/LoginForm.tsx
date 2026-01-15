"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/button";

export default function LoginForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await authClient.signIn.email({
            email,
            password,
        }) 

        setLoading (false)

        if(error) {
            setError(error.message ?? "Failed to create account")
            return
        }

        window.location.href = "/"
    }

    return (
        <form className="flex flex-col justify-center items-center rounded-md bg-background p-4 shadow-[5px_10px_20px_10px_rgba(0,_0,_0,_0.1)]">

            <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
            <p className="mb-4 w-full text-left">To begin using Themis please, register or <br/> login via your email account.</p>

            <div className="flex flex-col items-left w-full">

                <label htmlFor="Email" className="mb-1.5">Email</label>

                <input
                    id="Email"
                    type="text"
                    value={email}
                    placeholder="email@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] mb-4"
                />

                <label htmlFor="Password" className="mb-1.5">Password</label>

                <input
                    id="Password"
                    type="password"
                    value={password}
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] mb-4"
                />

            </div>
            
            <Button className="w-full bg-[rgb(var(--primary))] text-[rgb(var(--background))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--background))] cursor-pointer" disabled={loading}>Login</Button>
        </form>
    )
}