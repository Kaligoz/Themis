"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/button";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        await authClient.forgotPassword({
            email,
        })

        setSent(true)
    }

    return(
        <form onSubmit={onSubmit} className="flex flex-col justify-center items-center rounded-md bg-[rgb(var(--background))] p-4 shadow-[5px_10px_20px_10px_rgba(0,_0,_0,_0.1)] w-full max-w-[450px]">
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <Button className="w-full bg-[rgb(var(--primary))] text-[rgb(var(--background))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--background))] cursor-pointer mb-4">Send reset link</Button>
        </form>
    ) 
}