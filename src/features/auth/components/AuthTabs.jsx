export default function AuthTabs({ activeTab, onChange }) {
    return (
        <div className="mt-7 grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-100 p-1">
            <button
                type="button"
                onClick={() => onChange("signin")}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${activeTab === "signin"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                    }`}
            >
                Sign In
            </button>
            <button
                type="button"
                onClick={() => onChange("signup")}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${activeTab === "signup"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                    }`}
            >
                Sign Up
            </button>
        </div>
    )
}
