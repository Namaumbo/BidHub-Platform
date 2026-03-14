import { useState } from "react"
import { ShieldCheck } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"
import BoxGradient from "@/components/custom/BoxGradient"
import AuthService from "@/core/services/auth/AuthService"
import AuthTabs from "@/features/auth/components/AuthTabs"
import AuthForm from "@/features/auth/components/AuthForm"
import AuthCarouselPanel from "@/features/auth/components/AuthCarouselPanel"
import useAuthCarousel from "@/features/auth/hooks/useAuthCarousel"
import { authCarouselMessages } from "@/features/auth/constants/authCarouselMessages"
import { useAuth } from "@/context/AuthContext"

function LoginPage() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }
    const [activeTab, setActiveTab] = useState("signin")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const { activeSlide, setActiveSlide } = useAuthCarousel(authCarouselMessages.length)

    const handleAuthSubmit = async ({ mode, data, reset }) => {
        setErrorMessage("")
        setSuccessMessage("")
        setIsSubmitting(true)
        try {
            if (mode === "signin") {
               
                await AuthService.signIn({
                    username: data.username,
                    password: data.password,
                })
                login(data.username)
                navigate("/dashboard", { replace: true })
            } else {
                await AuthService.signUp({
                    fullName: data.fullName,
                    username: data.username,
                    password: data.password,
                })
                setSuccessMessage("Account created successfully.")
                reset()
            }
        } catch (error) {
            setErrorMessage(error?.message || "Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

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
                                        <AuthTabs activeTab={activeTab} onChange={setActiveTab} />
                                        <AuthForm
                                            mode={activeTab}
                                            isSubmitting={isSubmitting}
                                            errorMessage={errorMessage}
                                            onSubmit={handleAuthSubmit}
                                        />

                                        {successMessage ? (
                                            <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                                                {successMessage}
                                            </p>
                                        ) : null}

                                        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                                            <span>Copyright BidHub. All Rights Reserved.</span>
                                            <span>Terms & Conditions</span>
                                            <span>Privacy Policy</span>
                                        </div>
                                    </div>
                                </section>

                                <AuthCarouselPanel
                                    messages={authCarouselMessages}
                                    activeSlide={activeSlide}
                                    onSelectSlide={setActiveSlide}
                                />
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