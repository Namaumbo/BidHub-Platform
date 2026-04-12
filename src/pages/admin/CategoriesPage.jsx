import { useMemo, useState } from "react"
import AdminDataTable from "@/features/admin/components/AdminDataTable"
import AdminFilterBar from "@/features/admin/components/AdminFilterBar"
import AdminPageHeader from "@/features/admin/components/AdminPageHeader"
import AdminSectionCard from "@/features/admin/components/AdminSectionCard"
import AdminStatusBadge from "@/features/admin/components/AdminStatusBadge"
import AdminStatCard from "@/features/admin/components/AdminStatCard"
import { useAdminCollection } from "@/features/admin/components/useAdminCollection"
import { createAdminCategory, listAdminCategories, updateAdminCategoryStatus } from "@/core/services/admin/adminDataSource"

export default function AdminCategoriesPage() {
  const { data, filters, setFilters, isLoading, error, setData } = useAdminCollection(listAdminCategories, {
    search: "",
    status: "",
  })
  const [newCategoryName, setNewCategoryName] = useState("")

  const columns = useMemo(
    () => [
      { key: "name", label: "Category" },
      { key: "status", label: "Status", render: (row) => <AdminStatusBadge value={row.status} /> },
      { key: "usageCount", label: "Usage" },
      { key: "order", label: "Order" },
      { key: "createdLabel", label: "Created" },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              handleStatusToggle(row)
            }}
            className="rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-semibold text-[var(--admin-text)] hover:bg-[var(--admin-surface-muted)]"
          >
            {row.status === "active" ? "Deactivate" : "Activate"}
          </button>
        ),
      },
    ],
    [data.items],
  )

  async function handleStatusToggle(category) {
    const nextStatus = category.status === "active" ? "inactive" : "active"
    const updated = await updateAdminCategoryStatus(category.id, { status: nextStatus, reason: "Updated from admin UI" })
    setData((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === category.id ? { ...item, status: updated.status } : item)),
    }))
  }

  async function handleCreateCategory() {
    if (!newCategoryName.trim()) return
    const created = await createAdminCategory({ name: newCategoryName.trim(), status: "active" })
    setData((current) => ({
      ...current,
      items: [created, ...current.items],
      total: current.total + 1,
    }))
    setNewCategoryName("")
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Categories" title="Control the marketplace taxonomy." description="Keep categories clean, activate or retire segments, and prepare the UI for backend-managed category endpoints." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AdminStatCard label="Active" value={data.summary?.active ?? 0} />
        <AdminStatCard label="Inactive" value={data.summary?.inactive ?? 0} tone="warning" />
      </section>
      <AdminSectionCard title="Category catalog" subtitle="Admin-managed categories with mock-first create and status actions.">
        <div className="space-y-4">
          <AdminFilterBar
            searchValue={filters.search}
            onSearchChange={(search) => setFilters((current) => ({ ...current, search }))}
            filters={[
              {
                key: "status",
                value: filters.status,
                onChange: (status) => setFilters((current) => ({ ...current, status })),
                options: [
                  { label: "All statuses", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ],
              },
            ]}
            actions={[
              <div key="create" className="flex gap-2">
                <input
                  value={newCategoryName}
                  onChange={(event) => setNewCategoryName(event.target.value)}
                  placeholder="New category name"
                  className="rounded-xl border border-[var(--admin-border)] bg-white px-3 py-2 text-sm text-[var(--admin-text)] outline-none"
                />
                <button type="button" onClick={handleCreateCategory} className="rounded-xl bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--admin-primary-hover)]">
                  Add category
                </button>
              </div>,
            ]}
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <AdminDataTable columns={columns} rows={data.items} isLoading={isLoading} />
        </div>
      </AdminSectionCard>
    </div>
  )
}
