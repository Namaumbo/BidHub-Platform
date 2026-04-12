export default function AdminSectionCard({ title, subtitle, action, children }) {
  return (
    <section className="rounded-[26px] border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--admin-border)] px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--admin-text)]">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-[var(--admin-text-muted)]">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}
