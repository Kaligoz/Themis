import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"

export default function AuthPage() {
    return (
        <main className="grid grid-cols-2 grid-rows-1">
            <section className="bg-[rgb(var(--accent))] shadow-[15px_0px_30px_20px_rgba(0,_0,_0,_0.1)]  ">
                <h1>
                    THEMIS
                </h1>
            </section>
            <section className="flex justify-center items-center h-screen">
                <Tabs defaultValue="login">
                    <TabsList>
                        <TabsTrigger value="login">Sign In</TabsTrigger>
                        <TabsTrigger value="register">Sign Up</TabsTrigger>
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