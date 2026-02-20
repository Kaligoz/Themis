"use client";

import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await authClient.requestPasswordReset({
            email,
            redirectTo: "/reset-password", 
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Reset link sent to your email!");
        }
        setLoading(false);
    }

    return(
        <form onSubmit={onSubmit} className="flex flex-col justify-center items-center rounded-md bg-[rgb(var(--background))] p-4 shadow-[5px_10px_20px_10px_rgba(0,_0,_0,_0.1)] w-full max-w-[450px]">
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] mb-4 focus:outline-none"
            />

            <Button className="w-full bg-[rgb(var(--primary))] text-[rgb(var(--background))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--background))] cursor-pointer mb-4">Send reset link</Button>

            <Link 
                href="/auth" 
                className="text-sm text-[rgb(var(--primary))] hover:underline"
            >
                Back to Login
            </Link>
        </form>
    ) 
}