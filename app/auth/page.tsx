import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import RegisterForm from "../components/RegisterForm"

export default function AuthPage() {
    return (
        <main className="grid grid-cols-2 grid-rows-1">
            <section>
                <h1>
                    THEMIS
                </h1>
            </section>
            <section>
                <Tabs defaultValue="login">
                    <TabsList>
                        <TabsTrigger value="login">Sign In</TabsTrigger>
                        <TabsTrigger value="register">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login"> 
                        this is sign in
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm/>
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    )
} 