import { NavLink } from "react-router"

export default function AdminStatCard({ label, value, tone = "primary", to}) {
  const toneClassByTone = {
    primary: "bg-[rgba(11,74,116,0.08)] text-[var(--admin-primary)]",
    accent: "bg-[rgba(17,114,175,0.09)] text-[var(--admin-accent-1)]",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-rose-50 text-rose-700",
  }

  return (
    <NavLink to={to}>
      <div className="rounded-[24px] border border-[var(--admin-border)] 
      bg-[var(--admin-surface)] p-5 shadow-sm hover:bg-slate-100 text-[#0b4a74]"
      >
        <div className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClassByTone[tone] || toneClassByTone.primary}`}>
          {label}
        </div>
        <p className="mt-4 text-3xl font-black tracking-tight text-[var(--admin-text)]">{value}</p>
      </div>

    </NavLink>
  )
}
