import { ShieldCheck, Star, User, MapPin, Mail, Clock, Building2 } from "lucide-react"
import formatMoney from "../../../core/utils/FormatMoney"

export default function SupplierDetailsComponent({ supplier, bidPrice }) {
   if (!supplier) {
        return (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-6 text-center text-sm text-slate-500">
                No supplier information for this bid.
            </p>
        )
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                    src={supplier.avatar}
                    alt=""
                    className="mx-auto h-20 w-20 shrink-0 rounded-xl object-cover ring-2 ring-slate-100 sm:mx-0 sm:h-24 sm:w-24"
                />
                <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
                        <h4 className="text-lg font-bold text-slate-900">{supplier.businessName}</h4>
                        {supplier.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                                <ShieldCheck className="h-3 w-3" aria-hidden />
                                Verified
                            </span>
                        )}
                    </div>
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-600 sm:justify-start">
                        <User className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                        {supplier.contactName}
                        <span className="text-slate-400">·</span>
                        {supplier.role}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:justify-start">
                        <span className="inline-flex items-center gap-1 text-amber-600">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                            <span className="font-semibold">{supplier.rating}</span>
                            <span className="text-slate-500">({supplier.reviewsCount} reviews)</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-600">
                            <MapPin className="h-4 w-4 text-slate-400" aria-hidden />
                            {supplier.location}
                        </span>
                    </div>
                    <a
                        href={`mailto:${supplier.email}`}
                        className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#0b4a74] hover:underline sm:justify-start"
                    >
                        <Mail className="h-4 w-4 shrink-0" aria-hidden />
                        {supplier.email}
                    </a>
                    <p className="mt-1 inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 sm:justify-start">
                        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {supplier.responseTime}
                    </p>
                </div>
                <div className="flex w-full flex-col justify-center rounded-xl bg-[#0b4a74]/10 px-4 py-3 sm:w-auto sm:min-w-[160px]">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#0b4a74]">Their bid</p>
                    <p className="text-xl font-extrabold text-[#0b4a74]">{formatMoney(bidPrice)}</p>
                    {supplier.matchScore != null && (
                        <p className="mt-2 text-xs text-slate-600">
                            Match score{" "}
                            <span className="font-bold text-[#0b4a74]">{supplier.matchScore}%</span>
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-center sm:text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">On platform</p>
                    <p className="text-sm font-bold text-slate-900">{supplier.yearsOnPlatform} yrs</p>
                </div>
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-center sm:text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Orders done</p>
                    <p className="text-sm font-bold text-slate-900">{supplier.completedOrders.toLocaleString()}</p>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-2 sm:col-span-1">
                    <Building2 className="h-4 w-4 text-slate-400" aria-hidden />
                    <span className="text-xs font-medium text-slate-700">Registered business</span>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Supplier note</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{supplier.proposal}</p>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                    type="button"
                    className="rounded-lg bg-[#0b4a74] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#083754]"
                >
                    Message supplier
                </button>
                <button
                    type="button"
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                    View supplier profile
                </button>
            </div>
        </div>
    )
}

