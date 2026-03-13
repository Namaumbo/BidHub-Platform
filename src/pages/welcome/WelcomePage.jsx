import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WelcomePage({ username, onLogout }) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <ShieldCheck className="size-5" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-900">Welcome to BidHub</h1>
                <p className="mt-2 text-sm text-slate-600">
                    {username ? `Hi ${username}, you are logged in successfully.` : "You are logged in successfully."}
                </p>
                <Button
                    type="button"
                    onClick={onLogout}
                    className="mt-6 h-10 w-full rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                >
                    Back to Login
                </Button>
            </section>
        </main>
    )
}
