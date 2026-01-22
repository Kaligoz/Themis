"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function RegisterForm() {

    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (password !== passwordConfirmation) {
            toast.error("Passwords do not match!")
            return; 
        }

        const { error } = await authClient.signUp.email({
            name: `${firstName} ${lastName}`,
            email,
            password,
            image: image ? await convertImageToBase64(image) : "",
        });

        setLoading(false)

        if(error) {
            toast.error(error.message ?? "Failed to create account")
            return
        }

        window.location.href = "/"
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-center items-center rounded-md bg-[rgb(var(--background))] p-4 shadow-[5px_10px_20px_10px_rgba(0,_0,_0,_0.1)] w-full max-w-[450px]">

            <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
            <p className="mb-4 w-full text-left">Enter your information to create an account</p>

            <div className="flex flex-col items-left w-full">

                <div className="flex justify-between items-start gap-8 mb-2">

                    <div className="flex flex-col justify-center items-start">
                        <label htmlFor="firstName" className="mb-1.5">First name</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] focus:outline-none"
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
                            className="h-6.5 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] focus:outline-none"
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
                    className="h-6.5 mb-2 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] focus:outline-none"
                />

                <label htmlFor="Password" className="mb-1.5">Password</label>
                <input
                    id="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-6.5 mb-2 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] focus:outline-none"
                />

                <label htmlFor="password_confirmation" className="mb-1.5">Confirm Password</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="h-6.5 mb-2 rounded-sm pl-0.5 bg-[rgb(var(--secondary))] focus:outline-none"
                />

                <div className="grid gap-2 mb-2">
                    <label htmlFor="image">Profile Image (optional)</label>
                    <div className="flex items-end gap-4">
                        {imagePreview && (
                            <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                                <Image
                                    src={imagePreview}
                                    alt="Profile preview"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-2 w-full mb-2">
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full rounded-sm pl-0.5 bg-[rgb(var(--secondary))] text-gray-500" 
                            />
                            {imagePreview && (
                                <X
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setImage(null);
                                        setImagePreview(null);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[rgb(var(--primary))] text-[rgb(var(--background))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--background))] cursor-pointer">
                Create an account 
            </Button>

        </form>
    )
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}