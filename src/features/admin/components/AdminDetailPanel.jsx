export default function AdminDetailPanel({ title, subtitle, sections = [], actions }) {
  return (
    <aside className="rounded-[26px] border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-sm">
      <div className="border-b border-[var(--admin-border)] px-5 py-4">
        <h3 className="text-lg font-semibold text-[var(--admin-text)]">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-[var(--admin-text-muted)]">{subtitle}</p> : null}
      </div>
      <div className="space-y-5 p-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">{section.title}</p>
            <div className="mt-3 space-y-2">
              {section.rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-3">
                  <span className="text-sm text-[var(--admin-text-muted)]">{row.label}</span>
                  <span className="text-right text-sm font-medium text-[var(--admin-text)]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {actions ? <div className="flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-4">{actions}</div> : null}
      </div>
    </aside>
  )
}
