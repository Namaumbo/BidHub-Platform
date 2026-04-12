export default function AdminDataTable({ columns, rows, isLoading, emptyMessage = "No records found.", onRowClick, selectedId }) {
  if (isLoading) {
    return <div className="rounded-2xl border border-dashed border-[var(--admin-border)] bg-white px-4 py-10 text-center text-sm text-[var(--admin-text-muted)]">Loading admin data...</div>
  }

  if (!rows.length) {
    return <div className="rounded-2xl border border-dashed border-[var(--admin-border)] bg-white px-4 py-10 text-center text-sm text-[var(--admin-text-muted)]">{emptyMessage}</div>
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-[var(--admin-border)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--admin-border)] bg-white">
          <thead className="bg-[var(--admin-surface-muted)]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {rows.map((row) => {
              const isSelected = selectedId && row.id === selectedId
              return (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`${onRowClick ? "cursor-pointer" : ""} ${isSelected ? "bg-[rgba(11,74,116,0.05)]" : "hover:bg-slate-50"}`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 align-top text-sm text-slate-700">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
