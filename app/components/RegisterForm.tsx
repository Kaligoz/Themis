"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/button";

export default function RegisterForm() {

    const [image, setImage] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)



    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await authClient.signUp.email({
            name: `${firstName} ${lastName}`.trim(),
            email,
            password,
            image,
        });

        setLoading(false)

        if(error) {
            setError(error.message ?? "Failed to create account")
            return
        }

        window.location.href = "/"
    }

    return (
        <form className="flex flex-col justify-center items-center rounded-md bg-[rgb(var(--background))] p-4 shadow-[5px_10px_20px_10px_rgba(0,_0,_0,_0.1)] w-full max-w-[450px]">

            <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
            <p className="mb-4 w-full text-left">Enter your information to create an account</p>

            <div className="flex flex-col items-left w-full">

                <div className="flex justify-between items-start gap-8 mb-4">

                    <div className="flex flex-col justify-center items-start">
                        <label htmlFor="firstName" className="mb-1.5">First name</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))]"
                        />
                    </div>

                    <div className="flex flex-col justify-center items-start">
                        <label htmlFor="lastName" className="mb-1.5">Last name</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))]"
                        />
                    </div>
                </div>
    
                <label htmlFor="Email" className="mb-1.5">Email</label>
                <input
                    id="Email"
                    type="text"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-6.5 mb-4 rounded-sm pl-0.5 bg-[rgb(var(--secondary))]"
                />

                <label htmlFor="Password" className="mb-1.5">Password</label>
                <input
                    id="Password"
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-6.5 mb-4 rounded-sm pl-0.5 bg-[rgb(var(--secondary))]"
                />

                <label htmlFor="ProfImage" className="mb-1.5">Profile Image</label>
                <input
                    id="ProfImage"
                    type="text"
                    placeholder="Profile Image URL (Optional)"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="h-6.5 mb-4 rounded-sm pl-0.5 bg-[rgb(var(--secondary))]"
                />

            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[rgb(var(--primary))] text-[rgb(var(--background))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--background))] cursor-pointer">
                Create an account 
            </Button>

        </form>
    )
}