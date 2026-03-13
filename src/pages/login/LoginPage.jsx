import { useEffect, useState } from "react"
import { Apple, Chrome, Eye, EyeOff, Facebook, Mail, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import BoxGradient from "@/components/custom/BoxGradient"

const carouselMessages = [
    {
        titleTop: "Post Needs. Compare Bids.",
        titleBottom: "Choose with Confidence.",
        description:
            "Buyers receive competitive offers from verified bidders, compare value, and select the best fit for the job.",
    },
    {
        titleTop: "Negotiate in Real Time.",
        titleBottom: "Close Better Deals.",
        description:
            "Use built-in negotiation chat to agree on scope, timelines, and pricing before both sides lock in the contract.",
    },
    {
        titleTop: "Deliver Services.",
        titleBottom: "Pay Securely on BidHub.",
        description:
            "After successful delivery and approval, buyers pay securely and bidders track earnings in one unified workflow.",
    },
]

function LoginPage() {
    const [activeTab, setActiveTab] = useState("signin")
    const [showPassword, setShowPassword] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % carouselMessages.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen lg:grid lg:grid-cols-[70%_30%]">

            <section className="relative min-h-screen overflow-hidden bg-white">

                <BoxGradient>
                    <div className="relative z-10 flex min-h-screen items-center justify-center bg-white/50 px-3 py-6 md:px-6 md:py-8">
                        <div className="mx-auto w-full max-w-4xl p-2">
                            <div className="grid min-h-[640px] grid-cols-1 gap-2 rounded-[1.3rem]  p-2 lg:grid-cols-2">
                                <section className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-8 md:px-8">
                                    <div className="w-full max-w-md">
                                        <div className="mb-8 flex items-center gap-2 text-sm font-semibold text-teal-700">
                                            <ShieldCheck className="size-4" />
                                            <span>BidHub</span>
                                        </div>

                                        <div className="text-center">
                                            <h1 className="text-2xl font-semibold text-slate-800">Welcome to BidHub</h1>
                                            <p className="mt-2 text-sm text-slate-500">
                                                Sign in or create an account to manage bids, negotiations, and payments.
                                            </p>
                                        </div>

                                        <div className="mt-7 grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-100 p-1">
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab("signin")}
                                                className={`rounded-md px-3 py-2 text-sm font-medium transition ${activeTab === "signin"
                                                    ? "bg-white text-slate-800 shadow-sm"
                                                    : "text-slate-500 hover:text-slate-700"
                                                    }`}
                                            >
                                                Sign In
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab("signup")}
                                                className={`rounded-md px-3 py-2 text-sm font-medium transition ${activeTab === "signup"
                                                    ? "bg-white text-slate-800 shadow-sm"
                                                    : "text-slate-500 hover:text-slate-700"
                                                    }`}
                                            >
                                                Sign Up
                                            </button>
                                        </div>

                                        <form className="mt-6 space-y-4">
                                            {activeTab === "signup" && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-medium text-slate-600">Full Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-teal-500"
                                                    />
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-600">Email Address</label>
                                                <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 focus-within:border-teal-500">
                                                    <Mail className="size-4 text-slate-400" />
                                                    <input
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-600">Password</label>
                                                <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 focus-within:border-teal-500">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        className="text-slate-400 transition hover:text-slate-600"
                                                    >
                                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="h-11 w-full rounded-lg bg-teal-600 text-sm font-medium text-white hover:bg-teal-700"
                                            >
                                                {activeTab === "signin" ? "Sign In" : "Create Account"}
                                            </Button>
                                        </form>

                                        <div className="mt-6 text-center text-xs text-slate-400">Or continue with</div>

                                        <div className="mt-4 flex justify-center gap-3">
                                            <button className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                                                <Chrome className="size-4" />
                                            </button>
                                            <button className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                                                <Apple className="size-4" />
                                            </button>
                                            <button className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                                                <Facebook className="size-4" />
                                            </button>
                                        </div>

                                        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                                            <span>Copyright BidHub. All Rights Reserved.</span>
                                            <span>Terms & Conditions</span>
                                            <span>Privacy Policy</span>
                                        </div>
                                    </div>
                                </section>

                                <section className="relative hidden overflow-hidden rounded-2xl bg-linear-to-br from-teal-700 via-teal-800 to-cyan-950 p-8 lg:block">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_45%),linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[100%_100%,36px_36px,36px_36px]" />

                                    <div className="relative mx-auto mt-10 h-[270px] w-[320px]">
                                        <div className="absolute right-5 top-1 w-[175px] rounded-xl border border-white/30 bg-white/95 p-3 shadow-2xl">
                                            <p className="text-[10px] font-medium text-slate-500">Financial View</p>
                                            <p className="mt-1 text-lg font-semibold text-slate-800">$2,005.45</p>
                                            <div className="mt-2 h-12 rounded-md bg-linear-to-r from-teal-500 to-cyan-500" />
                                        </div>

                                        <div className="absolute right-0 top-24 w-[195px] rounded-xl border border-white/20 bg-slate-100/95 p-3 shadow-xl">
                                            <p className="text-[10px] font-medium text-slate-500">Future Profits</p>
                                            <p className="mt-1 text-sm font-semibold text-slate-800">$190.00</p>
                                            <div className="mt-2 h-2 rounded bg-slate-200">
                                                <div className="h-2 w-2/3 rounded bg-teal-500" />
                                            </div>
                                        </div>

                                        <div className="absolute left-0 top-28 w-[220px] rounded-xl border border-white/20 bg-white/95 p-4 shadow-2xl">
                                            <p className="text-[10px] font-medium text-slate-500">Capital Allocation</p>
                                            <p className="mt-1 text-base font-semibold text-slate-800">$13,656.00</p>
                                            <div className="mt-3 space-y-2">
                                                <div className="h-2 rounded bg-slate-200">
                                                    <div className="h-2 w-4/5 rounded bg-cyan-600" />
                                                </div>
                                                <div className="h-2 rounded bg-slate-200">
                                                    <div className="h-2 w-2/3 rounded bg-teal-500" />
                                                </div>
                                                <div className="h-2 rounded bg-slate-200">
                                                    <div className="h-2 w-1/2 rounded bg-indigo-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative mt-24 text-center text-white">
                                        <h2 className="text-3xl font-semibold leading-tight">
                                            {carouselMessages[activeSlide].titleTop}
                                        </h2>
                                        <h2 className="text-3xl font-semibold leading-tight">
                                            {carouselMessages[activeSlide].titleBottom}
                                        </h2>
                                        <p className="mx-auto mt-4 max-w-md text-sm text-cyan-100/90">
                                            {carouselMessages[activeSlide].description}
                                        </p>
                                    </div>

                                    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                                        {carouselMessages.map((slide, index) => (
                                            <button
                                                key={slide.titleTop}
                                                type="button"
                                                aria-label={`Show message ${index + 1}`}
                                                onClick={() => setActiveSlide(index)}
                                                className={`h-1.5 rounded-full transition-all ${activeSlide === index ? "w-16 bg-white" : "w-8 bg-white/40 hover:bg-white/60"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </BoxGradient>
            </section>


            <aside
                className="hidden min-h-screen bg-cover bg-center bg-no-repeat lg:block"
                style={{ backgroundImage: "url('/potential1.jpg')" }}
                aria-label="Promotional background image"
            />
        </div>
    )
}

export default LoginPage