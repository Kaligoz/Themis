"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function LoginForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSocialLogin = async (provider: "google" | "github") => {
        await authClient.signIn.social({
            provider,
            callbackURL: "/", 
        });
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await authClient.signIn.email({
            email,
            password,
            rememberMe,
        }) 

        if (!email || !password) {
            toast.error("Please fill in all required fields")
            return;
        }

        setLoading (false)

        if(error) {
            toast.error(error.message ?? "Failed to create account")
            return
        }

        window.location.href = "/"
    }

    return (
        <div className="flex flex-col justify-center items-center rounded-md bg-[rgb(var(--background))] p-4 shadow-[5px_10px_20px_10px_rgba(0,_0,_0,_0.1)] w-full max-w-[450px]">
            <form onSubmit={onSubmit} className="w-full flex flex-col justify-center items-center">

                <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
                <p className="mb-4 w-full text-left">To begin using Themis please, register or <br/> login via your email account.</p>

                <div className="flex flex-col items-start w-full">

                    <label htmlFor="Email" className="mb-1.5">Email</label>

                    <input
                        id="Email"
                        type="text"
                        value={email}
                        placeholder="email@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] mb-2 focus:outline-none"
                    />

                    <label htmlFor="Password" className="mb-1.5">Password</label>

                    <input
                        id="Password"
                        type="password"
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] mb-2 focus:outline-none"
                    />

                    <label className="flex items-center gap-2 mb-4">
                        <input 
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-6 h-6 accent-[rgb(var(--primary))] cursor-pointer"
                        />
                        Remember me                    
                    </label>

                </div>
                
                <Button className="w-full bg-[rgb(var(--primary))] text-[rgb(var(--background))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--background))] cursor-pointer mb-4" disabled={loading}>
                    Login
                </Button>
            </form>

            <Button className="w-full bg-[rgb(var(--accent))] text-[rgb(var(--background))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--background))] cursor-pointer mb-4" onClick={() => handleSocialLogin("google")}>
                Sign in with Google
            </Button>

            <Button className="w-full bg-[rgb(var(--accent))] text-[rgb(var(--background))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--background))] cursor-pointer mb-4" onClick={() => handleSocialLogin("github")}>
                Sign in with Github
            </Button>
        </div>
    )
}