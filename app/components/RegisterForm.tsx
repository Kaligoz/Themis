"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/button";

export default function RegisterForm() {

    const [image, setImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
        <form className="border flex flex-col justify-center">

            <div className="grid grid-cols-2 grid-rows-2">
                <label htmlFor="firstName">First name</label>
                <label htmlFor="lastName">Last name</label>
                <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
    
            <label htmlFor="Email">Email</label>
            <input
                id="Email"
                type="text"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="Password">Password</label>
            <input
                id="Password"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="text"
                placeholder="Profile Image URL (Optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />

            <Button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Create Account"}
            </Button>

            
        </form>
    )
}