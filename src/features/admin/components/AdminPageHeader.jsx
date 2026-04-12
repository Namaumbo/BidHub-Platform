export default function AdminPageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-[var(--admin-border)] bg-[linear-gradient(135deg,rgba(11,74,116,0.12),rgba(17,114,175,0.08),rgba(255,255,255,0.95))] p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <span className="inline-flex rounded-full bg-[var(--admin-primary)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--admin-text)]">{title}</h1>
          <p className="mt-2 text-sm text-[var(--admin-text-muted)]">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  )
}
