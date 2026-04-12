export default function AdminFilterBar({ searchValue, onSearchChange, filters = [], actions }) {
  return (
    <div className="flex flex-col gap-3 rounded-[22px] border border-[var(--admin-border)] bg-[var(--admin-surface-muted)] p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search records..."
          className="w-full rounded-xl border border-[var(--admin-border)] bg-white px-4 py-2.5 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[rgba(11,74,116,0.14)]"
        />
        {filters.map((filter) => (
          <select
            key={filter.key}
            value={filter.value}
            onChange={(event) => filter.onChange(event.target.value)}
            className="rounded-xl border border-[var(--admin-border)] bg-white px-4 py-2.5 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  )
}
