import ForgotPasswordForm from "@/app/components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <main className="flex flex-col justify-center items-center h-screen bg-[rgb(var(--background))]">
            <div className="w-full max-w-[450px] px-4">
                <h1 className="text-3xl font-bold mb-2 text-center">Reset Password</h1>
                <p className="text-muted-foreground mb-6 text-center">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
                
                <ForgotPasswordForm />

            </div>
        </main>
    )
}