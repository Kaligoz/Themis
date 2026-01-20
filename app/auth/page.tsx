import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"

export default function AuthPage() {
    return (
        <main className="grid grid-cols-2 grid-rows-1">
            <section className="relative bg-[rgb(var(--accent))] shadow-[15px_0px_30px_20px_rgba(0,_0,_0,_0.1)] h-screen overflow-hidden">
                <h1 className="absolute top-0 left-0 text-[rgb(var(--primary))] text-[278px] font-bold origin-top-left rotate-90 whitespace-nowrap leading-none tracking-tighter translate-x-[275px]">
                    THEMIS
                </h1>
            </section>
            <section className="flex justify-center items-center h-screen">
                <Tabs defaultValue="login" className="w-[450px] max-w-full">
                    <TabsList>
                        <TabsTrigger value="login" className="bg-[rgb(var(--background))] text-[rgb(var(--accent))] hover:bg-[rgb(var(--secondary))] cursor-pointer">
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger value="register" className="bg-[rgb(var(--background))] text-[rgb(var(--accent))] hover:bg-[rgb(var(--secondary))] cursor-pointer">
                            Sign Up
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login"> 
                        <LoginForm/>
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm/>
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    )
} 