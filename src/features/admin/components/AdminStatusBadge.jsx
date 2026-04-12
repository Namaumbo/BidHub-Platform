const STATUS_CLASSES = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  open: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  visible: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  suspended: "bg-rose-50 text-rose-700 ring-rose-200",
  hidden: "bg-rose-50 text-rose-700 ring-rose-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  inactive: "bg-slate-100 text-slate-700 ring-slate-200",
  under_review: "bg-amber-50 text-amber-700 ring-amber-200",
  flagged: "bg-amber-50 text-amber-700 ring-amber-200",
  closed: "bg-slate-100 text-slate-700 ring-slate-200",
}

export default function AdminStatusBadge({ value }) {
  const normalized = String(value || "").toLowerCase()
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ${STATUS_CLASSES[normalized] || "bg-slate-100 text-slate-700 ring-slate-200"}`}>
      {normalized.replaceAll("_", " ")}
    </span>
  )
}
