import { useState } from "react"
import { Apple, Chrome, Eye, EyeOff, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialValues = {
    fullName: "",
    username: "",
    password: "",
}

export default function AuthForm({ mode, isSubmitting, errorMessage, onSubmit }) {
    const [values, setValues] = useState(initialValues)
    const [showPassword, setShowPassword] = useState(false)

    const isSignup = mode === "signup"

    const handleChange = (fieldName) => (event) => {
        const nextValue = event.target.value
        setValues((current) => ({ ...current, [fieldName]: nextValue }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit({
            mode,
            data: values,
            reset: () => setValues(initialValues),
        })
    }

    return (
        <>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                {isSignup && (
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-600">Full Name</label>
                        <input
                            type="text"
                            value={values.fullName}
                            onChange={handleChange("fullName")}
                            placeholder="Enter your full name"
                            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-teal-500"
                            required
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-600">Username</label>
                    <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 focus-within:border-teal-500">
                        <Mail className="size-4 text-slate-400" />
                        <input
                            type="text"
                            value={values.username}
                            onChange={handleChange("username")}
                            placeholder="Enter your username"
                            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-600">Password</label>
                    <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 focus-within:border-teal-500">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            placeholder="Enter your password"
                            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((current) => !current)}
                            className="text-slate-400 transition hover:text-slate-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                </div>

                {errorMessage ? (
                    <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                        {errorMessage}
                    </p>
                ) : null}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 w-full rounded-lg bg-teal-600 text-sm font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-teal-400"
                >
                    {isSubmitting ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
                </Button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">Or continue with</div>

            <div className="mt-4 flex justify-center gap-3">
                <button
                    type="button"
                    className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                >
                    <Chrome className="size-4" />
                </button>
                <button
                    type="button"
                    className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                >
                    <Apple className="size-4" />
                </button>
                <button
                    type="button"
                    className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                >
                    <Facebook className="size-4" />
                </button>
            </div>
        </>
    )
}
