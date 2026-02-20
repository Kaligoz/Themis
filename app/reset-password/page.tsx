"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client"; 
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    async function handleReset(e: React.FormEvent) {
        e.preventDefault()
        
        if (!token) {
            toast.error("Invalid or missing reset token.")
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.")
            return
        }

        setLoading(true)
        const { error } = await authClient.resetPassword({
            newPassword: password,
            token: token,
        })

        if (error) {

            toast.error(error.message || "Failed to reset password")

        } else {

            toast.success("Password reset successfully! Redirecting to login...")
            setTimeout(() => router.push("/auth"), 2000)

        }

        setLoading(false)

    }

    return (
        <main className="flex justify-center items-center h-screen">
            <form onSubmit={handleReset} className="p-8 bg-[rgb(var(--background))] shadow-xl rounded-lg w-[400px]">
                <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
                
                <label className="block mb-2 text-sm">New Password</label>
                <input
                    type="password"
                    className="w-full h-8.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] mb-4 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label className="block mb-2 text-sm">Confirm Password</label>
                <input
                    type="password"
                    className="w-full h-8.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] mb-4 focus:outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <Button className="w-full bg-[rgb(var(--accent))] text-[rgb(var(--background))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--background))] cursor-pointer" disabled={loading || !token}>
                    {loading ? "Updating..." : "Update Password"}
                </Button>
            </form>
        </main>
    );
}