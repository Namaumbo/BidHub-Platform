import { useMemo } from "react"
import AdminDataTable from "@/features/admin/components/AdminDataTable"
import AdminFilterBar from "@/features/admin/components/AdminFilterBar"
import AdminPageHeader from "@/features/admin/components/AdminPageHeader"
import AdminSectionCard from "@/features/admin/components/AdminSectionCard"
import AdminStatCard from "@/features/admin/components/AdminStatCard"
import { useAdminCollection } from "@/features/admin/components/useAdminCollection"
import { listAdminActivity } from "@/core/services/admin/adminDataSource"

export default function AdminActivityPage() {
  const { data, filters, setFilters, isLoading, error } = useAdminCollection(listAdminActivity, {
    search: "",
    action: "",
  })

  const columns = useMemo(
    () => [
      { key: "actorName", label: "Actor" },
      { key: "action", label: "Action" },
      { key: "targetType", label: "Entity", render: (row) => <span className="capitalize">{row.targetType}</span> },
      { key: "targetLabel", label: "Target" },
      { key: "createdLabel", label: "When" },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Activity" title="Track audit and moderation events." description="Use the activity feed to verify what happened, who acted, and which marketplace records were affected." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AdminStatCard label="Today" value={data.summary?.today ?? 0} />
        <AdminStatCard label="Total events" value={data.summary?.total ?? 0} tone="accent" />
      </section>
      <AdminSectionCard title="Audit feed" subtitle="Immutable-style event view for admin oversight.">
        <div className="space-y-4">
          <AdminFilterBar
            searchValue={filters.search}
            onSearchChange={(search) => setFilters((current) => ({ ...current, search }))}
            filters={[
              {
                key: "action",
                value: filters.action,
                onChange: (action) => setFilters((current) => ({ ...current, action })),
                options: [
                  { label: "All actions", value: "" },
                  { label: "Suspended user", value: "Suspended user" },
                  { label: "Hidden inquiry", value: "Hidden inquiry" },
                  { label: "Flagged review", value: "Flagged review" },
                ],
              },
            ]}
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <AdminDataTable columns={columns} rows={data.items} isLoading={isLoading} />
        </div>
      </AdminSectionCard>
    </div>
  )
}
